# API Architecture Documentation

## 📋 Overview

This document describes the comprehensive API architecture for the QA AI application. The architecture is built on a solid foundation using **Axios** for HTTP requests, **TanStack Query** for server state management, and follows consistent patterns for maintainability and scalability.

## 🏗️ Architecture Layers

```
Components
    ↓
API Hooks (useTests, useProjects, etc.)
    ↓
API Services (testsService, projectsService, etc.)
    ↓
Axios Client (apiClient with interceptors)
    ↓
Backend API
```

## 📁 Directory Structure

```
src/
├── constants/
│   ├── api.ts              # API endpoint constants
│   └── query-keys.ts       # TanStack Query keys
├── types/
│   └── api/
│       ├── common.ts        # Shared API types
│       ├── auth.ts          # Auth request/response types
│       ├── tests.ts         # Tests request/response types
│       ├── test-runs.ts     # Test runs request/response types
│       ├── projects.ts      # Projects request/response types
│       ├── analytics.ts     # Analytics request/response types
│       ├── team.ts          # Team request/response types
│       ├── billing.ts       # Billing request/response types
│       ├── subscription.ts  # Subscription request/response types
│       └── index.ts         # Centralized export
├── services/
│   └── api/
│       ├── client.ts        # Axios client with interceptors
│       ├── health.service.ts # Health check endpoints
│       ├── auth.service.ts  # Auth API methods
│       ├── tests.service.ts # Tests API methods
│       ├── test-runs.service.ts # Test execution & run management
│       ├── projects.service.ts
│       ├── analytics.service.ts # Statistics API methods
│       ├── team.service.ts
│       ├── billing.service.ts
│       ├── subscription.service.ts # Subscription plans & user subscriptions
│       └── index.ts         # Centralized export
└── hooks/
    └── api/
        ├── useTests.ts      # Tests TanStack Query hooks
        ├── useTestRuns.ts   # Test runs TanStack Query hooks
        ├── useProjects.ts   # Projects TanStack Query hooks
        ├── useAnalytics.ts  # Analytics TanStack Query hooks
        ├── useTeam.ts       # Team TanStack Query hooks
        ├── useBilling.ts    # Billing TanStack Query hooks
        ├── useSubscriptions.ts # Subscription management hooks
        └── index.ts         # Centralized export
```

## 🔧 Configuration

### Environment Variables

```bash
# .env or .env.local
VITE_API_BASE_URL=http://localhost:8000/api
```

### TanStack Query Setup

Configured in [src/main.tsx](../../src/main.tsx):

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 minutes
      gcTime: 10 * 60 * 1000,        // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});
```

**Important:** The `queryClient` is exported so it can be used for cache management (e.g., clearing on logout).

### Axios Client

Features:
- ✅ Automatic `Authorization: Bearer` header injection
- ✅ Token refresh on 401 with request queuing
- ✅ Auto-retry failed requests after refresh
- ✅ CSRF protection with `withCredentials: true`
- ✅ 30-second timeout
- ✅ Error normalization

## 📝 Usage Patterns

### 1. Constants Pattern

**Always use centralized constants:**

```typescript
import { API_TESTS } from '@/constants/api';
import { QUERY_KEYS } from '@/constants/query-keys';

// ✅ CORRECT
const endpoint = API_TESTS.GET(testId);
const queryKey = QUERY_KEYS.tests.detail(testId);

// ❌ WRONG - Never hardcode
const endpoint = `/api/tests/${testId}`;
const queryKey = ['tests', testId];
```

### 2. Service Layer Pattern

**Create services that wrap axios calls:**

```typescript
// services/api/tests.service.ts
export const testsService = {
  async list(params?: TestListParams): Promise<TestListResponse> {
    const response = await apiClient.get<TestListResponse>(API_TESTS.LIST, { params });
    return response.data;
  },
  
  async get(id: string): Promise<Test> {
    const response = await apiClient.get<TestResponse>(API_TESTS.GET(id));
    return response.data.test;
  },
  
  // ... more methods
};
```

### 3. Hook Pattern (Queries)

**Wrap services with TanStack Query:**

```typescript
// hooks/api/useTests.ts
export function useTests(params?: TestListParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.tests.list(), params],
    queryFn: () => testsService.list(params),
  });
}

export function useTest(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.tests.detail(id),
    queryFn: () => testsService.get(id),
    enabled: !!id, // Only run if id exists
  });
}
```

### 4. Hook Pattern (Mutations)

**Handle mutations with automatic cache invalidation:**

```typescript
export function useCreateTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.tests.create],
    mutationFn: (data: CreateTestRequest) => testsService.create(data),
    onSuccess: () => {
      // Invalidate tests list to refetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tests.all });
    },
  });
}
```

### 5. Component Usage

**Clean component code with hooks:**

```typescript
import { useTests, useCreateTest } from '@/hooks/api';

