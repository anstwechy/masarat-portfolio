"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Global GSAP scroll-reveal engine. On mount it looks for:
 *   [data-reveal]          → fades up when scrolled into view
 *   [data-reveal-stagger]  → container; its children animate in sequence
 *   [data-reveal-parallax] → gentle vertical parallax tied to scroll
 *
 * All triggers respect prefers-reduced-motion (skipped entirely).
 * Mounted once in the root providers.
 */
export function ScrollReveal() {
  useGSAP(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Simple fade-up reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      // Staggered groups — children reveal in sequence
      gsap.utils
        .toArray<HTMLElement>("[data-reveal-stagger]")
        .forEach((container) => {
          const children =
            container.querySelectorAll<HTMLElement>("[data-reveal-child]");
          gsap.from(children, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: container,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          });
        });

      // Subtle parallax
      gsap.utils.toArray<HTMLElement>("[data-reveal-parallax]").forEach((el) => {
        const depth = parseFloat(el.dataset.revealParallax || "0.15");
        gsap.to(el, {
          yPercent: -depth * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  });

  return null;
}

/** Refresh ScrollTrigger after route changes / dynamic content. */
export function useScrollTriggerRefresh() {
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);
}
