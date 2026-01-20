import { useState } from 'react';
import { PricingCard, type PricingTier } from '@/components/features/pricing/PricingCard';
import { PricingComparison } from '@/components/features/pricing/PricingComparison';
import { PricingFAQ } from '@/components/features/pricing/PricingFAQ';
import { ROUTES } from '@/constants/routes';

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    description: 'Perfect for trying out QA AI',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      '100 test executions per month',
      '1 team member',
      'AI-powered test generation',
      '7 days test history',
      'Community support',
      'Basic analytics',
    ],
    cta: 'Get Started Free',
    ctaLink: ROUTES.REGISTER,
  },
  {
    name: 'Starter',
    description: 'Great for small teams',
    monthlyPrice: 49,
    annualPrice: 470,
    features: [
      '1,000 test executions per month',
      '3 team members',
      'Everything in Free, plus:',
      '3 parallel test executions',
      '30 days test history',
      'CI/CD integrations',
      'Email support',
    ],
    cta: 'Start Free Trial',
    ctaLink: ROUTES.REGISTER,
  },
  {
    name: 'Professional',
    description: 'For growing teams',
    monthlyPrice: 199,
    annualPrice: 1910,
    popular: true,
    features: [
      '10,000 test executions per month',
      '10 team members',
      'Everything in Starter, plus:',
      '10 parallel test executions',
      '1 year test history',
      '5 custom test environments',
      'Advanced analytics & reporting',
      'Full API access',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    ctaLink: ROUTES.REGISTER,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    monthlyPrice: 599,
    annualPrice: 5750,
    features: [
      'Unlimited test executions',
      'Unlimited team members',
      'Everything in Professional, plus:',
      'Unlimited parallel executions',
      'Unlimited test history',
      'Unlimited custom environments',
      'Custom integrations',
      'SSO & SAML',
      'Dedicated account manager',
      'SLA guarantee (99.9% uptime)',
      '24/7 phone support',
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
  },
];

export const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Choose the perfect plan for your team. All plans include a 14-day free trial.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <span
              className={`text-lg font-medium transition-colors ${
                !isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`
                relative w-16 h-8 rounded-full transition-colors
                ${isAnnual ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}
              `}
              aria-label="Toggle annual billing"
            >
              <span
                className={`
                  absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform
                  ${isAnnual ? 'transform translate-x-8' : ''}
                `}
              />
            </button>
            <span
              className={`text-lg font-medium transition-colors ${
                isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Annual
            </span>
            {isAnnual && (
              <span className="ml-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold rounded-full">
                Save 20%
              </span>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.name} tier={tier} isAnnual={isAnnual} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Compare plans
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Detailed comparison of features across all plans
            </p>
          </div>
          <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8">
            <PricingComparison />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Everything you need to know about pricing and plans
            </p>
          </div>
          <PricingFAQ />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 dark:from-primary-900 dark:to-accent-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of teams already using QA AI to test smarter.
          </p>
          <a
            href={ROUTES.REGISTER}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transform hover:scale-105 transition-all shadow-xl"
          >
            Start your free trial
          </a>
        </div>
      </section>
    </div>
  );
};
