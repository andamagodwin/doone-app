import React from 'react';
import { FlatList, FlatListProps, View } from 'react-native';
import { TaskCard, TaskCardProps } from './TaskCard';
import { EmptyState } from '../molecules/EmptyState';
import { Button } from '../atoms/Button';

interface Task extends Omit<TaskCardProps, 'onToggleComplete' | 'onEdit' | 'onDelete'> {
  id: string;
}

export interface TaskListProps extends Omit<FlatListProps<Task>, 'data' | 'renderItem'> {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onTaskPress?: (task: Task) => void;
  onAddTask?: () => void;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  onTaskPress,
  onAddTask,
  emptyStateTitle = 'No tasks yet',
  emptyStateDescription = 'Create your first task to get started',
  ...flatListProps
}) => {
  const renderItem = ({ item }: { item: Task }) => (
    <TaskCard
      {...item}
      onToggleComplete={onToggleComplete}
      onEdit={onEdit}
      onDelete={onDelete}
      onPress={() => onTaskPress?.(item)}
    />
  );

  const renderEmpty = () => (
    <EmptyState
      title={emptyStateTitle}
      description={emptyStateDescription}
      iconName="inbox"
      action={
        onAddTask ? (
          <Button title="Create Task" variant="primary" onPress={onAddTask} />
        ) : undefined
      }
    />
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={tasks.length === 0 ? { flex: 1 } : undefined}
      {...flatListProps}
    />
  );
};

TaskList.displayName = 'TaskList';
