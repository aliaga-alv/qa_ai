import {
  LayoutDashboard,
  TestTube2,
  Play,
  BarChart3,
  History,
  Settings,
  Users,
  Plug,
} from 'lucide-react';

/**
 * Dashboard navigation configuration
 */
export const DASHBOARD_NAVIGATION = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Tests', href: '/dashboard/tests', icon: TestTube2 },
  { name: 'Run Tests', href: '/dashboard/run', icon: Play },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'History', href: '/dashboard/history', icon: History },
  { name: 'Integrations', href: '/dashboard/integrations', icon: Plug },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
] as const;

/**
 * Footer link groups
 */
export const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Changelog', href: '/changelog' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Security', href: '/security' },
  ],
} as const;

/**
 * Header navigation links
 */
export const HEADER_NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Documentation', href: '/docs' },
  { label: 'Blog', href: '/blog' },
] as const;
