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

import { SpaceSize, SCALE } from './spaceConstants';
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
