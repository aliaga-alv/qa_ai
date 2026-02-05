/**
 * ProjectsPage
 * Full project management view - list, create, edit, delete projects
 */

import { useState } from 'react';
import { Plus, Search, Grid, List, FolderOpen, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useProjects, useDeleteProject } from '@/hooks/api/useProjects';
import { useProjectStore } from '@/stores/projectStore';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import CreateProjectDialog from '@/components/dashboard/projects/CreateProjectDialog';
import EditProjectDialog from '@/components/dashboard/projects/EditProjectDialog';
import ProjectCard from '@/components/dashboard/projects/ProjectCard';
import type { Project } from '@/types/api/projects';

type ViewMode = 'grid' | 'list';
type FilterStatus = 'all' | 'active' | 'archived';

export default function ProjectsPage() {
  const { selectedProject, setSelectedProject } = useProjectStore();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  // Fetch projects
  const {
    data: projectsData,
    isLoading,
    isError,
    refetch,
  } = useProjects(filterStatus === 'all' ? undefined : { status: filterStatus });

  const deleteProjectMutation = useDeleteProject();

  const projects = projectsData?.data || [];

  // Filter projects by search query
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateSuccess = async (createdProject: Project) => {
    await refetch();
    setSelectedProject(createdProject);
    toast.success('Project created and selected');
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsEditDialogOpen(true);
  };

  const handleEditSuccess = async () => {
    await refetch();
  };

  const handleDeleteProject = (id: string) => {
    setDeletingProjectId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteProject = async () => {
    if (!deletingProjectId) return;

    try {
      await deleteProjectMutation.mutateAsync(deletingProjectId);
      
      // If the deleted project was selected, clear it from store
      if (selectedProject?.id === deletingProjectId) {
        setSelectedProject(null);
      }
      
      await refetch();
      toast.success('Project deleted successfully');
    } catch (error) {
      toast.error('Failed to delete project', {
        description: 'Please try again or contact support if the problem persists.',
      });
      console.error('Error deleting project:', error);
    } finally {
      setDeletingProjectId(null);
    }
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    toast.success(`Switched to project: ${project.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Projects</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
            Manage your projects and organize your test suites
          </p>
        </div>
        <button
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-2.5 font-medium text-white transition-all hover:from-primary-600 hover:to-accent-600"
        >
          <Plus className="h-5 w-5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filters & Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Status Filter & View Mode */}
        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex rounded-lg border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-l-lg px-3 py-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
              aria-label="Grid view"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-r-lg px-3 py-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
              aria-label="List view"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <p className="text-sm font-medium text-red-800 dark:text-red-200">
              Failed to load projects. Please try again.
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && filteredProjects.length === 0 && projects.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
            <FolderOpen className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            No projects yet
          </h3>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Get started by creating your first project to organize your tests.
          </p>
          <button
            onClick={() => setIsCreateDialogOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-2 font-medium text-white transition-all hover:from-primary-600 hover:to-accent-600"
          >
            <Plus className="h-5 w-5" />
            Create Your First Project
          </button>
        </div>
      )}

      {/* No Search Results */}
      {!isLoading && !isError && filteredProjects.length === 0 && projects.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            No projects found
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Projects Grid */}
      {!isLoading && !isError && filteredProjects.length > 0 && viewMode === 'grid' && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              onSelect={handleSelectProject}
            />
          ))}
        </div>
      )}

      {/* Projects List */}
      {!isLoading && !isError && filteredProjects.length > 0 && viewMode === 'list' && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Tests
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="cursor-pointer" onClick={() => handleSelectProject(project)}>
                        <div className="font-medium text-gray-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400">
                          {project.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {project.description}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:underline dark:text-primary-400"
                      >
                        {project.url}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {project.testsCount}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          project.status === 'active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="mr-3 text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dialogs */}
      <CreateProjectDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      <EditProjectDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingProject(null);
        }}
        onSuccess={handleEditSuccess}
        project={editingProject}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setDeletingProjectId(null);
        }}
        onConfirm={confirmDeleteProject}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone and will remove all associated tests and data."
        confirmText="Delete Project"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
