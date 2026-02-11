import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Add() {
  useEffect(() => {
    // Redirect back to index since this is just a button
    router.back();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold">Add Task</Text>
    </View>
  );
}
