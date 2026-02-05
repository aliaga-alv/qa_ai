# Quick Start: Testing SEO & Accessibility

## 🚀 Instant Testing (No Installation Required)

### 1. **Start Dev Server**
```bash
npm run dev
```

### 2. **Check Browser Console**
Open DevTools (F12) and look for the accessibility report - it runs automatically!

### 3. **Test Meta Tags**
- Navigate to different pages
- Inspect `<head>` in DevTools
- Verify title and description change per route

---

## 🎯 5-Minute Test Plan

### Test 1: Meta Tags (2 min)
1. Start dev server: `npm run dev`
2. Open http://localhost:5173
3. Right-click → Inspect → Elements → `<head>`
4. Verify these exist:
   - ✅ `<title>` is descriptive
   - ✅ `<meta name="description">`
   - ✅ `<meta property="og:title">`
   - ✅ `<meta name="twitter:card">`
5. Navigate to `/pricing` - verify title changes

### Test 2: Accessibility (2 min)
1. With dev server running, check browser console
2. Look for "🔍 Accessibility Report"
3. Fix any ❌ errors shown
4. Press `Tab` key repeatedly - verify:
   - ✅ All interactive elements are reachable
   - ✅ Focus indicators are visible
   - ✅ No keyboard traps

### Test 3: Files Exist (1 min)
1. Visit http://localhost:5173/robots.txt
2. Visit http://localhost:5173/sitemap.xml
3. Both should display without 404

---

## 🔧 Browser Tools (Built-in)

### Chrome DevTools Lighthouse
1. Open DevTools (F12)
2. Click "Lighthouse" tab
3. Select: ✅ Performance, ✅ Accessibility, ✅ SEO
4. Click "Analyze page load"
5. **Target Scores:**
   - Performance: 90+
   - Accessibility: 90+
   - SEO: 100

### Keyboard Navigation Test
```bash
# Test these keys:
Tab       → Move forward through elements
Shift+Tab → Move backward through elements
Enter     → Activate buttons/links
Space     → Activate buttons/checkboxes
Esc       → Close modals
Arrow Keys→ Navigate dropdowns/radio buttons
```

### Screen Reader Test (macOS)
```bash
# Enable VoiceOver
Cmd + F5

# Navigate
Ctrl + Option + Arrow Keys

# Verify:
- ✅ All text is read aloud
- ✅ Buttons announce their purpose
- ✅ Form fields announce labels
- ✅ Images announce alt text
```

---

## 🌐 Online Testing Tools (Free)

### Social Media Previews
Test how your pages appear when shared:

1. **Facebook Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Paste: `http://localhost:5173` (after ngrok/deployment)
   
2. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Paste your deployed URL

3. **LinkedIn Inspector**
   - URL: https://www.linkedin.com/post-inspector/
   - Paste your deployed URL

### Structured Data Test
1. Deploy your site first
2. Visit: https://search.google.com/test/rich-results
3. Enter your URL
4. Verify JSON-LD markup validates

### Mobile-Friendly Test
1. Visit: https://search.google.com/test/mobile-friendly
2. Enter your deployed URL
3. Verify mobile-friendliness

---

## 📊 What to Check

### ✅ SEO Checklist
- [ ] Page title changes per route
- [ ] Each page has unique description
- [ ] `/robots.txt` is accessible
- [ ] `/sitemap.xml` is accessible
- [ ] All images have alt attributes
- [ ] Headings follow hierarchy (h1 → h2 → h3)
- [ ] Only one h1 per page
- [ ] Links have descriptive text (no "click here")

### ✅ Accessibility Checklist
- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] Color contrast is sufficient (4.5:1 minimum)
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators are visible
- [ ] No positive tabindex values
- [ ] Screen reader can navigate entire page
- [ ] Works at 200% zoom

### ✅ Performance Checklist
- [ ] Lighthouse Performance: 90+
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] No console errors
- [ ] Images optimized
- [ ] Code splitting working (check Network tab)

---

## 🐛 Common Issues & Fixes

### Issue: Console shows "Image missing alt attribute"
**Fix:** Add alt text to image:
```tsx
<img src="/logo.png" alt="QA AI Logo" />
```

### Issue: Console shows "Link has no accessible text"
**Fix:** Add text or aria-label:
```tsx
<a href="/home" aria-label="Home">
  <HomeIcon />
</a>
```

### Issue: Console shows "Multiple h1 tags"
**Fix:** Use only one h1 per page, use h2-h6 for subheadings

### Issue: Meta tags not updating
**Fix:** Check SEO component is imported:
```tsx
import SEO from '@/components/common/SEO';
import { PAGE_SEO } from '@/constants';

export default function MyPage() {
  return (
    <>
      <SEO {...PAGE_SEO.myPage} />
      {/* content */}
    </>
  );
}
```

---

## 🎨 Testing Tips

### Test Dark Mode
```tsx
// Toggle dark mode and retest:
1. Click theme switcher
2. Verify color contrast is still good
3. Check all text is readable
```

### Test Responsive Design
```tsx
// In DevTools:
Cmd + Shift + M (toggle device toolbar)

Test these widths:
- 320px (Mobile)
- 768px (Tablet)  
- 1024px (Desktop)
- 1920px (Large Desktop)
```

### Test Social Sharing
```tsx
// Create temporary public URL:
npm install -g ngrok
ngrok http 5173

// Use ngrok URL in social media validators
```

---

## 📈 Expected Results

After following this guide:

✅ **Browser Console:** 
- Accessibility report shows 0 errors
- May show warnings (fix high-priority ones first)

✅ **Lighthouse Scores:**
- Performance: 90+
- Accessibility: 95+
- SEO: 100

✅ **Manual Tests:**
- All pages keyboard navigable
- Screen reader reads everything correctly
- Social previews look professional
- Mobile experience is smooth

---

## 🚨 Priority Fixes

Fix these FIRST if found:

1. **Missing alt text on images** (WCAG A - Critical)
2. **Form inputs without labels** (WCAG A - Critical)
3. **Color contrast < 4.5:1** (WCAG AA - Important)
4. **Missing page titles** (SEO - Critical)
5. **Keyboard traps** (WCAG A - Critical)

---

## 📚 More Resources

- [Full Testing Guide](docs/SEO_TESTING_GUIDE.md)
- [Implementation Details](SEO_IMPLEMENTATION.md)
- [SEO Examples](src/components/common/SEO.examples.tsx)

---

## ✨ Pro Tips

1. **Test early and often** - Run accessibility checker in dev mode
2. **Test with real users** - Ask someone to use screen reader
3. **Test on real devices** - Emulators don't catch everything
4. **Monitor after launch** - Use Google Search Console
5. **Keep learning** - WCAG guidelines evolve

Happy testing! 🎉
