import { Tabs } from 'expo-router';
import { View, Pressable, Platform } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeIcon from '../../assets/home/icons/home.svg';
import CalendarIcon from '../../assets/home/icons/calendar.svg';
import ClockIcon from '../../assets/home/icons/clock.svg';
import UserIcon from '../../assets/home/icons/user.svg';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#363636',
          borderTopWidth: 0,
          height: 70 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF99',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Index',
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon width={24} height={24} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, focused }) => (
            <CalendarIcon width={24} height={24} fill={color} />
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
                backgroundColor: '#6C63FF',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}>
              <Pressable
                onPress={() => {
                  // Handle add action
                  console.log('Add pressed');
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesome name="plus" size={28} color="#FFFFFF" />
              </Pressable>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="focus"
        options={{
          title: 'Focus',
          tabBarIcon: ({ color, focused }) => (
            <ClockIcon width={24} height={24} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <UserIcon width={24} height={24} fill={color} />
          ),
        }}
      />
    </Tabs>
  );
}
