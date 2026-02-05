/**
 * ProjectSelector component
 * Dropdown to select active project in dashboard
 */

import { useEffect, useState } from 'react';
import { FolderOpen, ChevronDown, Plus } from 'lucide-react';
import { useProjects } from '@/hooks/api/useProjects';
import { useProjectStore } from '@/stores/projectStore';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import CreateProjectDialog from './projects/CreateProjectDialog';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/api/projects';

export default function ProjectSelector() {
  const { selectedProject, setSelectedProject } = useProjectStore();
  const { data, isLoading, isError, refetch } = useProjects({ status: 'active' });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Auto-select first project if none selected or if selected project no longer exists
  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      // If no project selected, select the first one
      if (!selectedProject) {
        setSelectedProject(data.data[0]);
      } else {
        // Check if selected project still exists in the list
        const stillExists = data.data.some((p) => String(p.id) === String(selectedProject.id));
        if (!stillExists) {
          // Selected project was deleted, select the first available project
          setSelectedProject(data.data[0]);
        }
      }
    }
  }, [data, selectedProject, setSelectedProject]);

  const handleProjectCreated = async (createdProject: Project) => {
    // Refetch projects list
    await refetch();

    // Auto-select the newly created project
    if (createdProject) {
      setSelectedProject(createdProject);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
        <LoadingSpinner size="sm" />
        <span className="text-sm text-gray-600 dark:text-gray-400">Loading projects...</span>
      </div>
    );
  }

  if (isError || !data?.data || data.data.length === 0) {
    return (
      <>
        <button
          onClick={() => setIsCreateDialogOpen(true)}
          className={cn(
            'flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
            'border-primary-300 bg-primary-50 text-primary-700 hover:bg-primary-100',
            'dark:border-primary-700 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/30'
          )}
        >
          <Plus className="h-4 w-4" />
          Create First Project
        </button>

        <CreateProjectDialog
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onSuccess={handleProjectCreated}
        />
      </>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => {
          const select = document.getElementById('project-select') as HTMLSelectElement;
          if (select) select.focus();
        }}
        className={cn(
          'flex w-full min-w-[240px] items-center justify-between gap-3 rounded-lg border px-4 py-2 text-left transition-colors',
          'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex-shrink-0">
            <div className="rounded-lg bg-primary-100 p-2 dark:bg-primary-900/30">
              <FolderOpen className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {selectedProject?.name || 'Select Project'}
            </p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              {selectedProject?.testsCount || 0} test
              {selectedProject?.testsCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <ChevronDown className="h-4 w-4 flex-shrink-0 text-gray-400" />
      </button>

      <select
        id="project-select"
        value={selectedProject?.id || ''}
        onChange={(e) => {
          const projectId = e.target.value;
          const project = data.data.find((p) => String(p.id) === String(projectId));
          if (project) setSelectedProject(project);
        }}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {data.data.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name} ({project.testsCount} tests)
          </option>
        ))}
      </select>
    </div>
  );
}
