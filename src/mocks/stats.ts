/**
 * Mock dashboard statistics
 * TODO: Replace with real API data
 */
export const mockDashboardStats = {
  totalTests: {
    value: 1247,
    trend: { value: 12, isPositive: true, period: 'last week' },
  },
  successRate: {
    value: '94.2%',
    trend: { value: 2.4, isPositive: true, period: 'last week' },
  },
  avgDuration: {
    value: '2.4s',
    trend: { value: -8.5, isPositive: true, period: 'last week' },
  },
  activeTests: {
    value: 3,
    trend: undefined,
  },
  failedTests: {
    value: 24,
    trend: { value: -15, isPositive: true, period: 'last week' },
  },
  testCoverage: {
    value: '87%',
    trend: { value: 5, isPositive: true, period: 'last month' },
  },
};

export const mockAnalyticsStats = [
  { label: 'Total Test Runs', value: '8,247', change: '+12.3%', positive: true },
  { label: 'Avg Success Rate', value: '94.8%', change: '+2.1%', positive: true },
  { label: 'Avg Duration', value: '3.2s', change: '-8.5%', positive: true },
  { label: 'Flaky Tests', value: '3', change: '-2', positive: true },
];

export const mockAIInsights = [
  {
    id: '1',
    type: 'success' as const,
    title: 'High Test Reliability',
    description: 'Your test suite has maintained 95%+ pass rate for 30 days',
    action: 'View Analytics',
    link: '/dashboard/analytics',
  },
  {
    id: '2',
    type: 'warning' as const,
    title: 'Flaky Test Detected',
    description: 'Product Search test has inconsistent results. Review test logic.',
    action: 'View Test',
    link: '/dashboard/tests/3',
  },
  {
    id: '3',
    type: 'info' as const,
    title: 'Coverage Opportunity',
    description: 'Checkout flow could benefit from additional edge case testing',
    action: 'Create Test',
    link: '/dashboard/tests/create',
  },
];
