/**
 * UI-related constants for component styling and configuration
 */

export const STATUS_COLORS = {
  success: {
    bg: 'bg-green-100 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-500',
  },
  error: {
    bg: 'bg-red-100 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-500',
  },
  warning: {
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-500',
  },
  info: {
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500',
  },
  pending: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/20',
    text: 'text-yellow-600 dark:text-yellow-400',
    border: 'border-yellow-500',
  },
  running: {
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500',
  },
  passed: {
    bg: 'bg-green-100 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-500',
  },
  failed: {
    bg: 'bg-red-100 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-500',
  },
} as const;

export const TEST_TYPE_COLORS = {
  api: {
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
  },
  e2e: {
    bg: 'bg-purple-100 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
  },
  unit: {
    bg: 'bg-green-100 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
  },
  integration: {
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    text: 'text-orange-600 dark:text-orange-400',
  },
} as const;

export const ROLE_COLORS = {
  admin: {
    bg: 'bg-purple-100 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
  },
  owner: {
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
  },
  member: {
    bg: 'bg-green-100 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
  },
  viewer: {
    bg: 'bg-gray-100 dark:bg-gray-700',
    text: 'text-gray-600 dark:text-gray-400',
  },
} as const;

export const LOG_LEVEL_COLORS = {
  info: 'text-blue-600 dark:text-blue-400',
  warn: 'text-orange-600 dark:text-orange-400',
  warning: 'text-orange-600 dark:text-orange-400',
  error: 'text-red-600 dark:text-red-400',
  debug: 'text-gray-600 dark:text-gray-400',
  success: 'text-green-600 dark:text-green-400',
} as const;

export const CHANGELOG_CATEGORY_COLORS = {
  feature: {
    bg: 'bg-green-100 dark:bg-green-900/20',
    text: 'text-green-700 dark:text-green-400',
  },
  improvement: {
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    text: 'text-blue-700 dark:text-blue-400',
  },
  fix: {
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    text: 'text-orange-700 dark:text-orange-400',
  },
  security: {
    bg: 'bg-red-100 dark:bg-red-900/20',
    text: 'text-red-700 dark:text-red-400',
  },
} as const;

export const CHANGELOG_TYPE_COLORS = {
  new: 'text-green-600 dark:text-green-400',
  improved: 'text-blue-600 dark:text-blue-400',
  fixed: 'text-orange-600 dark:text-orange-400',
} as const;

export const SPINNER_SIZE_CLASSES = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
} as const;

export const SPINNER_VARIANT_CLASSES = {
  primary: 'text-primary-600',
  secondary: 'text-gray-600',
  white: 'text-white',
} as const;

export const AI_INSIGHT_TYPE_CONFIG = {
  success: {
    bg: 'bg-green-50 dark:bg-green-900/10',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-900 dark:text-green-100',
  },
  warning: {
    bg: 'bg-orange-50 dark:bg-orange-900/10',
    border: 'border-orange-200 dark:border-orange-800',
    text: 'text-orange-900 dark:text-orange-100',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-900 dark:text-blue-100',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/10',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-900 dark:text-red-100',
  },
} as const;

export const EXECUTION_STATUS_CONFIG = {
  passed: {
    bg: 'bg-green-50 dark:bg-green-900/10',
    text: 'text-green-700 dark:text-green-400',
    icon: 'text-green-600 dark:text-green-400',
  },
  failed: {
    bg: 'bg-red-50 dark:bg-red-900/10',
    text: 'text-red-700 dark:text-red-400',
    icon: 'text-red-600 dark:text-red-400',
  },
  running: {
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    text: 'text-blue-700 dark:text-blue-400',
    icon: 'text-blue-600 dark:text-blue-400',
  },
  stopped: {
    bg: 'bg-gray-50 dark:bg-gray-900/10',
    text: 'text-gray-700 dark:text-gray-400',
    icon: 'text-gray-600 dark:text-gray-400',
  },
  pending: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/10',
    text: 'text-yellow-700 dark:text-yellow-400',
    icon: 'text-yellow-600 dark:text-yellow-400',
  },
} as const;

