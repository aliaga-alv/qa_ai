import { z } from 'zod';

/**
 * Schema for project creation and editing
 */
export const projectSchema = z.object({
  name: z
    .string()
    .min(3, 'Project name must be at least 3 characters')
    .max(100, 'Project name must not exceed 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),
  url: z
    .string()
    .url('Please enter a valid URL')
    .min(1, 'Project URL is required'),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

/**
 * Default values for the project form
 */
export const defaultProjectValues: ProjectFormData = {
  name: '',
  description: '',
  url: '',
};
