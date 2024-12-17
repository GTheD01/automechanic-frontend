/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3e5c76",
        secondary: "#4895ef",
        secondaryHover: "#2563eb",
        neutral: "#6B7280",
      },
      textColor: {
        neutral: "#d1d5db",
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
