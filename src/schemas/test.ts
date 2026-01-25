import { z } from 'zod';

/**
 * Schema for test creation and editing
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

  type: z.enum(['api', 'ui', 'integration', 'unit'], {
    message: 'Please select a valid test type',
  }),

  status: z.enum(['active', 'inactive', 'draft'], {
    message: 'Please select a valid status',
  }),

  tags: z.string().refine((val) => {
    if (!val.trim()) return true;
    return val.split(',').every((tag) => tag.trim().length > 0);
  }, 'Tags must be comma-separated and non-empty'),

  code: z
    .string()
    .min(10, 'Test code must be at least 10 characters')
    .max(10000, 'Test code must not exceed 10,000 characters'),

  // Configuration
  timeout: z
    .number()
    .min(1000, 'Timeout must be at least 1 second')
    .max(300000, 'Timeout must not exceed 5 minutes'),

  retries: z.number().min(0, 'Retries cannot be negative').max(5, 'Maximum 5 retries allowed'),

  environment: z.enum(['development', 'staging', 'production'], {
    message: 'Please select a valid environment',
  }),

  baseUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),

  browser: z
    .enum(['chrome', 'firefox', 'safari', 'edge'], {
      message: 'Please select a valid browser',
    })
    .optional(),
});

export type TestFormData = z.infer<typeof testSchema>;

/**
 * Default values for the test form
 */
export const defaultTestValues: TestFormData = {
  name: '',
  description: '',
  type: 'ui',
  status: 'draft',
  tags: '',
  code: `describe('My Test', () => {
  it('should pass', () => {
    // Add your test code here
  });
});`,
  timeout: 30000,
  retries: 2,
  environment: 'staging',
  baseUrl: '',
  browser: 'chrome',
};
