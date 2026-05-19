// app/(pegawai)/laporan.js
// Daftar laporan masuk untuk petugas PUPR — stub, siap dihubungkan ke Laravel API.

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LaporanPetugas() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F3B6D" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Laporan Masuk</Text>
      </View>
      <View style={styles.body}>
        <MaterialCommunityIcons name="clipboard-list-outline" size={60} color="#A0AEC0" />
        <Text style={styles.placeholder}>Halaman Daftar Laporan Masuk</Text>
        <Text style={styles.sub}>Hubungkan ke Laravel API untuk menampilkan laporan</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { backgroundColor: '#1F3B6D', padding: 18 },
  headerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  body: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  placeholder: { fontSize: 16, fontWeight: 'bold', color: '#1F3B6D', marginTop: 16, textAlign: 'center' },
  sub: { fontSize: 12, color: '#94A3B8', marginTop: 8, textAlign: 'center' },
});
