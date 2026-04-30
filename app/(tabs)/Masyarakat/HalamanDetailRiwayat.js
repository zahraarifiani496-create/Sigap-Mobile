import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HalamanDetailRiwayat = ({ navigation, route }) => {
  const { report } = route.params || {};

  const reportDetails = {
    idLaporan: 'AM1223B8Ju',
    status: 'Selesai',
    jenisLaporan: report?.title || 'Jalan Retak',
    lokasi: report?.address || 'Jin.Praja RW36 RT23',
    fotoLaporan: [
      require('../../../assets/images/news.jpg'),
      require('../../../assets/images/orang.png'),
    ],
    deskripsi: 'Jalan mengalami kerusakan parah pada bagian bahu jalan terutama pada sisi sebelah timur. Kondisi ini sangat berbahaya bagi pengendara motor maupun mobil.',
    informasiLaporan: {
      tanggalLaporan: '27 Oktober 2026',
      perkiraaanSelesai: '10 Mei 2025',
      tanggalSelesai: '01 Mei 2025',
      durasiPengerjaan: '7 hari',
      statusBoleh: 'Boleh Penerangkan',
    },
    riwayatProgres: [
      { tanggal: '27 Oktober 2026, 14:30', status: 'Laporan diterima oleh admin' },
      { tanggal: '10 Mei 2025, 08:00', status: 'Laporan diverifikasi' },
      { tanggal: '15 Mei 2025, 09:30', status: 'Pekerjaan dimulai' },
      { tanggal: '01 Mei 2025, 16:30', status: 'Selesai' },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Riwayat Laporan</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID Laporan</Text>
            <Text style={styles.infoValue}>{reportDetails.idLaporan}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <View style={[styles.statusBadge, { backgroundColor: '#4CAF50' }]}>
              <Ionicons name="checkmark-circle" size={16} color="#fff" />
              <Text style={styles.statusBadgeText}>{reportDetails.status}</Text>
            </View>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Jenis Laporan</Text>
            <Text style={styles.infoValue}>{reportDetails.jenisLaporan}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Lokasi</Text>
            <Text style={styles.infoValue}>{reportDetails.lokasi}</Text>
          </View>
        </View>

        {/* Foto Laporan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Foto Laporan</Text>
          <View style={styles.photoGrid}>
            {reportDetails.fotoLaporan.map((foto, index) => (
              <Image key={index} source={foto} style={styles.photoItem} />
            ))}
          </View>
        </View>

        {/* Deskripsi */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deskripsi Laporan</Text>
          <Text style={styles.deskripsi}>{reportDetails.deskripsi}</Text>
        </View>

        {/* Informasi Laporan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informasi Laporan</Text>
          <View style={styles.detailBox}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tanggal Laporan</Text>
              <Text style={styles.detailValue}>
                {reportDetails.informasiLaporan.tanggalLaporan}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Target Selesai</Text>
              <Text style={styles.detailValue}>
                {reportDetails.informasiLaporan.perkiraaanSelesai}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tanggal Selesai</Text>
              <Text style={styles.detailValue}>
                {reportDetails.informasiLaporan.tanggalSelesai}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Durasi Pengerjaan</Text>
              <Text style={styles.detailValue}>
                {reportDetails.informasiLaporan.durasiPengerjaan}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status Boleh</Text>
              <Text style={styles.detailValue}>
                {reportDetails.informasiLaporan.statusBoleh}
              </Text>
            </View>
          </View>
        </View>

        {/* Riwayat Progres */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Riwayat Progres</Text>
          <View style={styles.timeline}>
            {reportDetails.riwayatProgres.map((item, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineMarker} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineDate}>{item.tanggal}</Text>
                  <Text style={styles.timelineStatus}>{item.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.laporButton}
            onPress={() => navigation.navigate('HalamanLapor')}
          >
            <Text style={styles.laporButtonText}>Laporan Ulang</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.kembaliButton}
            onPress={() => navigation.navigate('HalamanBeranda')}
          >
            <Text style={styles.kembaliButtonText}>Kembali Ke Beranda</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#2C3E50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  photoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  photoItem: {
    width: '48%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  deskripsi: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  detailBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  timeline: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  timelineMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    marginRight: 12,
    marginTop: 2,
  },
  timelineContent: {
    flex: 1,
  },
  timelineDate: {
    fontSize: 11,
    fontWeight: '700',
    color: '#333',
  },
  timelineStatus: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  buttonContainer: {
    gap: 10,
    marginBottom: 30,
  },
  laporButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  laporButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  kembaliButton: {
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  kembaliButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});

export default HalamanDetailRiwayat;