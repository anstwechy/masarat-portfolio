import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SystemCard } from "@/components/system-card";
import { systems, systemCount } from "@/data/systems";

export const metadata: Metadata = {
  title: "Systems — Anas Almesbahi",
  description:
    "The systems of the Masarat platform — wallet & ledger, payments, vouchers, insurance, notifications, AML, voice AI, release management, dev-office workspace, and QA automation.",
};

export default function SystemsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24">
        <div className="section-shell">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">
            All systems
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            The Masarat platform
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            The systems I architected and engineered end to end — together
            forming a complete digital-banking and fintech platform.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/5 px-3 py-1 text-xs font-medium text-teal-300">
            <span className="font-display font-bold">{systemCount}</span>
            systems in this portfolio
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {systems.map((system, i) => (
              <SystemCard key={system.slug} system={system} index={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
