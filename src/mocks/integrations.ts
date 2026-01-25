import { GitBranch, Cloud, MessageSquare, Mail, Webhook, Puzzle } from 'lucide-react';

/**
 * Available integrations
 */
export const integrations = [
  {
    icon: GitBranch,
    name: 'GitHub Actions',
    description: 'Run tests automatically on push, pull request, or schedule',
    color: 'text-gray-900 dark:text-gray-100',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    category: 'CI/CD',
  },
  {
    icon: Cloud,
    name: 'GitLab CI/CD',
    description: 'Integrate with GitLab pipelines for continuous testing',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    category: 'CI/CD',
  },
  {
    icon: MessageSquare,
    name: 'Slack',
    description: 'Get real-time notifications for test results in your channels',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    category: 'Notifications',
  },
  {
    icon: Mail,
    name: 'Email Notifications',
    description: 'Receive test failure alerts and daily summaries via email',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    category: 'Notifications',
  },
  {
    icon: Puzzle,
    name: 'Jira',
    description: 'Create issues automatically for failed tests and track bugs',
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    category: 'Issue Tracking',
  },
  {
    icon: Webhook,
    name: 'Webhooks',
    description: 'Send test results to any endpoint with custom webhooks',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    category: 'Custom',
  },
] as const;

export const integrationCategories = ['All', 'CI/CD', 'Notifications', 'Issue Tracking', 'Custom'] as const;
