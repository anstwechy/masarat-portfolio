import Link from "next/link";
import { profile } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="section-shell flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/branding/masarat-mark.svg"
            alt="Masarat"
            className="h-6 w-6 opacity-80"
          />
          <span className="text-sm text-slate-500">
            {profile.name} · {profile.title}, {profile.org}
          </span>
        </div>
        <div className="flex items-center gap-5 text-sm text-slate-500">
          <Link
            href="/systems"
            className="transition-colors hover:text-teal-300"
          >
            All systems
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-teal-300"
          >
            GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-teal-300"
          >
            Email
          </a>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js,
        Tailwind & Motion.
      </p>
    </footer>
  );
}
