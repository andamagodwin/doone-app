import React from 'react';
import { View, ViewProps } from 'react-native';
import { Input, InputProps } from '../atoms/Input';
import { Text } from '../atoms/Text';

export interface InputFieldProps extends InputProps {
  label?: string;
  error?: string;
  required?: boolean;
  containerClassName?: string;
}

export const InputField = React.forwardRef<any, InputFieldProps>(
  ({ label, error, required, containerClassName = '', ...inputProps }, ref) => {
    return (
      <View className={`${containerClassName}`.trim()}>
        {label && (
          <Text variant="label" className="mb-2">
            {label}
            {required && <Text className="text-error"> *</Text>}
          </Text>
        )}
        <Input ref={ref} error={!!error} {...inputProps} />
        {error && (
          <Text variant="error" className="mt-1">
            {error}
          </Text>
        )}
      </View>
    );
  }
);

InputField.displayName = 'InputField';
