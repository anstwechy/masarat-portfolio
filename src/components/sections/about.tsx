"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { profile } from "@/data/site";

const focus = [
  "Backend architecture & microservices",
  "Double-entry ledger & money movement",
  "AI agents & speech (Arabic/Libyan)",
  "Risk & compliance (AML, sanctions/PEP)",
  "Cloud-native DevOps & observability",
  "Team leadership & technical direction",
];

export function About() {
  return (
    <AnimatedSection
      id="about"
      className="relative scroll-mt-24 py-24 sm:py-32"
    >
      <div className="section-shell grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">
            About
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Architecture & engineering across the whole platform.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            {profile.intro}
          </p>
          <p className="mt-4 leading-relaxed text-slate-400">
            As Head of Development at {profile.org} in {profile.location}, I
            lead a team of developers and own the technical direction of the
            platform — from architectural design through implementation,
            CI/CD, observability, load testing, and operational maintenance,
            across the Libyan banking and fintech domain.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Focus areas
          </p>
          <ul className="mt-4 space-y-3">
            {focus.map((f) => (
              <li
                key={f}
                className="flex items-center gap-3 text-slate-200"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-white/8 pt-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Currently
            </p>
            <p className="mt-2 text-slate-300">
              {profile.title} · {profile.org}
            </p>
            <p className="text-sm text-slate-500">{profile.location}</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
