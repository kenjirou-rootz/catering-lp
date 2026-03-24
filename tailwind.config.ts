import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#F7F3EE",
          100: "#F2EBE2",
          200: "#EDE5D8",
          300: "#E2D5C4",
          400: "#D4C2AA",
        },
        terra: {
          DEFAULT: "#e74a00",
          hover: "#CC4200",
          light: "#F09860",
          muted: "#E87840",
          pale: "#FDE8D8",
        },
        dark: {
          DEFAULT: "#1C1917",
          muted: "#57534E",
          subtle: "#A8A29E",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        "serif-ja": ["var(--font-serif-ja)", "serif"],
        sans: ["var(--font-sans)", "var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        site: "1280px",
      },
      letterSpacing: {
        editorial: "0.05em",
        heading: "-0.02em",
      },
      lineHeight: {
        editorial: "1.1",
        reading: "1.85",
      },
      transitionDuration: {
        fast: "200ms",
        default: "400ms",
        slow: "600ms",
        slower: "800ms",
      },
    },
  },
  plugins: [],
};
export default config;
