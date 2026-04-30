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

interface FAQItem {
  id: string;
  title: string;
  content: string;
}

const BantuanScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const popularTopics = [
    { id: 1, title: 'Cara Melaporkan Masalah', icon: 'document-text-outline' },
    { id: 2, title: 'Cek Status Laporan', icon: 'eye-outline' },
    { id: 3, title: 'Ubah Data Profil', icon: 'person-outline' },
  ];

  const faqItems: FAQItem[] = [
    {
      id: '1',
      title: 'Bagaimana cara membuat laporan?',
      content: 'Untuk membuat laporan, klik tombol "Laporkan Masalah" di halaman beranda, isi deskripsi, unggah foto, pilih lokasi, kemudian submit.',
    },
    {
      id: '2',
      title: 'Berapa lama waktu proses laporan?',
      content: 'Waktu proses tergantung jenis kerusakan. Rata-rata 7-14 hari untuk verifikasi dan tindakan. Anda dapat melihat progress di halaman riwayat laporan.',
    },
    {
      id: '3',
      title: 'Bagaimana jika lokasi tidak akurat?',
      content: 'Jika lokasi tidak akurat, Anda bisa mengedit laporan atau hubungi admin melalui WhatsApp di menu Profil > Hubungi Kami.',
    },
    {
      id: '4',
      title: 'Apakah data saya aman?',
      content: 'Ya, semua data Anda dienkripsi dan hanya digunakan untuk proses laporan. Kami menjaga privasi Anda sesuai dengan kebijakan privasi kami.',
    },
    {
      id: '5',
      title: 'Bagaimana cara menghubungi support?',
      content: 'Anda dapat menghubungi kami melalui WhatsApp di menu Profil, atau mengirim email ke support@pupr.go.id',
    },
  ];

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bantuan</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
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

        {/* Popular Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Topik Populer</Text>
          <View style={styles.topicGrid}>
            {popularTopics.map((topic) => (
              <TouchableOpacity key={topic.id} style={styles.topicCard} activeOpacity={0.7}>
                <View style={styles.topicIconContainer}>
                  <Ionicons name={topic.icon as any} size={32} color="#2C3E50" />
                </View>
                <Text style={styles.topicTitle}>{topic.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
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
                  activeOpacity={0.7}
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

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Masih Butuh Bantuan?</Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => alert('Membuka WhatsApp Admin...')}
          >
            <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
            <View style={styles.contactButtonContent}>
              <Text style={styles.contactButtonTitle}>Chat dengan Admin</Text>
              <Text style={styles.contactButtonSubtitle}>Respons cepat dalam 1 jam kerja</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
          <Ionicons name="home-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RiwayatLaporan')}>
          <Ionicons name="list-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Laporan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Riwayat')}>
          <Ionicons name="time-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Riwayat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, styles.active]}>
          <Ionicons name="help-circle-outline" size={24} color="#2C3E50" />
          <Text style={[styles.navLabel, styles.activeLabel]}>Bantuan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 45,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 13,
    color: '#333',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  topicGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  topicCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  topicIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  topicTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  faqContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  faqQuestion: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  faqQuestionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faqQuestionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  faqAnswer: {
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  faqAnswerText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  contactButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contactButtonContent: {
    flex: 1,
    marginHorizontal: 12,
  },
  contactButtonTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
  },
  contactButtonSubtitle: {
    fontSize: 11,
    color: '#999',
    marginTop: 3,
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

export default BantuanScreen;