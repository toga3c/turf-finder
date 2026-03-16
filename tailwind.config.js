/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        turf: {
          green:  "#16a34a",
          dark:   "#14532d",
          light:  "#dcfce7",
          accent: "#22c55e",
        },
      },
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
}