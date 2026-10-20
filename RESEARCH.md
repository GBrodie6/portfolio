# Research

Ten Awwwards winners from the last 12 months, opened in Chromium (Playwright)
at 1440x900. For each I recorded frames at 0.3, 0.8, 1.5, 3 and 6 seconds after
navigation, then scrolled the whole page with mouse-wheel steps so Lenis and
ScrollTrigger behaved as they do for a visitor. I also measured font sizes,
families, and `transition-duration` / easing across every element, and checked
for GSAP, ScrollTrigger and Lenis in globals, the `html.lenis` class, and the
loaded script URLs.

Sources: the Awwwards Sites of the Day and Sites of the Month lists (both
reached through a fetch tool, since direct browser connections to awwwards.com
were reset from this environment). Godly now redirects to recent.design, which
had one personal portfolio and no architecture or engineering entries this
week. Siteinspire returned HTTP 429 (rate limited). Dribbble search pages
render client-side and returned no readable content, and Dribbble shots are
mockups, not live sites, so they are not used here.

GSAP is usually bundled and not exposed on `window`, so "GSAP: bundled" means
it showed up in script URLs or behavior, not as a global.

| Site | Award | Stack seen |
| --- | --- | --- |
| LPAS (architecture firm) | SOTD Oct 10 2026 | Lenis, Swup page transitions, WordPress |
| Aevion LiDAR drone (Riotters) | SOTD Oct 6 2026 | Lenis, Next.js, WebGL (5 canvases) |
| FORMAT (Obys) | SOTD + Developer, Oct 19 2026 | Lenis, custom |
| ERA Residence (The First The Last) | SOTM Aug 2026, Developer | GSAP 3.15 + ScrollTrigger (15 triggers), Lenis, Barba, SplitText, OGL |
| Son Daven (The First The Last) | SOTM Jun 2026, Developer | GSAP 3.13 + ScrollTrigger (8), Lenis, Barba, SplitText, OGL |
| Floema (Bürocratik) | SOTM May 2026, Developer | Lenis, Nuxt, OGL |
| Lama Lama | SOTM Jul 2026, Developer | GSAP (bundled), OGL |
| Belgrade Arbor (Square43) | SOTD Oct 17 2026 | Lenis, Next.js, OGL |
| Gil Huybrecht | SOTD Sep 21 2026 | Lenis, Nuxt |
| Jesper Landberg | SOTD Sep 29 2026 | Nuxt, WebGL |

## Site by site

### LPAS, architecture and interiors
- **Type:** one family (Aeonik) at 400 weight everywhere. Scale 12 / 14 / 16 /
  28 / 50 / 56 / 75 px. The hero sentence is 75 px with line-height 1.0. No bold
  anywhere; hierarchy comes from size alone.
- **Spacing:** big image fields with small text blocks pinned to their corners.
  Category panels use flat color fields (brick red, slate blue, sage, sand)
  pulled from the photography.
- **Scroll pacing:** the hero text sits over a full-bleed photo, then a run of
  full-height category panels moves horizontally as you scroll down. The
  project grid uses mixed image sizes, not equal cards.
- **Transitions:** 0.3 s on almost everything (121 elements), 1.2 s on six
  large image reveals. A custom ease-out curve on most.
- **Load:** dark screen, the "LPAS" letters stack in vertically about 3 s in,
  then a single image scales out from the center into the full hero. Slow (the
  hero is not usable for about 4 s).
- **Takeaway:** the subject's own imagery carries the page; type stays quiet
  and very large.

### Aevion LiDAR drone (Riotters)
- **Type:** Switzer for text plus a mono for small data. Display "Gear" at
  240 px, weight 300, tracking about -5%. Body 14 px. The jump from 14 to 240
  with little in between makes the big words read as architecture.
- **Spacing:** white page, hairline grid lines dividing stats into columns,
  very wide margins.
- **Scroll pacing:** each spec ("5 returns", "±2 cm", "450 m") gets a full
  screen; a dial graphic rotates with scroll to bring the active value forward.
  Product renders scrub through rotation tied to scroll.
- **Transitions:** 0.15 to 0.5 s with cubic-bezier(0.22, 1, 0.36, 1)-type
  ease-out.
- **Load:** blank white with a tiny counter for about 3 s.
- **Takeaway:** engineering numbers presented one at a time, large, with units,
  are more convincing than paragraphs.

### FORMAT (Obys)
- **Type:** one custom grotesk. The wordmark is a full-width block of custom
  letterforms. Text at 8 and 42 px only: two sizes.
- **Scroll pacing:** a single-screen document where content panels slide over
  each other like stacked sheets.
- **Transitions:** 0.45 s ease-out on panels, 0.18 s on small UI.
- **Load:** a white sheet lifts away from the bottom while the wordmark builds
  from blocks. Done in about 2 s.
- **Takeaway:** two type sizes with an extreme ratio between them reads as
  confident.

### ERA Residence
- **Type:** three families: extended sans for UI (14 px), a condensed display
  serif for headlines at 122 to 173 px, and a script for accents.
