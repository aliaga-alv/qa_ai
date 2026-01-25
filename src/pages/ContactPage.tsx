import { ContactForm } from '@/components/features/contact/ContactForm';
import { ContactMethod } from '@/components/features/contact/ContactMethod';
import { contactMethods } from '@/mocks';

export const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-20 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Have a question or want to learn more? We'd love to hear from you. Our team typically
              responds within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="bg-white py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {contactMethods.map((method, index) => (
                <ContactMethod key={index} method={method} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-50 py-20 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Left Column - Info */}
              <div>
                <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                  Send us a message
                </h2>
                <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                      Sales Inquiries
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Interested in QA AI for your team? Our sales team can help you find the right
                      plan.
                    </p>
                    <a
                      href="mailto:sales@qaai.com"
                      className="mt-2 inline-block font-medium text-primary-600 hover:underline dark:text-primary-400"
                    >
                      sales@qaai.com
                    </a>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                      Customer Support
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Need help with your account or have technical questions? Our support team is
                      here.
                    </p>
                    <a
                      href="mailto:support@qaai.com"
                      className="mt-2 inline-block font-medium text-primary-600 hover:underline dark:text-primary-400"
                    >
                      support@qaai.com
                    </a>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                      Press & Media
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Press inquiries and media requests can be directed to our communications team.
                    </p>
                    <a
                      href="mailto:press@qaai.com"
                      className="mt-2 inline-block font-medium text-primary-600 hover:underline dark:text-primary-400"
                    >
                      press@qaai.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map/Location Section */}
      <section className="bg-white py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Our Offices
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-8 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  San Francisco HQ
                </h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-400">
                  <p>123 Tech Street</p>
                  <p>San Francisco, CA 94105</p>
                  <p>United States</p>
                </div>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                  Monday - Friday: 9:00 AM - 6:00 PM PST
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-8 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  New York Office
                </h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-400">
                  <p>456 Innovation Ave</p>
                  <p>New York, NY 10001</p>
                  <p>United States</p>
                </div>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                  Monday - Friday: 9:00 AM - 6:00 PM EST
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
