import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const TermsPage = () => {
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
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Last updated: January 19, 2026
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  By accessing and using QA AI ("Service"), you accept and agree to be bound by the terms and 
                  provision of this agreement. If you do not agree to these terms, please do not use our Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. Description of Service
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  QA AI provides an AI-powered automated testing platform that helps development teams test their 
                  applications more efficiently. The Service includes test generation, execution, reporting, and 
                  related features.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. User Accounts
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  You are responsible for maintaining the confidentiality of your account and password. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Provide accurate and complete information when creating your account</li>
                  <li>Keep your account credentials secure and confidential</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Be responsible for all activities that occur under your account</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. Acceptable Use
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  You agree not to use the Service to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Upload malicious code or viruses</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the Service</li>
                  <li>Use the Service for any illegal or unauthorized purpose</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. Intellectual Property
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  The Service and its original content, features, and functionality are owned by QA AI and are 
                  protected by international copyright, trademark, patent, trade secret, and other intellectual 
                  property laws.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  You retain ownership of any test code, test data, and configurations you create using the Service. 
                  You grant us a limited license to use this content solely to provide the Service to you.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Payment and Billing
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Paid subscriptions are billed in advance on a monthly or annual basis. You agree to provide current, 
                  complete, and accurate billing information. We reserve the right to suspend or terminate your account 
                  for non-payment.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. Cancellation and Refunds
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  You may cancel your subscription at any time. Cancellations take effect at the end of your current 
                  billing period. We offer a 30-day money-back guarantee for new subscriptions. Refunds after 30 days 
                  are at our discretion.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. Data and Privacy
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Your use of the Service is also governed by our Privacy Policy. We take data security seriously and 
                  implement industry-standard measures to protect your information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  9. Limitation of Liability
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  To the maximum extent permitted by law, QA AI shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred 
                  directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10. Service Availability
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We strive to provide reliable service but cannot guarantee 100% uptime. We reserve the right to 
                  modify, suspend, or discontinue the Service at any time with reasonable notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11. Changes to Terms
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We reserve the right to modify these terms at any time. We will notify users of significant changes 
                  via email or through the Service. Continued use of the Service after changes constitutes acceptance 
                  of the new terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  12. Governing Law
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  These terms shall be governed by and construed in accordance with the laws of the State of California, 
                  United States, without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  13. Contact Information
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Email: legal@qaai.com<br />
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
