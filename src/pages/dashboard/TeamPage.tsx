import { useState } from 'react';
import { Users, Star, Settings2, Mail, AlertCircle } from 'lucide-react';
import { useTeams, useSetDefaultTeam, useInviteMember, useUpdateTeam } from '@/hooks/api/useTeam';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import InviteMemberModal from '@/components/dashboard/team/InviteMemberModal';
import type { UserRole } from '@/types/models';
import { cn } from '@/lib/utils';

/**
 * Team Page - Manage teams and invite members
 * 
 * Available backend operations:
 * - Get teams list
 * - Set default team
 * - Update team name
 * - Invite members (sends email)
 * 
 * Note: Backend doesn't have team members list endpoints yet
 * Team members management will be added when backend supports it
 */

export default function TeamPage() {
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState<number | null>(null);
  const [newTeamName, setNewTeamName] = useState('');

  // API hooks
  const { data: teamsData, isLoading, isError, error } = useTeams();
  const setDefaultMutation = useSetDefaultTeam();
  const inviteMutation = useInviteMember();
  const updateTeamMutation = useUpdateTeam();

  const teams = teamsData?.data || [];

  // Get role badge colors based on role type
  const getRoleBadgeColors = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm';
      case 'admin':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm';
      case 'member':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm';
      case 'viewer':
        return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-sm';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const handleSetDefault = async (teamId: number) => {
    try {
      await setDefaultMutation.mutateAsync(teamId);
    } catch (err) {
      console.error('Failed to set default team:', err);
    }
  };

  const handleInvite = async (email: string, role: UserRole) => {
    if (!selectedTeamId) return;

    try {
      await inviteMutation.mutateAsync({
        teamId: selectedTeamId,
        data: { email, role },
      });
      setIsInviteModalOpen(false);
    } catch (err) {
      console.error('Failed to invite member:', err);
    }
  };

  const handleStartEdit = (teamId: number, currentName: string) => {
    setIsEditingName(teamId);
    setNewTeamName(currentName);
  };

  const handleCancelEdit = () => {
    setIsEditingName(null);
    setNewTeamName('');
  };

  const handleSaveEdit = async (teamId: number) => {
    if (!newTeamName.trim()) return;

    try {
      await updateTeamMutation.mutateAsync({
        teamId,
        data: { name: newTeamName.trim() },
      });
      setIsEditingName(null);
      setNewTeamName('');
    } catch (err) {
      console.error('Failed to update team name:', err);
    }
  };

  const handleOpenInviteModal = (teamId: number) => {
    setSelectedTeamId(teamId);
    setIsInviteModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorMessage
        title="Failed to load teams"        message={(error as any)?.message || 'An error occurred while loading teams'}
      />
    );
  }

  if (teams.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teams</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your teams and collaborate with others.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-12 dark:border-gray-700 dark:bg-gray-800">
          <div className="text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No teams yet</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              You haven't joined any teams yet. Teams are created automatically when you're invited by other users.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teams</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your teams and invite collaborators.
        </p>
      </div>

      {/* Info message about team members */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
        <div className="flex items-start space-x-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Team Members Coming Soon</h3>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
              You can invite members via email. Team members list and management features will be available once backend support is added.
            </p>
          </div>
        </div>
      </div>

      {/* Teams list */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => {
          const isEditing = isEditingName === team.id;

          return (
            <div
              key={team.id}
              className={cn(
                'group rounded-xl border p-6 shadow-sm transition-all hover:shadow-md',
                team.is_default
                  ? 'border-primary-200 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:border-primary-700 dark:from-primary-950 dark:via-gray-800 dark:to-accent-950'
                  : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'
              )}
            >
              {/* Team header */}
              <div className="mb-4 flex items-start justify-between">
                {isEditing ? (
                  <div className="flex-1">
                    <input
                      type="text"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit(team.id);
                        if (e.key === 'Escape') handleCancelEdit();
                      }}
                    />
                    <div className="mt-2 flex space-x-2">
                      <button
                        onClick={() => handleSaveEdit(team.id)}
                        disabled={updateTeamMutation.isPending}
                        className="rounded-lg bg-primary-500 px-3 py-1 text-sm font-medium text-white hover:bg-primary-600 disabled:opacity-50"
                      >
                        {updateTeamMutation.isPending ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="rounded-lg border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {team.name}
                      </h3>
                    </div>
                    {(team.role === 'owner' || team.role === 'admin') && (
                      <button
                        onClick={() => handleStartEdit(team.id, team.name)}
                        className="rounded-lg p-2 text-gray-400 opacity-0 transition-all hover:bg-primary-50 hover:text-primary-600 group-hover:opacity-100 dark:hover:bg-primary-900 dark:hover:text-primary-400"
                        title="Edit team name"
                      >
                        <Settings2 className="h-4 w-4" />
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Default badge */}
              {team.is_default && (
                <div className="mb-4 inline-flex items-center space-x-1.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 px-3 py-1.5 text-sm font-medium text-white shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span>Default Team</span>
                </div>
              )}

              {/* Team info */}
              <div className="mb-4 flex items-center space-x-2 text-sm">
                <span className="font-medium text-gray-600 dark:text-gray-400">Your Role:</span>
                <span className={cn(
                  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize',
                  getRoleBadgeColors(team.role)
                )}>
                  {team.role}
                </span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                {!team.is_default && (
                  <button
                    onClick={() => handleSetDefault(team.id)}
                    disabled={setDefaultMutation.isPending}
                    className="flex-1 rounded-lg border-2 border-primary-200 bg-white px-4 py-2.5 text-sm font-semibold text-primary-600 transition-all hover:border-primary-300 hover:bg-primary-50 disabled:opacity-50 dark:border-primary-800 dark:bg-gray-800 dark:text-primary-400 dark:hover:border-primary-700 dark:hover:bg-primary-950"
                  >
                    {setDefaultMutation.isPending ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <Star className="h-4 w-4" />
                        <span>Set Default</span>
                      </span>
                    )}
                  </button>
                )}
                {(team.role === 'owner' || team.role === 'admin') && (
                  <button
                    onClick={() => handleOpenInviteModal(team.id)}
                    disabled={inviteMutation.isPending}
                    className={cn(
                      'rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:from-primary-600 hover:to-accent-600 disabled:opacity-50',
                      team.is_default ? 'flex-1' : 'flex-initial'
                    )}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Invite</span>
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Invite Modal */}
      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => {
          setIsInviteModalOpen(false);
          setSelectedTeamId(null);
        }}
        onInvite={handleInvite}
      />
    </div>
  );
}
