import React from 'react';
import { View, ViewProps } from 'react-native';
import { Pressable } from '../atoms/Pressable';
import { shadows } from '../tokens';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  onPress?: () => void;
  elevated?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  elevated = true,
  padding = 'md',
  rounded = true,
  className = '',
  style,
  ...props
}) => {
  const paddingClass = padding === 'none' ? '' :
                       padding === 'sm' ? 'p-3' :
                       padding === 'md' ? 'p-4' :
                       'p-6';

  const roundedClass = rounded ? 'rounded-2xl' : '';
  const elevatedClass = elevated ? 'bg-white' : 'bg-white';

  const baseClassName = `${elevatedClass} ${roundedClass} ${paddingClass} ${className}`.trim();
  const cardStyle = elevated ? [shadows.md, style] : style;

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={baseClassName}
        style={cardStyle}
        hapticFeedback
        {...props}>
        {children}
      </Pressable>
    );
  }

  return (
    <View className={baseClassName} style={cardStyle} {...props}>
      {children}
    </View>
  );
};

Card.displayName = 'Card';
