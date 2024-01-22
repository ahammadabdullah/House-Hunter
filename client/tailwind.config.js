/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fb923c",
        secondary: "#fed7aa",
        fill: "#ffedd5",
      },
    },
  },
  plugins: [],
};
