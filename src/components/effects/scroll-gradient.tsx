"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-reactive ambient gradient. Two stacked radial gradients whose
 * positions and opacity shift with scroll progress, so the background hue
 * drifts as you move down and returns when you scroll up. Cheap (CSS vars
 * updated on scroll, no canvas), and the visual partner to the particle
 * field. Skipped under prefers-reduced-motion.
 */
export function ScrollGradient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let target = 0;
    let current = 0;
    let raf = 0;

    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };

    const loop = () => {
      current += (target - current) * 0.08;
      // shift hue + glow position with progress
      const hue = 160 + current * 90; // teal ~160 → blue/violet ~250
      const x = 50 + Math.sin(current * Math.PI) * 30;
      const y = 20 + current * 50;
      const intensity = 0.10 + current * 0.06;
      el.style.background = `radial-gradient(ellipse 70% 60% at ${x}% ${y}%, hsla(${hue}, 75%, 55%, ${intensity}), transparent 65%)`;
      if (Math.abs(target - current) > 0.001) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", kick, { passive: true });
    kick();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20"
    />
  );
}
