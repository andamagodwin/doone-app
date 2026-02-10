import React from 'react';
import { View } from 'react-native';
import { Card } from '../molecules/Card';
import { Checkbox } from '../atoms/Checkbox';
import { Text } from '../atoms/Text';
import { Badge } from '../atoms/Badge';
import { IconButton } from '../atoms/IconButton';
import { Icon } from '../atoms/Icon';
import { SelectableChip } from '../molecules/SelectableChip';
import { Priority } from '../types';
import { colors } from '../tokens';

export interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  priority?: Priority;
  category?: string;
  onToggleComplete: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPress?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  completed,
  dueDate,
  priority = 'low',
  category,
  onToggleComplete,
  onEdit,
  onDelete,
  onPress,
}) => {
  const priorityConfig = {
    low: { variant: 'info' as const, label: 'Low' },
    medium: { variant: 'warning' as const, label: 'Medium' },
    high: { variant: 'error' as const, label: 'High' },
  };

  const formatDate = (date: Date) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
  };

  return (
    <Card elevated padding="md" onPress={onPress} className="mb-3">
      <View className="flex-row">
        {/* Checkbox */}
        <View className="mr-3 pt-1">
          <Checkbox
            checked={completed}
            onCheckedChange={() => onToggleComplete(id)}
            size="md"
          />
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text
            variant="body"
            className={`font-lato-bold mb-1 ${
              completed ? 'line-through text-gray-400' : 'text-gray-900'
            }`}>
            {title}
          </Text>

          {description && (
            <Text
              variant="bodySmall"
              className={`mb-2 ${completed ? 'text-gray-300' : 'text-gray-600'}`}>
              {description}
            </Text>
          )}

          {/* Meta info */}
          <View className="flex-row items-center flex-wrap gap-2 mt-2">
            {category && (
              <SelectableChip label={category} selected={false} disabled />
            )}
            {dueDate && (
              <View className="flex-row items-center gap-1">
                <Icon name="calendar" size={14} color={colors.gray[500]} />
                <Text variant="caption" className="text-gray-500">
                  {formatDate(dueDate)}
                </Text>
              </View>
            )}
            {priority && (
              <Badge
                variant={priorityConfig[priority].variant}
                label={priorityConfig[priority].label}
                size="sm"
              />
            )}
          </View>
        </View>

        {/* Actions */}
        {(onEdit || onDelete) && (
          <View className="flex-row gap-1 ml-2">
            {onEdit && (
              <IconButton
                icon={<Icon name="edit" size={18} color={colors.gray[600]} />}
                variant="ghost"
                size="sm"
                onPress={() => onEdit(id)}
              />
            )}
            {onDelete && (
              <IconButton
                icon={<Icon name="trash" size={18} color={colors.error} />}
                variant="ghost"
                size="sm"
                onPress={() => onDelete(id)}
              />
            )}
          </View>
        )}
      </View>
    </Card>
  );
};

TaskCard.displayName = 'TaskCard';
