"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { practices } from "@/data/site";
import {
  Scale,
  Database,
  Network,
  Activity,
  GitBranch,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  scale: Scale,
  database: Database,
  network: Network,
  activity: Activity,
  gitBranch: GitBranch,
  shield: ShieldCheck,
};

export function Practices() {
  return (
    <AnimatedSection
      id="practices"
      className="relative scroll-mt-24 py-24 sm:py-32"
    >
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">
            Engineering depth
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Built for money, not for demos
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            The hard parts done right — the patterns that make a fintech
            platform survive real load without losing a cent.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
          {practices.map((p) => {
            const Icon = icons[p.icon] ?? Activity;
            return (
              <div
                key={p.title}
                data-reveal-child
                className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/30"
              >
                {/* hover glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-teal-400/0 blur-2xl transition-all duration-500 group-hover:bg-teal-400/15" />
                <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/5 text-teal-300 transition-all duration-300 group-hover:scale-110 group-hover:bg-teal-400/15">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="relative mt-4 font-display text-base font-semibold text-white">
                  {p.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-400">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
