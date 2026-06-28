"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SystemCard } from "@/components/system-card";
import { systems, categories } from "@/data/systems";
import { cn } from "@/lib/utils";

export function SystemsShowcase() {
  const [filter, setFilter] = useState<string>("All");

  const filtered =
    filter === "All"
      ? systems
      : systems.filter((s) => s.category === filter);

  const filters = ["All", ...categories];

  return (
    <AnimatedSection
      id="systems"
      className="relative scroll-mt-24 py-24 sm:py-32"
    >
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">
            The work
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Ten systems. One platform.
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            A complete fintech & banking-adjacent platform — wallet, payments,
            vouchers, insurance, notifications, AML, voice AI, release
            management, an internal dev-office workspace, and QA automation.
            Click any card for the full architecture.
          </p>
        </div>

        {/* Filter pills */}
        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                filter === f
                  ? "border-teal-400/50 bg-teal-400/15 text-teal-200"
                  : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((system, i) => (
            <SystemCard key={system.slug} system={system} index={i} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
