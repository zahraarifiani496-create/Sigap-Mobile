import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const HalamanBeranda = () => {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState('HOME');

  const handleNavPress = (screen) => {
    setActiveNav(screen);
    
    switch (screen) {
      case 'RIWAYAT':
        router.push('/HalamanRiwayat');
        break;
      case 'LAPORAN':
        router.push('/HalamanLapor');
        break;
      case 'BANTUAN':
        router.push('/HalamanBantuan');
        break;
      case 'PROFIL':
        router.push('/HalamanProfil');
        break;
      case 'HOME':
      default:
        // Stay on home
        break;
    }
  };

  const handleBuatLaporan = () => {
    router.push('/HalamanLapor');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F3B6D" />
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SIGAP PUPR</Text>
        <TouchableOpacity>
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
          <Icon name="bell-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* --- DASHBOARD UTAMA BANNER --- */}
        <View style={styles.welcomeSection}>
          <View style={{ flex: 1 }}>
            <Text style={styles.dashboardLabel}>DASHBOARD UTAMA</Text>
            <Text style={styles.welcomeText}>Selamat Datang,</Text>
            <Text style={styles.subtitle}>Pantau perkembangan infrastruktur nasional dalam aplikasi kendali di tangan Anda secara langsung.</Text>
          </View>
          <TouchableOpacity style={styles.reportButton} onPress={handleBuatLaporan}>
            <Icon name="file-document-edit-outline" size={20} color="#fff" />
            <Text style={styles.reportButtonText}>Laporan Masalah</Text>
          </TouchableOpacity>
        </View>

        {/* --- MAP BANNER --- */}
        <View style={styles.mapContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=200&fit=crop' }}
            style={styles.mapImage}
            resizeMode="cover"
          />
          <View style={styles.mapOverlay}>
             <Icon name="map" size={16} color="#1F3B6D" style={{ marginBottom: 4 }} />
             <Text style={styles.mapTag}>Peta Infrastruktur</Text>
             <Text style={styles.mapSubTag}>Update terakhir: 5 menit yang lalu</Text>
          </View>
        </View>

        {/* --- STATISTIC CARD --- */}
        <View style={styles.statsCard}>
          <Text style={styles.statsLabel}>TOTAL PROYEK 2024</Text>
          <Text style={styles.statsValue}>1,284</Text>
          <View style={styles.statsTrend}>
             <Icon name="trending-up" size={16} color="#4CAF50" />
             <Text style={styles.statsTrendText}>+12% Bulan ini</Text>
          </View>
          <Icon name="office-building" size={40} color="rgba(255,255,255,0.1)" style={styles.statsBgIcon} />
        </View>

        {/* --- PROGRESS PROYEK --- */}
        <View style={styles.progressSection}>
           <Text style={styles.sectionTitle}>STATUS PROYEK</Text>
           
           <View style={styles.progressItem}>
              <View style={styles.progressLabelRow}>
                <Text style={styles.projectName}>Tol Trans Jawa</Text>
                <Text style={styles.percentText}>85%</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '85%' }]} />
              </View>
           </View>

           <View style={styles.progressItem}>
              <View style={styles.progressLabelRow}>
                <Text style={styles.projectName}>Bendungan Gintung</Text>
                <Text style={styles.percentText}>70%</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '70%' }]} />
              </View>
           </View>
        </View>

        {/* --- HASIL KERJA (GALLERY) --- */}
        <View style={styles.galleryHeader}>
          <Text style={styles.hasilKerjaTitle}>Hasil Kerja</Text>
          <TouchableOpacity>
            <Text style={styles.lihatSemua}>Lihat Semua Galeri {'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.masonryContainer}>
          <View style={styles.column}>
            <View style={styles.galleryCard}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1581578731548-c64695c952952?w=300&h=400&fit=crop' }} style={[styles.galleryImg, { height: 250 }]} />
              <View style={styles.imgTag}><Text style={styles.imgTagText}>Jembatan</Text></View>
            </View>
            <View style={styles.galleryCard}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1581078016583-eaf5653cecc0?w=300&h=300&fit=crop' }} style={[styles.galleryImg, { height: 180 }]} />
            </View>
          </View>
          
          <View style={styles.column}>
            <View style={styles.galleryCard}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1581078016583-eaf5653cecc0?w=300&h=300&fit=crop' }} style={[styles.galleryImg, { height: 180 }]} />
            </View>
            <View style={styles.galleryCard}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1581078016583-eaf5653cecc0?w=300&h=400&fit=crop' }} style={[styles.galleryImg, { height: 250 }]} />
              <View style={styles.imgTag}><Text style={styles.imgTagText}>Bendungan</Text></View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <View style={styles.bottomNav}>
        <NavItem 
          icon="home-box" 
          label="HOME" 
          active={activeNav === 'HOME'} 
          onPress={() => handleNavPress('HOME')}
        />
        <NavItem 
          icon="history" 
          label="RIWAYAT" 
          active={activeNav === 'RIWAYAT'} 
          onPress={() => handleNavPress('RIWAYAT')}
        />
        <NavItem 
          icon="file-document" 
          label="LAPORAN" 
          active={activeNav === 'LAPORAN'} 
          onPress={() => handleNavPress('LAPORAN')}
        />
        <NavItem 
          icon="help-circle" 
          label="BANTUAN" 
          active={activeNav === 'BANTUAN'} 
          onPress={() => handleNavPress('BANTUAN')}
        />
        <NavItem 
          icon="account-circle" 
          label="PROFIL" 
          active={activeNav === 'PROFIL'} 
          onPress={() => handleNavPress('PROFIL')}
        />
      </View>
    </SafeAreaView>
  );
};

