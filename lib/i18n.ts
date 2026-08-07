import { cookies, headers } from "next/headers";

export type Locale = "en" | "es";

/**
 * Resuelve el idioma del visitante del lado del servidor:
 * 1) Si eligió manualmente (cookie `locale`), se respeta.
 * 2) Si no, se detecta por el header Accept-Language del navegador.
 * 3) Default: inglés (idioma principal de la marca).
 */
export function resolveLocale(): Locale {
  const cookieLocale = cookies().get("locale")?.value;
  if (cookieLocale === "en" || cookieLocale === "es") return cookieLocale;

  const accept = (headers().get("accept-language") || "").toLowerCase();
  const first = accept.split(",")[0]?.trim() || "";
  return first.startsWith("es") ? "es" : "en";
}

type Item = { name: string; desc: string };

type Dict = {
  nav: { services: string; work: string; approach: string; contact: string; cta: string };
  hero: { eyebrow: string; title: string; accent: string; subtitle: string; cta: string; reel: string };
  statement: { eyebrow: string; title: string; accent: string; text: string };
  services: { eyebrow: string; title: string; items: Item[] };
  support: { eyebrow: string; title: string; items: Item[] };
  beforeAfter: { eyebrow: string; title: string; caption: string; before: string; after: string };
  process: { eyebrow: string; title: string; steps: { n: string; t: string; d: string }[] };
  work: { eyebrow: string; title: string; note: string };
  stories: { eyebrow: string; title: string; note: string };
  contact: {
    eyebrow: string; title: string; subtitle: string;
    name: string; email: string; url: string; submit: string;
  };
  footer: { tagline: string; rights: string };
};

