# Lighthouse Testing Guide

Automated SEO, Accessibility, Performance, and Best Practices testing using Lighthouse.

## 📦 Installation

Already installed! The following packages are configured:
- `@lhci/cli` - Lighthouse CI for automated testing
- `lighthouse` - Core Lighthouse engine
- `chrome-launcher` - Headless Chrome launcher

## 🚀 Quick Start

### Option 1: Simple Test (Recommended)

Test all pages with a clean summary:

```bash
# 1. Build the project
npm run build

# 2. Start preview server (in one terminal)
npm run preview

# 3. Run tests (in another terminal)
npm run lighthouse:simple
```

**Output:**
```
📊 Testing: Home (http://localhost:4173/)
   Performance:     92%
   Accessibility:   100%
   Best Practices:  95%
   SEO:             100%

📊 Summary:
════════════════════════════════════════════════════════════════
Page                Performance   Accessibility   Best Practices   SEO
────────────────────────────────────────────────────────────────
Home                92%           100%            95%              100%
Pricing             90%           100%            95%              100%
...
════════════════════════════════════════════════════════════════
✅ All tests passed! 🎉
```

### Option 2: Full Lighthouse CI

Comprehensive testing with assertions and budgets:

```bash
# 1. Build the project
npm run build

# 2. Run Lighthouse CI (auto-starts preview server)
npm run lighthouse
```

This will:
- Build your project
- Start the preview server automatically
- Test all configured pages
- Generate detailed HTML reports
- Check against performance budgets
- Fail if scores don't meet thresholds

### Option 3: One Command

```bash
npm run test:seo
```

Builds and runs simple Lighthouse tests automatically.

## 📊 What Gets Tested

### Pages Tested

- ✅ Home (`/`)
- ✅ Pricing (`/pricing`)
- ✅ About (`/about`)
- ✅ Security (`/security`)
- ✅ Documentation (`/documentation`)
- ✅ Blog (`/blog`)
- ✅ Contact (`/contact`)
- ✅ Careers (`/careers`)
- ✅ Changelog (`/changelog`)
- ✅ Integrations (`/integrations`)
- ✅ Login (`/login`)
- ✅ Register (`/register`)

### Categories

1. **Performance** (Target: 85%+)
   - First Contentful Paint < 2s
   - Largest Contentful Paint < 3s
   - Total Blocking Time < 300ms
   - Cumulative Layout Shift < 0.1

2. **Accessibility** (Target: 95%+)
   - Color contrast ratios (WCAG AA)
   - Form labels
   - Image alt text
   - Heading hierarchy
   - Valid HTML lang attribute

3. **Best Practices** (Target: 90%+)
   - HTTPS usage
   - No browser errors
   - Image aspect ratios
   - Proper doctype

4. **SEO** (Target: 95%+)
   - Document title
   - Meta description
   - Viewport meta tag
   - robots.txt
   - Canonical links
   - Structured data (JSON-LD)

## 📁 Reports

All reports are saved to `lighthouse-reports/` directory:

```
lighthouse-reports/
├── home-1738051200000.html
├── pricing-1738051210000.html
├── about-1738051220000.html
└── ...
```

Open any `.html` file in your browser to see detailed results with:
- Performance metrics
- Accessibility audit details
- SEO recommendations
- Best practice violations
- Opportunities for improvement

## ⚙️ Configuration

### Lighthouse CI Config (`lighthouserc.js`)

```javascript
module.exports = {
  ci: {
    collect: {
      // Add/remove URLs to test
      url: [
        'http://localhost:4173/',
        'http://localhost:4173/pricing',
        // ...
      ],
      
      // Runs per URL (3 = median of 3 tests)
      numberOfRuns: 3,
    },
    
    assert: {
      assertions: {
        // Minimum scores (0-1 scale)
        'categories:performance': ['error', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
  },
};
```

### Custom Test Script (`scripts/lighthouse-test.js`)

Edit the `PAGES` array to add/remove pages:

```javascript
const PAGES = [
  { name: 'Home', url: 'http://localhost:4173/' },
  { name: 'Custom Page', url: 'http://localhost:4173/custom' },
];
```

## 🎯 Score Thresholds

| Category | Minimum | Good | Excellent |
|----------|---------|------|-----------|
| Performance | 85% | 90% | 95%+ |
| Accessibility | 95% | 98% | 100% |
| Best Practices | 90% | 95% | 100% |
| SEO | 95% | 98% | 100% |

**Color Coding:**
- 🟢 Green (90-100%): Excellent
- 🟡 Yellow (70-89%): Needs improvement
- 🔴 Red (0-69%): Poor

## 🔧 Troubleshooting

### "Connection refused" error

Make sure the preview server is running:
```bash
npm run preview
```

### Tests timing out

Increase timeout in `lighthouserc.js`:
```javascript
startServerReadyTimeout: 60000, // 60 seconds
```

### Chrome launch errors

Install Chrome/Chromium if not installed:
```bash
# macOS
brew install --cask google-chrome

# Ubuntu
sudo apt-get install chromium-browser
```

### Low performance scores

- Clear browser cache
- Close other applications
- Run on a powerful machine
- Test production build, not dev server

## 📈 CI/CD Integration

### GitHub Actions

Create `.github/workflows/lighthouse.yml`:

```yaml
name: Lighthouse CI

on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run build
      - run: npm run lighthouse
      
      - name: Upload reports
        uses: actions/upload-artifact@v3
        with:
          name: lighthouse-reports
          path: lighthouse-reports/
```

### Netlify Deploy Preview

Add to `netlify.toml`:

```toml
[build]
  command = "npm run build"
  
[[plugins]]
  package = "@netlify/plugin-lighthouse"
  
  [plugins.inputs]
    min_score_accessibility = 0.95
    min_score_performance = 0.85
    min_score_seo = 0.95
```

## 📚 Best Practices

1. **Run before every deploy** - Catch regressions early
2. **Test on CI/CD** - Automate quality checks
3. **Review reports** - Don't just look at scores
4. **Track over time** - Monitor trends
5. **Fix accessibility first** - It's the easiest to score 100%
6. **Optimize images** - Biggest performance win
7. **Use code splitting** - Reduce bundle size

## 🎓 Learning Resources

- [Lighthouse Docs](https://developer.chrome.com/docs/lighthouse/)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🆘 Support

Issues? Check:
1. Server is running on correct port (4173)
2. Build is up-to-date (`npm run build`)
3. Chrome/Chromium is installed
4. No firewall blocking localhost

---

**Next Steps:**
1. Run `npm run test:seo` now
2. Review reports in `lighthouse-reports/`
3. Integrate into your CI/CD pipeline
