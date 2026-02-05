# Deployment Guide - Netlify

This guide will help you deploy the QA AI application to Netlify.

## Prerequisites

- A [Netlify account](https://app.netlify.com/signup) (free tier is sufficient)
- Git repository pushed to GitHub (already done)

## Deployment Methods

### Method 1: Deploy via Netlify UI (Recommended for first deployment)

1. **Login to Netlify**
   - Go to [https://app.netlify.com](https://app.netlify.com)
   - Sign in with your GitHub account

2. **Import your project**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub repositories
   - Select the `qa_ai` repository

3. **Configure build settings**
   Netlify should auto-detect the settings from `netlify.toml`, but verify:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 (from `.nvmrc`)

4. **Environment Variables**
   Add these in Site settings → Build & deploy → Environment:
   ```
   VITE_API_BASE_URL=your-api-url
   VITE_APP_NAME=QA AI
   VITE_APP_VERSION=1.0.0
   ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete (~2-3 minutes)
   - Your site will be live at `https://random-name.netlify.app`

6. **Custom Domain (Optional)**
   - Go to Site settings → Domain management
   - Add your custom domain
   - Configure DNS settings as instructed

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Netlify in your project**
   ```bash
   cd /Users/ali/qa_ai
   netlify init
   ```
   
   Follow the prompts:
   - Create & configure a new site
   - Choose your team
   - Enter site name (or leave blank for random)
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Method 3: Deploy with drag & drop

1. Build locally:
   ```bash
   npm run build
   ```

2. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)

3. Drag and drop the `dist` folder

## Post-Deployment Configuration

### Set Environment Variables

In Netlify Dashboard → Site settings → Build & deploy → Environment:

```
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_APP_NAME=QA AI
VITE_APP_VERSION=1.0.0
```

### Enable Branch Deploys (Optional)

For preview deployments on pull requests:
- Site settings → Build & deploy → Continuous deployment
- Enable "Deploy previews"

### Configure Custom Domain

1. Site settings → Domain management → Add custom domain
2. Update DNS records with your domain provider:
   - Add A record or CNAME as instructed by Netlify
3. Enable HTTPS (automatic with Netlify)

### Enable Forms (if needed)

If using Netlify Forms for contact form:
1. Add `netlify` attribute to forms in ContactForm component
2. Enable form detection in Site settings

## Build Optimization

The project is already configured with:
- ✅ Asset caching (31536000s for `/assets/*`)
- ✅ Security headers (XSS, Frame, Content-Type)
- ✅ SPA routing redirects
- ✅ Gzip compression (automatic)

## Continuous Deployment

Netlify automatically deploys when you push to the main branch:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Netlify will:
1. Detect the push
2. Run `npm run build`
3. Deploy the `dist` folder
4. Invalidate CDN cache
5. Notify you when complete

## Troubleshooting

### Build fails
- Check build logs in Netlify dashboard
- Verify Node version is 18+
- Ensure all dependencies are in `package.json`

### 404 errors on routes
- Verify `_redirects` file exists in `public/`
- Check `netlify.toml` redirect rules

### Environment variables not working
- Ensure variables start with `VITE_`
- Redeploy after adding env vars
- Clear cache and redeploy

### Slow build times
- Use build plugins for caching
- Consider upgrading to Pro plan for faster builds

## Useful Commands

```bash
# Deploy to production
netlify deploy --prod

# Deploy preview
netlify deploy

# Open site in browser
netlify open:site

# View build logs
netlify logs

# Check site status
netlify status
```

## Resources

- [Netlify Documentation](https://docs.netlify.com)
- [Netlify CLI Documentation](https://cli.netlify.com)
- [Netlify Status](https://www.netlifystatus.com)

---

Your QA AI application is now deployed! 🚀

Site URL will be: `https://your-site-name.netlify.app`
