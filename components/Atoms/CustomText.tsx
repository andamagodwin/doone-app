/**
 * CustomText Component
 * 
 * Renders all text with consistent typography throughout the app.
 * Enforces theme-aware text colors and typography system using NativeWind.
 */

import React from 'react';
import { Text, TextProps } from 'react-native';
import { useThemeColors, useTypography, FontWeight } from '~/theme';

export type TextVariant =
  | 'display-xl'
  | 'display-lg'
  | 'display-md'
  | 'display-sm'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body-xl'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'body-xs'
  | 'caption'
  | 'overline'
  | 'button'
  | 'label';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'inverse'
  | 'link'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'brand-primary'
  | 'brand-secondary';

export interface CustomTextProps extends Omit<TextProps, 'style'> {
  /** Typography variant */
  variant?: TextVariant;
  
  /** Font weight */
  weight?: FontWeight;
  
  /** Text color from theme */
  color?: TextColor;
  
  /** Center align text */
  center?: boolean;
  
  /** Make text uppercase */
  uppercase?: boolean;
  
  /** Additional custom styles */
  style?: TextProps['style'];
  
  /** Children text content */
  children: React.ReactNode;
}

export const CustomText: React.FC<CustomTextProps> = ({
  variant = 'body-md',
  weight = 'regular',
  color = 'primary',
  center = false,
  uppercase = false,
  style,
  children,
  ...props
}) => {
  const colors = useThemeColors();
  const { typography, fontWeights } = useTypography();

  // Map variant to typography style
  const getTypographyStyle = () => {
    switch (variant) {
      // Display variants
      case 'display-xl':
        return typography.display.xl;
      case 'display-lg':
        return typography.display.lg;
      case 'display-md':
        return typography.display.md;
      case 'display-sm':
        return typography.display.sm;

      // Heading variants
      case 'h1':
        return typography.heading.h1;
      case 'h2':
        return typography.heading.h2;
      case 'h3':
        return typography.heading.h3;
      case 'h4':
        return typography.heading.h4;
      case 'h5':
        return typography.heading.h5;
      case 'h6':
        return typography.heading.h6;

      // Body variants
      case 'body-xl':
        return typography.body.xl;
      case 'body-lg':
        return typography.body.lg;
      case 'body-md':
        return typography.body.md;
      case 'body-sm':
        return typography.body.sm;
      case 'body-xs':
        return typography.body.xs;

      // Special variants
      case 'caption':
        return typography.caption;
      case 'overline':
        return typography.overline;
      case 'button':
        return typography.button;
      case 'label':
        return typography.label;

      default:
        return typography.body.md;
    }
  };

  // Map color prop to theme color
  const getTextColor = () => {
    switch (color) {
      case 'primary':
        return colors.text.primary;
      case 'secondary':
        return colors.text.secondary;
      case 'tertiary':
        return colors.text.tertiary;
      case 'inverse':
        return colors.text.inverse;
      case 'link':
        return colors.text.link;
      case 'success':
        return colors.text.success;
      case 'error':
        return colors.text.error;
      case 'warning':
        return colors.text.warning;
      case 'info':
        return colors.text.info;
      case 'brand-primary':
        return colors.brand.primary;
      case 'brand-secondary':
        return colors.brand.secondary;
      default:
        return colors.text.primary;
    }
  };

  const typographyStyle = getTypographyStyle();
  const textColor = getTextColor();

  // Build className for NativeWind
  const className = [
    center && 'text-center',
    uppercase && 'uppercase',
  ]
    .filter(Boolean)
    .join(' ');

  const computedStyle = [
    {
      fontSize: typographyStyle.fontSize,
      lineHeight: typographyStyle.lineHeight,
      letterSpacing: typographyStyle.letterSpacing,
      fontWeight: fontWeights[weight],
      color: textColor,
    },
    style,
  ];

  return (
    <Text className={className} style={computedStyle} {...props}>
      {children}
    </Text>
  );
};
