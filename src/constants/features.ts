import { Shield, Users, CreditCard, Bell, Database, Key, Sparkles, Code, Upload, Settings as SettingsIcon, Save, GitBranch, Gauge } from 'lucide-react';

/**
 * Settings page features
 */
export const SETTINGS_FEATURES = [
  {
    icon: Users,
    title: 'Profile',
    description: 'Manage your personal information and preferences',
    href: '/dashboard/settings/profile',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Update password and manage authentication',
    href: '/dashboard/settings/security',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Configure email and push notifications',
    href: '/dashboard/settings/notifications',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: CreditCard,
    title: 'Billing',
    description: 'Manage subscription and payment methods',
    href: '/dashboard/settings/billing',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Key,
    title: 'API Keys',
    description: 'Generate and manage API access tokens',
    href: '/dashboard/settings/api',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Database,
    title: 'Data & Privacy',
    description: 'Control your data and privacy settings',
    href: '/dashboard/settings/privacy',
    color: 'from-gray-500 to-slate-500',
  },
];

/**
 * Test creation page features
 */
export const CREATE_TEST_FEATURES = [
  {
    icon: Sparkles,
    title: 'AI-Powered Generation',
    description: 'Use AI to automatically generate test cases from your requirements',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
  },
  {
    icon: Code,
    title: 'Custom Scripts',
    description: 'Write custom test scripts with full control over assertions',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
  },
  {
    icon: Upload,
    title: 'Import Tests',
    description: 'Import existing test files from your project or other tools',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
  },
  {
    icon: SettingsIcon,
    title: 'Test Configuration',
    description: 'Configure test parameters, environment variables, and assertions',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
  },
];

/**
 * Test editing page features
 */
export const EDIT_TEST_FEATURES = [
  {
    icon: Code,
    title: 'Visual test editor',
    description: 'Intuitive interface for writing and modifying tests',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
  },
  {
    icon: Save,
    title: 'Version history tracking',
    description: 'Track changes and rollback to previous versions',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
  },
  {
    icon: Sparkles,
    title: 'Collaborative editing',
    description: 'Work together with your team in real-time',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
  },
  {
    icon: SettingsIcon,
    title: 'Live preview mode',
    description: 'See test results as you type',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
  },
  {
    icon: GitBranch,
    title: 'Advanced debugging tools',
    description: 'Powerful tools to troubleshoot test failures',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/20',
  },
  {
    icon: Gauge,
    title: 'Performance optimization tips',
    description: 'Get suggestions to make your tests faster',
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/20',
  },
];
