import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { TextVariant } from '../types';
import { textStyles } from '../tokens/typography';

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  children: React.ReactNode;
}

export const Text = React.forwardRef<RNText, TextProps>(
  ({ variant = 'body', color, className = '', children, style, ...props }, ref) => {
    const variantClass = variant === 'body' ? textStyles.body :
                         variant === 'bodySmall' ? textStyles.bodySmall :
                         variant === 'caption' ? textStyles.caption :
                         variant === 'label' ? textStyles.label :
                         variant === 'error' ? `${textStyles.body} text-error` :
                         textStyles.body;

    const colorClass = color ? `text-[${color}]` : '';
    const combinedClassName = `${variantClass} ${colorClass} ${className}`.trim();

    return (
      <RNText ref={ref} className={combinedClassName} style={style} {...props}>
        {children}
      </RNText>
    );
  }
);

Text.displayName = 'Text';
