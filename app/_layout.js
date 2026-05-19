/**
 * app/_layout.js — Root Layout (Expo Router)
 *
 * Responsibilities:
 * 1. Wraps the entire app in <AuthProvider>
 * 2. Registers all route groups with <Stack>
 * 3. Guards routes using useSegments + useEffect:
 *    - Unauthenticated → /(auth)/login
 *    - Role 'masyarakat' + in auth group → /(masyarakat)/beranda
 *    - Role 'pegawai' + in auth group    → /(pegawai)/beranda
 *    - Role 'pegawai' + in masyarakat   → /(pegawai)/beranda  (cross-role guard)
 *    - Role 'masyarakat' + in pegawai   → /(masyarakat)/beranda
 */

import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';

// ─── GUARD COMPONENT ──────────────────────────────────────────────────────────
// Separated so it can use useAuth() inside AuthProvider tree.
function RouteGuard() {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while restoring session from AsyncStorage
    if (isLoading) return;

    const inAuthGroup      = segments[0] === '(auth)';
    const inMasyarakatGroup = segments[0] === '(masyarakat)';
    const inPegawaiGroup   = segments[0] === '(pegawai)';

    if (!isAuthenticated) {
      // ── Not logged in → force to login ──────────────────────────────────
      if (!inAuthGroup) {
        router.replace('/(auth)/login');
      }
    } else {
      // ── Logged in ────────────────────────────────────────────────────────
      if (inAuthGroup) {
        // Just logged in — send to correct dashboard
        if (userRole === 'pegawai') {
          router.replace('/(pegawai)/beranda');
        } else {
          router.replace('/(masyarakat)/beranda');
        }
      } else if (userRole === 'pegawai' && inMasyarakatGroup) {
        // Pegawai somehow accessed masyarakat routes → redirect
        router.replace('/(pegawai)/beranda');
      } else if (userRole === 'masyarakat' && inPegawaiGroup) {
        // Masyarakat somehow accessed pegawai routes → redirect
        router.replace('/(masyarakat)/beranda');
      }
    }
  }, [isAuthenticated, userRole, isLoading, segments]);

  return null; // Pure logic component, renders nothing
}

// ─── ROOT LAYOUT ──────────────────────────────────────────────────────────────
export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Root entry point — loading splash, then RouteGuard redirects */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Auth group — Login, Register, dll */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        {/* Masyarakat group — Bottom tabs for public reporters */}
        <Stack.Screen name="(masyarakat)" options={{ headerShown: false }} />

        {/* Pegawai group — Bottom tabs for PUPR staff */}
        <Stack.Screen name="(pegawai)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
