/**
 * Application route constants
 */

// Public routes
export const ROUTES = {
  HOME: '/',
  PRICING: '/pricing',
  ABOUT: '/about',
  CAREERS: '/careers',
  CONTACT: '/contact',
  BLOG: '/blog',
  CHANGELOG: '/changelog',
  FEATURES: '/#features',
  
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  TESTS: '/tests',
  TEST_DETAIL: (id: string) => `/tests/${id}`,
  TEST_CREATE: '/tests/new',
  PROJECTS: '/projects',
  PROJECT_DETAIL: (id: string) => `/projects/${id}`,
  PROJECT_CREATE: '/projects/new',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  
  // Legal
  TERMS: '/terms',
  PRIVACY: '/privacy',
} as const;
