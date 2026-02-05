import { z } from 'zod';

/**
 * Schema for contact form submission
 */
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Default values for the contact form
 */
export const defaultContactValues: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};
