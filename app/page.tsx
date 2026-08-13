import { resolveLocale, translations } from "../lib/i18n";
import LanguageToggle from "./components/LanguageToggle";
import Reveal from "./components/Reveal";
import TextReveal from "./components/TextReveal";
import ScrollHeader from "./components/ScrollHeader";
import ScrollProgress from "./components/ScrollProgress";
import SmoothScroll from "./components/SmoothScroll";
import Parallax from "./components/Parallax";
import Logo from "./components/Logo";
import Magnetic from "./components/Magnetic";

export const dynamic = "force-dynamic"; // idioma por-usuario (Accept-Language / cookie)

function Kicker({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="kicker">
      <span className="k-num">{n}</span>
      <span className="k-line" />
      {children}
    </p>
  );
}

export default function Home() {
  const locale = resolveLocale();
  const t = translations[locale];
  const marquee = [...t.services.items.map((i) => i.name), ...t.support.items.map((i) => i.name)];

  return (
    <>
      <ScrollHeader />
      <ScrollProgress />
      <SmoothScroll />
      <Parallax />

      {/* ---------- NAV ---------- */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#top" aria-label="Northvale">
            <Logo variant="full" />
          </a>
          <div className="nav-mid">
            <a href="#services">{t.nav.positioning}</a>
            <a href="#packages">{locale === "es" ? "Paquetes" : "Packages"}</a>
            <a href="#capabilities">{t.nav.approach}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
          <div className="nav-right">
            <LanguageToggle locale={locale} />
            <Magnetic>
              <a href="#contact" className="btn btn-ghost btn-sm">
                {t.nav.cta} <span className="arw" aria-hidden="true">→</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* ---------- IMPACT · hero ---------- */}
        <header className="hero">
          <div className="hero-fluid" aria-hidden="true">
            <span className="blob blob-a" />
            <span className="blob blob-b" />
            <span className="blob blob-c" />
          </div>
          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="kicker">{t.hero.eyebrow}</span>
              <h1>
                {t.hero.title} <span className="serif accent">{t.hero.accent}</span>
              </h1>
              <p className="sub">{t.hero.subtitle}</p>
              <div className="hero-cta">
                <Magnetic>
                  <a href="#contact" className="btn btn-primary">
                    {t.hero.cta} <span className="arw" aria-hidden="true">→</span>
                  </a>
                </Magnetic>
                <a href="#services" className="btn btn-ghost">{t.hero.cta2}</a>
              </div>
            </div>
            <div className="hero-panel invert">
              <Logo variant="mark" animate />
              <div className="hero-panel-word">{t.identity.tagline}</div>
              <p className="hero-panel-essence">
                <span className="serif">{t.identity.essence}</span>
              </p>
            </div>
          </div>
          <div className="container hero-foot" aria-hidden="true">
            <span className="scroll-cue">
              <span>SCROLL</span>
              <span className="line" />
            </span>
            <span className="kicker">
              <span className="k-num">◆</span> Northvale Studio
            </span>
          </div>
        </header>

        {/* ---------- marquee ---------- */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marquee, ...marquee].map((w, i) => (
              <span className="marquee-item" key={i}>
                {w}
                <span className="marquee-dot">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ---------- POSITIONING · manifiesto ---------- */}
        <section className="statement">
          <div className="container">
            <Reveal>
              <Kicker n="01">{t.kickers.positioning}</Kicker>
              <h2>
                {t.statement.title} <span className="serif accent">{t.statement.accent}</span>
              </h2>
              <p>{t.statement.text}</p>
            </Reveal>
          </div>
        </section>

        {/* ---------- EXPERIENCE · servicios (lista editorial) ---------- */}
        <section className="section section-top" id="services">
          <div className="container editorial">
            <div className="editorial-head">
              <Reveal className="section-head">
                <Kicker n="02">{t.kickers.experience}</Kicker>
                <TextReveal as="h2" text={t.services.title} />
              </Reveal>
            </div>
            <div className="editorial-body">
              <div className="svc-list">
                {t.services.items.map((item, i) => (
                  <Reveal as="a" href="#contact" className="svc-row" key={i} delay={i * 50}>
                    <span className="svc-ix">{String(i + 1).padStart(2, "0")}</span>
                    <span className="svc-main">
                      <span className="svc-name">{item.name}</span>
                      <span className="svc-desc">{item.desc}</span>
                    </span>
                    <span className="svc-arw" aria-hidden="true">→</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- CAPABILITIES ---------- */}
        <section className="section section-top" id="capabilities">
          <div className="container editorial">
            <div className="editorial-head">
              <Reveal className="section-head">
                <Kicker n="03">{t.kickers.capabilities}</Kicker>
                <TextReveal as="h2" text={t.support.title} />
              </Reveal>
            </div>
            <div className="editorial-body">
              <div className="support-grid">
                {t.support.items.map((item, i) => (
                  <Reveal as="article" className="support-card" key={i} delay={i * 70}>
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                  </Reveal>
                ))}
              </div>
              <Reveal className="section-head" style={{ marginTop: "clamp(48px,6vw,80px)" }}>
                <TextReveal as="h2" text={t.process.title} />
              </Reveal>
              <div className="process-grid">
                {t.process.steps.map((s, i) => (
                  <Reveal className="step" key={i} delay={i * 80}>
                    <span className="num">{s.n}</span>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- PACKAGES (tarjetas estilo Orionix) ---------- */}
        <section className="section section-top" id="packages">
          <div className="container">
            <Reveal className="section-head">
              <Kicker n="04">{locale === "es" ? "Paquetes" : "Packages"}</Kicker>
              <TextReveal as="h2" text={t.packages.title} />
              <p className="sub">{t.packages.note}</p>
            </Reveal>
            <div className="pkg-grid">
              {t.packages.items.map((p, i) => (
                <Reveal className={`pkg ${p.featured ? "pkg-featured" : ""}`} key={i} delay={i * 70}>
                  <span className="pkg-name">{p.name}</span>
                  <div className="pkg-tagline">{p.tagline}</div>
                  <ul className="pkg-features">
                    {p.features.map((f, j) => (
                      <li key={j}>{f}</li>
                    ))}
                  </ul>
                  <a href="#contact" className="btn btn-primary">
                    {p.cta} <span className="arw" aria-hidden="true">→</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA final ---------- */}
        <section className="section section-top cta-final invert" id="contact">
          <div className="container">
            <Reveal>
              <Kicker n="05">{t.kickers.contact}</Kicker>
              <h2>{t.contact.title}</h2>
              <p className="sub">{t.contact.subtitle}</p>
              <div className="cta-actions">
                <Magnetic>
                  <a href="mailto:hello@northvale.com" className="btn btn-primary btn-lg">
                    {t.contact.submit} <span className="arw" aria-hidden="true">→</span>
                  </a>
                </Magnetic>
                <span className="cta-email">hello@northvale.com</span>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="footer">
        <div className="footer-inner">
          <Logo variant="full" />
          <p>{t.footer.tagline}</p>
          <p>{t.footer.rights}</p>
        </div>
      </footer>
    </>
  );
}
