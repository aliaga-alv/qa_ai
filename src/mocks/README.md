# Mock Data

Centralized mock data for development and testing purposes.

## Structure

```
mocks/
├── index.ts              # Central export point
├── charts.ts             # Chart visualization data
├── tests.ts              # Test execution and test page data
├── stats.ts              # Dashboard and analytics statistics
├── billing.ts            # Payment methods, invoices, plans
├── security.ts           # Security sessions and logs
├── team.ts               # Team member data
├── integrations.ts       # Integration listings
├── about.ts              # Company values and team info
├── blog.ts               # Full blog post content
├── activity.ts           # Activity feed items
├── actions.ts            # Quick action items
└── notifications.ts      # Notification data
```

## Usage

Always import mock data from centralized files:

```typescript
// ✅ CORRECT - Import from mocks
import { mockTests, mockTestDetail } from '@/mocks';
import { mockDashboardStats } from '@/mocks/stats';
import { mockChartData } from '@/mocks/charts';

// Or from specific file
import { mockTeamMembers } from '@/mocks/team';

// ❌ WRONG - Don't embed in components
const mockData = [
  { id: '1', name: 'Test 1' },
  { id: '2', name: 'Test 2' },
];
```

## Files

### charts.ts

Visualization data for all charts:

- `mockTopTestsChartData` - Top tests performance
- `mockTestTrendChartData` - Test execution trends
- `mockTestDistributionChartData` - Test results distribution
- `mockDurationChartData` - Test duration data
- `mockReliabilityChartData` - Reliability metrics
- `mockCoverageChartData` - Code coverage data
- `mockFlakyTestsData` - Flaky test information
- `mockAnalyticsInsights` - AI-generated insights
- `mockTestDetailTrendData` - Individual test trends
- `mockAnalyticsTrendData` - Analytics page trends
- `mockPerformanceData` - Performance metrics

### tests.ts

Test-related mock data:

- `mockTests` - Test list data
- `mockTestDetail` - Detailed test information
- `mockTestRuns` - Test run history
- `mockTestsPageData` - Tests page data
- `mockHistoryExecutions` - Execution history
- `mockHistoryExecutionDetail` - Detailed execution info

### stats.ts

Statistical data:

- `mockDashboardStats` - Dashboard overview statistics
- `mockAnalyticsStats` - Analytics page statistics

### billing.ts

Billing and payment data:

- `mockPaymentMethod` - Payment method information
- `mockInvoices` - Invoice records
- `billingPlans` - Subscription plan options

### security.ts

Security-related data:

- `mockSessions` - Active user sessions
- `mockSecurityLogs` - Security audit logs

### team.ts

Team management data:

- `mockTeamMembers` - Team member information

### integrations.ts

Integration data:

- `integrations` - Available integrations
- `integrationCategories` - Integration categories

### about.ts

About page content:

- `companyValues` - Company values
- `teamMembers` - Team member profiles

### blog.ts

Blog content:

- `fullBlogPosts` - Complete blog post content with full text

### activity.ts

Activity feed data:

- `mockActivities` - Recent activity items

### actions.ts

Quick actions:

- `quickActions` - Quick action items

### notifications.ts

Notification data:

- `mockNotifications` - User notifications

## Best Practices

### DO:

✅ Import all mock data from `@/mocks`
✅ Use proper TypeScript types from `@/types/models`
✅ Keep mock data realistic and consistent
✅ Export from index.ts for convenience
✅ Organize by feature/domain

### DON'T:

❌ Embed mock arrays in components
❌ Create duplicate mock data
❌ Mix mock data with component logic
❌ Hardcode mock values inline
❌ Generate mock data in components

## Examples

### Using Chart Data

```typescript
import { mockTestTrendChartData } from '@/mocks/charts';

export default function TestTrendChart() {
  return (
    <LineChart data={mockTestTrendChartData}>
      {/* Chart implementation */}
    </LineChart>
  );
}
```

### Using Test Data

```typescript
import { mockTests, mockTestDetail } from '@/mocks';
import type { Test } from '@/types/models';

export default function TestsPage() {
  const [tests, setTests] = useState<Test[]>(mockTests);
  // Component implementation
}
```

### Using Statistics

```typescript
import { mockDashboardStats } from '@/mocks/stats';

export default function DashboardStats() {
  return (
    <div>
      {mockDashboardStats.map(stat => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
```

## When to Add Mock Data

Add mock data when:

- Building new features
- Testing components
- Demonstrating functionality
- Creating development data

## Replacing with Real Data

When connecting to a real API:

1. Keep the mock imports but commented
2. Replace with API calls in the same data structure
3. Ensure types match what API returns
4. Use mock data as fallback during errors/loading

```typescript
// Development
import { mockTests } from '@/mocks';
const [tests, setTests] = useState(mockTests);

// Production
// import { mockTests } from '@/mocks'; // Keep as reference
const [tests, setTests] = useState<Test[]>([]);
useEffect(() => {
  fetchTests()
    .then(setTests)
    .catch(() => setTests(mockTests)); // Fallback
}, []);
```

## Data Format

All mock data should match the TypeScript interfaces in `@/types/models`:

```typescript
import type { Test, TeamMember, Invoice } from '@/types/models';

// ✅ CORRECT - Properly typed
export const mockTests: Test[] = [{ id: '1', name: 'Test 1' /* ... */ }];

// ❌ WRONG - Untyped
export const mockTests = [{ id: '1', name: 'Test 1' }];
```
