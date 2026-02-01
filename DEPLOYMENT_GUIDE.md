# GitHub Pages Deployment Guide

## Overview
This portfolio is deployed using GitHub Pages. The site should be accessible at:
**https://karthik77-kk.github.io/karthikm-resume/**

## Deployment Configuration

### Automatic Deployment
The repository is configured to deploy automatically when changes are pushed to the `main` branch using the GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

### Manual Configuration Steps

If the site is not deploying, follow these steps to configure GitHub Pages:

1. **Go to Repository Settings**
   - Navigate to https://github.com/Karthik77-kk/karthikm-resume/settings/pages

2. **Configure Source**
   - Under "Build and deployment"
   - Source: Select "GitHub Actions"
   - This will use the workflow file `.github/workflows/deploy.yml`

3. **Alternative: Deploy from Branch**
   - If you prefer branch-based deployment:
   - Source: Select "Deploy from a branch"
   - Branch: Select `main` and `/ (root)`
   - Click "Save"

4. **Wait for Deployment**
   - The deployment typically takes 1-2 minutes
   - Check the Actions tab for deployment status
   - Visit the site URL after deployment completes

## Verifying Deployment

### Check Deployment Status
1. Go to: https://github.com/Karthik77-kk/karthikm-resume/actions
2. Look for the latest "Deploy to GitHub Pages" workflow run
3. Ensure it shows a green checkmark (✓)
4. Click on the workflow run to see details

### Test the Live Site
1. Visit: https://karthik77-kk.github.io/karthikm-resume/
2. Check that the page loads correctly
3. Open browser console (F12) and check for errors
4. Verify all features are working:
   - GitHub Stats Widget
   - Social Share Buttons
   - Open to Work Badge
   - Copy Email Button
   - Visitor Counter
   - Mobile responsiveness

## Troubleshooting

### Issue: Site shows 404 error

**Solution:**
1. Verify GitHub Pages is enabled in repository settings
2. Ensure the source is set to "GitHub Actions" or "main branch / root"
3. Check that `index.html` exists in the root directory
4. Wait a few minutes for DNS propagation

### Issue: Site loads but features don't work

**Solution:**
1. Open browser console (F12) and check for JavaScript errors
2. Verify that asset paths are correct:
   - `assets/css/new-features.css`
   - `assets/js/utils.js`
   - `assets/js/portfolio.js`
3. Check that all files are committed and pushed to `main` branch
4. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Styles not loading

**Solution:**
1. Check that CSS file exists: `assets/css/new-features.css`
2. Verify the CSS link in `index.html`:
   ```html
   <link rel="stylesheet" href="assets/css/new-features.css">
   ```
3. Ensure file paths use relative URLs (no leading slash for GitHub Pages)
4. Check browser Network tab (F12) for failed requests

### Issue: GitHub Actions workflow failing

**Solution:**
1. Check Actions tab for error messages
2. Verify workflow file syntax: `.github/workflows/deploy.yml`
3. Ensure repository has Pages enabled
4. Check that required permissions are granted:
   - Settings → Actions → General → Workflow permissions
   - Select "Read and write permissions"

### Issue: Deployment succeeds but changes don't appear

**Solution:**
1. Clear browser cache completely
2. Try incognito/private browsing mode
3. Check that changes are actually on the `main` branch:
   ```bash
   git log origin/main --oneline -5
   ```
4. Verify the correct commit was deployed in Actions tab

## Testing Locally

To test the site locally before deploying:

### Option 1: Python HTTP Server
```bash
cd /path/to/karthikm-resume
python -m http.server 8000
# Visit http://localhost:8000
```

### Option 2: Node.js HTTP Server
```bash
npx http-server -p 8000
# Visit http://localhost:8000
```

### Option 3: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## File Structure

```
karthikm-resume/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── assets/
│   ├── css/
│   │   └── new-features.css    # Main styles
│   └── js/
│       ├── utils.js            # Utility functions
│       └── portfolio.js        # Feature implementations
├── index.html                  # Main page
├── .nojekyll                   # Prevents Jekyll processing
├── robots.txt                  # SEO configuration
├── sitemap.xml                 # Site structure
├── manifest.json               # PWA manifest
└── service-worker.js           # Offline support
```

## Deployment Checklist

Before deploying changes:

- [ ] Test locally to ensure everything works
- [ ] Check browser console for JavaScript errors
- [ ] Verify all assets load correctly
- [ ] Test on mobile device or responsive mode
- [ ] Commit all changes to git
- [ ] Push to `main` branch
- [ ] Monitor Actions tab for deployment status
- [ ] Test live site after deployment
- [ ] Check different browsers (Chrome, Firefox, Safari)

## Support

If issues persist:
1. Check GitHub Status: https://www.githubstatus.com/
2. Review GitHub Pages documentation: https://docs.github.com/en/pages
3. Check repository Issues tab for similar problems
4. Verify all files are properly committed and pushed

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Troubleshooting GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)
