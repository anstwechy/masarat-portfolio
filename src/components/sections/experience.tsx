"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { career, profile } from "@/data/site";

export function Experience() {
  return (
    <AnimatedSection
      id="experience"
      className="relative scroll-mt-24 border-t border-white/5 py-24 sm:py-32"
    >
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">
            Experience
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            {profile.yearsExperience} years. One company. A steady climb.
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            I joined {profile.org} in 2018 as a specialist and rose to Head of
            Development through delivered, production-grade work — owning the
            architecture of an entire fintech platform.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-14">
          {/* vertical line */}
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-teal-400/60 via-white/10 to-transparent sm:left-[11px]"
            aria-hidden
          />

          <div className="space-y-10">
            {career.map((job, i) => (
              <div
                key={job.role + job.period}
                data-reveal
                className="relative pl-9 sm:pl-14"
              >
                {/* node */}
                <span
                  className={`absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 sm:h-[23px] sm:w-[23px] ${
                    job.current
                      ? "border-teal-400 bg-teal-400/20"
                      : "border-white/20 bg-ink-900"
                  }`}
                >
                  {job.current && (
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400 sm:h-2 sm:w-2" />
                  )}
                </span>

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-xl font-bold text-white">
                    {job.role}
                  </h3>
                  {job.current && (
                    <span className="rounded-full border border-teal-400/30 bg-teal-400/10 px-2.5 py-0.5 text-xs font-medium text-teal-300">
                      Current
                    </span>
                  )}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="font-medium text-teal-200">{job.org}</span>
                  <span className="text-slate-500">{job.period}</span>
                </div>

                <p className="mt-3 max-w-2xl leading-relaxed text-slate-400">
                  {job.summary}
                </p>

                <ul className="mt-3 space-y-1.5">
                  {job.achievements.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-2.5 text-sm text-slate-300"
                    >
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-teal-400/70" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
