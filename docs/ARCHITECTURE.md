# Technical Architecture

## Tech Stack

### Core Framework
- **React 18**: Latest with concurrent features
- **TypeScript**: Type safety and better DX
- **Vite**: Fast build tool and dev server

### Routing & State
- **React Router v6**: Client-side routing with data loading
- **Zustand**: Lightweight state management (AI-agent friendly)
- **TanStack Query**: Server state management and caching

### UI & Styling
- **Tailwind CSS**: Utility-first styling framework (AI-friendly, predictable class names)
- **Shadcn/ui**: Component system that copies code into your project (NOT a package)
- **Framer Motion**: Advanced animations and transitions
- **Radix UI**: Headless UI primitives (foundation for shadcn/ui)

**How they work together:**
```
Your Component (Layout & Composition)
    ↓ Uses Tailwind classes
Shadcn/ui Component (Structure & Behavior)
    ↓ Built on top of
Radix UI (Accessibility & Primitives)
```

### Forms & Validation
- **React Hook Form**: Performant form management
- **Zod**: TypeScript-first schema validation

### Additional Tools
- **Axios**: HTTP client with interceptors
- **Date-fns**: Date manipulation
- **React Helmet Async**: SEO meta tags
- **React Hot Toast**: Notifications

## TypeScript Type System

### Centralized Type Management

All domain types are centralized in `src/types/models/` to ensure:
- **Single source of truth** - Each type defined once
- **Reusability** - Types shared across components
- **Maintainability** - Changes in one place
- **Type safety** - No duplicates or conflicts

### Type Organization

```
src/types/models/
├── index.ts           # Central export - import from here
├── dashboard.ts       # Dashboard domain types
├── analytics.ts       # Analytics and metrics
├── billing.ts         # Payment and subscriptions
├── security.ts        # Security and sessions
├── notification.ts    # Notifications and activity
└── content.ts         # Public content (blog, etc.)
```

### Type Usage Rules

**DO:**
```typescript
// ✅ Import domain types from centralized location
import type { Test, TeamMember, UserRole } from '@/types/models';

// ✅ Keep component-specific props in component
interface TestListProps {
  tests: Test[];
  onSelect: (id: string) => void;
}
```

**DON'T:**
```typescript
// ❌ Don't recreate existing domain types
interface Test {
  id: string;
  name: string;
}

// ❌ Don't put component props in types/models/
export interface TestListProps { /* ... */ }

// ❌ Don't import without 'type' keyword
import { Test } from '@/types/models';
```

### When Creating New Types

1. **Check if it exists** in `src/types/models/` first
2. **Determine category:**
   - Domain model (User, Test, Invoice) → `types/models/`
   - Component props → Stay in component file
3. **Choose the right file:**
   - Dashboard-related → `dashboard.ts`
   - Analytics → `analytics.ts`
   - Billing → `billing.ts`
   - etc.
4. **Use proper import syntax:**
   ```typescript
   import type { TypeName } from '@/types/models';
   ```

### Type Categories

| File | Contains | Examples |
|------|----------|----------|
| `dashboard.ts` | Test management, team, execution | Test, TeamMember, UserRole, TestRun |
| `analytics.ts` | Analytics and metrics | Insight, FlakyTest, DateRange |
| `billing.ts` | Payment and subscriptions | PaymentMethod, Invoice, Plan |
| `security.ts` | Security and sessions | ActiveSession, SecurityLog |
| `notification.ts` | Notifications and activity | Notification, Activity |
| `content.ts` | Public-facing content | BlogPost, JobPosting, Feature |

See `src/types/README.md` for detailed documentation.

## Project Structure

