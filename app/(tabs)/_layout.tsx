import { Tabs } from 'expo-router';
import { View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import HomeIcon from '../../assets/home/icons/home.svg';
import HomeBoldIcon from '../../assets/home/icons/home-bold.svg';
// import CalendarIcon from '../../assets/home/icons/calendar.svg';
import CalendarBoldIcon from '../../assets/home/icons/calendar-bold.svg';
// import ClockIcon from '../../assets/home/icons/clock.svg';
import ClockBoldIcon from '../../assets/home/icons/clock-bold.svg';
// import UserIcon from '../../assets/home/icons/user.svg';
import UserBoldIcon from '../../assets/home/icons/user-bold.svg';
import AddIcon from '../../assets/home/icons/add.svg';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          height: 70 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#d9e3f0',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <HomeBoldIcon width={24} height={24} color={focused ? '#000000' : '#d9e3f0'} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, focused }) => (
            <CalendarBoldIcon width={24} height={24} color={focused ? '#000000' : '#d9e3f0'} />
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
                backgroundColor: '#36cf94',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 0,
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
          tabBarIcon: ({ color, focused }) => (
            <ClockBoldIcon width={24} height={24} color={focused ? '#000000' : '#d9e3f0'} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <UserBoldIcon width={24} height={24} color={focused ? '#000000' : '#d9e3f0'} />
          ),
        }}
      />
    </Tabs>
  );
}
