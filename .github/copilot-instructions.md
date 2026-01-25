# QA AI - AI Agent Instructions

Modern React-based QA test automation platform with TypeScript, Vite, React Router, Zustand, and TanStack Query.

## Tech Stack & Architecture

**Frontend:** React 19.2 + TypeScript 5.6 + Vite 7.3 | **Router:** React Router v7 | **State:** Zustand (client) + TanStack Query (server) | **Styling:** Tailwind CSS + Framer Motion | **Forms:** React Hook Form + Zod validation

**Deployment:** Netlify with SPA redirects (all routes → index.html)

## Critical Type System Rules

### 1. Always Import Domain Types - Never Recreate
```typescript
// ✅ CORRECT - Import centralized types
import type { Test, TeamMember, UserRole } from '@/types/models';

// ❌ WRONG - Never recreate domain types in components
interface Test { id: string; name: string; }
```

**Type locations:** `src/types/models/` - dashboard.ts, analytics.ts, billing.ts, security.ts, notification.ts, content.ts

**Rule:** Component props stay in component files; domain models go to `types/models/`

### 2. TypeScript Strictness
- **Always use `type` keyword for type-only imports** (verbatimModuleSyntax requirement)
  ```typescript
  // ✅ CORRECT
  import type { Test } from '@/types/models';
  
  // ❌ WRONG - Will cause build errors
  import { Test } from '@/types/models';
  ```
- Run `npm run build` after changes - **zero tolerance for TS errors**
- See existing patterns in `src/components/dashboard/tests/TestListItem.tsx`

## Centralized Constants & Mocks

### Constants Pattern
```typescript
// ✅ Import from constants
import { ROUTES } from '@/constants/routes';
import { TEST_STATUS_COLORS, LOG_LEVEL_COLORS } from '@/constants/ui';
import { DATE_FORMAT_PATTERNS } from '@/constants/date';

// ❌ Never embed in components
const STATUS_COLORS = { active: 'green', failed: 'red' };
```

**Locations:** `src/constants/` - ui.ts (colors/configs), routes.ts, date.ts, features.ts

### Mock Data Pattern
```typescript
// ✅ Import from mocks
import { mockTests, mockTestDetail } from '@/mocks';
import { mockDashboardStats } from '@/mocks/stats';
import { mockChartData } from '@/mocks/charts';

// ❌ Never create inline mock data
const mockData = [{ id: '1', name: 'Test' }];
```

**Locations:** `src/mocks/` - tests.ts, charts.ts, stats.ts, billing.ts, team.ts, etc.

## Component & Routing Patterns

### Component Creation Checklist
1. Check for similar components first
2. Import types from `@/types/models/`
3. Import constants from `@/constants/`
4. Import mocks from `@/mocks/`
5. Use `cn()` utility for Tailwind class merging

### File Structure
```
src/
├── components/
│   ├── common/         # Reusable (LoadingSpinner, ErrorMessage, etc.)
│   ├── dashboard/      # Dashboard features (tests/, charts/, analytics/, etc.)
│   ├── features/       # Public pages (about/, blog/, etc.)
│   └── layout/         # Layouts (RootLayout, ProtectedRoute, PublicRoute)
├── pages/              # Route pages (HomePage, DashboardPage, etc.)
└── router/index.tsx    # Lazy-loaded routes with Suspense
```

**Export pattern:** `export default function ComponentName()` for all components

### Routing
- All routes lazy-loaded: `const HomePage = lazy(() => import("@/pages/HomePage"))`
- Protected routes wrapped in `<ProtectedRoute>` + `<DashboardLayout>`
- Public routes wrapped in `<PublicRoute>`
- SPA redirects configured in `netlify.toml`

## Styling & UI

### Tailwind + cn() Utility
```typescript
import { cn } from '@/lib/utils';

// Merge classes with conflict resolution
className={cn(
  "base-classes",
  condition && "conditional-classes",
  className // Allow prop overrides
)}
```

### Dark Mode
- Uses `class` strategy: `<html class="dark">`
- All colors have dark variants: `bg-white dark:bg-dark-bg`
- Custom dark theme in `tailwind.config.js`: dark.bg, dark.surface, dark.elevated, dark.border

### Critical Styling Rules

**1. Mobile-First Always:**
```typescript
// ✅ CORRECT - Mobile first, then larger screens
<div className="text-xl lg:text-sm">

// ❌ WRONG - Desktop first
<div className="lg:text-sm text-xl">
```

**2. Always Include Dark Mode:**
```typescript
// ✅ COMPLETE - Light and dark variants
<div className="bg-white dark:bg-dark-surface text-gray-900 dark:text-white">

// ❌ INCOMPLETE - Missing dark mode
<div className="bg-white text-black">
```

**3. cn() Utility Pattern:**
```typescript
import { cn } from '@/lib/utils';

<Button className={cn(
  "px-4 py-2 bg-primary-500",     // Base styles
  isActive && "bg-primary-600",   // Conditionals
  className                        // User overrides (ALWAYS LAST)
)} />
```

## State Management

### Zustand (Client State)
```typescript
// Example: authStore.ts
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user, accessToken, refreshToken) => { /* ... */ },
      logout: () => { /* ... */ },
    }),
    { name: 'auth-storage' }
  )
);
```

**Stores:** `src/stores/authStore.ts`, `themeStore.ts`

### TanStack Query (Server State)
- Use for API calls and caching
- Configured with axios client in `src/services/api/client.ts`

## Development Workflows

### Commands
```bash
npm run dev      # Start dev server (Vite)
npm run build    # TypeScript check + production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

### Path Aliases
- `@/` → `src/` (configured in `vite.config.ts`)
- Example: `import { cn } from '@/lib/utils'`

### Build Configuration
- Code splitting configured in `vite.config.ts` (vendor-react, vendor-ui, vendor-state, etc.)
- Target: ES2020
- Hot reload with Vite HMR

## Common Patterns

### Error Handling
- Use `<ErrorBoundary>` for component trees
- Use `<ErrorMessage>` for inline errors
- Professional error pages: 404, 500, 403, 401, Offline

### Loading States
- `<LoadingSpinner>` component with size variants: sm, md, lg
- Skeleton patterns for data loading

### Forms
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({ /* ... */ });
const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema)
});
```

## Component Template Pattern

**Use this template for new components:**

```typescript
import type { Test } from '@/types/models';  // Domain types
import { cn } from '@/lib/utils';

interface MyComponentProps {  // Component props stay here
  test: Test;                 // Use imported domain types
  className?: string;         // Allow style overrides
}

export default function MyComponent({ test, className }: MyComponentProps) {
  return (
    <div className={cn(
      "flex flex-col gap-4 p-6",                     // Layout
      "bg-white dark:bg-dark-surface",               // Background
      "border border-gray-200 dark:border-gray-800",  // Border
      "text-gray-900 dark:text-white",               // Text
      "rounded-lg shadow-sm",                         // Effects
      "sm:p-8 lg:p-10",                              // Responsive (mobile-first)
      className                                       // User overrides LAST
    )}>
      <h3>{test.name}</h3>
    </div>
  );
}
```

## Documentation References

- `docs/ARCHITECTURE.md` - Full tech stack details
- `docs/COMPONENT_DESIGN.md` - Component patterns & atomic design
- `docs/QUICK_START_AI.md` - AI-specific rules & checklists
- `src/types/README.md` - Type system guide
- `src/constants/README.md` - Constants usage
- `src/mocks/README.md` - Mock data patterns
