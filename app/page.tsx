import { resolveLocale, translations } from "../lib/i18n";
import LanguageToggle from "./components/LanguageToggle";
import BeforeAfter from "./components/BeforeAfter";
import Reveal from "./components/Reveal";

export const dynamic = "force-dynamic"; // idioma por-usuario (Accept-Language / cookie)

export default function Home() {
  const locale = resolveLocale();
  const t = translations[locale];

  return (
    <>
      {/* ---------- NAV ---------- */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#top" className="brand">
            North<b>vale</b>
          </a>
          <div className="nav-links">
            <a href="#services">{t.nav.services}</a>
            <a href="#work">{t.nav.work}</a>
            <a href="#process">{t.nav.process}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
          <LanguageToggle locale={locale} />
        </div>
      </nav>

      <main id="top">
        {/* ---------- HERO ---------- */}
        <header className="hero">
          <div className="hero-media" aria-hidden="true" />
          <div className="container hero-content">
            <span className="eyebrow">{t.hero.eyebrow}</span>
            <h1>{t.hero.title}</h1>
            <p className="sub sans">{t.hero.subtitle}</p>
            <a href="#contact" className="btn btn-primary">
              {t.hero.cta}
            </a>
          </div>
          <div className="scroll-cue" aria-hidden="true">
            <span className="line" />
          </div>
        </header>

        {/* ---------- PROBLEM ---------- */}
        <section className="section">
          <div className="container">
            <Reveal>
              <span className="eyebrow">{t.problem.eyebrow}</span>
              <p className="lead">{t.problem.text}</p>
            </Reveal>
          </div>
        </section>

        {/* ---------- SERVICES ---------- */}
        <section className="section" id="services">
          <div className="container">
            <Reveal className="section-head">
              <span className="eyebrow">{t.services.eyebrow}</span>
              <h2>{t.services.title}</h2>
            </Reveal>
            <div className="services-grid">
              {t.services.items.map((item, i) => (
                <Reveal as="article" className="service-card" key={i}>
                  <div className="num">{String(i + 1).padStart(2, "0")}</div>
                  <div
                    className={`media media--16x9 ${i === 0 || i === 1 ? "media--video" : ""}`}
                  >
                    <span className="media-label">{item.name}</span>
                  </div>
                  <h3>{item.name}</h3>
                  <p className="sans">{item.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- BEFORE / AFTER ---------- */}
        <section className="section">
          <div className="container">
            <Reveal className="section-head">
              <span className="eyebrow">{t.beforeAfter.eyebrow}</span>
              <h2>{t.beforeAfter.title}</h2>
            </Reveal>
            <Reveal>
              <BeforeAfter
                before={t.beforeAfter.before}
                after={t.beforeAfter.after}
                caption={t.beforeAfter.caption}
              />
            </Reveal>
          </div>
        </section>

        {/* ---------- PROCESS ---------- */}
        <section className="section" id="process">
          <div className="container">
            <Reveal className="section-head">
              <span className="eyebrow">{t.process.eyebrow}</span>
              <h2>{t.process.title}</h2>
            </Reveal>
            <div className="process-grid">
              {t.process.steps.map((s, i) => (
                <Reveal className="step" key={i}>
                  <div className="num">{s.n}</div>
                  <h3>{s.t}</h3>
                  <p className="sans">{s.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- WORK ---------- */}
        <section className="section" id="work">
          <div className="container">
            <Reveal className="section-head">
              <span className="eyebrow">{t.work.eyebrow}</span>
              <h2>{t.work.title}</h2>
            </Reveal>
            <div className="work-grid">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Reveal key={i}>
                  <div className={`media media--16x9 ${i % 3 === 0 ? "media--video" : ""}`}>
                    <span className="media-label">Northvale · 0{i + 1}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="work-note sans">{t.work.note}</p>
          </div>
        </section>

        {/* ---------- CONTACT ---------- */}
        <section className="section" id="contact">
          <div className="container contact-wrap">
            <Reveal>
              <span className="eyebrow">{t.contact.eyebrow}</span>
              <h2 style={{ fontSize: "clamp(1.9rem,3.5vw,2.9rem)" }}>{t.contact.title}</h2>
              <p className="sans" style={{ color: "var(--text-muted)", marginTop: 16 }}>
                {t.contact.subtitle}
              </p>
            </Reveal>
            <Reveal>
              <form className="form sans" method="POST" action="/api/contact">
                <input name="name" placeholder={t.contact.name} required />
                <input name="email" type="email" placeholder={t.contact.email} required />
                <input name="propertyUrl" placeholder={t.contact.url} />
                <button type="submit" className="btn btn-primary">
                  {t.contact.submit}
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="footer">
        <div className="footer-inner">
          <a href="#top" className="brand">
            North<b>vale</b>
          </a>
          <p className="sans">{t.footer.tagline}</p>
          <p className="sans">
            hello@northvale.com &nbsp;·&nbsp; {t.footer.rights}
          </p>
        </div>
      </footer>
    </>
  );
}
