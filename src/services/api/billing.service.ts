/**
 * Subscriptions API service
 * Handles billing and subscription operations
 */

import apiClient from './client';
import { API_SUBSCRIPTIONS } from '@/constants/api';

export interface CreateSubscriptionRequest {
  name: string;
  description?: string;
  price: number;
  period?: number;
  seats_count?: number;
}

export interface UpdateSubscriptionRequest {
  name?: string;
  description?: string;
  price?: number;
  period?: number;
  seats_count?: number;
}

export interface SubscribeRequest {
  subscription_id: number;
}

export const subscriptionsService = {
  // ============ Admin: Subscription Plans Management ============

  /**
   * Get list of all subscription plans
   */
  async listPlans(): Promise<unknown> {
    const response = await apiClient.get(API_SUBSCRIPTIONS.PLANS_LIST);
    return response.data;
  },

  /**
   * Get a single subscription plan
   */
  async getPlan(subscriptionId: string | number): Promise<unknown> {
    const response = await apiClient.get(API_SUBSCRIPTIONS.PLANS_GET(subscriptionId));
    return response.data;
  },

  /**
   * Create a new subscription plan (admin)
   */
  async createPlan(data: CreateSubscriptionRequest): Promise<unknown> {
    const response = await apiClient.post(API_SUBSCRIPTIONS.PLANS_CREATE, data);
    return response.data;
  },

  /**
   * Update a subscription plan (admin)
   */
  async updatePlan(
    subscriptionId: string | number,
    data: UpdateSubscriptionRequest
  ): Promise<unknown> {
    const response = await apiClient.patch(API_SUBSCRIPTIONS.PLANS_UPDATE(subscriptionId), data);
    return response.data;
  },

  /**
   * Delete a subscription plan (admin)
   */
  async deletePlan(subscriptionId: string | number): Promise<void> {
    await apiClient.delete(API_SUBSCRIPTIONS.PLANS_DELETE(subscriptionId));
  },

  // ============ User Subscriptions ============

  /**
   * Get user's subscriptions
   */
  async getUserSubscriptions(): Promise<unknown> {
    const response = await apiClient.get(API_SUBSCRIPTIONS.USER_LIST);
    return response.data;
  },

  /**
   * Subscribe to a plan
   */
  async subscribe(data: SubscribeRequest): Promise<unknown> {
    const response = await apiClient.post(API_SUBSCRIPTIONS.USER_SUBSCRIBE, data);
    return response.data;
  },
};
