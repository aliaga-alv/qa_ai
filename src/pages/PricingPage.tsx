import { useState } from 'react';
import SEO from '@/components/common/SEO';
import { PricingCard } from '@/components/features/pricing/PricingCard';
import { PricingComparison } from '@/components/features/pricing/PricingComparison';
import { PricingFAQ } from '@/components/features/pricing/PricingFAQ';
import { pricingTiers } from '@/mocks';
import { PAGE_SEO, ROUTES } from '@/constants';

export const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO {...PAGE_SEO.pricing} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-20 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Choose the perfect plan for your team. All plans include a 14-day free trial.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="mb-16 flex items-center justify-center gap-4">
            <span
              className={`text-lg font-medium transition-colors ${
                !isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative h-8 w-16 rounded-full transition-colors ${isAnnual ? 'bg-primary-600' : 'bg-gray-600 dark:bg-gray-600'} `}
              aria-label="Toggle annual billing"
            >
              <span
                className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform ${isAnnual ? 'translate-x-8 transform' : ''} `}
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
              <span className="ml-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Save 20%
              </span>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.name} tier={tier} isAnnual={isAnnual} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="bg-white py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Compare plans
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Detailed comparison of features across all plans
            </p>
          </div>
          <div className="mx-auto max-w-6xl rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800 md:p-8">
            <PricingComparison />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
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
      <section className="bg-gradient-to-br from-primary-600 to-accent-600 py-20 dark:from-primary-900 dark:to-accent-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to get started?</h2>
          <p className="mb-8 text-xl text-white/90">
            Join thousands of teams already using QA AI to test smarter.
          </p>
          <a
            href={ROUTES.REGISTER}
            className="inline-flex transform items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-primary-700 shadow-xl transition-all hover:scale-105 hover:bg-gray-50"
          >
            Start your free trial
          </a>
        </div>
      </section>
    </div>
  );
};
