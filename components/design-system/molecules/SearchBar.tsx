import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, InputProps } from '../atoms/Input';
import { Icon } from '../atoms/Icon';
import { IconButton } from '../atoms/IconButton';
import { colors } from '../tokens';

export interface SearchBarProps extends Omit<InputProps, 'leftIcon' | 'rightIcon'> {
  onClear?: () => void;
  showClearButton?: boolean;
}

export const SearchBar = React.forwardRef<any, SearchBarProps>(
  ({ value, onChangeText, onClear, showClearButton = true, ...inputProps }, ref) => {
    const [searchValue, setSearchValue] = useState(value || '');

    const handleChangeText = (text: string) => {
      setSearchValue(text);
      onChangeText?.(text);
    };

    const handleClear = () => {
      setSearchValue('');
      onClear?.();
      onChangeText?.('');
    };

    const showClear = showClearButton && searchValue.length > 0;

    return (
      <Input
        ref={ref}
        value={searchValue}
        onChangeText={handleChangeText}
        leftIcon={<Icon name="search" size={20} color={colors.gray[400]} />}
        rightIcon={
          showClear ? (
            <IconButton
              icon={<Icon name="times-circle" size={20} color={colors.gray[400]} />}
              variant="ghost"
              size="sm"
              onPress={handleClear}
            />
          ) : undefined
        }
        placeholder="Search..."
        {...inputProps}
      />
    );
  }
);

SearchBar.displayName = 'SearchBar';
