import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  Image, SafeAreaView, StatusBar, TextInput, Platform, ActivityIndicator, Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import laporanService from '../../services/laporanService';

// --- PALET WARNA ---
const colors = {
  primary: '#001e57',
  primaryFixed: '#dae2ff',
  primaryContainer: '#1d356e',
  background: '#f8f9ff',
  surface: '#ffffff',
  onSurface: '#0b1c30',
  onSurfaceVariant: '#444650',
  secondaryContainer: '#ffce5d',
  onSecondaryContainer: '#755700',
  outlineVariant: '#c5c6d1',
  outline: '#757681',
  surfaceContainerLow: '#eff4ff',
};

export default function UpdateProgresScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [detail, setDetail] = useState(null);
  
  const [activeStatus, setActiveStatus] = useState('proses'); // 'proses', 'selesai', 'terkendala'
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  const fetchDetail = async () => {
    try {
      const res = await laporanService.getDetail(id);
      setDetail(res);
      if (res.status_raw === 'proses' || res.status_raw === 'diteruskan') setActiveStatus('proses');
      else if (res.status_raw === 'selesai') setActiveStatus('selesai');
      else if (res.status_raw === 'terkendala') setActiveStatus('terkendala');
      setNotes(res.catatan || '');
    } catch (err) {
      console.log('Error fetch detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Izin Ditolak', 'Dibutuhkan izin galeri untuk mengunggah foto.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0]);
    }
  };

  const handleSimpan = async () => {
    try {
      setSubmitting(true);
      const dataToSubmit = {
        status: activeStatus,
        catatan: notes,
      };
      if (photo) {
        dataToSubmit.foto = {
          uri: photo.uri,
          name: photo.fileName || 'progres.jpg',
          type: photo.mimeType || 'image/jpeg',
        };
      }
      await laporanService.updateProgresPegawai(id, dataToSubmit);
      Alert.alert('Sukses', 'Update progres berhasil disimpan.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (err) {
      console.log('Update Error:', err);
      Alert.alert('Gagal', 'Terjadi kesalahan saat menyimpan progres.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Project Title Section */}
        <View style={styles.sectionMargin}>
          <Text style={styles.projectId}>PROJECT ID: {detail?.kode_laporan}</Text>
          <Text style={styles.pageTitle}>Update Progres Proyek</Text>
          <Text style={styles.pageSubtitle}>{detail?.judul}</Text>
        </View>

        {/* Status Pekerjaan */}
        <View style={styles.sectionMargin}>
          <Text style={styles.sectionTitle}>Status Pekerjaan</Text>
          <View style={styles.statusGrid}>
            
            {/* In Progress Button */}
            <TouchableOpacity 
              style={[
                styles.statusCard, 
                activeStatus === 'proses' ? styles.statusCardActive : styles.statusCardInactive
              ]}
              onPress={() => setActiveStatus('proses')}
              activeOpacity={0.8}
            >
              {activeStatus === 'proses' && (
                <MaterialIcons name="check-circle" size={20} color={colors.primary} style={styles.statusCheckIcon} />
              )}
              <MaterialIcons 
                name="pending-actions" 
                size={32} 
                color={activeStatus === 'proses' ? colors.primary : colors.outline} 
                style={styles.statusIcon} 
              />
              <Text style={[styles.statusText, activeStatus === 'proses' ? styles.statusTextActive : styles.statusTextInactive]}>
                Proses
              </Text>
            </TouchableOpacity>

            {/* Terkendala Button */}
            <TouchableOpacity 
              style={[
                styles.statusCard, 
                activeStatus === 'terkendala' ? styles.statusCardActive : styles.statusCardInactive
              ]}
              onPress={() => setActiveStatus('terkendala')}
              activeOpacity={0.8}
            >
              {activeStatus === 'terkendala' && (
                <MaterialIcons name="check-circle" size={20} color={colors.primary} style={styles.statusCheckIcon} />
              )}
              <MaterialIcons 
                name="error-outline" 
                size={32} 
                color={activeStatus === 'terkendala' ? colors.primary : colors.outline} 
                style={styles.statusIcon} 
              />
              <Text style={[styles.statusText, activeStatus === 'terkendala' ? styles.statusTextActive : styles.statusTextInactive]}>
                Terkendala
              </Text>
            </TouchableOpacity>

            {/* Done Button */}
            <TouchableOpacity 
              style={[
                styles.statusCard, 
                activeStatus === 'selesai' ? styles.statusCardActive : styles.statusCardInactive
              ]}
              onPress={() => setActiveStatus('selesai')}
              activeOpacity={0.8}
            >
              {activeStatus === 'selesai' && (
                <MaterialIcons name="check-circle" size={20} color={colors.primary} style={styles.statusCheckIcon} />
              )}
              <MaterialIcons 
                name="task-alt" 
                size={32} 
                color={activeStatus === 'selesai' ? colors.primary : colors.outline} 
                style={styles.statusIcon} 
              />
              <Text style={[styles.statusText, activeStatus === 'selesai' ? styles.statusTextActive : styles.statusTextInactive]}>
                Selesai
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Catatan Pekerjaan */}
        <View style={styles.sectionMargin}>
          <Text style={styles.sectionTitle}>Catatan Pekerjaan</Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={4}
            placeholder="Tuliskan detail pekerjaan hari ini..."
            placeholderTextColor={colors.outlineVariant}
            value={notes}
            onChangeText={setNotes}
            textAlignVertical="top"
          />
        </View>

        {/* Dokumentasi Visual */}
        <View style={styles.sectionMargin}>
          <Text style={styles.sectionTitle}>Dokumentasi Visual</Text>
          <View style={styles.visualGrid}>
            
            {/* Foto Sebelum */}
            <View style={styles.visualCol}>
              <Text style={styles.visualLabel}>FOTO SEBELUM</Text>
              <View style={styles.visualCard}>
                <Image 
                  source={{ uri: detail?.foto_url || 'https://images.unsplash.com/photo-1541888087525-4bd40ed19375?auto=format&fit=crop&w=300&q=80' }} 
                  style={styles.visualImage} 
                />
              </View>
            </View>

            {/* Foto Sesudah / Progres */}
            <View style={styles.visualCol}>
              <Text style={styles.visualLabel}>FOTO PROGRES BARU</Text>
              {photo ? (
                <TouchableOpacity activeOpacity={0.9} style={styles.visualCard} onPress={pickImage}>
                  <Image source={{ uri: photo.uri }} style={styles.visualImage} />
                  <View style={styles.visualOverlay}>
                    <MaterialIcons name="edit" size={24} color="#ffffff" />
                    <Text style={styles.visualOverlayText}>Ganti Foto</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity activeOpacity={0.7} style={styles.visualCardDashed} onPress={pickImage}>
                  <MaterialIcons name="upload-file" size={32} color={colors.primary} style={{ marginBottom: 8 }} />
                  <Text style={styles.visualDashedText}>Unggah Foto</Text>
                </TouchableOpacity>
              )}
            </View>

          </View>
        </View>

        {/* Simpan Button */}
        <TouchableOpacity style={styles.btnSimpan} onPress={handleSimpan} disabled={submitting}>
          {submitting ? (
             <ActivityIndicator color={colors.onSecondaryContainer} />
          ) : (
             <>
                <MaterialIcons name="cloud-upload" size={24} color={colors.onSecondaryContainer} />
                <Text style={styles.btnSimpanText}>Simpan Update Progres</Text>
             </>
          )}
        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionMargin: {
    marginBottom: 24,
  },
  projectId: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.onSurface,
  },
  pageSubtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.onSurface,
    marginBottom: 16,
  },
  statusGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statusCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    borderRadius: 12,
    position: 'relative',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10 },
      android: { elevation: 3 },
    }),
  },
  statusCardActive: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  statusCardInactive: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  statusCheckIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  statusIcon: {
    marginBottom: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusTextActive: {
    color: colors.primary,
  },
  statusTextInactive: {
    color: colors.outline,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10 },
      android: { elevation: 3 },
    }),
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleCard: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.onSurface,
  },
  progressValueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  sliderContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -5,
  },
  sliderLabelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.outline,
  },
  textInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: colors.onSurface,
    minHeight: 120,
  },
  visualGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  visualCol: {
    flex: 1,
    gap: 8,
  },
  visualLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.outline,
    letterSpacing: 0.5,
  },
  visualCard: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    position: 'relative',
  },
  visualImage: {
    width: '100%',
    height: '100%',
  },
  visualOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  visualOverlayText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  visualCardDashed: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primaryFixed,
    borderStyle: 'dashed',
    backgroundColor: colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visualDashedText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
  },
  btnSimpan: {
    backgroundColor: colors.secondaryContainer,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8 },
      android: { elevation: 4 },
    }),
  },
  btnSimpanText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.onSecondaryContainer,
  },
});