import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { CustomView, Spacer } from '~/components/Atoms';
import {
  ScreenHeader,
  FilterChip,
  FormGroup,
  TaskListItem,
  ToastNotification,
} from '~/components/Molecules';

type Task = {
  id: string;
  title: string;
  subtitle?: string;
  completed: boolean;
};

export default function TabTwo() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Write docs', subtitle: 'Today, 5pm', completed: false },
    { id: '2', title: 'Design icons', subtitle: 'Tomorrow', completed: true },
    { id: '3', title: 'Refactor atoms', completed: false },
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');
  const [showToast, setShowToast] = useState<null | { type: 'success' | 'error'; message: string }>(
    null
  );
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed);
    if (filter === 'done') return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const toggleTask = (id: string, checked: boolean) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: checked } : t)));
  };

  const addTask = () => {
    if (!newTitle.trim()) {
      setShowToast({ type: 'error', message: 'Please enter a task title' });
      return;
    }
    const id = Date.now().toString();
    setTasks((prev) => [{ id, title: newTitle.trim(), completed: false }, ...prev]);
    setNewTitle('');
    setShowToast({ type: 'success', message: 'Task added' });

    // Clear any existing timeout before setting a new one
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => setShowToast(null), 1500);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  return (
    <ScrollView>
      <CustomView bg="primary" padding="4">
        <ScreenHeader title="Molecules Demo" onAddPress={addTask} />

        <Spacer size="4" />

        {/* Filters */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FilterChip label="All" selected={filter === 'all'} onChange={() => setFilter('all')} />
          <Spacer size="2" horizontal />
          <FilterChip
            label="Active"
            selected={filter === 'active'}
            onChange={() => setFilter('active')}
          />
          <Spacer size="2" horizontal />
          <FilterChip
            label="Done"
            selected={filter === 'done'}
            onChange={() => setFilter('done')}
          />
        </View>

        <Spacer size="4" />

        {/* New Task */}
        <FormGroup
          label="New Task"
          value={newTitle}
          onChangeText={setNewTitle}
          placeholder="Type a task and tap + Add"
          inputProps={{ returnKeyType: 'done', onSubmitEditing: addTask }}
        />

        <Spacer size="2" />

        {/* Task List */}
        <View style={{ gap: 12 }}>
          {filtered.map((t) => (
            <TaskListItem
              key={t.id}
              id={t.id}
              title={t.title}
              subtitle={t.subtitle}
              completed={t.completed}
              onToggle={(v) => toggleTask(t.id, v)}
              onPress={() => toggleTask(t.id, !t.completed)}
              onMenuPress={() => {}}
            />
          ))}
        </View>

        <Spacer size="4" />

        {showToast && <ToastNotification type={showToast.type} title={showToast.message} />}
      </CustomView>
    </ScrollView>
  );
}
