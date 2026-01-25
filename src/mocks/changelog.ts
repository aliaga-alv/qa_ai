import type { ChangelogData } from '@/types/models';

/**
 * Product changelog
 */
export const changelog: ChangelogData[] = [
  {
    version: '2.4.0',
    date: 'January 20, 2026',
    type: 'minor',
    changes: [
      {
        category: 'New',
        items: [
          'AI-Powered Test Suggestions - Our new AI engine analyzes your application and suggests relevant test cases automatically',
          'Visual Regression Testing - Automatically detect visual changes in your UI with pixel-perfect comparison',
        ],
      },
      {
        category: 'Improved',
        items: [
          'Performance Improvements - Test execution is now 40% faster thanks to optimized parallel processing',
        ],
      },
    ],
  },
  {
    version: '2.3.5',
    date: 'January 10, 2026',
    type: 'patch',
    changes: [
      {
        category: 'Fixed',
        items: [
          'Flaky Test Detection - Fixed an issue where some flaky tests were not being properly identified',
          'Dashboard Loading - Resolved slow dashboard loading times for users with large test suites',
        ],
      },
    ],
  },
  {
    version: '2.3.0',
    date: 'December 28, 2025',
    type: 'minor',
    changes: [
      {
        category: 'New',
        items: [
          'Team Collaboration Features - Added real-time collaboration tools including comments and shared test suites',
          'Advanced Analytics Dashboard - New analytics dashboard with customizable widgets and detailed insights',
        ],
      },
      {
        category: 'Improved',
        items: [
          'CI/CD Integration - Enhanced GitHub Actions and GitLab CI integration with better error reporting',
        ],
      },
    ],
  },
  {
    version: '2.2.0',
    date: 'December 15, 2025',
    type: 'minor',
    changes: [
      {
        category: 'Improved',
        items: [
          'Test Editor UX - Completely redesigned test editor with better syntax highlighting and autocomplete',
          'API Documentation - Expanded API documentation with more examples and interactive playground',
        ],
      },
    ],
  },
  {
    version: '2.1.5',
    date: 'December 1, 2025',
    type: 'patch',
    changes: [
      {
        category: 'Fixed',
        items: [
          'Security Enhancement - Implemented additional security measures for API authentication',
          'Data Encryption - Enhanced encryption for test data at rest and in transit',
        ],
      },
    ],
  },
];
