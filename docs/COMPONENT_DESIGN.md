# Component Design System

## Design Tokens

### Color Palette (Futuristic Theme)

```typescript
// tailwind.config.js
export const colors = {
  // Primary - Electric Blue/Cyan
  primary: {
    50: '#e6f7ff',
    100: '#b3e5ff',
    200: '#80d4ff',
    300: '#4dc3ff',
    400: '#1ab2ff',
    500: '#00a0f0',  // Main
    600: '#0080c0',
    700: '#006090',
    800: '#004060',
    900: '#002030',
  },
  
  // Accent - Purple/Magenta
  accent: {
    50: '#f5e6ff',
    100: '#e0b3ff',
    200: '#cc80ff',
    300: '#b84dff',
    400: '#a31aff',
    500: '#8f00ff',  // Main
    600: '#7200cc',
    700: '#560099',
    800: '#390066',
    900: '#1d0033',
  },
  
  // Dark Theme
  dark: {
    bg: '#0a0e1a',        // Deep space blue
    surface: '#1a1f35',   // Card background
    elevated: '#252b45',  // Elevated surfaces
    border: '#363d5a',    // Borders
    text: {
      primary: '#ffffff',
      secondary: '#b4b9d0',
      muted: '#7880a0',
    }
  },
  
  // Light Theme
  light: {
    bg: '#ffffff',
    surface: '#f8f9fc',
    elevated: '#ffffff',
    border: '#e1e4eb',
    text: {
      primary: '#1a1f35',
      secondary: '#4a5374',
      muted: '#7880a0',
    }
  },
  
  // Semantic Colors
  success: '#00e676',
  warning: '#ffa726',
  error: '#ff1744',
  info: '#00b0ff',
};
```

### Typography

```typescript
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
    display: ['Space Grotesk', 'sans-serif'], // For headings
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
  },
};
```

### Spacing & Layout

```typescript
export const spacing = {
  container: {
    center: true,
    padding: {
      DEFAULT: '1rem',
      sm: '2rem',
      lg: '4rem',
      xl: '5rem',
      '2xl': '6rem',
    },
  },
  
  maxWidth: {
    prose: '65ch',
    screen: '1440px',
  },
};
```

### Animation & Transitions

```typescript
export const animation = {
  // Smooth transitions
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Keyframe animations
  keyframes: {
    'fade-in': {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    'slide-up': {
      '0%': { transform: 'translateY(20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    'pulse-glow': {
      '0%, 100%': { boxShadow: '0 0 20px rgba(0, 160, 240, 0.5)' },
      '50%': { boxShadow: '0 0 40px rgba(0, 160, 240, 0.8)' },
    },
  },
};
```

## Component Hierarchy

### Level 1: Base UI Components (Atoms)

Located in `src/components/ui/` - These are from Shadcn/ui

```
- Button: Primary, secondary, outline, ghost variants
- Input: Text, email, password with validation states
- Textarea: Multiline text input
- Select: Dropdown selection
- Checkbox: Boolean selection
- Radio: Single choice from multiple options
- Switch: Toggle on/off
- Card: Content container
- Badge: Status indicators
- Avatar: User images
- Tooltip: Contextual help
- Dialog: Modal dialogs
- Popover: Floating content
- Tabs: Content organization
- Accordion: Collapsible sections
- Progress: Loading indicators
- Skeleton: Loading placeholders
```

### Level 2: Layout Components (Molecules)

Located in `src/components/layout/`

#### Header.tsx
```typescript
/**
 * Main navigation header
 * - Logo (links to home)
 * - Navigation menu (desktop)
 * - Mobile menu button
 * - Theme toggle
 * - Auth buttons / User menu
 */
interface HeaderProps {
  transparent?: boolean;  // For hero sections
  fixed?: boolean;        // Sticky header
}
```

#### Footer.tsx
```typescript
/**
 * Site footer
 * - Company info and logo
 * - Link sections (Product, Company, Resources, Legal)
 * - Social media links
 * - Newsletter signup
 * - Copyright notice
 */
```

#### Sidebar.tsx
```typescript
/**
 * Dashboard sidebar navigation
 * - Navigation links with icons
 * - Collapsible sections
 * - User profile section
 * - Logout button
 */
interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}
```

