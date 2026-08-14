import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase con inicialización PEREZOSA.
 *
 * No se crea (ni lanza error por variables faltantes) al importar el módulo,
 * sino en el primer uso real. Esto evita que `next build` falle al evaluar las
 * rutas cuando las env vars no están presentes en tiempo de build: Supabase solo
 * se necesita en runtime (cuando llega un request al form o corre el Scout).
 *
 * Se expone como un Proxy para que los sitios de uso (`supabase.from(...)`)
 * queden idénticos, sin cambios en route.ts ni en el script del Scout.
 */
let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Faltan las variables de entorno de Supabase. Revisa tu archivo .env (copia .env.example)."
    );
  }
  _client = createClient(supabaseUrl, supabaseKey);
  return _client;
}

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getClient();
    const value = (client as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === "function" ? (value as Function).bind(client) : value;
  },
});

export type PropertyStatus =
  | "Nuevo" | "Analizado" | "Aprobado" | "Demo" | "Mensaje"
  | "Respuesta" | "Reunion" | "Cliente" | "Entrega" | "Seguimiento" | "Upsell";

export type PropertyScore = "A+" | "A" | "B" | "C";

export interface Property {
  id?: string;
  name: string;
  company?: string;
  country?: string;
  city?: string;
  price?: number;
  score?: PropertyScore;
  status: PropertyStatus;
  notes?: string;
  source_url?: string;
  photos?: string[];
  contact_channel?: string;
  contact_handle?: string;
}
