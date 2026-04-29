import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, Image, ScrollView, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HalamanLapor() {

  const router = useRouter();

  const [deskripsi, setDeskripsi] = useState('');
  const [image, setImage] = useState(null);

  const latitude = -6.5715;
  const longitude = 107.7620;

  // 📷 Kamera
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({});
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  // 🖼️ Galeri
  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({});
    if (!result.canceled) setImage(result.assets[0].uri);
  };

 
  const handleKirim = () => {
    if (!deskripsi) {
      Alert.alert('Error', 'Deskripsi belum diisi!');
      return;
    }
    Alert.alert('Sukses', 'Laporan berhasil dikirim');
    router.push('./HalamanTerkirim');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('./HalamanBeranda')}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <Text style={styles.headerText}>Kirim Laporan Baru</Text>
        </View>

        {/* DESKRIPSI */}
        <Text style={styles.label}>1. Deskripsi Masalah</Text>
        <TextInput
          placeholder="Deskripsikan Masalah..."
          style={styles.textArea}
          multiline
          value={deskripsi}
          onChangeText={setDeskripsi}
        />

        {/* UPLOAD */}
        <Text style={styles.label}>2. Unggah Foto/Video</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.box} onPress={openCamera}>
            <Ionicons name="camera" size={28} />
            <Text>Kamera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={openGallery}>
            <Ionicons name="images" size={28} />
            <Text>Galeri</Text>
          </TouchableOpacity>

          {image && (
            <Image source={{ uri: image }} style={styles.preview} />
          )}
        </View>

        {/* MAP */}
        <Text style={styles.label}>3. Lokasi</Text>

        <View style={styles.mapContainer}>
          <WebView
            style={{ flex: 1 }}
            source={{
              html: `
                <iframe
                  width="100%"
                  height="100%"
                  src="https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed"
                ></iframe>
              `
            }}
          />
        </View>

        
        <TouchableOpacity style={styles.btn} onPress={handleKirim}>
          <Text style={styles.btnText}>Kirim Laporan</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4' },

  header: {
    backgroundColor: '#3E4A73',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },

  label: {
    margin: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },

  textArea: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 15,
    height: 100,
  },

  row: {
    flexDirection: 'row',
    marginHorizontal: 15,
    alignItems: 'center',
  },

  box: {
    backgroundColor: '#EDEDED',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
    width: 90,
  },

  preview: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },

  mapContainer: {
    height: 200,
    margin: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },

  btn: {
    backgroundColor: '#2B3990',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});