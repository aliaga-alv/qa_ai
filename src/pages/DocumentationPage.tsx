import { Link } from 'react-router-dom';
import { FileText, Terminal, Database, Shield, Zap, Code, Settings } from 'lucide-react';
import { DOCUMENTATION_SECTIONS } from '@/constants';

export const DocumentationPage = () => {
  const sections = DOCUMENTATION_SECTIONS;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-gradient-to-br from-primary-50 to-accent-50 py-16 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white">
              <FileText className="h-8 w-8" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              Documentation
            </h1>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know to get started with QA AI
            </p>

            {/* Search bar */}
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-6 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 px-4 py-2 text-white transition-all hover:from-primary-700 hover:to-accent-700">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="flex-shrink-0 lg:w-64">
            <div className="sticky top-4 space-y-6">
              {sections.map((section) => (
                <div key={section.title}>
                  <div className="mb-3 flex items-center gap-2">
                    <section.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">{section.title}</h3>
                  </div>
                  <ul className="ml-7 space-y-2">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="max-w-4xl flex-1">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Introduction */}
              <section id="introduction" className="mb-16">
                <h2 className="mb-4 flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                  <Zap className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  Introduction
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  QA AI is a comprehensive test automation platform that leverages artificial
                  intelligence to streamline your quality assurance workflow. Our platform helps
                  teams write, execute, and analyze tests with unprecedented speed and accuracy.
                </p>
                <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  This documentation will guide you through everything from basic setup to advanced
                  features, helping you get the most out of QA AI.
                </p>
              </section>

              {/* Quick Start */}
              <section id="quick-start" className="mb-16">
                <h2 className="mb-4 flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                  <Terminal className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  Quick Start
                </h2>
                <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                  Get up and running with QA AI in less than 5 minutes.
                </p>

                <div className="mb-6 rounded-lg bg-gray-900 p-6">
                  <pre className="overflow-x-auto text-sm text-green-400">
                    <code>{`# Install QA AI CLI
npm install -g @qaai/cli

# Initialize a new project
qaai init my-project

# Run your first test
qaai run tests/sample.spec.js`}</code>
                  </pre>
                </div>

                <div className="mb-4 rounded-lg border border-primary-200 bg-primary-50 p-4 dark:border-primary-800 dark:bg-primary-900/20">
                  <p className="text-sm text-primary-900 dark:text-primary-100">
                    <strong>Pro Tip:</strong> Use the{' '}
                    <code className="rounded bg-primary-100 px-2 py-1 dark:bg-primary-800">
                      --watch
                    </code>{' '}
                    flag to automatically re-run tests on file changes.
                  </p>
                </div>
              </section>

              {/* Installation */}
              <section id="installation" className="mb-16">
                <h2 className="mb-4 flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                  <Code className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  Installation
                </h2>

                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  System Requirements
                </h3>
                <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Node.js 18.0 or higher</li>
                  <li>npm 9.0 or higher (or yarn 1.22+)</li>
                  <li>Operating System: macOS, Windows, Linux</li>
                  <li>2GB RAM minimum (4GB recommended)</li>
                </ul>

                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Installation Methods
                </h3>

                <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">NPM</h4>
                <div className="mb-4 rounded-lg bg-gray-900 p-6">
                  <pre className="text-sm text-green-400">
                    <code>npm install @qaai/core</code>
                  </pre>
                </div>

                <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Yarn</h4>
                <div className="mb-4 rounded-lg bg-gray-900 p-6">
                  <pre className="text-sm text-green-400">
                    <code>yarn add @qaai/core</code>
                  </pre>
                </div>
              </section>

              {/* Configuration */}
              <section id="configuration" className="mb-16">
                <h2 className="mb-4 flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                  <Settings className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  Configuration
                </h2>
                <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                  Create a{' '}
                  <code className="rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800">
                    qaai.config.js
                  </code>{' '}
                  file in your project root:
                </p>

                <div className="mb-6 rounded-lg bg-gray-900 p-6">
                  <pre className="overflow-x-auto text-sm text-green-400">
                    <code>{`export default {
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  workers: 4,
  reporter: ['html', 'json'],
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
};`}</code>
                  </pre>
                </div>
              </section>

              {/* Authentication */}
              <section id="authentication" className="mb-16">
                <h2 className="mb-4 flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                  <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  Authentication
                </h2>
                <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                  All API requests require authentication using an API key. You can generate an API
                  key from your dashboard.
                </p>

                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  API Key Authentication
                </h3>
                <div className="mb-6 rounded-lg bg-gray-900 p-6">
                  <pre className="overflow-x-auto text-sm text-green-400">
                    <code>{`curl -X POST https://api.qaai.com/v1/tests \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "My Test"}'`}</code>
                  </pre>
                </div>
              </section>

              {/* Test Execution */}
              <section id="test-execution" className="mb-16">
                <h2 className="mb-4 flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                  <Database className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  Test Execution
                </h2>
                <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                  Execute tests using the QA AI CLI or API.
                </p>

                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Command Line
                </h3>
                <div className="mb-6 rounded-lg bg-gray-900 p-6">
                  <pre className="overflow-x-auto text-sm text-green-400">
                    <code>{`# Run all tests
qaai run

# Run specific test file
qaai run tests/login.spec.js

# Run tests matching pattern
qaai run --grep "login"

# Run with specific browser
qaai run --browser chromium

# Run in headless mode
qaai run --headless`}</code>
                  </pre>
                </div>
              </section>

              {/* Need Help Section */}
              <section className="mt-16 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 p-8 dark:from-gray-800 dark:to-gray-700">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Need Help?
                </h2>
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                  Can't find what you're looking for? We're here to help.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 px-6 py-3 font-semibold text-white transition-all hover:from-primary-700 hover:to-accent-700"
                  >
                    Contact Support
                  </Link>
                  <a
                    href="https://github.com/aliaga-alv/qa_ai/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                  >
                    Report Issue
                  </a>
                  <Link
                    to="/blog"
                    className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                  >
                    View Tutorials
                  </Link>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
