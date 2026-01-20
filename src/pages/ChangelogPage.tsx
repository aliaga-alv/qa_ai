import { ChangelogEntry, type ChangelogData } from '@/components/features/changelog/ChangelogEntry';

const changelog: ChangelogData[] = [
  {
    version: '2.0.0',
    date: 'January 15, 2026',
    type: 'major',
    changes: [
      {
        category: 'New',
        items: [
          'Completely redesigned dashboard with modern UI',
          'Real-time test execution monitoring with WebSocket support',
          'Advanced AI-powered test suggestion engine',
          'Multi-environment test configuration',
          'Team collaboration features with real-time updates',
        ],
      },
      {
        category: 'Improved',
        items: [
          'Test execution speed improved by 40%',
          'Enhanced error reporting with stack traces and screenshots',
          'Better mobile responsiveness across all pages',
          'Optimized database queries for faster load times',
        ],
      },
      {
        category: 'Fixed',
        items: [
          'Fixed issue with parallel test execution hanging',
          'Resolved authentication token expiration bugs',
          'Fixed dark mode styling inconsistencies',
        ],
      },
    ],
  },
  {
    version: '1.8.2',
    date: 'December 20, 2025',
    type: 'patch',
    changes: [
      {
        category: 'Fixed',
        items: [
          'Fixed critical bug in test result aggregation',
          'Resolved memory leak in long-running test sessions',
          'Fixed incorrect timestamp display in test history',
        ],
      },
      {
        category: 'Improved',
        items: [
          'Enhanced error messages for failed API calls',
          'Improved test report generation performance',
        ],
      },
    ],
  },
  {
    version: '1.8.0',
    date: 'December 1, 2025',
    type: 'minor',
    changes: [
      {
        category: 'New',
        items: [
          'Added test scheduling feature',
          'Introduced webhook notifications for test completion',
          'New API endpoints for programmatic test execution',
          'Custom test templates support',
        ],
      },
      {
        category: 'Improved',
        items: [
          'Enhanced test filtering and search capabilities',
          'Better error handling in CI/CD integrations',
          'Improved documentation with more examples',
        ],
      },
    ],
  },
  {
    version: '1.7.5',
    date: 'November 10, 2025',
    type: 'patch',
    changes: [
      {
        category: 'Fixed',
        items: [
          'Fixed bug with GitHub integration authentication',
          'Resolved issue with CSV export formatting',
          'Fixed timezone display issues in reports',
        ],
      },
    ],
  },
  {
    version: '1.7.0',
    date: 'October 25, 2025',
    type: 'minor',
    changes: [
      {
        category: 'New',
        items: [
          'Integration with GitLab CI/CD',
          'New analytics dashboard with custom metrics',
          'Test coverage visualization',
          'Slack notifications support',
        ],
      },
      {
        category: 'Improved',
        items: [
          'Faster test result processing',
          'Enhanced API rate limiting',
          'Better error messages throughout the platform',
        ],
      },
      {
        category: 'Fixed',
        items: [
          'Fixed issue with test retry logic',
          'Resolved notification delivery delays',
        ],
      },
    ],
  },
  {
    version: '1.6.0',
    date: 'September 15, 2025',
    type: 'minor',
    changes: [
      {
        category: 'New',
        items: [
          'Introduced test environments feature',
          'Added support for custom test parameters',
          'New team management dashboard',
        ],
      },
      {
        category: 'Improved',
        items: [
          'Enhanced security with 2FA support',
          'Better mobile app experience',
          'Improved onboarding flow',
        ],
      },
    ],
  },
];

export const ChangelogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Changelog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Stay up to date with the latest features, improvements, and fixes to QA AI.
            </p>
          </div>
        </div>
      </section>

      {/* Changelog Entries */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {changelog.map((entry, index) => (
              <ChangelogEntry key={index} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Never miss an update
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Subscribe to our newsletter to get notified about new releases and features.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
