import { Crown, Shield, User as UserIcon, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import type { UserRole, TeamMember } from '@/types/models';
import { TEAM_MEMBER_ROLE_CONFIG } from '@/constants/ui';

interface TeamMemberCardProps {
  member: TeamMember;
  currentUserRole: UserRole;
  onRoleChange: (memberId: string, newRole: UserRole) => void;
  onRemove: (memberId: string) => void;
}

const roleIcons = {
  owner: Crown,
  admin: Shield,
  member: UserIcon,
  viewer: UserIcon,
};

export default function TeamMemberCard({
  member,
  currentUserRole,
  onRoleChange,
  onRemove,
}: TeamMemberCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const config = TEAM_MEMBER_ROLE_CONFIG[member.role];
  const RoleIcon = roleIcons[member.role];

  const canManage = currentUserRole === 'owner' || currentUserRole === 'admin';
  const canChangeRole = canManage && member.role !== 'owner';

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-lg font-semibold text-white">
            {member.avatar ? (
              <img src={member.avatar} alt={member.name} className="h-full w-full rounded-full" />
            ) : (
              member.name.charAt(0).toUpperCase()
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center space-x-2">
              <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">
                {member.name}
              </h3>
              {member.status === 'pending' && (
                <span className="rounded bg-orange-100 px-2 py-0.5 text-xs text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                  Pending
                </span>
              )}
            </div>
            <p className="mb-2 truncate text-sm text-gray-600 dark:text-gray-400">{member.email}</p>

            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span>{member.testsRun} tests run</span>
              <span>•</span>
              <span>Active {new Date(member.lastActive).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Role & Actions */}
        <div className="ml-4 flex items-center space-x-2">
          <span
            className={`flex items-center space-x-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${config.bg}`}
          >
            <RoleIcon className={`h-3.5 w-3.5 ${config.color}`} />
            <span className={config.color}>{config.label}</span>
          </span>

          {canManage && member.role !== 'owner' && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              {showMenu && (
                <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  {canChangeRole && (
                    <>
                      <div className="px-3 py-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                        Change Role
                      </div>
                      {(['admin', 'member', 'viewer'] as UserRole[]).map((role) => (
                        <button
                          key={role}
                          onClick={() => {
                            onRoleChange(member.id, role);
                            setShowMenu(false);
                          }}
                          disabled={member.role === role}
                          className="flex w-full items-center space-x-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          <span className="capitalize">{role}</span>
                        </button>
                      ))}
                      <div className="my-1 border-t border-gray-200 dark:border-gray-700" />
                    </>
                  )}
                  <button
                    onClick={() => {
                      onRemove(member.id);
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center space-x-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                  >
                    <span>Remove from team</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
