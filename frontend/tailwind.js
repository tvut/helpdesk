/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        'csus': '#53a7dc',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'] 
      },
    }
  },
  plugins: [],
}
