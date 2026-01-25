import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '@/types/models';

const faqs: FAQItem[] = [
  {
    question: 'Can I change plans at any time?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any charges or credits.',
  },
  {
    question: 'What happens if I exceed my plan limits?',
    answer: 'If you exceed your monthly test execution limit, we\'ll notify you and your tests will continue to run. You\'ll be charged for overage at a reduced rate, or you can upgrade to a higher tier.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required. You can cancel anytime during the trial period at no charge.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and wire transfers for Enterprise plans. All payments are processed securely through Stripe.',
  },
  {
    question: 'Is there a discount for annual billing?',
    answer: 'Yes! You save approximately 20% when you choose annual billing over monthly payments. The savings are automatically calculated and displayed when you toggle to annual pricing.',
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of your current billing period, and you won\'t be charged again.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied within the first 30 days, contact us for a full refund.',
  },
  {
    question: 'What\'s included in Enterprise support?',
    answer: 'Enterprise plans include a dedicated account manager, priority email and phone support with 2-hour response time, custom onboarding, and quarterly business reviews.',
  },
  {
    question: 'Can I add more team members?',
    answer: 'Yes! You can add additional team members to any plan. Starter and Professional plans have set limits, but you can add extra seats for a small per-user fee. Enterprise plans include unlimited team members.',
  },
  {
    question: 'Do you offer volume discounts?',
    answer: 'Yes, we offer custom pricing for teams with special requirements or high-volume needs. Contact our sales team to discuss Enterprise pricing and volume discounts.',
  },
];

export const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800"
          >
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <span className="font-semibold text-gray-900 dark:text-white pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 pt-0">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
