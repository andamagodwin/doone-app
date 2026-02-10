import { Tabs } from 'expo-router';
import { View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { BottomSheet, Heading, Text, colors } from '~/components/design-system';
import HomeBoldIcon from '../../assets/home/icons/home-bold.svg';
import CalendarBoldIcon from '../../assets/home/icons/calendar-bold.svg';
import ClockBoldIcon from '../../assets/home/icons/clock-bold.svg';
import UserBoldIcon from '../../assets/home/icons/user-bold.svg';
import AddIcon from '../../assets/home/icons/add.svg';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

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

      {/* Bottom Sheet Modal using Design System Organism */}
      <BottomSheet
        visible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        height="95%">
        <Heading level="h3" className="mb-4">
          Create New Task
        </Heading>
        <Text variant="body" className="text-gray-600">
          Add your task content here...
        </Text>
      </BottomSheet>
    </>
  );
}
