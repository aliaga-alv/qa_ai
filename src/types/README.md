# Type Definitions

This directory contains centralized TypeScript type definitions for the entire application.

## Structure

```
types/
├── models/           # Domain model types
│   ├── index.ts      # Central export point
│   ├── dashboard.ts  # Dashboard-related types
│   ├── analytics.ts  # Analytics and metrics types
│   ├── billing.ts    # Billing and payment types
│   ├── security.ts   # Security and authentication types
│   ├── notification.ts # Notifications and activity types
│   └── content.ts    # Content types (blog, pricing, careers, etc.)
└── api/             # API-related types (currently empty)
```

## Usage

### Importing Types

You can import types from the central export point:

```typescript
import type { Test, TeamMember, UserRole } from '@/types/models';
```

Or from specific files:

```typescript
import type { PaymentMethod, Invoice } from '@/types/models/billing';
```

### Type Categories

#### Dashboard Types (`dashboard.ts`)
- **Test Management**: `Test`, `TestRun`, `TestExecution`, `ExecutingTest`
- **Team Management**: `TeamMember`, `UserRole`
- **Test Execution**: `ExecutionStatus`, `ExecutionDetail`, `LogEntry`
- **Enums**: `TestType`, `TestStatus`, `TestRunStatus`

#### Analytics Types (`analytics.ts`)
- `DateRange` - Date range selection
- `Insight` - AI-generated insights
- `FlakyTest` - Flaky test information
- `MetricData` - Metric display data

#### Billing Types (`billing.ts`)
- `PaymentMethod` - Payment method information
- `Invoice` - Invoice records
- `Plan` - Subscription plans

#### Security Types (`security.ts`)
- `ActiveSession` - User session information
- `SecurityLog` - Security audit logs

#### Notification Types (`notification.ts`)
- `Notification` - User notifications
- `Activity` - Activity feed items
- `NotificationType` - Notification type enum

#### Content Types (`content.ts`)
- **Blog**: `BlogPostData`, `FullBlogPost`, `AuthorData`
- **Pricing**: `ComparisonFeature`, `FAQItem`
- **Careers**: `JobPosting`, `Benefit`
- **About**: `TeamMemberInfo`, `CompanyStat`, `CompanyValue`
- **Features**: `Feature`, `Step`
- **Contact**: `ContactMethod`
- **Changelog**: `ChangelogItem`

## Best Practices

### 1. Keep Types DRY
Reuse existing types instead of creating duplicates:

```typescript
// ✅ Good
import type { UserRole } from '@/types/models';

// ❌ Bad
type UserRole = 'owner' | 'admin' | 'member' | 'viewer';
```

### 2. Component Props Types
Component-specific prop interfaces should stay in the component file:

```typescript
// In component file
import type { Test } from '@/types/models';

interface TestListProps {  // Component-specific, stays here
  tests: Test[];           // Domain type, imported from types/models
  onSelect: (id: string) => void;
}
```

### 3. Domain Types Should Not Be Re-exported
Always import domain types directly from `@/types/models`, not from components:

```typescript
// ✅ Good - Import from centralized types
import type { UserRole, TeamMember } from '@/types/models';

// ❌ Bad - Don't import from components
import { type UserRole } from '@/components/dashboard/TeamMemberCard';

// ❌ Bad - Components should not re-export
// In component file:
export type { UserRole }; // DON'T DO THIS
```

### 4. Optional vs Required
Use optional fields (`?`) for properties that may not always be present:

```typescript
interface Test {
  id: string;           // Always required
  name: string;         // Always required
  lastRun?: Date;       // Optional - may not have run yet
  successRate?: number; // Optional - calculated after runs
}
```

### 5. Union Types
Use union types for finite sets of values:

```typescript
export type TestStatus = 'active' | 'inactive' | 'draft';
export type ExecutionStatus = 'pending' | 'queued' | 'running' | 'passed' | 'failed' | 'cancelled' | 'stopped';
```

## Adding New Types

When adding new types:

1. **Determine the category** - Which file should it go in?
2. **Check for existing types** - Can you extend or reuse existing types?
3. **Add JSDoc comments** - Document complex types
4. **Export from index.ts** - Make it available via central export
5. **Update this README** - Document the new type

### Example

```typescript
// In types/models/dashboard.ts

/**
 * Represents a test suite containing multiple tests
 */
export interface TestSuite {
  id: string;
  name: string;
  description: string;
  tests: Test[];           // Reuses existing Test type
  createdAt: Date;
  updatedAt: Date;
}
```

## Type Organization Principles

1. **Domain-driven** - Types are organized by business domain
2. **Reusability** - Common types are shared across components
3. **Single source of truth** - Each type has one canonical definition
4. **Co-location** - Component-specific types stay with components
5. **Discoverability** - Central exports make types easy to find

## Migration Notes

This type system was created to:
- Eliminate duplicate type definitions
- Improve type safety and consistency
- Make types discoverable and reusable
- Support better IDE autocomplete

All major domain types have been extracted from components and pages into this centralized system.
