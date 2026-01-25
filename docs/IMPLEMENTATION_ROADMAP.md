# Implementation Roadmap

## ⚠️ CRITICAL: TypeScript Validation

**After EVERY implementation step, run:**
```bash
npm run build
```

**Build must succeed with 0 errors before proceeding to next step.**

### Common TypeScript Issues:

1. **Type imports (verbatimModuleSyntax enabled):**
   ```typescript
   // Use 'type' keyword for type-only imports
   import type { User } from './types';
   import { type User, value } from './types';  // Mixed import
   ```

2. **Fast Refresh:** Don't mix components with exports in router files
   - Move components to separate files

3. **Method verification:** Check API before using (e.g., tokenStorage.setTokens vs setAccessToken)

---

## Phase 1: Project Setup & Foundation (Week 1)

### Step 1.1: Initialize Project
```bash
# Create Vite + React + TypeScript project
npm create vite@latest . -- --template react-ts

# Install core dependencies
npm install react-router-dom zustand @tanstack/react-query axios
npm install framer-motion date-fns

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Form & validation
npm install react-hook-form @hookform/resolvers zod

# Security
npm install dompurify
npm install -D @types/dompurify

# Image optimization
npm install -D vite-plugin-image-optimizer sharp

# Development tools
npm install -D @types/node
npm install -D eslint-plugin-react-hooks eslint-plugin-jsx-a11y
npm install -D prettier prettier-plugin-tailwindcss
```

### Step 1.2: Configure Base Files

**tailwind.config.js**
- Set up design tokens (colors, typography, spacing)
- Configure dark mode: `darkMode: 'class'`
- Add custom animations

**vite.config.ts**
- Configure path aliases (@/...)
- Set up build optimizations
- Add bundle splitting configuration
- Configure image optimization plugin

```typescript
// vite.config.ts example
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
    }),
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
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-state': ['zustand', '@tanstack/react-query', 'axios'],
        },
      },
    },
  },
});
```

**tsconfig.json**
- Enable strict mode
- Set up path mapping

### Step 1.3: Set Up Project Structure
Create folder structure as defined in ARCHITECTURE.md:
- `src/components/{ui, layout, features, common}`
- `src/pages`
- `src/hooks`
- `src/stores`
- `src/services/api`
- `src/lib`
- `src/types`
- `src/config`
- `src/styles`

### Step 1.4: Set Up Base Configuration

**src/lib/utils.ts** - Helper functions
**src/lib/api-error-handler.ts** - Centralized error handling
**src/lib/sanitize.ts** - Content sanitization utilities
**src/lib/token-storage.ts** - Secure token management
**src/config/env.ts** - Environment variables
**src/config/routes.ts** - Route constants
**src/styles/globals.css** - Global styles and CSS variables

---

## Phase 2: Core Infrastructure (Week 1-2)

### Step 2.1: Authentication Setup

**Create auth store** (`stores/authStore.ts`)
```typescript
- User state management
- Login/logout functions
- Token management with refresh logic
- Persist state to localStorage
- Token expiration handling
```

**Create auth service** (`services/api/auth.ts`)
```typescript
- login(credentials)
- register(data)
- logout()
- refreshToken()
- verifyEmail(token)
- resetPassword(email)
```

**Create auth hook** (`hooks/useAuth.ts`)
```typescript
- Combines store and service
- Provides convenient API for components
```

### Step 2.2: API Client Setup

**Create base client** (`services/api/client.ts`)
```typescript
- Axios instance with baseURL
- Request interceptor (add auth token)
- Response interceptor (handle 401, refresh token)
- Token refresh queue management (prevent duplicate refresh calls)
- Error normalization and handling
- CSRF token handling for state-changing requests
```

**Create error handler** (`lib/api-error-handler.ts`)
```typescript
- ApiError interface and normalization
- Error logging to monitoring service
- User-friendly error messages
```

### Step 2.3: Router Setup

**Create router** (`router.tsx`)
```typescript
- Public routes (home, pricing, blog)
- Auth routes (login, signup)
- Protected routes (dashboard)
- 404 Not Found
```

**Create ProtectedRoute component**
```typescript
- Check authentication
- Redirect to login if not authenticated
```

### Step 2.4: Theme System

**Create theme store** (`stores/themeStore.ts`)
```typescript
- Dark/light mode toggle
- Persist preference
```

**Create theme hook** (`hooks/useTheme.ts`)
```typescript
- Theme toggling
- System preference detection
```

---

## Phase 3: Layout Components (Week 2)

### Step 3.0: Create Common Components

