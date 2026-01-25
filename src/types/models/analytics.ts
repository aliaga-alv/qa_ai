/**
 * Analytics-related type definitions
 */

export interface DateRange {
  start: Date;
  end: Date;
}

export interface Insight {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  description: string;
  action: string;
}

export interface FlakyTest {
  id: string;
  name: string;
  flakinessRate: number;
  totalRuns: number;
  failures: number;
  trend: 'up' | 'down' | 'stable';
}

export interface MetricData {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
}
