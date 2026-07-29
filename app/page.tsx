export default function Home() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
      {/* Hero */}
      <section style={{ padding: "120px 0 80px", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: 24 }}>
          Transform your property into a cinematic experience.
        </h1>
        <p className="sans" style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: 40 }}>
          Northvale — Premium Property Content
        </p>
        <a
          href="#contact"
          className="sans"
          style={{
            display: "inline-block",
            padding: "14px 32px",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            textDecoration: "none",
            letterSpacing: "0.05em",
          }}
        >
          REQUEST A PROPERTY ANALYSIS
        </a>
      </section>

      {/* Problema */}
      <section style={{ padding: "60px 0", borderTop: "1px solid var(--border)" }}>
        <p className="sans" style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>
          Great properties often lose attention because their content does not
          show their true value.
        </p>
      </section>

      {/* Solución */}
      <section style={{ padding: "60px 0", borderTop: "1px solid var(--border)" }}>
        <h2 style={{ marginBottom: 16 }}>Our approach</h2>
        <p className="sans" style={{ color: "var(--text-muted)" }}>
          Premium visual content created from your existing property assets —
          cinematic video, enhanced photography, and content strategy designed
          to generate real attention and demand.
        </p>
      </section>

      {/* Proceso */}
      <section style={{ padding: "60px 0", borderTop: "1px solid var(--border)" }}>
        <h2 style={{ marginBottom: 24 }}>Process</h2>
        <ol className="sans" style={{ color: "var(--text-muted)", paddingLeft: 20 }}>
          <li style={{ marginBottom: 8 }}>We analyze your property</li>
          <li style={{ marginBottom: 8 }}>We create the concept</li>
          <li style={{ marginBottom: 8 }}>We produce the content</li>
          <li>We deliver assets ready to use</li>
        </ol>
      </section>

      {/* Contact form */}
      <section id="contact" style={{ padding: "80px 0", borderTop: "1px solid var(--border)" }}>
        <h2 style={{ marginBottom: 24 }}>Get your free property analysis</h2>
        <form
          className="sans"
          style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 420 }}
          method="POST"
          action="/api/contact"
        >
          <input
            name="name"
            placeholder="Name"
            required
            style={{ padding: 12, background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            style={{ padding: 12, background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
          />
          <input
            name="propertyUrl"
            placeholder="Property listing URL"
            style={{ padding: 12, background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
          />
          <button
            type="submit"
            style={{ padding: 14, background: "var(--accent)", color: "var(--bg)", border: "none", cursor: "pointer" }}
          >
            Submit
          </button>
        </form>
      </section>

      <footer className="sans" style={{ padding: "40px 0", color: "var(--text-muted)", fontSize: "0.85rem" }}>
        Northvale — hello@northvale.com
      </footer>
    </main>
  );
}
