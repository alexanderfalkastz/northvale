import { resolveLocale, translations } from "../lib/i18n";
import LanguageToggle from "./components/LanguageToggle";
import BeforeAfter from "./components/BeforeAfter";
import Reveal from "./components/Reveal";
import TextReveal from "./components/TextReveal";
import ScrollHeader from "./components/ScrollHeader";
import SmoothScroll from "./components/SmoothScroll";
import Parallax from "./components/Parallax";
import Logo from "./components/Logo";
import Hero3D from "./components/Hero3D";
import Tilt from "./components/Tilt";
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
      <SmoothScroll />
      <Parallax />

      {/* ---------- NAV ---------- */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#top" aria-label="Northvale">
            <Logo variant="full" />
          </a>
          <div className="nav-mid">
            <a href="#experience">{t.nav.positioning}</a>
            <a href="#work">{t.nav.work}</a>
            <a href="#capabilities">{t.nav.approach}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
          <div className="nav-right">
            <LanguageToggle locale={locale} />
            <a href="#contact" className="btn btn-ghost btn-sm">
              {t.nav.cta} <span className="arw" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* ---------- 01 · IMPACT (hero) ---------- */}
        <header className="hero">
          <div className="hero-fluid" aria-hidden="true">
            <span className="blob blob-a" />
            <span className="blob blob-b" />
            <span className="blob blob-c" />
          </div>
          <Hero3D />
          <div className="container hero-inner">
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
              <a href="#work" className="btn btn-ghost">{t.hero.cta2}</a>
            </div>
          </div>
          <div className="container hero-foot" aria-hidden="true">
            <span className="scroll-cue">
              <span>SCROLL</span>
              <span className="line" />
            </span>
            <span className="kicker">
              <span className="k-num">01</span> Impact
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

        {/* ---------- 01 · POSITIONING (manifiesto) ---------- */}
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

        {/* ---------- 02 · IDENTITY (logo protagonista) ---------- */}
        <section className="identity invert">
          <div className="identity-glow" data-parallax data-parallax-speed="0.05" aria-hidden="true" />
          <Reveal>
            <Kicker n="02">{t.kickers.identity}</Kicker>
          </Reveal>
          <div className="identity-mark" data-parallax data-parallax-speed="0.06">
            <Logo variant="mark" animate />
          </div>
          <Reveal>
            <div className="identity-word">{t.identity.tagline}</div>
          </Reveal>
          <Reveal delay={120}>
            <p className="identity-essence">
              <span className="serif">{t.identity.essence}</span>
            </p>
          </Reveal>
        </section>

        {/* ---------- 03 · EXPERIENCE (servicios) ---------- */}
        <section className="section section-top" id="experience">
          <div className="container">
            <Reveal className="section-head">
              <Kicker n="03">{t.kickers.experience}</Kicker>
              <TextReveal as="h2" text={t.services.title} />
            </Reveal>
            <div className="service-rows">
              {t.services.items.map((item, i) => (
                <Reveal as="article" className="service-row" key={i} delay={i * 40}>
                  <div className="service-media">
                    <Tilt>
                      <div className={`media media--16x9 hoverable ${i < 2 ? "media--video" : ""}`}>
                        <span className="media-label">{item.name}</span>
                      </div>
                    </Tilt>
                  </div>
                  <div className="service-text">
                    <span className="num">{String(i + 1).padStart(2, "0")} / 04</span>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 04 · CAPABILITIES (support + proceso) ---------- */}
        <section className="section section-top" id="capabilities">
          <div className="container">
            <Reveal className="section-head">
              <Kicker n="04">{t.kickers.capabilities}</Kicker>
              <TextReveal as="h2" text={t.support.title} />
            </Reveal>
            <div className="support-grid">
              {t.support.items.map((item, i) => (
                <Reveal as="article" className="support-card" key={i} delay={i * 70}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="section-head" style={{ marginTop: "clamp(64px,8vw,110px)" }}>
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
        </section>

        {/* ---------- 05 · PROOF (trabajo + antes/después) ---------- */}
        <section className="section section-top" id="work">
          <div className="container">
            <Reveal className="section-head">
              <Kicker n="05">{t.kickers.work}</Kicker>
              <TextReveal as="h2" text={t.work.title} />
            </Reveal>
            <div className="work-grid">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Reveal key={i} delay={(i % 3) * 70}>
                  <Tilt>
                    <div className={`media media--16x9 hoverable ${i % 3 === 0 ? "media--video" : ""}`}>
                      <span className="media-label">Northvale · 0{i + 1}</span>
                    </div>
                  </Tilt>
                </Reveal>
              ))}
            </div>
            <p className="work-note">{t.work.note}</p>

            <Reveal className="section-head" style={{ marginTop: "clamp(64px,8vw,110px)" }}>
              <TextReveal as="h2" text={t.beforeAfter.title} />
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

        {/* ---------- 06 · CTA (contacto) ---------- */}
        <section className="section section-top" id="contact">
          <div className="container contact-wrap">
            <Reveal>
              <Kicker n="06">{t.kickers.contact}</Kicker>
              <h2>{t.contact.title}</h2>
              <p className="sub">{t.contact.subtitle}</p>
            </Reveal>
            <Reveal delay={80}>
              <form className="form" method="POST" action="/api/contact">
                <input name="name" placeholder={t.contact.name} required />
                <input name="email" type="email" placeholder={t.contact.email} required />
                <input name="propertyUrl" placeholder={t.contact.url} />
                <button type="submit" className="btn btn-primary">
                  {t.contact.submit} <span className="arw" aria-hidden="true">→</span>
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="footer">
        <div className="footer-inner">
          <Logo variant="full" />
          <p>{t.footer.tagline}</p>
          <p>hello@northvale.com &nbsp;·&nbsp; {t.footer.rights}</p>
        </div>
      </footer>
    </>
  );
}
