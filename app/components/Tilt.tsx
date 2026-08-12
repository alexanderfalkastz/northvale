"use client";

import { useRef } from "react";

/**
 * Inclinación 3D al mover el mouse (profundidad premium). Se desactiva en
 * dispositivos táctiles y con prefers-reduced-motion. Wrapper transparente.
 */
export default function Tilt({
  children,
  className = "",
  max = 7,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  [key: string]: any;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
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
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={ref}
      className={`tilt ${className}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </div>
  );
}
