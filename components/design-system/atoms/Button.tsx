import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View, ActivityIndicator } from 'react-native';
import { ButtonVariant, ButtonSize } from '../types';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<View, ButtonProps>(
  ({
    title,
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    disabled,
    className = '',
    ...touchableProps
  }, ref) => {
    const variantStyles = getVariantStyles(variant);
    const sizeStyles = getSizeStyles(size);
    const disabledStyles = (disabled || loading) ? 'opacity-50' : '';

    return (
      <TouchableOpacity
        ref={ref}
        disabled={disabled || loading}
        className={`${variantStyles.button} ${sizeStyles.button} ${disabledStyles} ${className}`.trim()}
        {...touchableProps}>
        {loading ? (
          <ActivityIndicator color={variantStyles.textColor} />
        ) : (
          <View className="flex-row items-center justify-center gap-2">
            {leftIcon}
            <Text className={`${variantStyles.text} ${sizeStyles.text}`.trim()}>{title}</Text>
            {rightIcon}
          </View>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

function getVariantStyles(variant: ButtonVariant) {
  switch (variant) {
    case 'primary':
      return {
        button: 'bg-primary rounded-3xl shadow-md items-center justify-center',
        text: 'text-white font-lato-bold',
        textColor: '#ffffff',
      };
    case 'secondary':
      return {
        button: 'bg-secondary rounded-3xl shadow-md items-center justify-center',
        text: 'text-white font-lato-bold',
        textColor: '#ffffff',
      };
    case 'outline':
      return {
        button: 'bg-transparent border-2 border-primary rounded-3xl items-center justify-center',
        text: 'text-primary font-lato-bold',
        textColor: '#36cf94',
      };
    case 'ghost':
      return {
        button: 'bg-transparent items-center justify-center',
        text: 'text-primary font-lato-bold',
        textColor: '#36cf94',
      };
    case 'danger':
      return {
        button: 'bg-error rounded-3xl shadow-md items-center justify-center',
        text: 'text-white font-lato-bold',
        textColor: '#ffffff',
      };
  }
}

function getSizeStyles(size: ButtonSize) {
  switch (size) {
    case 'sm':
      return {
        button: 'px-4 py-2',
        text: 'text-sm',
      };
    case 'md':
      return {
        button: 'px-6 py-4',
        text: 'text-base',
      };
    case 'lg':
      return {
        button: 'px-8 py-5',
        text: 'text-lg',
      };
  }
}
