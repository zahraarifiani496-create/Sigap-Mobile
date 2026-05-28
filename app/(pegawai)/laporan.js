import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  Image, SafeAreaView, StatusBar, Platform, ActivityIndicator 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import laporanService from '../../services/laporanService';

// --- PALET WARNA (Berdasarkan Tailwind Config Lo) ---
const colors = {
  primary: '#001e57',
  background: '#f8f9ff',
  surface: '#ffffff',
  onSurface: '#0b1c30',
  onSurfaceVariant: '#444650',
  secondaryContainer: '#ffce5d',
  onSecondaryContainer: '#755700',
  outlineVariant: '#c5c6d1',
  error: '#ba1a1a',
  surfaceContainerHigh: '#dce9ff',
  glassDark: 'rgba(0, 30, 87, 0.95)',
};

export default function DaftarKerjaScreen() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [activeFilter, setActiveFilter] = useState('Semua Tugas');
  const [loading, setLoading] = useState(true);
  const [laporanList, setLaporanList] = useState([]);
  const [statistik, setStatistik] = useState({ total: 0, selesai: 0, diproses: 0, menunggu: 0 });

  useEffect(() => {
    fetchData();
  }, [activeFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const statRes = await laporanService.getStatistikPegawai();
      setStatistik(statRes);

      const params = {};
      if (activeFilter !== 'Semua Tugas') {
        params.kategori = activeFilter === 'SDA' ? 'Sumber Daya Air' : activeFilter;
      }
      const res = await laporanService.getDaftarSemua(params);
      setLaporanList(res.data || []);
    } catch (error) {
      console.log('Error fetch laporan pegawai:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBidangTheme = (kategori) => {
    const k = (kategori || '').toLowerCase();
    if (k.includes('marga')) return { color: '#001e57', bgColor: '#dce9ff', border: colors.surfaceContainerHigh };
    if (k.includes('air') || k.includes('sda')) return { color: '#10b981', bgColor: '#d1fae5', border: '#10b981' };
    return { color: '#755700', bgColor: 'rgba(255, 206, 93, 0.2)', border: colors.secondaryContainer };
  };

  const heroItem = laporanList.length > 0 ? laporanList[0] : null;
  const listItems = laporanList.length > 1 ? laporanList.slice(1) : [];
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Page Title & Actions */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Daftar Kerja Pegawai</Text>
          <Text style={styles.pageSubtitle}>Monitoring laporan harian petugas lapangan lintas departemen.</Text>
          
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.btnPrimary}>
              <MaterialIcons name="filter-list" size={18} color={colors.onSecondaryContainer} />
              <Text style={styles.btnPrimaryText}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecondary}>
              <MaterialIcons name="download" size={18} color={colors.onSurfaceVariant} />
              <Text style={styles.btnSecondaryText}>Export</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabsContainer}>
          {['Semua Tugas', 'Bina Marga', 'Cipta Karya', 'SDA'].map((tab) => (
            <TouchableOpacity 
              key={tab}
              style={[styles.filterTab, activeFilter === tab && styles.filterTabActive]}
              onPress={() => setActiveFilter(tab)}
            >
              <Text style={activeFilter === tab ? styles.filterTabTextActive : styles.filterTabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Hero Task Card */}
        {loading ? (
          <ActivityIndicator color={colors.primary} size="large" style={{ marginVertical: 40 }} />
        ) : heroItem ? (
          <TouchableOpacity style={styles.heroCard} onPress={() => router.push({ pathname: '/(pegawai)/detail-laporan', params: { id: heroItem.id } })}>
            <View style={styles.heroImageContainer}>
              <Image 
                source={{ uri: heroItem.foto_url || 'https://images.unsplash.com/photo-1541888087525-4bd40ed19375?auto=format&fit=crop&w=600&q=80' }} 
                style={styles.heroImage} 
              />
              <View style={styles.heroBadges}>
                <View style={styles.badgeCategory}>
                  <Text style={styles.badgeCategoryText}>{heroItem.kategori || 'UMUM'}</Text>
                </View>
                {(heroItem.status_raw === 'pending' || heroItem.status_raw === 'menunggu') && (
                  <View style={styles.badgeUrgent}>
                    <Text style={styles.badgeUrgentText}>URGENT</Text>
                  </View>
                )}
              </View>
            </View>
            
            <View style={styles.heroContent}>
              <View style={styles.heroRow}>
                <View style={styles.heroTextLeft}>
                  <Text style={styles.heroTitle} numberOfLines={1}>{heroItem.judul}</Text>
                  <View style={styles.locationRow}>
                    <MaterialIcons name="location-on" size={14} color={colors.onSurfaceVariant} />
                    <Text style={styles.locationText} numberOfLines={1}>{heroItem.alamat || 'Lokasi tidak diketahui'}</Text>
                  </View>
                </View>
              </View>
  
              <View style={styles.heroFooter}>
                <View style={styles.avatarsRow}>
                   <Text style={{ fontSize: 12, color: colors.onSurfaceVariant }}>{heroItem.status}</Text>
                </View>
                <Text style={styles.progressText}>{heroItem.status_raw === 'selesai' ? '100%' : (heroItem.status_raw === 'pending' || heroItem.status_raw === 'menunggu' ? '10%' : '55%')}</Text>
              </View>
  
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: heroItem.status_raw === 'selesai' ? '100%' : (heroItem.status_raw === 'pending' || heroItem.status_raw === 'menunggu' ? '10%' : '55%') }]} />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Tidak ada laporan ditemukan.</Text>
        )}

        {/* Summary Widget (Bento Style) */}
        <View style={styles.summaryWidget}>
          <View style={styles.summaryHeader}>
            <View>
              <Text style={styles.summaryLabel}>RINGKASAN TUGAS</Text>
              <Text style={styles.summarySubLabel}>Total Laporan Aktif</Text>
            </View>
            <Text style={styles.summaryTotal}>{statistik.total}</Text>
          </View>

          <View style={styles.bentoGrid}>
            <View style={styles.bentoBox}>
              <Text style={styles.bentoBoxLabel}>SELESAI</Text>
              <Text style={styles.bentoBoxValue}>{statistik.selesai}</Text>
            </View>
            <View style={styles.bentoBox}>
              <Text style={styles.bentoBoxLabel}>PROSES</Text>
              <Text style={styles.bentoBoxValue}>{statistik.diproses}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.btnSummary}>
            <Text style={styles.btnSummaryText}>Lihat Semua Progress</Text>
          </TouchableOpacity>
        </View>

        {/* Task List Items */}
        <View style={styles.taskList}>
          {listItems.map((item) => {
            const theme = getBidangTheme(item.kategori);
            return (
              <TouchableOpacity key={item.id} style={styles.taskCard} onPress={() => router.push({ pathname: '/(pegawai)/detail-laporan', params: { id: item.id } })}>
                <View style={[styles.taskLeftBorder, { backgroundColor: theme.border }]} />
                <View style={styles.taskCardInner}>
                  <View style={styles.taskHeader}>
                    <View style={[styles.taskBadge, { backgroundColor: theme.bgColor }]}>
                      <Text style={[styles.taskBadgeText, { color: theme.color }]}>{item.kategori || 'UMUM'}</Text>
                    </View>
                    <MaterialIcons name="more-vert" size={20} color={colors.outlineVariant} />
                  </View>
                  <Text style={styles.taskItemTitle} numberOfLines={1}>{item.judul}</Text>
                  <Text style={styles.taskItemDesc} numberOfLines={2}>{item.deskripsi}</Text>
                  <View style={styles.taskItemFooter}>
                    <View style={styles.taskDateRow}>
                      <MaterialIcons name="calendar-today" size={14} color={colors.onSurfaceVariant} />
                      <Text style={styles.taskDateText}>{item.tanggal}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: item.status_raw === 'selesai' ? '#dcfce7' : (item.status_raw === 'pending' ? '#fee2e2' : '#fef9c3') }]}>
                      <Text style={[styles.statusBadgeText, { color: item.status_raw === 'selesai' ? '#15803d' : (item.status_raw === 'pending' ? '#b91c1c' : '#a16207') }]}>{item.status}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Project Spread Map Section */}
        <View style={styles.spreadSection}>
          <Text style={styles.spreadTitle}>Sebaran Proyek Aktif</Text>
          <Text style={styles.spreadSubtitle}>Visualisasi lokasi pekerjaan lapangan di wilayah DKI Jakarta dan sekitarnya.</Text>
          
          <View style={styles.spreadList}>
            <View style={styles.spreadListItem}>
              <View style={[styles.dotBorder, { borderColor: '#dbeafe' }]}>
                <View style={[styles.dotFill, { backgroundColor: '#2563eb' }]} />
              </View>
              <View>
                <Text style={styles.spreadItemTitle}>Bina Marga (42)</Text>
                <Text style={styles.spreadItemDesc}>Tersebar di 5 Wilayah Kota</Text>
              </View>
            </View>
            
            <View style={styles.spreadListItem}>
              <View style={[styles.dotBorder, { borderColor: '#e0f2fe' }]}>
                <View style={[styles.dotFill, { backgroundColor: '#38bdf8' }]} />
              </View>
              <View>
                <Text style={styles.spreadItemTitle}>SDA (28)</Text>
                <Text style={styles.spreadItemDesc}>Fokus pada area bantaran sungai</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.btnPeta}>
            <Text style={styles.btnPetaText}>Lihat Peta Lengkap</Text>
            <MaterialIcons name="arrow-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <MaterialIcons name="add" size={32} color="#fff" />
      </TouchableOpacity>

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
    paddingBottom: 100,
  },
  pageHeader: {
    marginBottom: 20,
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
    marginBottom: 16,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  btnPrimaryText: {
    color: colors.onSecondaryContainer,
    fontSize: 12,
    fontWeight: 'bold',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  btnSecondaryText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    fontWeight: 'bold',
  },
  filterTabsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  filterTab: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    height: 36,
    justifyContent: 'center',
  },
  filterTabActive: {
    backgroundColor: colors.secondaryContainer,
    borderColor: colors.secondaryContainer,
  },
  filterTabText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    fontWeight: 'bold',
  },
  filterTabTextActive: {
    color: colors.onSecondaryContainer,
    fontSize: 12,
    fontWeight: 'bold',
  },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    overflow: 'hidden',
    marginBottom: 24,
  },
  heroImageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroBadges: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    gap: 8,
  },
  badgeCategory: {
    backgroundColor: 'rgba(255, 206, 93, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeCategoryText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.onSecondaryContainer,
  },
  badgeUrgent: {
    backgroundColor: colors.error,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeUrgentText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  heroContent: {
    padding: 16,
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroTextLeft: {
    flex: 1,
    marginRight: 10,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginLeft: 4,
  },
  heroTextRight: {
    alignItems: 'flex-end',
  },
  deadlineLabel: {
    fontSize: 10,
    color: '#9ca3af',
    fontWeight: 'bold',
  },
  deadlineDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.error,
  },
  deadlineYear: {
    fontSize: 12,
    color: colors.error,
  },
  heroFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  avatarsRow: {
    flexDirection: 'row',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarOverlap: {
    marginLeft: -10,
  },
  avatarMore: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarMoreText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.onSurfaceVariant,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  summaryWidget: {
    backgroundColor: colors.glassDark,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#b3c5ff',
    fontWeight: 'bold',
  },
  summarySubLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  summaryTotal: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  bentoGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  bentoBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  bentoBoxLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bentoBoxValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnSummary: {
    backgroundColor: colors.secondaryContainer,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnSummaryText: {
    color: colors.onSecondaryContainer,
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskList: {
    marginBottom: 24,
    gap: 16,
  },
  taskCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  taskLeftBorder: {
    width: 6,
  },
  taskCardInner: {
    flex: 1,
    padding: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  taskBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  taskItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.onSurface,
    marginBottom: 4,
  },
  taskItemDesc: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginBottom: 12,
  },
  taskItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(197, 198, 209, 0.3)',
  },
  taskDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskDateText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginLeft: 6,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  spreadSection: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: 16,
  },
  spreadTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.onSurface,
  },
  spreadSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 4,
    marginBottom: 16,
  },
  spreadList: {
    gap: 12,
    marginBottom: 16,
  },
  spreadListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  dotBorder: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  dotFill: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  spreadItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.onSurface,
  },
  spreadItemDesc: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  btnPeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  btnPetaText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
  },
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
      android: { elevation: 6 },
    }),
  },
});