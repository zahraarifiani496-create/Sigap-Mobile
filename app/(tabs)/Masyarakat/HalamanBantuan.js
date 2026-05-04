import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BantuanScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const popularTopics = [
    { id: 1, title: 'Cara Melaporkan Masalah', icon: 'document-text-outline' },
    { id: 2, title: 'Cek Status Laporan', icon: 'eye-outline' },
    { id: 3, title: 'Ubah Data Profil', icon: 'person-outline' },
  ];

  const faqItems = [
    {
      id: '1',
      title: 'Bagaimana cara membuat laporan?',
      content:
        'Untuk membuat laporan, klik tombol "Laporkan Masalah" di halaman beranda, isi deskripsi, unggah foto, pilih lokasi, kemudian submit.',
    },
    {
      id: '2',
      title: 'Berapa lama waktu proses laporan?',
      content:
        'Waktu proses tergantung jenis kerusakan. Rata-rata 7-14 hari untuk verifikasi dan tindakan. Anda dapat melihat progress di halaman riwayat laporan.',
    },
    {
      id: '3',
      title: 'Bagaimana jika lokasi tidak akurat?',
      content:
        'Jika lokasi tidak akurat, Anda bisa mengedit laporan atau hubungi admin melalui WhatsApp di menu Profil > Hubungi Kami.',
    },
    {
      id: '4',
      title: 'Apakah data saya aman?',
      content:
        'Ya, semua data Anda dienkripsi dan hanya digunakan untuk proses laporan. Kami menjaga privasi Anda sesuai dengan kebijakan privasi kami.',
    },
    {
      id: '5',
      title: 'Bagaimana cara menghubungi support?',
      content:
        'Anda dapat menghubungi kami melalui WhatsApp di menu Profil, atau mengirim email ke support@pupr.go.id',
    },
  ];

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bantuan</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari bantuan atau topik..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Topik */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Topik Populer</Text>
          <View style={styles.topicGrid}>
            {popularTopics.map((topic) => (
              <TouchableOpacity key={topic.id} style={styles.topicCard}>
                <View style={styles.topicIconContainer}>
                  <Ionicons name={topic.icon} size={32} color="#2C3E50" />
                </View>
                <Text style={styles.topicTitle}>{topic.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <View style={styles.faqHeader}>
            <Ionicons name="help-circle-outline" size={24} color="#2C3E50" />
            <Text style={styles.sectionTitle}>Masalah Umum</Text>
          </View>

          <View style={styles.faqContainer}>
            {faqItems.map((item) => (
              <View key={item.id} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqQuestion}
                  onPress={() => toggleFAQ(item.id)}
                >
                  <View style={styles.faqQuestionContent}>
                    <Ionicons
                      name={expandedFAQ === item.id ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color="#2C3E50"
                    />
                    <Text style={styles.faqQuestionText}>{item.title}</Text>
                  </View>
                </TouchableOpacity>

                {expandedFAQ === item.id && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.faqAnswerText}>{item.content}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Kontak */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Masih Butuh Bantuan?</Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => alert('Membuka WhatsApp Admin...')}
          >
            <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
            <View style={styles.contactButtonContent}>
              <Text style={styles.contactButtonTitle}>Chat dengan Admin</Text>
              <Text style={styles.contactButtonSubtitle}>
                Respons cepat dalam 1 jam kerja
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RiwayatLaporan')} style={styles.navItem}>
          <Ionicons name="list-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Laporan</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Riwayat')} style={styles.navItem}>
          <Ionicons name="time-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Riwayat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, styles.active]}>
          <Ionicons name="help-circle-outline" size={24} color="#2C3E50" />
          <Text style={[styles.navLabel, styles.activeLabel]}>Bantuan</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: '#2C3E50', padding: 15 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },

  scrollContainer: { padding: 15 },

  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: { flex: 1, marginLeft: 10 },

  section: { marginBottom: 20 },
  sectionTitle: { fontWeight: '700', marginBottom: 10 },

  topicGrid: { flexDirection: 'row', gap: 10 },
  topicCard: { flex: 1, backgroundColor: '#fff', padding: 10, borderRadius: 10, alignItems: 'center' },
  topicIconContainer: { marginBottom: 5 },
  topicTitle: { fontSize: 11, textAlign: 'center' },

  faqContainer: { backgroundColor: '#fff', borderRadius: 8 },
  faqItem: { borderBottomWidth: 1, borderColor: '#eee' },
  faqQuestion: { padding: 10 },
  faqQuestionContent: { flexDirection: 'row', alignItems: 'center' },
  faqQuestionText: { marginLeft: 10, flex: 1 },
  faqAnswer: { padding: 10, backgroundColor: '#f9f9f9' },

  contactButton: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', borderRadius: 8 },
  contactButtonContent: { marginLeft: 10, flex: 1 },

  bottomNav: { flexDirection: 'row', backgroundColor: '#fff' },
  navItem: { flex: 1, alignItems: 'center', padding: 10 },
  navLabel: { fontSize: 10 },
  active: { borderBottomWidth: 2, borderColor: '#2C3E50' },
  activeLabel: { color: '#2C3E50' },
});

export default BantuanScreen;