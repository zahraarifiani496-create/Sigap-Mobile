/**
 * context/AuthContext.js
 * Central authentication context for Sigap-Mobile.
 *
 * Manages:
 *   - isAuthenticated  : boolean
 *   - isLoading        : boolean (true while restoring session from AsyncStorage)
 *   - userRole         : 'masyarakat' | 'pegawai' | null
 *   - user             : full user object from Laravel API
 *
 * The login() function is wired for a real Laravel Sanctum/Passport backend.
 * Replace API_URL with your actual Laravel server address.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// Ganti IP ini dengan IP laptop kamu saat testing di HP fisik.
// Contoh: 'http://192.168.1.100:8000/api'
const API_URL = __DEV__
  ? 'http://192.168.1.100:8000/api'   // ← ganti dengan IP laptop kamu
  : 'https://api.sigap-pupr.id/api';  // ← URL produksi

const STORAGE_KEYS = {
  TOKEN: 'sigap_auth_token',
  USER:  'sigap_user',
};

// ─── CONTEXT CREATION ─────────────────────────────────────────────────────────
const AuthContext = createContext(null);

// ─── PROVIDER ─────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [user,            setUser]            = useState(null);
  const [userRole,        setUserRole]        = useState(null); // 'masyarakat' | 'pegawai'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading,       setIsLoading]       = useState(true); // true while reading AsyncStorage

  // ── Restore session on app launch ─────────────────────────────────────────
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token       = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
        const storedUser  = await AsyncStorage.getItem(STORAGE_KEYS.USER);

        // Tolak mock tokens (tidak valid untuk sesi persisten)
        // Mock login sekarang tidak menyimpan ke storage, jadi ini
        // membersihkan sisa token lama dari versi sebelumnya.
        if (token && token.startsWith('mock-token-')) {
          await AsyncStorage.multiRemove([STORAGE_KEYS.TOKEN, STORAGE_KEYS.USER]);
          return; // Tidak restore sesi, akan redirect ke login
        }

        if (token && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setUserRole(parsedUser.role);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.warn('[AuthContext] Gagal memulihkan sesi:', error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  // ── Login ─────────────────────────────────────────────────────────────────
  /**
   * Mode simulasi aktif (tidak butuh backend).
   * Untuk menghubungkan ke Laravel: comment blok mock, uncomment blok fetch di bawah.
   */
  const login = useCallback(async (credentials) => {
    // ── SIMULASI (aktif saat API belum siap) ────────────────────────────────
    // Mock login TIDAK menyimpan ke AsyncStorage supaya setiap reload
    // selalu mulai dari halaman login (memudahkan testing).
    // Saat API Laravel siap, gunakan blok fetch di bawah.
    const mockUser = {
      id:    1,
      name:  credentials.username,
      email: credentials.username + '@sigap.id',
      role:  'masyarakat', // Ganti ke 'pegawai' untuk tes flow pegawai
    };

    // Update state saja — tidak persist ke storage
    setUser(mockUser);
    setUserRole(mockUser.role);
    setIsAuthenticated(true);
    return mockUser;

    // ── API LARAVEL (aktifkan ketika backend sudah siap) ────────────────────
    /*
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':       'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login gagal. Periksa username dan password.');
      }

      const { token, user: loggedInUser } = data;

      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(loggedInUser));

      setUser(loggedInUser);
      setUserRole(loggedInUser.role); // 'masyarakat' atau 'pegawai'
      setIsAuthenticated(true);

      return loggedInUser;
    } catch (error) {
      throw error;
    }
    */
  }, []);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      // Hapus dari storage (jika ada sesi yang dipersist)
      await AsyncStorage.multiRemove([STORAGE_KEYS.TOKEN, STORAGE_KEYS.USER]);
    } catch (e) {
      console.warn('[AuthContext] Gagal hapus storage saat logout:', e);
    } finally {
      // Reset semua state auth
      setUser(null);
      setUserRole(null);
      setIsAuthenticated(false);
      // Navigasi ke login ditangani oleh pemanggil (profil.js)
    }
  }, []);

  // ── Get stored token ───────────────────────────────────────────────────────
  const getToken = useCallback(async () => {
    return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
  }, []);

  const value = {
    user,
    userRole,
    isAuthenticated,
    isLoading,
    login,
    logout,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ─── HOOK ─────────────────────────────────────────────────────────────────────
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth() harus digunakan di dalam <AuthProvider>');
  }
  return context;
};

export default AuthContext;
