"use client";

import { useEffect } from "react";

/**
 * Marca el <html> con data-scrolled cuando el usuario baja, para que el nav
 * se afine con una sombra sutil (efecto premium de barra "sticky").
 * No renderiza nada.
 */
export default function ScrollHeader() {
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 24) document.documentElement.setAttribute("data-scrolled", "");
      else document.documentElement.removeAttribute("data-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
