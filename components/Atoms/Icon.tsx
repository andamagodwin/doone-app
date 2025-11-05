/**
 * Icon Atom
 *
 * A thin wrapper around @expo/vector-icons families to enforce
 * consistent sizing and theme-aware colors.
 */

import React from 'react';
import {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome,
  AntDesign,
  Entypo,
} from '@expo/vector-icons';
import { useThemeColors } from '~/theme';

const families = {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome,
  AntDesign,
  Entypo,
};

export type IconFamily = keyof typeof families;

export type IconSize = 'sm' | 'md' | 'lg' | number; // allow numeric override

export type IconColorVariant =
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

export interface IconProps {
  name: string; // icon name within the chosen family
  family?: IconFamily;
  size?: IconSize; // default md
  color?: string; // direct color override
  variant?: IconColorVariant; // theme-aware color
  style?: any;
}

const SIZE_MAP: Record<Exclude<IconSize, number>, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const Icon: React.FC<IconProps> = ({
  name,
  family = 'Ionicons',
  size = 'md',
  color,
  variant = 'primary',
  style,
}) => {
  const colors = useThemeColors();
  const Family = families[family];

  const resolvedSize = typeof size === 'number' ? size : SIZE_MAP[size];

  const resolveVariantColor = () => {
    switch (variant) {
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

  const resolvedColor = color ?? resolveVariantColor();

  return <Family name={name as any} size={resolvedSize} color={resolvedColor} style={style} />;
};

export default Icon;
