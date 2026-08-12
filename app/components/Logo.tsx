"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Monograma original de Northvale: un círculo de precisión (tecnología) con
 * picos anidados ("north" / valle) y una estrella-norte en dorado.
 * `animate` dibuja el trazo cuando entra en viewport.
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
        <circle cx="60" cy="60" r="50" pathLength={1} className="lg-stroke" />
        <path d="M34 82 L60 42 L86 82" pathLength={1} className="lg-stroke" />
        <path d="M46 82 L60 60 L74 82" pathLength={1} className="lg-stroke lg-inner" />
        <circle cx="60" cy="42" r="3.4" className="lg-star" />
      </svg>
      {variant === "full" && <span className="logo-word">Northvale</span>}
    </span>
  );
}