```
qa_ai/
├── docs/                          # Documentation
│   ├── PROJECT_OVERVIEW.md
│   ├── ARCHITECTURE.md
│   ├── COMPONENT_DESIGN.md
│   └── AI_AGENT_GUIDE.md
├── public/                        # Static assets
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
├── src/
│   ├── components/               # React components
│   │   ├── ui/                   # Base UI components (shadcn)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── layout/               # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── features/             # Feature-specific components
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── SignupForm.tsx
│   │   │   │   └── PasswordReset.tsx
│   │   │   ├── home/
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── Features.tsx
│   │   │   │   └── Testimonials.tsx
│   │   │   ├── pricing/
│   │   │   │   ├── PricingCard.tsx
│   │   │   │   └── PricingComparison.tsx
│   │   │   └── blog/
│   │   │       ├── BlogCard.tsx
│   │   │       └── BlogPost.tsx
│   │   └── common/               # Reusable components
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── SEO.tsx
│   ├── types/                    # TypeScript type definitions
│   │   ├── models/               # Domain model types
│   │   │   ├── index.ts          # Central export point
│   │   │   ├── dashboard.ts      # Test, TeamMember, etc.
│   │   │   ├── analytics.ts      # Insight, FlakyTest, etc.
│   │   │   ├── billing.ts        # PaymentMethod, Invoice, etc.
│   │   │   ├── security.ts       # ActiveSession, SecurityLog
│   │   │   ├── notification.ts   # Notification, Activity
│   │   │   └── content.ts        # Blog, Pricing, Careers
│   │   └── api/                  # API-related types
│   ├── pages/                    # Page components
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── PricingPage.tsx
│   │   ├── BlogListPage.tsx
│   │   ├── BlogPostPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useTheme.ts
│   │   └── useMediaQuery.ts
│   ├── stores/                   # Zustand stores
│   │   ├── authStore.ts
│   │   ├── themeStore.ts
│   │   └── uiStore.ts
│   ├── services/                 # API services
│   │   ├── api/
│   │   │   ├── client.ts         # Axios instance
│   │   │   ├── auth.ts
│   │   │   ├── blog.ts
│   │   │   └── user.ts
│   │   └── analytics/
│   │       └── tracking.ts
│   ├── lib/                      # Utility libraries
│   │   ├── utils.ts              # Helper functions
│   │   ├── cn.ts                 # Class name merger
│   │   ├── api-error-handler.ts
│   │   └── token-storage.ts
│   ├── constants/                # Application constants
│   │   ├── index.ts              # Central export point
│   │   ├── ui.ts                 # UI styling configs
│   │   ├── routes.ts             # Route paths
│   │   ├── date.ts               # Date formats
│   │   ├── features.ts           # Feature definitions
│   │   ├── documentation.ts      # Documentation sections
│   │   └── blog.ts               # Blog categories
│   ├── mocks/                    # Mock data (development)
│   │   ├── index.ts              # Central export point
│   │   ├── charts.ts             # Chart data
│   │   ├── tests.ts              # Test data
│   │   ├── stats.ts              # Statistics data
│   │   ├── billing.ts            # Billing/payment data
│   │   ├── security.ts           # Security logs
│   │   ├── team.ts               # Team data
│   │   ├── about.ts              # About page data
│   │   ├── blog.ts               # Blog posts
│   │   ├── activity.ts           # Activity feed
│   │   └── actions.ts            # Quick actions
│   ├── types/                    # TypeScript types
│   │   ├── models/
│   │   │   ├── index.ts          # Central export point
│   │   │   ├── dashboard.ts      # Test, TeamMember, etc.
│   │   │   ├── analytics.ts      # Insight, FlakyTest, etc.
│   │   │   ├── billing.ts        # PaymentMethod, Invoice, etc.
│   │   │   ├── security.ts       # ActiveSession, SecurityLog
│   │   │   ├── notification.ts   # Notification, Activity
│   │   │   └── content.ts        # Blog, Pricing, Careers
│   │   └── api/                  # API-related types
│   ├── styles/                   # Global styles
│   │   ├── globals.css
│   │   └── themes.css
│   ├── config/                   # Configuration
│   │   └── env.ts
│   ├── App.tsx                   # Root component
│   ├── main.tsx                  # Entry point
│   └── router.tsx                # Route configuration
├── tests/                        # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├──Styling Strategy: Tailwind + shadcn/ui

### Understanding the Relationship

**Tailwind CSS:**
- Provides utility classes for styling (`bg-blue-500`, `p-4`, `rounded-lg`)
- Used for layout, spacing, colors, typography
- Mobile-first responsive design

**shadcn/ui:**
- Provides pre-built React components (Button, Input, Card, etc.)
- Components are **copied into your project** (not installed as a package)
- Uses Tailwind classes internally
- Built on Radix UI for accessibility

### Integration Pattern

```typescript
// 1. Add shadcn/ui component
// $ npx shadcn-ui@latest add button

