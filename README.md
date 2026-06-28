# Masarat Portfolio — Anas Almesbahi

A premium, cinematic portfolio website showcasing 9 production fintech/banking systems built and maintained by **Anas Almesbahi**, Head of Development at **Masarat** (Tripoli, Libya).

## Tech stack

- **Next.js 15** (App Router, static export)
- **TypeScript** · **Tailwind CSS** · **shadcn/ui** patterns
- **Motion** (Framer Motion) — component animations
- **Lenis** — smooth scroll
- **Mermaid** — architecture diagrams on detail pages
- Fonts: **Inter** + **DM Sans** + **JetBrains Mono**

## Getting started

```bash
pnpm install      # install dependencies
pnpm dev          # dev server at http://localhost:3000
pnpm build        # production build → static export in ./out
```

## Project structure

```
src/
├── app/
│   ├── page.tsx              # landing (hero → stats → about → systems → stack → practices → contact)
│   ├── systems/page.tsx      # all-systems index
│   └── systems/[slug]/        # 9 per-system detail pages (Mermaid diagrams)
├── components/
│   ├── sections/             # Hero, Stats, About, SystemsShowcase, TechStack, Practices, Contact
│   ├── system-card.tsx       # reusable project card
│   ├── mermaid.tsx           # client-side diagram renderer
│   ├── navbar.tsx · footer.tsx · providers.tsx (Lenis)
│   └── ui/                   # button, badge, animated-section
├── data/
│   ├── systems.ts            # ← THE source of truth: all 9 systems (edit content here)
│   └── site.ts               # profile, stats, tech stack, engineering practices
└── lib/utils.ts              # cn() helper
```

## Editing content

All site content lives in **`src/data/`** — no need to touch components:

- **`systems.ts`** — the 9 systems (name, tagline, stack, highlights, capabilities, Mermaid diagram, repo URL, accent color). Add/edit a system here and it appears everywhere.
- **`site.ts`** — your identity (name, title, email, GitHub), headline stats, tech-stack groups, and engineering-practice cards.

## Deployment

The site is configured for **static export** (`output: "export"` in `next.config.mjs`), so `pnpm build` produces a fully static `./out` folder deployable to:

- **Vercel** — connect the repo, framework auto-detected.
- **Netlify** — build command `pnpm build`, publish directory `out`.
- **GitHub Pages** — push the contents of `out/` to a `gh-pages` branch.

## Brand assets

Masarat logos/mark live in `public/branding/` (copied from `mitf_wallet`). The "M" favicon is from `AMLSystem/website`. The brand palette (Masarat navy `#1a365d` + teal accent `#2dd4bf`) is defined in `tailwind.config.ts`.
