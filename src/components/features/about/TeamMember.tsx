import { Linkedin, X } from 'lucide-react';
import type { TeamMemberData } from '@/types/models';

interface TeamMemberProps {
  member: TeamMemberData;
}

export const TeamMember = ({ member }: TeamMemberProps) => {
  return (
    <div className="group">
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <div className="aspect-square bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center">
          <span className="text-6xl font-bold text-primary-600 dark:text-primary-400">
            {member.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
        {member.name}
      </h3>
      <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
        {member.role}
      </p>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        {member.bio}
      </p>
      <div className="flex gap-3">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label={`${member.name} on LinkedIn`}
          >
            <Linkedin className="w-5 h-5" />
          </a>
        )}
        {member.x && (
          <a
            href={member.x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label={`${member.name} on X`}
          >
            <X className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
};
