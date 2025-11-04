/**
 * Theme Store
 * 
 * Zustand store for managing application theme state
 * including color scheme (light/dark) and providing
 * access to theme tokens.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorScheme, ThemeColors, getColors } from './colors';
import { typography, fontWeights, textStyles } from './typography';

export interface ThemeState {
  // Current color scheme
  colorScheme: ColorScheme;
  
  // Current theme colors based on color scheme
  colors: ThemeColors;
  
  // Typography system
  typography: typeof typography;
  fontWeights: typeof fontWeights;
  textStyles: typeof textStyles;
  
  // Actions
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
  
  // System theme detection
  useSystemTheme: boolean;
  setUseSystemTheme: (use: boolean) => void;
}

/**
 * Create the theme store with persistence
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // Initial state
      colorScheme: 'light',
      colors: getColors('light'),
      typography,
      fontWeights,
      textStyles,
      useSystemTheme: false,
      
      // Set color scheme and update colors accordingly
      setColorScheme: (scheme: ColorScheme) => {
        set({
          colorScheme: scheme,
          colors: getColors(scheme),
        });
      },
      
      // Toggle between light and dark mode
      toggleColorScheme: () => {
        const current = get().colorScheme;
        const newScheme: ColorScheme = current === 'light' ? 'dark' : 'light';
        get().setColorScheme(newScheme);
      },
      
      // Enable/disable system theme detection
      setUseSystemTheme: (use: boolean) => {
        set({ useSystemTheme: use });
      },
    }),
    {
      name: 'doone-theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist these specific fields
      partialize: (state) => ({
        colorScheme: state.colorScheme,
        useSystemTheme: state.useSystemTheme,
      }),
    }
  )
);

/**
 * Hook to get current theme colors
 */
export const useThemeColors = () => {
  return useThemeStore((state) => state.colors);
};

/**
 * Hook to get current color scheme
 */
export const useColorScheme = () => {
  return useThemeStore((state) => state.colorScheme);
};

/**
 * Hook to get typography system
 */
export const useTypography = () => {
  return useThemeStore((state) => ({
    typography: state.typography,
    fontWeights: state.fontWeights,
    textStyles: state.textStyles,
  }));
};

/**
 * Hook to get theme actions
 */
export const useThemeActions = () => {
  return useThemeStore((state) => ({
    setColorScheme: state.setColorScheme,
    toggleColorScheme: state.toggleColorScheme,
    setUseSystemTheme: state.setUseSystemTheme,
  }));
};
