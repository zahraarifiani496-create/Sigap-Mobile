/**
 * types/index.js
 * Shared type definitions (JSDoc) for the entire application.
 * If migrating to TypeScript, convert these to .ts interfaces.
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {'masyarakat'|'petugas'} role
 * @property {string|null} bidang  - Only for petugas
 * @property {string|null} avatar
 */

/**
 * @typedef {Object} Laporan
 * @property {number}  id
 * @property {string}  judul
 * @property {string}  deskripsi
 * @property {string}  bidang       - e.g. 'bina_marga'
 * @property {'pending'|'proses'|'selesai'|'ditolak'} status
 * @property {number}  latitude
 * @property {number}  longitude
 * @property {string[]} foto        - Array of image URLs
 * @property {User}    pelapor
 * @property {string}  created_at
 * @property {string}  updated_at
 * @property {Timeline[]} [timeline]
 */

/**
 * @typedef {Object} Timeline
 * @property {number} id
 * @property {string} status
 * @property {string} catatan
 * @property {User}   petugas
 * @property {string} created_at
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {string}  message
 * @property {*}       data
 * @property {Object}  [meta]      - Pagination meta
 */
