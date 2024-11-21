/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { 
      fontFamily: {
        sans: ['"Proxima Nova"', 'ui-sans-serif', 'system-ui', 'sans-serif'], // Add Proxima Nova to the sans stack
      },
    },
  },
  plugins: [],
}

