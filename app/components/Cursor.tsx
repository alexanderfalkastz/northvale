"use client";

import { useEffect } from "react";

/**
 * Cursor personalizado (estilo weichie.com): un punto que sigue al instante
 * y un anillo que lo persigue con inercia y crece sobre elementos interactivos.
 * Solo se activa en dispositivos con puntero fino (no táctil).
 */
export default function Cursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.append(dot, ring);
    document.body.classList.add("has-cursor");

    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2,
      rx = mx,
      ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const over = () => document.body.classList.add("cursor-hover");
    const out = () => document.body.classList.remove("cursor-hover");
    const targets = Array.from(
      document.querySelectorAll("a, button, [data-cursor], .media, .ba-frame")
    );
    targets.forEach((el) => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", over);
        el.removeEventListener("mouseleave", out);
      });
      dot.remove();
      ring.remove();
      document.body.classList.remove("has-cursor", "cursor-hover");
    };
  }, []);

  return null;
}
