"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { profile } from "@/data/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#systems", label: "Systems" },
  { href: "#stack", label: "Stack" },
  { href: "#practices", label: "Engineering" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/5 bg-ink-950/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="section-shell flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/branding/masarat-mark.svg"
            alt="Masarat"
            className="h-7 w-7 transition-transform group-hover:scale-110"
          />
          <span className="font-display text-sm font-semibold tracking-wide text-white">
            {profile.name}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-slate-400 transition-colors hover:text-teal-300"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="hidden rounded-lg border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-200 transition-all hover:border-teal-400/60 hover:bg-teal-400/20 md:inline-block"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
