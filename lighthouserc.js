/**
 * Lighthouse CI Configuration
 * 
 * Tests SEO, Accessibility, Performance, and Best Practices
 * for all major pages in the QA AI application.
 * 
 * Usage:
 * npm run lighthouse        - Test all pages
 * npm run lighthouse:report - Generate detailed HTML report
 */

module.exports = {
  ci: {
    collect: {
      // Start a local server before testing
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 30000,
      
      // URLs to test
      url: [
        'http://localhost:4173/',                    // Home
        'http://localhost:4173/pricing',             // Pricing
        'http://localhost:4173/about',               // About
        'http://localhost:4173/security',            // Security
        'http://localhost:4173/documentation',       // Documentation
        'http://localhost:4173/blog',                // Blog
        'http://localhost:4173/contact',             // Contact
        'http://localhost:4173/careers',             // Careers
        'http://localhost:4173/changelog',           // Changelog
        'http://localhost:4173/integrations',        // Integrations
        'http://localhost:4173/login',               // Login
        'http://localhost:4173/register',            // Register
      ],
      
      // Number of runs per URL (higher = more reliable, but slower)
      numberOfRuns: 3,
      
      // Browser settings
      settings: {
        // Emulate mobile device
        emulatedFormFactor: 'desktop',
        
        // Lighthouse categories to run
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
    },
    
    assert: {
      // Minimum scores required (0-1 scale, where 1 = 100%)
      assertions: {
        'categories:performance': ['error', { minScore: 0.85 }],   // 85%
        'categories:accessibility': ['error', { minScore: 0.95 }], // 95%
        'categories:best-practices': ['error', { minScore: 0.90 }], // 90%
        'categories:seo': ['error', { minScore: 0.95 }],           // 95%
        
        // Specific SEO checks
        'document-title': 'error',
        'meta-description': 'error',
        'viewport': 'error',
        'robots-txt': 'warn',
        'canonical': 'warn',
        'structured-data': 'warn',
        
        // Accessibility checks
        'color-contrast': 'error',
        'label': 'error',
        'valid-lang': 'error',
        'image-alt': 'error',
        'heading-order': 'error',
        
        // Performance budgets
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],  // 2s
        'largest-contentful-paint': ['warn', { maxNumericValue: 3000 }], // 3s
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],      // 300ms
      },
    },
    
    upload: {
      // Generate HTML report
      target: 'filesystem',
      outputDir: './lighthouse-reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%.report.html',
    },
  },
};
