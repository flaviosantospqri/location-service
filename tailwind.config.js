/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-rgba": "rgba(47, 0, 0, 0.1)",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
