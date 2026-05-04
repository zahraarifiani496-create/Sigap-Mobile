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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

const HalamanBeranda = () => {
  const router = useRouter();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  const workResults = [
    { uri: 'https://via.placeholder.com/150' },
    { uri: 'https://via.placeholder.com/150' },
    { uri: 'https://via.placeholder.com/150' },
    { uri: 'https://via.placeholder.com/150' },
    { uri: 'https://via.placeholder.com/150' },
    { uri: 'https://via.placeholder.com/150' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Selamat Datang, Rudi!</Text>
          <Ionicons name="notifications-outline" size={24} color="#FFD700" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => router.push('/Masyarakat/HalamanLapor')}
        >
          <Ionicons name="add" size={20} color="#2C3E50" />
          <Text style={styles.reportText}>LAPORKAN MASALAH</Text>
        </TouchableOpacity>

        {/* MAP (dummy biar aman) */}
        <View style={styles.section}>
          <Text style={styles.title}>Peta Pelaporan</Text>

          <View style={styles.map}>
            <Ionicons name="map" size={60} color="#ccc" />
            <Text>
              {location
                ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
                : 'Lokasi tidak tersedia'}
            </Text>
          </View>
        </View>

        {/* GRID */}
        <View style={styles.section}>
          <Text style={styles.title}>Hasil Kerja PUPR</Text>

          <View style={styles.grid}>
            {workResults.map((item, index) => (
              <Image key={index} source={item} style={styles.workImage} />
            ))}
          </View>
        </View>

      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={22} />
          <Text style={styles.active}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/Masyarakat/HalamanLapor')}
        >
          <Ionicons name="flag-outline" size={22} />
          <Text>Laporan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/Masyarakat/HalamanRiwayat')}
        >
          <Ionicons name="time-outline" size={22} />
          <Text>Riwayat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/Masyarakat/HalamanBantuan')}
        >
          <Ionicons name="help-circle-outline" size={22} />
          <Text>Bantuan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/Masyarakat/HalamanProfil')}
        >
          <Ionicons name="person-outline" size={22} />
          <Text>Profil</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

export default HalamanBeranda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  header: {
    backgroundColor: '#3F4E78',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  reportButton: {
    backgroundColor: '#E7B93E',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  reportText: {
    fontWeight: '700',
    color: '#2C3E50',
  },

  section: {
    marginHorizontal: 15,
    marginBottom: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },

  map: {
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  workImage: {
    width: (Dimensions.get('window').width - 50) / 3,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },

  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
  },

  active: {
    fontWeight: '700',
  },
});