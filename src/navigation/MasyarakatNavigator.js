/**
 * MasyarakatNavigator.js
 * Bottom-tab + stack navigator for public reporters (Masyarakat).
 * Tabs: Beranda | Buat Laporan | Riwayat | Profil
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import BerandaScreen from '../screens/masyarakat/BerandaScreen';
import BuatLaporanScreen from '../screens/masyarakat/laporan/BuatLaporanScreen';
import RiwayatScreen from '../screens/masyarakat/laporan/RiwayatScreen';
import DetailLaporanScreen from '../screens/masyarakat/laporan/DetailLaporanScreen';
import TrackingScreen from '../screens/masyarakat/tracking/TrackingScreen';
import ProfilScreen from '../screens/masyarakat/ProfilScreen';

import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack for Laporan tab (allows drilling into detail & tracking)
const LaporanStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Riwayat" component={RiwayatScreen} />
    <Stack.Screen name="DetailLaporan" component={DetailLaporanScreen} />
    <Stack.Screen name="Tracking" component={TrackingScreen} />
  </Stack.Navigator>
);

const MasyarakatNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textMuted,
      tabBarStyle: { height: 60, paddingBottom: 8 },
      tabBarIcon: ({ color, size }) => {
        const icons = {
          Beranda: 'home-outline',
          BuatLaporan: 'add-circle-outline',
          Laporan: 'document-text-outline',
          Profil: 'person-outline',
        };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Beranda" component={BerandaScreen} />
    <Tab.Screen name="BuatLaporan" component={BuatLaporanScreen} options={{ title: 'Buat Laporan' }} />
    <Tab.Screen name="Laporan" component={LaporanStack} />
    <Tab.Screen name="Profil" component={ProfilScreen} />
  </Tab.Navigator>
);

export default MasyarakatNavigator;
