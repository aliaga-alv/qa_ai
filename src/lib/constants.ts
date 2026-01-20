// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export const APP_NAME = 'QA AI Automation Tool';
export const APP_VERSION = '1.0.0';

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  THEME: 'theme',
  USER: 'user',
} as const;
