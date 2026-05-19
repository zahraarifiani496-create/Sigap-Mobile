// utils/formatters.js
// Date, status, and text formatting helpers

/**
 * Format a date string into Indonesian locale format.
 * e.g. "2024-05-12T10:30:00Z" → "12 Mei 2024, 10.30"
 */
export const formatTanggal = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format a report status value to a human-readable Indonesian label.
 */
const STATUS_LABELS = {
  pending: 'Menunggu',
  proses: 'Diproses',
  selesai: 'Selesai',
  ditolak: 'Ditolak',
};

export const formatStatus = (status) => STATUS_LABELS[status] ?? status;

/**
 * Capitalize the first letter of a string.
 */
export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

/**
 * Truncate a string to a max length with ellipsis.
 */
export const truncate = (str, maxLength = 80) =>
  str && str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
