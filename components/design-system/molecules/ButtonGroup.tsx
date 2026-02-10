import React from 'react';
import { View, ViewProps } from 'react-native';
import { Button, ButtonProps } from '../atoms/Button';

export interface ButtonGroupProps extends ViewProps {
  buttons: Array<Omit<ButtonProps, 'ref'>>;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  orientation = 'horizontal',
  spacing = 'md',
  className = '',
  ...props
}) => {
  const spacingClass = spacing === 'sm' ? 'gap-2' :
                       spacing === 'md' ? 'gap-3' :
                       'gap-4';

  const orientationClass = orientation === 'horizontal' ? 'flex-row' : 'flex-col';

  return (
    <View className={`${orientationClass} ${spacingClass} ${className}`.trim()} {...props}>
      {buttons.map((buttonProps, index) => (
        <Button key={index} {...buttonProps} className={`flex-1 ${buttonProps.className || ''}`} />
      ))}
    </View>
  );
};

ButtonGroup.displayName = 'ButtonGroup';
