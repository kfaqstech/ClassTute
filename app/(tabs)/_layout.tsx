import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import withAuth from '@/components/hoc/withAuth';
import Avatar from '@/components/Avatar';

function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: true,
          headerRight: () => <View className='px-2'><Avatar /></View>,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerShown: true,
          headerRight: () => <View className='px-2'><Avatar /></View>,
          tabBarIcon: ({ color }) => <Feather name="book-open" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="learnings/index"
        options={{
          title: 'Learning',
          headerShown: true,
          headerRight: () => <View className='px-2'><Avatar /></View>,
          tabBarIcon: ({ color }) => <AntDesign name="playcircleo" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="learnings/[course]/index"
        options={{
          title: 'Learning',
          href: null,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: null,
          headerShown: false,
          title: 'Settings',
        }}
      />
    </Tabs>
  );
}

export default withAuth(TabLayout);