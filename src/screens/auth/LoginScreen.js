/**
 * LoginScreen.js — Auth flow
 */
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useAuth } from '../../store/context/AuthContext';
import { COLORS } from '../../constants/colors';

const LoginScreen = ({ navigation }) => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Perhatian', 'Email dan password wajib diisi.');
      return;
    }
    try {
      await login({ email, password });
      // AppNavigator handles redirection via userRole
    } catch (error) {
      Alert.alert('Login Gagal', error.response?.data?.message ?? 'Terjadi kesalahan.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>SIGAP</Text>
      <Text style={styles.subtitle}>Dinas PUPR — Pelaporan Infrastruktur</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.textMuted}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={COLORS.textMuted}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading
          ? <ActivityIndicator color={COLORS.white} />
          : <Text style={styles.buttonText}>Masuk</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Belum punya akun? <Text style={styles.linkBold}>Daftar</Text></Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: COLORS.background },
  title: { fontSize: 36, fontWeight: '800', color: COLORS.primary, textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, textAlign: 'center', marginBottom: 32 },
  input: {
    backgroundColor: COLORS.surface, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 15, color: COLORS.textPrimary, borderWidth: 1, borderColor: COLORS.border, marginBottom: 12,
  },
  button: {
    backgroundColor: COLORS.primary, borderRadius: 10, paddingVertical: 15,
    alignItems: 'center', marginTop: 8, marginBottom: 16,
  },
  buttonText: { color: COLORS.white, fontWeight: '700', fontSize: 16 },
  link: { textAlign: 'center', color: COLORS.textSecondary, fontSize: 14 },
  linkBold: { color: COLORS.primary, fontWeight: '700' },
});

export default LoginScreen;
