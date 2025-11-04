/**
 * CustomView Component
 * 
 * The base container component with theme-aware background colors
 * and consistent spacing system using NativeWind.
 */

import React from 'react';
import { View, ViewProps } from 'react-native';
import { useThemeColors } from '~/theme';

export type BackgroundVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'elevated'
  | 'transparent'
  | 'brand-primary'
  | 'brand-secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export type Spacing = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';

export interface CustomViewProps extends Omit<ViewProps, 'style'> {
  /** Background color variant */
  bg?: BackgroundVariant;
  
  /** Padding (all sides) */
  padding?: Spacing;
  
  /** Padding horizontal (left & right) */
  paddingX?: Spacing;
  
  /** Padding vertical (top & bottom) */
  paddingY?: Spacing;
  
  /** Margin (all sides) */
  margin?: Spacing;
  
  /** Margin horizontal (left & right) */
  marginX?: Spacing;
  
  /** Margin vertical (top & bottom) */
  marginY?: Spacing;
  
  /** Border radius */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  
  /** Border width */
  border?: boolean | '2' | '4';
  
  /** Border color variant */
  borderColor?: 'primary' | 'secondary' | 'focus' | 'error';
  
  /** Center children */
  center?: boolean;
  
  /** Flex direction */
  row?: boolean;
  
  /** Additional custom styles */
  style?: ViewProps['style'];
  
  /** Children components */
  children?: React.ReactNode;
}

export const CustomView: React.FC<CustomViewProps> = ({
  bg = 'transparent',
  padding,
  paddingX,
  paddingY,
  margin,
  marginX,
  marginY,
  rounded = 'none',
  border = false,
  borderColor = 'primary',
  center = false,
  row = false,
  style,
  children,
  ...props
}) => {
  const colors = useThemeColors();

  // Map background variant to theme color
  const getBackgroundColor = () => {
    switch (bg) {
      case 'primary':
        return colors.background.primary;
      case 'secondary':
        return colors.background.secondary;
      case 'tertiary':
        return colors.background.tertiary;
      case 'elevated':
        return colors.background.elevated;
      case 'brand-primary':
        return colors.brand.primary;
      case 'brand-secondary':
        return colors.brand.secondary;
      case 'success':
        return colors.status.successBg;
      case 'error':
        return colors.status.errorBg;
      case 'warning':
        return colors.status.warningBg;
      case 'info':
        return colors.status.infoBg;
      case 'transparent':
        return 'transparent';
      default:
        return 'transparent';
    }
  };

  // Map border color variant to theme color
  const getBorderColor = () => {
    switch (borderColor) {
      case 'primary':
        return colors.border.primary;
      case 'secondary':
        return colors.border.secondary;
      case 'focus':
        return colors.border.focus;
      case 'error':
        return colors.border.error;
      default:
        return colors.border.primary;
    }
  };

  // Build NativeWind className
  const className = [
    // Padding
    padding && `p-${padding}`,
    paddingX && `px-${paddingX}`,
    paddingY && `py-${paddingY}`,
    // Margin
    margin && `m-${margin}`,
    marginX && `mx-${marginX}`,
    marginY && `my-${marginY}`,
    // Border radius
    rounded && `rounded-${rounded}`,
    // Border
    border && (typeof border === 'string' ? `border-${border}` : 'border'),
    // Layout
    center && 'justify-center items-center',
    row && 'flex-row',
  ]
    .filter(Boolean)
    .join(' ');

  const computedStyle = [
    {
      backgroundColor: getBackgroundColor(),
      borderColor: border ? getBorderColor() : undefined,
    },
    style,
  ];

  return (
    <View className={className} style={computedStyle} {...props}>
      {children}
    </View>
  );
};
