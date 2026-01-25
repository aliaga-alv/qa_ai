# Constants

Centralized application constants for consistent configuration across the codebase.

## Structure

```
constants/
├── index.ts              # Central export point
├── ui.ts                 # UI styling configurations
├── routes.ts             # Application route paths
├── date.ts               # Date format patterns and ranges
├── features.ts           # Feature definitions
├── documentation.ts      # Documentation sections
└── blog.ts               # Blog categories
```

## Usage

Always import from the centralized location:

```typescript
// ✅ CORRECT
import { ROUTES } from '@/constants/routes';
import { TEST_STATUS_COLORS, LOG_LEVEL_COLORS } from '@/constants/ui';
import { DATE_FORMAT_PATTERNS } from '@/constants/date';

// Or from central export
import { ROUTES, TEST_STATUS_COLORS } from '@/constants';

// ❌ WRONG - Don't embed in components
const ROUTES = { dashboard: '/dashboard' };
```

## Files

### ui.ts
UI styling configurations including:
- `STATUS_COLORS` - General status color mappings
- `TEST_STATUS_COLORS` - Test status colors
- `TEST_TYPE_COLORS` - Test type colors
- `ROLE_COLORS` - User role colors
- `LOG_LEVEL_COLORS` - Log level colors
- `ERROR_MESSAGE_VARIANT_STYLES` - Error message styling
- `AI_INSIGHTS_TYPE_CONFIG` - AI insights configurations
- `NOTIFICATION_TYPE_CONFIG` - Notification type colors
- `TEST_EXECUTION_STATUS_CONFIG` - Test execution status
- `HISTORY_STATUS_CONFIG` - History status configurations
- `TEAM_MEMBER_ROLE_CONFIG` - Team member role styling
- `TEST_LIST_STATUS_COLORS` - Test list status colors
- `TEST_LIST_TYPE_COLORS` - Test list type colors
- `SPINNER_SIZE_CLASSES` - Loading spinner sizes
- `SPINNER_VARIANT_CLASSES` - Loading spinner variants

### routes.ts
Application route paths:
- `ROUTES` - All application routes organized by section

### date.ts
Date-related constants:
- `DATE_FORMAT_PATTERNS` - Common date format strings
- `DATE_RANGE_PRESETS` - Predefined date range options
- `TIMEZONES` - Timezone configurations

### features.ts
Feature definitions:
- `SETTINGS_FEATURES` - Settings page features
- `CREATE_TEST_FEATURES` - Create test page features
- `EDIT_TEST_FEATURES` - Edit test page features

### documentation.ts
Documentation organization:
- `DOCUMENTATION_SECTIONS` - Documentation section structure

### blog.ts
Blog configuration:
- `BLOG_CATEGORIES` - Available blog categories

## Best Practices

### DO:
✅ Import constants from centralized files
✅ Use TypeScript `as const` for type safety
✅ Export from index.ts for convenience
✅ Group related constants together
✅ Use descriptive constant names in UPPER_CASE

### DON'T:
❌ Embed constants in components
❌ Duplicate constant definitions
❌ Use magic strings/numbers
❌ Create constants for one-time use values
❌ Mix constants with component logic

## Examples

### UI Configuration
```typescript
import { TEST_STATUS_COLORS, HISTORY_STATUS_CONFIG } from '@/constants/ui';

// Use in component
<span className={TEST_STATUS_COLORS[status]}>
  {status}
</span>

const config = HISTORY_STATUS_CONFIG[execution.status];
```

### Routes
```typescript
import { ROUTES } from '@/constants/routes';

navigate(ROUTES.dashboard.tests);
```

### Date Formatting
```typescript
import { DATE_FORMAT_PATTERNS } from '@/constants/date';
import { format } from 'date-fns';

format(new Date(), DATE_FORMAT_PATTERNS.FULL_DATE);
```

## When to Add New Constants

Add constants when you have:
- Values used in multiple places
- Configuration that might change
- Magic strings/numbers
- UI styling configurations
- Route paths
- Format patterns

Keep component-specific tiny configs (like icon mappings) in the component itself.
