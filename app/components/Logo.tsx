"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Monograma de Northvale: picos "north/vale" en trazo grueso dentro de un aro
 * fino de precisión, con estrella-norte dorada. Marcado y reconocible a chico
 * y grande. `animate` dibuja el trazo al entrar en viewport.
 */
export default function Logo({
  variant = "mark",
  animate = false,
  className = "",
}: {
  variant?: "mark" | "full";
  animate?: boolean;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [drawn, setDrawn] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  return (
    <span className={`logo ${className}`.trim()}>
      <svg
        ref={ref}
        className={`logo-mark ${animate ? "logo-draw" : ""} ${drawn ? "drawn" : ""}`.trim()}
        viewBox="0 0 120 120"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="60" cy="60" r="52" pathLength={1} className="lg-stroke lg-frame" />
        <path d="M30 84 L60 40 L90 84" pathLength={1} className="lg-stroke lg-peak" />
        <path d="M44 84 L60 62 L76 84" pathLength={1} className="lg-stroke lg-peak lg-inner" />
        <circle cx="60" cy="40" r="4.6" className="lg-star" />
      </svg>
      {variant === "full" && <span className="logo-word">Northvale</span>}
    </span>
  );
}
