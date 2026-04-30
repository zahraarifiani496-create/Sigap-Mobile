import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const HalamanBeranda = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status === 'granted') {
        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);
      }
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  const openMaps = () => {
    if (location) {
      const url = `https://www.google.com/maps/search/${location.latitude},${location.longitude}`;
      Alert.alert(
        'Buka Maps',
        `Latitude: ${location.latitude.toFixed(6)}\nLongitude: ${location.longitude.toFixed(6)}`,
        [
          {
            text: 'Buka di Google Maps',
            onPress: () => {
              // Di Expo Go, gunakan Linking untuk membuka browser
              console.log('Opening:', url);
            },
          },
          { text: 'Batal', style: 'cancel' },
        ]
      );
    } else {
      Alert.alert('Error', 'Lokasi tidak tersedia');
    }
  };

  const workResults = [
    require('../../../assets/images/news.jpg'),
    require('../../../assets/images/orange.png'),
    require('../../../assets/images/google.png'),
    require('../../../assets/images/news.jpg'),
    require('../../../assets/images/orange.png'),
    require('../../../assets/images/google.png'),
  ];

  const renderWorkItem = ({ item, index }) => (
    <Image
      source={item}
      style={[
        styles.workImage,
        { width: (Dimensions.get('window').width - 60) / 3 },
      ]}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Selamat Datang, Rudi!</Text>
          <Ionicons name="notifications-outline" size={24} color="#FFD700" />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Report Button */}
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => navigation.navigate('HalamanLapor')}
        >
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.reportButtonText}>LAPORKAN MASALAH</Text>
        </TouchableOpacity>

        {/* Map Section - Static Map Placeholder */}
        <View style={styles.mapSection}>
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map" size={60} color="#ccc" />
            <Text style={styles.mapPlaceholderText}>Peta Laporan</Text>
            <Text style={styles.mapCoordinates}>
              {location
                ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
                : 'Lokasi tidak tersedia'}
            </Text>
          </View>
          <TouchableOpacity style={styles.mapButton} onPress={openMaps}>
            <Ionicons name="navigate" size={20} color="#2C3E50" />
            <Text style={styles.mapButtonText}>Buka Maps</Text>
          </TouchableOpacity>
        </View>

        {/* Work Results Section */}
        <View style={styles.workSection}>
          <Text style={styles.sectionTitle}>Hasil Kerja PUPR Terkini</Text>
          <FlatList
            data={workResults}
            renderItem={renderWorkItem}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            scrollEnabled={false}
            columnWrapperStyle={styles.workGrid}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </View>

        {/* Statistics Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Total Laporan</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Selesai</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Diproses</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.active]}>
          <Ionicons name="home" size={24} color="#2C3E50" />
          <Text style={[styles.navLabel, styles.activeLabel]}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HalamanRiwayat')}>
          <Ionicons name="list-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Laporan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HalamanRiwayat')}>
          <Iconicons name="time-outline" size={24} color="#999" />
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  reportButton: {
    backgroundColor: '#FFD700',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginVertical: 15,
    paddingVertical: 12,
    borderRadius: 8,
  },
  reportButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 8,
  },
  mapSection: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  mapPlaceholder: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginTop: 10,
  },
  mapCoordinates: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  mapButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2C3E50',
  },
  mapButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 8,
  },
  workSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  workGrid: {
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  workImage: {
    height: 100,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 30,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 5,
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

export default HalamanBeranda;