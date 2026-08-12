"use client";

import { useRef } from "react";

/**
 * Efecto magnético: el elemento se desplaza sutilmente hacia el cursor cuando
 * está cerca, y vuelve a su lugar al salir. Solo puntero fino, respeta
 * prefers-reduced-motion. Ideal para CTAs.
 */
export default function Magnetic({
  children,
  className = "",
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const enabled = useRef<boolean | null>(null);

  const allow = () => {
    if (enabled.current === null) {
      enabled.current =
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return enabled.current;
  };

  const onMove = (e: React.MouseEvent) => {
    if (!allow()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  };

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  );
}
