"use client";

import { motion } from "motion/react";
import { Mail, Github, MapPin, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 border-t border-white/5 py-24 sm:py-32"
    >
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl glass p-8 sm:p-14"
        >
          {/* Background beam */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(45,212,191,0.18), transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">
              Let&apos;s talk
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              Building something that handles real money?
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              I&apos;m open to senior engineering, architecture, and head-of
              roles. Reach out and let&apos;s build.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex h-12 items-center gap-2 rounded-lg bg-teal-400 px-7 font-semibold text-ink-950 transition-all hover:bg-teal-300 hover:shadow-[0_0_36px_-8px_rgba(45,212,191,0.7)]"
              >
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover inline-flex h-12 items-center gap-2 rounded-lg px-7 text-slate-200"
              >
                <Github className="h-4 w-4" />
                @{profile.githubHandle}
                <ArrowUpRight className="h-4 w-4 opacity-50" />
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4" />
              {profile.org} · {profile.location}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
