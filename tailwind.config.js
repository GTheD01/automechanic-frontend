/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#364f67",
        secondary: "#132bd0",
        secondaryHover: "#1637ff",
        neutral: "#dadada",
      },
      textColor: {
        neutral: "#dadada",
      },
      stroke: {
        primary: "#4895ef",
      },
      screens: {
        lg: "1150px",
      },
    },
  },
  plugins: [],
};
