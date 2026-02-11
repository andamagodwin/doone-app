import React from 'react';
import { Text, Pressable, PressableProps } from 'react-native';
import { colors } from '../tokens';

export interface LinkProps extends PressableProps {
  children: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  underline?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  children,
  size = 'md',
  color = colors.link,
  underline = false,
  className = '',
  ...props
}) => {
  const sizeClass = size === 'sm' ? 'text-sm' :
                    size === 'md' ? 'text-base' :
                    'text-lg';

  const underlineClass = underline ? 'underline' : '';

  return (
    <Pressable {...props}>
      <Text
        className={`${sizeClass} ${underlineClass} font-lato ${className}`.trim()}
        style={{ color }}>
        {children}
      </Text>
    </Pressable>
  );
};

Link.displayName = 'Link';
