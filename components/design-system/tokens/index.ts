export * from './colors';
export * from './spacing';
export * from './typography';
export * from './shadows';
export * from './borders';
export * from './animations';

// Combined theme object for easy access
import { colors } from './colors';
import { spacing, spacingTailwind } from './spacing';
import { typography, textStyles } from './typography';
import { shadows, shadowTailwind } from './shadows';
import { borders, borderTailwind } from './borders';
import { animations } from './animations';

export const theme = {
  colors,
  spacing,
  typography,
  shadows,
  borders,
  animations,
};

// Tailwind helpers
export const tailwindHelpers = {
  spacing: spacingTailwind,
  text: textStyles,
  shadow: shadowTailwind,
  border: borderTailwind,
};
