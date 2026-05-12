import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  StyleSheet, 
  Image, 
  Dimensions 
} from 'react-native';
import { 
  Ionicons, 
  MaterialIcons, 
  FontAwesome5, 
  MaterialCommunityIcons 
} from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Tambahkan destructuring { navigation } pada props
export default function HalamanDetailRiwayat({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          {/* Tambahkan fungsi back */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Detail Laporan</Text>
        </View>
        <View style={styles.appBarRight}>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Ionicons name="share-social-outline" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Status & ID Header */}
        <View style={styles.headerCards}>
          <View style={styles.statusMainCard}>
            <View style={styles.checkIconCircle}>
                <MaterialIcons name="check-circle" size={40} color="#3B466D" />
            </View>
            <View style={styles.statusContent}>
              <View style={styles.badgeSelesai}>
                <Text style={styles.badgeText}>Selesai Dikerjakan</Text>
              </View>
              <Text style={styles.statusTitle}>Perbaikan Drainase Jalan Protokol</Text>
              <Text style={styles.statusDesc}>Laporan Anda telah berhasil diverifikasi dan diselesaikan oleh tim teknis PUPR.</Text>
            </View>
          </View>

          <View style={styles.idCard}>
            <Text style={styles.idLabel}>ID LAPORAN</Text>
            <Text style={styles.idValue}>#PU-2024-8872</Text>
            <Text style={[styles.idLabel, { marginTop: 10 }]}>KATEGORI</Text>
            <View style={styles.categoryRow}>
              <Ionicons name="home" size={14} color="#3B466D" />
              <Text style={styles.categoryText}>Infrastruktur Air & Drainase</Text>
            </View>
          </View>
        </View>

        {/* Dokumentasi */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <MaterialIcons name="photo-library" size={18} color="#3B466D" />
            <Text style={styles.sectionTitle}>Dokumentasi</Text>
          </View>
          <Text style={styles.photoCount}>4 Foto Terlampir</Text>
        </View>

        <View style={styles.imageGrid}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.mainImage} />
          <View style={styles.sideImages}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.subImage} />
            <View style={styles.moreImageContainer}>
              <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.subImage} />
              <View style={styles.imageOverlay}>
                <Text style={styles.overlayText}>+1</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Detail Informasi */}
        <View style={styles.infoCard}>
          <View style={styles.infoTitleRow}>
            <Ionicons name="information-circle-outline" size={18} color="#2563EB" />
            <Text style={styles.infoTitle}>Detail Informasi</Text>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>LOKASI KEJADIAN</Text>
              <Text style={styles.infoValue}>Jl. Sudirman No. 45, Kebayoran Baru, Jakarta Selatan</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>WAKTU PELAPORAN</Text>
              <Text style={styles.infoValue}>12 Mei 2024, 09:15 WIB</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>PELAPOR</Text>
              <Text style={styles.infoValue}>Aditya Pratama</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>PRIORITAS</Text>
              <View style={styles.priorityRow}>
                <View style={[styles.dot, { backgroundColor: 'red' }]} />
                <Text style={styles.infoValue}>Tinggi</Text>
              </View>
            </View>
          </View>

          <Text style={[styles.infoLabel, { marginTop: 15 }]}>DESKRIPSI MASALAH</Text>
          <Text style={styles.descriptionText}>
            Saluran drainase tersumbat total akibat tumpukan sedimen dan material sisa konstruksi, menyebabkan genangan setinggi 30cm setiap kali hujan deras.
          </Text>
        </View>

        {/* Aktivitas Laporan (Timeline) */}
        <View style={styles.timelineSection}>
           <View style={styles.sectionTitleRow}>
            <MaterialCommunityIcons name="chart-timeline-variant" size={18} color="#2563EB" />
            <Text style={styles.sectionTitleBlue}>Aktivitas Laporan</Text>
          </View>

          {/* Timeline Item 1 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <View style={[styles.timelineIcon, { backgroundColor: '#3B466D' }]}>
                <Ionicons name="checkmark" size={14} color="white" />
              </View>
              <View style={styles.timelineLine} />
            </View>
            <View style={styles.timelineRight}>
              <View style={styles.timelineContentCard}>
                <View style={styles.timelineHeader}>
                  <Text style={styles.timelineStatus}>Laporan Selesai</Text>
                  <Text style={styles.timelineDate}>24 Mei, 14:00</Text>
                </View>
                <Text style={styles.timelineDesc}>Pekerjaan pembersihan drainase telah selesai dilakukan.</Text>
                <TouchableOpacity style={styles.ratingButton}>
                  <Ionicons name="chatbubble-outline" size={14} color="#2563EB" />
                  <Text style={styles.ratingText}>Beri penilaian untuk pelayanan ini</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Map Preview */}
          <View style={styles.mapContainer}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/400x150' }} 
              style={styles.mapImage} 
            />
            <View style={styles.mapOverlay}>
              <Ionicons name="location" size={20} color="white" />
              <Text style={styles.mapOverlayText}>Titik Koordinat Terverifikasi</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomActions}>
        {/* Tombol diganti menjadi Kembali ke Dashboard */}
        <TouchableOpacity 
          style={styles.btnSecondary} 
          onPress={() => navigation.navigate('/HalamanBeranda')} // Pastikan nama route sesuai dengan di App.js anda
        >
          <Text style={styles.btnTextSecondary}>Kembali ke Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.btnPrimary}>
          <Text style={styles.btnTextPrimary}>Hubungi Petugas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  appBar: { 
    backgroundColor: '#3B466D', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingTop: 45, 
    paddingBottom: 15 
  },
  appBarLeft: { flexDirection: 'row', alignItems: 'center' },
  appBarTitle: { color: 'white', fontWeight: 'bold', marginLeft: 15, fontSize: 16 },
  appBarRight: { flexDirection: 'row' },
  scrollContent: { padding: 16, paddingBottom: 100 },
  
  headerCards: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statusMainCard: { backgroundColor: 'white', width: '65%', borderRadius: 16, padding: 12, flexDirection: 'row', elevation: 2 },
  checkIconCircle: { marginRight: 10, justifyContent: 'center' },
  statusContent: { flex: 1 },
  badgeSelesai: { backgroundColor: '#DBEAFE', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginBottom: 5 },
  badgeText: { color: '#2563EB', fontSize: 10, fontWeight: 'bold' },
  statusTitle: { fontWeight: 'bold', fontSize: 12, color: '#1E293B' },
  statusDesc: { fontSize: 9, color: '#64748B', marginTop: 2 },
  
  idCard: { backgroundColor: '#FBBF24', width: '32%', borderRadius: 16, padding: 12, elevation: 2 },
  idLabel: { fontSize: 8, fontWeight: 'bold', color: '#B45309' },
  idValue: { fontSize: 10, fontWeight: 'bold', color: 'white', marginTop: 2 },
  categoryRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  categoryText: { fontSize: 8, color: '#3B466D', marginLeft: 4, fontWeight: '600' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center' },
  sectionTitle: { marginLeft: 6, fontWeight: 'bold', color: '#3B466D', fontSize: 13 },
  photoCount: { fontSize: 10, color: '#94A3B8' },

  imageGrid: { flexDirection: 'row', height: 200, marginBottom: 20 },
  mainImage: { flex: 1, borderRadius: 12, marginRight: 8 },
  sideImages: { flex: 1 },
  subImage: { flex: 1, borderRadius: 12, marginBottom: 8 },
  moreImageContainer: { flex: 1, position: 'relative' },
  imageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  overlayText: { color: 'white', fontWeight: 'bold', fontSize: 18 },

  infoCard: { backgroundColor: 'white', borderRadius: 16, padding: 16, elevation: 2, marginBottom: 20 },
  infoTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  infoTitle: { color: '#2563EB', fontWeight: 'bold', marginLeft: 8 },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  infoItem: { width: '50%', marginBottom: 12 },
  infoLabel: { fontSize: 9, fontWeight: 'bold', color: '#94A3B8', marginBottom: 4 },
  infoValue: { fontSize: 11, fontWeight: 'bold', color: '#1E293B' },
  priorityRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  descriptionText: { fontSize: 11, color: '#64748B', lineHeight: 16, marginTop: 5 },

  timelineSection: { marginTop: 10 },
  sectionTitleBlue: { marginLeft: 6, fontWeight: 'bold', color: '#2563EB', fontSize: 13 },
  timelineItem: { flexDirection: 'row', marginTop: 15 },
  timelineLeft: { alignItems: 'center', width: 30 },
  timelineIcon: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  timelineLine: { width: 2, flex: 1, backgroundColor: '#E2E8F0', marginTop: -5 },
  timelineRight: { flex: 1, paddingBottom: 20 },
  timelineContentCard: { backgroundColor: 'white', padding: 12, borderRadius: 12, borderLeftWidth: 3, borderLeftColor: '#3B466D' },
  timelineHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  timelineStatus: { fontWeight: 'bold', fontSize: 12, color: '#2563EB' },
  timelineDate: { fontSize: 10, color: '#94A3B8' },
  timelineDesc: { fontSize: 11, color: '#64748B' },
  ratingButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFF6FF', padding: 8, borderRadius: 8, marginTop: 10 },
  ratingText: { fontSize: 10, color: '#2563EB', marginLeft: 6, fontWeight: '600' },

  mapContainer: { borderRadius: 16, overflow: 'hidden', height: 120, marginTop: 10 },
  mapImage: { width: '100%', height: '100%' },
  mapOverlay: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(59, 70, 109, 0.8)', flexDirection: 'row', alignItems: 'center', padding: 6, borderRadius: 20 },
  mapOverlayText: { color: 'white', fontSize: 10, fontWeight: 'bold', marginLeft: 5 },

  bottomActions: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: 'white', 
    flexDirection: 'row', 
    padding: 16, 
    borderTopWidth: 1, 
    borderTopColor: '#F1F5F9' 
  },
  btnSecondary: { flex: 1, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 12, backgroundColor: '#3B466D', marginRight: 10 },
  btnPrimary: { flex: 1, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 12, backgroundColor: '#FBBF24' },
  btnTextSecondary: { color: 'white', fontWeight: 'bold', fontSize: 12, textAlign: 'center' },
  btnTextPrimary: { color: '#3B466D', fontWeight: 'bold' }
});