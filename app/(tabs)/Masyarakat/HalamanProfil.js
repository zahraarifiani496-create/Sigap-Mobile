import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [showDropdown, setShowDropdown] = useState<{ [key: string]: boolean }>({
    password: false,
    laporan: false,
    lokasi: false,
  });

  const [formData, setFormData] = useState({
    nama: 'Nama Lengkap',
    phone: 'Nomor WhatsApp',
    email: 'Email',
  });

  const toggleDropdown = (key: string) => {
    setShowDropdown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <Image
            source={require('../assets/avatar.png')}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Foto Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#999" />
            <TextInput
              style={styles.input}
              placeholder="Nama Lengkap"
              placeholderTextColor="#999"
              value={formData.nama}
              onChangeText={(text) => setFormData({ ...formData, nama: text })}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={20} color="#999" />
            <TextInput
              style={styles.input}
              placeholder="Nomor WhatsApp"
              placeholderTextColor="#999"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="#999" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
            />
          </View>

          <TouchableOpacity
            style={styles.simpanButton}
            onPress={() => alert('Profil berhasil disimpan!')}
          >
            <Text style={styles.simpanButtonText}>Simpan Perubahan</Text>
          </TouchableOpacity>
        </View>

        {/* Dropdown Section */}
        <View style={styles.dropdownSection}>
          {/* Dropdown 1: Ganti Kata Sandi */}
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={() => toggleDropdown('password')}
          >
            <View style={styles.dropdownTitleContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#999" />
              <Text style={styles.dropdownTitle}>Ganti Kata Sandi</Text>
            </View>
            <Ionicons
              name={showDropdown.password ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#999"
            />
          </TouchableOpacity>
          {showDropdown.password && (
            <View style={styles.dropdownContent}>
              <Text style={styles.dropdownText}>Ubah kata sandi Anda dengan aman</Text>
              <TouchableOpacity style={styles.subButton}>
                <Text style={styles.subButtonText}>Ganti Sekarang</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Dropdown 2: Laporan Belum Diproses */}
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={() => toggleDropdown('laporan')}
          >
            <View style={styles.dropdownTitleContainer}>
              <Ionicons name="document-outline" size={20} color="#999" />
              <Text style={styles.dropdownTitle}>Laporan Belum Diproses</Text>
            </View>
            <Ionicons
              name={showDropdown.laporan ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#999"
            />
          </TouchableOpacity>
          {showDropdown.laporan && (
            <View style={styles.dropdownContent}>
              <Text style={styles.dropdownText}>Anda memiliki 2 laporan yang belum diproses</Text>
              <TouchableOpacity style={styles.subButton}>
                <Text style={styles.subButtonText}>Lihat Laporan</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Dropdown 3: Masalah Lokasi Peta */}
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={() => toggleDropdown('lokasi')}
          >
            <View style={styles.dropdownTitleContainer}>
              <Ionicons name="location-outline" size={20} color="#999" />
              <Text style={styles.dropdownTitle}>Masalah Lokasi Peta</Text>
            </View>
            <Ionicons
              name={showDropdown.lokasi ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#999"
            />
          </TouchableOpacity>
          {showDropdown.lokasi && (
            <View style={styles.dropdownContent}>
              <Text style={styles.dropdownText}>Jika mengalami masalah dengan lokasi peta, hubungi admin kami</Text>
              <TouchableOpacity style={styles.subButton}>
                <Text style={styles.subButtonText}>Hubungi Admin</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Hubungi Kami</Text>

          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => alert('Membuka WhatsApp Admin...')}
          >
            <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
            <View style={styles.helpButtonText}>
              <Text style={styles.helpButtonTitle}>Hubungi Admin</Text>
              <Text style={styles.helpButtonSubtitle}>Via WhatsApp</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => alert('Mengunduh form admin...')}
          >
            <Ionicons name="document-download-outline" size={24} color="#FF6B6B" />
            <View style={styles.helpButtonText}>
              <Text style={styles.helpButtonTitle}>Download Form Admin</Text>
              <Text style={styles.helpButtonSubtitle}>Panduan Lengkap</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
          <Text style={styles.logoutButtonText}>Keluar</Text>
        </TouchableOpacity>
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

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Bantuan')}>
          <Ionicons name="help-circle-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Bantuan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, styles.active]}>
          <Ionicons name="person-outline" size={24} color="#2C3E50" />
          <Text style={[styles.navLabel, styles.activeLabel]}>Profil</Text>
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#00BCD4',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2C3E50',
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2C3E50',
  },
  formSection: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 45,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 13,
    color: '#333',
  },
  simpanButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  simpanButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  dropdownSection: {
    marginBottom: 20,
  },
  dropdownHeader: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dropdownTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  dropdownContent: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    lineHeight: 18,
  },
  subButton: {
    backgroundColor: '#FFD700',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  subButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  helpSection: {
    marginBottom: 20,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  helpButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  helpButtonText: {
    flex: 1,
    marginHorizontal: 12,
  },
  helpButtonTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  helpButtonSubtitle: {
    fontSize: 11,
    color: '#999',
    marginTop: 3,
  },
  logoutButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
    marginLeft: 8,
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

export default ProfileScreen;