/**
 * Typography System
 * 
 * Defines font sizes, weights, line heights, and letter spacing
 * for consistent typography throughout the application.
 */

export interface FontSize {
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
}

export interface Typography {
  // Display styles (for large headings and marketing)
  display: {
    xl: FontSize;
    lg: FontSize;
    md: FontSize;
    sm: FontSize;
  };
  
  // Heading styles
  heading: {
    h1: FontSize;
    h2: FontSize;
    h3: FontSize;
    h4: FontSize;
    h5: FontSize;
    h6: FontSize;
  };
  
  // Body text styles
  body: {
    xl: FontSize;
    lg: FontSize;
    md: FontSize;
    sm: FontSize;
    xs: FontSize;
  };
  
  // Special purpose styles
  caption: FontSize;
  overline: FontSize;
  button: FontSize;
  label: FontSize;
}

/**
 * Font Weights
 */
export const fontWeights = {
  thin: '100',
  extralight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

export type FontWeight = keyof typeof fontWeights;

/**
 * Typography Scale
 * Based on a modular scale with a ratio of 1.25 (Major Third)
 */
export const typography: Typography = {
  // Display styles - for hero sections and large promotional content
  display: {
    xl: {
      fontSize: 72,
      lineHeight: 90,
      letterSpacing: -1.5,
    },
    lg: {
      fontSize: 60,
      lineHeight: 72,
      letterSpacing: -1,
    },
    md: {
      fontSize: 48,
      lineHeight: 60,
      letterSpacing: -0.5,
    },
    sm: {
      fontSize: 36,
      lineHeight: 44,
      letterSpacing: 0,
    },
  },
  
  // Heading styles - for page and section headings
  heading: {
    h1: {
      fontSize: 32,
      lineHeight: 40,
      letterSpacing: 0,
    },
    h2: {
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: 0,
    },
    h3: {
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0,
    },
    h4: {
      fontSize: 20,
      lineHeight: 28,
      letterSpacing: 0.15,
    },
    h5: {
      fontSize: 18,
      lineHeight: 26,
      letterSpacing: 0.15,
    },
    h6: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
    },
  },
  
  // Body text styles - for paragraphs and main content
  body: {
    xl: {
      fontSize: 18,
      lineHeight: 28,
      letterSpacing: 0.5,
    },
    lg: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    md: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
    },
    sm: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4,
    },
    xs: {
      fontSize: 10,
      lineHeight: 14,
      letterSpacing: 0.4,
    },
  },
  
  // Special purpose styles
  caption: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  
  overline: {
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.5,
  },
  
  button: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 1.25,
  },
  
  label: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
};

/**
 * Helper function to create text style objects
 */
export const createTextStyle = (
  variant: FontSize,
  weight: FontWeight = 'regular'
) => ({
  fontSize: variant.fontSize,
  lineHeight: variant.lineHeight,
  letterSpacing: variant.letterSpacing,
  fontWeight: fontWeights[weight],
});

/**
 * Predefined text style combinations for common use cases
 */
export const textStyles = {
  // Headers
  pageTitle: createTextStyle(typography.heading.h1, 'bold'),
  sectionTitle: createTextStyle(typography.heading.h2, 'semibold'),
  cardTitle: createTextStyle(typography.heading.h3, 'semibold'),
  
  // Body
  bodyLarge: createTextStyle(typography.body.lg, 'regular'),
  bodyDefault: createTextStyle(typography.body.md, 'regular'),
  bodySmall: createTextStyle(typography.body.sm, 'regular'),
  
  // Interactive
  buttonLarge: createTextStyle(typography.button, 'semibold'),
  buttonDefault: createTextStyle(typography.body.sm, 'semibold'),
  link: createTextStyle(typography.body.md, 'medium'),
  
  // Labels and captions
  label: createTextStyle(typography.label, 'medium'),
  caption: createTextStyle(typography.caption, 'regular'),
  overline: createTextStyle(typography.overline, 'bold'),
};
