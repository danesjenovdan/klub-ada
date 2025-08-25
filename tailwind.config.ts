import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "var(--color-black)",
        white: "var(--color-white)",
        beige: "var(--color-beige)",
        red: "var(--color-red)",
        blue: "var(--color-blue)",
        yellow: "var(--color-yellow)",
        pink: "var(--color-pink)",

        red100: "var(--color-red-100)",
        red200: "var(--color-red-200)",
        red300: "var(--color-red-300)",
        red400: "var(--color-red-400)",
        red500: "var(--color-red-500)",
        red700: "var(--color-red-700)",
        red800: "var(--color-red-800)",

        pink100: "var(--color-pink-100)",
        pink200: "var(--color-pink-200)",
        pink300: "var(--color-pink-300)",
        pink400: "var(--color-pink-400)",
        pink500: "var(--color-pink-500)",
        pink700: "var(--color-pink-700)",
        pink800: "var(--color-pink-800)",

        blue100: "var(--color-blue-100)",
        blue200: "var(--color-blue-200)",
        blue300: "var(--color-blue-300)",
        blue400: "var(--color-blue-400)",
        blue500: "var(--color-blue-500)",
        blue700: "var(--color-blue-700)",
        blue800: "var(--color-blue-800)",

        gray100: "var(--color-gray-100)",
        gray200: "var(--color-gray-200)",
        gray300: "var(--color-gray-300)",
        gray400: "var(--color-gray-400)",
        gray500: "var(--color-gray-500)",
        gray600: "var(--color-gray-600)",
        gray700: "var(--color-gray-700)",
        gray800: "var(--color-gray-800)",
        gray900: "var(--color-gray-900)",

        background: "var(--color-background)",
        border: "var(--color-border)",
      },
      fontFamily: {
        heading: ["Courier", "monospace"],
        paragraph: ["Anaheim", "sans-serif"],
        button: ["Anaheim", "sans-serif"],
      },
      boxShadow: {
        button: "-4px 4px var(--color-black)",
        shineRed: "0px 0px 24px rgba(255, 87, 87, 0.32)",
        shineStrongRed: "0px 0px 50px rgba(255, 87, 87, 0.40)",
        shineWhite: "0px 0px 24px rgba(255, 255, 255, 0.32)",
        yellow: "-7px 7px var(--color-yellow)",
        blue: "-7px 7px var(--color-blue)",
        pink: "-7px 7px var(--color-pink)",
      },
    },
  },
  plugins: [],
};
export default config;
