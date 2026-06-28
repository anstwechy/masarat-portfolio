/** @type {import('next').NextConfig} */

// Vercel builds Next.js natively — no static export needed there, which
// keeps server-side optimizations (image, etc.) and avoids the
// "detected next export, this de-opts some Next.js features" notice.
// For other static hosts (GitHub Pages, Netlify, nginx) we still produce a
// static export via NEXT_PUBLIC_STATIC_EXPORT=1 or `pnpm export`.
const isStaticExport =
  process.env.NEXT_PUBLIC_STATIC_EXPORT === "1" ||
  process.env.BUILD_STATIC === "1";

const nextConfig = {
  ...(isStaticExport
    ? {
        // Static export → `next build` outputs static files to `./out`.
        // Deployable to GitHub Pages, Netlify, nginx, or any static host.
        output: "export",
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {
        // Native build (default, used by Vercel): keeps Next.js optimizations.
        images: { unoptimized: true },
      }),
};

export default nextConfig;
