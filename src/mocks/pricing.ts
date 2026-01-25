import type { PricingTier } from '@/types/models';
import { ROUTES } from '@/constants/routes';

/**
 * Pricing tiers configuration
 */
export const pricingTiers: PricingTier[] = [
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
