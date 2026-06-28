import type { Metadata } from "next";
import { profile, career, techStack, practices } from "@/data/site";
import { systems } from "@/data/systems";
import { PrintBar } from "@/components/print-bar";

export const metadata: Metadata = {
  title: "CV — Anas Almesbahi",
  description: `Printable CV of ${profile.name}, ${profile.title}.`,
  robots: { index: false, follow: false },
};

export default function ResumePage() {
  const allTech = techStack.flatMap((g) => g.items);
  return (
    <>
      {/* On-screen toolbar (hidden when printing) */}
      <PrintBar />

      {/* The printable CV */}
      <main className="resume mx-auto max-w-[820px] px-6 py-10 text-ink-900 sm:px-10 sm:py-14">
        {/* Header */}
        <header className="border-b-2 border-teal-600 pb-4">
          <h1 className="text-3xl font-bold tracking-tight text-navy-700">
            {profile.name}
          </h1>
          <p className="mt-1 text-lg font-semibold text-teal-700">
            {profile.title} · {profile.org} · {profile.location}
          </p>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            {profile.yearsExperience} years of experience architecting and
            engineering fintech and banking systems. {profile.availability}.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-600">
            <span>{profile.email}</span>
            <span>{profile.phone}</span>
            <span>{profile.github}</span>
            <span>{profile.linkedin}</span>
          </div>
        </header>

        {/* Summary */}
        <section className="mt-5">
          <h2 className="resume-heading">Summary</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
            {profile.intro}
          </p>
        </section>

        {/* Experience */}
        <section className="mt-5">
          <h2 className="resume-heading">Experience</h2>
          <div className="mt-2 space-y-4">
            {career.map((job) => (
              <div key={job.role + job.period}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="text-sm font-bold text-navy-700">
                    {job.role} ·{" "}
                    <span className="font-semibold text-teal-700">
                      {job.org}
                    </span>
                  </h3>
                  <span className="text-xs text-slate-500">{job.period}</span>
                </div>
                <ul className="mt-1 list-disc space-y-0.5 pl-5 text-xs leading-relaxed text-slate-700">
                  {job.achievements.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Key systems */}
        <section className="mt-5">
          <h2 className="resume-heading">Selected systems (of {systems.length})</h2>
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {systems.map((s) => (
              <div key={s.slug} className="text-xs">
                <span className="font-bold text-navy-700">{s.name}</span>
                <span className="text-slate-600"> — {s.impact}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mt-5">
          <h2 className="resume-heading">Technical skills</h2>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-700">
            {allTech.join(" · ")}
          </p>
        </section>

        {/* Engineering highlights */}
        <section className="mt-5">
          <h2 className="resume-heading">Engineering highlights</h2>
          <ul className="mt-1.5 list-disc space-y-0.5 pl-5 text-xs leading-relaxed text-slate-700">
            {practices.map((p) => (
              <li key={p.title}>
                <span className="font-semibold">{p.title}</span> —{" "}
                {p.description}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
