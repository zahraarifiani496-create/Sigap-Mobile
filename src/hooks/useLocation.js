/**
 * useLocation.js
 * Custom hook to get the device's current GPS coordinates
 * using expo-location.
 */

import { useState, useCallback } from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
  const [location, setLocation] = useState(null); // { latitude, longitude, accuracy }
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Izin lokasi ditolak. Aktifkan lokasi di pengaturan perangkat.');
        return null;
      }
      const coords = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const result = {
        latitude: coords.coords.latitude,
        longitude: coords.coords.longitude,
        accuracy: coords.coords.accuracy,
      };
      setLocation(result);
      return result;
    } catch (err) {
      setError('Gagal mendapatkan lokasi. Coba lagi.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { location, isLoading, error, getCurrentLocation };
};

export default useLocation;
