import { cookies, headers } from "next/headers";

export type Locale = "en" | "es";

/**
 * Idioma del visitante (server-side):
 * 1) cookie `locale` (elección manual) → 2) Accept-Language → 3) inglés por defecto.
 */
export async function resolveLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;
  if (cookieLocale === "en" || cookieLocale === "es") return cookieLocale;
  const headerStore = await headers();
  const accept = (headerStore.get("accept-language") || "").toLowerCase();
  const first = accept.split(",")[0]?.trim() || "";
  return first.startsWith("es") ? "es" : "en";
}

type Item = { name: string; desc: string };

type Dict = {
  nav: { services: string; howWeWork: string; difference: string; investment: string; contact: string; cta: string };
  hero: { eyebrow: string; title: string; accent: string; subtitle: string; cta: string; cta2: string; reel: string };
  kickers: { positioning: string; identity: string; experience: string; capabilities: string; difference: string; investment: string; contact: string };
  statement: { title: string; accent: string; text: string };
  identity: { essence: string; tagline: string };
  services: { title: string; items: Item[] };
  support: { title: string; items: Item[] };
  packages: { title: string; note: string; items: { name: string; model: string; tagline: string; features: string[]; cta: string; featured?: boolean }[] };
  beforeAfter: { title: string; caption: string; before: string; after: string };
  process: { title: string; steps: { n: string; t: string; d: string }[] };
  contact: { title: string; subtitle: string; name: string; email: string; url: string; submit: string };
  footer: { tagline: string; rights: string };
  thanks: { title: string; text: string; back: string };
};

