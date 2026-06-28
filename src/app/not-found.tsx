import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-7xl font-bold text-gradient">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-white">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-lg bg-teal-400 px-6 font-semibold text-ink-950 transition-all hover:bg-teal-300"
      >
        Back home
      </Link>
    </main>
  );
}
