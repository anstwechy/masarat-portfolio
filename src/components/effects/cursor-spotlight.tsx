"use client";

import { useEffect, useRef } from "react";

/**
 * Global cursor spotlight — a soft radial glow that follows the pointer,
 * giving the whole page a premium, interactive feel.
 * Disabled on touch devices and when prefers-reduced-motion is set.
 * Uses a single rAF-throttled listener; pointer-events: none so it never
 * blocks clicks.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // touch
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const loop = () => {
      // ease toward target for a smooth trailing glow
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(45,212,191,0.07) 0%, rgba(45,212,191,0.02) 35%, transparent 70%)",
        marginLeft: "-250px",
        marginTop: "-250px",
        willChange: "transform",
      }}
    />
  );
}
