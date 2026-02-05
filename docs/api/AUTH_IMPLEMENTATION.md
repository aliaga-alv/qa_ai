# Authentication Implementation Guide

## Overview

Complete authentication system with login, registration, and OTP-based password reset.

## Backend API Structure

**Base URL:** `http://localhost:8000/api/v1`

### Available Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | Authenticate user with email/password |
| `/auth/register` | POST | Create new user account |
| `/auth/forgot-password` | POST | Send 6-digit OTP to email |
| `/auth/reset-password` | POST | Reset password using OTP |

**Note:** Backend does NOT have separate logout or token refresh endpoints. Logout is client-side only (clears stored tokens).

## Request/Response Formats

### 1. Login

**Request:**
```typescript
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Success Response:**
```typescript
{
  "success": 1,
  "data": [{
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "user"
    }
  }]
}
```

**Error Response (401):**
```json
{
  "success": 0,
  "errors": [{
    "message": "Incorrect email or password"
  }]
}
```

### 2. Register

**Request:**
```typescript
POST /api/v1/auth/register
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "SecurePass123!",
  "password_confirmation": "SecurePass123!"
}
```

**Success Response:** Same as login (returns token + user)

**Error Response (422):**
```json
{
  "success": 0,
  "errors": [{
    "message": "The given data was invalid.",
    "errors": {
      "password": ["The password must be at least 12 characters."],
      "email": ["The email has already been taken."]
    }
  }]
}
```

### 3. Forgot Password

**Request:**
```typescript
POST /api/v1/auth/forgot-password
{
  "email": "user@example.com"
}
```

**Success Response:**
```json
{
  "success": 1,
  "data": [{
    "message": "OTP sent to your email"
  }]
}
```

**Note:** Generates and sends 6-digit OTP to user's email.

### 4. Reset Password

**Request:**
```typescript
POST /api/v1/auth/reset-password
{
  "email": "user@example.com",
  "otp": "123456",
  "password": "NewSecurePass123!",
  "password_confirmation": "NewSecurePass123!"
}
```

**Success Response:**
```json
{
  "success": 1,
  "data": [{
    "message": "Password reset successfully"
  }]
}
```

**Error Response:**
```json
{
  "success": 0,
  "errors": [{
    "message": "Invalid or expired OTP"
  }]
}
```

## Password Requirements

All password fields must meet these criteria:

✅ **Minimum 12 characters**  
✅ **At least one uppercase letter** (A-Z)  
✅ **At least one lowercase letter** (a-z)  
✅ **At least one number** (0-9)  
✅ **At least one special character** (!@#$%^&*()_+-=[]{}|;:,.<>?)

**Valid Examples:**
- `MyPassword123!`
- `SecurePass2024@`
- `Test#Account99`

**Invalid Examples:**
- `short123!` (less than 12 chars)
- `NoSpecialChar123` (missing special character)
- `nouppercas3!` (no uppercase letter)

## Frontend Implementation

### File Structure

```
src/
├── services/api/
│   ├── auth.service.ts       # API calls
│   └── client.ts             # Axios with interceptors
├── hooks/
│   └── useAuth.ts            # Auth hook
├── schemas/
│   └── auth.ts               # Zod validation
├── pages/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── ForgotPasswordPage.tsx
│   └── ResetPasswordPage.tsx
└── stores/
    └── authStore.ts          # Zustand store
```

### Auth Service ([services/api/auth.service.ts](../src/services/api/auth.service.ts))

```typescript
export const authService = {
  login(credentials: LoginCredentials): Promise<AuthData>
  register(data: RegisterData): Promise<AuthData>
  forgotPassword(email: string): Promise<{ message: string }>
  resetPassword(data: ResetPasswordRequest): Promise<{ message: string }>
}
```

### useAuth Hook ([hooks/useAuth.ts](../src/hooks/useAuth.ts))

