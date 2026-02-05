import { useState } from 'react';
import { CreditCard, Download, Check, Zap, TrendingUp, Calendar, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import type { PaymentMethod, Invoice } from '@/types/models';
import { mockPaymentMethod, mockInvoices } from '@/mocks';
import {
  useSubscriptionPlans,
  useUserSubscriptions,
  useSubscribeToPlan,
} from '@/hooks/api/useSubscriptions';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import ConfirmDialog from '@/components/common/ConfirmDialog';

export default function BillingSettingsPage() {
  const [paymentMethod] = useState<PaymentMethod>(mockPaymentMethod);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: 'subscribe' | 'upgrade' | null;
    planId?: number;
    planName?: string;
  }>({ isOpen: false, type: null });

  // Fetch subscription plans and user subscriptions
  const { data: plans = [], isLoading: isLoadingPlans, error: plansError } = useSubscriptionPlans();
  const { data: userSubscriptions = [], isLoading: isLoadingUserSubs } = useUserSubscriptions();
  const subscribeMutation = useSubscribeToPlan();

  // Determine current plan from user's active subscription
  const activeSubscription = userSubscriptions.find((sub) => sub.status === 'active');
  const currentPlanId = activeSubscription?.subscription_id;
  const currentPlanData = activeSubscription?.subscription; // Use nested subscription data

  const openSubscribeDialog = (planId: number, planName: string) => {
    setConfirmDialog({ isOpen: true, type: 'subscribe', planId, planName });
  };

  const openUpgradeDialog = (planId: number, planName: string) => {
    setConfirmDialog({ isOpen: true, type: 'upgrade', planId, planName });
  };

  const handleConfirmAction = async () => {
    const { type, planId } = confirmDialog;

    if (!type) return;

    try {
      if (type === 'subscribe' || type === 'upgrade') {
        if (planId) {
          await subscribeMutation.mutateAsync(planId);
        }
      }
    } catch (error) {
      console.error(`Failed to ${type}:`, error);
    }
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

  // Loading state
  if (isLoadingPlans || isLoadingUserSubs) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Error state
  if (plansError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ErrorMessage
          title="Failed to load subscription plans"
          message={plansError.message || 'Please try again later'}
        />
      </div>
    );
  }

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
      {currentPlanData && (
        <div className="rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center space-x-3">
                <Zap className="h-6 w-6" />
                <h2 className="text-2xl font-bold">{currentPlanData.name}</h2>
              </div>
              <p className="mb-4 text-white/90">
                {activeSubscription?.ends_at
                  ? `Your subscription renews on ${format(new Date(activeSubscription.ends_at), 'MMMM d, yyyy')}`
                  : `Subscribed since ${format(new Date(activeSubscription?.starts_at || new Date()), 'MMMM d, yyyy')}`}
              </p>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold">${currentPlanData.price}</span>
                <span className="text-white/80">/ {currentPlanData.period || 'month'}</span>
              </div>
              <div className="mt-3 flex items-center space-x-2 text-sm text-white/90">
                <Check className="h-4 w-4" />
                <span>{currentPlanData.seats_count} team seats</span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  const higherPlan = plans.find((p) => p.price > (currentPlanData?.price || 0));
                  if (higherPlan) {
                    openUpgradeDialog(higherPlan.id, higherPlan.name);
                  }
                }}
                disabled={
                  subscribeMutation.isPending ||
                  !plans.find((p) => p.price > (currentPlanData?.price || 0))
                }
                className="rounded-lg bg-white px-4 py-2 font-medium text-primary-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {subscribeMutation.isPending ? (
                  <span className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Upgrading...</span>
                  </span>
                ) : (
                  'Upgrade Plan'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Active Plan */}
      {!currentPlanData && (
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-800">
          <Zap className="mx-auto mb-3 h-12 w-12 text-gray-400" />
          <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">No Active Plan</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose a plan below to get started with QA AI
          </p>
        </div>
      )}

      {/* Usage Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">Test Runs This Month</p>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">8,247</p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Unlimited remaining</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">Team Members</p>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">5 / 20</p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">15 seats available</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">Data Storage</p>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">42 GB</p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">90 days retention</p>
        </div>
      </div>

      {/* Available Plans */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Available Plans</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Choose the plan that best fits your team's needs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan) => {
            const isCurrent = plan.id === currentPlanId;
            const isRecommended = plan.name.toLowerCase() === 'pro'; // Mark "Pro" as recommended

            return (
              <div
                key={plan.id}
                className={`relative rounded-xl border-2 p-6 ${
                  isRecommended
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-white">
                      Recommended
                    </span>
                  </div>
                )}

                <div className="mb-6 text-center">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 dark:text-gray-400">/ {plan.period}</span>
                    )}
                  </div>
                  {plan.description && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {plan.description}
                    </p>
                  )}
                </div>

                <div className="mb-6 space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>{plan.seats_count} team seats</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!isCurrent) {
                      if (currentPlanData) {
                        openUpgradeDialog(plan.id, plan.name);
                      } else {
                        openSubscribeDialog(plan.id, plan.name);
                      }
                    }
                  }}
                  disabled={isCurrent || subscribeMutation.isPending}
                  className={`w-full rounded-lg py-2.5 font-medium transition-all ${
                    isCurrent
                      ? 'cursor-not-allowed bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                      : isRecommended
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600'
                        : 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {subscribeMutation.isPending ? (
                    <span className="flex items-center justify-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Processing...</span>
                    </span>
                  ) : isCurrent ? (
                    'Current Plan'
                  ) : (
                    `Subscribe to ${plan.name}`
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/20">
              <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Method</h2>
          </div>
          <button
            onClick={handleUpdatePayment}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Update
          </button>
        </div>

        <div className="flex items-center space-x-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
          <div className="rounded-lg bg-white p-3 dark:bg-gray-600">
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
            <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-600 dark:bg-green-900/20 dark:text-green-400">
              Default
            </span>
          )}
        </div>
      </div>

      {/* Billing History */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4 flex items-center space-x-3">
          <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/20">
            <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Billing History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-gray-200 last:border-0 dark:border-gray-700"
                >
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {format(invoice.date, 'MMM d, yyyy')}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {invoice.description}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                          : invoice.status === 'pending'
                            ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                            : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                      }`}
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(invoice)}
                      className="inline-flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
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

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen && confirmDialog.type === 'subscribe'}
        onClose={() => setConfirmDialog({ isOpen: false, type: null })}
        onConfirm={handleConfirmAction}
        title="Subscribe to Plan"
        message={`Are you sure you want to subscribe to the ${confirmDialog.planName} plan? You will be charged according to the plan pricing.`}
        confirmText="Subscribe"
        cancelText="Cancel"
        variant="info"
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen && confirmDialog.type === 'upgrade'}
        onClose={() => setConfirmDialog({ isOpen: false, type: null })}
        onConfirm={handleConfirmAction}
        title="Upgrade Plan"
        message={`Are you sure you want to upgrade to the ${confirmDialog.planName} plan? Your billing will be adjusted accordingly.`}
        confirmText="Upgrade"
        cancelText="Cancel"
        variant="info"
      />
    </div>
  );
}
