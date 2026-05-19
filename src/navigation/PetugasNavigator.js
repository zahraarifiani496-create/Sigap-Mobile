/**
 * PetugasNavigator.js
 * Bottom-tab + stack navigator for staff/admin (Petugas).
 * Tabs: Dashboard | Daftar Laporan | Profil
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../screens/petugas/DashboardScreen';
import DaftarLaporanScreen from '../screens/petugas/laporan/DaftarLaporanScreen';
import DetailLaporanPetugasScreen from '../screens/petugas/laporan/DetailLaporanPetugasScreen';
import UpdateStatusScreen from '../screens/petugas/laporan/UpdateStatusScreen';
import ProfilPetugasScreen from '../screens/petugas/profile/ProfilPetugasScreen';

import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack for Laporan tab (drill into detail and update status)
const LaporanPetugasStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DaftarLaporan" component={DaftarLaporanScreen} />
    <Stack.Screen name="DetailLaporanPetugas" component={DetailLaporanPetugasScreen} />
    <Stack.Screen name="UpdateStatus" component={UpdateStatusScreen} />
  </Stack.Navigator>
);

const PetugasNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: COLORS.accent,
      tabBarInactiveTintColor: COLORS.textMuted,
      tabBarStyle: { height: 60, paddingBottom: 8 },
      tabBarIcon: ({ color, size }) => {
        const icons = {
          Dashboard: 'grid-outline',
          LaporanMasuk: 'clipboard-outline',
          ProfilPetugas: 'shield-checkmark-outline',
        };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="LaporanMasuk" component={LaporanPetugasStack} options={{ title: 'Laporan Masuk' }} />
    <Tab.Screen name="ProfilPetugas" component={ProfilPetugasScreen} options={{ title: 'Profil' }} />
  </Tab.Navigator>
);

export default PetugasNavigator;
