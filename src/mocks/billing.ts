import type { PaymentMethod, Invoice, Plan } from '@/types/models';

/**
 * Mock billing and payment data
 * TODO: Replace with real API data
 */

export const mockPaymentMethod: PaymentMethod = {
  id: '1',
  type: 'card',
  last4: '4242',
  brand: 'Visa',
  expiryMonth: 12,
  expiryYear: 2026,
  isDefault: true,
};

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    date: new Date(2026, 0, 1),
    amount: 99,
    status: 'paid',
    description: 'Pro Plan - January 2026',
    downloadUrl: '#',
  },
  {
    id: '2',
    date: new Date(2025, 11, 1),
    amount: 99,
    status: 'paid',
    description: 'Pro Plan - December 2025',
    downloadUrl: '#',
  },
  {
    id: '3',
    date: new Date(2025, 10, 1),
    amount: 99,
    status: 'paid',
    description: 'Pro Plan - November 2025',
    downloadUrl: '#',
  },
];

export const billingPlans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    interval: 'month',
    features: [
      '100 test runs per month',
      '5 team members',
      '30 days data retention',
      'Email support',
      'Basic analytics',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99,
    interval: 'month',
    features: [
      'Unlimited test runs',
      '20 team members',
      '90 days data retention',
      'Priority support',
      'Advanced analytics',
      'CI/CD integrations',
      'Custom webhooks',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    interval: 'month',
    features: [
      'Unlimited everything',
      'Unlimited team members',
      'Unlimited data retention',
      '24/7 dedicated support',
      'Advanced analytics',
      'All integrations',
      'Custom development',
      'SLA guarantee',
    ],
  },
];
