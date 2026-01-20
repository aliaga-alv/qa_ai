import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Server, AlertTriangle, CheckCircle } from 'lucide-react';

export const SecurityPage = () => {
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

      {/* Hero */}
      <section className="py-12 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Security at QA AI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Your data security and privacy are our top priorities. Learn about the measures we take 
              to protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Security Measures Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white mb-4">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Data Encryption
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. 
                  Your sensitive information is protected at every layer.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Access Control
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Role-based access control (RBAC) ensures only authorized personnel can access your data. 
                  Multi-factor authentication (MFA) is required for all team accounts.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white mb-4">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Infrastructure Security
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our infrastructure is hosted on AWS with SOC 2 Type II certified data centers. 
                  Regular security audits and penetration testing ensure robust protection.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white mb-4">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Incident Response
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  24/7 monitoring and automated threat detection with a dedicated incident response team. 
                  We have documented procedures for rapid response to security incidents.
                </p>
              </div>
            </div>

            {/* Detailed Sections */}
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Compliance & Certifications
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  QA AI maintains compliance with industry standards and regulations:
                </p>
                <ul className="list-none space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300"><strong>SOC 2 Type II:</strong> Audited annually for security, availability, and confidentiality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300"><strong>GDPR Compliant:</strong> Full compliance with European data protection regulations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300"><strong>CCPA Compliant:</strong> Meeting California Consumer Privacy Act requirements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300"><strong>ISO 27001:</strong> Information security management system certified</span>
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Data Protection Practices
                </h2>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Encryption Standards
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li>TLS 1.3 for all data in transit</li>
                  <li>AES-256 encryption for data at rest</li>
                  <li>Encrypted database backups</li>
                  <li>Secure key management with AWS KMS</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Network Security
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li>WAF (Web Application Firewall) protection</li>
                  <li>DDoS mitigation and rate limiting</li>
                  <li>Network segmentation and isolation</li>
                  <li>Regular vulnerability scanning</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Application Security
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li>Regular security code reviews</li>
                  <li>Automated dependency scanning</li>
                  <li>OWASP Top 10 protection</li>
                  <li>Secure SDLC practices</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Employee Security
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Our team follows strict security protocols:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Background checks for all employees</li>
                  <li>Regular security awareness training</li>
                  <li>Mandatory security certifications for engineering staff</li>
                  <li>Principle of least privilege access</li>
                  <li>Secure workstation requirements</li>
                  <li>NDA and confidentiality agreements</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Business Continuity
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We maintain robust backup and disaster recovery procedures:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Automated daily backups with 30-day retention</li>
                  <li>Geo-redundant storage across multiple regions</li>
                  <li>99.9% uptime SLA for Enterprise customers</li>
                  <li>Documented disaster recovery procedures</li>
                  <li>Regular failover testing</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Third-Party Security
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We carefully vet all third-party services and vendors:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Security assessments before vendor onboarding</li>
                  <li>Data processing agreements with all vendors</li>
                  <li>Regular vendor security reviews</li>
                  <li>Minimal data sharing based on need-to-know</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Vulnerability Disclosure
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We welcome responsible disclosure of security vulnerabilities. If you discover a security issue, 
                  please email us at <a href="mailto:security@qaai.com" className="text-primary-600 dark:text-primary-400 hover:underline">security@qaai.com</a>. 
                  We commit to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Responding to reports within 24 hours</li>
                  <li>Keeping you informed throughout the resolution process</li>
                  <li>Crediting researchers (if desired) for responsible disclosure</li>
                  <li>Not pursuing legal action against good-faith security research</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Questions About Security?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  For security-related inquiries or to request our security documentation:
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Email: <a href="mailto:security@qaai.com" className="text-primary-600 dark:text-primary-400 hover:underline">security@qaai.com</a><br />
                  For enterprise security requirements: <a href="mailto:enterprise@qaai.com" className="text-primary-600 dark:text-primary-400 hover:underline">enterprise@qaai.com</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
