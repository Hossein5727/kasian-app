/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-orange": "#F0932B",
        "primary-text-light": "#3C404A",
        "primary-text-light2": "#74787B",
        "bg-home": "#191B28",
        "border-color": "#373A48",
      },
    },
  },
  plugins: [],
};
