"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-reactive particle network — a fixed full-screen canvas behind the
 * site content. Particles drift and connect with lines when close.
 *
 * The field reacts to scroll progress (0..1):
 *  - color palette crossfades through scenes (teal → blue → violet → emerald …)
 *  - particle speed and connection radius shift per scene
 *  - scrolling DOWN progresses forward; scrolling UP reverses — smoothly,
 *    because we ease the target progress, not snap it
 *
 * Performance: capped particle count by viewport, single rAF loop,
 * devicePixelRatio-aware, and fully disabled under prefers-reduced-motion.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    // --- Scene palette definitions (RGB triples) ---
    // Each scene = a colour + a "personality" (speed, link radius, density).
    const scenes = [
      { r: 94, g: 234, b: 212, speed: 0.35, link: 130, glow: true }, // hero teal
      { r: 56, g: 189, b: 248, speed: 0.30, link: 120, glow: true }, // sky
      { r: 129, g: 140, b: 248, speed: 0.45, link: 140, glow: true }, // indigo
      { r: 167, g: 139, b: 250, speed: 0.40, link: 135, glow: true }, // violet
      { r: 52, g: 211, b: 153, speed: 0.32, link: 125, glow: true }, // emerald
      { r: 45, g: 212, b: 191, speed: 0.50, link: 145, glow: true }, // teal
      { r: 14, g: 165, b: 233, speed: 0.28, link: 130, glow: true }, // cyan contact
    ];

    let width = 0;
    let height = 0;
    let dpr = 1;

    type P = { x: number; y: number; vx: number; vy: number };
    let particles: P[] = [];

    const buildParticles = () => {
      // density scales with area, capped for perf
      const target = Math.min(
        130,
        Math.floor((width * height) / 14000)
      );
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    // --- Scroll progress (eased so it ramps up/down smoothly) ---
    let scrollTarget = 0;
    let scrollCurrent = 0;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollTarget = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Interpolate the active scene's colour/behaviour from progress.
    const sceneAt = (p: number) => {
      const scaled = p * (scenes.length - 1);
      const i = Math.floor(scaled);
      const f = scaled - i;
      const a = scenes[i];
      const b = scenes[Math.min(i + 1, scenes.length - 1)];
      return {
        r: Math.round(lerp(a.r, b.r, f)),
        g: Math.round(lerp(a.g, b.g, f)),
        b: Math.round(lerp(a.b, b.b, f)),
        speed: lerp(a.speed, b.speed, f),
        link: lerp(a.link, b.link, f),
        glow: a.glow || b.glow,
      };
    };

    // Mouse parallax — particles gently pulled toward cursor
    let mx = width / 2;
    let my = height / 2;
    const onMouse = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    let raf = 0;
    const draw = () => {
      // ease scroll so it's smooth in both directions
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.06;
      const s = sceneAt(scrollCurrent);
      const col = (alpha: number) =>
        `rgba(${s.r}, ${s.g}, ${s.b}, ${alpha})`;

      ctx.clearRect(0, 0, width, height);

      // move + draw particles
      for (const p of particles) {
        p.x += p.vx * s.speed;
        p.y += p.vy * s.speed;

        // gentle mouse attraction
        const dxm = mx - p.x;
        const dym = my - p.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 220) {
          p.x += (dxm / dm) * 0.25;
          p.y += (dym / dm) * 0.25;
        }

        // wrap edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = col(0.55);
        if (s.glow) {
          ctx.shadowColor = col(0.6);
          ctx.shadowBlur = 8;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // connect close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < s.link) {
            const alpha = (1 - dist / s.link) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = col(alpha);
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-60"
    />
  );
}
