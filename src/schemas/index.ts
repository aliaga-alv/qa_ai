/**
 * Centralized validation schemas
 * All Zod schemas used across the application
 */

// Auth schemas
export {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  type LoginFormData,
  type RegisterFormData,
  type ForgotPasswordFormData,
  type ResetPasswordFormData,
} from './auth';

// Test schemas
export { testSchema, defaultTestValues, type TestFormData } from './test';

// Project schemas
export { projectSchema, defaultProjectValues, type ProjectFormData } from './project';

// Contact schemas
export { contactSchema, defaultContactValues, type ContactFormData } from './contact';
