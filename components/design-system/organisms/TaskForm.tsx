import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { InputField } from '../molecules/InputField';
import { SelectableChip } from '../molecules/SelectableChip';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Heading } from '../atoms/Heading';
import { TextArea } from '../atoms/TextArea';
import { Priority } from '../types';

export interface TaskFormData {
  title: string;
  description: string;
  dueDate?: Date;
  priority: Priority;
  category?: string;
}

export interface TaskFormProps {
  initialData?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  onCancel?: () => void;
  submitLabel?: string;
  isEditing?: boolean;
}

const CATEGORIES = ['Work', 'Personal', 'Shopping', 'Health', 'Other'];
const PRIORITIES: Array<{ value: Priority; label: string }> = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = 'Create Task',
  isEditing = false,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<Priority>(initialData?.priority || 'low');
  const [category, setCategory] = useState<string | undefined>(initialData?.category);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority,
        category,
      });
    }
  };

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <Heading level="h3" className="mb-6">
        {isEditing ? 'Edit Task' : 'Create New Task'}
      </Heading>

      <InputField
        label="Task Title"
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
        error={errors.title}
        required
        className="mb-4"
      />

      <View className="mb-4">
        <Text variant="label" className="mb-2">
          Description
        </Text>
        <TextArea
          value={description}
          onChangeText={setDescription}
          placeholder="Enter task description (optional)"
          rows={4}
        />
      </View>

      <View className="mb-4">
        <Text variant="label" className="mb-2">
          Priority
        </Text>
        <View className="flex-row gap-2">
          {PRIORITIES.map((p) => (
            <SelectableChip
              key={p.value}
              label={p.label}
              selected={priority === p.value}
              onPress={() => setPriority(p.value)}
            />
          ))}
        </View>
      </View>

      <View className="mb-6">
        <Text variant="label" className="mb-2">
          Category
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <SelectableChip
              key={cat}
              label={cat}
              selected={category === cat}
              onPress={() => setCategory(category === cat ? undefined : cat)}
            />
          ))}
        </View>
      </View>

      <View className="flex-row gap-3 mt-4">
        {onCancel && (
          <Button
            title="Cancel"
            variant="outline"
            onPress={onCancel}
            className="flex-1"
          />
        )}
        <Button
          title={submitLabel}
          variant="primary"
          onPress={handleSubmit}
          className="flex-1"
        />
      </View>
    </ScrollView>
  );
};

TaskForm.displayName = 'TaskForm';
