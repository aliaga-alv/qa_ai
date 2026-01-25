import type { FAQItem } from '@/types/models';

/**
 * Pricing FAQ items
 */
export const pricingFAQs: FAQItem[] = [
  {
    question: 'What counts as a test execution?',
    answer: 'A test execution is a single run of any test case in your suite. If you run a test suite with 10 test cases, that counts as 10 executions.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect at the start of your next billing cycle.',
  },
  {
    question: 'What happens if I exceed my execution limit?',
    answer: 'We\'ll notify you as you approach your limit. You can either upgrade your plan or purchase additional executions as needed. Tests will continue to run normally.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied within the first 30 days, we\'ll provide a full refund, no questions asked.',
  },
  {
    question: 'Is there a free trial for paid plans?',
    answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required to start your trial.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover) and can arrange invoicing for Enterprise customers.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your current billing period.',
  },
  {
    question: 'Do you offer discounts for nonprofits or educational institutions?',
    answer: 'Yes! We offer special pricing for nonprofits and educational institutions. Contact our sales team to learn more.',
  },
];