- **Scroll pacing:** GSAP ScrollTrigger with 15 triggers and no pins. Sections
  change background color as you enter them (plum, sky blue, bone).
- **Transitions:** 0.8 s on large elements, 0.4 s on UI, with an
  ease-in-out-quart curve.
- **Load:** solid plum for about 2.5 s, the logo draws, then the wordmark
  splits apart over a huge script word. The hero video appears at about 6 s.
- **Takeaway:** one bold background color per chapter gives a long page
  rhythm. The load is too long for a hiring page.

### Son Daven
- **Type:** a pixel-cut display face across the full width (144 px, tracking
  -6%) with 10 px uppercase text for UI.
- **Scroll pacing:** vertical slat reveal (the hero image appears through
  vertical strips), then long text chapters.
- **Transitions:** 0.6 s on 251 elements, 1.2 s on large reveals.
- **Load:** brown screen, an animated sheep and the name in the pixel face at
  about 3 s, then strips wipe to the hero at about 5 s.
- **Takeaway:** a load sequence can be a brand moment, but 5 s is long.

### Floema
- **Type:** Zimula at 44 to 57 px for headings, 15 px body, tracking -4% on
  display.
- **Scroll pacing:** full-bleed photos alternate with product cut-outs on a
  light ground.
- **Transitions:** 0.5 s with cubic-bezier(0.19, 1, 0.22, 1) (expo out) on
  most, 0.8 s on image reveals.
- **Load:** plain light background, then one centered sentence. Fast, about
  3 s to readable.
- **Takeaway:** expo-out at 0.5 s is the most common "expensive" curve in this
  set.

### Lama Lama
- **Type:** Suisse BP Intl Bold, uppercase, 80 px with line-height 0.8, plus a
  mono for labels.
- **Load:** counter, then a pixel logo, then a full-screen pattern wipe. Hero
  readable at about 6 s.
- **Takeaway:** tight line-height (0.8 to 0.9) on big display type is what
  makes it feel set, not typed.

### Belgrade Arbor
- **Type:** Editorial Old (light serif) at 151 px for the name, 56 px for
  statements, Work Sans 16 px body.
- **Scroll pacing:** green chapter with irregular cut-out photo shapes, then a
  3D map of the site's surroundings that builds as you scroll in.
- **Transitions:** 0.65 s with an ease-in-out curve on 148 elements.
- **Load:** logo with a 0 to 100% progress bar, about 3 s.
- **Takeaway:** a map or site plan that builds with scroll explains location
  better than copy.

### Gil Huybrecht
- **Type:** a single sans at 16 px for everything. No display size at all.
- **Scroll pacing:** a dense grid of every project screen, scrolling in rows;
  hovering a row lifts its screens to full brightness and dims the rest.
- **Transitions:** 0.2 s ease-out on 84 elements, matching the hover.
- **Load:** 0 to 100% counter, about 3.5 s.
- **Takeaway:** many real screenshots shown at once is proof by volume; dimming
  the rest on hover is restrained and useful.

### Jesper Landberg
- **Type:** small sans (13 px) for all chrome; projects carry the visuals.
- **Scroll pacing:** projects sit on a curved 3D strip over a perspective
  grid, and wheel scrolling moves the strip horizontally.
- **Load:** black, a short line grows into three dashes, then the strip, about
  3 s.
- **Takeaway:** horizontal movement through work, driven by normal vertical
  scrolling, is the expected pattern for a developer portfolio.

## Principles pulled out

1. **Extreme type contrast.** Display sizes of 120 to 240 px against body text
   of 14 to 16 px, with little in between. Tight leading on display (0.8 to
   1.0) and negative tracking (-3% to -6%).
2. **One or two families.** Every site above uses one or two families for
   nearly all text. Hierarchy comes from size, not weight changes.
3. **The subject's own material leads.** Architecture sites lead with their
   buildings; the LiDAR site leads with its spec numbers. Nobody leads with a
   tagline.
4. **Numbers with units, one at a time.** Big figures with a unit and a short
   line of context (Aevion) read as engineering.
5. **Expo or quart ease-out, 0.4 to 0.8 s for large moves, 0.15 to 0.3 s for
   UI.** Every site used a custom ease-out curve, not `ease`.
6. **Scroll moves things horizontally or in layers, not fade-ins.** Pinned
   horizontal strips (LPAS, Jesper), panels sliding over panels (FORMAT), and
   scenes that build (Belgrade map). None of them fade every section up.
7. **Chapters by color.** Long pages change ground color per chapter (ERA,
   LPAS, Belgrade) to give rhythm without extra decoration.
8. **Hover is quiet and specific:** dim the others, underline, shift an image a
   few pixels. No card lifts.
9. **Load sequences here run 2 to 6 s.** That is the clearest thing not to
   copy: a hiring or admissions reader may leave. The brand moment has to fit
   in under 1.5 s with the hero text readable from the start.
10. **Page transitions are short and directional** (Swup/Barba): the outgoing
    page moves or is covered in about 0.4 to 0.6 s, the new page is already
    there underneath.
