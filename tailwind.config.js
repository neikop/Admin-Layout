/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#9689ED',
        },
        secondary: {
          main: '#FF9E7E',
        },
        success: '#37A62B',
        warn: '#DF8532',
        error: '#FF4E71',
        info: '#2996C5',
        neutral: '#465A7A',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
