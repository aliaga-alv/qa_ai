/**
 * Mock team data for team management page
 * TODO: Replace with real API data
 */
import type { TeamMember } from '@/types/models';

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'owner',
    lastActive: new Date(),
    testsRun: 342,
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    testsRun: 256,
    status: 'active',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'member',
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
    testsRun: 187,
    status: 'active',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'viewer',
    lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    testsRun: 0,
    status: 'active',
  },
  {
    id: '5',
    name: 'Tom Brown',
    email: 'tom@example.com',
    role: 'member',
    lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    testsRun: 0,
    status: 'pending',
  },
];
