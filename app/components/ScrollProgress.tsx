"use client";

import { useEffect, useRef } from "react";

/**
 * Barra fina de progreso de scroll en el borde superior (detalle premium,
 * inspirado en Oroya). Escala en X según el avance de la página.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    let ticking = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      bar.style.transform = `scaleX(${p})`;
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

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={ref} className="scroll-progress-bar" />
    </div>
  );
}
