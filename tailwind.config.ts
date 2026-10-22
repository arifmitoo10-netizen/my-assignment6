import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Oswald", "Impact", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        accent: "#ccff00",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        fitlog: {
          primary: "#ccff00",
          "primary-content": "#0b0d10",
          secondary: "#1a1d23",
          accent: "#ccff00",
          neutral: "#14171c",
          "base-100": "#0b0d10",
          "base-200": "#111418",
          "base-300": "#1c2027",
          "base-content": "#e8eaed",
          info: "#38bdf8",
          success: "#a3e635",
          warning: "#facc15",
          error: "#f87171",
          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.4rem",
        },
      },
    ],
    logs: false,
  },
};
export default config;
