import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { HeadingLevel } from '../types';
import { textStyles } from '../tokens/typography';

export interface HeadingProps extends RNTextProps {
  level?: HeadingLevel;
  color?: string;
  children: React.ReactNode;
}

export const Heading = React.forwardRef<RNText, HeadingProps>(
  ({ level = 'h1', color, className = '', children, style, ...props }, ref) => {
    const levelClass = level === 'h1' ? textStyles.h1 :
                       level === 'h2' ? textStyles.h2 :
                       level === 'h3' ? textStyles.h3 :
                       level === 'h4' ? textStyles.h4 :
                       level === 'h5' ? textStyles.h5 :
                       textStyles.h6;

    const colorClass = color ? `text-[${color}]` : 'text-gray-900';
    const combinedClassName = `${levelClass} ${colorClass} ${className}`.trim();

    return (
      <RNText ref={ref} className={combinedClassName} style={style} {...props}>
        {children}
      </RNText>
    );
  }
);

Heading.displayName = 'Heading';
