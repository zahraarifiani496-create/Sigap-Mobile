/**
 * services/laporanService.js
 * Semua API call yang berkaitan dengan laporan infrastruktur.
 *
 * Endpoints Laravel:
 *   GET    /api/laporan              → Daftar laporan milik user (masyarakat)
 *   GET    /api/laporan/semua        → Daftar semua laporan (pegawai)
 *   GET    /api/laporan/:id          → Detail laporan
 *   POST   /api/laporan              → Buat laporan baru (multipart: ada foto)
 *   PATCH  /api/laporan/:id/status   → Update status (pegawai)
 *   DELETE /api/laporan/:id          → Hapus laporan
 *   GET    /api/laporan/filter       → Filter by kategori/status/bidang
 */

import api from './api';

const laporanService = {

  /**
   * Ambil daftar laporan milik user yang login (Masyarakat)
   * @param {{ page?, status?, search? }} params
   */
  getDaftarMilikSaya: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page)   query.append('page',   params.page);
    if (params.status) query.append('status', params.status);
    if (params.search) query.append('search', params.search);

    const qs = query.toString() ? `?${query.toString()}` : '';
    return await api.get(`/laporan${qs}`);
    // Response: { data: [...], meta: { total, current_page, last_page } }
  },

  /**
   * Ambil semua laporan (khusus Pegawai) dengan filter
   * @param {{ page?, status?, bidang?, kategori?, search? }} params
   */
  getDaftarSemua: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page)     query.append('page',     params.page);
    if (params.status)   query.append('status',   params.status);
    if (params.bidang)   query.append('bidang',   params.bidang);
    if (params.kategori) query.append('kategori', params.kategori);
    if (params.search)   query.append('search',   params.search);

    const qs = query.toString() ? `?${query.toString()}` : '';
    return await api.get(`/laporan/semua${qs}`);
  },

  /**
   * Detail satu laporan
   * @param {number|string} id
   */
  getDetail: async (id) => {
    return await api.get(`/laporan/${id}`);
  },

  /**
   * Buat laporan baru (dengan foto & GPS)
   * @param {{
   *   judul:      string,
   *   deskripsi:  string,
   *   kategori:   string,
   *   latitude:   number,
   *   longitude:  number,
   *   alamat:     string,
   *   foto:       Array<{ uri, name, type }>  (dari expo-image-picker)
   * }} data
   */
  buatLaporan: async (data) => {
    const formData = new FormData();

    formData.append('judul',      data.judul);
    formData.append('deskripsi',  data.deskripsi);
    formData.append('kategori',   data.kategori);
    formData.append('latitude',   String(data.latitude));
    formData.append('longitude',  String(data.longitude));
    formData.append('alamat',     data.alamat ?? '');

    // Lampirkan foto (bisa lebih dari 1)
    if (data.foto && data.foto.length > 0) {
      data.foto.forEach((file, index) => {
        formData.append(`foto[${index}]`, {
          uri:  file.uri,
          name: file.name  ?? `foto_${index}.jpg`,
          type: file.type  ?? 'image/jpeg',
        });
      });
    }

    return await api.upload('/laporan', formData);
    // Response: { message, laporan: { id, kode_laporan, ... } }
  },

  /**
   * Update status laporan (Pegawai)
   * @param {number|string} id
   * @param {{ status, catatan_pegawai }} data
   * status: 'menunggu' | 'diproses' | 'selesai' | 'ditolak'
   */
  updateStatus: async (id, data) => {
    return await api.patch(`/laporan/${id}/status`, {
      status:           data.status,
      catatan_pegawai:  data.catatan ?? '',
    });
  },

  /**
   * Update status laporan dan foto (Pegawai)
   * @param {number|string} id
   * @param {{ status, catatan, foto }} data
   */
  updateProgresPegawai: async (id, data) => {
    const formData = new FormData();
    formData.append('status', data.status);
    if (data.catatan) {
      formData.append('catatan', data.catatan);
    }
    
    if (data.foto) {
      formData.append('foto', {
        uri: data.foto.uri,
        name: data.foto.name ?? 'progres.jpg',
        type: data.foto.type ?? 'image/jpeg',
      });
    }

    return await api.upload(`/laporan/${id}/progres-pegawai`, formData);
  },

  /**
   * Hapus laporan (hanya bisa jika status masih 'menunggu')
   * @param {number|string} id
   */
  hapusLaporan: async (id) => {
    return await api.delete(`/laporan/${id}`);
  },

  /**
   * Statistik laporan untuk dashboard pegawai
   */
  getStatistik: async () => {
    return await api.get('/laporan/statistik');
    // Response: { total, menunggu, diproses, selesai, ditolak }
  },

  /**
   * Statistik laporan untuk dashboard khusus pegawai dengan rincian bidang
   */
  getStatistikPegawai: async () => {
    return await api.get('/laporan/statistik/pegawai');
  },

  /**
   * Laporan yang sudah selesai (untuk Hasil Kerja di beranda)
   * Mengambil laporan milik user dengan status selesai
   */
  getLaporanSelesai: async () => {
    return await api.get('/laporan?status=selesai');
    // Response: { data: [...laporan selesai dengan foto_url] }
  },

};

export default laporanService;
