// app/index.js
// Entry point for Expo Router — handles initial auth redirect.
// Uses <Redirect> (render-based) instead of router.replace() in useEffect
// to avoid timing issues with useSegments() on web.

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function Index() {
  const { isAuthenticated, userRole, isLoading } = useAuth();

  // Still restoring session from AsyncStorage — show splash
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#F4C430" />
      </View>
    );
  }

  // Not logged in → go to login
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  // Logged in as pegawai → go to pegawai dashboard
  if (userRole === 'pegawai') {
    return <Redirect href="/(pegawai)/beranda" />;
  }

  // Logged in as masyarakat (default) → go to masyarakat dashboard
  return <Redirect href="/(masyarakat)/beranda" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F3B6D',
  },
});
