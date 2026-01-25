import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              Privacy Policy
            </h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">Last updated: January 19, 2026</p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  1. Introduction
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  QA AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy
                  Policy explains how we collect, use, disclose, and safeguard your information when
                  you use our Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  2. Information We Collect
                </h2>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Information You Provide
                </h3>
                <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Account information (name, email, password)</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Profile information and preferences</li>
                  <li>Communications with our support team</li>
                  <li>Test code, configurations, and related data you upload</li>
                </ul>

                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Information Automatically Collected
                </h3>
                <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Usage data (features used, test execution metrics)</li>
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Log data (access times, pages viewed, errors encountered)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  3. How We Use Your Information
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  We use your information to:
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Provide, maintain, and improve our Service</li>
                  <li>Process your transactions and manage your account</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Analyze usage patterns to improve user experience</li>
                  <li>Detect and prevent fraud and abuse</li>
                  <li>Comply with legal obligations</li>
                  <li>Send marketing communications (with your consent)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  4. Data Sharing and Disclosure
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Service Providers:</strong> Third-party vendors who perform services on
                    our behalf (hosting, analytics, payment processing)
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with a merger, acquisition,
                    or sale of assets
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law or to protect our
                    rights
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> When you explicitly authorize us to share
                    information
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  5. Data Security
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Encryption in transit (TLS/SSL) and at rest</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee training on data protection</li>
                  <li>Incident response procedures</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  6. Data Retention
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  We retain your information for as long as necessary to provide our Service and
                  comply with legal obligations. When you delete your account, we will delete or
                  anonymize your personal information within 90 days, except where we are required
                  to retain it by law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  7. Your Rights and Choices
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  You have the right to:
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Delete your account and personal information</li>
                  <li>Object to or restrict certain processing activities</li>
                  <li>Data portability (receive your data in a structured format)</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent where processing is based on consent</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  8. Cookies and Tracking
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  We use cookies and similar technologies to enhance your experience. You can
                  control cookies through your browser settings. Note that disabling cookies may
                  affect the functionality of our Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  9. International Data Transfers
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  Your information may be transferred to and processed in countries other than your
                  country of residence. We ensure appropriate safeguards are in place to protect
                  your information in accordance with this Privacy Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  10. Children's Privacy
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  Our Service is not intended for children under 13 years of age. We do not
                  knowingly collect personal information from children under 13. If you become aware
                  that a child has provided us with personal information, please contact us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  11. Changes to This Privacy Policy
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  We may update this Privacy Policy from time to time. We will notify you of
                  material changes by email or through a notice on our Service. Your continued use
                  after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  12. Contact Us
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  If you have questions about this Privacy Policy or wish to exercise your rights,
                  please contact us at:
                </p>
                <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  Email: privacy@qaai.com
                  <br />
                  Address: 123 Tech Street, San Francisco, CA 94105
                  <br />
                  Data Protection Officer: dpo@qaai.com
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
