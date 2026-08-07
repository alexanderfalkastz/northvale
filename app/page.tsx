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
          <a href="#top" className="brand">Northvale</a>
          <div className="nav-mid">
            <a href="#services">{t.nav.services}</a>
            <a href="#work">{t.nav.work}</a>
            <a href="#process">{t.nav.approach}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
          <div className="nav-right">
            <LanguageToggle locale={locale} />
            <a href="#contact" className="btn btn-dark btn-sm">{t.nav.cta}</a>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* ---------- HERO ---------- */}
        <header className="hero">
          <div className="container">
            <div className="hero-copy">
              <span className="eyebrow">{t.hero.eyebrow}</span>
              <h1>
                {t.hero.title} <span className="serif accent">{t.hero.accent}</span>
              </h1>
              <p className="sub">{t.hero.subtitle}</p>
              <a href="#contact" className="btn btn-dark">{t.hero.cta}</a>
            </div>
            <div className="hero-video media media--wide media--video">
              <span className="media-label">{t.hero.reel}</span>
            </div>
          </div>
        </header>

        {/* ---------- STATEMENT ---------- */}
        <section className="statement section-warm">
          <div className="container">
            <Reveal>
              <span className="eyebrow">{t.statement.eyebrow}</span>
              <h2>
                {t.statement.title} <span className="serif accent">{t.statement.accent}</span>
              </h2>
              <p>{t.statement.text}</p>
            </Reveal>
          </div>
        </section>

        {/* ---------- SERVICES (main) ---------- */}
        <section className="section" id="services">
          <div className="container">
            <Reveal className="section-head">
              <span className="eyebrow">{t.services.eyebrow}</span>
              <h2>{t.services.title}</h2>
            </Reveal>
            <div className="service-rows">
              {t.services.items.map((item, i) => (
                <Reveal as="article" className="service-row" key={i}>
                  <div className="service-media">
                    <div className={`media media--16x9 ${i < 2 ? "media--video" : ""}`}>
                      <span className="media-label">{item.name}</span>
                    </div>
                  </div>
                  <div className="service-text">
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- SUPPORT (beyond content) ---------- */}
        <section className="section section-warm">
          <div className="container">
            <Reveal className="section-head">
              <span className="eyebrow">{t.support.eyebrow}</span>
              <h2>{t.support.title}</h2>
            </Reveal>
            <div className="support-grid">
              {t.support.items.map((item, i) => (
                <Reveal as="article" className="support-card" key={i}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
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
        <section className="section section-warm" id="process">
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
                  <p>{s.d}</p>
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
            <p className="work-note">{t.work.note}</p>
          </div>
        </section>

        {/* ---------- STORIES ---------- */}
        <section className="section section-warm">
          <div className="container">
            <Reveal className="section-head" style={{ marginBottom: 32 }}>
              <span className="eyebrow">{t.stories.eyebrow}</span>
              <h2>{t.stories.title}</h2>
            </Reveal>
            <Reveal>
              <p className="work-note" style={{ marginTop: 0 }}>{t.stories.note}</p>
            </Reveal>
          </div>
        </section>

        {/* ---------- CONTACT ---------- */}
        <section className="section" id="contact">
          <div className="container contact-wrap">
            <Reveal>
              <span className="eyebrow">{t.contact.eyebrow}</span>
              <h2>{t.contact.title}</h2>
              <p className="sub">{t.contact.subtitle}</p>
            </Reveal>
            <Reveal>
              <form className="form" method="POST" action="/api/contact">
                <input name="name" placeholder={t.contact.name} required />
                <input name="email" type="email" placeholder={t.contact.email} required />
                <input name="propertyUrl" placeholder={t.contact.url} />
                <button type="submit" className="btn btn-dark">{t.contact.submit}</button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="footer">
        <div className="footer-inner">
          <a href="#top" className="brand">Northvale</a>
          <p>{t.footer.tagline}</p>
          <p>hello@northvale.com &nbsp;·&nbsp; {t.footer.rights}</p>
        </div>
      </footer>
    </>
  );
}
