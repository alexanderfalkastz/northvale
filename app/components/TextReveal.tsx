"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Titular que se revela palabra por palabra, subiendo desde una máscara
 * (estilo weichie.com data-text-reveal). Accesible: el texto real va en
 * aria-label y las palabras animadas son aria-hidden.
 */
export default function TextReveal({
  text,
  as: Tag = "h2",
  className = "",
}: {
  text: string;
  as?: any;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={`tr ${inView ? "in" : ""} ${className}`.trim()} aria-label={text}>
      {words.map((w, i) => (
        <span className="tr-word" key={i} aria-hidden="true">
          <span className="tr-inner" style={{ transitionDelay: `${i * 55}ms` }}>
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
