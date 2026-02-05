/**
 * Team API request/response types
 */

import type { UserRole, TeamMember } from '@/types/models/dashboard';
import type { PaginatedResponse, PaginationParams } from './common';

// ============== Requests ==============

export interface InviteMemberRequest {
  email: string;
  role: UserRole;
  message?: string;
}

export interface UpdateMemberRoleRequest {
  role: UserRole;
}

export interface TeamMemberListParams extends PaginationParams {
  role?: UserRole;
  search?: string;
}

// ============== Responses ==============

export interface TeamMemberResponse {
  member: TeamMember;
}

export type TeamMembersResponse = PaginatedResponse<TeamMember>;

export interface TeamInvitation {
  id: string;
  email: string;
  role: UserRole;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  invitedBy: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface TeamInvitationsResponse {
  invitations: TeamInvitation[];
}

export interface TeamStatsResponse {
  stats: {
    totalMembers: number;
    owners: number;
    admins: number;
    members: number;
    viewers: number;
    pendingInvitations: number;
  };
}
