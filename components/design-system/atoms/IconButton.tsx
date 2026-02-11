import React from 'react';
import { Pressable as RNPressable, PressableProps as RNPressableProps, View } from 'react-native';

export interface IconButtonProps extends RNPressableProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'secondary' | 'ghost';
}

export const IconButton = React.forwardRef<View, IconButtonProps>(
  ({ icon, size = 'md', variant = 'default', className = '', ...pressableProps }, ref) => {
    const sizeClass = size === 'sm' ? 'w-8 h-8' :
                      size === 'md' ? 'w-10 h-10' :
                      'w-12 h-12';

    const variantClass = variant === 'primary' ? 'bg-primary' :
                         variant === 'secondary' ? 'bg-secondary' :
                         variant === 'ghost' ? 'bg-transparent' :
                         'bg-gray-100';

    const combinedClassName = `${sizeClass} ${variantClass} rounded-full items-center justify-center ${className}`.trim();

    return (
      <RNPressable ref={ref} className={combinedClassName} {...pressableProps}>
        {icon}
      </RNPressable>
    );
  }
);

IconButton.displayName = 'IconButton';
