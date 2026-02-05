/**
 * CreateProjectDialog component
 * Modal for creating new projects
 */

import { useState } from 'react';
import { X, FolderPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useCreateProject } from '@/hooks/api/useProjects';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { projectSchema, type ProjectFormData } from '@/schemas/project';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/api/projects';

interface CreateProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (project: Project) => void;
}

export default function CreateProjectDialog({
  isOpen,
  onClose,
  onSuccess,
}: CreateProjectDialogProps) {
  const createProjectMutation = useCreateProject();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      url: '',
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);

    try {
      const createdProject = await createProjectMutation.mutateAsync(data);

      toast.success('Project created successfully!', {
        description: `"${data.name}" is ready for tests.`,
      });

      reset();
      onClose();
      onSuccess?.(createdProject);
    } catch (error) {
      toast.error('Failed to create project', {
        description: 'Please try again or contact support if the problem persists.',
      });
      console.error('Error creating project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="relative z-10 mx-4 w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary-100 p-2 dark:bg-primary-900/30">
              <FolderPlus className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create New Project
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Set up a new project to organize your tests
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Project Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="My Awesome Project"
              disabled={isSubmitting}
              {...register('name')}
              className={cn(
                'w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2',
                errors.name
                  ? 'border-red-300 focus:ring-red-500 dark:border-red-700'
                  : 'border-gray-200 focus:ring-primary-500 dark:border-gray-600',
                'bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="A brief description of what this project is about..."
              disabled={isSubmitting}
              {...register('description')}
              className={cn(
                'w-full resize-none rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2',
                errors.description
                  ? 'border-red-300 focus:ring-red-500 dark:border-red-700'
                  : 'border-gray-200 focus:ring-primary-500 dark:border-gray-600',
                'bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Project URL */}
          <div>
            <label
              htmlFor="url"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Project URL <span className="text-red-500">*</span>
            </label>
            <input
              id="url"
              type="url"
              placeholder="https://example.com"
              disabled={isSubmitting}
              {...register('url')}
              className={cn(
                'w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2',
                errors.url
                  ? 'border-red-300 focus:ring-red-500 dark:border-red-700'
                  : 'border-gray-200 focus:ring-primary-500 dark:border-gray-600',
                'bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            />
            {errors.url && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.url.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-2 text-sm font-medium text-white transition-all hover:from-primary-600 hover:to-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  Creating...
                </>
              ) : (
                <>
                  <FolderPlus className="h-4 w-4" />
                  Create Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
