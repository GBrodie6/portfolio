import type { Config } from "tailwindcss";

// Every value maps to a CSS variable in app/globals.css (see BRAND.md).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      concrete: "var(--c-concrete)",
      graphite: "var(--c-graphite)",
      blue: "var(--c-blue)",
      spillway: "var(--c-spillway)",
      steel: "var(--c-steel)",
      chalk: "var(--c-chalk)",
      "chalk-muted": "var(--c-chalk-muted)",
    },
    fontFamily: {
      display: "var(--font-display)",
      text: "var(--font-text)",
    },
    fontSize: {
      small: ["var(--fs-small)", { lineHeight: "var(--lh-body)" }],
      body: ["var(--fs-body)", { lineHeight: "var(--lh-body)" }],
      lead: ["var(--fs-lead)", { lineHeight: "var(--lh-body)" }],
      title: ["var(--fs-title)", { lineHeight: "var(--lh-title)" }],
      figure: ["var(--fs-figure)", { lineHeight: "var(--lh-display)" }],
      display: ["var(--fs-display)", { lineHeight: "var(--lh-display)" }],
      mega: ["var(--fs-mega)", { lineHeight: "var(--lh-display)" }],
    },
    spacing: {
      0: "0",
      px: "1px",
      1: "var(--sp-1)",
      2: "var(--sp-2)",
      3: "var(--sp-3)",
      4: "var(--sp-4)",
      5: "var(--sp-5)",
      6: "var(--sp-6)",
      7: "var(--sp-7)",
      8: "var(--sp-8)",
      9: "var(--sp-9)",
      10: "var(--sp-10)",
      gutter: "var(--gutter)",
      nav: "var(--nav-h)",
    },
    borderRadius: { none: "0", sm: "var(--r-1)" },
    extend: {
      maxWidth: { measure: "var(--measure)" },
    },
  },
  plugins: [],
};

export default config;
