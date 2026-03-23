
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        app: "#0B0F19",
        surface: "#111827",
        sidebar: "#0F1623",
        primary: "#6366F1",
        "primary-hover": "#4F46E5",
        accent: "#9333EA",
        success: "#22C55E",
        error: "#EF4444",
        warning: "#F59E0B",
        "text-primary": "#FFFFFF",
        "text-secondary": "rgba(255,255,255,0.7)",
        "text-muted": "rgba(255,255,255,0.5)",
        "text-subtle": "rgba(255,255,255,0.3)",
      },
      boxShadow: {
        xl: "0 20px 25px -5px rgba(0,0,0,0.2), 0 10px 10px -5px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
