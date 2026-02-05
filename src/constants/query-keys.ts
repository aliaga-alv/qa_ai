/**
 * TanStack Query key constants
 *
 * Centralized query keys for consistent cache management.
 * Use factory functions for parameterized queries.
 *
 * @example
 * // In a hook
 * useQuery({
 *   queryKey: QUERY_KEYS.tests.list,
 *   queryFn: testsService.list,
 * });
 *
 * // Invalidate queries
 * queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tests.all });
 */

export const QUERY_KEYS = {
  // Auth queries
  auth: {
    all: ['auth'] as const,
    profile: () => ['auth', 'profile'] as const,
  },

  // Test queries
  tests: {
    all: ['tests'] as const,
    list: () => ['tests', 'list'] as const,
    detail: (id: string) => ['tests', 'detail', id] as const,
    results: (id: string) => ['tests', 'results', id] as const,
    executions: (id: string) => ['tests', 'executions', id] as const,
  },

  // Project queries
  projects: {
    all: ['projects'] as const,
    list: () => ['projects', 'list'] as const,
    detail: (id: string) => ['projects', 'detail', id] as const,
    tests: (id: string) => ['projects', 'tests', id] as const,
  },

  // Analytics queries
  analytics: {
    all: ['analytics'] as const,
    dashboard: () => ['analytics', 'dashboard'] as const,
    testTrends: (testId?: string) => ['analytics', 'trends', testId] as const,
    performance: () => ['analytics', 'performance'] as const,
  },

  // Team queries
  team: {
    all: ['team'] as const,
    members: () => ['team', 'members'] as const,
    member: (id: string) => ['team', 'member', id] as const,
    invitations: () => ['team', 'invitations'] as const,
  },

  // Billing queries
  billing: {
    all: ['billing'] as const,
    subscription: () => ['billing', 'subscription'] as const,
    invoices: () => ['billing', 'invoices'] as const,
    usage: () => ['billing', 'usage'] as const,
  },

  // Notifications queries
  notifications: {
    all: ['notifications'] as const,
    list: () => ['notifications', 'list'] as const,
    unread: () => ['notifications', 'unread'] as const,
  },

  // Settings queries
  settings: {
    all: ['settings'] as const,
    profile: () => ['settings', 'profile'] as const,
    preferences: () => ['settings', 'preferences'] as const,
  },
} as const;

/**
 * Mutation keys for tracking mutation states
 */
export const MUTATION_KEYS = {
  auth: {
    login: 'auth:login',
    register: 'auth:register',
    logout: 'auth:logout',
    refreshToken: 'auth:refreshToken',
    verifyEmail: 'auth:verifyEmail',
    forgotPassword: 'auth:forgotPassword',
    resetPassword: 'auth:resetPassword',
  },
  tests: {
    create: 'tests:create',
    update: 'tests:update',
    delete: 'tests:delete',
    run: 'tests:run',
  },
  projects: {
    create: 'projects:create',
    update: 'projects:update',
    delete: 'projects:delete',
  },
  team: {
    invite: 'team:invite',
    remove: 'team:remove',
    updateRole: 'team:updateRole',
  },
  billing: {
    subscribe: 'billing:subscribe',
    updatePayment: 'billing:updatePayment',
    cancelSubscription: 'billing:cancelSubscription',
  },
} as const;
