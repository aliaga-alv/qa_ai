/**
 * Subscriptions API hooks
 * TanStack Query hooks for billing and subscription operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionsService } from '@/services/api/billing.service';
import { QUERY_KEYS, MUTATION_KEYS } from '@/constants/query-keys';
import type {
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
  SubscribeRequest,
} from '@/services/api/billing.service';

/**
 * Hook to fetch all subscription plans
 */
export function useSubscriptionPlans() {
  return useQuery({
    queryKey: [...QUERY_KEYS.billing.all, 'plans'],
    queryFn: () => subscriptionsService.listPlans(),
  });
}

/**
 * Hook to fetch a single subscription plan
 */
export function useSubscriptionPlan(subscriptionId: string | number) {
  return useQuery({
    queryKey: [...QUERY_KEYS.billing.all, 'plan', subscriptionId],
    queryFn: () => subscriptionsService.getPlan(subscriptionId),
    enabled: !!subscriptionId,
  });
}

/**
 * Hook to fetch user's subscriptions
 */
export function useUserSubscriptions() {
  return useQuery({
    queryKey: QUERY_KEYS.billing.subscription(),
    queryFn: () => subscriptionsService.getUserSubscriptions(),
  });
}

/**
 * Hook to create a subscription plan (admin)
 */
export function useCreateSubscriptionPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['subscriptions:createPlan'],
    mutationFn: (data: CreateSubscriptionRequest) => subscriptionsService.createPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.billing.all });
    },
  });
}

/**
 * Hook to update a subscription plan (admin)
 */
export function useUpdateSubscriptionPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['subscriptions:updatePlan'],
    mutationFn: ({
      subscriptionId,
      data,
    }: {
      subscriptionId: string | number;
      data: UpdateSubscriptionRequest;
    }) => subscriptionsService.updatePlan(subscriptionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.billing.all });
    },
  });
}

/**
 * Hook to delete a subscription plan (admin)
 */
export function useDeleteSubscriptionPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['subscriptions:deletePlan'],
    mutationFn: (subscriptionId: string | number) =>
      subscriptionsService.deletePlan(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.billing.all });
    },
  });
}

/**
 * Hook to subscribe to a plan
 */
export function useSubscribe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.billing.subscribe],
    mutationFn: (data: SubscribeRequest) => subscriptionsService.subscribe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.billing.subscription() });
    },
  });
}
