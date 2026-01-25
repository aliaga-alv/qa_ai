import { Linkedin, X } from 'lucide-react';
import type { TeamMemberData } from '@/types/models';

interface TeamMemberProps {
  member: TeamMemberData;
}

export const TeamMember = ({ member }: TeamMemberProps) => {
  return (
    <div className="group">
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30">
          <span className="text-6xl font-bold text-primary-600 dark:text-primary-400">
            {member.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
      <p className="mb-2 font-medium text-primary-600 dark:text-primary-400">{member.role}</p>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
      <div className="flex gap-3">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
            aria-label={`${member.name} on LinkedIn`}
          >
            <Linkedin className="h-5 w-5" />
          </a>
        )}
        {member.x && (
          <a
            href={member.x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
            aria-label={`${member.name} on X`}
          >
            <X className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
};