function TestsPage() {
  const { data, isLoading, error } = useTests();
  const createTest = useCreateTest();

  const handleCreate = async (data: CreateTestRequest) => {
    try {
      await createTest.mutateAsync(data);
      toast.success('Test created successfully');
    } catch (error) {
      toast.error('Failed to create test');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {data?.data.map(test => (
        <TestItem key={test.id} test={test} />
      ))}
    </div>
  );
}
```

## 📚 Available APIs

### Health
- `healthService` - System health and readiness checks
- Methods:
  - `check()` - Application health status
  - `ready()` - Readiness check with dependency status
- No hooks (typically used for monitoring/infrastructure)

### Auth
- `authService` - Login, register, forgot password (sends OTP), reset password (with OTP)
- No hooks (uses `useAuth` from hooks/useAuth.ts)
- **Note:** Backend uses OTP-based password reset (no logout or token refresh endpoints)

### Tests
- `testsService` - CRUD operations for test definitions
- Hooks: `useTests`, `useTest`, `useCreateTest`, `useUpdateTest`, `useDeleteTest`

### Test Runs
- `testRunsService` - Test execution and run management
- Methods:
  - `triggerRun(testId, request?)` - Start a test run
  - `listRuns(testId, params?)` - List runs with pagination
  - `getRun(runId)` - Get run details with step results
  - `cancelRun(runId)` - Cancel a running test
  - `getStatistics(testId)` - Get run statistics for a test
- Query Hooks:
  - `useTestRuns(testId, params?)` - List test runs with pagination
  - `useTestRun(runId)` - Get single run details with step results
  - `useTestRunStatistics(testId)` - Get run statistics
- Mutation Hooks:
  - `useTriggerTestRun()` - Trigger a single test run
  - `useCancelTestRun()` - Cancel a running test
  - `useBulkRunTests()` - Run multiple tests at once
  - `useRunAllTests()` - Run all tests in a project

### Projects
- `projectsService` - CRUD operations, get project tests
- Hooks: `useProjects`, `useProject`, `useProjectTests`, `useCreateProject`, `useUpdateProject`, `useDeleteProject`

### Analytics
- `statisticsService` - Overall dashboard statistics with trends and breakdowns
- Hooks: `useOverallStatistics`
- **Implementation:** Returns comprehensive stats including:
  - Total projects, tests, active/passing/failing counts
  - Status breakdown (draft, planned, generated, passing, failing, error)
  - Validation & execution metrics
  - Weekly comparison with change percentages
  - Daily trends (7 days)
  - Top executed tests
  - Test durations

### Team
- `teamService` - List members, invite, remove, update roles
- Hooks: `useTeamMembers`, `useTeamMember`, `useTeamInvitations`, `useInviteMember`, `useRemoveMember`, `useUpdateMemberRole`

### Billing (Legacy)
- **Note:** `billing.service.ts` and `useBilling.ts` exist but are **not actively used**
- These were superseded by the `subscription.service.ts` implementation
- If you need subscription functionality, use the Subscriptions API below

### Subscriptions
- `subscriptionService` - Plan management and user subscriptions
- **Service Methods:**
  - `listPlans()` - Get all subscription plans
  - `getPlan(id)` - Get single plan details
  - `createPlan(payload)` - Create new plan (admin)
  - `updatePlan(id, payload)` - Update plan (admin)
  - `deletePlan(id)` - Delete plan (admin)
  - `getUserSubscriptions()` - Get user's active subscriptions
  - `subscribe(payload)` - Subscribe to a plan
- **Query Hooks:**
  - `useSubscriptionPlans()` - List all available plans
  - `useSubscriptionPlan(id)` - Get single plan details
  - `useUserSubscriptions()` - Get current user's subscriptions
- **Mutation Hooks:**
  - `useCreatePlan()` - Create new subscription plan (admin)
  - `useUpdatePlan()` - Update existing plan (admin)
  - `useDeletePlan()` - Delete a plan (admin)
  - `useSubscribeToPlan()` - Subscribe to a plan
- **Note:** Backend does not support subscription cancellation endpoint

## 🎯 Best Practices

### ✅ DO

1. **Use centralized constants** for endpoints and query keys
2. **Always type your requests and responses** using types from `@/types/api`
3. **Invalidate queries** after mutations to keep cache fresh
4. **Use query keys factory functions** for parameterized queries
5. **Enable queries conditionally** with `enabled` option when needed
6. **Handle loading and error states** in components
7. **Use `mutateAsync` in try/catch** for error handling in event handlers

### ❌ DON'T

1. **Never hardcode API URLs** or query keys
2. **Never create inline types** - use centralized types from `@/types/api`
3. **Don't use `axios` directly** in components - always use services
4. **Don't forget to invalidate** related queries after mutations
5. **Don't ignore TypeScript errors** - fix them immediately

## 🔄 Data Flow Example

```
User clicks "Create Test"
    ↓
Component calls useCreateTest().mutate(data)
    ↓
Hook calls testsService.create(data)
    ↓
Service makes POST request via apiClient
    ↓
Interceptor adds Authorization header
    ↓
Backend API processes request
    ↓
Response returns to service
    ↓
Hook's onSuccess invalidates QUERY_KEYS.tests.all
    ↓
TanStack Query refetches tests list
    ↓
Component re-renders with new data
```

## 🔒 Authentication Flow

```
1. User logs in → authService.login()
2. Response contains accessToken + refreshToken
3. Tokens stored via tokenStorage
4. All requests include Authorization header (interceptor)
5. On 401 error → auto token refresh
6. On refresh success → retry original request
7. On refresh failure → logout + redirect to login
```

### Cache Management on Logout

To prevent data leakage between users, the application clears all TanStack Query cache when users log out:

**In [authStore.ts](../../src/stores/authStore.ts):**
```typescript
import { queryClient } from '@/main';

logout: () => {
  tokenStorage.clearTokens();
  queryClient.clear(); // Clear all cached data
  set({ user: null, isAuthenticated: false, error: null });
}
```

**In [client.ts](../../src/services/api/client.ts) interceptor:**
```typescript
// When token refresh fails
tokenStorage.clearTokens();
queryClient.clear(); // Clear cache on forced logout
window.location.href = '/login';
```

This ensures:
- ✅ No stale data from previous user
- ✅ Clean state for new user login
- ✅ Security: prevents unauthorized access to cached data

## 🚀 Adding New APIs

### Step 1: Add Endpoint Constants

```typescript
// constants/api.ts
export const API_NEW_FEATURE = {
  LIST: `${API_BASE}/new-feature`,
  GET: (id: string) => `${API_BASE}/new-feature/${id}`,
  // ... more endpoints
} as const;
```

### Step 2: Add Types

```typescript
// types/api/new-feature.ts
export interface NewFeatureRequest {
  // ... fields
}

export interface NewFeatureResponse {
  // ... fields
}
```

### Step 3: Add Query Keys

```typescript
// constants/query-keys.ts
export const QUERY_KEYS = {
  // ... existing keys
  newFeature: {
    all: ['new-feature'] as const,
    list: () => ['new-feature', 'list'] as const,
    detail: (id: string) => ['new-feature', 'detail', id] as const,
  },
};
```

### Step 4: Create Service

```typescript
// services/api/new-feature.service.ts
import { apiClient } from './client';
import { API_NEW_FEATURE } from '@/constants/api';
import type { NewFeatureRequest, NewFeatureResponse } from '@/types/api/new-feature';

export const newFeatureService = {
  async list(): Promise<NewFeatureResponse[]> {
    const response = await apiClient.get<{ data: NewFeatureResponse[] }>(
      API_NEW_FEATURE.LIST
    );
    return response.data.data;
  },
  
  async get(id: string): Promise<NewFeatureResponse> {
    const response = await apiClient.get<{ data: NewFeatureResponse }>(
      API_NEW_FEATURE.GET(id)
    );
    return response.data.data;
  },
  
  // ... more methods
};
```

### Step 5: Create Hooks

```typescript
// hooks/api/useNewFeature.ts
export function useNewFeatures() {
  return useQuery({
    queryKey: QUERY_KEYS.newFeature.list(),
    queryFn: () => newFeatureService.list(),
  });
}
```

### Step 6: Export Everything

Update index files in `services/api/index.ts` and `hooks/api/index.ts`.

## 📊 Query Key Structure

Query keys follow a hierarchical structure:

```typescript
['auth']                          // All auth queries
['auth', 'profile']              // User profile

['tests']                         // All tests queries
['tests', 'list']                // Tests list
['tests', 'list', params]        // Tests list with filters
['tests', 'detail', id]          // Single test
['tests', 'results', id]         // Test results

['projects']                      // All projects queries
['projects', 'list']             // Projects list
['projects', 'detail', id]       // Single project
['projects', 'tests', id]        // Project's tests
```

## 🛠️ Debugging

### React Query DevTools (Optional)

To install devtools:

```bash
npm install @tanstack/react-query-devtools --save-dev
```

Then update [src/main.tsx](../main.tsx):

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// In render:
{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
```

### Logging

The axios client already logs errors in development. Check browser console for:
- Request details
- Response errors
- Token refresh attempts

## 📖 Additional Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Axios Docs](https://axios-http.com/)
- [Project ARCHITECTURE.md](../../docs/ARCHITECTURE.md)

## ✅ Checklist for Backend Integration

- [x] TanStack Query configured
- [x] Axios client with interceptors
- [x] Token refresh logic
- [x] API endpoint constants
- [x] Query key constants
- [x] API types structure
- [x] All service files created
- [x] All API hooks created
- [ ] Environment variable set (`VITE_API_BASE_URL`)
- [ ] Replace mock data in components
- [ ] Test API integration
- [ ] Error boundary setup
- [ ] Loading states implementation

## 🎉 Ready for Backend!

Your frontend is now fully configured and ready to integrate with backend APIs. Simply:

1. Set `VITE_API_BASE_URL` in your `.env` file
2. Replace mock data with API hooks in components
3. Ensure backend endpoints match the constants in `src/constants/api.ts`

Example component migration:

```typescript
// Before (with mocks)
import { mockTests } from '@/mocks';
const tests = mockTests;

// After (with API)
import { useTests } from '@/hooks/api';
const { data: tests, isLoading } = useTests();
```
