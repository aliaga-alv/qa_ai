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
  DOCS: '/docs',
  FEATURES: '/#features',
  
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  
  // Protected routes - Dashboard
  DASHBOARD: '/dashboard',
  DASHBOARD_TESTS: '/dashboard/tests',
  DASHBOARD_TEST_NEW: '/dashboard/tests/new',
  DASHBOARD_TEST_DETAIL: (id: string) => `/dashboard/tests/${id}`,
  DASHBOARD_RUN: '/dashboard/run',
  DASHBOARD_ANALYTICS: '/dashboard/analytics',
  DASHBOARD_HISTORY: '/dashboard/history',
  DASHBOARD_INTEGRATIONS: '/dashboard/integrations',
  DASHBOARD_TEAM: '/dashboard/team',
  DASHBOARD_SETTINGS: '/dashboard/settings',
  DASHBOARD_PROFILE: '/dashboard/profile',
  
  // Legal
  TERMS: '/terms',
  PRIVACY: '/privacy',
} as const;
