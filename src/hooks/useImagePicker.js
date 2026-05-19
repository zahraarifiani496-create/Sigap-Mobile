/**
 * useImagePicker.js
 * Custom hook to pick or capture images for laporan submission
 * using expo-image-picker.
 */

import { useState, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { MAX_IMAGES, IMAGE_QUALITY } from '../constants/config';

const useImagePicker = () => {
  const [images, setImages] = useState([]); // Array of { uri, type, name }
  const [error, setError] = useState(null);

  const _processAsset = (asset) => ({
    uri: asset.uri,
    type: 'image/jpeg',
    name: `laporan_${Date.now()}.jpg`,
  });

  const pickFromGallery = useCallback(async () => {
    setError(null);
    if (images.length >= MAX_IMAGES) {
      setError(`Maksimal ${MAX_IMAGES} foto yang dapat dilampirkan.`);
      return;
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setError('Izin akses galeri ditolak.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: MAX_IMAGES - images.length,
      quality: IMAGE_QUALITY,
    });
    if (!result.canceled) {
      setImages((prev) => [...prev, ...result.assets.map(_processAsset)]);
    }
  }, [images]);

  const takePhoto = useCallback(async () => {
    setError(null);
    if (images.length >= MAX_IMAGES) {
      setError(`Maksimal ${MAX_IMAGES} foto yang dapat dilampirkan.`);
      return;
    }
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      setError('Izin akses kamera ditolak.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: IMAGE_QUALITY });
    if (!result.canceled) {
      setImages((prev) => [...prev, _processAsset(result.assets[0])]);
    }
  }, [images]);

  const removeImage = useCallback((uri) => {
    setImages((prev) => prev.filter((img) => img.uri !== uri));
  }, []);

  const clearImages = useCallback(() => setImages([]), []);

  return { images, error, pickFromGallery, takePhoto, removeImage, clearImages };
};

export default useImagePicker;
