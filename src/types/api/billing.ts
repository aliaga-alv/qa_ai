/**
 * Billing API request/response types
 */

import type { Plan, Invoice } from '@/types/models/billing';

// Alias for consistency with API naming
export type BillingPlan = Plan;

// ============== Requests ==============

export interface SubscribeRequest {
  planId: string;
  paymentMethodId: string;
  billingCycle: 'monthly' | 'yearly';
}

export interface UpdatePaymentMethodRequest {
  paymentMethodId: string;
}

export interface CancelSubscriptionRequest {
  reason?: string;
  feedback?: string;
}

export interface InvoiceListParams {
  page?: number;
  limit?: number;
  status?: 'paid' | 'pending' | 'failed';
}

// ============== Responses ==============

export interface SubscriptionResponse {
  subscription: {
    id: string;
    plan: BillingPlan;
    status: 'active' | 'cancelled' | 'expired' | 'trial';
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
    trialEndsAt?: Date;
  };
}

export interface InvoicesResponse {
  invoices: Invoice[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface UsageResponse {
  usage: {
    testsRun: number;
    testsLimit: number;
    apiCalls: number;
    apiCallsLimit: number;
    storage: number;
    storageLimit: number;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
  };
  history: Array<{
    date: string;
    testsRun: number;
    apiCalls: number;
  }>;
}

export interface BillingPlansResponse {
  plans: BillingPlan[];
}
