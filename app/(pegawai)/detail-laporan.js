import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  Image, SafeAreaView, StatusBar, Platform, ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import laporanService from '../../services/laporanService';
import MapTilerWebView from '../../components/MapTilerWebView';

// --- PALET WARNA (Berdasarkan Tailwind Config) ---
const colors = {
  primary: '#001e57',
  primaryFixedDim: '#b3c5ff',
  background: '#f8f9ff',
  surface: '#ffffff',
  onSurface: '#0b1c30',
  onSurfaceVariant: '#444650',
  secondaryContainer: '#ffce5d',
  onSecondaryContainer: '#755700',
  outlineVariant: '#c5c6d1',
  outline: '#757681',
  error: '#ba1a1a',
  surfaceContainerHigh: '#dce9ff',
  surfaceContainerLow: '#eff4ff',
};

export default function DetailTugasScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await laporanService.getDetail(id);
      setDetail(res);
    } catch (error) {
      console.log('Error fetch detail pegawai:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (!detail) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Laporan tidak ditemukan.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
          <Text style={{ color: colors.primary }}>Kembali</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Task Header Card */}
        <View style={styles.card}>
          <View style={styles.cardLeftBorder} />
          <View style={styles.taskHeaderRow}>
            <View>
              <Text style={styles.labelSmallOutline}>TASK ID</Text>
              <Text style={styles.taskIdTitle}>{detail.kode_laporan}</Text>
            </View>
            <View style={styles.badgeBaru}>
              <Text style={styles.badgeBaruText}>{detail.status.toUpperCase()}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.taskStatsRow}>
            <View style={styles.statCol}>
              <Text style={styles.labelSmallOutline}>KATEGORI</Text>
              <View style={styles.statValueRow}>
                <MaterialIcons name="category" size={18} color={colors.primary} />
                <Text style={styles.statValueNormal}>{detail.kategori || 'Umum'}</Text>
              </View>
            </View>
            <View style={styles.statCol}>
              <Text style={styles.labelSmallOutline}>TANGGAL</Text>
              <View style={styles.statValueRow}>
                <MaterialIcons name="calendar-today" size={18} color={colors.onSurfaceVariant} />
                <Text style={styles.statValueNormal}>{detail.tanggal}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Description Card */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <MaterialIcons name="description" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>{detail.judul}</Text>
          </View>
          <Text style={styles.descText}>
            {detail.deskripsi}
          </Text>
        </View>

        {/* Location Card */}
        <View style={styles.card}>
          <View style={[styles.cardTitleRow, styles.spaceBetween]}>
            <View style={styles.cardTitleRow}>
              <MaterialIcons name="location-on" size={20} color={colors.primary} />
              <Text style={styles.cardTitle}>Lokasi Tugas</Text>
            </View>
          </View>
          
          <View style={styles.mapContainer}>
            {detail.latitude && detail.longitude ? (
              <MapTilerWebView 
                latitude={detail.latitude}
                longitude={detail.longitude}
                zoom={14}
                style={{ width: '100%', height: '100%' }}
                interactive={false}
                markers={[{ latitude: detail.latitude, longitude: detail.longitude }]}
              />
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e2e8f0' }}>
                 <Text style={{ color: '#64748b' }}>GPS Tidak Tersedia</Text>
              </View>
            )}
            <View style={styles.mapOverlayBox}>
              <Text style={styles.mapOverlayText} numberOfLines={2}>
                {detail.alamat || 'Lokasi tidak diketahui'}
              </Text>
            </View>
          </View>
        </View>

        {/* Attachments Card */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <MaterialIcons name="attachment" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Lampiran Laporan</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.attachmentScroll}>
            {detail.foto_url ? (
               <Image source={{ uri: detail.foto_url }} style={styles.attachmentImage} />
            ) : (
               <Text>Tidak ada foto lampiran.</Text>
            )}
            {detail.foto_progres_url && (
               <Image source={{ uri: detail.foto_progres_url }} style={styles.attachmentImage} />
            )}
          </ScrollView>
        </View>

        {/* Action Section */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.btnAction} onPress={() => router.push({ pathname: '/(pegawai)/update-progres', params: { id: detail.id } })}>
            <MaterialIcons name="update" size={24} color={colors.onSecondaryContainer} />
            <Text style={styles.btnActionText}>UPDATE PROGRES</Text>
          </TouchableOpacity>
          <Text style={styles.actionWarningText}>
            Perbarui status laporan setelah Anda melakukan pengecekan atau perbaikan di lokasi.
          </Text>
        </View>

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
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10 },
      android: { elevation: 3 },
    }),
  },
  cardLeftBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 6,
    backgroundColor: colors.primary,
  },
  taskHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  labelSmallOutline: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.outline,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  taskIdTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  badgeBaru: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeBaruText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.onSecondaryContainer,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(197, 198, 209, 0.3)',
    marginBottom: 16,
  },
  taskStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCol: {
    flex: 1,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statValueError: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.error,
  },
  statValueNormal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.onSurfaceVariant,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  descText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
  },
  btnNavigasi: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  btnNavigasiText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
  },
  mapContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    position: 'relative',
  },
  mapImagePlaceholder: {
    width: '100%',
    height: '100%',
  },
  mapOverlayBox: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 209, 0.3)',
  },
  mapOverlayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.onSurface,
  },
  attachmentScroll: {
    gap: 12,
    paddingBottom: 8,
  },
  attachmentImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginRight: 12,
  },
  attachmentAddBtn: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderStyle: 'dashed',
    backgroundColor: colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionSection: {
    marginTop: 10,
    gap: 12,
  },
  btnAction: {
    backgroundColor: colors.secondaryContainer,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8 },
      android: { elevation: 4 },
    }),
  },
  btnActionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.onSecondaryContainer,
  },
  actionWarningText: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.outline,
    fontWeight: '600',
    paddingHorizontal: 20,
  },
});