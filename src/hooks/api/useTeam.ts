/**
 * Team API hooks
 * TanStack Query hooks for team management
 *
 * Available backend operations:
 * - Get teams list
 * - Update team name
 * - Set default team
 * - Invite member
 * - Accept invitation
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { teamService } from '@/services/api/team.service';
import { QUERY_KEYS } from '@/constants/query-keys';
import type { InviteMemberRequest } from '@/types/api/team';
import type { AcceptInvitationRequest, UpdateTeamRequest } from '@/services/api/team.service';

/**
 * Hook to fetch all teams for current user
 * Returns list of teams user is a member of
 * Flattens the nested array response from backend
 */
export function useTeams() {
  return useQuery({
    queryKey: QUERY_KEYS.team.all,
    queryFn: async () => {
      const response = await teamService.list();
      // Flatten nested array: [[{...}]] -> [{...}]
      return {
        ...response,
        data: response.data.flat(),
      };
    },
  });
}

/**
 * Hook to update team name
 * Only owners and admins can update
 */
export function useUpdateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['team:update'],
    mutationFn: ({ teamId, data }: { teamId: string | number; data: UpdateTeamRequest }) =>
      teamService.update(teamId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.team.all });
      toast.success('Team updated', {
        description: 'Team name has been updated successfully.',
      });
    },
    onError: (error: unknown) => {
      const apiError = error as { message?: string };
      const errorMessage = apiError?.message || 'Failed to update team';
      toast.error('Update failed', {
        description: errorMessage,
      });
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
      toast.success('Default team updated', {
        description: 'This team is now your default workspace.',
      });
    },
    onError: (error: unknown) => {
      const apiError = error as { message?: string };
      const errorMessage = apiError?.message || 'Failed to set default team';
      toast.error('Operation failed', {
        description: errorMessage,
      });
    },
  });
}

/**
 * Hook to invite a team member
 * Only owners and admins can invite
 * Sends invitation email with token
 */
export function useInviteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['team:invite'],
    mutationFn: ({ teamId, data }: { teamId: string | number; data: InviteMemberRequest }) =>
      teamService.invite(teamId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.team.all });
      toast.success('Invitation sent', {
        description: `An invitation email has been sent to ${variables.data.email}`,
      });
    },
    onError: (error: unknown) => {
      const apiError = error as { message?: string };
      const errorMessage = apiError?.message || 'Failed to send invitation';
      toast.error('Invitation failed', {
        description: errorMessage,
      });
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
      toast.success('Invitation accepted', {
        description: 'You have successfully joined the team.',
      });
    },
    onError: (error: unknown) => {
      const apiError = error as { message?: string };
      const errorMessage = apiError?.message || 'Failed to accept invitation';
      toast.error('Operation failed', {
        description: errorMessage,
      });
    },
  });
}
