import { Link } from 'react-router-dom';
import { FileText, Terminal, Database, Shield, Zap, Code, Settings } from 'lucide-react';
import { DOCUMENTATION_SECTIONS } from '@/constants';

export const DocumentationPage = () => {
  const sections = DOCUMENTATION_SECTIONS;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 py-16 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Documentation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Everything you need to know to get started with QA AI
            </p>
            
            {/* Search bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full px-6 py-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-4 space-y-6">
              {sections.map((section) => (
                <div key={section.title}>
                  <div className="flex items-center gap-2 mb-3">
                    <section.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="space-y-2 ml-7">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
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
          <main className="flex-1 max-w-4xl">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Introduction */}
              <section id="introduction" className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  Introduction
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  QA AI is a comprehensive test automation platform that leverages artificial intelligence to streamline your quality assurance workflow. Our platform helps teams write, execute, and analyze tests with unprecedented speed and accuracy.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  This documentation will guide you through everything from basic setup to advanced features, helping you get the most out of QA AI.
                </p>
              </section>

              {/* Quick Start */}
              <section id="quick-start" className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Terminal className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  Quick Start
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Get up and running with QA AI in less than 5 minutes.
                </p>
                
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{`# Install QA AI CLI
npm install -g @qaai/cli

# Initialize a new project
qaai init my-project

# Run your first test
qaai run tests/sample.spec.js`}</code>
                  </pre>
                </div>

                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4 mb-4">
                  <p className="text-sm text-primary-900 dark:text-primary-100">
                    <strong>Pro Tip:</strong> Use the <code className="px-2 py-1 bg-primary-100 dark:bg-primary-800 rounded">--watch</code> flag to automatically re-run tests on file changes.
                  </p>
                </div>
              </section>

              {/* Installation */}
              <section id="installation" className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Code className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  Installation
                </h2>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  System Requirements
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li>Node.js 18.0 or higher</li>
                  <li>npm 9.0 or higher (or yarn 1.22+)</li>
                  <li>Operating System: macOS, Windows, Linux</li>
                  <li>2GB RAM minimum (4GB recommended)</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Installation Methods
                </h3>
                
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  NPM
                </h4>
                <div className="bg-gray-900 rounded-lg p-6 mb-4">
                  <pre className="text-green-400 text-sm">
                    <code>npm install @qaai/core</code>
                  </pre>
                </div>

                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Yarn
                </h4>
                <div className="bg-gray-900 rounded-lg p-6 mb-4">
                  <pre className="text-green-400 text-sm">
                    <code>yarn add @qaai/core</code>
                  </pre>
                </div>
              </section>

              {/* Configuration */}
              <section id="configuration" className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Settings className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  Configuration
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Create a <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">qaai.config.js</code> file in your project root:
                </p>

                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                  <pre className="text-green-400 text-sm overflow-x-auto">
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
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  Authentication
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  All API requests require authentication using an API key. You can generate an API key from your dashboard.
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  API Key Authentication
                </h3>
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{`curl -X POST https://api.qaai.com/v1/tests \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "My Test"}'`}</code>
                  </pre>
                </div>
              </section>

              {/* Test Execution */}
              <section id="test-execution" className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Database className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  Test Execution
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Execute tests using the QA AI CLI or API.
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Command Line
                </h3>
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                  <pre className="text-green-400 text-sm overflow-x-auto">
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
              <section className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 mt-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Need Help?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Can't find what you're looking for? We're here to help.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all font-semibold"
                  >
                    Contact Support
                  </Link>
                  <a
                    href="https://github.com/aliaga-alv/qa_ai/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold"
                  >
                    Report Issue
                  </a>
                  <Link
                    to="/blog"
                    className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold"
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
