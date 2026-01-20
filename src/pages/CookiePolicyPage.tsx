import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Cookie Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Last updated: January 19, 2026
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  1. What Are Cookies
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Cookies are small text files that are placed on your device when you visit a website. They are widely 
                  used to make websites work more efficiently and provide information to website owners.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. How We Use Cookies
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  QA AI uses cookies to enhance your experience and help us understand how you interact with our Service. 
                  We use cookies for various purposes including authentication, preferences, analytics, and security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. Types of Cookies We Use
                </h2>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Essential Cookies
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  These cookies are necessary for the Service to function properly. They enable core functionality such as:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li>User authentication and session management</li>
                  <li>Security features and fraud prevention</li>
                  <li>Load balancing and service stability</li>
                  <li>Remembering your login state</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Functional Cookies
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  These cookies allow us to remember your preferences and provide enhanced features:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li>Language and region preferences</li>
                  <li>Dark mode and theme settings</li>
                  <li>Dashboard layout preferences</li>
                  <li>Notification preferences</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Analytics Cookies
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  These cookies help us understand how visitors use our Service:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li>Page views and navigation patterns</li>
                  <li>Feature usage and engagement metrics</li>
                  <li>Performance monitoring and error tracking</li>
                  <li>A/B testing and experimentation</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Marketing Cookies
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  These cookies are used to deliver relevant advertisements and track campaign effectiveness:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li>Targeted advertising based on your interests</li>
                  <li>Retargeting campaigns</li>
                  <li>Conversion tracking</li>
                  <li>Social media integration</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. Third-Party Cookies
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We use services from trusted third parties that may set cookies on your device:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li><strong>Google Analytics:</strong> For usage analytics and insights</li>
                  <li><strong>Stripe:</strong> For secure payment processing</li>
                  <li><strong>Intercom:</strong> For customer support and communication</li>
                  <li><strong>Cloudflare:</strong> For security and performance optimization</li>
                  <li><strong>GitHub/GitLab:</strong> For repository integrations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. Cookie Duration
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Cookies can be either "session" or "persistent":
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
                  <li><strong>Persistent Cookies:</strong> Remain on your device until they expire or you delete them. 
                  Our persistent cookies typically expire after 30 days to 1 year depending on their purpose</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Managing Your Cookie Preferences
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  You have several options to manage cookies:
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Browser Settings
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Most web browsers allow you to control cookies through their settings. You can typically:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li>View which cookies are stored and delete them individually</li>
                  <li>Block third-party cookies</li>
                  <li>Block all cookies from specific websites</li>
                  <li>Delete all cookies when you close your browser</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Opt-Out Tools
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  You can opt-out of certain cookie-based tracking:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
                  <li>Network Advertising Initiative: <a href="http://www.networkadvertising.org/choices/" className="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">NAI Opt-out</a></li>
                  <li>Digital Advertising Alliance: <a href="http://www.aboutads.info/choices/" className="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">DAA Opt-out</a></li>
                </ul>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <strong>Note:</strong> Disabling cookies may affect the functionality of our Service. Essential cookies 
                  cannot be disabled as they are necessary for the Service to work properly.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. Do Not Track
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not 
                  want to have your online activity tracked. Currently, there is no uniform standard for how DNT signals 
                  should be interpreted. We do not currently respond to DNT signals.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. Changes to This Cookie Policy
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our 
                  business operations. We will notify you of any material changes by posting the updated policy on this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  9. Contact Us
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  If you have questions about our use of cookies, please contact us at:
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Email: privacy@qaai.com<br />
                  Address: 123 Tech Street, San Francisco, CA 94105
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