// 2. Import the component
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// 3. Use with Tailwind for layout
export const PricingCard = () => {
  return (
    <Card className="flex flex-col h-full"> {/* Tailwind layout */}
      <CardContent className="p-6 space-y-4"> {/* Tailwind spacing */}
        <h3 className="text-2xl font-bold">Pro Plan</h3> {/* Tailwind typography */}
        <Button className="w-full">Subscribe</Button> {/* Tailwind width */}
      </CardContent>
    </Card>
  );
};
```

### The cn() Utility (Critical for AI Agents)

**Location:** `src/lib/utils.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Purpose:**
- Merges Tailwind classes intelligently
- Resolves class conflicts (last class wins)
- Handles conditional classes cleanly

**Usage:**
```typescript
import { cn } from '@/lib/utils';

// Merge default classes with user overrides
<Button className={cn(
  "px-4 py-2 rounded", // defaults
  props.className // user overrides
)} />

// Conditional classes
<div className={cn(
  "px-4 py-2",
  isActive && "bg-blue-500 text-white",
  !isActive && "bg-gray-100 text-gray-700"
)} />
```

### Tailwind Configuration

**tailwind.config.js:**
```javascript
module.exports = {
  darkMode: ['class'], // Enable dark mode with class strategy
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Scan these files for classes
  ],
  theme: {
    extend: {
      colors: {
        // Custom color tokens
        primary: {
          50: '#e6f7ff',
          500: '#00a0f0',
          900: '#002030',
        },
        dark: {
          bg: '#0a0e1a',
          surface: '#1a1f35',
          elevated: '#252b45',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### Mobile-First Responsive Design (CRITICAL)

**Always write mobile styles first, then add breakpoint variants:**

```typescript
// ❌ WRONG - Desktop-first
<div className="lg:text-sm text-xl">

// ✅ CORRECT - Mobile-first
<div className="text-xl lg:text-sm">
```

**Breakpoints:**
```typescript
// Base (mobile): < 640px
<div className="text-base p-4">

// sm (tablet): ≥ 640px
<div className="text-base sm:text-lg p-4 sm:p-6">

// md (small laptop): ≥ 768px
<div className="text-base sm:text-lg md:text-xl">

// lg (laptop): ≥ 1024px
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

// xl (desktop): ≥ 1280px
<div className="text-base sm:text-lg md:text-xl xl:text-2xl">

// 2xl (large screen): ≥ 1536px
<div className="container 2xl:max-w-7xl">
```

### Dark Mode Pattern

**Always include dark mode variants:**

```typescript
// Text colors
<p className="text-gray-900 dark:text-white">

// Backgrounds
<div className="bg-white dark:bg-dark-surface">

// Borders
<div className="border-gray-200 dark:border-gray-800">

// Complete example
<Card className={cn(
  "border rounded-lg p-6",
  "bg-white dark:bg-dark-surface",
  "border-gray-200 dark:border-gray-800",
  "text-gray-900 dark:text-white"
)}>
```

### Common Patterns (Copy-Paste Ready)

#### Container
```typescript
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

#### Centered Layout
```typescript
<div className="flex items-center justify-center min-h-screen">
  <div className="w-full max-w-md">
    {/* Centered content */}
  </div>
</div>
```

#### Grid Layout
```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
  {items.map(item => <div key={item.id}>Card</div>)}
</div>
```

#### Stack with Spacing
```typescript
<div className="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### Section Spacing
```typescript
<section className="py-12 sm:py-16 lg:py-24">
  <div className="container mx-auto px-4">
    {/* Section content */}
  </div>
</section>
```

---

##  .env.example                  # Environment variables template
├── .eslintrc.js                  # ESLint configuration
├── .prettierrc                   # Prettier configuration
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite configuration
└── package.json
```

## Architectural Patterns

### 1. Component Architecture
- **Atomic Design**: Atoms → Molecules → Organisms → Templates → Pages
- **Composition over Inheritance**: Use composition for flexibility
- **Container/Presenter Pattern**: Separate logic from presentation

### 2. State Management Strategy
- **Local State**: useState for component-specific state
- **Global State**: Zustand for app-wide state (auth, theme, UI)
- **Server State**: TanStack Query for API data (caching, refetching)
- **Form State**: React Hook Form for form-specific state

