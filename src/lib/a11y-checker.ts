/**
 * Accessibility Testing Utilities
 * Run these checks in development to identify common accessibility issues
 */

export interface A11yIssue {
  type: 'error' | 'warning';
  element: Element;
  message: string;
  wcagLevel: 'A' | 'AA' | 'AAA';
}

/**
 * Check for common accessibility issues in the DOM
 * Use this in development to catch issues early
 */
export function runA11yChecks(): A11yIssue[] {
  const issues: A11yIssue[] = [];

  // Check 1: Images without alt text
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    if (!img.hasAttribute('alt')) {
      issues.push({
        type: 'error',
        element: img,
        message: 'Image missing alt attribute',
        wcagLevel: 'A',
      });
    }
  });

  // Check 2: Links without accessible text
  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    const text = link.textContent?.trim() || '';
    const ariaLabel = link.getAttribute('aria-label');
    const title = link.getAttribute('title');

    if (!text && !ariaLabel && !title) {
      issues.push({
        type: 'error',
        element: link,
        message: 'Link has no accessible text',
        wcagLevel: 'A',
      });
    }
  });

  // Check 3: Buttons without accessible text
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => {
    const text = button.textContent?.trim() || '';
    const ariaLabel = button.getAttribute('aria-label');
    const title = button.getAttribute('title');

    if (!text && !ariaLabel && !title) {
      issues.push({
        type: 'error',
        element: button,
        message: 'Button has no accessible text',
        wcagLevel: 'A',
      });
    }
  });

  // Check 4: Form inputs without labels
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach((input) => {
    const id = input.getAttribute('id');
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledby = input.getAttribute('aria-labelledby');
    const hasLabel = id && document.querySelector(`label[for="${id}"]`);

    if (!hasLabel && !ariaLabel && !ariaLabelledby) {
      issues.push({
        type: 'error',
        element: input,
        message: 'Form input missing accessible label',
        wcagLevel: 'A',
      });
    }
  });

  // Check 5: Multiple h1 tags
  const h1Tags = document.querySelectorAll('h1');
  if (h1Tags.length > 1) {
    h1Tags.forEach((h1, index) => {
      if (index > 0) {
        issues.push({
          type: 'warning',
          element: h1,
          message: 'Multiple h1 tags found on page (SEO issue)',
          wcagLevel: 'A',
        });
      }
    });
  }

  // Check 6: Heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.charAt(1));
    if (previousLevel > 0 && level - previousLevel > 1) {
      issues.push({
        type: 'warning',
        element: heading,
        message: `Heading level skipped (${previousLevel} to ${level})`,
        wcagLevel: 'A',
      });
    }
    previousLevel = level;
  });

  // Check 7: Interactive elements with tabindex > 0
  const tabindexElements = document.querySelectorAll('[tabindex]');
  tabindexElements.forEach((element) => {
    const tabindex = parseInt(element.getAttribute('tabindex') || '0');
    if (tabindex > 0) {
      issues.push({
        type: 'warning',
        element,
        message: 'Positive tabindex can cause navigation issues',
        wcagLevel: 'A',
      });
    }
  });

  // Check 8: Color contrast (basic check)
  const elementsToCheck = document.querySelectorAll('p, span, a, button, li, td, th');
  elementsToCheck.forEach((element) => {
    const styles = window.getComputedStyle(element);
    const color = styles.color;
    const backgroundColor = styles.backgroundColor;

    // Only warn if both colors are set (basic check)
    if (
      color &&
      backgroundColor &&
      color !== 'rgba(0, 0, 0, 0)' &&
      backgroundColor !== 'rgba(0, 0, 0, 0)'
    ) {
      const contrast = calculateContrast(color, backgroundColor);
      if (contrast < 4.5) {
        issues.push({
          type: 'warning',
          element,
          message: `Low color contrast ratio: ${contrast.toFixed(2)} (minimum: 4.5)`,
          wcagLevel: 'AA',
        });
      }
    }
  });

  return issues;
}

/**
 * Calculate contrast ratio between two colors
 * Simplified version - for production use a proper library
 */
function calculateContrast(color1: string, color2: string): number {
  const rgb1 = parseRGB(color1);
  const rgb2 = parseRGB(color2);

  if (!rgb1 || !rgb2) return 21; // Max contrast to avoid false positives

  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

function parseRGB(color: string): [number, number, number] | null {
  const rgb = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!rgb) return null;
  return [parseInt(rgb[1]), parseInt(rgb[2]), parseInt(rgb[3])];
}

function getRelativeLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Log accessibility issues to console
 */
export function logA11yIssues(issues: A11yIssue[]): void {
  if (issues.length === 0) {
    console.log('%c✅ No accessibility issues found!', 'color: green; font-weight: bold;');
    return;
  }

  const errors = issues.filter((i) => i.type === 'error');
  const warnings = issues.filter((i) => i.type === 'warning');

  console.group(`🔍 Accessibility Report (${issues.length} issues)`);

  if (errors.length > 0) {
    console.group(`❌ Errors (${errors.length})`);
    errors.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.message} [WCAG ${issue.wcagLevel}]`, issue.element);
    });
    console.groupEnd();
  }

  if (warnings.length > 0) {
    console.group(`⚠️ Warnings (${warnings.length})`);
    warnings.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.message} [WCAG ${issue.wcagLevel}]`, issue.element);
    });
    console.groupEnd();
  }

  console.groupEnd();
}

/**
 * Run accessibility checks automatically in development
 */
export function enableA11yMonitoring(): void {
  if (import.meta.env.PROD) return;

  console.log(
    '%c🔍 Accessibility Checker Enabled',
    'color: #6366f1; font-weight: bold; font-size: 14px;'
  );

  // Run checks immediately if DOM is already loaded
  if (document.readyState === 'complete') {
    setTimeout(() => {
      const issues = runA11yChecks();
      logA11yIssues(issues);
    }, 1500);
  } else {
    // Wait for load if not ready
    window.addEventListener('load', () => {
      setTimeout(() => {
        const issues = runA11yChecks();
        logA11yIssues(issues);
      }, 1500);
    });
  }

  // Run checks on route changes (for SPAs)
  let lastPath = window.location.pathname;
  setInterval(() => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      console.log('%c🔄 Route changed, running accessibility check...', 'color: #6366f1;');
      setTimeout(() => {
        const issues = runA11yChecks();
        logA11yIssues(issues);
      }, 1500);
    }
  }, 500);
}
