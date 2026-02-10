export const animations = {
  timing: {
    instant: 0,
    fast: 150,
    normal: 250,
    slow: 350,
    slower: 500,
  },

  spring: {
    gentle: {
      tension: 50,
      friction: 10,
    },
    standard: {
      tension: 65,
      friction: 11,
    },
    bouncy: {
      tension: 80,
      friction: 8,
    },
  },

  easing: {
    easeIn: 'ease-in' as const,
    easeOut: 'ease-out' as const,
    easeInOut: 'ease-in-out' as const,
  },
};
