/**
 * LaporanContext.js
 *
 * Context for managing laporan (report) state shared across both roles.
 * - Masyarakat: submit, view own reports
 * - Petugas: view all reports, filter by bidang, update status
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { laporanService } from '../../services/laporanService';

// ── State Shape ────────────────────────────────────────────────────────────
const initialState = {
  laporanList: [],
  selectedLaporan: null,
  isLoading: false,
  error: null,
  filters: {
    bidang: null,      // e.g. 'Bina Marga', 'Cipta Karya', 'SDA'
    status: null,      // e.g. 'pending', 'proses', 'selesai'
  },
};

// ── Reducer ────────────────────────────────────────────────────────────────
const laporanReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, laporanList: action.payload };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'SELECT_LAPORAN':
      return { ...state, selectedLaporan: action.payload };
    case 'ADD_LAPORAN':
      return { ...state, laporanList: [action.payload, ...state.laporanList] };
    case 'UPDATE_STATUS':
      return {
        ...state,
        laporanList: state.laporanList.map((item) =>
          item.id === action.payload.id ? { ...item, status: action.payload.status } : item
        ),
      };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'CLEAR_FILTERS':
      return { ...state, filters: initialState.filters };
    default:
      return state;
  }
};

// ── Context ────────────────────────────────────────────────────────────────
const LaporanContext = createContext(null);

export const LaporanProvider = ({ children }) => {
  const [state, dispatch] = useReducer(laporanReducer, initialState);

  const fetchLaporan = useCallback(async (params = {}) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await laporanService.getAll(params);
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  }, []);

  const submitLaporan = useCallback(async (formData) => {
    const response = await laporanService.create(formData);
    dispatch({ type: 'ADD_LAPORAN', payload: response.data });
    return response.data;
  }, []);

  const updateStatus = useCallback(async (id, status, catatan = '') => {
    const response = await laporanService.updateStatus(id, { status, catatan });
    dispatch({ type: 'UPDATE_STATUS', payload: { id, status } });
    return response.data;
  }, []);

  const setFilter = useCallback((filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  const selectLaporan = useCallback((laporan) => {
    dispatch({ type: 'SELECT_LAPORAN', payload: laporan });
  }, []);

  const value = {
    ...state,
    fetchLaporan,
    submitLaporan,
    updateStatus,
    setFilter,
    selectLaporan,
  };

  return <LaporanContext.Provider value={value}>{children}</LaporanContext.Provider>;
};

export const useLaporan = () => {
  const context = useContext(LaporanContext);
  if (!context) throw new Error('useLaporan must be used within a <LaporanProvider>');
  return context;
};

export default LaporanContext;
