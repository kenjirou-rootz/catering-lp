import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: "#FAF8F5",
          100: "#F5F0EB",
          200: "#EBE3D9",
          300: "#D9CCBD",
        },
        brand: {
          orange: "#D4763C",
          "orange-hover": "#C06830",
          gold: "#B8965A",
          dark: "#1A1A1A",
          muted: "#4A4A4A",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        site: "1280px",
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
