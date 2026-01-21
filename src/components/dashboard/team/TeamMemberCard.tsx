import { Crown, Shield, User as UserIcon, MoreVertical } from 'lucide-react';
import { useState } from 'react';

export type UserRole = 'owner' | 'admin' | 'member' | 'viewer';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  lastActive: Date;
  testsRun: number;
  status: 'active' | 'pending';
}

interface TeamMemberCardProps {
  member: TeamMember;
  currentUserRole: UserRole;
  onRoleChange: (memberId: string, newRole: UserRole) => void;
  onRemove: (memberId: string) => void;
}

const roleConfig = {
  owner: {
    icon: Crown,
    color: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-100 dark:bg-yellow-900/20',
    label: 'Owner',
  },
  admin: {
    icon: Shield,
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-900/20',
    label: 'Admin',
  },
  member: {
    icon: UserIcon,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    label: 'Member',
  },
  viewer: {
    icon: UserIcon,
    color: 'text-gray-600 dark:text-gray-400',
    bg: 'bg-gray-100 dark:bg-gray-700',
    label: 'Viewer',
  },
};

export default function TeamMemberCard({
  member,
  currentUserRole,
  onRoleChange,
  onRemove,
}: TeamMemberCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const config = roleConfig[member.role];
  const RoleIcon = config.icon;

  const canManage = currentUserRole === 'owner' || currentUserRole === 'admin';
  const canChangeRole = canManage && member.role !== 'owner';

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
            {member.avatar ? (
              <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
            ) : (
              member.name.charAt(0).toUpperCase()
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                {member.name}
              </h3>
              {member.status === 'pending' && (
                <span className="px-2 py-0.5 text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded">
                  Pending
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate mb-2">{member.email}</p>
            
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span>{member.testsRun} tests run</span>
              <span>•</span>
              <span>
                Active {new Date(member.lastActive).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Role & Actions */}
        <div className="flex items-center space-x-2 ml-4">
          <span className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-full ${config.bg}`}>
            <RoleIcon className={`h-3.5 w-3.5 ${config.color}`} />
            <span className={config.color}>{config.label}</span>
          </span>

          {canManage && member.role !== 'owner' && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                  {canChangeRole && (
                    <>
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
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
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="capitalize">{role}</span>
                        </button>
                      ))}
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                    </>
                  )}
                  <button
                    onClick={() => {
                      onRemove(member.id);
                      setShowMenu(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
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
