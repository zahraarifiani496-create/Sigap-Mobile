// app/(masyarakat)/_layout.js
// Bottom tab navigator for Masyarakat (public reporters).
// Tabs: HOME | RIWAYAT | LAPORAN | BANTUAN | PROFILE
// Design: identical to original app/(tabs)/_layout.tsx

import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

export default function MasyarakatLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#506690',
        tabBarInactiveTintColor: '#A0AEC0',
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
          paddingBottom: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="beranda"
        options={{
          title: 'HOME',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="riwayat"
        options={{
          title: 'RIWAYAT',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lapor"
        options={{
          title: 'LAPORAN',
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bantuan"
        options={{
          title: 'BANTUAN',
          tabBarIcon: ({ color }) => (
            <AntDesign name="questioncircleo" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
      {/* Hidden screens — accessible via router.push but not shown in tab bar */}
      <Tabs.Screen name="detail-riwayat" options={{ href: null }} />
      <Tabs.Screen name="terkirim" options={{ href: null }} />
    </Tabs>
  );
}
