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
  const [showDropdown, setShowDropdown] = useState({
    password: false,
    laporan: false,
    lokasi: false,
  });

  const [formData, setFormData] = useState({
    nama: 'Nama Lengkap',
    phone: 'Nomor WhatsApp',
    email: 'Email',
  });

  // ✅ FIX (hapus :string)
  const toggleDropdown = (key) => {
    setShowDropdown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* AVATAR */}
        <View style={styles.avatarSection}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} 
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Foto Profile</Text>
          </TouchableOpacity>
        </View>

        {/* FORM */}
        <View style={styles.formSection}>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#999" />
            <TextInput
              style={styles.input}
              value={formData.nama}
              onChangeText={(text) => setFormData({ ...formData, nama: text })}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={20} color="#999" />
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="#999" />
            <TextInput
              style={styles.input}
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

        {/* DROPDOWN */}
        <View style={styles.dropdownSection}>
          
          {/* PASSWORD */}
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
              <Text style={styles.dropdownText}>Ubah kata sandi Anda</Text>
              <TouchableOpacity style={styles.subButton}>
                <Text style={styles.subButtonText}>Ganti Sekarang</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* LAPORAN */}
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
              <Text style={styles.dropdownText}>Ada laporan yang belum diproses</Text>
              <TouchableOpacity style={styles.subButton}>
                <Text style={styles.subButtonText}>Lihat Laporan</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* LOKASI */}
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={() => toggleDropdown('lokasi')}
          >
            <View style={styles.dropdownTitleContainer}>
              <Ionicons name="location-outline" size={20} color="#999" />
              <Text style={styles.dropdownTitle}>Masalah Lokasi</Text>
            </View>
            <Ionicons
              name={showDropdown.lokasi ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#999"
            />
          </TouchableOpacity>

          {showDropdown.lokasi && (
            <View style={styles.dropdownContent}>
              <Text style={styles.dropdownText}>Hubungi admin jika lokasi error</Text>
              <TouchableOpacity style={styles.subButton}>
                <Text style={styles.subButtonText}>Hubungi Admin</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* HELP */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Hubungi Kami</Text>

          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => alert('WhatsApp Admin')}
          >
            <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
            <View style={styles.helpButtonText}>
              <Text style={styles.helpButtonTitle}>Hubungi Admin</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
          <Text style={styles.logoutButtonText}>Keluar</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* BOTTOM NAV */}
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
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: '#2C3E50', padding: 15 },
  headerTitle: { color: '#fff', fontWeight: '700', fontSize: 18 },

  scrollContainer: { padding: 15 },

  avatarSection: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  editButton: { borderWidth: 1, borderColor: '#2C3E50', padding: 8, borderRadius: 20 },
  editButtonText: { fontSize: 12 },

  inputWrapper: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 8 },
  input: { flex: 1, marginLeft: 10 },

  simpanButton: { backgroundColor: '#FFD700', padding: 12, borderRadius: 8, alignItems: 'center' },
  simpanButtonText: { color: '#fff', fontWeight: '700' },

  dropdownHeader: { backgroundColor: '#fff', padding: 12, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' },
  dropdownTitleContainer: { flexDirection: 'row', alignItems: 'center' },
  dropdownTitle: { marginLeft: 10 },
  dropdownContent: { backgroundColor: '#fff', padding: 10 },

  helpSection: { marginTop: 20 },
  helpButton: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', marginTop: 10 },

  logoutButton: { marginTop: 20, alignItems: 'center' },

  bottomNav: { flexDirection: 'row', backgroundColor: '#fff' },
  navItem: { flex: 1, alignItems: 'center', padding: 10 },
  navLabel: { fontSize: 10 },
  active: { borderBottomWidth: 2 },
  activeLabel: { color: '#2C3E50' },
});

export default ProfileScreen;