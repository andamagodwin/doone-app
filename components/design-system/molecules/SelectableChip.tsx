import React from 'react';
import { Pressable, View, ViewProps } from 'react-native';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';
import { colors } from '../tokens';

export interface SelectableChipProps extends ViewProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
}

export const SelectableChip: React.FC<SelectableChipProps> = ({
  label,
  selected = false,
  onPress,
  disabled = false,
  icon,
  removable = false,
  onRemove,
  className = '',
  ...props
}) => {
  const selectedClass = selected
    ? 'bg-primary border-primary'
    : 'bg-gray-100 border-gray-200';

  const textColor = selected ? colors.text.inverse : colors.text.primary;

  const content = (
    <View className="flex-row items-center gap-1.5">
      {icon}
      <Text variant="label" style={{ color: textColor }}>
        {label}
      </Text>
      {removable && (
        <Pressable onPress={onRemove} className="ml-1">
          <Icon name="times" size={14} color={textColor} />
        </Pressable>
      )}
    </View>
  );

  if (onPress && !disabled) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        className={`flex-row items-center px-3 py-2 rounded-full border-2 ${selectedClass} ${
          disabled ? 'opacity-50' : ''
        } ${className}`.trim()}
        {...props}>
        {content}
      </Pressable>
    );
  }

  return (
    <View
      className={`flex-row items-center px-3 py-2 rounded-full border-2 ${selectedClass} ${
        disabled ? 'opacity-50' : ''
      } ${className}`.trim()}
      {...props}>
      {content}
    </View>
  );
};

SelectableChip.displayName = 'SelectableChip';
