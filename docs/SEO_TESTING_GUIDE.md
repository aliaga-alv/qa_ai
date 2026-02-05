# SEO Testing Guide

## Automated Testing Tools Installed

Run these commands to test SEO and accessibility:

```bash
# Install testing tools
npm install -D lighthouse lighthouserc @axe-core/react

# Run Lighthouse audit (after starting dev server)
npm run lighthouse

# Run Lighthouse CI (automated testing)
npm run lighthouse:ci
```

## Manual Testing Checklist

### 1. **Meta Tags Validation**
- Open browser DevTools → Elements → `<head>` section
- Verify all meta tags are present and correct
- Check that page titles change when navigating routes

### 2. **Social Media Preview**
Use these tools to test Open Graph and Twitter Cards:
- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/

### 3. **Structured Data**
- Visit: https://search.google.com/test/rich-results
- Paste your deployed URL
- Verify JSON-LD markup is valid

### 4. **Sitemap & Robots.txt**
After deployment, verify:
- `https://your-domain.com/sitemap.xml` loads correctly
- `https://your-domain.com/robots.txt` loads correctly
- Update `sitemap.xml` dates when content changes

### 5. **Lighthouse Audit**
Run in Chrome DevTools:
1. Open DevTools (F12)
2. Navigate to "Lighthouse" tab
3. Check all categories
4. Generate report
5. Aim for scores: Performance 90+, Accessibility 90+, SEO 90+

## Accessibility Testing

### Browser Extensions
1. **axe DevTools** - https://www.deque.com/axe/devtools/
2. **WAVE** - https://wave.webaim.org/extension/
3. **Lighthouse** (built into Chrome DevTools)

### Keyboard Navigation Test
- [ ] Press `Tab` to navigate through all interactive elements
- [ ] Verify visible focus indicators
- [ ] Test `Enter` and `Space` on buttons
- [ ] Test `Esc` to close modals/dropdowns
- [ ] Ensure no keyboard traps

### Screen Reader Test (macOS)
1. Enable VoiceOver: `Cmd + F5`
2. Navigate with `Ctrl + Option + Arrow Keys`
3. Verify all interactive elements are announced
4. Check form labels and error messages

### Color Contrast
- Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Minimum ratio: 4.5:1 for normal text, 3:1 for large text

### Responsive Testing
- [ ] Test on mobile (320px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1024px+ width)
- [ ] Zoom to 200% (text should remain readable)

## SEO Best Practices Implemented

✅ **Technical SEO**
- Semantic HTML5 structure
- Proper heading hierarchy (h1 → h6)
- Descriptive meta tags
- Canonical URLs
- XML sitemap
- robots.txt
- Favicon set

✅ **On-Page SEO**
- Unique page titles
- Unique meta descriptions
- Keyword optimization
- Alt text for images
- Internal linking

✅ **Social SEO**
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- Social sharing images

✅ **Structured Data**
- JSON-LD schema
- SoftwareApplication schema
- Organization schema (in index.html)

## Performance Optimization

**Already Implemented:**
- Code splitting (Vite)
- Lazy loading routes
- Image optimization
- CSS purging (Tailwind)

**Recommended Additions:**
```bash
# Install PWA support
npm install -D vite-plugin-pwa

# Install image optimization
npm install -D vite-plugin-image-optimizer
```

## Monitoring & Analytics

**After Deployment:**
1. Set up Google Search Console
2. Submit sitemap.xml
3. Monitor Core Web Vitals
4. Track 404 errors
5. Monitor mobile usability

## Common Issues to Check

- [ ] All images have alt attributes
- [ ] No duplicate h1 tags per page
- [ ] All links have descriptive text (avoid "click here")
- [ ] Forms have proper labels
- [ ] Error messages are clear and helpful
- [ ] Loading states are accessible
- [ ] Dark mode has sufficient contrast

## Update Instructions

### When Adding New Pages:
1. Add route to `src/constants/seo.ts` → `PAGE_SEO`
2. Import `SEO` component in page
3. Add `<SEO {...PAGE_SEO.yourPage} />` at top of component
4. Update `public/sitemap.xml` with new URL

### When Deploying:
1. Update all URLs in `index.html` from localhost to production
2. Update `src/constants/seo.ts` → `SEO_CONFIG.siteUrl`
3. Regenerate sitemap with new lastmod dates
4. Submit sitemap to Google Search Console
