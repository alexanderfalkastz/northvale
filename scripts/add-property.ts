/**
 * Agente Scout + Analyst v1 (semi-manual)
 *
 * SOP-001: agrega una propiedad a la base evitando duplicados por source_url.
 * SOP-002: calcula el Score (A+/A/B/C) automáticamente vía la API de Claude,
 * evaluando precio, calidad de fotos, ubicación y potencial de mejora visual.
 *
 * Uso:
 *   npm run add-property -- \
 *     --name "Villa Serena" \
 *     --company "Coastal Retreats" \
 *     --country "Portugal" \
 *     --city "Lagos" \
 *     --price 850 \
 *     --url "https://airbnb.com/rooms/xxxx" \
 *     --photos "https://.../1.jpg,https://.../2.jpg" \
 *     --notes "Fotos actuales oscuras, propiedad frente al mar con potencial alto"
 */
import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import { supabase, type Property } from "../lib/supabase";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function parseArgs(): Record<string, string> {
  const args = process.argv.slice(2);
  const parsed: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].slice(2);
      parsed[key] = args[i + 1];
      i++;
    }
  }
  return parsed;
}

async function scoreProperty(data: Partial<Property>): Promise<"A+" | "A" | "B" | "C"> {
  const prompt = `Eres el Analyst de Northvale, una agencia premium de marketing visual
para propiedades de lujo. Evalúa esta propiedad según el checklist SOP-002:
precio (¿rango premium para su mercado?), calidad de fotos actuales, ubicación,
potencial de mejora visual (mientras peores sean las fotos vs. el valor real,
mayor el potencial), y perfil de la empresa/propietario (¿tiene presupuesto para
un servicio premium?).

Propiedad:
- Nombre: ${data.name}
- Empresa/propietario: ${data.company || "desconocido"}
- Ubicación: ${data.city}, ${data.country}
- Precio por noche: ${data.price || "desconocido"}
- Notas: ${data.notes || "ninguna"}

Responde ÚNICAMENTE con uno de estos 4 valores, sin explicación: A+, A, B, C`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 10,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { text: string }).text)
    .join("")
    .trim();

  const valid = ["A+", "A", "B", "C"];
  return (valid.includes(text) ? text : "B") as "A+" | "A" | "B" | "C";
}

async function main() {
  const args = parseArgs();

  if (!args.name || !args.url) {
    console.error("Faltan campos obligatorios: --name y --url");
    process.exit(1);
  }

  // SOP-001: evitar duplicados por source_url
  const { data: existing } = await supabase
    .from("properties")
    .select("id")
    .eq("source_url", args.url)
    .maybeSingle();

  if (existing) {
    console.log(`Ya existe una propiedad con esta URL (id: ${existing.id}). Saltando.`);
    return;
  }

  const propertyData: Partial<Property> = {
    name: args.name,
    company: args.company,
    country: args.country,
    city: args.city,
    price: args.price ? Number(args.price) : undefined,
    notes: args.notes,
  };

  console.log("Calculando Score...");
  const score = await scoreProperty(propertyData);
  console.log(`Score asignado: ${score}`);

  const { data, error } = await supabase
    .from("properties")
    .insert({
      ...propertyData,
      score,
      status: "Analizado",
      source_url: args.url,
      photos: args.photos ? args.photos.split(",") : [],
    })
    .select()
    .single();

  if (error) {
    console.error("Error al insertar:", error.message);
    process.exit(1);
  }

  console.log(`Propiedad guardada con id ${data.id}, score ${score}.`);
}

main();
