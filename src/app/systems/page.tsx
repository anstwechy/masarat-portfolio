import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SystemCard } from "@/components/system-card";
import { systems } from "@/data/systems";

export const metadata: Metadata = {
  title: "Systems — Anas Almesbahi",
  description:
    "All ten systems of the Masarat platform — wallet, payments, vouchers, insurance, notifications, AML, voice AI, release management, dev-office workspace, and QA automation.",
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
            Ten production systems, designed and built by a single engineer,
            forming a complete banking & fintech platform.
          </p>

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