#### MainLayout.tsx
```typescript
/**
 * Main layout wrapper
 * - Header
 * - Content area
 * - Footer
 */
export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
```

### Level 3: Feature Components (Organisms)

#### Home Page Components (`src/components/features/home/`)

##### Hero.tsx
```typescript
/**
 * Homepage hero section
 * - Animated gradient background
 * - Main headline with typing effect
 * - Subheadline
 * - CTA buttons (Get Started, Watch Demo)
 * - Floating UI elements (particles, glows)
 * - Hero image/animation
 */
interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
}
```

##### Features.tsx
```typescript
/**
 * Feature showcase section
 * - Grid of feature cards
 * - Icon, title, description
 * - Hover effects
 * - Optional "Learn More" link
 */
interface Feature {
  icon: React.ComponentType;
  title: string;
  description: string;
  link?: string;
}
```

##### Testimonials.tsx
```typescript
/**
 * Customer testimonials carousel
 * - Auto-rotating carousel
 * - Customer name, role, company
 * - Quote text
 * - Avatar
 * - Navigation dots
 */
interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}
```

##### HowItWorks.tsx
```typescript
/**
 * Process/steps section
 * - Numbered steps
 * - Title and description
 * - Visual (image/icon/animation)
 * - Connected with lines/arrows
 */
```

#### Authentication Components (`src/components/features/auth/`)

##### LoginForm.tsx
```typescript
/**
 * Login form with validation
 * - Email field
 * - Password field with show/hide
 * - Remember me checkbox
 * - Forgot password link
 * - Submit button with loading state
 * - Social login options (Google, GitHub)
 * - Link to signup
 */
interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}
```

##### SignupForm.tsx
```typescript
/**
 * Multi-step signup form
 * - Step 1: Email, password, confirm password
 * - Step 2: Name, company, role
 * - Step 3: Accept terms, subscribe to newsletter
 * - Progress indicator
 * - Validation with Zod
 * - Submit with error handling
 */
```

##### PasswordReset.tsx
```typescript
/**
 * Password reset flow
 * - Email input (request reset)
 * - Confirmation message
 * - New password form (from email link)
 */
```

#### Pricing Components (`src/components/features/pricing/`)

##### PricingCard.tsx
```typescript
/**
 * Individual pricing tier card
 * - Tier name and badge (Popular, Best Value)
 * - Price with period toggle (monthly/annual)
 * - Feature list with checkmarks
 * - CTA button
 * - Hover effects (glow, scale)
 */
interface PricingTier {
  name: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  features: string[];
  highlighted?: boolean;
  cta: string;
}
```

##### PricingComparison.tsx
```typescript
/**
 * Detailed feature comparison table
 * - Features as rows
 * - Tiers as columns
 * - Checkmarks/crosses for availability
 * - Tooltips for feature details
 */
```

#### Blog Components (`src/components/features/blog/`)

##### BlogCard.tsx
```typescript
/**
 * Blog post preview card
 * - Featured image
 * - Category badge
 * - Title
 * - Excerpt
 * - Author info
 * - Read time
 * - Date
 * - Read more link
 */
interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
}
```

##### BlogPost.tsx
```typescript
/**
 * Full blog post view
 * - Hero image
 * - Title, author, date, read time
 * - Share buttons
 * - Table of contents (for long posts)
 * - Rich content (Markdown rendered)
 * - Related posts
 * - Comments section
 */
```

##### BlogFilters.tsx
```typescript
/**
 * Blog filtering and search
 * - Search input
 * - Category filters
 * - Tag filters
 * - Sort options
 */
```

### Level 4: Common/Shared Components

Located in `src/components/common/`

##### LoadingSpinner.tsx
```typescript
/**
 * Loading indicator
 * - Spinning animation
 * - Size variants (sm, md, lg)
 * - Optional text
 */
```

##### ErrorBoundary.tsx
```typescript
/**
 * React error boundary
 * - Catches errors in component tree
 * - Shows fallback UI
 * - Error reporting to service
 */
```

##### SEO.tsx
```typescript
/**
 * SEO meta tags wrapper
 * - Title, description
 * - Open Graph tags
 * - Twitter cards
 * - Canonical URL
 */
interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}
```

##### EmptyState.tsx
```typescript
/**
 * Empty state placeholder
 * - Icon/illustration
 * - Title
 * - Description
 * - Optional CTA
 */
```

