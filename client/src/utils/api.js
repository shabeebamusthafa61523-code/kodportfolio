// Centralized API Base URL Resolver for Local Dev & Production (Render + Vercel)
// In local development, VITE_API_URL is empty, so Vite proxies '/api' to localhost:5000.
// On Vercel, set VITE_API_URL to your Render service URL (e.g. https://kodbrand-api.onrender.com).

export const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export const apiUrl = (endpoint = '') => {
  if (!endpoint) return API_BASE;
  const clean = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return API_BASE ? `${API_BASE}${clean}` : clean;
};

export default apiUrl;
