"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Objeto 3D del hero: un cristal facetado (gema) metálico que flota, gira lento
 * y reacciona sutilmente al mouse. Fondo transparente (deja ver el gradiente CSS).
 * Robusto: si WebGL no está disponible, no hace nada (el hero conserva su fondo).
 * Respeta prefers-reduced-motion (queda casi estático).
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
      return; // sin WebGL → fallback silencioso
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
    camera.position.set(0, 0, 4.4);

    const group = new THREE.Group();
    scene.add(group);

    const geo = new THREE.IcosahedronGeometry(1.35, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xc79a55,
      metalness: 0.5,
      roughness: 0.32,
      flatShading: true,
    });
    const gem = new THREE.Mesh(geo, mat);
    group.add(gem);

    // capa wireframe fina (detalle "tech")
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.52, 1),
      new THREE.MeshBasicMaterial({ color: 0xd8b071, wireframe: true, transparent: true, opacity: 0.14 })
    );
    group.add(wire);

    // luces cálidas
    scene.add(new THREE.AmbientLight(0xfff3e2, 0.55));
    const key = new THREE.DirectionalLight(0xffd9a0, 1.3);
    key.position.set(3, 4, 3);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xbcd2ff, 0.55);
    fill.position.set(-4, -1, 2);
    scene.add(fill);
    const rim = new THREE.PointLight(0xffc27a, 0.8, 20);
    rim.position.set(-2, 2, -3);
    scene.add(rim);

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
      group.rotation.y += reduce ? 0 : 0.0026;
      group.rotation.x = cur.y * 0.4 + (reduce ? 0 : Math.sin(t * 0.4) * 0.06);
      group.rotation.z = cur.x * 0.18;
      group.position.y = reduce ? 0 : Math.sin(t * 0.7) * 0.09;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      wire.geometry.dispose();
      (wire.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="hero-3d" aria-hidden="true" />;
}
