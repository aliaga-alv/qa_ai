import { Book, Code, Zap, Settings } from 'lucide-react';

/**
 * Documentation sections and navigation
 */
export const DOCUMENTATION_SECTIONS = [
  {
    title: 'Getting Started',
    icon: Zap,
    items: [
      { name: 'Introduction', href: '#introduction' },
      { name: 'Quick Start', href: '#quick-start' },
      { name: 'Installation', href: '#installation' },
      { name: 'Configuration', href: '#configuration' },
    ],
  },
  {
    title: 'API Reference',
    icon: Code,
    items: [
      { name: 'Authentication', href: '#authentication' },
      { name: 'Test Execution', href: '#test-execution' },
      { name: 'Results & Analytics', href: '#results-analytics' },
      { name: 'Webhooks', href: '#webhooks' },
    ],
  },
  {
    title: 'Guides',
    icon: Book,
    items: [
      { name: 'Writing Tests', href: '#writing-tests' },
      { name: 'CI/CD Integration', href: '#cicd-integration' },
      { name: 'Custom Assertions', href: '#custom-assertions' },
      { name: 'Best Practices', href: '#best-practices' },
    ],
  },
  {
    title: 'Advanced',
    icon: Settings,
    items: [
      { name: 'Environment Variables', href: '#environment-variables' },
      { name: 'Custom Plugins', href: '#custom-plugins' },
      { name: 'Performance Tuning', href: '#performance-tuning' },
      { name: 'Troubleshooting', href: '#troubleshooting' },
    ],
  },
] as const;
