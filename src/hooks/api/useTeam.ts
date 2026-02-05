/**
 * Team API hooks
 * TanStack Query hooks for team management
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamService } from '@/services/api/team.service';
import { QUERY_KEYS, MUTATION_KEYS } from '@/constants/query-keys';
import type {
  InviteMemberRequest,
  AcceptInvitationRequest,
  UpdateTeamRequest,
} from '@/services/api/team.service';

/**
 * Hook to fetch all teams for current user
 */
export function useTeams() {
  return useQuery({
    queryKey: QUERY_KEYS.team.all,
    queryFn: () => teamService.list(),
  });
}

/**
 * Hook to fetch a single team by ID
 */
export function useTeam(teamId: string | number) {
  return useQuery({
    queryKey: QUERY_KEYS.team.member(String(teamId)),
    queryFn: () => teamService.get(teamId),
    enabled: !!teamId,
  });
}

/**
 * Hook to update team
 */
export function useUpdateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.team.updateRole],
    mutationFn: ({ teamId, data }: { teamId: string | number; data: UpdateTeamRequest }) =>
      teamService.update(teamId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.team.all });
    },
  });
}

/**
 * Hook to set team as default
 */
export function useSetDefaultTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['team:setDefault'],
    mutationFn: (teamId: string | number) => teamService.setDefault(teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.team.all });
    },
  });
}

/**
 * Hook to invite a team member
 */
export function useInviteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.team.invite],
    mutationFn: ({ teamId, data }: { teamId: string | number; data: InviteMemberRequest }) =>
      teamService.invite(teamId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.team.all });
    },
  });
}

/**
 * Hook to accept team invitation
 */
export function useAcceptInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['team:acceptInvitation'],
    mutationFn: (data: AcceptInvitationRequest) => teamService.acceptInvitation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.team.all });
    },
  });
}