**components/common/OptimizedImage.tsx**
```typescript
- Lazy loading support
- WebP/AVIF format support
- Loading skeleton
- Responsive image handling
```

**components/common/ErrorBoundary.tsx**
```typescript
- Catch React errors
- Fallback UI
- Error reporting
```

**components/common/LoadingSpinner.tsx**
**components/common/ErrorMessage.tsx**
**components/common/EmptyState.tsx**

### Step 3.1: Header Component
**components/layout/Header.tsx**
- Desktop navigation menu
- Mobile hamburger menu
- Theme toggle button
- Auth buttons (login/signup) or user menu
- Logo with home link
- Make sticky/transparent variants

### Step 3.2: Footer Component
**components/layout/Footer.tsx**
- Multi-column link sections
- Social media icons
- Newsletter signup form
- Copyright notice

### Step 3.3: Sidebar Component (for Dashboard)
**components/layout/Sidebar.tsx**
- Navigation links with icons
- Collapsible sections
- User profile section
- Logout button

### Step 3.4: Layout Wrappers
**components/layout/MainLayout.tsx**
- Header + Content + Footer

**components/layout/AuthLayout.tsx**
- Split screen design for auth pages

**components/layout/DashboardLayout.tsx**
- Sidebar + Header + Content

---

## Phase 4: Home Page (Week 3)

### Step 4.1: Hero Section
**components/features/home/Hero.tsx**
- Animated background (gradient, particles)
- Main headline with typing effect
- Subheadline
- CTA buttons
- Hero illustration/animation

### Step 4.2: Features Section
**components/features/home/Features.tsx**
- Grid of feature cards
- Icons (use lucide-react)
- Hover effects
- Intersection observer for animations

### Step 4.3: How It Works Section
**components/features/home/HowItWorks.tsx**
- Step-by-step process
- Visual connections between steps
- Animations on scroll

### Step 4.4: Testimonials Section
**components/features/home/Testimonials.tsx**
- Carousel implementation
- Auto-rotate
- Navigation controls

### Step 4.5: CTA Section
**components/features/home/CTASection.tsx**
- Final call-to-action
- Email signup or demo request

### Step 4.6: Assemble HomePage
**pages/HomePage.tsx**
- Combine all sections
- Add SEO meta tags

---

## Phase 5: Authentication Pages (Week 3-4)

### Step 5.1: Login Page
**components/features/auth/LoginForm.tsx**
- Form with validation
- Email and password fields
- Remember me checkbox
- Forgot password link
- Social login buttons

**pages/LoginPage.tsx**
- Auth layout wrapper
- Login form
- Link to signup

### Step 5.2: Signup Page
**components/features/auth/SignupForm.tsx**
- Multi-step form
- Progress indicator
- Validation on each step
- Terms acceptance

**pages/SignupPage.tsx**
- Auth layout wrapper
- Signup form
- Link to login

### Step 5.3: Password Reset Flow
**components/features/auth/PasswordReset.tsx**
- Request reset form (email input)
- New password form (from email link)

**pages/ResetPasswordPage.tsx**

### Step 5.4: Email Verification
**pages/VerifyEmailPage.tsx**
- Check token from URL
- Show success/error state

---

## Phase 6: Pricing Page (Week 4)

### Step 6.1: Pricing Cards
**components/features/pricing/PricingCard.tsx**
- Tier display
- Feature list
- Price toggle (monthly/annual)
- CTA button
- Highlight popular tier

### Step 6.2: Comparison Table
**components/features/pricing/PricingComparison.tsx**
- Detailed feature comparison
- Checkmarks/crosses
- Tooltips for details

### Step 6.3: FAQ Section
**components/features/pricing/PricingFAQ.tsx**
- Accordion for questions
- Common pricing questions

### Step 6.4: Assemble Pricing Page
**pages/PricingPage.tsx**
- Price toggle state
- Pricing cards grid
- Comparison table
- FAQ section
- SEO optimization

---

## Phase 7: Blog System (Week 5)

### Step 7.1: Blog API Service
**services/api/blog.ts**
```typescript
- fetchAll(filters)
- fetchBySlug(slug)
- fetchCategories()
- fetchTags()
```

### Step 7.2: Blog List Components
**components/features/blog/BlogCard.tsx**
- Preview card with image
- Metadata (author, date, read time)
- Excerpt
- Category badge

**components/features/blog/BlogFilters.tsx**
- Search input
- Category dropdown
- Tag filters
- Sort options

**pages/BlogListPage.tsx**
- Grid of blog cards
- Pagination or infinite scroll
- Filters sidebar

