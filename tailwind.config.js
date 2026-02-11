const { colors } = require('./components/design-system/tokens/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Brand colors from design tokens
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        success: colors.success,
        info: colors.info,
        link: colors.link,
        highlight: colors.highlight,
        focus: colors.focus,
        error: colors.error,
        warning: colors.warning,

        // Gray scale
        gray: colors.gray,
      },
      fontFamily: {
        lato: ['Lato-Regular'],
        'lato-light': ['Lato-Light'],
        'lato-bold': ['Lato-Bold'],
        'lato-black': ['Lato-Black'],
        'lato-italic': ['Lato-Italic'],
      },
    },
  },
  plugins: [],
};