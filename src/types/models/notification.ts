/**
 * Notification and activity-related type definitions
 */

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  link?: string;
}

export interface Activity {
  id: string;
  type: 'test_passed' | 'test_failed' | 'test_created' | 'test_running' | 'test_run' | 'test_updated' | 'member_joined' | 'settings_changed';
  message?: string;
  title?: string;
  description?: string;
  timestamp: Date;
  user: string;
  metadata?: Record<string, unknown>;
}
