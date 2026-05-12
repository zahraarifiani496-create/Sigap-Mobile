import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as Linking from 'expo-linking';

// Conditional Maps import (mobile only)
let MapView, Marker;
if (Platform.OS !== 'web') {
  try {
    MapView = require('react-native-maps').default;
    Marker = require('react-native-maps').Marker;
  } catch (e) {
    console.warn('Maps not available');
  }
}

const { width } = Dimensions.get('window');

const HalamanKirimLaporan = () => {
  const router = useRouter();
  const mapRef = useRef(null);

  // State Management
  const [activeTab, setActiveTab] = useState(1);
  const [deskripsi, setDeskripsi] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: -6.2088,
    longitude: 106.8210,
    address: 'Jl. Pattimura No. 20, Kebayoran Baru',
    city: 'Jakarta Selatan, DKI Jakarta 12110',
  });
  const [loading, setLoading] = useState(false);

  // --- HANDLERS ---

  const openGoogleMaps = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${selectedLocation.latitude},${selectedLocation.longitude}`;
    const label = 'Lokasi Kejadian';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Tidak dapat membuka Google Maps');
    });
  };

  const handlePickImage = async (useCamera = false) => {
    if (mediaFiles.length >= 3) {
      Alert.alert('Info', 'Maksimal 3 foto saja');
      return;
    }

    const permissionResult = useCamera 
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Izin Ditolak', `Aplikasi butuh akses ${useCamera ? 'kamera' : 'galeri'} Anda.`);
      return;
    }

    const result = useCamera
      ? await ImagePicker.launchCameraAsync({ 
          quality: 0.7,
          allowsEditing: true, 
        })
      : await ImagePicker.launchImageLibraryAsync({ 
          quality: 0.7, 
          allowsMultipleSelection: false 
        });

    if (!result.canceled) {
      const newMedia = {
        id: Date.now(),
        uri: result.assets[0].uri,
      };
      setMediaFiles([...mediaFiles, newMedia]);
    }
  };

  const removeMedia = (id) => {
    setMediaFiles(mediaFiles.filter((item) => item.id !== id));
  };

  const handleSubmitLaporan = async () => {
    // Validasi Akhir
    if (!deskripsi.trim()) return Alert.alert('Error', 'Deskripsi tidak boleh kosong');
    if (mediaFiles.length === 0) return Alert.alert('Error', 'Tambahkan minimal 1 foto');

    setLoading(true);

    // Simulasi Proses Pengiriman (Ganti bagian ini dengan fetch ke API Laravel kamu nanti)
    setTimeout(() => {
      setLoading(false);
      
      // Navigasi ke HalamanTerkirim dengan membawa parameter ID Laporan
      const generatedId = `SIGAP-${Math.floor(1000 + Math.random() * 9000)}`;
      
      router.replace({
        pathname: '/(tabs)/Masyarakat/HalamanTerkirim',
        params: { reportId: generatedId }
      });
      
    }, 2500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F3B6D" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kirim Laporan Baru</Text>
        <Icon name="help-circle-outline" size={24} color="#fff" />
      </View>

      {/* TAB NAVIGATION */}
      <View style={styles.tabContainer}>
        {[
          { id: 1, label: 'Detail' },
          { id: 2, label: 'Media' },
          { id: 3, label: 'Lokasi' },
        ].map((tab) => (
          <TouchableOpacity key={tab.id} style={styles.tabItem} onPress={() => setActiveTab(tab.id)}>
            <View style={[styles.tabCircle, activeTab === tab.id && styles.tabCircleActive]}>
              <Text style={[styles.tabNumber, activeTab === tab.id && styles.tabNumberActive]}>{tab.id}</Text>
            </View>
            <Text style={[styles.tabLabel, activeTab === tab.id && styles.tabLabelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* TAB 1: DETAIL */}
        {activeTab === 1 && (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <Icon name="file-document-outline" size={20} color="#1F3B6D" />
              <Text style={styles.sectionTitle}>Deskripsi Masalah</Text>
            </View>
            <View style={styles.descriptionBox}>
              <TextInput
                style={styles.descriptionInput}
                placeholder="Ceritakan detail kerusakan jalan, jembatan, atau fasilitas umum lainnya..."
                multiline
                maxLength={500}
                value={deskripsi}
                onChangeText={setDeskripsi}
              />
              <Text style={styles.charCounter}>{deskripsi.length} / 500</Text>
            </View>
            
            <TouchableOpacity 
              style={[styles.nextButtonFull, !deskripsi.trim() && { opacity: 0.6 }]} 
              onPress={() => deskripsi.trim() ? setActiveTab(2) : Alert.alert('Info', 'Isi deskripsi dulu')}
            >
              <Text style={styles.nextButtonText}>Lanjut ke Media</Text>
              <Icon name="arrow-right" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        {/* TAB 2: MEDIA */}
        {activeTab === 2 && (
          <View style={styles.tabContent}>
             <View style={styles.sectionHeader}>
              <Icon name="image-multiple-outline" size={20} color="#1F3B6D" />
              <Text style={styles.sectionTitle}>Unggah Media</Text>
            </View>

            <View style={styles.uploadButtonsRow}>
              <TouchableOpacity style={styles.uploadCard} onPress={() => handlePickImage(true)}>
                <Icon name="camera" size={32} color="#1F3B6D" />
                <Text style={styles.uploadText}>Kamera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadCard} onPress={() => handlePickImage(false)}>
                <Icon name="image-multiple" size={32} color="#1F3B6D" />
                <Text style={styles.uploadText}>Galeri</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoBox}>
              <Icon name="information-outline" size={16} color="#FF9800" />
              <Text style={styles.infoText}>Maksimal 3 foto pendukung kerusakan.</Text>
            </View>

            <View style={styles.mediaGrid}>
              {mediaFiles.map((item) => (
                <View key={item.id} style={styles.mediaItem}>
                  <Image source={{ uri: item.uri }} style={styles.mediaImage} />
                  <TouchableOpacity style={styles.removeBtn} onPress={() => removeMedia(item.id)}>
                    <Icon name="close" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.navigationRow}>
              <TouchableOpacity style={styles.backButtonBorder} onPress={() => setActiveTab(1)}>
                <Icon name="arrow-left" size={18} color="#1F3B6D" />
                <Text style={styles.backButtonText}>Kembali</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.nextButtonSmall, mediaFiles.length === 0 && { opacity: 0.6 }]} 
                onPress={() => mediaFiles.length > 0 ? setActiveTab(3) : Alert.alert('Info', 'Unggah minimal 1 foto')}
              >
                <Text style={styles.nextButtonText}>Lanjut ke Lokasi</Text>
                <Icon name="arrow-right" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* TAB 3: LOKASI */}
        {activeTab === 3 && (
          <View style={styles.tabContent}>
            <TouchableOpacity style={styles.currentLocationRow}>
              <Icon name="crosshairs-gps" size={18} color="#1F3B6D" />
              <Text style={styles.currentLocationText}>Gunakan Lokasi Saat Ini</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mapPlaceholder} onPress={openGoogleMaps}>
              <Image 
                source={{ uri: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/106.8210,-6.2088,14/400x250?access_token=YOUR_MAPBOX_TOKEN' }} 
                style={styles.mapImage}
              />
              <View style={styles.mapOverlay}>
                <Icon name="google-maps" size={40} color="#EA4335" />
                <Text style={styles.mapHint}>Ketuk untuk buka di Google Maps</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.addressCard}>
              <Icon name="map-marker" size={24} color="#1F3B6D" />
              <View style={styles.addressTexts}>
                <Text style={styles.addressPrimary}>{selectedLocation.address}</Text>
                <Text style={styles.addressSecondary}>{selectedLocation.city}</Text>
              </View>
              <Icon name="pencil-outline" size={20} color="#999" />
            </View>

            <View style={styles.navigationRow}>
              <TouchableOpacity style={styles.backButtonBorder} onPress={() => setActiveTab(2)}>
                <Icon name="arrow-left" size={18} color="#1F3B6D" />
                <Text style={styles.backButtonText}>Kembali</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.submitButton, loading && { backgroundColor: '#ccc' }]} 
                onPress={handleSubmitLaporan}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Icon name="send" size={18} color="#fff" style={{marginRight: 8}} />
                    <Text style={styles.submitText}>Kirim Laporan</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#1F3B6D', flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  
  tabContainer: { flexDirection: 'row', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  tabItem: { flex: 1, alignItems: 'center' },
  tabCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  tabCircleActive: { backgroundColor: '#F4C430' },
  tabNumber: { color: '#999', fontWeight: 'bold', fontSize: 14 },
  tabNumberActive: { color: '#fff' },
  tabLabel: { fontSize: 10, color: '#999', fontWeight: '600' },
  tabLabelActive: { color: '#1F3B6D' },

  scrollContent: { padding: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { marginLeft: 10, fontWeight: 'bold', color: '#1F3B6D', fontSize: 15 },
  
  descriptionBox: { backgroundColor: '#F8F9FF', borderRadius: 12, padding: 15, borderWidth: 1, borderColor: '#E0E5F2', marginBottom: 20 },
  descriptionInput: { minHeight: 120, textAlignVertical: 'top', color: '#333', fontSize: 14 },
  charCounter: { textAlign: 'right', fontSize: 11, color: '#999', marginTop: 5 },

  uploadButtonsRow: { flexDirection: 'row', gap: 15, marginBottom: 15 },
  uploadCard: { flex: 1, height: 110, borderRadius: 12, borderStyle: 'dashed', borderWidth: 2, borderColor: '#D1D9E6', backgroundColor: '#F9FAFF', justifyContent: 'center', alignItems: 'center' },
  uploadText: { marginTop: 8, fontSize: 12, color: '#1F3B6D', fontWeight: 'bold' },
  
  infoBox: { flexDirection: 'row', backgroundColor: '#FFF9E6', padding: 10, borderRadius: 8, marginBottom: 20, alignItems: 'center' },
  infoText: { fontSize: 11, color: '#856404', marginLeft: 8 },

  mediaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  mediaItem: { width: (width - 60) / 3, aspectRatio: 1, borderRadius: 8, overflow: 'hidden', backgroundColor: '#eee' },
  mediaImage: { width: '100%', height: '100%' },
  removeBtn: { position: 'absolute', top: 5, right: 5, backgroundColor: 'rgba(255,0,0,0.7)', borderRadius: 12, padding: 2 },

  navigationRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 10 },
  backButtonBorder: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 10, borderWidth: 1.5, borderColor: '#1F3B6D' },
  backButtonText: { color: '#1F3B6D', fontWeight: 'bold' },
  nextButtonSmall: { flex: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4C430', borderRadius: 10, height: 50 },
  nextButtonFull: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4C430', borderRadius: 10, height: 52 },
  nextButtonText: { color: '#fff', fontWeight: 'bold', marginRight: 5 },

  currentLocationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, padding: 5 },
  currentLocationText: { marginLeft: 8, color: '#1F3B6D', fontWeight: 'bold', fontSize: 13 },
  mapPlaceholder: { height: 180, backgroundColor: '#eee', borderRadius: 15, overflow: 'hidden', marginBottom: 15, elevation: 2 },
  mapImage: { width: '100%', height: '100%' },
  mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.05)', justifyContent: 'center', alignItems: 'center' },
  mapHint: { marginTop: 8, fontSize: 11, color: '#1F3B6D', fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.8)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  
  addressCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FF', padding: 15, borderRadius: 12, marginBottom: 25, borderWidth: 1, borderColor: '#E0E5F2' },
  addressTexts: { flex: 1, marginLeft: 12 },
  addressPrimary: { fontWeight: 'bold', fontSize: 13, color: '#1F3B6D' },
  addressSecondary: { fontSize: 11, color: '#666', marginTop: 2 },

  submitButton: { flex: 2, flexDirection: 'row', backgroundColor: '#1F3B6D', height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', elevation: 3 },
  submitText: { color: '#fff', fontWeight: 'bold', fontSize: 15 }
});

export default HalamanKirimLaporan;