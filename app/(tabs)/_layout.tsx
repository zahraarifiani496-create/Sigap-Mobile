import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#506690', // Warna saat aktif (sesuai desain)
        tabBarInactiveTintColor: '#A0AEC0',
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
          paddingBottom: 10,
        },
        headerShown: false, // Menghilangkan header default Expo
      }}
    >
      <Tabs.Screen
        name="HalamanBeranda"
        options={{
          title: 'HOME',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="view-dashboard-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="HalamanRiwayat"
        options={{
          title: 'RIWAYAT',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="history" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="HalamanLapor"
        options={{
          title: 'LAPORAN',
          tabBarIcon: ({ color }) => <AntDesign name="pluscircleo" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="HalamanBantuan"
        options={{
          title: 'BANTUAN',
          tabBarIcon: ({ color }) => <AntDesign name="questioncircleo" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="HalamanProfil"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}