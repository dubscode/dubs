const colors = require('tailwindcss/colors');

const regex = new RegExp(`(${Object.keys(colors).join('|')})`);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [{ pattern: regex }],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