```typescript
const {
  user,              // Current user object
  isAuthenticated,   // Boolean auth status
  isLoading,         // Loading state
  error,             // Error message
  
  // Actions
  login,             // (credentials) => Promise<{success, error?}>
  register,          // (data) => Promise<{success, error?}>
  logout,            // () => void (client-side only)
  forgotPassword,    // (email) => Promise<{success, message?, error?}>
  resetPassword,     // (data) => Promise<{success, message?, error?}>
  clearError,        // () => void
} = useAuth();
```

### Component Usage Examples

#### Login Page
```typescript
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    const result = await login({
      email: data.email,
      password: data.password
    });

    if (result.success) {
      toast.success('Welcome back!');
      navigate('/dashboard');
    } else {
      toast.error('Login failed', {
        description: result.error
      });
    }
  };
}
```

#### Register Page
```typescript
const onSubmit = async (data: RegisterFormData) => {
  const result = await register({
    name: data.name,
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation
  });

  if (result.success) {
    toast.success('Account created!');
    navigate('/dashboard');
  } else {
    toast.error('Registration failed', {
      description: result.error
    });
  }
};
```

#### Forgot Password Flow
```typescript
// Step 1: Request OTP
const result = await forgotPassword(email);
if (result.success) {
  toast.success('OTP sent!', {
    description: 'Check your email for the verification code'
  });
  navigate('/reset-password', { state: { email } });
}

// Step 2: Reset with OTP
const result = await resetPassword({
  email,
  otp,
  password,
  password_confirmation
});

if (result.success) {
  toast.success('Password reset!');
  navigate('/login');
}
```

## Axios Interceptor Configuration

The axios client is configured to skip token refresh logic for auth endpoints:

```typescript
// Skip token refresh for auth endpoints
const authEndpoints = [
  '/auth/login',
  '/auth/register', 
  '/auth/forgot-password',
  '/auth/reset-password'
];

// Only attempt refresh for non-auth 401 errors
if (error.response?.status === 401 && !isAuthEndpoint) {
  // Token refresh logic...
}
```

**Why?** Invalid credentials return 401, but shouldn't trigger token refresh.

## Error Handling

Errors are parsed by `ApiErrorHandler` which formats backend errors:

**Backend Error:**
```json
{
  "success": 0,
  "errors": [{
    "message": "The given data was invalid.",
    "errors": {
      "password": ["The password must be at least 12 characters."],
      "email": ["The email format is invalid."]
    }
  }]
}
```

**Formatted Message:**
```
Password: The password must be at least 12 characters.
Email: The email format is invalid.
```

See [ERROR_HANDLING.md](./ERROR_HANDLING.md) for complete details.

## Token Management

Tokens are stored using `tokenStorage` utility (localStorage):

```typescript
// Auto-injected in axios requests
Authorization: Bearer <token>

// Stored in localStorage
{
  "accessToken": "...",
  "refreshToken": "..."  // Same as accessToken (no refresh endpoint)
}
```

**Logout:** Client-side only - clears stored tokens and redirects to login.

## Security Features

✅ **Password Strength Validation** (12 chars, upper, lower, number, special)  
✅ **CSRF Protection** (`withCredentials: true`)  
✅ **Automatic Bearer Token Injection**  
✅ **401 Error Handling** (skips refresh for auth endpoints)  
✅ **OTP-Based Password Reset** (6-digit code)  
✅ **Email Validation** (proper email format required)  
✅ **Password Confirmation** (must match on register/reset)

## Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials (shows error, no page refresh)
- [ ] Register new account
- [ ] Register with weak password (shows validation errors)
- [ ] Register with existing email (shows error)
- [ ] Request password reset OTP
- [ ] Reset password with valid OTP
- [ ] Reset password with invalid OTP
- [ ] Reset password with expired OTP
- [ ] Logout clears tokens and redirects

## Environment Setup

1. **Update .env:**
   ```bash
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```

2. **Verify backend is running:**
   ```bash
   curl http://localhost:8000/api/v1/health
   ```

3. **Start dev server:**
   ```bash
   npm run dev
   ```

## Related Documentation

- [API_ARCHITECTURE.md](./API_ARCHITECTURE.md) - Overall API structure
- [ERROR_HANDLING.md](./ERROR_HANDLING.md) - Error handling details
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Full tech stack
