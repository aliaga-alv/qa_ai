# Validation Schemas

Centralized Zod validation schemas for the entire application.

## Overview

All form validation schemas are extracted from view components and organized by domain. This ensures:

- **Single Source of Truth**: Schema definitions are centralized and reusable
- **Type Safety**: TypeScript types are auto-generated from schemas
- **Maintainability**: Changes to validation rules happen in one place
- **Testability**: Schemas can be unit tested independently
- **Consistency**: Validation logic is uniform across the app

## Structure

```
schemas/
├── index.ts           # Barrel export for all schemas
├── auth.ts            # Authentication schemas (login, register, etc.)
├── test.ts            # Test creation/editing schemas
├── project.ts         # Project creation/editing schemas
├── contact.ts         # Contact form schema
└── README.md          # This file
```

## Usage

### Import from Centralized Location

```typescript
// ✅ CORRECT - Import from centralized schemas
import { loginSchema, type LoginFormData } from '@/schemas/auth';
import { testSchema, type TestFormData } from '@/schemas/test';

// OR use barrel export
import { loginSchema, testSchema } from '@/schemas';
```

### Use with React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/schemas/auth';

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
});
```

## Available Schemas

### Authentication (`auth.ts`)

- **loginSchema**: Email, password, remember me
- **registerSchema**: Name, email, password with strength requirements, terms agreement
- **forgotPasswordSchema**: Email for password reset
- **resetPasswordSchema**: Email, OTP, new password with confirmation

### Tests (`test.ts`)

- **testSchema**: Complete test configuration including:
  - Basic info (name, description, type, status)
  - Tags and test code
  - Configuration (timeout, retries, environment)
  - Browser settings for UI tests
- **defaultTestValues**: Pre-filled form values

### Projects (`project.ts`)

- **projectSchema**: Project creation with name and description
- **defaultProjectValues**: Empty form values

### Contact (`contact.ts`)

- **contactSchema**: Contact form with name, email, subject, message
- **defaultContactValues**: Empty form values

## Schema Pattern

Each schema file follows this structure:

```typescript
import { z } from 'zod';

// Schema definition with validation rules
export const mySchema = z.object({
  field: z.string().min(3, 'Error message'),
  // ... more fields
});

// Auto-generated TypeScript type
export type MyFormData = z.infer<typeof mySchema>;

// Optional: Default values for forms
export const defaultMyValues: MyFormData = {
  field: '',
};
```

## Best Practices

### ✅ DO

- Define all schemas in `schemas/` directory
- Export both schema and TypeScript type
- Include clear error messages for validation rules
- Provide default values for complex forms
- Use `.refine()` for cross-field validation
- Document complex validation logic

### ❌ DON'T

- Never define schemas inline in components
- Don't create duplicate schemas for same data
- Avoid embedding validation logic in components
- Don't mix UI state and validation schemas

## Adding New Schemas

1. **Create schema file** in `src/schemas/`:
   ```typescript
   // src/schemas/myDomain.ts
   import { z } from 'zod';
   
   export const mySchema = z.object({
     field: z.string().min(1, 'Required'),
   });
   
   export type MyFormData = z.infer<typeof mySchema>;
   ```

2. **Export from barrel** in `src/schemas/index.ts`:
   ```typescript
   export { mySchema, type MyFormData } from './myDomain';
   ```

3. **Use in component**:
   ```typescript
   import { mySchema, type MyFormData } from '@/schemas/myDomain';
   // or
   import { mySchema, type MyFormData } from '@/schemas';
   ```

## Validation Rules Reference

### Common String Validations

```typescript
z.string()
  .min(3, 'Minimum 3 characters')
  .max(100, 'Maximum 100 characters')
  .email('Invalid email')
  .url('Invalid URL')
  .regex(/pattern/, 'Custom error')
  .optional()
  .or(z.literal(''))  // Allow empty string
```

### Password Strength

```typescript
z.string()
  .min(12, 'Minimum 12 characters')
  .regex(/[A-Z]/, 'Must contain uppercase')
  .regex(/[a-z]/, 'Must contain lowercase')
  .regex(/[0-9]/, 'Must contain number')
  .regex(/[^A-Za-z0-9]/, 'Must contain special character')
```

### Number Validations

```typescript
z.number()
  .min(0, 'Must be positive')
  .max(100, 'Maximum 100')
  .int('Must be integer')
```

### Enum/Select

```typescript
z.enum(['option1', 'option2'], {
  message: 'Select a valid option',
})
```

### Cross-Field Validation

```typescript
z.object({
  password: z.string(),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
})
```

## Testing Schemas

Schemas can be tested independently:

```typescript
import { describe, it, expect } from 'vitest';
import { loginSchema } from '@/schemas/auth';

describe('loginSchema', () => {
  it('validates correct data', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'invalid',
      password: 'password123',
    });
    expect(result.success).toBe(false);
  });
});
```

## References

- [Zod Documentation](https://zod.dev/)
- [React Hook Form with Zod](https://react-hook-form.com/get-started#SchemaValidation)
- Type System: [src/types/README.md](../types/README.md)
