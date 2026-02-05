import { useQuery, useMutation, useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  subscriptionService,
  type Subscription,
  type UserSubscription,
  type CreateSubscriptionPayload,
  type UpdateSubscriptionPayload,
} from '@/services/api/subscription.service';

/**
 * React Query hooks for subscription management
 * Follows established error handling pattern from useTeam.ts
 */

// ============================================================================
// Query Keys
// ============================================================================

export const subscriptionKeys = {
  all: ['subscriptions'] as const,
  plans: () => [...subscriptionKeys.all, 'plans'] as const,
  plan: (id: number) => [...subscriptionKeys.plans(), id] as const,
  userSubscriptions: () => [...subscriptionKeys.all, 'user'] as const,
};

// ============================================================================
// Admin: Plan Management Hooks
// ============================================================================

/**
 * Get all subscription plans (admin)
 * Flattens nested array response
 */
export function useSubscriptionPlans(): UseQueryResult<Subscription[], Error> {
  return useQuery({
    queryKey: subscriptionKeys.plans(),
    queryFn: async () => {
      const response = await subscriptionService.listPlans();
      // Flatten nested array [[{...}]] -> [{...}]
      return response.data.flat();
    },
  });
}

/**
 * Get single subscription plan (admin)
 */
export function useSubscriptionPlan(subscriptionId: number): UseQueryResult<Subscription, Error> {
  return useQuery({
    queryKey: subscriptionKeys.plan(subscriptionId),
    queryFn: async () => {
      const response = await subscriptionService.getPlan(subscriptionId);
      return response.data;
    },
    enabled: !!subscriptionId,
  });
}

/**
 * Create subscription plan (admin)
 */
export function useCreatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSubscriptionPayload) => subscriptionService.createPlan(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.plans() });
      toast.success('Subscription plan created successfully');
    },
    onError: (error: unknown) => {
      const apiError = error as { message?: string };
      const errorResponse = error as { response?: { data?: { errors?: { message?: string }[] } } };
      const errorMessage =
        apiError.message ||
        errorResponse.response?.data?.errors?.[0]?.message ||
        'Failed to create subscription plan';
      toast.error(errorMessage);
    },
  });
}

/**
 * Update subscription plan (admin)
 */
export function useUpdatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      subscriptionId,
      payload,
    }: {
      subscriptionId: number;
      payload: UpdateSubscriptionPayload;
    }) => subscriptionService.updatePlan(subscriptionId, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.plans() });
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.plan(variables.subscriptionId) });
      toast.success('Subscription plan updated successfully');
    },
    onError: (error: unknown) => {
      const apiError = error as { message?: string };
      const errorResponse = error as { response?: { data?: { errors?: { message?: string }[] } } };
      const errorMessage =
        apiError.message ||
        errorResponse.response?.data?.errors?.[0]?.message ||
        'Failed to update subscription plan';
      toast.error(errorMessage);
    },
  });
}

/**
 * Delete subscription plan (admin)
 */
export function useDeletePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subscriptionId: number) => subscriptionService.deletePlan(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.plans() });
      toast.success('Subscription plan deleted successfully');
    },
    onError: (error: unknown) => {
      const apiError = error as { message?: string };
      const errorResponse = error as { response?: { data?: { errors?: { message?: string }[] } } };
      const errorMessage =
        apiError.message ||
        errorResponse.response?.data?.errors?.[0]?.message ||
        'Failed to delete subscription plan';
      toast.error(errorMessage);
    },
  });
}

// ============================================================================
// User Subscription Hooks
// ============================================================================

/**
 * Get user's subscriptions
 * Flattens nested array response
 */
export function useUserSubscriptions(): UseQueryResult<UserSubscription[], Error> {
  return useQuery({
    queryKey: subscriptionKeys.userSubscriptions(),
    queryFn: async () => {
      const response = await subscriptionService.getUserSubscriptions();
      // Flatten nested array [[{...}]] -> [{...}]
      return response.data.flat();
    },
  });
}

/**
 * Subscribe to a plan
 */
export function useSubscribeToPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subscriptionId: number) => subscriptionService.subscribe(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.userSubscriptions() });
      toast.success('Successfully subscribed to plan');
    },
    onError: (error: unknown) => {
      const apiError = error as { message?: string };
      const errorResponse = error as { response?: { data?: { errors?: { message?: string }[] } } };
      const errorMessage =
        apiError.message ||
        errorResponse.response?.data?.errors?.[0]?.message ||
        'Failed to subscribe to plan';
      toast.error(errorMessage);
    },
  });
}
