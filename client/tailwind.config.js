/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#161B22", // near-black charcoal, sidebar / headers
        slate: {
          50: "#F5F7F9",
          100: "#EBEFF2",
          200: "#D8DEE4",
        },
        teal: {
          500: "#0EA5A5",
          600: "#0C8A8A",
        },
        amber: {
          500: "#F0A93B",
        },
        rose: {
          500: "#E15B5B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
      },
    },
  },
  plugins: [],
};
