import type { QuickAction } from '@/types/models';
import { Play, Plus, BarChart3, History } from 'lucide-react';

/**
 * Quick actions for dashboard
 */
export const quickActions: QuickAction[] = [
  {
    id: 'run-all',
    icon: Play,
    label: 'Run All Tests',
    color: 'text-primary-600 dark:text-primary-400',
    bgColor: 'bg-primary-100 dark:bg-primary-900/20 hover:bg-primary-200 dark:hover:bg-primary-900/30',
    onClick: () => console.log('Navigate to /dashboard/run'),
  },
  {
    id: 'create-test',
    icon: Plus,
    label: 'Create Test',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30',
    onClick: () => console.log('Navigate to /dashboard/tests/create'),
  },
  {
    id: 'view-analytics',
    icon: BarChart3,
    label: 'View Analytics',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/30',
    onClick: () => console.log('Navigate to /dashboard/analytics'),
  },
  {
    id: 'recent-runs',
    icon: History,
    label: 'Recent Runs',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-900/30',
    onClick: () => console.log('Navigate to /dashboard/history'),
  },
];
