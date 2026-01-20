# AI Agent Implementation Guide

## \u26a0\ufe0f CRITICAL: Always Check TypeScript Errors

**BEFORE completing any task:**
```bash
npm run build  # Must pass with 0 errors
```

**Common TS errors to watch for:**
1. **Type imports with verbatimModuleSyntax:**
   ```typescript
   // \u274c WRONG
   import { User, LoginData } from './types';
   
   // \u2705 CORRECT
   import type { User, LoginData } from './types';
   // OR
   import { type User, type LoginData } from './types';
   ```

2. **Fast Refresh errors:** Components mixed with non-component exports
   - Keep components in separate files
   - Don't export router config and components together

3. **Property errors:** Always verify method/property exists before using

**Never ignore TypeScript errors. Always fix them before proceeding.**

---

## Table of Contents
1. [Tailwind CSS Best Practices](#tailwind-css-best-practices)
2. [shadcn/ui Integration](#shadcnui-integration)
3. [Common Tailwind Mistakes](#common-tailwind-mistakes)
4. [Component Creation Patterns](#component-creation-patterns)
5. [State Management](#state-management)
6. [Quick Decision Trees](#quick-decision-trees)

---

## Tailwind CSS Best Practices

### ⚠️ Critical Rules for AI Agents

#### 1. **ALWAYS Use Mobile-First Approach**
```typescript
// ❌ WRONG - Desktop-first
<div className="md:text-sm text-xl">

// ✅ CORRECT - Mobile-first
<div className="text-xl md:text-sm">
```

#### 2. **Spacing: Use Consistent Scale**
```typescript
// ❌ AVOID - Inconsistent spacing
<div className="p-3 mt-5 mb-7">

// ✅ PREFER - Consistent scale (4, 8, 12, 16, 24, 32)
<div className="p-4 mt-6 mb-8">
```

**Standard Spacing Scale:**
- `p-1` = 0.25rem (4px)
- `p-2` = 0.5rem (8px)
- `p-4` = 1rem (16px)
- `p-6` = 1.5rem (24px)
- `p-8` = 2rem (32px)
- `p-12` = 3rem (48px)

#### 3. **Color Usage: Follow System Tokens**
```typescript
// ❌ WRONG - Arbitrary colors
<div className="bg-[#1a1f35] text-[#ffffff]">

// ✅ CORRECT - Use design tokens
<div className="bg-dark-surface text-dark-text-primary">

// ✅ ALSO CORRECT - Semantic colors
<div className="bg-primary-500 text-white">
```

#### 4. **Flexbox & Grid: Be Explicit**
```typescript
// ❌ CONFUSING - Incomplete flex
<div className="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// ✅ CLEAR - Specify direction and alignment
<div className="flex flex-row items-center justify-between gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

#### 5. **Responsive Design: Always Specify Breakpoints**
```typescript
// ❌ INCOMPLETE - Only mobile
<div className="grid grid-cols-1">

// ✅ COMPLETE - All breakpoints
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

**Breakpoint Reference:**
- `sm:` = 640px and up (tablets)
- `md:` = 768px and up (small laptops)
- `lg:` = 1024px and up (laptops)
- `xl:` = 1280px and up (desktops)
- `2xl:` = 1536px and up (large screens)

---

### Common Tailwind Patterns

#### Container Pattern
```typescript
// Standard container with responsive padding
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

#### Card Pattern
```typescript
<div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-surface p-6 shadow-sm hover:shadow-md transition-shadow">
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
    Title
  </h3>
  <p className="text-sm text-gray-600 dark:text-gray-400">
    Description
  </p>
</div>
```

#### Button Pattern (Before shadcn/ui)
```typescript
// Primary Button
<button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
  Click me
</button>

// Secondary Button
<button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-surface border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors">
  Cancel
</button>
```

#### Input Pattern (Before shadcn/ui)
```typescript
<input
  type="text"
  className="block w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-surface text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
  placeholder="Enter text..."
/>
```

#### Grid Layout Pattern
```typescript
// Responsive grid with auto-fit
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
  {items.map(item => (
    <div key={item.id}>Card</div>
  ))}
</div>
```

#### Flex Layout Pattern
```typescript
// Centered content
<div className="flex items-center justify-center min-h-screen">
  <div>Centered Content</div>
</div>

// Space between with alignment
<div className="flex flex-row items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>

// Stack with spacing
<div className="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## shadcn/ui Integration

### How shadcn/ui Works

**Key Concept:** shadcn/ui is **NOT a package**. It copies components directly into your project.

### ⚠️ CRITICAL: Avoid the @ Folder Issue

**WRONG Setup (Creates literal @ folder):**
```json
// ❌ components.json with @/ aliases
"aliases": {
  "components": "@/components",  // BAD!
  "utils": "@/lib/utils"         // BAD!
}
```

**CORRECT Setup:**
```json
// ✅ components.json with relative paths
"aliases": {
  "components": "./src/components",  // GOOD!
  "utils": "./src/lib/utils",        // GOOD!
  "ui": "./src/components/ui"
}
```

**Why:** The shadcn CLI doesn't resolve TypeScript path aliases (`@/`). It needs relative paths (`.\src/`) in components.json.

**Your code can still use `@/` for imports:**
```typescript
// This works fine in your code
import { Button } from '@/components/ui/button';
```

**Adding components:**
```bash
# This creates: src/components/ui/button.tsx (NOT @/components/ui/)
npx shadcn@latest add button
```

**If you see an @ folder in your project root - DELETE IT:**
```bash
cp -r @/components/ui src/components/ && rm -rf @
```

### Using shadcn/ui Components

#### Step 1: Add the component
```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
```

#### Step 2: Import and use
```typescript
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const MyComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Button className="w-full">Sign In</Button>
      </CardContent>
    </Card>
  );
};
```

#### Step 3: Customize the component (if needed)
```typescript
// You can modify src/components/ui/button.tsx directly
// Or extend it with custom variants

import { Button } from '@/components/ui/button';

// Using className to extend
<Button className="bg-linear-to-r from-purple-500 to-pink-500">
  Gradient Button
</Button>
```

### shadcn/ui + Tailwind Integration

#### Composition Pattern
```typescript
// shadcn/ui provides the base
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Add Tailwind for layout and spacing
export const PricingCard = ({ tier }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-1 p-6 space-y-4">
        <h3 className="text-2xl font-bold text-center">{tier.name}</h3>
        <p className="text-4xl font-bold text-center text-primary-500">
          ${tier.price}
          <span className="text-sm font-normal text-gray-500">/month</span>
        </p>
        <ul className="space-y-2">
          {tier.features.map(feature => (
            <li key={feature} className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <div className="p-6 pt-0">
        <Button className="w-full" size="lg">
          Get Started
        </Button>
      </div>
    </Card>
  );
};
```

### The cn() Utility

**Most Important Function:**

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Why it matters:**
- Merges Tailwind classes intelligently
- Resolves conflicts (last class wins)
- Handles conditional classes

**Usage:**
```typescript
import { cn } from '@/lib/utils';

// Basic usage
<div className={cn("text-base", "font-bold")} />

// Conditional classes
<div className={cn(
  "px-4 py-2 rounded",
  isActive && "bg-primary-500 text-white",
  !isActive && "bg-gray-100 text-gray-700"
)} />

// Merge props.className with defaults
interface ButtonProps {
  className?: string;
}

export const CustomButton = ({ className, ...props }: ButtonProps) => {
  return (
    <button 
      className={cn(
        "px-4 py-2 rounded font-medium", // defaults
        className // user overrides
      )}
      {...props}
    />
  );
};
```

---

## Common Tailwind Mistakes

### ❌ Mistake 1: Conflicting Classes
```typescript
// ❌ WRONG - Last one wins, but confusing
<div className="p-4 p-6 p-8">
  // Which padding? (p-8 wins but unclear)
</div>

// ✅ CORRECT - Be explicit
<div className="p-8">
  // Clear intention
</div>
```

### ❌ Mistake 2: Using Arbitrary Values Unnecessarily
```typescript
// ❌ AVOID - Hard to maintain
<div className="w-85.5 h-30.75 mt-9.25">

// ✅ PREFER - Use design system
<div className="w-80 h-32 mt-10">
```

**When to use arbitrary values:** Only for truly unique cases
```typescript
// ✅ ACCEPTABLE - Specific design requirement
<div className="bg-linear-to-r from-[#667eea] to-[#764ba2]">
```

### ❌ Mistake 3: Forgetting Dark Mode
```typescript
// ❌ INCOMPLETE - No dark mode
<div className="bg-white text-black">

// ✅ COMPLETE - With dark mode
<div className="bg-white dark:bg-dark-surface text-gray-900 dark:text-white">
```

### ❌ Mistake 4: Not Using Space/Gap Utilities
```typescript
// ❌ OLD WAY - Manual margins
<div>
  <div className="mb-4">Item 1</div>
  <div className="mb-4">Item 2</div>
  <div>Item 3</div>
</div>

// ✅ NEW WAY - Space utilities
<div className="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// ✅ OR - Gap for flex/grid
<div className="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### ❌ Mistake 5: Overcomplicating Hover/Focus States
```typescript
// ❌ VERBOSE
<button className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-800">

// ✅ CLEANER - Use transition
<button className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
```

### ❌ Mistake 6: Not Grouping Related Classes
```typescript
// ❌ HARD TO READ
<div className="text-lg bg-white p-4 rounded-lg font-semibold text-gray-900 shadow-md border border-gray-200 mb-4 hover:shadow-lg transition-shadow">

// ✅ ORGANIZED BY CATEGORY
<div className={cn(
  // Layout
  "p-4 mb-4",
  // Typography
  "text-lg font-semibold text-gray-900",
  // Borders & Backgrounds
  "bg-white border border-gray-200 rounded-lg",
  // Effects
  "shadow-md hover:shadow-lg transition-shadow"
)}>
```

---

## Component Creation Patterns

### Pattern 1: Functional Component with Props

```typescript
import { FC } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

export const Card: FC<CardProps> = ({ 
  title, 
  description, 
  className,
  children 
}) => {
  return (
    <div className={cn(
      "rounded-lg border bg-white dark:bg-dark-surface p-6",
      className
    )}>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {description}
      </p>
      {children}
    </div>
  );
};
```

### Pattern 2: Form Component with Validation

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('email')}
          type="email"
          placeholder="Email"
          className={cn(errors.email && "border-red-500")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      
      <div>
        <Input
          {...register('password')}
          type="password"
          placeholder="Password"
          className={cn(errors.password && "border-red-500")}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
};
```

### Pattern 3: Component with State & API Call

```typescript
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface User {
  id: string;
  name: string;
  email: string;
}

export const UserList = () => {
  const [page, setPage] = useState(1);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['users', page],
    queryFn: () => fetch(`/api/users?page=${page}`).then(res => res.json()),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        Error loading users
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.users.map((user: User) => (
          <Card key={user.id} className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {user.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user.email}
            </p>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center gap-2">
        <Button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button onClick={() => setPage(p => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};
```

---

## State Management

### Local State (useState)
```typescript
const [isOpen, setIsOpen] = useState(false);
const [count, setCount] = useState(0);
```

### Global State (Zustand)
```typescript
// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Usage in component
import { useAuthStore } from '@/stores/authStore';

const { user, logout } = useAuthStore();
```

### Server State (TanStack Query)
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch data
const { data, isLoading } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
});

// Mutate data
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
});
```

---

## Quick Decision Trees

### Should I use Tailwind or CSS?
- ✅ Use Tailwind for: Layouts, spacing, colors, typography, basic styles
- ❌ Avoid Tailwind for: Complex animations, keyframes, global styles
- ➡️ Use CSS for: Unique animations, `@font-face`, global resets

### Should I create a new component?
- ✅ Create new if: Used in 2+ places, complex logic, needs testing
- ❌ Don't create if: One-off usage, simple div wrapper
- ➡️ Consider: Can shadcn/ui component work instead?

### How to handle dark mode?
- Always add `dark:` variants for colors
- Use semantic color tokens from design system
- Test both light and dark modes

### When to use cn() utility?
- ✅ Always use when: Merging className prop with defaults
- ✅ Use for: Conditional classes
- ❌ Not needed for: Static classes without conditions

---

## Final Checklist for Every Component

- [ ] Mobile-first responsive design (sm:, md:, lg:, xl:)
- [ ] Dark mode support (dark: variants)
- [ ] Proper spacing using design system scale
- [ ] Accessibility (aria-labels, keyboard navigation)
- [ ] Loading states
- [ ] Error states
- [ ] TypeScript types defined
- [ ] Proper imports from shadcn/ui
- [ ] Uses cn() utility for className merging
- [ ] Follows existing patterns in codebase
