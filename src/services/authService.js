/**
 * authService.js
 * API calls related to authentication (Laravel Sanctum / Passport).
 */

import api from './api';

export const authService = {
  /**
   * Login with email/password.
   * POST /api/auth/login
   * Response: { token: string, user: { id, name, email, role, bidang? } }
   */
  login: (credentials) => api.post('/auth/login', credentials),

  /**
   * Register a new masyarakat account.
   * POST /api/auth/register
   */
  register: (data) => api.post('/auth/register', data),

  /**
   * Logout and revoke the current token.
   * POST /api/auth/logout
   */
  logout: () => api.post('/auth/logout'),

  /**
   * Get the authenticated user's profile.
   * GET /api/auth/me
   */
  getProfile: () => api.get('/auth/me'),

  /**
   * Request password reset link.
   * POST /api/auth/forgot-password
   */
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
};