export const TEAM_ROLE_CONFIG = {
  owner: {
    label: 'Owner',
    description: 'Full access to all features',
  },
  admin: {
    label: 'Admin',
    description: 'Manage team and settings',
  },
  member: {
    label: 'Member',
    description: 'Create and run tests',
  },
  viewer: {
    label: 'Viewer',
    description: 'View-only access',
  },
} as const;

export const CHANGELOG_ENTRY_CATEGORY_COLORS = {
  New: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  Improved: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  Fixed: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  Removed: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
} as const;

export const CHANGELOG_ENTRY_TYPE_COLORS = {
  major: 'bg-gradient-to-r from-purple-600 to-pink-600',
  minor: 'bg-gradient-to-r from-blue-600 to-cyan-600',
  patch: 'bg-gradient-to-r from-gray-600 to-gray-700',
} as const;

export const TEST_STATUS_COLORS = {
  passed: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20',
  failed: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20',
  running: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20',
} as const;

/**
 * Error message variant styles
 */
export const ERROR_MESSAGE_VARIANT_STYLES = {
  error: {
    container: 'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800',
    icon: 'text-error-500',
    title: 'text-error-900 dark:text-error-100',
    message: 'text-error-700 dark:text-error-300',
  },
  warning: {
    container: 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800',
    icon: 'text-warning-500',
    title: 'text-warning-900 dark:text-warning-100',
    message: 'text-warning-700 dark:text-warning-300',
  },
  info: {
    container: 'bg-info-50 dark:bg-info-900/20 border-info-200 dark:border-info-800',
    icon: 'text-info-500',
    title: 'text-info-900 dark:text-info-100',
    message: 'text-info-700 dark:text-info-300',
  },
} as const;

/**
 * Notification type configurations
 */
export const NOTIFICATION_TYPE_CONFIG = {
  success: {
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/20',
  },
  error: {
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/20',
  },
  warning: {
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-900/20',
  },
  info: {
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/20',
  },
} as const;

/**
 * AI Insights type configuration
 */
export const AI_INSIGHTS_TYPE_CONFIG = {
  success: {
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    textColor: 'text-green-700 dark:text-green-400',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  error: {
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    textColor: 'text-red-700 dark:text-red-400',
    iconColor: 'text-red-600 dark:text-red-400',
  },
  warning: {
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    textColor: 'text-orange-700 dark:text-orange-400',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  info: {
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-700 dark:text-blue-400',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
} as const;

/**
 * Test execution status configuration
 */
export const TEST_EXECUTION_STATUS_CONFIG = {
  pending: {
    color: 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700',
    label: 'Pending',
  },
  queued: {
    color: 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700',
    label: 'Queued',
  },
  running: {
    color: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20',
    label: 'Running',
  },
  passed: {
    color: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20',
    label: 'Passed',
  },
  failed: {
    color: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20',
    label: 'Failed',
  },
  stopped: {
    color: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20',
    label: 'Stopped',
  },
  cancelled: {
    color: 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700',
    label: 'Cancelled',
  },
} as const;

/**
 * History list status configuration with icons
 */
export const HISTORY_STATUS_CONFIG = {
  passed: {
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/20',
    label: 'Passed',
  },
  failed: {
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/20',
    label: 'Failed',
  },
  running: {
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    label: 'Running',
  },
  stopped: {
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    label: 'Stopped',
  },
} as const;

/**
 * Team member role configuration with icons
 */
export const TEAM_MEMBER_ROLE_CONFIG = {
  owner: {
    color: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-100 dark:bg-yellow-900/20',
    label: 'Owner',
  },
  admin: {
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-900/20',
    label: 'Admin',
  },
  member: {
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    label: 'Member',
  },
  viewer: {
    color: 'text-gray-600 dark:text-gray-400',
    bg: 'bg-gray-100 dark:bg-gray-700',
    label: 'Viewer',
  },
} as const;

/**
 * Test list item status colors
 */
export const TEST_LIST_STATUS_COLORS = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  draft: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
} as const;

/**
 * Test list item type colors
 */
export const TEST_LIST_TYPE_COLORS = {
  api: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  ui: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
  integration: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
  unit: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400',
} as const;

