# Brand: Balanced Cantilever

Portfolio of Griffin Brodie, Madison, CT, class of 2027, applying to study
civil engineering. The link goes on the Common App, so the first readers are
admissions readers; after that, people who might hire him or commission a
website. Golf is a supporting detail, never the frame.

## Palette

| Name | Hex | Role |
| --- | --- | --- |
| Poured Concrete | `#E2E0DA` | Page background. A cool mid-light gray, not cream. |
| Graphite | `#17191C` | Text, bridge tower and deck, Engineering chapter background. |
| Water Main Blue | `#1D5A9E` | Bridge cables, focus rings, link underlines, accents on Concrete. APWA color for potable water lines. |
| Spillway Blue | `#7FAEE3` | Lighter tint of Water Main Blue. Used only inside the Graphite Engineering chapter, for cables, diagram lines and accents, so they stay visible. |
| Form Steel | `#5B6168` | Secondary text on Concrete. |
| Chalk | `#F5F4F0` | Text on Graphite. |

One derived tone, mixed in CSS from the palette rather than picked:
`--c-chalk-muted` = Chalk 72% + Graphite 28% (about `#B4B5B4`), for secondary
text on Graphite, because Form Steel fails there.

No pink, orange, green or other colors anywhere, including the bridge scene.

### Contrast (WCAG 2.1, measured)

| Text or mark | On | Ratio | Allowed use |
| --- | --- | --- | --- |
| Graphite | Concrete | 13.34 | All text |
| Form Steel | Concrete | 4.74 | All text (passes 4.5) |
| Water Main Blue | Concrete | 5.29 | All text, links, graphics |
| Chalk | Graphite | 16.00 | All text |
| Chalk muted (mix) | Graphite | about 8.7 | All text |
| Spillway Blue | Graphite | 7.60 | All text, links, graphics |
| Chalk | Water Main Blue | 6.34 | All text (button fill) |
| Water Main Blue | Graphite | 2.52 | **Fails, even the 3:1 graphics minimum. Never used on Graphite.** Spillway Blue replaces it there. |
| Form Steel | Graphite | 2.81 | **Fails. Never used on Graphite.** |
| Spillway Blue | Concrete | 1.75 | **Fails. Never used on Concrete.** |

All colors live in CSS variables in `app/globals.css`. Components and the
bridge scene reference only those variables.

## Type

Both through `next/font/google`.

- **Big Shoulders Display, 800 and 900, display.** The name, section titles,
  project titles, big numbers. A condensed grotesque drawn from Chicago's
  industrial signage. Condensed, so it can run very large and still fit at
  390 px. Sentence case, line-height 0.86, tracking -1%.
- **Public Sans, 400, 500 and 600, text.** Everything else, with tabular figures
  for specs. Built for US government sites (USWDS): plain, civic, very legible.

No small all-caps labels, no third family, no monospace.

## Type scale

Body is 17 px, and display jumps straight to 100 to 300 px. Every display size
is a `clamp()` sized to fit 390 px without overflow.

| Token | Size | Use |
| --- | --- | --- |
| `--fs-mega` | `clamp(5.25rem, 19vw, 19rem)` | The name in the hero, once. |
| `--fs-display` | `clamp(4rem, 13vw, 12rem)` | Section titles. |
| `--fs-figure` | `clamp(3.5rem, 9vw, 8rem)` | Big numbers with units. |
| `--fs-title` | `clamp(1.75rem, 3vw, 2.5rem)` | Item titles. |
| `--fs-lead` | `1.25rem` | Lead lines. |
| `--fs-body` | `1.0625rem` (17 px) | Body. |
| `--fs-small` | `0.875rem` | Captions, tags, footer. |

Body measure 34 to 62 characters. Line-height 1.55 body, 0.86 display.

## Spacing scale

4-based, growing by about 1.5 each step: `--sp-1` 4 px, `--sp-2` 8, `--sp-3` 12,
`--sp-4` 16, `--sp-5` 24, `--sp-6` 36, `--sp-7` 56, `--sp-8` 88, `--sp-9` 136,
`--sp-10` 208. Gutter `clamp(20px, 4vw, 56px)`.

## Voice

Plain first person: what was built, with what, and what it does, with numbers
where they are sourced (see FACTS.md).

## Signature: balanced cantilever

A cable-stayed bridge is built outward from its tower one deck segment at a
time, each segment held by a new stay cable, until the arms reach the far
abutment and the span closes. The fixed background scene builds that way as
the page scrolls: the tower stands up in the hero, each section adds segments
and Water Main Blue cables, and the span closes as the footer arrives. Then the camera holds and one car
drives across the finished span to the far bank, tied to scroll like the rest. The bridge also
appears small and static as the logo mark, opens the robotics and project
pages with a short partial build, and nowhere else.

## Motion

- `--dur-ui` 200 ms for hover and focus. `--dur-page` 450 ms for page
  transitions. `--dur-move` 700 ms for heading reveals.
- `--ease-out` `cubic-bezier(0.16, 1, 0.3, 1)` (expo out).
- Load sequence under 1.5 s, in CSS, text readable from the first frame.
- Reduced motion: finished bridge as a still image, no Lenis, no pinned strip,
  no text reveals, no wipes. Every section is plain and fully visible.

## Craft list and the researched winner that sets the bar

Principles only, never copied (see RESEARCH.md).

| Craft item | Reference | What to match |
| --- | --- | --- |
| Split heading reveal (line and character, masked) | ERA Residence (SplitText) | Lines rise from behind a mask with a short stagger and an expo-out ease; nothing fades. |
| Horizontal text band between sections | Lama Lama | Very large, slow, one direction, real words only. |
| Section color wipe (Concrete to Graphite) | ERA Residence | Each chapter owns a ground color; the change is a moving edge tied to scroll, not a cut. |
| Count-up numbers | Aevion LiDAR (Riotters) | One big figure with a unit and one line of context. |
| Pinned section with content changing while the bridge builds | Aevion LiDAR | Specs swap in place on a pinned stage. |
| Pinned horizontal project strip and card image reveal | LPAS, Jesper Landberg | Vertical scroll drives a horizontal strip; images reveal with a clip as they enter. |
| Hover on project cards | Gil Huybrecht | Quiet: the image grows a little, the title shifts, the link appears. No lifts or shadows. |
| Page transitions | LPAS (Swup) | About 450 ms, directional, the next page already under the cover. |
| Navigation | Belgrade Arbor | A minimal bar that hides on scroll down and returns on scroll up. |
| Film grain and dimension dividers | Son Daven (texture), Aevion (hairline grid) | Grain barely visible; dividers are thin and precise. |
| Self-drawing robot diagram | Belgrade Arbor (map building on scroll) | Lines draw in order and labels appear as each part completes. |

## Process (pro-design, followed because the skill file is not installed)

1. Brand first: this sheet, locked into CSS variables before layout.
2. A deliberate pattern per section; numbered steps only for real sequences.
3. One orchestrated scroll scene; other motion only where listed above; UI
   transitions 150 to 250 ms; ease-out; reduced motion respected; content
   never hidden waiting on an animation.
4. Verification: Playwright at 1440 and 390, check overflow, clipped text,
   contrast, broken images, console errors, focus, hero in the first screen,
   Lighthouse mobile. Fix in one batch, confirm once, stop.
