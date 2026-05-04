import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  FlatList,
  Dimensions,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native'; // 🔥 WAJIB

const HalamanLapor = () => {
  const navigation = useNavigation(); // 🔥 FIX NAVIGATION

  const [description, setDescription] = useState('');
  const [media, setMedia] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    getLocationPermission();
  }, []);

  // ================== GET LOKASI ==================
  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Error', 'Izin lokasi ditolak');
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setSelectedLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  // ================== PILIH LOKASI (BUKA GOOGLE MAPS) ==================
  const pilihLokasi = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Error', 'Izin lokasi ditolak');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const latitude = loc.coords.latitude;
      const longitude = loc.coords.longitude;

      // simpan lokasi
      setSelectedLocation({ latitude, longitude });

      // 🔥 buka Google Maps
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      Linking.openURL(url);

    } catch (error) {
      Alert.alert('Error', 'Gagal mengambil lokasi');
    }
  };

  // ================== PICK MEDIA ==================
  const pickMedia = async (type) => {
    try {
      let result;

      if (type === 'camera') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) return;

        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          quality: 1,
        });
      } else {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) return;

        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          quality: 1,
        });
      }

      if (!result.canceled) {
        if (media.length < 5) {
          setMedia([...media, result.assets[0].uri]);
        } else {
          Alert.alert('Error', 'Maksimal 5 file');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal mengambil media');
    }
  };

  // ================== REMOVE MEDIA ==================
  const removeMedia = (index) => {
    const newData = media.filter((_, i) => i !== index);
    setMedia(newData);
  };

  // ================== SUBMIT ==================
  const handleSubmit = () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Isi deskripsi dulu');
      return;
    }

    if (media.length === 0) {
      Alert.alert('Error', 'Upload minimal 1 file');
      return;
    }

    if (!selectedLocation) {
      Alert.alert('Error', 'Silahkan pilih lokasi');
      return;
    }

    // 🔥 PINDAH HALAMAN
    navigation.navigate('HalamanTerkirim');
  };

  // ================== RENDER MEDIA ==================
  const renderItem = ({ item, index }) => (
    <View style={styles.mediaItem}>
      <Image source={{ uri: item }} style={styles.mediaImage} />
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => removeMedia(index)}
      >
        <Ionicons name="close-circle" size={22} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Kirim Laporan</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scroll}>

        {/* DESKRIPSI */}
        <Text style={styles.label}>1. Deskripsi Masalah</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan deskripsi..."
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* UPLOAD */}
        <Text style={styles.label}>2. Unggah Foto / Video</Text>

        <View style={styles.uploadRow}>
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => pickMedia('camera')}
          >
            <Ionicons name="camera-outline" size={24} />
            <Text>Kamera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => pickMedia('gallery')}
          >
            <Ionicons name="images-outline" size={24} />
            <Text>Galeri</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.counter}>{media.length}/5 file</Text>

        <FlatList
          data={media}
          renderItem={renderItem}
          keyExtractor={(_, i) => i.toString()}
          numColumns={3}
          scrollEnabled={false}
        />

        {/* LOKASI */}
        <Text style={styles.label}>3. Lokasi</Text>

        <View style={styles.mapBox}>
          <Ionicons name="map-outline" size={40} color="#999" />
          {selectedLocation && (
            <Text>
              {selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)}
            </Text>
          )}
        </View>

        {/* 🔥 TOMBOL YANG SAMA (TIDAK Nambah) */}
        <TouchableOpacity style={styles.mapBtn} onPress={pilihLokasi}>
          <Text style={{ color: '#fff' }}>Pilih Lokasi</Text>
        </TouchableOpacity>

        {/* SUBMIT */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Kirim Laporan</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default HalamanLapor;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  header: {
    backgroundColor: '#2C3E50',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },

  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  scroll: { padding: 15 },

  label: {
    fontWeight: '700',
    marginTop: 15,
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },

  uploadRow: {
    flexDirection: 'row',
    gap: 10,
  },

  uploadBtn: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },

  counter: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#999',
  },

  mediaItem: {
    width: (Dimensions.get('window').width - 60) / 3,
    height: 100,
    margin: 5,
  },

  mediaImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },

  removeBtn: {
    position: 'absolute',
    top: -5,
    right: -5,
  },

  mapBox: {
    height: 150,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  mapBtn: {
    backgroundColor: '#2C3E50',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },

  submitBtn: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },

  submitText: {
    fontWeight: '700',
    color: '#fff',
  },
});