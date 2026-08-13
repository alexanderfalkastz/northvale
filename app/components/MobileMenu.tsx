"use client";

import { useEffect, useState } from "react";

type Link = { href: string; label: string };

/**
 * Menú mobile: botón hamburguesa + overlay a pantalla completa con los enlaces
 * y el CTA. Bloquea el scroll del body mientras está abierto. Solo se muestra en
 * pantallas chicas (el botón está oculto por CSS en desktop).
 */
export default function MobileMenu({ links, cta }: { links: Link[]; cta: Link }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        className="menu-btn"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`menu-icon ${open ? "open" : ""}`}>
          <i />
          <i />
        </span>
      </button>

      <div className={`menu-overlay ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
        <nav className="menu-nav" onClick={(e) => e.stopPropagation()}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href={cta.href} className="btn btn-primary" onClick={() => setOpen(false)}>
            {cta.label} <span className="arw" aria-hidden="true">→</span>
          </a>
        </nav>
      </div>
    </>
  );
}
