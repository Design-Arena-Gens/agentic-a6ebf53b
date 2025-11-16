import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        plasma: {
          50: "#fef6ff",
          100: "#f9d6ff",
          200: "#f4adff",
          300: "#ee85ff",
          400: "#e95cff",
          500: "#d33ee6",
          600: "#a62fb3",
          700: "#792380",
          800: "#4d154d",
          900: "#23031f"
        },
        ki: {
          50: "#f4fbff",
          100: "#d6eeff",
          200: "#a8dbff",
          300: "#74c4ff",
          400: "#43aaff",
          500: "#0d8fff",
          600: "#006dd6",
          700: "#004fa0",
          800: "#003168",
          900: "#001933"
        }
      },
      fontFamily: {
        display: ["var(--font-fugaz)", "system-ui"],
        sans: ["var(--font-montserrat)", "system-ui"]
      },
      boxShadow: {
        aura: "0 0 60px rgba(13, 143, 255, 0.4), 0 0 120px rgba(233, 92, 255, 0.25)"
      },
      keyframes: {
        "energy-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.75" },
          "50%": { transform: "scale(1.1)", opacity: "1" }
        },
        "ki-wave": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        "camera-shake": {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-2px, 2px)" },
          "50%": { transform: "translate(2px, -1px)" },
          "75%": { transform: "translate(-1px, -2px)" },
          "100%": { transform: "translate(1px, 1px)" }
        },
        "tachyon-flicker": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.6" }
        },
        "warp-pan": {
          "0%": { transform: "translate3d(-1%, -1%, 0)" },
          "50%": { transform: "translate3d(1%, 1%, 0)" },
          "100%": { transform: "translate3d(-1%, -1%, 0)" }
        }
      },
      animation: {
        "energy-pulse": "energy-pulse 3s ease-in-out infinite",
        "ki-wave": "ki-wave 4s linear infinite",
        "camera-shake": "camera-shake 0.4s linear infinite",
        "tachyon-flicker": "tachyon-flicker 2s ease-in-out infinite",
        "warp-pan": "warp-pan 12s ease-in-out infinite alternate"
      },
      backgroundImage: {
        "energy-grid":
          "linear-gradient(90deg, rgba(13, 143, 255, 0.12) 1px, transparent 1px), linear-gradient(0deg, rgba(233, 92, 255, 0.12) 1px, transparent 1px)"
      },
      backgroundSize: {
        "grid-sm": "60px 60px",
        "grid-lg": "180px 180px"
      }
    }
  },
  plugins: []
};

export default config;
