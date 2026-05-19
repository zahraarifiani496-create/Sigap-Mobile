/**
 * AuthContext.js
 *
 * Global authentication context.
 * Stores: isAuthenticated, userRole, user object, isLoading.
 * Exposes: login(), logout(), restoreSession().
 *
 * userRole: 'masyarakat' | 'petugas'
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'masyarakat' | 'petugas'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // true while restoring session

  // ── Restore session on app launch ─────────────────────────────────────
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const storedUser = await AsyncStorage.getItem('user');
        if (token && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setUserRole(parsedUser.role); // role comes from Laravel API response
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  // ── Login ──────────────────────────────────────────────────────────────
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      const { token, user: loggedInUser } = response.data;

      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(loggedInUser));

      setUser(loggedInUser);
      setUserRole(loggedInUser.role); // 'masyarakat' or 'petugas'
      setIsAuthenticated(true);
    } catch (error) {
      throw error; // Let calling screen handle the error message
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Logout ─────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (_) {
      // Silently fail — always clear local state
    } finally {
      await AsyncStorage.multiRemove(['authToken', 'user']);
      setUser(null);
      setUserRole(null);
      setIsAuthenticated(false);
    }
  }, []);

  const value = {
    user,
    userRole,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for easy consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }
  return context;
};

export default AuthContext;
