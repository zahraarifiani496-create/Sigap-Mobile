// app/(pegawai)/_layout.js
// Bottom tab navigator for Petugas PUPR (staff).
// Tabs: Dashboard | Laporan Masuk | Profil

import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function PegawaiLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1F3B6D',
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
          title: 'DASHBOARD',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="laporan"
        options={{
          title: 'LAPORAN',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clipboard-list-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil-pegawai"
        options={{
          title: 'PROFIL',
          tabBarIcon: ({ color }) => (
            <Ionicons name="shield-checkmark-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
