import React from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, View } from 'react-native';
import { InputSize } from '../types';
import { colors } from '../tokens';

export interface InputProps extends RNTextInputProps {
  size?: InputSize;
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<RNTextInput, InputProps>(
  ({ size = 'md', error = false, leftIcon, rightIcon, className = '', style, ...props }, ref) => {
    const sizeClass = size === 'sm' ? 'px-3 py-2 text-sm' :
                      size === 'md' ? 'px-4 py-3 text-base' :
                      'px-5 py-4 text-lg';

    const borderClass = error ? 'border-error' : 'border-gray-300 focus:border-primary';
    const baseClass = `border-2 rounded-xl font-lato bg-white ${sizeClass} ${borderClass}`;

    if (leftIcon || rightIcon) {
      return (
        <View className={`flex-row items-center border-2 rounded-xl ${borderClass} bg-white ${className}`.trim()}>
          {leftIcon && <View className="pl-3">{leftIcon}</View>}
          <RNTextInput
            ref={ref}
            className={`flex-1 font-lato ${sizeClass}`.trim()}
            placeholderTextColor={colors.gray[400]}
            style={style}
            {...props}
          />
          {rightIcon && <View className="pr-3">{rightIcon}</View>}
        </View>
      );
    }

    return (
      <RNTextInput
        ref={ref}
        className={`${baseClass} ${className}`.trim()}
        placeholderTextColor={colors.gray[400]}
        style={style}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
