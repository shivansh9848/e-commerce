/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx,tsx,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms')]
}

