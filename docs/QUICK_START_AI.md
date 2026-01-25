# Quick Start Guide for AI Agents

## ⚠️ Rule #1: TypeScript First

```bash
# After ANY code change:
npm run build  # Must pass!
```

**Never proceed with TS errors. Fix immediately.**

### Common TS Errors:
```typescript
// ❌ Type imports without 'type' keyword
import { User } from './types';

// ✅ Use 'type' keyword
import type { User } from './types';
```

---

## 🎯 Rule #2: Check Types Before Creating

**ALWAYS check `src/types/models/` first!**

```typescript
// ❌ WRONG - Don't recreate existing types!
interface Test {
  id: string;
  name: string;
}

// ✅ CORRECT - Import from centralized types
import type { Test } from '@/types/models';
```

### Type Decision Tree:

```
Need a type? 
  ↓
  Does it exist in src/types/models/?
    Yes → Import it ✅
    No → Is it a domain model?
      Yes → Add to src/types/models/ ✅
      No → Component-specific?
        Yes → Keep in component file ✅
```

### Quick Type Examples:

```typescript
// Domain types → src/types/models/
export interface Test { id: string; name: string; }

// Component props → Stay in component
import type { Test } from '@/types/models';
interface TestListProps { tests: Test[]; }
```

---

## � Rule #3: Centralized Constants & Mocks

**NEVER embed constants or mock data in components!**

### Constants Decision:
```typescript
// ❌ WRONG - In component
const ROUTES = { dashboard: '/dashboard' };
const STATUS_COLORS = { active: 'green' };

// ✅ CORRECT - Import from constants
import { ROUTES } from '@/constants/routes';
import { TEST_STATUS_COLORS } from '@/constants/ui';
```

### Mock Data Decision:
```typescript
// ❌ WRONG - In component
const mockData = [{ id: 1, name: 'Test' }];

// ✅ CORRECT - Import from mocks
import { mockTests } from '@/mocks';
import { mockDashboardStats } from '@/mocks/stats';
```

### Quick Locations:
| What? | Where? |
|-------|--------|
| UI colors/configs | `constants/ui.ts` |
| Routes | `constants/routes.ts` |
| Date formats | `constants/date.ts` |
| Features | `constants/features.ts` |
| Test data | `mocks/tests.ts` |
| Chart data | `mocks/charts.ts` |
| Dashboard stats | `mocks/stats.ts` |

---

## 🚀 Rule #4: Mobile-First Always

```typescript
// ❌ WRONG - Desktop-first
<div className="lg:text-sm text-xl">

// ✅ CORRECT - Mobile-first
<div className="text-xl lg:text-sm">
```

## 📦 shadcn/ui is NOT a Package

```bash
# This doesn't install a package - it copies code!
npx shadcn@latest add button

# Creates: src/components/ui/button.tsx
```

### ⚠️ CRITICAL: components.json Setup

```json
// ✅ CORRECT - Use relative paths
"aliases": {
  "components": "./src/components",
  "utils": "./src/lib/utils"
}

// ❌ WRONG - Creates literal @ folder
"aliases": {
  "components": "@/components",
  "utils": "@/lib/utils"
}
```

## 🎨 The cn() Utility is Your Best Friend

```typescript
import { cn } from '@/lib/utils';

<Button className={cn(
  "px-4 py-2",              // defaults
  isActive && "bg-blue-500", // conditional
  className                  // user override (ALWAYS LAST)
)} />
```

## 🌓 Never Forget Dark Mode

```typescript
// ❌ INCOMPLETE
<div className="bg-white text-black">

// ✅ COMPLETE
<div className="bg-white dark:bg-dark-surface text-gray-900 dark:text-white">
```

## 📱 Responsive Breakpoints

```
       sm:640px   md:768px   lg:1024px   xl:1280px   2xl:1536px
Mobile ─────┼─────────┼──────────┼───────────┼───────────┼────→
            Tablet    Laptop     Desktop    Large      XL
```

## ⚡ Quick Patterns

### Container
```typescript
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
```

### Grid
```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
```

### Stack
```typescript
<div className="space-y-4">
```

### Center
```typescript
<div className="flex items-center justify-center min-h-screen">
```

## 🎯 Component Template

```typescript
import { FC } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const MyComponent: FC<Props> = ({ className }) => {
  return (
    <div className={cn(
      "flex flex-col gap-4 p-6",                    // Layout
      "bg-white dark:bg-dark-surface",              // Background
      "border border-gray-200 dark:border-gray-800", // Border
      "text-gray-900 dark:text-white",              // Text
      "rounded-lg shadow-sm",                        // Effects
      "sm:p-8 lg:p-10",                             // Responsive
      className                                      // User override
    )}>
      {/* Content */}
    </div>
  );
};
```

## 📚 Read Full Guide

For complete details, see [AI_AGENT_GUIDE.md](./AI_AGENT_GUIDE.md)
