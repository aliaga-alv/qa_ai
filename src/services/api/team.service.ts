/**
 * Team API service
 * Handles all team management API operations
 */

import apiClient from './client';
import { API_TEAMS } from '@/constants/api';

export interface InviteMemberRequest {
  email: string;
  role: string;
}

export interface AcceptInvitationRequest {
  token: string;
}

export interface UpdateTeamRequest {
  name: string;
}

export const teamService = {
  /**
   * Get all teams the current user is a member of
   */
  async list(): Promise<unknown> {
    const response = await apiClient.get(API_TEAMS.LIST);
    return response.data;
  },

  /**
   * Get a single team by ID
   */
  async get(teamId: string | number): Promise<unknown> {
    const response = await apiClient.get(API_TEAMS.GET(teamId));
    return response.data;
  },

  /**
   * Update team name
   */
  async update(teamId: string | number, data: UpdateTeamRequest): Promise<unknown> {
    const response = await apiClient.patch(API_TEAMS.UPDATE(teamId), data);
    return response.data;
  },

  /**
   * Set team as default for current user
   */
  async setDefault(teamId: string | number): Promise<unknown> {
    const response = await apiClient.patch(API_TEAMS.SET_DEFAULT(teamId));
    return response.data;
  },

  /**
   * Invite a new team member
   */
  async invite(teamId: string | number, data: InviteMemberRequest): Promise<unknown> {
    const response = await apiClient.post(API_TEAMS.INVITE(teamId), data);
    return response.data;
  },

  /**
   * Accept team invitation
   */
  async acceptInvitation(data: AcceptInvitationRequest): Promise<unknown> {
    const response = await apiClient.post(API_TEAMS.ACCEPT_INVITATION, data);
    return response.data;
  },
};
