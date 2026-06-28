"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioSystem } from "@/data/systems";
import { Badge } from "@/components/ui/badge";

export function SystemCard({
  system,
  index,
}: {
  system: PortfolioSystem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
    >
      <Link
        href={`/systems/${system.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass glass-hover p-6 sm:p-7"
        style={
          { "--card-accent": system.accent } as React.CSSProperties
        }
      >
        {/* Accent glow on hover */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
          style={{ background: system.accent }}
          aria-hidden
        />

        <div className="relative flex items-start justify-between gap-3">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: system.accent }}
            >
              {system.category}
            </span>
            <h3 className="mt-2 font-display text-xl font-bold text-white">
              {system.name}
            </h3>
            {system.codename && (
              <p className="text-xs text-slate-500">{system.codename}</p>
            )}
          </div>
          <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-300" />
        </div>

        <p className="relative mt-4 flex-1 text-sm leading-relaxed text-slate-400">
          {system.tagline}
        </p>

        {/* Metrics row */}
        <div className="relative mt-5 flex flex-wrap gap-x-5 gap-y-2 border-y border-white/5 py-4">
          {system.metrics.map((m) => (
            <div key={m.label}>
              <div
                className="font-display text-lg font-bold"
                style={{ color: system.accent }}
              >
                {m.value}
              </div>
              <div className="text-[11px] leading-tight text-slate-500">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Stack badges */}
        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {system.stack.slice(0, 5).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {system.stack.length > 5 && (
            <Badge className="text-slate-500">
              +{system.stack.length - 5}
            </Badge>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
