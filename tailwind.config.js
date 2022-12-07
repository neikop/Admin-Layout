/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#9689ed',
        },
        secondary: {
          main: '#ff9e7e',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
