// app/(auth)/_layout.js
// Plain Stack layout for auth screens — no bottom tabs, no header.
import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="lupa-sandi" />
      <Stack.Screen name="kode-pemulihan" />
      <Stack.Screen name="atur-ulang-sandi" />
      <Stack.Screen name="sukses" />
    </Stack>
  );
}
