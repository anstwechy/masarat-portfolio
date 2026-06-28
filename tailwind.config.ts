import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — sourced from the Masarat wallet branding + AML site
        navy: {
          DEFAULT: "#1a365d",
          50: "#eef4fb",
          100: "#d6e4f4",
          200: "#adc9e8",
          300: "#7da8d6",
          400: "#4a7fb8",
          500: "#2d5a99",
          600: "#1a365d",
          700: "#142b4a",
          800: "#0e2036",
          900: "#091624",
        },
        teal: {
          DEFAULT: "#2dd4bf",
          50: "#effcf9",
          100: "#c8fbed",
          200: "#8ff5da",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e57",
          900: "#134e4a",
        },
        // Dark-first surfaces (AML site baseline)
        ink: {
          DEFAULT: "#0a0f1a",
          elevated: "#111827",
          950: "#060912",
          900: "#0a0f1a",
          800: "#111827",
          700: "#1a2235",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-dmsans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at center, var(--tw-gradient-from), var(--tw-gradient-to))",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spotlight": {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" },
        },
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.8s ease forwards",
        shimmer: "shimmer 2.5s linear infinite",
        spotlight: "spotlight 2s ease 0.75s 1 forwards",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
