# Griffin Brodie — Portfolio

Personal portfolio. Next.js (App Router) + TypeScript + Tailwind, with GSAP
(ScrollTrigger) and Lenis for motion. Deployed on Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Structure

- `app/` — layout (fonts, metadata, OG), global styles, page, favicon (`icon.svg`).
- `components/` — sections (Hero, Engineering, Work, About, Contact, Nav) and the
  interaction layer (SmoothScroll/Lenis, Cursor, Grain, LoadIn).
- `lib/content.ts` — all copy. `lib/env.ts` — client feature flags (reduced motion,
  pointer, first-visit).
- `public/og-image.png` — social card.

All motion respects `prefers-reduced-motion`. Deploy is automatic on push to `main`
(Vercel, framework preset Next.js via `vercel.json`).