### 3. Code Organization
- **Feature-based**: Group by feature, not by type
- **Barrel Exports**: index.ts files for clean imports
- **Absolute Imports**: Use @ alias for src/ directory

### 4. API Integration
- **Axios Instance**: Centralized HTTP client with interceptors
- **Error Handling**: Consistent error boundaries and toast notifications
- **Request/Response Types**: Fully typed API interactions
- **Authentication**: JWT token management with refresh logic

#### API Error Handling Strategy

**Error Response Format**:
```typescript
interface ApiError {
  code: string;
  message: string;
  field?: string;        // For validation errors
  details?: Record<string, any>;
  statusCode: number;
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
```

**Centralized Error Handler**:
```typescript
// lib/api-error-handler.ts
export class ApiErrorHandler {
  static normalize(error: any): ApiError {
    if (error.response) {
      return {
        code: error.response.data?.code || 'API_ERROR',
        message: error.response.data?.message || 'An error occurred',
        field: error.response.data?.field,
        details: error.response.data?.details,
        statusCode: error.response.status,
      };
    }
    
    if (error.request) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Network error. Please check your connection.',
        statusCode: 0,
      };
    }
    
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message || 'An unexpected error occurred',
      statusCode: 500,
    };
  }
  
  static handle(error: ApiError, showToast = true) {
    // Log to error tracking service
    if (window.Sentry) {
      Sentry.captureException(error);
    }
    
    // Show user-friendly message
    if (showToast) {
      toast.error(error.message);
    }
    
    return error;
  }
}
```

#### Authentication Token Refresh Implementation

**Token Refresh Logic**:
```typescript
// services/api/client.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }
        
        // Call refresh endpoint
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          { refreshToken }
        );
        
        const newAccessToken = data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        
        // Update auth store
        useAuthStore.getState().setToken(newAccessToken);
        
        // Process queued requests
        processQueue(null, newAccessToken);
        
        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        
        // Refresh failed - logout user
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    // Handle other errors
    return Promise.reject(ApiErrorHandler.normalize(error));
  }
);
```

### 5. Performance Optimization
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Lazy loading and WebP format
- **Memoization**: React.memo, useMemo, useCallback where needed
- **Bundle Analysis**: Regular checks with vite-bundle-visualizer

#### Bundle Splitting Strategy

**Vite Configuration**:
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: false, filename: 'dist/stats.html' }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate React core from other vendor code
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          
          // UI library dependencies
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-select',
          ],
          
          // Animation library (heavy)
          'vendor-motion': ['framer-motion'],
          
          // State management and data fetching
          'vendor-state': ['zustand', '@tanstack/react-query', 'axios'],
          
          // Form libraries
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
    // Target modern browsers for smaller bundles
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
```

#### Image Optimization Strategy

**Install Dependencies**:
```bash
npm install -D vite-plugin-image-optimizer sharp
```

**Configure Image Optimization**:
```typescript
// vite.config.ts
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 70 },
    }),
  ],
});
```

**Image Component Pattern**:
```typescript
// components/common/OptimizedImage.tsx
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

export const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
      <picture>
        <source srcSet={`${src}.avif`} type="image/avif" />
        <source srcSet={`${src}.webp`} type="image/webp" />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      </picture>
    </div>
  );
};
```

**Font Loading Strategy**:
```css
/* styles/globals.css */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap; /* Prevent FOIT, show fallback immediately */
  src: url('/fonts/inter-var.woff2') format('woff2');
}
```

## Design Patterns

### Smart vs Dumb Components
```typescript
// Smart Component (Container)
// Handles logic, data fetching, state management
export const BlogListContainer = () => {
  const { data, isLoading } = useQuery(['blogs'], fetchBlogs);
  return <BlogList blogs={data} loading={isLoading} />;
};

