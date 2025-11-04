/**
 * Semantic Color Mapping
 * 
 * This file defines semantic color tokens that map to the brand colors
 * defined in tailwind.config.js. These tokens provide meaningful names
 * for different UI contexts and support both light and dark themes.
 */

export type ColorScheme = 'light' | 'dark';

export interface ThemeColors {
  // Background colors
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    elevated: string;
  };
  
  // Text colors
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
    link: string;
    success: string;
    error: string;
    warning: string;
    info: string;
  };
  
  // Border colors
  border: {
    primary: string;
    secondary: string;
    focus: string;
    error: string;
  };
  
  // Interactive elements
  interactive: {
    primary: string;
    primaryHover: string;
    primaryPressed: string;
    secondary: string;
    secondaryHover: string;
    secondaryPressed: string;
    disabled: string;
  };
  
  // Status colors
  status: {
    success: string;
    successBg: string;
    error: string;
    errorBg: string;
    warning: string;
    warningBg: string;
    info: string;
    infoBg: string;
  };
  
  // Brand colors (direct mapping)
  brand: {
    primary: string;
    secondary: string;
    accent: string;
    highlight: string;
  };
}

/**
 * Light Theme Colors
 */
export const lightColors: ThemeColors = {
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    tertiary: '#E9ECEF',
    elevated: '#FFFFFF',
  },
  
  text: {
    primary: '#212529',
    secondary: '#495057',
    tertiary: '#6C757D',
    inverse: '#FFFFFF',
    link: '#1d85ac',
    success: '#2eb39e',
    error: '#DC3545',
    warning: '#FFC107',
    info: '#1766a4',
  },
  
  border: {
    primary: '#DEE2E6',
    secondary: '#CED4DA',
    focus: '#165caf',
    error: '#DC3545',
  },
  
  interactive: {
    primary: '#36cf94',
    primaryHover: '#2eba82',
    primaryPressed: '#26a570',
    secondary: '#0e4198',
    secondaryHover: '#0c3780',
    secondaryPressed: '#0a2d68',
    disabled: '#ADB5BD',
  },
  
  status: {
    success: '#2eb39e',
    successBg: '#D4F4EC',
    error: '#DC3545',
    errorBg: '#F8D7DA',
    warning: '#FFC107',
    warningBg: '#FFF3CD',
    info: '#1766a4',
    infoBg: '#D1E7F5',
  },
  
  brand: {
    primary: '#36cf94',
    secondary: '#0e4198',
    accent: '#2395a7',
    highlight: '#28a4a2',
  },
};

/**
 * Dark Theme Colors
 */
export const darkColors: ThemeColors = {
  background: {
    primary: '#121212',
    secondary: '#1E1E1E',
    tertiary: '#2C2C2C',
    elevated: '#1E1E1E',
  },
  
  text: {
    primary: '#FFFFFF',
    secondary: '#E0E0E0',
    tertiary: '#B0B0B0',
    inverse: '#121212',
    link: '#1d85ac',
    success: '#2eb39e',
    error: '#FF6B6B',
    warning: '#FFD93D',
    info: '#1766a4',
  },
  
  border: {
    primary: '#3C3C3C',
    secondary: '#4A4A4A',
    focus: '#165caf',
    error: '#FF6B6B',
  },
  
  interactive: {
    primary: '#36cf94',
    primaryHover: '#42dba3',
    primaryPressed: '#2eba82',
    secondary: '#0e4198',
    secondaryHover: '#1350ad',
    secondaryPressed: '#0c3780',
    disabled: '#4A4A4A',
  },
  
  status: {
    success: '#2eb39e',
    successBg: '#1A3A35',
    error: '#FF6B6B',
    errorBg: '#3A1F1F',
    warning: '#FFD93D',
    warningBg: '#3A3420',
    info: '#1766a4',
    infoBg: '#1A2A3A',
  },
  
  brand: {
    primary: '#36cf94',
    secondary: '#0e4198',
    accent: '#2395a7',
    highlight: '#28a4a2',
  },
};

/**
 * Get colors for a specific theme
 */
export const getColors = (scheme: ColorScheme): ThemeColors => {
  return scheme === 'light' ? lightColors : darkColors;
};
