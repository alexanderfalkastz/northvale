"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Objeto 3D del hero: un cristal geodésico de líneas finas doradas (delicado,
 * luminoso, "luxury tech") que flota, gira y reacciona sutilmente al mouse.
 * Usa MeshBasicMaterial (sin luces) para un color controlado y elegante — nada
 * de masas opacas. Fondo transparente. Robusto: si no hay WebGL, no hace nada.
 */
export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    const getSize = () => {
      const r = mount.getBoundingClientRect();
      return { w: Math.max(1, r.width), h: Math.max(1, r.height) };
    };
    let { w, h } = getSize();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 0, 4.6);

    const group = new THREE.Group();
    scene.add(group);

    // cáscara translúcida apenas visible (da volumen sin opacidad pesada)
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.4, 2),
      new THREE.MeshBasicMaterial({ color: 0xe9d4ac, transparent: true, opacity: 0.07 })
    );
    group.add(shell);

    // malla de líneas finas doradas (protagonista)
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.42, 2),
      new THREE.MeshBasicMaterial({ color: 0xb98a45, wireframe: true, transparent: true, opacity: 0.5 })
    );
    group.add(wire);

    // núcleo interior, gira en sentido inverso → profundidad y vida
    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.92, 1),
      new THREE.MeshBasicMaterial({ color: 0xc79a55, wireframe: true, transparent: true, opacity: 0.3 })
    );
    group.add(inner);

    // interacción mouse
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduce) window.addEventListener("mousemove", onMove);

    const onResize = () => {
      ({ w, h } = getSize());
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      const t = clock.getElapsedTime();
      cur.x += (target.x - cur.x) * 0.05;
      cur.y += (target.y - cur.y) * 0.05;
      const spin = reduce ? 0 : 1;
      group.rotation.y += 0.0022 * spin;
      group.rotation.x = cur.y * 0.35 + Math.sin(t * 0.35) * 0.05 * spin;
      group.rotation.z = cur.x * 0.14;
      inner.rotation.y -= 0.006 * spin;
      inner.rotation.x += 0.003 * spin;
      group.position.y = Math.sin(t * 0.6) * 0.08 * spin;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      [shell, wire, inner].forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="hero-3d" aria-hidden="true" />;
}
