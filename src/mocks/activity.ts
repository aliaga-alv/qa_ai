import type { Activity } from '@/types/models';

/**
 * Mock activity feed data
 * TODO: Replace with real API data
 */
export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'test_passed',
    title: 'Test Passed',
    description: 'User Login Flow completed successfully',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    user: 'John Doe',
  },
  {
    id: '2',
    type: 'test_failed',
    title: 'Test Failed',
    description: 'Payment Processing test failed',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    user: 'Jane Smith',
  },
  {
    id: '3',
    type: 'test_created',
    title: 'Test Created',
    description: 'New API test for checkout flow',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    user: 'Mike Johnson',
  },
  {
    id: '4',
    type: 'member_joined',
    title: 'Member Added',
    description: 'Sarah Williams joined the team',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    user: 'Admin',
  },
];
