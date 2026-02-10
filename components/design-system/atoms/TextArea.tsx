import React from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native';
import { colors } from '../tokens';

export interface TextAreaProps extends RNTextInputProps {
  rows?: number;
  error?: boolean;
}

export const TextArea = React.forwardRef<RNTextInput, TextAreaProps>(
  ({ rows = 4, error = false, className = '', style, ...props }, ref) => {
    const borderClass = error ? 'border-error' : 'border-gray-300 focus:border-primary';
    const baseClass = `border-2 rounded-xl font-lato bg-white px-4 py-3 text-base ${borderClass}`;

    return (
      <RNTextInput
        ref={ref}
        multiline
        numberOfLines={rows}
        textAlignVertical="top"
        className={`${baseClass} ${className}`.trim()}
        placeholderTextColor={colors.gray[400]}
        style={[{ minHeight: rows * 24 }, style]}
        {...props}
      />
    );
  }
);

TextArea.displayName = 'TextArea';
