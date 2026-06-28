"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Github } from "lucide-react";
import type { PortfolioSystem } from "@/data/systems";
import { Badge } from "@/components/ui/badge";

export function SystemDetailHeader({
  system,
}: {
  system: PortfolioSystem;
}) {
  return (
    <header className="relative overflow-hidden pt-28 pb-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(ellipse 60% 70% at 50% 0%, ${system.accent}22, transparent 70%)`,
        }}
        aria-hidden
      />

      <div className="section-shell relative">
        <Link
          href="/#systems"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-teal-300"
        >
          <ArrowLeft className="h-4 w-4" />
          All systems
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6"
        >
          <span
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: system.accent }}
          >
            {system.category}
          </span>
          <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            {system.name}
          </h1>
          {system.codename && (
            <p className="mt-1 text-base text-slate-500">{system.codename}</p>
          )}
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            {system.tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {system.stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          {system.repoUrl && (
            <a
              href={system.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover mt-6 inline-flex h-11 items-center gap-2 rounded-lg px-5 text-sm text-slate-200"
            >
              <Github className="h-4 w-4" />
              View repository
            </a>
          )}
        </motion.div>
      </div>
    </header>
  );
}
