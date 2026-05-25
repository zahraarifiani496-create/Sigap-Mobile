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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil Petugas</Text>
      </View>
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

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(pegawai)/beranda')}>
          <MaterialIcons name="dashboard" size={24} color={'#757681'} />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(pegawai)/laporan')}>
          <MaterialIcons name="assignment" size={24} color={'#757681'} />
          <Text style={styles.navText}>Tugas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <MaterialIcons name="person" size={24} color={'#755700'} />
          <Text style={styles.navTextActive}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF', paddingBottom: 70 },
  header: { backgroundColor: '#1F3B6D', padding: 18 },
  headerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
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
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#c5c6d1',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  navItemActive: {
    backgroundColor: '#ffce5d',
    borderRadius: 12,
  },
  navText: {
    fontSize: 10,
    color: '#757681',
    marginTop: 4,
    fontWeight: 'bold',
  },
  navTextActive: {
    fontSize: 10,
    color: '#755700',
    marginTop: 4,
    fontWeight: 'bold',
  },
});