##### NotificationToast.tsx
```typescript
/**
 * Toast notification system
 * - Success, error, warning, info variants
 * - Auto-dismiss
 * - Action button
 * - Close button
 */
```

## Design Patterns & Best Practices

### 1. Component Template

```typescript
import { FC } from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  // other props
}

/**
 * Component description
 * @param props - Component props
 */
export const Component: FC<ComponentProps> = ({ 
  className,
  children,
  ...props 
}) => {
  return (
    <div className={cn(
      // Layout & Structure
      "flex flex-col gap-4 p-6",
      
      // Colors & Backgrounds
      "bg-white dark:bg-dark-surface",
      "border border-gray-200 dark:border-gray-800",
      
      // Typography
      "text-gray-900 dark:text-white",
      
      // Effects
      "rounded-lg shadow-sm hover:shadow-md transition-shadow",
      
      // Responsive
      "sm:p-8 lg:p-10",
      
      // User overrides
      className
    )}>
      {children}
    </div>
  );
};
```

**Key Points:**
- Always accept `className` prop for user customization
- Use `cn()` utility to merge classes
- Group classes by category (layout, colors, effects, responsive)
- Put user's `className` last so it overrides defaults
- Include dark mode variants for all color-related classes

### 2. Compound Components
```typescript
// For complex components with multiple parts
export const Pricing = {
  Root: PricingRoot,
  Card: PricingCard,
  Feature: PricingFeature,
  CTA: PricingCTA,
};

// Usage
<Pricing.Root>
  <Pricing.Card tier="pro">
    <Pricing.Feature>Feature 1</Pricing.Feature>
    <Pricing.CTA>Sign Up</Pricing.CTA>
  </Pricing.Card>
</Pricing.Root>
```

### 3. Responsive Design Patterns

**CRITICAL: Always use mobile-first approach**

```typescript
// ❌ WRONG - Desktop-first (confusing, breaks on mobile)
<div className="lg:flex-row flex-col">

// ✅ CORRECT - Mobile-first (clear, scales up)
<div className="flex-col lg:flex-row">
```

**Complete Responsive Pattern:**
```typescript
<div className={cn(
  // Mobile (default, < 640px)
  "flex flex-col gap-4 p-4",
  
  // Tablet (≥ 640px)
  "sm:flex-row sm:gap-6 sm:p-6",
  
  // Desktop (≥ 1024px)
  "lg:gap-8 lg:p-8"
)}>
  <div className="w-full lg:w-1/3">Sidebar</div>
  <div className="w-full lg:w-2/3">Content</div>
</div>
```

**Responsive Text Sizing:**
```typescript
// Heading scales from mobile to desktop
<h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold">
  Hero Title
</h1>

// Body text scales
<p className="text-sm sm:text-base lg:text-lg">
  Description text
</p>
```

**Responsive Grid:**
```typescript
// 1 column mobile → 2 tablet → 3 desktop → 4 large screen
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>
```

**Show/Hide at Breakpoints:**
```typescript
// Hide on mobile, show on desktop
<div className="hidden lg:block">Desktop Navigation</div>

// Show on mobile, hide on desktop
<div className="block lg:hidden">Mobile Menu</div>
```

### 4. Accessibility Checklist
- ✅ Semantic HTML elements
- ✅ ARIA labels and roles
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Focus visible states
- ✅ Color contrast ratios (4.5:1 minimum)
- ✅ Screen reader tested
- ✅ Skip navigation links

### 5. Performance Optimization
```typescript
// Lazy load heavy components
const BlogPost = lazy(() => import('./BlogPost'));

// Memoize expensive computations
const filteredPosts = useMemo(
  () => posts.filter(/* ... */),
  [posts, filters]
);

// Optimize re-renders
export const BlogCard = memo(BlogCardComponent);
```

## Storybook Documentation

Each component should have a Storybook story:

```typescript
// BlogCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { BlogCard } from './BlogCard';

const meta: Meta<typeof BlogCard> = {
  title: 'Features/Blog/BlogCard',
  component: BlogCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BlogCard>;

export const Default: Story = {
  args: {
    post: {
      title: 'Getting Started with QA AI',
      excerpt: 'Learn how to...',
      // ...
    },
  },
};
```
