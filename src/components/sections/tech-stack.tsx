"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { techStack } from "@/data/site";

export function TechStack() {
  return (
    <AnimatedSection
      id="stack"
      className="relative scroll-mt-24 border-t border-white/5 py-24 sm:py-32"
    >
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">
            Toolkit
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            A full-stack, polyglot arsenal
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            From ledger-accurate backends to mobile apps, from ML pipelines to
            observability — everything needed to ship and run production
            fintech.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((group) => (
            <div
              key={group.category}
              className="glass rounded-2xl p-6 transition-colors hover:border-teal-400/20"
            >
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-teal-300">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 text-sm text-slate-300 transition-colors hover:border-teal-400/30 hover:text-teal-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
