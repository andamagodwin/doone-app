import React from 'react';
import { View, ViewProps } from 'react-native';

export interface DividerProps extends ViewProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  thickness = 1,
  color = '#d9e3f0',
  className = '',
  style,
  ...props
}) => {
  const orientationStyle = orientation === 'horizontal'
    ? { height: thickness, width: '100%' }
    : { width: thickness, height: '100%' };

  return (
    <View
      className={className}
      style={[orientationStyle, { backgroundColor: color }, style]}
      {...props}
    />
  );
};

Divider.displayName = 'Divider';
