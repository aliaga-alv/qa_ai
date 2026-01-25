import { useState } from 'react';
import { CreditCard, Download, Check, Zap, TrendingUp, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import type { PaymentMethod, Invoice } from '../../types/models';
import { mockPaymentMethod, mockInvoices, billingPlans } from '@/mocks';

// TODO: Replace with real API data

export default function BillingSettingsPage() {
  const [currentPlan] = useState('pro');
  const [paymentMethod] = useState<PaymentMethod>(mockPaymentMethod);
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');

  const handleUpgradePlan = (planId: string) => {
    toast.success('Plan upgrade initiated', {
      description: `Upgrading to ${billingPlans.find((p) => p.id === planId)?.name} plan...`,
    });
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    toast.success('Downloading invoice', {
      description: `Invoice ${invoice.id} is being downloaded.`,
    });
  };

  const handleUpdatePayment = () => {
    toast.success('Payment method updated', {
      description: 'Your payment information has been saved.',
    });
  };

  const currentPlanData = billingPlans.find((p) => p.id === currentPlan);
  const yearlyDiscount = 0.2; // 20% discount for yearly

  return (
    <div className="max-w-6xl space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Billing & Plans</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your subscription, payment methods, and billing history.
        </p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Zap className="h-6 w-6" />
              <h2 className="text-2xl font-bold">{currentPlanData?.name} Plan</h2>
            </div>
            <p className="text-white/90 mb-4">
              Your subscription renews on {format(new Date(2026, 1, 1), 'MMMM d, yyyy')}
            </p>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold">${currentPlanData?.price}</span>
              <span className="text-white/80">/ month</span>
            </div>
          </div>
          <button
            onClick={() => handleUpgradePlan('enterprise')}
            className="px-4 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Test Runs This Month</p>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">8,247</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Unlimited remaining</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Team Members</p>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">5 / 20</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">15 seats available</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Data Storage</p>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">42 GB</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">90 days retention</p>
        </div>
      </div>

      {/* Available Plans */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Available Plans</h2>
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setBillingInterval('month')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                billingInterval === 'month'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('year')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                billingInterval === 'year'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Yearly
              <span className="ml-1 text-xs text-green-600 dark:text-green-400">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {billingPlans.map((plan) => {
            const price = billingInterval === 'year' ? Math.round(plan.price * 12 * (1 - yearlyDiscount)) : plan.price;
            const isCurrent = plan.id === currentPlan;

            return (
              <div
                key={plan.id}
                className={`relative rounded-xl border-2 p-6 ${
                  plan.recommended
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                      Recommended
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${billingInterval === 'year' ? price : plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      / {billingInterval === 'year' ? 'year' : 'month'}
                    </span>
                  </div>
                  {billingInterval === 'year' && plan.price > 0 && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      ${Math.round(price / 12)}/month billed annually
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => !isCurrent && handleUpgradePlan(plan.id)}
                  disabled={isCurrent}
                  className={`w-full py-2.5 rounded-lg font-medium transition-all ${
                    isCurrent
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : plan.recommended
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white'
                      : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                  }`}
                >
                  {isCurrent ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Method</h2>
          </div>
          <button
            onClick={handleUpdatePayment}
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            Update
          </button>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="p-3 bg-white dark:bg-gray-600 rounded-lg">
            <CreditCard className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {paymentMethod.brand} •••• {paymentMethod.last4}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Expires {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}
            </p>
          </div>
          {paymentMethod.isDefault && (
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-medium rounded">
              Default
            </span>
          )}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Billing History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                  Description
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                  Status
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    {format(invoice.date, 'MMM d, yyyy')}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{invoice.description}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        invoice.status === 'paid'
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                          : invoice.status === 'pending'
                          ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                          : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      }`}
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(invoice)}
                      className="inline-flex items-center space-x-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
