import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { PricingTier } from '@/types/models';

interface PricingCardProps {
  tier: PricingTier;
  isAnnual: boolean;
}

export const PricingCard = ({ tier, isAnnual }: PricingCardProps) => {
  const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
  const monthlySavings = isAnnual
    ? parseFloat(((tier.monthlyPrice * 12 - tier.annualPrice) / 12).toFixed(0))
    : 0;

  return (
    <div
      className={`relative rounded-2xl border p-8 shadow-lg transition-all hover:shadow-xl ${
        tier.popular
          ? 'scale-105 border-primary-500 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20'
          : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
      } `}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary-600 to-accent-600 px-4 py-1 text-sm font-semibold text-white shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{tier.name}</h2>
        <p className="text-gray-600 dark:text-gray-400">{tier.description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold text-gray-900 dark:text-white">${price}</span>
          <span className="text-gray-600 dark:text-gray-400">/month</span>
        </div>
        {isAnnual && monthlySavings > 0 && (
          <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
            Save ${monthlySavings}/month with annual billing
          </p>
        )}
        {isAnnual && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            ${tier.annualPrice} billed annually
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="mb-8 space-y-4">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600 dark:text-primary-400" />
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link
        to={tier.ctaLink}
        className={`block w-full rounded-lg px-6 py-3 text-center font-semibold transition-all ${
          tier.popular
            ? 'transform bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg hover:scale-105 hover:from-primary-700 hover:to-accent-700 hover:shadow-xl'
            : 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
        } `}
      >
        {tier.cta}
      </Link>
    </div>
  );
};
