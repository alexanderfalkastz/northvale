import { resolveLocale, translations } from "../../lib/i18n";

export const dynamic = "force-dynamic"; // idioma por-usuario (Accept-Language / cookie)

export default async function Gracias() {
  const locale = await resolveLocale();
  const t = translations[locale].thanks;

  return (
    <main style={{ maxWidth: 620, margin: "0 auto", padding: "180px 24px 120px", textAlign: "center" }}>
      <h1 style={{ fontSize: "clamp(2.4rem,6vw,4rem)", marginBottom: 20 }}>{t.title}</h1>
      <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.6, maxWidth: 460, margin: "0 auto" }}>
        {t.text}
      </p>
      <a href="/" className="btn btn-ghost" style={{ marginTop: 36 }}>
        {t.back}
      </a>
    </main>
  );
}
