/**
 * TaskListItem Molecule
 *
 * A single row in the task list with a completion toggle,
 * title/subtitle, and an actions icon on the right.
 */

import React from 'react';
import { View } from 'react-native';
import { CheckToggle, CustomText, Icon, Spacer, CustomView, CustomPressable } from '~/components/Atoms';

export interface TaskListItemProps {
  id?: string;
  title: string;
  subtitle?: string;
  completed?: boolean;
  onToggle?: (checked: boolean) => void;
  onPress?: () => void;
  onMenuPress?: () => void;
}

export const TaskListItem: React.FC<TaskListItemProps> = ({
  id,
  title,
  subtitle,
  completed = false,
  onToggle,
  onPress,
  onMenuPress,
}) => {
  // Pulling theme allows future extension (subtitle color, pressed states)
  // const colors = useThemeColors();

  return (
    <CustomView bg="primary" padding="4" rounded="lg" border borderColor="primary" style={{ width: '100%' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CheckToggle value={completed} onChange={onToggle} />
        <Spacer size="3" horizontal />

        <CustomPressable style={{ flex: 1 }} onPress={onPress}>
          <CustomText variant="body-lg" weight={completed ? 'regular' : 'semibold'} color={completed ? 'tertiary' : 'primary'}>
            {title}
          </CustomText>
          {subtitle ? (
            <CustomText variant="body-sm" color="secondary">
              {subtitle}
            </CustomText>
          ) : null}
        </CustomPressable>

        <CustomPressable
          accessibilityLabel="Task actions"
          onPress={onMenuPress}
          pad="2"
          rounded="md"
        >
          <Icon family="Ionicons" name="ellipsis-vertical" variant="secondary" />
        </CustomPressable>
      </View>
    </CustomView>
  );
};

export default TaskListItem;
