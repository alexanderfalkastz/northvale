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

type Dict = {
  nav: { services: string; work: string; process: string; contact: string };
  hero: { eyebrow: string; title: string; subtitle: string; cta: string };
  problem: { eyebrow: string; text: string };
  services: {
    eyebrow: string;
    title: string;
    items: { name: string; desc: string }[];
  };
  beforeAfter: {
    eyebrow: string;
    title: string;
    caption: string;
    before: string;
    after: string;
  };
  process: {
    eyebrow: string;
    title: string;
    steps: { n: string; t: string; d: string }[];
  };
  work: { eyebrow: string; title: string; note: string };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    name: string;
    email: string;
    url: string;
    submit: string;
  };
  footer: { tagline: string; rights: string };
};

export const translations: Record<Locale, Dict> = {
  en: {
    nav: { services: "Services", work: "Work", process: "Process", contact: "Contact" },
    hero: {
      eyebrow: "PREMIUM PROPERTY MARKETING",
      title: "Transform your property into a cinematic experience.",
      subtitle:
        "We turn premium properties into cinematic content that commands attention and demand.",
      cta: "Request a free property analysis",
    },
    problem: {
      eyebrow: "THE PROBLEM",
      text: "Exceptional properties lose attention when their content fails to show their true value. Great architecture deserves great presentation.",
    },
    services: {
      eyebrow: "WHAT WE DO",
      title: "Content that sells the property before the visit.",
      items: [
        { name: "Cinematic Property Films", desc: "Signature films that make a property unforgettable." },
        { name: "Social Reels", desc: "Vertical content built for Instagram, TikTok and Reels." },
        { name: "Enhanced Photography", desc: "Your existing photos, elevated to editorial quality." },
        { name: "Before / After", desc: "The transformation that changes how buyers feel." },
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
    work: {
      eyebrow: "SELECTED WORK",
      title: "Properties, reimagined.",
      note: "Portfolio coming soon.",
    },
    contact: {
      eyebrow: "GET STARTED",
      title: "Get your free property analysis.",
      subtitle: "Send us your listing. We'll show you what's possible.",
      name: "Name",
      email: "Email",
      url: "Property listing URL",
      submit: "Request analysis",
    },
    footer: {
      tagline: "Premium visual marketing for luxury properties.",
      rights: "© 2026 Northvale. All rights reserved.",
    },
  },
  es: {
    nav: { services: "Servicios", work: "Trabajo", process: "Proceso", contact: "Contacto" },
    hero: {
      eyebrow: "MARKETING PREMIUM DE PROPIEDADES",
      title: "Transforma tu propiedad en una experiencia cinematográfica.",
      subtitle:
        "Convertimos propiedades premium en contenido cinematográfico que genera atención y deseo.",
      cta: "Solicita tu análisis gratuito",
    },
    problem: {
      eyebrow: "EL PROBLEMA",
      text: "Las propiedades excepcionales pierden atención cuando su contenido no muestra su verdadero valor. La gran arquitectura merece una gran presentación.",
    },
    services: {
      eyebrow: "QUÉ HACEMOS",
      title: "Contenido que vende la propiedad antes de la visita.",
      items: [
        { name: "Films Cinematográficos", desc: "Videos hero que vuelven inolvidable una propiedad." },
        { name: "Reels Sociales", desc: "Contenido vertical para Instagram, TikTok y Reels." },
        { name: "Fotografía Mejorada", desc: "Tus fotos actuales, elevadas a calidad editorial." },
        { name: "Antes / Después", desc: "La transformación que cambia lo que siente el comprador." },
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
    work: {
      eyebrow: "TRABAJO SELECCIONADO",
      title: "Propiedades, reimaginadas.",
      note: "Portafolio próximamente.",
    },
    contact: {
      eyebrow: "EMPIEZA",
      title: "Obtén tu análisis gratuito.",
      subtitle: "Envíanos tu anuncio. Te mostramos lo que es posible.",
      name: "Nombre",
      email: "Email",
      url: "URL del anuncio de la propiedad",
      submit: "Solicitar análisis",
    },
    footer: {
      tagline: "Marketing visual premium para propiedades de lujo.",
      rights: "© 2026 Northvale. Todos los derechos reservados.",
    },
  },
};