export const translations: Record<Locale, Dict> = {
  en: {
    nav: { services: "Services", work: "Work", approach: "Approach", contact: "Contact", cta: "Free analysis" },
    hero: {
      eyebrow: "PREMIUM PROPERTY MARKETING",
      title: "Property marketing,",
      accent: "made cinematic.",
      subtitle: "We turn premium properties into cinematic content — and the strategy that makes them sell.",
      cta: "Get your free analysis",
      reel: "Showreel",
    },
    statement: {
      eyebrow: "WHY NORTHVALE",
      title: "This isn't just content. It's",
      accent: "desire.",
      text: "Great properties lose attention when their content doesn't match their value. We create the images, films and strategy that make buyers and guests feel something — and act.",
    },
    services: {
      eyebrow: "HOW NORTHVALE HELPS",
      title: "Everything your property needs to be seen.",
      items: [
        { name: "Cinematic Property Films", desc: "Signature films that make a property unforgettable and turn scrolls into bookings." },
        { name: "Social Reels", desc: "Vertical, platform-native content built to travel on Instagram, TikTok and Reels." },
        { name: "Enhanced Photography", desc: "Your existing photos, elevated to editorial quality — brighter, sharper, aspirational." },
        { name: "Before / After Transformations", desc: "The visual upgrade that changes how buyers and guests feel about the space." },
      ],
    },
    support: {
      eyebrow: "BEYOND CONTENT",
      title: "A full marketing partner, not just a producer.",
      items: [
        { name: "Ad Strategy & Campaigns", desc: "Creative and targeting that put your property in front of the right audience." },
        { name: "Social Media Management", desc: "A consistent, premium presence — planned, produced and posted." },
        { name: "Direct-Booking Microsites", desc: "Your own booking page, so you own the guest and skip the commission." },
        { name: "Property Brand Identity", desc: "A name, a look and a story that make a property feel like a destination." },
      ],
    },
    beforeAfter: {
      eyebrow: "THE TRANSFORMATION",
      title: "The same property. A different desire.",
      caption: "Drag to compare.",
      before: "Before",
      after: "After",
    },
    process: {
      eyebrow: "HOW IT WORKS",
      title: "A simple, premium process.",
      steps: [
        { n: "01", t: "We analyze", d: "We study your property and its market." },
        { n: "02", t: "We craft the concept", d: "We design the visual story that sells it." },
        { n: "03", t: "We produce", d: "We create cinematic content from your assets." },
        { n: "04", t: "We deliver", d: "Ready-to-publish assets that perform." },
      ],
    },
    work: { eyebrow: "SELECTED WORK", title: "Properties, reimagined.", note: "Portfolio coming soon." },
    stories: { eyebrow: "CLIENT STORIES", title: "Results worth showing.", note: "Case studies coming soon." },
    contact: {
      eyebrow: "GET STARTED",
      title: "Let's make your property unforgettable.",
      subtitle: "Send us your listing. We'll show you what's possible — free.",
      name: "Name",
      email: "Email",
      url: "Property listing URL",
      submit: "Get your free analysis",
    },
    footer: { tagline: "Premium visual marketing for luxury properties.", rights: "© 2026 Northvale. All rights reserved." },
  },
  es: {
    nav: { services: "Servicios", work: "Trabajo", approach: "Enfoque", contact: "Contacto", cta: "Análisis gratis" },
    hero: {
      eyebrow: "MARKETING PREMIUM DE PROPIEDADES",
      title: "Marketing inmobiliario,",
      accent: "hecho cine.",
      subtitle: "Convertimos propiedades premium en contenido cinematográfico — y la estrategia para que vendan.",
      cta: "Obtén tu análisis gratis",
      reel: "Showreel",
    },
    statement: {
      eyebrow: "POR QUÉ NORTHVALE",
      title: "No es solo contenido. Es",
      accent: "deseo.",
      text: "Las grandes propiedades pierden atención cuando su contenido no está a la altura de su valor. Creamos las imágenes, films y estrategia que hacen sentir —y actuar— a compradores y huéspedes.",
    },
    services: {
      eyebrow: "CÓMO AYUDA NORTHVALE",
      title: "Todo lo que tu propiedad necesita para destacar.",
      items: [
        { name: "Films Cinematográficos", desc: "Videos hero que vuelven inolvidable una propiedad y convierten el scroll en reservas." },
        { name: "Reels Sociales", desc: "Contenido vertical y nativo para Instagram, TikTok y Reels." },
        { name: "Fotografía Mejorada", desc: "Tus fotos actuales, elevadas a calidad editorial — más luz, más nitidez, más deseo." },
        { name: "Transformación Antes / Después", desc: "El salto visual que cambia lo que sienten compradores y huéspedes sobre el espacio." },
      ],
    },
    support: {
      eyebrow: "MÁS QUE CONTENIDO",
      title: "Un socio de marketing completo, no solo un productor.",
      items: [
        { name: "Estrategia y Campañas de Anuncios", desc: "Creatividad y segmentación que ponen tu propiedad frente a la audiencia correcta." },
        { name: "Gestión de Redes", desc: "Una presencia premium y constante — planificada, producida y publicada." },
        { name: "Micrositios de Reserva Directa", desc: "Tu propia página de reservas: te quedas con el huésped y evitas la comisión." },
        { name: "Identidad de Marca", desc: "Un nombre, una estética y una historia que vuelven destino a una propiedad." },
      ],
    },
    beforeAfter: {
      eyebrow: "LA TRANSFORMACIÓN",
      title: "La misma propiedad. Otro deseo.",
      caption: "Desliza para comparar.",
      before: "Antes",
      after: "Después",
    },
    process: {
      eyebrow: "CÓMO FUNCIONA",
      title: "Un proceso simple y premium.",
      steps: [
        { n: "01", t: "Analizamos", d: "Estudiamos tu propiedad y su mercado." },
        { n: "02", t: "Creamos el concepto", d: "Diseñamos la historia visual que la vende." },
        { n: "03", t: "Producimos", d: "Creamos contenido cinematográfico con tus activos." },
        { n: "04", t: "Entregamos", d: "Activos listos para publicar que rinden." },
      ],
    },
    work: { eyebrow: "TRABAJO SELECCIONADO", title: "Propiedades, reimaginadas.", note: "Portafolio próximamente." },
    stories: { eyebrow: "HISTORIAS DE CLIENTES", title: "Resultados para mostrar.", note: "Casos de estudio próximamente." },
    contact: {
      eyebrow: "EMPIEZA",
      title: "Hagamos tu propiedad inolvidable.",
      subtitle: "Envíanos tu anuncio. Te mostramos lo que es posible — gratis.",
      name: "Nombre",
      email: "Email",
      url: "URL del anuncio de la propiedad",
      submit: "Obtén tu análisis gratis",
    },
    footer: { tagline: "Marketing visual premium para propiedades de lujo.", rights: "© 2026 Northvale. Todos los derechos reservados." },
  },
};
