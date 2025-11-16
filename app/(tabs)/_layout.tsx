import { Tabs } from 'expo-router';
import { View, Pressable, Modal, Text, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect, useRef } from 'react';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
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
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isBottomSheetVisible) {
      setModalVisible(true);
      // Small delay to ensure modal is mounted before animation starts
      setTimeout(() => {
        Animated.parallel([
          Animated.spring(slideAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 65,
            friction: 11,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }, 50);
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Hide modal after animation completes
        setModalVisible(false);
      });
    }
  }, [isBottomSheetVisible, slideAnim, fadeAnim]);

  const closeBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };
  
  return (
    <>
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
                  setIsBottomSheetVisible(true);
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
    
    {/* Bottom Sheet Modal */}
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={closeBottomSheet}
    >
      <Animated.View 
        className="flex-1 bg-black/50"
        style={{ opacity: fadeAnim }}
      >
        <Pressable 
          className="flex-1"
          onPress={closeBottomSheet}
        >
          <Animated.View 
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl"
            style={{ 
              height: '95%',
              paddingTop: 20,
              paddingBottom: insets.bottom + 20,
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1000, 0],
                  }),
                },
              ],
            }}
          >
            <Pressable 
              className="flex-1"
              onPress={(e) => e.stopPropagation()}
            >
              {/* Header with close button */}
              <View className="flex-row items-center px-5 mb-4">
                <Pressable 
                  onPress={closeBottomSheet}
                  className="p-1 -ml-2 active:opacity-50"
                >
                  <AntDesign name="close" size={24} color="#000000" />
                </Pressable>
                <View className="flex-1 items-center -ml-8">
                  <View className="w-12 h-1 bg-gray-300 rounded-full" />
                </View>
              </View>
              
              {/* Content */}
              <View className="flex-1 px-5">
                <Text className="text-2xl font-bold text-gray-900 mb-4">Create New Task</Text>
                <Text className="text-gray-600">Add your task content here...</Text>
              </View>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </Modal>
    </>
  );
}
