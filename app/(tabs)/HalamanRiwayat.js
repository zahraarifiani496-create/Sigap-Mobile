import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HalamanRiwayat = ({ navigation }) => {
  const [reports, setReports] = useState([
    {
      id: 'z10Fa',
      title: 'Jalan Berlubang',
      address: 'Jin Tuhur RW 16 RT8',
      status: 'Diproses',
      statusColor: '#FF9800',
    },
    {
      id: '55IKL',
      title: 'Drainase tersumbat',
      address: 'Jin.Cibogo RW7 RT1',
      status: 'Diproses',
      statusColor: '#FF9800',
    },
    {
      id: 'p27Hf',
      title: 'Jembatan Retak',
      address: 'Jin Praja RW 8 RT 23',
      status: 'Selesai',
      statusColor: '#4CAF50',
    },
    {
      id: '1239gT',
      title: 'Drainase tersumbat',
      address: 'Jin.Rawa Badak RW 17 RT9',
      status: 'Selesai',
      statusColor: '#4CAF50',
    },
  ]);

  const renderReportCard = (report) => (
    <TouchableOpacity
      key={report.id}
      style={[styles.reportCard, { borderLeftColor: report.statusColor }]}
      onPress={() => navigation.navigate('HalamanDetailRiwayat', { report })}
      activeOpacity={0.7}
    >
      <View style={styles.reportHeader}>
        <Text style={styles.reportId}>ID : {report.id}</Text>
      </View>

      <Text style={styles.reportTitle}>{report.title}</Text>
      <Text style={styles.reportAddress}>{report.address}</Text>

      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, { color: report.statusColor }]}>
          Status : {report.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Riwayat Laporan Saya</Text>
      </View>

      {/* Reports List */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.reportsList}>
          {reports.map((report) => renderReportCard(report))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HalamanBeranda')}>
          <Ionicons name="home-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, styles.active]}>
          <Ionicons name="list-outline" size={24} color="#2C3E50" />
          <Text style={[styles.navLabel, styles.activeLabel]}>Laporan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HalamanRiwayat')}>
          <Ionicons name="time-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Riwayat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HalamanBantuan')}>
          <Ionicons name="help-circle-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Bantuan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HalamanProfil')}>
          <Ionicons name="person-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Profil</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 15,
    paddingHorizontal: 20,
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
  reportsList: {
    marginBottom: 20,
  },
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  reportHeader: {
    marginBottom: 8,
  },
  reportId: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFD700',
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  reportAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  active: {
    borderBottomWidth: 3,
    borderBottomColor: '#2C3E50',
  },
  navLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    fontWeight: '500',
  },
  activeLabel: {
    color: '#2C3E50',
    fontWeight: '700',
  },
});

export default HalamanRiwayat;