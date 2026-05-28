// app/(pegawai)/profil-pegawai.js
// Profil petugas dengan tombol logout menggunakan AuthContext.

import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';

export default function ProfilPegawai() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Keluar', 'Yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Keluar', style: 'destructive', onPress: () => logout() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Ionicons name="shield-checkmark" size={64} color="#1F3B6D" />
        <Text style={styles.name}>{user?.name ?? 'Petugas PUPR'}</Text>
        <Text style={styles.role}>Petugas Lapangan</Text>
        <Text style={styles.email}>{user?.email ?? '-'}</Text>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  body: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#1F3B6D', marginTop: 16 },
  role: { fontSize: 13, color: '#64748B', marginTop: 4 },
  email: { fontSize: 12, color: '#94A3B8', marginTop: 4, marginBottom: 32 },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#EF4444', paddingHorizontal: 24,
    paddingVertical: 12, borderRadius: 10,
  },
  logoutText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
});
