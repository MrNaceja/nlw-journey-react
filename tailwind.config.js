/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter",
      },
      backgroundImage: {
        pattern: "url(./bg-pattern.png)",
      },
    },
  },
  plugins: [],
};
