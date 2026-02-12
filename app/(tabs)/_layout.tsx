import { Tabs } from 'expo-router';
import { View, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import {
  BottomSheet,
  InputField,
  ColorPicker,
  Text,
  Button,
  colors,
} from '~/components/design-system';
import HomeBoldIcon from '../../assets/home/icons/home-bold.svg';
import CalendarBoldIcon from '../../assets/home/icons/calendar-bold.svg';
import ClockBoldIcon from '../../assets/home/icons/clock-bold.svg';
import UserBoldIcon from '../../assets/home/icons/user-bold.svg';
import AddIcon from '../../assets/home/icons/add.svg';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  // Form state
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors.primary);
  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('All-Day');
  const [reminder, setReminder] = useState('No reminder');
  const [tag, setTag] = useState('No tag');

  const handleCreateTask = () => {
    // Handle task creation
    console.log('Create task:', {
      title: taskTitle,
      color: selectedColor,
      date,
      time,
      reminder,
      tag,
    });
    setIsBottomSheetVisible(false);
    // Reset form
    setTaskTitle('');
    setSelectedColor(colors.primary);
    setDate('Today');
    setTime('All-Day');
    setReminder('No reminder');
    setTag('No tag');
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.background.primary,
            borderTopWidth: 0,
            height: 70 + insets.bottom,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
            paddingTop: 5,
          },
          tabBarActiveTintColor: colors.gray[900],
          tabBarInactiveTintColor: colors.gray[200],
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '500',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <HomeBoldIcon
                width={24}
                height={24}
                color={focused ? colors.gray[900] : colors.gray[200]}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Calendar',
            tabBarIcon: ({ focused }) => (
              <CalendarBoldIcon
                width={24}
                height={24}
                color={focused ? colors.gray[900] : colors.gray[200]}
              />
            ),
          }}
        />
        {/* Centered elevated action button */}
        <Tabs.Screen
          name="add"
          options={{
            title: '',
            tabBarIcon: () => (
              <View
                style={{
                  position: 'absolute',
                  top: -30,
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 0,
                }}>
                <Pressable
                  onPress={() => setIsBottomSheetVisible(true)}
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <AddIcon width={28} height={28} color="#FFFFFF" />
                </Pressable>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="focus"
          options={{
            title: 'Focus',
            tabBarIcon: ({ focused }) => (
              <ClockBoldIcon
                width={24}
                height={24}
                color={focused ? colors.gray[900] : colors.gray[200]}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => (
              <UserBoldIcon
                width={24}
                height={24}
                color={focused ? colors.gray[900] : colors.gray[200]}
              />
            ),
          }}
        />
      </Tabs>

      {/* Bottom Sheet Modal with Task Form */}
      <BottomSheet
        visible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        height="95%"
        backgroundColor={selectedColor}
        headerRight={
          <Pressable onPress={handleCreateTask}>
            <Text className="text-white font-lato-bold text-base">Create</Text>
          </Pressable>
        }>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Task Title Input */}
          <View className="mb-6">
            <InputField
              placeholder="New Task"
              value={taskTitle}
              onChangeText={setTaskTitle}
              size="lg"
              autoFocus
              selectionColor="#000"
              style={{
                backgroundColor: 'transparent',
                borderWidth: 0,
                textAlign: 'center',
                color: '#fff',
                fontSize: 28,
                fontWeight: '600',
                minHeight: 60,
                lineHeight: 34,
              }}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>

          {/* Color Picker */}
          <View className="mb-6">
            <Text variant="label" className="mb-3 text-white">
              Color
            </Text>
            <ColorPicker selectedColor={selectedColor} onColorSelect={setSelectedColor} />
          </View>

          <View className="mb-6 h-px bg-white/30" />

          {/* White Card Container for Form Fields */}
          <View className="bg-white rounded-2xl overflow-hidden">
            {/* Date Field */}
            <View>
              <Pressable className="flex-row items-center justify-between py-4 px-4">
                <Text variant="body" className="text-gray-900 font-lato-bold">
                  Date
                </Text>
                <Text variant="body" className="text-gray-500">
                  {date}
                </Text>
              </Pressable>
              <View className="h-px bg-gray-200 mx-4" />
            </View>

            {/* Time Field */}
            <View>
              <Pressable className="flex-row items-center justify-between py-4 px-4">
                <Text variant="body" className="text-gray-900 font-lato-bold">
                  Time
                </Text>
                <Text variant="body" className="text-gray-500">
                  {time}
                </Text>
              </Pressable>
              <View className="h-px bg-gray-200 mx-4" />
            </View>

            {/* Reminder Field */}
            <View>
              <Pressable className="flex-row items-center justify-between py-4 px-4">
                <Text variant="body" className="text-gray-900 font-lato-bold">
                  Reminder
                </Text>
                <Text variant="body" className="text-gray-500">
                  {reminder}
                </Text>
              </Pressable>
              <View className="h-px bg-gray-200 mx-4" />
            </View>

            {/* Tag Field */}
            <View>
              <Pressable className="flex-row items-center justify-between py-4 px-4">
                <Text variant="body" className="text-gray-900 font-lato-bold">
                  Tag
                </Text>
                <Text variant="body" className="text-gray-500">
                  {tag}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </BottomSheet>
    </>
  );
}
