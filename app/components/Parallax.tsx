"use client";

import { useEffect } from "react";

/**
 * Parallax sutil basado en scroll: mueve elementos [data-parallax] según su
 * distancia al centro del viewport × data-parallax-speed. Actualiza la variable
 * CSS --py (el transform vive en CSS). rAF + passive scroll = eficiente.
 */
export default function Parallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!els.length) return;

    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      for (const el of els) {
        const speed = parseFloat(el.dataset.parallaxSpeed || "0.1");
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2 - vh / 2;
        el.style.setProperty("--py", `${(-center * speed).toFixed(1)}px`);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