### Step 7.3: Blog Post Page
**components/features/blog/BlogPost.tsx**
- Hero image
- Title and metadata
- Table of contents
- Rich content (Markdown rendering)
- Share buttons
- Related posts

**pages/BlogPostPage.tsx**
- Fetch post by slug
- SEO meta tags (dynamic)
- Comments section (optional)

---

## Phase 8: Additional Pages (Week 5-6)

### Step 8.1: About Page
**pages/AboutPage.tsx**
- Company story
- Mission and values
- Team section
- Timeline/milestones

### Step 8.2: Contact Page
**pages/ContactPage.tsx**
- Contact form
- Office locations (if applicable)
- Support links

### Step 8.3: Legal Pages
**pages/TermsPage.tsx** - Terms of Service
**pages/PrivacyPage.tsx** - Privacy Policy

### Step 8.4: 404 Page
**pages/NotFoundPage.tsx**
- Friendly error message
- Illustration
- Link back to home

---

## Phase 9: Dashboard (Post-MVP) (Week 6-7)

### Step 9.1: Dashboard Home
**pages/dashboard/DashboardPage.tsx**
- Overview metrics
- Recent activity
- Quick actions

### Step 9.2: Dashboard Features
- Test management
- Analytics/reports
- Settings/profile
- Team management (if applicable)

---

## Phase 10: Polish & Optimization (Week 7-8)

### Step 10.1: Security Hardening

**Content Security Policy**
- Add CSP meta tags or server headers
- Test with different configurations
- Ensure external resources are whitelisted

**Content Sanitization**
- Implement DOMPurify for blog content
- Configure allowed tags and attributes
- Test with malicious inputs

**Input Validation**
- Review all forms for Zod validation
- Add sanitization for text inputs
- Test with edge cases and attacks

**Security Headers**
- Configure server headers (X-Frame-Options, etc.)
- Add to deployment configuration
- Test with security scanning tools

### Step 10.2: Animations & Micro-interactions
- Page transitions with Framer Motion
- Button hover effects
- Loading states
- Scroll-based animations

### Step 10.2: Animations & Micro-interactions
- Page transitions with Framer Motion
- Button hover effects
- Loading states
- Scroll-based animations

### Step 10.3: SEO Optimization
**components/common/SEO.tsx**
- Dynamic meta tags
- Open Graph tags
- Twitter cards
- Structured data (JSON-LD)

**Add to all pages:**
- Unique titles
- Meta descriptions
- Canonical URLs

### Step 10.3: Accessibility Audit
- Run Lighthouse audit
- Test with screen reader
- Keyboard navigation check
- Color contrast verification
- ARIA labels review

### Step 10.4: Accessibility Audit
- Run Lighthouse audit
- Test with screen reader
- Keyboard navigation check
- Color contrast verification
- ARIA labels review
- Test reduced motion preferences

### Step 10.5: Performance Optimization
- Lazy load routes
- Image optimization (WebP, lazy loading)
- Code splitting
- Bundle size analysis
- Lighthouse performance score > 90

### Step 10.5: Responsive Design Testing
- Mobile (320px - 767px)
- Tablet (768px - 1023px)
- Desktop (1024px+)
- Large screens (1440px+)

### Step 10.6: Error Handling
- Error boundaries on each route
- 404 handling
- API error handling
- Form validation errors
- Toast notifications

### Step 10.7: Loading States
- Skeleton screens
- Spinners
- Progress indicators
- Suspense fallbacks

---

## Phase 11: Testing (Week 8)

### Step 11.1: Unit Tests
- Component tests with Vitest + Testing Library
- Hook tests
- Utility function tests
- Aim for 70%+ coverage

### Step 11.2: Integration Tests
- User flow tests
- Form submission tests
- Authentication flows
- Navigation tests

### Step 11.3: E2E Tests (Optional)
- Critical user journeys with Playwright
- Login → Dashboard
- Signup flow
- Pricing → Checkout

---

## Phase 12: Deployment Preparation (Week 8)

### Step 12.1: Environment Setup
- Create .env.example
- Configure environment variables
- Set up staging environment

### Step 12.2: Build Optimization
- Configure Vite for production
- Enable gzip compression
- Optimize assets
- Test production build locally

### Step 12.3: CI/CD Setup
- GitHub Actions workflow
- Automated testing
- Deploy to hosting (Vercel/Netlify/etc.)

### Step 12.4: Monitoring & Analytics
- Google Analytics setup
- Error tracking (Sentry)
- Performance monitoring
- Core Web Vitals tracking

