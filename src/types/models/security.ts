/**
 * Security-related type definitions
 */

export interface ActiveSession {
  id: string;
  device: string;
  browser?: string;
  location: string;
  lastActive: Date;
  ipAddress: string;
  isCurrent: boolean;
}

export interface SecurityLog {
  id: string;
  action: string;
  timestamp: Date;
  ipAddress: string;
  location?: string;
  device?: string;
  status: 'success' | 'failed';
}
