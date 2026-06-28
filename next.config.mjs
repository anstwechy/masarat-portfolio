/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the site can be hosted on Vercel, Netlify, GitHub Pages,
  // or any static host. Run `next build` → output lands in `./out`.
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
