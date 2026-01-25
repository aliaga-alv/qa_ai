import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Server, AlertTriangle, CheckCircle } from 'lucide-react';

export const SecurityPage = () => {
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

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-12 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              Security at QA AI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Your data security and privacy are our top priorities. Learn about the measures we
              take to protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {/* Security Measures Grid */}
            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-white">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Data Encryption
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  All data is encrypted in transit using TLS 1.3 and at rest using AES-256
                  encryption. Your sensitive information is protected at every layer.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-white">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Access Control
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  Role-based access control (RBAC) ensures only authorized personnel can access your
                  data. Multi-factor authentication (MFA) is required for all team accounts.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-white">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Infrastructure Security
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  Our infrastructure is hosted on AWS with SOC 2 Type II certified data centers.
                  Regular security audits and penetration testing ensure robust protection.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-white">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Incident Response
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  24/7 monitoring and automated threat detection with a dedicated incident response
                  team. We have documented procedures for rapid response to security incidents.
                </p>
              </div>
            </div>

            {/* Detailed Sections */}
            <div className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Compliance & Certifications
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  QA AI maintains compliance with industry standards and regulations:
                </p>
                <ul className="mb-6 list-none space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>SOC 2 Type II:</strong> Audited annually for security, availability,
                      and confidentiality
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>GDPR Compliant:</strong> Full compliance with European data protection
                      regulations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>CCPA Compliant:</strong> Meeting California Consumer Privacy Act
                      requirements
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>ISO 27001:</strong> Information security management system certified
                    </span>
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Data Protection Practices
                </h2>

                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Encryption Standards
                </h3>
                <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>TLS 1.3 for all data in transit</li>
                  <li>AES-256 encryption for data at rest</li>
                  <li>Encrypted database backups</li>
                  <li>Secure key management with AWS KMS</li>
                </ul>

                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Network Security
                </h3>
                <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>WAF (Web Application Firewall) protection</li>
                  <li>DDoS mitigation and rate limiting</li>
                  <li>Network segmentation and isolation</li>
                  <li>Regular vulnerability scanning</li>
                </ul>

                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Application Security
                </h3>
                <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Regular security code reviews</li>
                  <li>Automated dependency scanning</li>
                  <li>OWASP Top 10 protection</li>
                  <li>Secure SDLC practices</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Employee Security
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  Our team follows strict security protocols:
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Background checks for all employees</li>
                  <li>Regular security awareness training</li>
                  <li>Mandatory security certifications for engineering staff</li>
                  <li>Principle of least privilege access</li>
                  <li>Secure workstation requirements</li>
                  <li>NDA and confidentiality agreements</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Business Continuity
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  We maintain robust backup and disaster recovery procedures:
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Automated daily backups with 30-day retention</li>
                  <li>Geo-redundant storage across multiple regions</li>
                  <li>99.9% uptime SLA for Enterprise customers</li>
                  <li>Documented disaster recovery procedures</li>
                  <li>Regular failover testing</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Third-Party Security
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  We carefully vet all third-party services and vendors:
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Security assessments before vendor onboarding</li>
                  <li>Data processing agreements with all vendors</li>
                  <li>Regular vendor security reviews</li>
                  <li>Minimal data sharing based on need-to-know</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Vulnerability Disclosure
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  We welcome responsible disclosure of security vulnerabilities. If you discover a
                  security issue, please email us at{' '}
                  <a
                    href="mailto:security@qaai.com"
                    className="text-primary-600 hover:underline dark:text-primary-400"
                  >
                    security@qaai.com
                  </a>
                  . We commit to:
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Responding to reports within 24 hours</li>
                  <li>Keeping you informed throughout the resolution process</li>
                  <li>Crediting researchers (if desired) for responsible disclosure</li>
                  <li>Not pursuing legal action against good-faith security research</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Questions About Security?
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  For security-related inquiries or to request our security documentation:
                </p>
                <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  Email:{' '}
                  <a
                    href="mailto:security@qaai.com"
                    className="text-primary-600 hover:underline dark:text-primary-400"
                  >
                    security@qaai.com
                  </a>
                  <br />
                  For enterprise security requirements:{' '}
                  <a
                    href="mailto:enterprise@qaai.com"
                    className="text-primary-600 hover:underline dark:text-primary-400"
                  >
                    enterprise@qaai.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
