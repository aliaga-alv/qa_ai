# Error Handling Implementation Guide

## Backend Error Structure

The backend API returns validation errors in this format:

```json
{
  "success": 0,
  "errors": [
    {
      "message": "The given data was invalid.",
      "errors": {
        "password": ["The password must be at least 12 characters."],
        "email": ["The email field is required."],
        "password_confirmation": ["The password confirmation does not match."]
      }
    }
  ]
}
```

## Implementation Changes

### 1. Enhanced ApiErrorHandler ([lib/api-error-handler.ts](../lib/api-error-handler.ts))

**New Features:**
- Parses backend validation error structure
- Formats field errors into readable messages
- Capitalizes field names and replaces underscores
- Supports multiple validation errors per field

**Example Output:**
```typescript
{
  code: 'VALIDATION_ERROR',
  message: 'Password: The password must be at least 12 characters.\nEmail: The email field is required.',
  validationErrors: {
    password: ['The password must be at least 12 characters.'],
    email: ['The email field is required.']
  },
  statusCode: 422
}
```

### 2. Updated Password Validation

**Backend Requirement:** Minimum 12 characters

**Updated Schemas:**
- `registerSchema` - Password min 12 chars
- `resetPasswordSchema` - Password min 12 chars

**Validation Rules:**
- ✅ Minimum 12 characters
- ✅ At least one uppercase letter (A-Z)
- ✅ At least one lowercase letter (a-z)
- ✅ At least one number (0-9)
- ✅ At least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)
- ✅ Password confirmation must match

### 3. Improved Form UI

**RegisterPage & ResetPasswordPage:**
- Password helper text: "Minimum 12 characters with uppercase, lowercase, number, and special character"
- Helper text shown when no error exists
- Error messages replace helper text when validation fails

## Usage Examples

### Example 1: Registration with Short Password

**User Input:**
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  password: "Short1",
  password_confirmation: "Short1"
}
```

**Backend Response:**
```json
{
  "success": 0,
  "errors": [{
    "message": "The given data was invalid.",
    "errors": {
      "password": ["The password must be at least 12 characters."]
    }
  }]
}
```

**Toast Message Displayed:**
```
❌ Registration failed
Password: The password must be at least 12 characters.
```

### Example 2: Multiple Validation Errors

**User Input:**
```javascript
{
  name: "J",
  email: "invalid-email",
  password: "short",
  password_confirmation: "different"
}
```

**Backend Response:**
```json
{
  "success": 0,
  "errors": [{
    "message": "The given data was invalid.",
    "errors": {
      "name": ["The name must be at least 2 characters."],
      "email": ["The email must be a valid email address."],
      "password": ["The password must be at least 12 characters."],
      "password_confirmation": ["The password confirmation does not match."]
    }
  }]
}
```

**Toast Message Displayed:**
```
❌ Registration failed
Name: The name must be at least 2 characters.
Email: The email must be a valid email address.
Password: The password must be at least 12 characters.
Password Confirmation: The password confirmation does not match.
```

## Testing Error Handling

### Manual Testing Steps

1. **Test Short Password:**
   ```
   Navigate to /register
   Enter: password = "Test123" (11 chars)
   Submit form
   Expected: Toast shows "Password: The password must be at least 12 characters."
   ```

2. **Test Valid Password:**
   ```
   Navigate to /register
   Enter: password = "TestPass123!" (12+ chars with uppercase, lowercase, number)
   Submit form
   Expected: Registration succeeds or shows other validation errors
   ```

3. **Test Password Mismatch:**
   ```
   Navigate to /register
   Enter: password = "TestPass123!"
   Enter: password_confirmation = "DifferentPass123!"
   Submit form
   Expected: Toast shows "Password Confirmation: The password confirmation does not match."
   ```

4. **Test Invalid OTP:**
   ```
   Navigate to /reset-password
   Enter: otp = "12345" (5 digits)
   Expected: Form validation shows "OTP must be exactly 6 digits"
   ```

5. **Test Network Error:**
   ```
   Stop backend server
   Try to login
   Expected: Toast shows "Network error. Please check your connection."
   ```

## Code Examples

### Using ApiErrorHandler in Components

```typescript
import { ApiErrorHandler } from '@/lib/api-error-handler';
import { toast } from 'sonner';

const onSubmit = async (data: FormData) => {
  try {
    await apiService.someEndpoint(data);
    toast.success('Success!');
  } catch (error) {
    const apiError = ApiErrorHandler.normalize(error);
    
    // Show formatted error message in toast
    toast.error('Operation failed', {
      description: apiError.message, // This will show formatted field errors
    });
    
    // Optionally access individual field errors
    if (apiError.validationErrors) {
      Object.entries(apiError.validationErrors).forEach(([field, errors]) => {
        console.log(`Field ${field}:`, errors);
      });
    }
  }
};
```

### Custom Error Display (Optional Enhancement)

```typescript
// If you want to show errors directly on form fields instead of just toast
const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

const onSubmit = async (data: FormData) => {
  try {
    await apiService.someEndpoint(data);
    setFieldErrors({});
  } catch (error) {
    const apiError = ApiErrorHandler.normalize(error);
    
    if (apiError.validationErrors) {
      setFieldErrors(apiError.validationErrors);
    }
    
    toast.error('Validation failed', {
      description: apiError.message,
    });
  }
};

// In JSX
{fieldErrors.password && (
  <p className="text-sm text-red-600">
    {fieldErrors.password.join(', ')}
  </p>
)}
```

## Error Types Handled

| Error Type | Detection | Message |
|------------|-----------|---------|
| **Validation Error** | `success: 0` with `errors[].errors` | Formatted field-specific messages |
| **API Error** | `success: 0` without field errors | General error message |
| **Network Error** | Request sent but no response | "Network error. Please check your connection." |
| **Unknown Error** | Any other error | Original error message or generic message |

## File Changes Summary

| File | Changes |
|------|---------|
| [lib/api-error-handler.ts](../lib/api-error-handler.ts) | Enhanced to parse backend validation errors |
| [schemas/auth.ts](../schemas/auth.ts) | Updated password min length to 12 chars |
| [pages/RegisterPage.tsx](../pages/RegisterPage.tsx) | Added password requirements helper text |
| [pages/ResetPasswordPage.tsx](../pages/ResetPasswordPage.tsx) | Added password requirements helper text |
| [lib/__tests__/api-error-handler.test.ts](../lib/__tests__/api-error-handler.test.ts) | Added comprehensive tests for error parsing |

## Best Practices

1. **Always use ApiErrorHandler.normalize()** when catching API errors
2. **Show specific field errors** in toast descriptions for better UX
3. **Validate on frontend first** to catch errors before API call (12 char minimum, required fields, etc.)
4. **Backend validation is the source of truth** - frontend validation is just for better UX
5. **Test with various error scenarios** to ensure proper error display

## Future Enhancements

Consider implementing:
- Field-specific error display (errors shown directly below input fields)
- Animated error transitions
- Error tracking/logging for production debugging
- Retry mechanism for network errors
- Error recovery suggestions ("Did you mean...?")
