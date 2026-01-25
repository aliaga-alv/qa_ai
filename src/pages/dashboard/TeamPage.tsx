import { useState } from 'react';
import { UserPlus, Users, Search } from 'lucide-react';
import { toast } from 'sonner';
import TeamMemberCard from '../../components/dashboard/team/TeamMemberCard';
import InviteMemberModal from '../../components/dashboard/team/InviteMemberModal';
import type { TeamMember, UserRole } from '@/types/models';
import { mockTeamMembers } from '@/mocks';

// TODO: Replace with real API data

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const currentUserRole: UserRole = 'owner'; // TODO: Get from auth context

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (memberId: string, newRole: UserRole) => {
    setMembers((prev) =>
      prev.map((member) => (member.id === memberId ? { ...member, role: newRole } : member))
    );
    toast.success('Role updated', {
      description: 'Team member role has been changed successfully.',
    });
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== memberId));
    toast.success('Member removed', {
      description: 'Team member has been removed from the team.',
    });
  };

  const handleInvite = (email: string, role: UserRole) => {
    const now = Date.now();
    const newMember: TeamMember = {
      id: now.toString(),
      name: email.split('@')[0],
      email,
      role,
      lastActive: new Date(now),
      testsRun: 0,
      status: 'pending',
    };
    setMembers((prev) => [...prev, newMember]);
    toast.success('Invitation sent', {
      description: `An invitation has been sent to ${email}`,
    });
  };

  const stats = [
    {
      label: 'Total Members',
      value: members.filter((m) => m.status === 'active').length.toString(),
    },
    {
      label: 'Pending Invites',
      value: members.filter((m) => m.status === 'pending').length.toString(),
    },
    {
      label: 'Admins',
      value: members.filter((m) => m.role === 'admin' || m.role === 'owner').length.toString(),
    },
    { label: 'Total Tests Run', value: members.reduce((sum, m) => sum + m.testsRun, 0).toString() },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your team members and their access permissions.
          </p>
        </div>
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-2.5 font-medium text-white transition-all hover:from-primary-600 hover:to-accent-600"
        >
          <UserPlus className="h-5 w-5" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
          >
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
        <div className="relative flex-1 sm:flex-initial">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 sm:w-80"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-gray-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as typeof roleFilter)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Roles</option>
            <option value="owner">Owner</option>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
      </div>

      {/* Team Members */}
      <div className="space-y-3">
        {filteredMembers.map((member) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            currentUserRole={currentUserRole}
            onRoleChange={handleRoleChange}
            onRemove={handleRemoveMember}
          />
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 dark:border-gray-700 dark:bg-gray-800">
          <div className="text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">No team members found</p>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
              Try adjusting your filters or invite new members
            </p>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInvite}
      />
    </div>
  );
}