export const translations: Record<Locale, Dict> = {
  en: {
    nav: { services: "What We Build", howWeWork: "How We Work", difference: "The Difference", investment: "Investment", contact: "Let's Talk", cta: "Start a project" },
    hero: {
      eyebrow: "PREMIUM PROPERTY MARKETING",
      title: "Property that",
      accent: "sells itself.",
      subtitle: "A visual marketing studio. We turn premium properties into cinematic content — and the strategy that makes buyers act.",
      cta: "Request a property analysis",
      cta2: "See what we build",
      reel: "Showreel",
    },
    kickers: {
      positioning: "Positioning",
      identity: "Identity",
      experience: "What We Build",
      capabilities: "How We Work",
      difference: "The Difference",
      investment: "Investment",
      contact: "Contact",
    },
    statement: {
      title: "This isn't content. It's",
      accent: "desire, engineered.",
      text: "Great properties lose attention when their content doesn't match their value. We build the images, films and strategy that make buyers and guests feel something — and act.",
    },
    identity: {
      essence: "A mark of intent, precision and desire.",
      tagline: "Northvale",
    },
    services: {
      title: "Everything a property needs to be seen.",
      items: [
        { name: "Cinematic Property Films", desc: "Signature films that make a property unforgettable — and turn scrolls into bookings." },
        { name: "Social Reels", desc: "Vertical, platform-native content engineered to travel on Instagram, TikTok and Reels." },
        { name: "Enhanced Photography", desc: "Existing photos elevated to editorial quality — brighter, sharper, aspirational." },
        { name: "Before / After", desc: "The visual upgrade that changes how buyers and guests feel about a space." },
      ],
    },
    support: {
      title: "A full marketing partner — not just a producer.",
      items: [
        { name: "Ad Strategy & Campaigns", desc: "Creative and targeting that place a property in front of the right audience." },
        { name: "Social Media Management", desc: "A consistent, premium presence — planned, produced and posted." },
        { name: "Direct-Booking Microsites", desc: "An owned booking page — keep the guest, skip the commission." },
        { name: "Property Brand Identity", desc: "A name, a look and a story that make a property feel like a destination." },
      ],
    },
    packages: {
      title: "Ways to work together.",
      note: "Every property is different — pricing is tailored per project.",
      items: [
        { name: "Essentials", model: "Per project", tagline: "For a single premium listing.", features: ["Enhanced photography", "One cinematic reel", "Virtual staging (up to 2 photos)", "48-hour express delivery"], cta: "Request a quote" },
        { name: "Signature", model: "Per project", tagline: "The full cinematic package.", features: ["Cinematic property film", "Social reels + stills", "Enhanced photography", "Virtual staging", "Content strategy"], cta: "Request a quote", featured: true },
        { name: "Studio", model: "Monthly", tagline: "For portfolios & managers.", features: ["Everything in Signature", "Ad strategy & campaigns", "Social media management", "Direct-booking microsite", "Monthly performance report"], cta: "Talk to us" },
      ],
    },
    beforeAfter: {
      title: "The same property. A different desire.",
      caption: "Drag to compare.",
      before: "Before",
      after: "After",
    },
    process: {
      title: "A precise, premium process.",
      steps: [
        { n: "01", t: "Analyze", d: "We study the property and its market." },
        { n: "02", t: "Concept", d: "We design the visual story that sells it." },
        { n: "03", t: "Produce", d: "We craft cinematic content from your assets." },
        { n: "04", t: "Deliver", d: "Ready-to-publish assets that perform." },
      ],
    },
    contact: {
      title: "Let's make your property unforgettable.",
      subtitle: "Send us a listing. We'll show you what's possible — at no cost.",
      name: "Name",
      email: "Email",
      url: "Property listing URL",
      submit: "Request analysis",
    },
    footer: { tagline: "Premium visual marketing for luxury properties.", rights: "© 2026 Northvale. All rights reserved." },
    thanks: {
      title: "Thank you.",
      text: "We received your request. We'll get back to you shortly with your property analysis.",
      back: "Back to home",
    },
  },
  es: {
    nav: { services: "Qué Creamos", howWeWork: "Cómo Trabajamos", difference: "La Diferencia", investment: "Inversión", contact: "Hablemos", cta: "Iniciar proyecto" },
    hero: {
      eyebrow: "MARKETING PREMIUM DE PROPIEDADES",
      title: "Propiedades que",
      accent: "se venden solas.",
      subtitle: "Un estudio de marketing visual. Convertimos propiedades premium en contenido cinematográfico — y la estrategia para que el comprador actúe.",
      cta: "Solicitar análisis",
      cta2: "Ver qué creamos",
      reel: "Showreel",
    },
    kickers: {
      positioning: "Posicionamiento",
      identity: "Identidad",
      experience: "Qué Creamos",
      capabilities: "Cómo Trabajamos",
      difference: "La Diferencia",
      investment: "Inversión",
      contact: "Contacto",
    },
    statement: {
      title: "No es contenido. Es",
      accent: "deseo, diseñado.",
      text: "Las grandes propiedades pierden atención cuando su contenido no está a la altura de su valor. Construimos las imágenes, films y estrategia que hacen sentir —y actuar— a compradores y huéspedes.",
    },
    identity: {
      essence: "Una marca de intención, precisión y deseo.",
      tagline: "Northvale",
    },
    services: {
      title: "Todo lo que una propiedad necesita para destacar.",
      items: [
        { name: "Films Cinematográficos", desc: "Videos hero que vuelven inolvidable una propiedad — y convierten el scroll en reservas." },
        { name: "Reels Sociales", desc: "Contenido vertical y nativo, diseñado para viajar en Instagram, TikTok y Reels." },
        { name: "Fotografía Mejorada", desc: "Fotos actuales elevadas a calidad editorial — más luz, más nitidez, más deseo." },
        { name: "Antes / Después", desc: "El salto visual que cambia lo que sienten compradores y huéspedes." },
      ],
    },
    support: {
      title: "Un socio de marketing completo — no solo un productor.",
      items: [
        { name: "Estrategia y Campañas", desc: "Creatividad y segmentación que ponen la propiedad frente a la audiencia correcta." },
        { name: "Gestión de Redes", desc: "Una presencia premium y constante — planificada, producida y publicada." },
        { name: "Micrositios de Reserva Directa", desc: "Una página de reservas propia — te quedas con el huésped, evitas la comisión." },
        { name: "Identidad de Marca", desc: "Un nombre, una estética y una historia que vuelven destino a una propiedad." },
      ],
    },
    packages: {
      title: "Formas de trabajar juntos.",
      note: "Cada propiedad es distinta — el precio se arma por proyecto.",
      items: [
        { name: "Esencial", model: "Por proyecto", tagline: "Para una propiedad premium.", features: ["Fotografía mejorada", "Un reel cinematográfico", "Staging virtual (hasta 2 fotos)", "Entrega express 48 h"], cta: "Pedir presupuesto" },
        { name: "Signature", model: "Por proyecto", tagline: "El paquete cinematográfico completo.", features: ["Film cinematográfico", "Reels + fotos", "Fotografía mejorada", "Staging virtual", "Estrategia de contenido"], cta: "Pedir presupuesto", featured: true },
        { name: "Studio", model: "Mensual", tagline: "Para carteras y gestoras.", features: ["Todo lo de Signature", "Estrategia y campañas", "Gestión de redes", "Micrositio de reserva directa", "Reporte de rendimiento mensual"], cta: "Hablemos" },
      ],
    },
    beforeAfter: {
      title: "La misma propiedad. Otro deseo.",
      caption: "Desliza para comparar.",
      before: "Antes",
      after: "Después",
    },
    process: {
      title: "Un proceso preciso y premium.",
      steps: [
        { n: "01", t: "Analizamos", d: "Estudiamos la propiedad y su mercado." },
        { n: "02", t: "Concepto", d: "Diseñamos la historia visual que la vende." },
        { n: "03", t: "Producimos", d: "Creamos contenido cinematográfico con tus activos." },
        { n: "04", t: "Entregamos", d: "Activos listos para publicar que rinden." },
      ],
    },
    contact: {
      title: "Hagamos tu propiedad inolvidable.",
      subtitle: "Envíanos un anuncio. Te mostramos lo que es posible — sin costo.",
      name: "Nombre",
      email: "Email",
      url: "URL del anuncio",
      submit: "Solicitar análisis",
    },
    footer: { tagline: "Marketing visual premium para propiedades de lujo.", rights: "© 2026 Northvale. Todos los derechos reservados." },
    thanks: {
      title: "Gracias.",
      text: "Recibimos tu solicitud. Te contactamos en breve con el análisis de tu propiedad.",
      back: "Volver al inicio",
    },
  },
};
