"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { CursorSpotlight } from "@/components/effects/cursor-spotlight";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { ParticleField } from "@/components/effects/particle-field";
import { ScrollGradient } from "@/components/effects/scroll-gradient";
import { ScrollProgress } from "@/components/effects/scroll-progress";

/**
 * Initializes Lenis smooth scrolling for the whole app and mounts the
 * global cinematic effects: scroll-reactive particle network + gradient,
 * cursor spotlight, and GSAP scroll reveals. All effects respect
 * prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Anchor link smooth scrolling via Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80 });
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <ScrollGradient />
      <ParticleField />
      <CursorSpotlight />
      <ScrollReveal />
      {children}
    </>
  );
}
