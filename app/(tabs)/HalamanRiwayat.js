import React, { useState } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, SafeAreaView, 
  StyleSheet, Dimensions, Modal, FlatList 
} from 'react-native';
import { 
  Ionicons, 
  Octicons,
  AntDesign 
} from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Data Dummy Laporan
const DATA_LAPORAN = [
  { id: "#REP-2024-0812", status: "Diproses", title: "Perbaikan Drainase Jalan Gatot Subroto", location: "Jl. Jend. Gatot Subroto No.Kav. 52, Kuningan Barat", date: "12 Okt 2023" },
  { id: "#REP-2024-0745", status: "Selesai", title: "Lubang Jalan Berbahaya di Flyover Roxy", location: "Jl. Kyai Tapa, Grogol petamburan, Jakarta Barat", date: "28 Sep 2023" },
  { id: "#REP-2024-0722", status: "Diproses", title: "Penerangan Jalan Umum Padam", location: "Jl. Benyamin Suaeb, Pademangan Timur", date: "15 Sep 2023" },
  { id: "#REP-2024-0655", status: "Ditunda", title: "Penumpukan Sampah di Saluran Air", location: "Jl. Palmerah Barat, Kebayoran Lama", date: "22 Agu 2023" },
  { id: "#REP-2024-0511", status: "Selesai", title: "Jembatan Penyeberangan Rusak", location: "Sudirman, Jakarta Pusat", date: "01 Agu 2023" },
];

const ReportCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardHeader}>
      <View style={styles.idBadge}>
        <Text style={styles.idText}>{item.id}</Text>
      </View>
      <View style={styles.statusContainer}>
        <View style={[styles.dot, { 
          backgroundColor: item.status === 'Selesai' ? '#22C55E' : item.status === 'Diproses' ? '#F97316' : '#EF4444' 
        }]} />
        <Text style={[styles.statusText, { 
          color: item.status === 'Selesai' ? '#22C55E' : item.status === 'Diproses' ? '#F97316' : '#EF4444' 
        }]}>{item.status}</Text>
      </View>
    </View>
    
    <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
    
    <View style={styles.locationContainer}>
      <Ionicons name="location-outline" size={12} color="#94A3B8" />
      <Text style={styles.locationText} numberOfLines={2}>{item.location}</Text>
    </View>

    <View style={styles.cardFooter}>
      <View style={styles.dateContainer}>
        <Ionicons name="calendar-outline" size={12} color="#94A3B8" />
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View style={styles.detailBtn}>
        <Text style={styles.detailText}>Detail</Text>
        <AntDesign name="arrowright" size={12} color="#2563EB" />
      </View>
    </View>
  </TouchableOpacity>
);

