import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { systems, systemBySlug } from "@/data/systems";
import { SystemDetailHeader } from "@/components/system-detail-header";
import { Mermaid } from "@/components/mermaid";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Check } from "lucide-react";

export function generateStaticParams() {
  return systems.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const system = systemBySlug(slug);
  if (!system) return { title: "System — Anas Almesbahi" };
  return {
    title: `${system.name} — Anas Almesbahi`,
    description: system.tagline,
    openGraph: {
      title: `${system.name} — Anas Almesbahi`,
      description: system.tagline,
    },
  };
}

export default async function SystemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const system = systemBySlug(slug);
  if (!system) notFound();

  return (
    <>
      <Navbar />
      <main>
        <SystemDetailHeader system={system} />

        <div className="section-shell pb-24">
          {/* Impact banner */}
          <div
            className="relative overflow-hidden rounded-2xl border p-6 sm:p-7"
            style={{
              borderColor: `${system.accent}33`,
              background: `linear-gradient(135deg, ${system.accent}11, transparent 60%)`,
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              In one line
            </p>
            <p className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
              {system.impact}
            </p>
          </div>

          {/* Problem & Role */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="glass rounded-2xl p-7">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-teal-400">
                The problem
              </h2>
              <p className="mt-3 leading-relaxed text-slate-300">
                {system.problem}
              </p>
            </section>
            <section className="glass rounded-2xl p-7">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-teal-400">
                My role
              </h2>
              <p className="mt-3 leading-relaxed text-slate-300">
                {system.role}
              </p>
            </section>
          </div>

          {/* Architecture */}
          <section className="mt-12">
            <div className="flex items-center gap-3">
              <span
                className="font-display text-sm font-bold"
                style={{ color: system.accent }}
              >
                01
              </span>
              <h2 className="font-display text-2xl font-bold text-white">
                Architecture
              </h2>
            </div>
            <p className="mt-3 max-w-3xl leading-relaxed text-slate-400">
              {system.architecture}
            </p>
            <div className="glass mt-6 rounded-2xl p-6 sm:p-8">
              <Mermaid chart={system.architectureMermaid} id={system.slug} />
            </div>
          </section>

          {/* Highlights */}
          <section className="mt-12">
            <div className="flex items-center gap-3">
              <span
                className="font-display text-sm font-bold"
                style={{ color: system.accent }}
              >
                02
              </span>
              <h2 className="font-display text-2xl font-bold text-white">
                Highlights
              </h2>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {system.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4 transition-colors hover:border-teal-400/25"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ background: `${system.accent}22` }}
                  >
                    <Check
                      className="h-3 w-3"
                      style={{ color: system.accent }}
                    />
                  </span>
                  <span className="text-sm leading-relaxed text-slate-300">
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Capabilities */}
          <section className="mt-12">
            <div className="flex items-center gap-3">
              <span
                className="font-display text-sm font-bold"
                style={{ color: system.accent }}
              >
                03
              </span>
              <h2 className="font-display text-2xl font-bold text-white">
                Capabilities
              </h2>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {system.capabilities.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-slate-300 transition-colors hover:border-white/8 hover:bg-white/[0.02]"
                >
                  <span
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: system.accent }}
                  />
                  <span className="text-sm leading-relaxed">{c}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Metrics */}
          <section className="mt-12">
            <div className="flex items-center gap-3">
              <span
                className="font-display text-sm font-bold"
                style={{ color: system.accent }}
              >
                04
              </span>
              <h2 className="font-display text-2xl font-bold text-white">
                At a glance
              </h2>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {system.metrics.map((m) => (
                <div
                  key={m.label}
                  className="glass rounded-xl p-5 text-center"
                >
                  <div
                    className="font-display text-3xl font-bold"
                    style={{ color: system.accent }}
                  >
                    {m.value}
                  </div>
                  <div className="mt-1 text-xs leading-tight text-slate-500">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
