/**
 * ProjectCard component
 * Card view for project information with actions
 */

import { useState } from 'react';
import { FolderOpen, MoreVertical, Edit2, Trash2, ExternalLink, TestTube2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/api/projects';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onSelect?: (project: Project) => void;
}

export default function ProjectCard({ project, onEdit, onDelete, onSelect }: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(project.url);
    toast.success('URL copied to clipboard');
    setMenuOpen(false);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-primary-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-700">
      {/* Status Badge */}
      <div className="absolute right-4 top-4 z-10">
        <span
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium',
            project.status === 'active'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
          )}
        >
          {project.status}
        </span>
      </div>

      {/* Project Icon */}
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-6 dark:from-primary-900/20 dark:to-accent-900/20">
        <div className="flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg">
            <FolderOpen className="h-7 w-7 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3
            className="mb-2 cursor-pointer text-lg font-semibold text-gray-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
            onClick={() => onSelect?.(project)}
          >
            {project.name}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {project.description}
          </p>
        </div>

        {/* URL */}
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-900/50">
          <ExternalLink className="h-4 w-4 flex-shrink-0 text-gray-400" />
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-sm text-primary-600 hover:underline dark:text-primary-400"
          >
            {project.url}
          </a>
        </div>

        {/* Stats */}
        <div className="mb-4 flex items-center gap-4 border-t border-gray-100 pt-4 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <TestTube2 className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {project.testsCount} {project.testsCount === 1 ? 'test' : 'tests'}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Created {project.createdAt.toLocaleDateString()}
          </div>

          {/* Actions Menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <MoreVertical className="h-5 w-5" />
            </button>

            {menuOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                  aria-hidden="true"
                />

                {/* Menu */}
                <div className="absolute bottom-full right-0 z-20 mb-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <button
                    onClick={() => {
                      onEdit(project);
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit Project
                  </button>
                  <button
                    onClick={handleCopyUrl}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Copy URL
                  </button>
                  <hr className="my-1 border-gray-200 dark:border-gray-700" />
                  <button
                    onClick={() => {
                      onDelete(project.id);
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Project
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
