# Portfolio — Standing Conventions

Next.js (App Router) + TypeScript + Tailwind. Animation via GSAP (ScrollTrigger +
CustomEase) and Lenis smooth scroll. Deployed on Vercel.

## Automatic workflow — every session, no need to ask

Once changes are made and confirmed working, do all of the following automatically,
without waiting for me to run any git or deploy commands myself:

1. **Build-check.** Run `npm run build` (`next build`) and make sure it compiles and
   type-checks clean before committing.
2. **Commit.** Stage all changes and commit with a clear, descriptive message.
3. **Push to `origin main`.**
4. **Deploy to Vercel production.** The project is git-connected, so a push to `main`
   triggers a production deploy. Framework preset is Next.js (pinned in
   `vercel.json` as `"framework": "nextjs"`).

I should never have to run git or deploy commands myself. Take it end to end.

## Project facts

- Framework: Next.js App Router, TypeScript, Tailwind (Node 18+). Pages: `/`,
  `/robotics`, and `/projects/[slug]` (one per project in `lib/content.ts`).
- Design: see `BRAND.md` (palette, type, scales, signature, motion) and
  `RESEARCH.md`. Every color, font, size and space is a CSS variable in
  `app/globals.css`; `tailwind.config.ts` reads only those.
- Facts: every claim on the site is listed in `FACTS.md` with its source. Do
  not add a claim without adding it there. Never add an email address, GitHub
  profile link, phone number or home address.
- Copy lives in `lib/content.ts`. Plain and literal, no em dashes.
- Background: `components/BridgeScene.tsx` (geometry in `lib/bridge.ts`), a
  cable-stayed bridge built by balanced cantilever, scrubbed by one
  ScrollTrigger over the page; the span closes at `BUILD_END` (93% of the page)
  and one car then crosses to the far bank; Lenis is the only smoothing
  (`components/SmoothScroll.tsx`). The Engineering chapter is Graphite
  (`components/ChapterWipe.tsx`).
- Page transitions: `components/TransitionLink.tsx` uses the View Transitions
  API with matching `view-transition-name`s on the project screenshot and
  title; plain navigation where unsupported or with reduced motion.
- Reduced motion: no Lenis, no scrub, no pin, no text reveals; the finished
  bridge shows as a still image.
- Performance: non-critical animation setup runs in idle time (`lib/idle.ts`)
  to keep Lighthouse mobile at 90 or higher.
- Screenshots: `public/work/*.webp`, captured with `scripts/shots.mjs`
  (blurs phone numbers). OG image: `public/og-image.png` from `scripts/og.mjs`.
  Favicon: `app/icon.svg`.
- Vercel project: `GBrodie6/portfolio`, production `griffinbrodie.site`.
- Not allowed: custom cursors, constellation canvases, click easter eggs, an
  interactive hero, or effects beyond the approved list in `BRAND.md`.
