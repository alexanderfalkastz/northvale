"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Link = { href: string; label: string };

/**
 * Menú mobile: botón hamburguesa + overlay a pantalla completa (renderizado con
 * portal a document.body para escapar del backdrop-filter del nav, que si no
 * atrapa a los position:fixed). Bloquea el scroll del body al abrir.
 */
export default function MobileMenu({ links, cta }: { links: Link[]; cta: Link }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlay = (
    <div className={`menu-overlay ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
      <button className="menu-close" aria-label="Cerrar menú" onClick={() => setOpen(false)} />
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
  );

  return (
    <>
      <button
        className="menu-btn"
        aria-label="Abrir menú"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className="menu-icon">
          <i />
          <i />
        </span>
      </button>
      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
