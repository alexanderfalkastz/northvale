"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "../../lib/i18n";

/**
 * Toggle manual EN/ES. Guarda la elección en una cookie y refresca:
 * el servidor vuelve a renderizar en el idioma elegido (override de la
 * detección automática por Accept-Language).
 */
export default function LanguageToggle({ locale }: { locale: Locale }) {
  const router = useRouter();

  const set = (l: Locale) => {
    document.cookie = `locale=${l}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = l;
    router.refresh();
  };

  return (
    <div className="lang sans" aria-label="Language selector">
      <button
        type="button"
        onClick={() => set("en")}
        className={locale === "en" ? "lang-on" : ""}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        onClick={() => set("es")}
        className={locale === "es" ? "lang-on" : ""}
        aria-pressed={locale === "es"}
      >
        ES
      </button>
    </div>
  );
}
