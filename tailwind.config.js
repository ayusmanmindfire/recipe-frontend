/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f5964e',
        secondary: '#ffffff',
        background: '#e3342f',
      },
    },
    fontFamily:{
      'Rubik':["Rubik", "system-ui"]
    }
  },
  plugins: [],
}