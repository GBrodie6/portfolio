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

- Framework: Next.js App Router, TypeScript, Tailwind (Node 18+).
- Animation: one fixed scroll-driven SVG scene (`components/Scene.tsx`, geometry
  in `lib/scene.ts`): a single paused GSAP timeline scrubbed by one ScrollTrigger
  over the whole document (`scrub: true`), smoothed only by Lenis
  (`components/SmoothScroll.tsx`). Every scene state is a pure function of scroll;
  animate only transform, opacity, stroke-dashoffset. Reduced motion = no Lenis,
  no scrub, static finished bridge.
- Design tokens (paper `#F2F5EE`, ink `#16201A`, pine green `#1F5D42`, amber
  `#C97A2B`, cyanotype blue `#33607F`, line `#CBD2C1`) live in `app/globals.css`
  and `tailwind.config.ts`. Fonts: Overpass 700 (display), IBM Plex Sans (body).
  No tracked all-caps labels, middle-dot strings, or arrow glyphs.
- Copy lives in `lib/content.ts`. Sections are in `components/`.
- OG image: `public/og-image.png` — regenerate to match copy/visual changes.
  Favicon: `app/icon.svg` (the pin-flag mark).
- Vercel project: `GBrodie6/portfolio`, production `griffinbrodie.site` (canonical
  in metadata; `griffinbrodie.vercel.app` also serves it).
- Deliberately removed, keep removed: custom cursor, grain overlay, card tilt /
  spotlight, magnetic buttons, contour rings, word-by-word heading reveals,
  first-visit loader, IntersectionObserver reveals, the load-test model,
  constellation / particle field, and click-triggered easter eggs.
