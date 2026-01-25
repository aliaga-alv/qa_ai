import type { Notification } from '@/types/models';

/**
 * Mock notifications for dashboard widget
 * TODO: Replace with real API data
 */
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Test Completed',
    message: 'User Login Flow test passed successfully',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    isRead: false,
    link: '/dashboard/history',
  },
  {
    id: '2',
    type: 'error',
    title: 'Test Failed',
    message: 'Payment Processing test failed with 2 errors',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    isRead: false,
    link: '/dashboard/history',
  },
  {
    id: '3',
    type: 'warning',
    title: 'Flaky Test Detected',
    message: 'Product Search test has failed 3 times in last 10 runs',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    link: '/dashboard/analytics',
  },
  {
    id: '4',
    type: 'info',
    title: 'New Team Member',
    message: 'Sarah Williams joined your team as a viewer',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isRead: true,
    link: '/dashboard/team',
  },
  {
    id: '5',
    type: 'success',
    title: 'All Tests Passed',
    message: 'Nightly test suite completed: 42/42 tests passed',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    isRead: true,
  },
];
