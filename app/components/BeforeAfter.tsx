"use client";

import { useState } from "react";

/**
 * Comparador antes/después interactivo. Con placeholders por ahora:
 * el panel "before" se ve apagado y el "after" cinematográfico.
 * Cuando haya media real, reemplazar los divs .ba-img por <img>/<video>.
 */
export default function BeforeAfter({
  before,
  after,
  caption,
}: {
  before: string;
  after: string;
  caption: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="ba">
      <div className="ba-frame">
        {/* Placeholder "before" (apagado). Reemplazar por <img className="ba-media" src=... /> */}
        <div className="ba-img ba-before">
          <span className="ba-tag">{before}</span>
        </div>
        {/* Placeholder "after" (cinematográfico), recortado según el slider */}
        <div className="ba-img ba-after" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <span className="ba-tag ba-tag--gold">{after}</span>
        </div>
        <div className="ba-divider" style={{ left: `${pos}%` }}>
          <span className="ba-handle" />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="ba-range"
          aria-label="Compare before and after"
        />
      </div>
      <p className="ba-caption sans">{caption}</p>
    </div>
  );
}
