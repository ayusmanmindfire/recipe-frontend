/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fb5607',
        hoverPrimary: '#ffbe0b',
        secondary: '#ffffff',
        contrastButton: '#ffd60a',
        hoverContrastButton: '#fb8500'
      },
    },
    fontFamily:{
      'Rubik':["Rubik", "system-ui"]
    }
  },
  plugins: [],
}