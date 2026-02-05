/**
 * Statistics API hooks
 * TanStack Query hooks for analytics and reporting
 */

import { useQuery } from '@tanstack/react-query';
import { statisticsService } from '@/services/api/analytics.service';
import { QUERY_KEYS } from '@/constants/query-keys';
import type { DashboardStatsResponse } from '@/types/api/analytics';

/**
 * Hook to fetch overall statistics across all user's projects
 */
export function useOverallStatistics() {
  return useQuery<DashboardStatsResponse>({
    queryKey: [...QUERY_KEYS.analytics.all, 'overview'],
    queryFn: () => statisticsService.getOverview(),
  });
}
