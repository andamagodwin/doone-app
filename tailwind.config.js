/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#36cf94',
        secondary: '#0e4198',
        accent: '#2395a7',
        success: '#2eb39e',
        info: '#1766a4',
        link: '#1d85ac',
        highlight: '#28a4a2',
        focus: '#165caf',
        error: '#d32f2f',
      },
    },
  },
  plugins: [],
};
