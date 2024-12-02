import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./entities/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#d4e9e2",
          500: "#006241",
          600: "#00754a",
        },
        secondary: {
          500: "#1e3932",
        },
        point_blue: {
          400: "#d4e5ed",
          500: "#004d6d",
          600: "#003a54",
        },
        point_red: {
          300: "#e9d4d6",
          400: "#913F42",
          450: "#8B2A2F",
          500: "#62000e",
          600: "#4a000b",
        },
        point_skyBlue: {
          400: "#d4e8ed",
          500: "#00627a",
          600: "#004a5e",
        },
        point_yellow: {
          400: "#e9e8d4",
          500: "#625e00",
          600: "#4a4700",
        },
        point_gray: {
          500: "#333333",
        },
        background: {
          light: "#f9f9f9",
          default: "#f2f0eb",
          light_dark: "#242424",
          dark: "#1d1d1d",
        },
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
