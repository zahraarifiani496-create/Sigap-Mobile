/**
 * laporanService.js
 * API calls for managing infrastructure reports (laporan).
 */

import api from './api';

export const laporanService = {
  /**
   * Get all laporan (petugas sees all; masyarakat sees own).
   * GET /api/laporan?bidang=&status=&page=
   */
  getAll: (params) => api.get('/laporan', { params }),

  /**
   * Get a single laporan by ID.
   * GET /api/laporan/:id
   */
  getById: (id) => api.get(`/laporan/${id}`),

  /**
   * Submit a new laporan with images and GPS location.
   * POST /api/laporan  (multipart/form-data)
   * Body: judul, deskripsi, bidang, latitude, longitude, foto[]
   */
  create: (formData) =>
    api.post('/laporan', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  /**
   * Update report status (petugas only).
   * PUT /api/laporan/:id/status
   * Body: { status: 'proses'|'selesai'|'ditolak', catatan?: string }
   */
  updateStatus: (id, data) => api.put(`/laporan/${id}/status`, data),

  /**
   * Delete a laporan (admin only).
   * DELETE /api/laporan/:id
   */
  delete: (id) => api.delete(`/laporan/${id}`),

  /**
   * Get laporan status timeline/history.
   * GET /api/laporan/:id/timeline
   */
  getTimeline: (id) => api.get(`/laporan/${id}/timeline`),
};
