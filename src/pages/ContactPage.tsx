import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { ContactForm } from '@/components/features/contact/ContactForm';
import { ContactMethod } from '@/components/features/contact/ContactMethod';
import type { ContactMethodData } from '@/types/models';

const contactMethods: ContactMethodData[] = [
  {
    icon: Mail,
    title: 'Email',
    value: 'support@qaai.com',
    link: 'mailto:support@qaai.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    link: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    title: 'Office',
    value: '123 Tech Street, San Francisco, CA 94105',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    value: 'Available 9am-5pm PST',
  },
];

export const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Have a question or want to learn more? We'd love to hear from you. 
              Our team typically responds within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <ContactMethod key={index} method={method} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Info */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Send us a message
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Sales Inquiries
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Interested in QA AI for your team? Our sales team can help you find the right plan.
                    </p>
                    <a
                      href="mailto:sales@qaai.com"
                      className="text-primary-600 dark:text-primary-400 hover:underline font-medium mt-2 inline-block"
                    >
                      sales@qaai.com
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Customer Support
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Need help with your account or have technical questions? Our support team is here.
                    </p>
                    <a
                      href="mailto:support@qaai.com"
                      className="text-primary-600 dark:text-primary-400 hover:underline font-medium mt-2 inline-block"
                    >
                      support@qaai.com
                    </a>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Press & Media
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Press inquiries and media requests can be directed to our communications team.
                    </p>
                    <a
                      href="mailto:press@qaai.com"
                      className="text-primary-600 dark:text-primary-400 hover:underline font-medium mt-2 inline-block"
                    >
                      press@qaai.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map/Location Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Our Offices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
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
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
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
