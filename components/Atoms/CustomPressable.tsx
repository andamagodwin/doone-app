/**
 * CustomPressable Atom
 *
 * A unified Pressable wrapper that provides:
 * - Consistent hitSlop and pressed feedback
 * - Theme-aware Android ripple
 * - Optional padding and rounded corners
 * - Optional bordered style
 */

import React from 'react';
import { Platform, Pressable, PressableProps, ViewStyle } from 'react-native';
import { useThemeColors } from '~/theme';

export type SpaceSize = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';

const SCALE: Record<SpaceSize, number> = {
  '0': 0,
  '1': 4,
  '2': 8,
  '3': 12,
  '4': 16,
  '5': 20,
  '6': 24,
  '8': 32,
  '10': 40,
  '12': 48,
  '16': 64,
};

const RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export type RadiusKey = keyof typeof RADIUS;

export interface CustomPressableProps extends Omit<PressableProps, 'style'> {
  pad?: SpaceSize; // uniform padding
  rounded?: RadiusKey;
  border?: boolean;
  borderColor?: 'primary' | 'secondary' | 'focus' | 'error';
  // If provided, always use this background; otherwise use subtle pressed bg
  background?: 'transparent' | 'subtle';
  style?: ViewStyle;
}

export const CustomPressable: React.FC<CustomPressableProps> = ({
  pad = '0',
  rounded = 'md',
  border = false,
  borderColor = 'primary',
  background = 'transparent',
  style,
  android_ripple,
  hitSlop,
  ...props
}) => {
  const colors = useThemeColors();

  const defaultRipple =
    Platform.OS === 'android'
      ? { color: colors.border.focus, foreground: true, radius: 120 }
      : undefined;

  return (
    <Pressable
      hitSlop={hitSlop ?? 8}
      android_ripple={android_ripple ?? (defaultRipple as any)}
      style={({ pressed }) => [
        {
          padding: SCALE[pad],
          borderRadius: RADIUS[rounded],
          borderWidth: border ? 1 : 0,
          borderColor:
            border ? (borderColor === 'primary'
              ? colors.border.primary
              : borderColor === 'secondary'
              ? colors.border.secondary
              : borderColor === 'focus'
              ? colors.border.focus
              : colors.border.error) : undefined,
          backgroundColor:
            background === 'subtle'
              ? (pressed ? colors.background.tertiary : colors.background.secondary)
              : pressed
              ? colors.background.tertiary
              : 'transparent',
        } as ViewStyle,
        style,
      ]}
      {...props}
    />
  );
};

export default CustomPressable;
