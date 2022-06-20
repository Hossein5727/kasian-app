/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#F0932B",
        "primary-text-light": "#3C404A",
        "primary-text-light2": "#74787B",
        "bg-home": "#191B28",
        "border-color": "#373A48",
        "secondary-color": "#2B57F0",
        "tertiary-color": "#2BB9F0",
        "black-color": "#2d3436",
      },
    },
  },
  plugins: [],
};
