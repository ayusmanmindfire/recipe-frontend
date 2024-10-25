/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: '#fb5607',
        hoverPrimary: '#ffbe0b',
        secondary: '#ffffff',
        contrastButton: '#ffd60a',
        hoverContrastButton: '#fb8500',

         // Dark mode colors
         darkPrimary: '#45036b',
        darkHoverPrimary: '#946200',
        darkSecondary: '#333333',
        darkContrastButton: '#8a7000',
        darkHoverContrastButton: '#7a4600',
      },
    },
    fontFamily:{
      'Rubik':["Rubik", "system-ui"]
    }
  },
  plugins: [],
}