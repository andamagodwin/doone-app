export const borders = {
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },

  width: {
    none: 0,
    thin: 1,
    medium: 2,
    thick: 4,
  },
};

// Tailwind class helpers
export const borderTailwind = {
  radiusNone: 'rounded-none',
  radiusSmall: 'rounded',         // 4px
  radiusMedium: 'rounded-lg',     // 8px
  radiusLarge: 'rounded-xl',      // 12px
  radiusXLarge: 'rounded-2xl',    // 16px
  radius2XLarge: 'rounded-3xl',   // 24px
  radiusFull: 'rounded-full',
};