export default function HalamanRiwayat({ navigation }) {
  const [filter, setFilter] = useState('Semua');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Logika Filter
  const filteredData = filter === 'Semua' 
    ? DATA_LAPORAN 
    : DATA_LAPORAN.filter(item => item.status === filter);

  const renderFilterOption = (status) => (
    <TouchableOpacity 
      style={styles.filterOption} 
      onPress={() => { setFilter(status); setModalVisible(false); }}
    >
      <Text style={[styles.filterOptionText, filter === status && { color: '#2563EB', fontWeight: 'bold' }]}>{status}</Text>
      {filter === status && <Ionicons name="checkmark" size={18} color="#2563EB" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar Atas */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>SIGAP PUPR</Text>
        <Ionicons name="notifications-outline" size={20} color="white" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header & Tombol Filter */}
        <View style={styles.headerSection}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={styles.title}>Riwayat Laporan</Text>
            <Text style={styles.subtitle}>Pantau laporan infrastruktur Anda secara real-time.</Text>
          </View>
          <TouchableOpacity style={styles.filterBtn} onPress={() => setModalVisible(true)}>
            <Octicons name="sliders" size={14} color="#475569" />
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        </View>

        {/* Grid Laporan */}
        <View style={styles.grid}>
          {filteredData.map((item, index) => (
            <ReportCard 
              key={index} 
              item={item} 
              onPress={() => navigation.navigate('/HalamanDetailRiwayat', { data: item })}
            />
          ))}

          {/* Box Ringkasan */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Ringkasan</Text>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Selesai</Text>
              <Text style={styles.summaryValue}>24</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Proses</Text>
              <Text style={styles.summaryValue}>12</Text>
            </View>
            <View style={[styles.summaryItem, styles.summaryActive]}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryValue}>36</Text>
            </View>
          </View>
        </View>

        {/* Pagination */}
        <View style={styles.pagination}>
          <TouchableOpacity onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))}>
            <Ionicons name="chevron-back" size={16} color="#94A3B8" />
          </TouchableOpacity>
          {[1, 2, 3].map(page => (
            <TouchableOpacity 
              key={page} 
              style={[styles.pageBtn, currentPage === page && styles.pageActive]}
              onPress={() => setCurrentPage(page)}
            >
              <Text style={currentPage === page ? styles.pageTextActive : styles.pageText}>{page}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setCurrentPage(prev => prev + 1)}>
            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Filter Status */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pilih Status</Text>
            {renderFilterOption('Semua')}
            {renderFilterOption('Selesai')}
            {renderFilterOption('Diproses')}
            {renderFilterOption('Ditunda')}
            <TouchableOpacity style={styles.closeModal} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Navigasi Bar Bawah (Custom Bottom Tab Bar) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={22} color="#94A3B8" />
          <Text style={styles.navLabel}>Beranda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="document-text" size={22} color="#2563EB" />
          <Text style={[styles.navLabel, {color: '#2563EB'}]}>Riwayat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.addBtn}>
            <Ionicons name="add" size={30} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="stats-chart-outline" size={22} color="#94A3B8" />
          <Text style={styles.navLabel}>Statistik</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={22} color="#94A3B8" />
          <Text style={styles.navLabel}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  navbar: { backgroundColor: '#3B466D', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 45 },
  navTitle: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  scrollContent: { padding: 16, paddingBottom: 100 },
  headerSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  subtitle: { fontSize: 12, color: '#64748B', marginTop: 4 },
  filterBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  filterText: { fontSize: 12, marginLeft: 6, fontWeight: '600', color: '#1E293B' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { backgroundColor: 'white', width: '48%', borderRadius: 16, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#F1F5F9', elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  idBadge: { backgroundColor: '#EFF6FF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  idText: { fontSize: 9, color: '#3B82F6', fontWeight: '700' },
  statusContainer: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 4 },
  statusText: { fontSize: 9, fontWeight: '700' },
  cardTitle: { fontSize: 13, fontWeight: 'bold', color: '#1E293B', marginBottom: 8, height: 38 },
  locationContainer: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15 },
  locationText: { fontSize: 9, color: '#64748B', marginLeft: 4, flex: 1 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F8FAFC', paddingTop: 10 },
  dateContainer: { flexDirection: 'row', alignItems: 'center' },
  dateText: { fontSize: 9, color: '#94A3B8', marginLeft: 4 },
  detailBtn: { flexDirection: 'row', alignItems: 'center' },
  detailText: { fontSize: 10, color: '#2563EB', fontWeight: 'bold', marginRight: 4 },
  summaryCard: { backgroundColor: '#3B466D', width: '48%', borderRadius: 16, padding: 12, marginBottom: 16 },
  summaryTitle: { color: 'white', fontWeight: 'bold', fontSize: 14, marginBottom: 10 },
  summaryItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.1)', padding: 8, borderRadius: 8, marginBottom: 5 },
  summaryActive: { backgroundColor: 'rgba(255,255,255,0.2)' },
  summaryLabel: { color: 'white', fontSize: 10 },
  summaryValue: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  pageBtn: { width: 30, height: 30, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 },
  pageActive: { backgroundColor: '#EAB308', borderRadius: 8 },
  pageTextActive: { color: 'white', fontWeight: 'bold' },
  pageText: { color: '#64748B' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: 'white', borderRadius: 16, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  filterOption: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  filterOptionText: { fontSize: 14, color: '#475569' },
  closeModal: { marginTop: 15, padding: 10, alignItems: 'center' },
  closeModalText: { color: '#EF4444', fontWeight: 'bold' },
  bottomNav: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    paddingVertical: 10, 
    borderTopWidth: 1, 
    borderTopColor: '#E2E8F0',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navLabel: { fontSize: 10, color: '#94A3B8', marginTop: 4 },
  addBtn: { 
    backgroundColor: '#3B466D', 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: -30,
    elevation: 5
  }
});