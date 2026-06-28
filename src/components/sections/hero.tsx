"use client";

import { motion } from "motion/react";
import { ArrowRight, Github, MapPin } from "lucide-react";
import { profile } from "@/data/site";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      {/* Spotlight effect (Aceternity-inspired) */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] animate-spotlight rounded-full bg-teal-400/20 opacity-0 blur-[120px]"
        style={{ transform: "translate(-50%, -40%)" }}
        aria-hidden
      />

      <div className="section-shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/5 px-3 py-1 text-xs font-medium text-teal-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
          </span>
          Available for senior engineering & architecture roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          {profile.name}
          <span className="block text-gradient">{profile.title}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#systems"
            className="group inline-flex h-12 items-center gap-2 rounded-lg bg-teal-400 px-7 font-semibold text-ink-950 transition-all hover:bg-teal-300 hover:shadow-[0_0_36px_-8px_rgba(45,212,191,0.7)]"
          >
            Explore the work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass glass-hover inline-flex h-12 items-center gap-2 rounded-lg px-7 text-slate-200"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex items-center gap-2 text-sm text-slate-500"
        >
          <MapPin className="h-4 w-4" />
          {profile.org} · {profile.location}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-1.5 w-1 rounded-full bg-teal-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
