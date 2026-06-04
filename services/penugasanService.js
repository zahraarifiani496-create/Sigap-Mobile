/**
 * services/penugasanService.js
 * Semua API call khusus untuk Pekerja Lapangan (UPTD).
 *
 * Endpoints Laravel:
 *   GET  /api/pekerja/tugas              → Daftar tugas milik pekerja yang login
 *   GET  /api/pekerja/tugas/:id          → Detail satu penugasan + bukti progres
 *   POST /api/pekerja/tugas/:id/survei   → Submit hasil survei lapangan
 *   POST /api/pekerja/tugas/:id/progres  → Upload foto/video bukti progres
 */

import api from './api';

const penugasanService = {

  /**
   * Ambil daftar tugas milik pekerja yang sedang login.
   * Data sudah difilter di server berdasarkan id_pekerja = auth user.
   *
   * @param {{ status?: string, per_page?: number, page?: number }} params
   * status: 'ditugaskan' | 'survei_selesai' | 'ditunda' | 'dikerjakan' |
   *         'menunggu_review' | 'revisi' | 'selesai' | 'terkendala'
   */
  getDaftarTugas: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.status)   query.append('status',   params.status);
    if (params.per_page) query.append('per_page', params.per_page);
    if (params.page)     query.append('page',     params.page);

    const qs = query.toString() ? `?${query.toString()}` : '';
    return await api.get(`/pekerja/tugas${qs}`);
    // Response: { success, message, data: [...], meta: { total, per_page, current_page, last_page } }
  },

  /**
   * Detail satu penugasan beserta bukti progres yang sudah diunggah.
   * @param {number|string} id - ID penugasan
   */
  getDetailTugas: async (id) => {
    return await api.get(`/pekerja/tugas/${id}`);
  },

  /**
   * Submit hasil survei lapangan.
   * Otomatis mengubah status_tugas menjadi 'survei_selesai'.
   *
   * @param {number|string} id - ID penugasan
   * @param {{
   *   status_validitas_survei: 'valid' | 'tidak_valid',
   *   deskripsi_temuan_survei: string,
   *   rekomendasi_survei?:     string,
   * }} data
   */
  submitSurvei: async (id, data) => {
    return await api.post(`/pekerja/tugas/${id}/survei`, {
      status_validitas_survei: data.status_validitas_survei,
      deskripsi_temuan_survei: data.deskripsi_temuan_survei,
      rekomendasi_survei:      data.rekomendasi_survei ?? null,
    });
  },

  /**
   * Upload file bukti progres (foto atau video).
   * Maksimal 5 file per penugasan (foto + video dihitung bersama).
   *
   * @param {number|string} id - ID penugasan
   * @param {{
   *   file:       { uri: string, name: string, type: string },
   *   tipe_file?: 'foto' | 'video',   (auto-detect jika tidak diisi)
   *   keterangan?: string,
   * }} data
   */
  uploadBuktiProgres: async (id, data) => {
    const formData = new FormData();

    formData.append('file', {
      uri:  data.file.uri,
      name: data.file.name ?? 'bukti.jpg',
      type: data.file.type ?? 'image/jpeg',
    });

    if (data.tipe_file)  formData.append('tipe_file',  data.tipe_file);
    if (data.keterangan) formData.append('keterangan', data.keterangan);

    return await api.upload(`/pekerja/tugas/${id}/progres`, formData);
    // Response: { message, bukti: { id, file_url, tipe_file, ... }, sisa_slot }
  },

  /**
   * Update status dan progres penugasan secara manual (untuk status lain seperti dikerjakan, terkendala, selesai).
   *
   * @param {number|string} id - ID penugasan
   * @param {{
   *   status:          string,
   *   progres_persen?: number,
   *   alasan_penundaan?: string,
   * }} data
   */
  updateStatus: async (id, data) => {
    return await api.patch(`/pekerja/tugas/${id}/status`, {
      status:           data.status,
      progres_persen:   data.progres_persen,
      alasan_penundaan: data.alasan_penundaan,
    });
  },

};

export default penugasanService;
