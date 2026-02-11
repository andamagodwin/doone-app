import React from 'react';
import { View } from 'react-native';
import { SelectableChip } from '../molecules/SelectableChip';

export type FilterOption = 'all' | 'active' | 'completed';

export interface FilterBarProps {
  selected: FilterOption;
  onSelect: (filter: FilterOption) => void;
  counts?: {
    all: number;
    active: number;
    completed: number;
  };
}

export const FilterBar: React.FC<FilterBarProps> = ({ selected, onSelect, counts }) => {
  const filters: Array<{ value: FilterOption; label: string }> = [
    { value: 'all', label: counts ? `All (${counts.all})` : 'All' },
    { value: 'active', label: counts ? `Active (${counts.active})` : 'Active' },
    { value: 'completed', label: counts ? `Completed (${counts.completed})` : 'Completed' },
  ];

  return (
    <View className="flex-row gap-2 px-5 py-3 bg-white border-b border-gray-100">
      {filters.map((filter) => (
        <SelectableChip
          key={filter.value}
          label={filter.label}
          selected={selected === filter.value}
          onPress={() => onSelect(filter.value)}
        />
      ))}
    </View>
  );
};

FilterBar.displayName = 'FilterBar';
