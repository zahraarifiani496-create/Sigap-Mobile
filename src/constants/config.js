// constants/config.js
// App-wide configuration constants

// ── API ────────────────────────────────────────────────────────────────────
export const API_BASE_URL = __DEV__
  ? 'http://192.168.1.100:8000/api'   // Local development (change to your machine IP)
  : 'https://api.sigap-pupr.id/api';  // Production

// ── Report Categories (Bidang) ─────────────────────────────────────────────
export const BIDANG_OPTIONS = [
  { label: 'Bina Marga',      value: 'bina_marga' },
  { label: 'Cipta Karya',     value: 'cipta_karya' },
  { label: 'Sumber Daya Air', value: 'sumber_daya_air' },
  { label: 'Tata Ruang',      value: 'tata_ruang' },
];

// ── Report Status ──────────────────────────────────────────────────────────
export const STATUS_OPTIONS = [
  { label: 'Menunggu',   value: 'pending' },
  { label: 'Diproses',   value: 'proses' },
  { label: 'Selesai',    value: 'selesai' },
  { label: 'Ditolak',    value: 'ditolak' },
];

// ── User Roles ─────────────────────────────────────────────────────────────
export const USER_ROLES = {
  MASYARAKAT: 'masyarakat',
  PETUGAS: 'petugas',
};

// ── Image Upload ───────────────────────────────────────────────────────────
export const MAX_IMAGES = 3;
export const IMAGE_QUALITY = 0.7;