const NavItem = ({ icon, label, active, onPress }) => (
  <TouchableOpacity style={[styles.navItem, active && styles.navItemActive]} onPress={onPress}>
    <View style={[styles.navIconBox, active && styles.navIconBoxActive]}>
      <Icon name={icon} size={24} color={active ? '#1F3B6D' : '#999'} />
    </View>
    <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: {
    backgroundColor: '#1F3B6D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center'
  },
  headerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#f44336',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: 'bold' },
  scrollContent: { paddingBottom: 100 },
  
  welcomeSection: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  dashboardLabel: { color: '#1F3B6D', fontSize: 10, fontWeight: '800', marginBottom: 5 },
  welcomeText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 11, color: '#666', marginTop: 4, lineHeight: 16 },
  reportButton: {
    backgroundColor: '#F4C430',
    padding: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  reportButtonText: { color: '#fff', fontSize: 10, fontWeight: 'bold', marginLeft: 5 },

  mapContainer: {
    marginHorizontal: 20,
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#ddd',
    marginBottom: 20,
  },
  mapImage: { width: '100%', height: '100%' },
  mapOverlay: { 
    position: 'absolute', 
    top: 15, 
    left: 15, 
    backgroundColor: 'rgba(255,255,255,0.9)', 
    padding: 10, 
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapTag: { fontSize: 10, fontWeight: 'bold', color: '#1F3B6D', marginLeft: 8 },
  mapSubTag: { fontSize: 8, color: '#666', marginLeft: 8 },

  statsCard: {
    margin: 20,
    backgroundColor: '#4A5B81',
    padding: 20,
    borderRadius: 15,
    overflow: 'hidden'
  },
  statsLabel: { color: '#ddd', fontSize: 10, fontWeight: '600' },
  statsValue: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginVertical: 5 },
  statsTrend: { flexDirection: 'row', alignItems: 'center' },
  statsTrendText: { color: '#fff', fontSize: 10, marginLeft: 5 },
  statsBgIcon: { position: 'absolute', bottom: -10, right: -5 },

  progressSection: { marginHorizontal: 20, backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 20 },
  sectionTitle: { fontSize: 10, fontWeight: 'bold', color: '#999', marginBottom: 15 },
  progressItem: { marginBottom: 15 },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  projectName: { fontSize: 12, fontWeight: '600', color: '#333' },
  percentText: { fontSize: 12, fontWeight: 'bold', color: '#1F3B6D' },
  progressBarBg: { height: 6, backgroundColor: '#E0E0E0', borderRadius: 3 },
  progressBarFill: { height: 6, backgroundColor: '#1F3B6D', borderRadius: 3 },

  galleryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 20, marginBottom: 15 },
  hasilKerjaTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  lihatSemua: { color: '#1F3B6D', fontSize: 12, fontWeight: 'bold' },
  
  masonryContainer: { flexDirection: 'row', padding: 15 },
  column: { flex: 1, paddingHorizontal: 5 },
  galleryCard: { marginBottom: 10, borderRadius: 12, overflow: 'hidden', backgroundColor: '#fff' },
  galleryImg: { width: '100%' },
  imgTag: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  imgTagText: { color: '#fff', fontSize: 8, fontWeight: 'bold' },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopWidth: 2,
    borderTopColor: '#E0E0FF',
    width: '100%',
    justifyContent: 'space-around',
  },
  navItem: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical: 5,
  },
  navItemActive: {
    backgroundColor: '#F0F4FF',
  },
  navIconBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navIconBoxActive: {
    backgroundColor: '#F0F4FF',
    borderColor: '#1F3B6D',
    borderWidth: 2,
  },
  navLabel: { fontSize: 9, color: '#999', marginTop: 2, fontWeight: '500' },
  navLabelActive: { color: '#1F3B6D', fontWeight: 'bold', fontSize: 9 }
});

export default HalamanBeranda;