// Dumb Component (Presenter)
// Pure presentation, receives props
export const BlogList = ({ blogs, loading }) => {
  return <div>{/* render blogs */}</div>;
};
```

### Custom Hooks Pattern
```typescript
// Encapsulate reusable logic
export const useAuth = () => {
  const store = useAuthStore();
  const navigate = useNavigate();
  
  const login = async (credentials) => {
    // login logic
  };
  
  return { user: store.user, login, logout: store.logout };
};
```

### Service Layer Pattern
```typescript
// Abstract API calls
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
};
```

## Routing Structure

```typescript
{
  path: '/',
  element: <MainLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: 'pricing', element: <PricingPage /> },
    { path: 'blog', element: <BlogListPage /> },
    { path: 'blog/:slug', element: <BlogPostPage /> },
    { path: 'about', element: <AboutPage /> },
    { path: 'contact', element: <ContactPage /> },
  ]
},
{
  path: '/auth',
  element: <AuthLayout />,
  children: [
    { path: 'login', element: <LoginPage /> },
    { path: 'signup', element: <SignupPage /> },
    { path: 'reset-password', element: <ResetPasswordPage /> },
  ]
},
{
  path: '/dashboard',
  element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
  children: [
    { index: true, element: <DashboardHome /> },
    // Protected routes
  ]
}
```

## Security Best Practices

### 1. XSS Protection

**For Blog Content (Markdown/HTML)**:
```typescript
// lib/sanitize.ts
import DOMPurify from 'dompurify';
import { marked } from 'marked';

export const sanitizeMarkdown = (markdown: string): string => {
  // Convert markdown to HTML
  const html = marked(markdown);
  
  // Sanitize HTML
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'ul', 'ol', 'li',
      'strong', 'em', 'code', 'pre',
      'a', 'img', 'blockquote',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });
};

// Usage in BlogPost component
export const BlogPost = ({ content }) => {
  const sanitizedContent = useMemo(
    () => sanitizeMarkdown(content),
    [content]
  );
  
  return (
    <div 
      className="prose"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};
```

**Content Security Policy**:
```typescript
// Add to index.html or via server headers
<meta
  http-equiv="Content-Security-Policy"
  content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self' data:;
    connect-src 'self' https://api.example.com;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
  "
/>
```

### 2. Input Validation & Sanitization

**Form Validation with Zod**:
```typescript
// lib/validation-schemas.ts
import { z } from 'zod';

// Sanitize string inputs
const sanitizedString = z.string().transform((val) => 
  val.trim().replace(/[<>]/g, '')
);

export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase()
    .max(255, 'Email too long'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long'),
});

export const blogCommentSchema = z.object({
  content: sanitizedString
    .min(1, 'Comment cannot be empty')
    .max(5000, 'Comment too long'),
  author: sanitizedString
    .min(2, 'Name too short')
    .max(100, 'Name too long'),
});
```

### 3. Secure Token Storage

**Token Management**:
```typescript
// lib/token-storage.ts
const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const tokenStorage = {
  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  
  getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  
  clearTokens() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  
  // Check if token is expired (decode JWT)
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  },
};

// Note: For production, consider using httpOnly cookies
// This requires backend configuration but is more secure
```

### 4. CSRF Protection

**CSRF Token Implementation**:
```typescript
// services/api/client.ts
apiClient.interceptors.request.use((config) => {
  // Add CSRF token to state-changing requests
  if (['post', 'put', 'patch', 'delete'].includes(config.method || '')) {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content');
    
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }
  }
  return config;
});
```

### 5. Rate Limiting (Client-Side)

**Request Throttling**:
```typescript
// hooks/useThrottledMutation.ts
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';

export const useThrottledMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  delay = 1000
) => {
  const lastCallTime = useRef<number>(0);
  
  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTime.current;
      
      if (timeSinceLastCall < delay) {
        throw new Error('Please wait before trying again');
      }
      
      lastCallTime.current = now;
      return mutationFn(variables);
    },
  });
};
```

### 6. Sensitive Data Handling

**API Key Protection**:
```typescript
// ❌ NEVER expose sensitive keys in frontend
// const API_KEY = import.meta.env.VITE_SECRET_KEY; // WRONG!

// ✅ Use backend proxy for sensitive operations
// services/api/analytics.ts
export const analyticsService = {
  // Backend handles the API key
  track: (event: AnalyticsEvent) =>
    apiClient.post('/api/analytics/track', event),
};
```

### 7. Security Headers

**Add to Server Configuration** (Vercel, Netlify, etc.):
```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

## Testing Strategy
- **Unit Tests**: Vitest for components and utilities
- **Integration Tests**: Testing Library for user flows
- **E2E Tests**: Playwright for critical user journeys
- **Visual Tests**: Storybook for component documentation
