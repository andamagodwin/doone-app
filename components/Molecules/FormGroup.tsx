/**
 * FormGroup Molecule
 *
 * Standard label + input + helper/error message.
 */

import React from 'react';
import { View, ViewStyle } from 'react-native';
import { CustomText, CustomInput } from '~/components/Atoms';

export interface FormGroupProps {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  style?: ViewStyle;
  // Pass-through props to CustomInput
  inputProps?: Omit<React.ComponentProps<typeof CustomInput>, 'label' | 'error' | 'helperText' | 'value' | 'onChangeText' | 'placeholder'>;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  helperText,
  error,
  style,
  inputProps,
}) => {
  return (
    <View style={[{ width: '100%', marginBottom: 16 }, style]}>
      <CustomText variant="label" weight="medium" color={error ? 'error' : 'secondary'}>
        {label}
      </CustomText>
      <CustomInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        {...inputProps}
      />
    </View>
  );
};

export default FormGroup;
