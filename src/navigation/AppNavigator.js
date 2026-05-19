/**
 * AppNavigator.js
 *
 * Root-level navigator for Sigap - Dinas PUPR Infrastructure Reporting.
 * Handles conditional navigation flow based on:
 *   1. Authentication state  (isAuthenticated)
 *   2. User role             ('masyarakat' | 'petugas')
 *
 * Flow:
 *   Not logged in  →  AuthNavigator
 *   Role: masyarakat  →  MasyarakatNavigator
 *   Role: petugas     →  PetugasNavigator
 */

import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Context
import { useAuth } from '../store/context/AuthContext';

// Sub-navigators
import AuthNavigator from './AuthNavigator';
import MasyarakatNavigator from './MasyarakatNavigator';
import PetugasNavigator from './PetugasNavigator';

// Constants
import { COLORS } from '../constants/colors';

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, userRole, isLoading } = useAuth();

  // Show splash/loading screen while restoring auth session
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          // ── UNAUTHENTICATED ──────────────────────────────────────────
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : userRole === 'petugas' ? (
          // ── PETUGAS (Staff / Admin) ──────────────────────────────────
          <RootStack.Screen name="Petugas" component={PetugasNavigator} />
        ) : (
          // ── MASYARAKAT (Public Reporter) ─────────────────────────────
          <RootStack.Screen name="Masyarakat" component={MasyarakatNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});

export default AppNavigator;
