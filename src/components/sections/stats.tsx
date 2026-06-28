"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { stats } from "@/data/site";

/** Animated number counter — counts up when scrolled into view. */
function Counter({
  value,
  suffix,
}: {
  value: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const numeric = parseFloat(value);
    if (Number.isNaN(numeric)) {
      setDisplay(value);
      return;
    }
    const isInt = Number.isInteger(numeric);
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = numeric * eased;
      setDisplay(isInt ? Math.round(current).toString() : current.toFixed(1));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative border-y border-white/5 bg-white/[0.015] py-14">
      <div className="section-shell grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="font-display text-4xl font-bold text-gradient sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-2 text-sm leading-snug text-slate-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
