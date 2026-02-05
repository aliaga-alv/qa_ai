import { z } from 'zod';

/**
 * Schema for test creation and editing
 * Matches backend database schema
 */
export const testSchema = z.object({
  name: z
    .string()
    .min(3, 'Test name must be at least 3 characters')
    .max(100, 'Test name must not exceed 100 characters'),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),

  specification: z
    .string()
    .min(10, 'Specification must be at least 10 characters')
    .max(2000, 'Specification must not exceed 2000 characters')
    .optional()
    .or(z.literal('')),

  priority: z.enum(['low', 'medium', 'high'], {
    message: 'Please select a valid priority',
  }),

  status: z.enum(['draft', 'active', 'inactive'], {
    message: 'Please select a valid status',
  }),

  is_active: z.boolean(),

  tags: z.string().refine((val) => {
    if (!val.trim()) return true;
    return val.split(',').every((tag) => tag.trim().length > 0);
  }, 'Tags must be comma-separated and non-empty'),
});

export type TestFormData = z.infer<typeof testSchema>;

/**
 * Default values for the test form
 */
export const defaultTestValues: TestFormData = {
  name: '',
  description: '',
  specification: '',
  priority: 'medium',
  status: 'draft',
  is_active: true,
  tags: '',
};
