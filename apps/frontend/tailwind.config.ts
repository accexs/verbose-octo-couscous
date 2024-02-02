import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "lightsaber-strike": {
          "0%": {
            transform: "translateY(0) rotate(0deg)",
            animationTimingFunction: "ease-in-out",
          },
          "50%": {
            transform: "translateY(-10px) rotate(-30deg)",
            animationTimingFunction: "ease-in-out",
          },
          "100%": {
            transform: "translateY(0) rotate(0deg)",
            animationTimingFunction: "ease-in-out",
          },
        },
      },
      animation: {
        "lightsaber-strike": "lightsaber-strike 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["retro", "dark"],
  },
};
export default config;
