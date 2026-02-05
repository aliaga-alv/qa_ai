/**
 * Team API service
 * Handles all team management API operations
 *
 * Backend API endpoints:
 * - GET /api/v1/teams - Get all teams user is member of
 * - PATCH /api/v1/teams/{team_id} - Update team name
 * - PATCH /api/v1/teams/{team_id}/default - Set default team
 * - POST /api/v1/teams/{team_id}/invite - Invite member
 * - POST /api/v1/teams/accept-invitation - Accept invitation
 */

import apiClient from './client';
import { API_TEAMS } from '@/constants/api';
import type { InviteMemberRequest } from '@/types/api/team';

export interface AcceptInvitationRequest {
  token: string;
}

export interface UpdateTeamRequest {
  name: string;
}

export interface Team {
  id: number;
  name: string;
  role: string; // User's role in this team: owner, admin, member, viewer
  is_default: boolean;
}

export interface TeamsResponse {
  success: number;
  data: Team[][]; // Backend returns nested array
}

export interface TeamUpdateResponse {
  success: number;
  data: {
    message?: string;
  };
}

export interface TeamInviteResponse {
  success: number;
  data: {
    message?: string;
  };
}

export const teamService = {
  /**
   * Get all teams the current user is a member of
   */
  async list(): Promise<TeamsResponse> {
    const response = await apiClient.get<TeamsResponse>(API_TEAMS.LIST);
    return response.data;
  },

  /**
   * Update team name
   * Only owners and admins can update
   */
  async update(teamId: string | number, data: UpdateTeamRequest): Promise<TeamUpdateResponse> {
    const response = await apiClient.patch<TeamUpdateResponse>(API_TEAMS.UPDATE(teamId), data);
    return response.data;
  },

  /**
   * Set team as default for current user
   */
  async setDefault(teamId: string | number): Promise<TeamUpdateResponse> {
    const response = await apiClient.patch<TeamUpdateResponse>(API_TEAMS.SET_DEFAULT(teamId));
    return response.data;
  },

  /**
   * Invite a new team member
   * Only owners and admins can invite
   * Backend expects: {email: string, role: string}
   */
  async invite(teamId: string | number, data: InviteMemberRequest): Promise<TeamInviteResponse> {
    const response = await apiClient.post<TeamInviteResponse>(API_TEAMS.INVITE(teamId), data);
    return response.data;
  },

  /**
   * Accept team invitation
   * Uses token from invitation email
   */
  async acceptInvitation(data: AcceptInvitationRequest): Promise<TeamUpdateResponse> {
    const response = await apiClient.post<TeamUpdateResponse>(API_TEAMS.ACCEPT_INVITATION, data);
    return response.data;
  },
};
