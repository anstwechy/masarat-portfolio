"use client";

import { useEffect, useState } from "react";

/**
 * A thin gradient progress bar pinned to the very top of the viewport that
 * fills as the user scrolls down the page. Subtle, techy, and reinforces
 * the scroll-reactive theme. Skipped under prefers-reduced-motion.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full origin-left transition-[width] duration-75 ease-out"
        style={{
          width: `${progress * 100}%`,
          background:
            "linear-gradient(90deg, #5eead4, #2dd4bf, #38bdf8, #818cf8)",
          boxShadow: "0 0 10px rgba(45,212,191,0.6)",
        }}
      />
    </div>
  );
}
