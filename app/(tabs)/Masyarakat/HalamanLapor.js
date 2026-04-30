import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const HalamanLapor = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const userLocation = await Location.getCurrentPositionAsync({});
        setSelectedLocation({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });
      }
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  const pickImage = async (source) => {
    try {
      let result;
      if (source === 'camera') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (permission.granted) {
          result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
          });
        }
      } else {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.granted) {
          result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
          });
        }
      }

      if (!result.cancelled && result.assets) {
        if (photos.length < 5) {
          setPhotos([...photos, result.assets[0].uri]);
        } else {
          Alert.alert('Error', 'Maksimal 5 foto');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal mengambil foto');
    }
  };

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Silahkan isi deskripsi masalah');
      return;
    }

    if (photos.length === 0) {
      Alert.alert('Error', 'Silahkan upload minimal 1 foto');
      return;
    }

    if (!selectedLocation) {
      Alert.alert('Error', 'Silahkan pilih lokasi');
      return;
    }

    Alert.alert('Sukses', 'Laporan berhasil dikirim!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('HalamanTerkirim'),
      },
    ]);
  };

  const renderPhotoItem = ({ item, index }) => (
    <View style={styles.photoItemContainer}>
      <Image source={{ uri: item }} style={styles.photoItem} />
      <TouchableOpacity
        style={styles.removePhotoButton}
        onPress={() => removePhoto(index)}
      >
        <Ionicons name="close-circle" size={24} color="#FF6B6B" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kirim Laporan Baru</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Section 1: Deskripsi Masalah */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionNumber}>1.</Text>
            <Text style={styles.sectionTitle}>Deskripsi Masalah</Text>
          </View>

          <TextInput
            style={styles.descriptionInput}
            placeholder="Jalan berlubang parah di jln..."
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
          />
        </View>

        {/* Section 2: Unggah Foto/Video */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionNumber}>2.</Text>
            <Text style={styles.sectionTitle}>Unggah Foto/Video</Text>
          </View>

          <View style={styles.uploadButtonsContainer}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => pickImage('camera')}
            >
              <Ionicons name="camera" size={24} color="#2C3E50" />
              <Text style={styles.uploadButtonText}>Kamera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => pickImage('gallery')}
            >
              <Ionicons name="image" size={24} color="#2C3E50" />
              <Text style={styles.uploadButtonText}>Galeri</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadButton}>
              <Ionicons name="videocam" size={24} color="#2C3E50" />
              <Text style={styles.uploadButtonText}>Video</Text>
            </TouchableOpacity>
          </View>

          {/* Photo Preview */}
          {photos.length > 0 && (
            <View style={styles.photoPreviewContainer}>
              <FlatList
                data={photos}
                renderItem={renderPhotoItem}
                keyExtractor={(_, index) => index.toString()}
                numColumns={3}
                scrollEnabled={false}
                columnWrapperStyle={styles.photoGrid}
              />
            </View>
          )}

          <Text style={styles.photoCount}>
            {photos.length}/5 foto terupload
          </Text>
        </View>

        {/* Section 3: Lokasi */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionNumber}>3.</Text>
            <Text style={styles.sectionTitle}>Lokasi</Text>
          </View>

          {/* Map Placeholder */}
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map" size={60} color="#ccc" />
            <Text style={styles.mapPlaceholderText}>Peta Lokasi Laporan</Text>
            {selectedLocation && (
              <Text style={styles.coordinatesText}>
                {selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.selectLocationButton}
            onPress={() => setShowLocationModal(true)}
          >
            <Ionicons name="navigate" size={20} color="#fff" />
            <Text style={styles.selectLocationButtonText}>
              {selectedLocation ? 'Ubah Lokasi' : 'Pilih Lokasi'}
            </Text>
          </TouchableOpacity>

          {selectedLocation && (
            <View style={styles.locationInfo}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.locationInfoText}>
                Lokasi terpilih: {selectedLocation.latitude.toFixed(6)}, {selectedLocation.longitude.toFixed(6)}
              </Text>
            </View>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Kirim Laporan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Kembali Ke Beranda</Text>
        </TouchableOpacity>
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 13,
    color: '#333',
    textAlignVertical: 'top',
  },
  uploadButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10,
  },
  uploadButton: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    marginTop: 5,
  },
  photoPreviewContainer: {
    marginBottom: 10,
  },
  photoGrid: {
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  photoItemContainer: {
    width: (Dimensions.get('window').width - 60) / 3,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  photoItem: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  photoCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  mapPlaceholder: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  mapPlaceholderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  coordinatesText: {
    fontSize: 11,
    color: '#999',
    marginTop: 5,
  },
  selectLocationButton: {
    backgroundColor: '#2C3E50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectLocationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  locationInfo: {
    backgroundColor: '#E8F5E9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  locationInfoText: {
    fontSize: 12,
    color: '#2E7D32',
    marginLeft: 8,
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  backButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#2C3E50',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
});

export default HalamanLapor;