# Brand: Balanced Cantilever

Portfolio of Griffin Brodie, Madison, CT, class of 2027, applying to study
civil engineering. Read first by admissions readers, then by people who might
hire him or commission a website. It should feel like a construction set from
a bridge job: concrete, graphite ink, and the pink of a surveyor's marking
paint.

## Palette

| Name | Hex | Role | Contrast |
| --- | --- | --- | --- |
| Poured Concrete | `#E2E0DA` | Main ground. A cool mid-light gray, not cream. | |
| Graphite | `#17191C` | Text, the bridge tower and deck, the dark chapter ground. | 13.3:1 on Concrete |
| Survey Pink | `#D81F6E` | Stay cables, focus rings, link underlines, one mark per chapter. The APWA color for temporary survey marks. Never small text. | 3.7:1 on Concrete (graphics and large type only) |
| Water Main Blue | `#1D5A9E` | The one blue chapter (Engineering) and its diagrams. APWA color for potable water. | 5.3:1 on Concrete, 6.3:1 under white |
| Form Steel | `#5B6168` | Secondary text, captions, dimension lines. | 4.7:1 on Concrete |
| Chalk | `#F5F4F0` | Text on Graphite and Blue chapters. | 13.9:1 on Graphite |

Pink and blue come from the APWA uniform color code that crews spray on the
ground before any digging: pink marks survey points, blue marks water lines.

## Type

- **Big Shoulders Display, 800/900, display.** Names, section titles, project
  names, big numbers. A condensed grotesque drawn from Chicago's industrial
  signage and bridges. Condensed, so it can run very large without wrapping on
  a phone. Sentence case, line-height 0.86, tracking -1%.
- **Public Sans, 400/500/600, text.** Everything else, including specs and
  numbers (tabular figures). Built for US government sites (USWDS), so it is
  plain, civic and very legible.

No small all-caps labels, no third family, no monospace.

## Type scale

Extreme ratio between display and text, few steps in between.

| Token | Size | Use |
| --- | --- | --- |
| `--fs-mega` | `clamp(5.5rem, 19vw, 19rem)` | The name in the hero, once. |
| `--fs-display` | `clamp(3.5rem, 11vw, 10rem)` | Section titles. |
| `--fs-figure` | `clamp(3rem, 7vw, 6.5rem)` | Big numbers with units. |
| `--fs-title` | `clamp(1.75rem, 3vw, 2.5rem)` | Project and item titles. |
| `--fs-lead` | `1.25rem` | Lead paragraphs. |
| `--fs-body` | `1.0625rem` (17 px) | Body. |
| `--fs-small` | `0.875rem` | Captions, tags, footer. |

Body measure 34 to 62 characters. Line-height 1.55 for body, 0.86 for display.

## Spacing scale

4-based, growing by about 1.5 each step: `--sp-1` 4 px, `--sp-2` 8, `--sp-3` 12,
`--sp-4` 16, `--sp-5` 24, `--sp-6` 36, `--sp-7` 56, `--sp-8` 88, `--sp-9` 136,
`--sp-10` 208. Section padding uses 8 to 10. Gutter `clamp(20px, 4vw, 56px)`.

## Voice

Plain first person: what was built, with what, and what it does, with numbers
where they exist.

## Signature: balanced cantilever

Cable-stayed bridges are built outward from the tower one deck segment at a
time, each segment held by a new pair of stay cables, until the two arms meet
in a closure pour. The background scene builds that way, driven by scroll: the
tower stands up during the hero, every section of the page adds segments and
pink stays, and the span closes at the footer. It is the only decorative thing
on the page, so everything else stays plain.

## Motion tokens

- `--dur-ui` 200 ms, `--dur-move` 600 ms, `--dur-page` 450 ms.
- `--ease-out` `cubic-bezier(0.16, 1, 0.3, 1)` (expo out), the curve most of the
  researched sites use.
- Load sequence: under 1.5 s, CSS-driven, text readable from the first frame.
- Reduced motion: no Lenis, no scrub, no pin; the finished bridge is shown
  static and every section is plain and fully visible.