### Step 12.5: Security Review
- Run security audit
- Test XSS protection
- Verify CSP headers
- Check for exposed secrets
- Review authentication flows
- Test rate limiting

---

## Milestones & Checkpoints

### ✅ Milestone 1: Foundation Complete
- Project setup done
- Core infrastructure (auth, API, routing)
- Layout components ready
- **Deliverable**: Working skeleton with navigation

### ✅ Milestone 2: Public Pages Complete
- Home page live
- Pricing page functional
- Blog system operational
- All static pages done
- **Deliverable**: Full public-facing website

### ✅ Milestone 3: Authentication Complete
- Login/signup working
- Password reset functional
- Protected routes working
- **Deliverable**: User authentication system

### ✅ Milestone 4: MVP Launch
- All core pages complete
- Basic dashboard
- Tested and optimized
- **Deliverable**: Production-ready MVP

### ✅ Milestone 5: Post-Launch
- Advanced dashboard features
- Additional integrations
- User feedback implementation

---

## Development Best Practices

### Daily Workflow
1. Start dev server: `npm run dev`
2. Make changes
3. Test in browser (mobile + desktop)
4. Run linter: `npm run lint`
5. Type check: `npm run type-check`
6. Commit with descriptive messages

### Before Each Commit
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Tested responsive design
- [ ] Checked accessibility
- [ ] Verified dark mode

### Weekly Reviews
- [ ] Performance check (Lighthouse)
- [ ] Accessibility audit
- [ ] Code review patterns
- [ ] Update documentation
- [ ] Dependency updates

---

## Quick Start for Development

```bash
# 1. Clone and setup
git clone <repo>
cd qa_ai
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your settings

# 3. Start development
npm run dev

# 4. View in browser
# http://localhost:5173
```

---

## Recommended Development Order

**Week 1: Foundation**
- Day 1-2: Project setup, dependencies, configuration
- Day 3-4: Core infrastructure (auth, API, stores)
- Day 5-7: Layout components

**Week 2-3: Core Pages**
- Day 8-10: Home page components
- Day 11-12: Assemble and polish home page
- Day 13-15: Authentication pages
- Day 16-17: Pricing page

**Week 4-5: Content & Features**
- Day 18-21: Blog system
- Day 22-24: Additional pages (About, Contact, Legal)
- Day 25-26: Dashboard basics

**Week 6-8: Polish & Launch**
- Day 27-30: Animations and interactions
- Day 31-33: SEO and accessibility
- Day 34-36: Testing
- Day 37-40: Performance optimization
- Day 41-42: Deployment and monitoring

---

## Resources & References

### Documentation
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [Framer Motion](https://www.framer.com/motion)

### Design Inspiration
- [Awwwards](https://www.awwwards.com)
- [Dribbble](https://dribbble.com)
- [Behance](https://www.behance.net)

### Tools
- [Figma](https://www.figma.com) - Design mockups
- [Excalidraw](https://excalidraw.com) - Architecture diagrams
- [Can I Use](https://caniuse.com) - Browser compatibility
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance audit

---

## Success Criteria

### Technical
- ✅ TypeScript with no errors
- ✅ Lighthouse score: Performance 90+, Accessibility 95+, SEO 100
- ✅ Mobile responsive on all pages
- ✅ Dark mode fully functional
- ✅ Cross-browser compatible (Chrome, Firefox, Safari, Edge)

### User Experience
- ✅ Page load time < 2 seconds
- ✅ Smooth animations (60 fps)
- ✅ Clear call-to-actions
- ✅ Intuitive navigation
- ✅ Error states handled gracefully

### Code Quality
- ✅ Consistent code style
- ✅ Reusable components
- ✅ Proper TypeScript types
- ✅ Clean architecture patterns
- ✅ Documentation for complex logic

---

## Notes for AI Agents

When implementing this roadmap:

1. **Work incrementally** - Complete one phase before moving to the next
2. **Test frequently** - Check each component in isolation before integration
3. **Follow patterns** - Reference existing code for consistency
4. **Ask questions** - If requirements are unclear, ask before implementing
5. **Document decisions** - Add comments for complex logic
6. **Keep it simple** - Don't over-engineer, follow YAGNI principle
7. **Prioritize accessibility** - Build it in from the start
8. **Think mobile-first** - Start with mobile layout, then desktop

For detailed implementation guidance, always refer to:
- [AI_AGENT_GUIDE.md](./AI_AGENT_GUIDE.md) - Development patterns
- [COMPONENT_DESIGN.md](./COMPONENT_DESIGN.md) - Component specifications
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
