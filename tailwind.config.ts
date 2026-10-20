import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F2F5EE",
        "paper-alt": "#E7EBE1",
        ink: "#16201A",
        "ink-soft": "#4B5648",
        green: "#1F5D42",
        "green-deep": "#123B2A",
        amber: "#C97A2B",
        blue: "#33607F",
        line: "#CBD2C1",
      },
      fontFamily: {
        display: ["var(--font-overpass)", "system-ui", "sans-serif"],
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};

export default config;
