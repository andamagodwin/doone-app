import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import { BadgeVariant } from '../types';

export interface BadgeProps extends ViewProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'sm',
  className = '',
  ...props
}) => {
  const variantClass = variant === 'primary' ? 'bg-primary text-white' :
                       variant === 'secondary' ? 'bg-secondary text-white' :
                       variant === 'success' ? 'bg-success text-white' :
                       variant === 'warning' ? 'bg-warning text-white' :
                       variant === 'error' ? 'bg-error text-white' :
                       'bg-info text-white';

  const sizeClass = size === 'sm' ? 'px-2 py-1' : 'px-3 py-1.5';
  const textSizeClass = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <View
      className={`rounded-full ${variantClass} ${sizeClass} ${className}`.trim()}
      {...props}>
      <Text className={`font-lato-bold ${textSizeClass} ${variantClass}`.trim()}>
        {label}
      </Text>
    </View>
  );
};

Badge.displayName = 'Badge';
