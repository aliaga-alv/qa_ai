import type { AxiosResponse } from 'axios';
import { apiClient } from './client';
import { API_SUBSCRIPTIONS } from '@/constants/api';

/**
 * Subscription service for managing subscription plans and user subscriptions
 * Matches backend API structure from OpenAPI documentation
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Subscription plan from backend
 */
export interface Subscription {
  id: number;
  name: string;
  description: string | null;
  price: number;
  period: string; // 'monthly' | 'yearly' etc.
  seats_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * User's subscription with nested plan details
 */
export interface UserSubscription {
  id: number;
  user_id: number;
  subscription_id: number;
  subscription: {
    id: number;
    name: string;
    price: number;
    period: string | null;
    seats_count: number;
  };
  starts_at: string;
  ends_at: string | null;
  status: string; // 'active' | 'canceled' | 'expired'
}

/**
 * Create subscription plan payload (admin)
 */
export interface CreateSubscriptionPayload {
  name: string;
  description?: string;
  price: number;
  period: string;
  seats_count: number;
}

/**
 * Update subscription plan payload (admin)
 */
export interface UpdateSubscriptionPayload {
  name?: string;
  description?: string;
  price?: number;
  period?: string;
  seats_count?: number;
}

/**
 * Subscribe to a plan payload (user)
 */
export interface SubscribePayload {
  subscription_id: number;
}

/**
 * Standard API response with nested array
 */
export interface SubscriptionsResponse {
  success: number;
  data: Subscription[][];
}

/**
 * User subscriptions response
 */
export interface UserSubscriptionsResponse {
  success: number;
  data: UserSubscription[][];
}

/**
 * Single subscription response
 */
export interface SubscriptionResponse {
  success: number;
  data: Subscription;
}

/**
 * Delete response
 */
export interface DeleteResponse {
  success: number;
  message: string;
}

// ============================================================================
// Admin Plan Management
// ============================================================================

/**
 * List all subscription plans (admin)
 */
export const subscriptionService = {
  // Admin: Plan Management
  listPlans: async (): Promise<SubscriptionsResponse> => {
    const response: AxiosResponse<SubscriptionsResponse> = await apiClient.get(
      API_SUBSCRIPTIONS.PLANS_LIST
    );
    return response.data;
  },

  /**
   * Create new subscription plan (admin)
   */
  createPlan: async (payload: CreateSubscriptionPayload): Promise<SubscriptionResponse> => {
    const response: AxiosResponse<SubscriptionResponse> = await apiClient.post(
      API_SUBSCRIPTIONS.PLANS_CREATE,
      JSON.stringify(payload),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },

  /**
   * Get single subscription plan (admin)
   */
  getPlan: async (subscriptionId: number): Promise<SubscriptionResponse> => {
    const response: AxiosResponse<SubscriptionResponse> = await apiClient.get(
      API_SUBSCRIPTIONS.PLANS_GET(subscriptionId)
    );
    return response.data;
  },

  /**
   * Update subscription plan (admin)
   */
  updatePlan: async (
    subscriptionId: number,
    payload: UpdateSubscriptionPayload
  ): Promise<SubscriptionResponse> => {
    const response: AxiosResponse<SubscriptionResponse> = await apiClient.patch(
      API_SUBSCRIPTIONS.PLANS_UPDATE(subscriptionId),
      JSON.stringify(payload),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },

  /**
   * Delete subscription plan (admin)
   */
  deletePlan: async (subscriptionId: number): Promise<DeleteResponse> => {
    const response: AxiosResponse<DeleteResponse> = await apiClient.delete(
      API_SUBSCRIPTIONS.PLANS_DELETE(subscriptionId)
    );
    return response.data;
  },

  // ============================================================================
  // User Subscriptions
  // ============================================================================

  /**
   * Get user's subscriptions
   */
  getUserSubscriptions: async (): Promise<UserSubscriptionsResponse> => {
    const response: AxiosResponse<UserSubscriptionsResponse> = await apiClient.get(
      API_SUBSCRIPTIONS.USER_LIST
    );
    return response.data;
  },

  /**
   * Subscribe to a plan
   */
  subscribe: async (subscriptionId: number): Promise<SubscriptionResponse> => {
    const response: AxiosResponse<SubscriptionResponse> = await apiClient.post(
      API_SUBSCRIPTIONS.USER_SUBSCRIBE,
      JSON.stringify({ subscription_id: subscriptionId }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },
};
