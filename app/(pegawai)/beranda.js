// app/(pegawai)/beranda.js
// Dashboard utama untuk Petugas PUPR.
// Menampilkan statistik laporan masuk, daftar tugas, dan status penanganan.

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

// ─── DATA DUMMY (ganti dengan API call ke Laravel) ────────────────────────────
const DAFTAR_TUGAS = [
  {
    id: 'SIGAP-001',
    judul: 'Kerusakan Drainase Jl. Sudirman',
    bidang: 'Sumber Daya Air',
    status: 'Menunggu',
    prioritas: 'Tinggi',
    tanggal: '12 Mei 2026',
  },
  {
    id: 'SIGAP-002',
    judul: 'Lubang Jalan Flyover Semanggi',
    bidang: 'Bina Marga',
    status: 'Diproses',
    prioritas: 'Tinggi',
    tanggal: '11 Mei 2026',
  },
  {
    id: 'SIGAP-003',
    judul: 'PJU Padam Kawasan Menteng',
    bidang: 'Cipta Karya',
    status: 'Diproses',
    prioritas: 'Sedang',
    tanggal: '10 Mei 2026',
  },
  {
    id: 'SIGAP-004',
    judul: 'Turap Sungai Retak di Kalideres',
    bidang: 'Sumber Daya Air',
    status: 'Selesai',
    prioritas: 'Tinggi',
    tanggal: '08 Mei 2026',
  },
];

const STATUS_COLOR = {
  Menunggu: { bg: '#FEF3C7', text: '#D97706' },
  Diproses: { bg: '#DBEAFE', text: '#2563EB' },
  Selesai:  { bg: '#D1FAE5', text: '#059669' },
  Ditolak:  { bg: '#FEE2E2', text: '#DC2626' },
};

const PRIORITAS_COLOR = {
  Tinggi: '#EF4444',
  Sedang: '#F59E0B',
  Rendah: '#10B981',
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function DashboardPegawai() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filters = ['Semua', 'Menunggu', 'Diproses', 'Selesai'];

  const filteredTugas =
    activeFilter === 'Semua'
      ? DAFTAR_TUGAS
      : DAFTAR_TUGAS.filter((t) => t.status === activeFilter);

  const stats = {
    total: DAFTAR_TUGAS.length,
    menunggu: DAFTAR_TUGAS.filter((t) => t.status === 'Menunggu').length,
    diproses: DAFTAR_TUGAS.filter((t) => t.status === 'Diproses').length,
    selesai: DAFTAR_TUGAS.filter((t) => t.status === 'Selesai').length,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F3B6D" />

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerGreeting}>Selamat datang,</Text>
          <Text style={styles.headerName}>{user?.name ?? 'Petugas PUPR'}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutIcon}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── STATS CARDS ────────────────────────────────────────────────── */}
        <View style={styles.statsRow}>
          <StatCard label="Total" value={stats.total} color="#1F3B6D" icon="clipboard-list" />
          <StatCard label="Menunggu" value={stats.menunggu} color="#D97706" icon="clock-outline" />
          <StatCard label="Diproses" value={stats.diproses} color="#2563EB" icon="progress-wrench" />
          <StatCard label="Selesai" value={stats.selesai} color="#059669" icon="check-circle-outline" />
        </View>

        {/* ── SECTION TITLE ───────────────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="format-list-checks" size={20} color="#1F3B6D" />
          <Text style={styles.sectionTitle}>Daftar Tugas Petugas PUPR</Text>
        </View>

        {/* ── FILTER CHIPS ────────────────────────────────────────────────── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterChipText, activeFilter === f && styles.filterChipTextActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── TUGAS LIST ──────────────────────────────────────────────────── */}
        {filteredTugas.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.tugasCard}
            onPress={() => router.push('/(pegawai)/laporan')}
            activeOpacity={0.85}
          >
            <View style={styles.tugasTop}>
              <View style={styles.idBadge}>
                <Text style={styles.idText}>{item.id}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: STATUS_COLOR[item.status]?.bg }]}>
                <Text style={[styles.statusText, { color: STATUS_COLOR[item.status]?.text }]}>
                  {item.status}
                </Text>
              </View>
            </View>

            <Text style={styles.tugasJudul} numberOfLines={2}>{item.judul}</Text>

            <View style={styles.tugasMeta}>
              <View style={styles.metaItem}>
                <MaterialCommunityIcons name="office-building-outline" size={13} color="#64748B" />
                <Text style={styles.metaText}>{item.bidang}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={13} color="#64748B" />
                <Text style={styles.metaText}>{item.tanggal}</Text>
              </View>
            </View>

            <View style={styles.tugasFooter}>
              <View style={[styles.prioritasDot, { backgroundColor: PRIORITAS_COLOR[item.prioritas] }]} />
              <Text style={styles.prioritasText}>Prioritas {item.prioritas}</Text>
              <Text style={styles.detailLink}>Lihat Detail →</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── SUB-COMPONENT: Stat Card ─────────────────────────────────────────────────
const StatCard = ({ label, value, color, icon }) => (
  <View style={[styles.statCard, { borderTopColor: color }]}>
    <MaterialCommunityIcons name={icon} size={20} color={color} />
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },

  header: {
    backgroundColor: '#1F3B6D',
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerGreeting: { color: '#A0BFE0', fontSize: 12 },
  headerName: { color: '#fff', fontWeight: 'bold', fontSize: 18, marginTop: 2 },
  logoutIcon: { padding: 6 },

  scroll: { padding: 16, paddingBottom: 100 },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderTopWidth: 3,
    elevation: 2,
  },
  statValue: { fontSize: 20, fontWeight: 'bold', marginTop: 6 },
  statLabel: { fontSize: 9, color: '#64748B', marginTop: 2, fontWeight: '600' },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#1F3B6D', marginLeft: 8 },

  filterRow: { marginBottom: 16 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    marginRight: 8,
  },
  filterChipActive: { backgroundColor: '#1F3B6D' },
  filterChipText: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  filterChipTextActive: { color: '#fff' },

  tugasCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  tugasTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  idBadge: { backgroundColor: '#EFF6FF', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  idText: { fontSize: 10, color: '#2563EB', fontWeight: '700' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 10, fontWeight: '700' },

  tugasJudul: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', marginBottom: 10, lineHeight: 20 },

  tugasMeta: { flexDirection: 'row', gap: 16, marginBottom: 10 },
  metaItem: { flexDirection: 'row', alignItems: 'center' },
  metaText: { fontSize: 11, color: '#64748B', marginLeft: 4 },

  tugasFooter: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 8 },
  prioritasDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  prioritasText: { fontSize: 11, color: '#64748B', flex: 1 },
  detailLink: { fontSize: 11, color: '#1F3B6D', fontWeight: '700' },
});
