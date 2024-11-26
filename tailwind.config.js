/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:{wine:"#4C213B",},
      fontFamily: {
        display: ['"Playfair Display"', 'serif'], // Para títulos
        body: ['"Lato"', 'sans-serif'],          // Para texto
      },
    },
  },
  plugins: [],
}
