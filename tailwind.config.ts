import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        heading: ["'Syne'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"]
      },
      colors: {
        accent: {
          DEFAULT: "#d4622b",
          hover: "#e87a42",
          secondary: "#c9a96e",
          muted: "#a8612e"
        },
        surface: {
          dark: "#111010",
          "dark-elevated": "#1a1918",
          "dark-card": "#1f1e1c",
          light: "#f5f2ed",
          "light-elevated": "#eae6df",
          "light-card": "#fff"
        },
        foreground: {
          dark: "#ede9e3",
          "dark-muted": "#8a8279",
          light: "#2a2725",
          "light-muted": "#7a746d"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(212, 98, 43, 0.2)",
        "glow-gold": "0 0 40px rgba(201, 169, 110, 0.15)",
        "soft": "0 4px 24px rgba(0, 0, 0, 0.06)",
        "soft-lg": "0 12px 48px rgba(0, 0, 0, 0.08)"
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 6s ease-in-out infinite",
        "bounce-slow": "bounce 2.5s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" }
        }
      }
    }
  },
  plugins: []
} satisfies Config;
