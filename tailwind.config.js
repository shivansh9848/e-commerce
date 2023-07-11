/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx,tsx,ts}"],
   theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms'),require('@tailwindcss/aspect-ratio')]
}

