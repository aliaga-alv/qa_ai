/**
 * Mock security data for security settings page
 * TODO: Replace with real API data
 */
import type { ActiveSession, SecurityLog } from '../types/models';

export const mockSessions: ActiveSession[] = [
  {
    id: '1',
    device: 'MacBook Pro',
    browser: 'Chrome 120',
    location: 'San Francisco, CA',
    ipAddress: '192.168.1.100',
    lastActive: new Date(),
    isCurrent: true,
  },
  {
    id: '2',
    device: 'iPhone 15 Pro',
    browser: 'Safari 17',
    location: 'San Francisco, CA',
    ipAddress: '192.168.1.101',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isCurrent: false,
  },
  {
    id: '3',
    device: 'Windows PC',
    browser: 'Edge 120',
    location: 'New York, NY',
    ipAddress: '203.0.113.45',
    lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    isCurrent: false,
  },
];

export const mockSecurityLogs: SecurityLog[] = [
  {
    id: '1',
    action: 'Password changed',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    ipAddress: '192.168.1.100',
    location: 'San Francisco, CA',
    status: 'success',
  },
  {
    id: '2',
    action: 'Login from new device',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    ipAddress: '203.0.113.45',
    location: 'New York, NY',
    status: 'success',
  },
  {
    id: '3',
    action: 'Failed login attempt',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    ipAddress: '198.51.100.23',
    location: 'Unknown',
    status: 'failed',
  },
  {
    id: '4',
    action: '2FA enabled',
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    ipAddress: '192.168.1.100',
    location: 'San Francisco, CA',
    status: 'success',
  },
];
