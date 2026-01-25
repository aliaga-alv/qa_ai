/**
 * Mock chart data for dashboard analytics
 * TODO: Replace with real API data
 */

export const mockTestTrendData = [
  { date: 'Mon', passed: 45, failed: 5 },
  { date: 'Tue', passed: 52, failed: 3 },
  { date: 'Wed', passed: 48, failed: 7 },
  { date: 'Thu', passed: 61, failed: 2 },
  { date: 'Fri', passed: 55, failed: 4 },
  { date: 'Sat', passed: 42, failed: 6 },
  { date: 'Sun', passed: 38, failed: 8 },
];

export const mockTopTestsData = [
  { name: 'User Login', executions: 1245 },
  { name: 'Checkout Flow', executions: 892 },
  { name: 'Search Products', executions: 756 },
  { name: 'User Registration', executions: 634 },
  { name: 'API Health Check', executions: 521 },
];

export const mockTestDistributionData = [
  { name: 'API', value: 35 },
  { name: 'E2E', value: 45 },
  { name: 'Unit', value: 15 },
  { name: 'Integration', value: 5 },
];

export const mockDurationData = [
  { name: '< 1s', value: 45 },
  { name: '1-5s', value: 30 },
  { name: '5-10s', value: 15 },
  { name: '> 10s', value: 10 },
];

export const mockReliabilityData = [
  { date: '01/15', reliability: 94 },
  { date: '01/16', reliability: 96 },
  { date: '01/17', reliability: 93 },
  { date: '01/18', reliability: 97 },
  { date: '01/19', reliability: 95 },
  { date: '01/20', reliability: 98 },
  { date: '01/21', reliability: 96 },
];

export const mockCoverageData = [
  { name: 'Auth', coverage: 95 },
  { name: 'Payment', coverage: 88 },
  { name: 'Products', coverage: 92 },
  { name: 'Orders', coverage: 85 },
  { name: 'Users', coverage: 90 },
];

export const mockFlakyTests = [
  { name: 'Product Search', failRate: 23 },
  { name: 'Checkout Flow', failRate: 18 },
  { name: 'User Profile', failRate: 15 },
];

export const mockTopTestsChartData = [
  { name: 'User Login', runs: 342 },
  { name: 'Product Search', runs: 287 },
  { name: 'Add to Cart', runs: 256 },
  { name: 'Checkout Flow', runs: 198 },
  { name: 'Payment Process', runs: 176 },
  { name: 'Profile Update', runs: 143 },
  { name: 'Reset Password', runs: 121 },
  { name: 'Email Verify', runs: 98 },
];

export const mockTestTrendChartData = [
  { date: '01/15', passed: 145, failed: 12 },
  { date: '01/16', passed: 158, failed: 8 },
  { date: '01/17', passed: 142, failed: 15 },
  { date: '01/18', passed: 167, failed: 9 },
  { date: '01/19', passed: 152, failed: 11 },
  { date: '01/20', passed: 171, failed: 7 },
  { date: '01/21', passed: 163, failed: 10 },
];

export const mockTestDistributionChartData = [
  { name: 'API', value: 142, color: '#3b82f6' },
  { name: 'E2E', value: 98, color: '#8b5cf6' },
  { name: 'Integration', value: 76, color: '#f59e0b' },
  { name: 'Unit', value: 54, color: '#10b981' },
];

export const mockDurationChartData = [
  { name: 'Login Tests', duration: 2.3, status: 'fast' },
  { name: 'API Tests', duration: 1.8, status: 'fast' },
  { name: 'Payment Flow', duration: 4.5, status: 'medium' },
  { name: 'Checkout', duration: 3.2, status: 'medium' },
  { name: 'Integration', duration: 8.7, status: 'slow' },
];

export const mockReliabilityChartData = [
  { date: '01/15', reliability: 94 },
  { date: '01/16', reliability: 96 },
  { date: '01/17', reliability: 93 },
  { date: '01/18', reliability: 97 },
  { date: '01/19', reliability: 95 },
  { date: '01/20', reliability: 98 },
  { date: '01/21', reliability: 96 },
];

export const mockCoverageChartData = [
  { name: 'Auth', coverage: 95 },
  { name: 'Payment', coverage: 88 },
  { name: 'Products', coverage: 92 },
  { name: 'Orders', coverage: 85 },
  { name: 'Users', coverage: 90 },
];

export const mockFlakyTestsData = [
  {
    id: '1',
    name: 'Product Search',
    flakinessRate: 23,
    totalRuns: 150,
    failures: 35,
    trend: 'up' as const,
  },
  {
    id: '2',
    name: 'Checkout Flow',
    flakinessRate: 18,
    totalRuns: 200,
    failures: 36,
    trend: 'stable' as const,
  },
  {
    id: '3',
    name: 'User Profile',
    flakinessRate: 15,
    totalRuns: 180,
    failures: 27,
    trend: 'down' as const,
  },
  {
    id: '4',
    name: 'Password Reset',
    flakinessRate: 12,
    totalRuns: 120,
    failures: 14,
    trend: 'down' as const,
  },
  {
    id: '5',
    name: 'Email Verification',
    flakinessRate: 9,
    totalRuns: 90,
    failures: 8,
    trend: 'stable' as const,
  },
];

export const mockAnalyticsInsights = [
  {
    id: '1',
    type: 'success' as const,
    title: 'Great job!',
    description: 'Test reliability improved by 5% this week',
    action: 'View Details',
  },
  {
    id: '2',
    type: 'warning' as const,
    title: 'Attention needed',
    description: '3 tests have high failure rates and need investigation',
    action: 'View Tests',
  },
  {
    id: '3',
    type: 'info' as const,
    title: 'Performance tip',
    description: 'Consider parallelizing slow tests to reduce execution time',
    action: 'Learn More',
  },
];

export const mockTestDetailTrendData = [
  { date: 'Jan 15', duration: 2.1, success: 100 },
  { date: 'Jan 16', duration: 2.4, success: 95 },
  { date: 'Jan 17', duration: 2.2, success: 98 },
  { date: 'Jan 18', duration: 2.5, success: 96 },
  { date: 'Jan 19', duration: 2.3, success: 100 },
  { date: 'Jan 20', duration: 2.1, success: 98 },
  { date: 'Jan 21', duration: 2.3, success: 98 },
];

export const mockAnalyticsTrendData = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  passed: Math.floor(Math.random() * 50) + 150,
  failed: Math.floor(Math.random() * 20) + 5,
  duration: (Math.random() * 2 + 3).toFixed(1),
}));

export const mockPerformanceData = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  avgDuration: (Math.random() * 1 + 2).toFixed(1),
  p95Duration: (Math.random() * 2 + 4).toFixed(1),
}));
