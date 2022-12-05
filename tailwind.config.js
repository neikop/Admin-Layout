/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#564BA8',
          main: '#9689ED',
          light: '#AFA8EC',
        },
        secondary: {
          main: '#FF9E7E',
        },
        success: '#37A62B',
        warn: '#DF8532',
        error: '#FF4E71',
        info: '#2996C5',
        neutral: '#465A7A',
        line: '#ECE8F3',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
