# BearBang Deployment Checklist

## Pre-Deployment Steps

### 1. Add Your Assets
- [ ] Place `repeat_bang.mp3` in `/public/audio/`
- [ ] Place `bear logo.png` in `/public/images/`
- [ ] Place `bear icon.png` in `/public/icons/`

### 2. Upload Audio to GitHub
- [ ] Create a public GitHub repository
- [ ] Upload `repeat_bang.mp3` to the repository
- [ ] Get the raw file URL (click file → Raw button → copy URL)
- [ ] Example: `https://raw.githubusercontent.com/username/repo/main/repeat_bang.mp3`

### 3. Update Audio URLs
Update the following two lines:

**File: `/src/main.ts` (line 3)**
```typescript
const REAL_AUDIO_URL = "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/repeat_bang.mp3";
```

**File: `/public/service-worker.js` (line 5)**
```javascript
const REAL_AUDIO = "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/repeat_bang.mp3";
```

### 4. Build
```bash
npm run build
```

Verify the build succeeds with no errors.

## Deployment Options

### Option 1: Netlify (Recommended - Easiest)

**Via Drag & Drop:**
1. Go to https://app.netlify.com/drop
2. Drag the `/dist` folder onto the page
3. Done! Your site is live

**Via GitHub:**
1. Push your code to GitHub
2. Go to https://app.netlify.com
3. Click "Add new site" → "Import an existing project"
4. Connect to your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 2: Vercel

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite settings
5. Click "Deploy"

### Option 3: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json` scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

3. Update `vite.config.ts` (create if doesn't exist):
   ```typescript
   import { defineConfig } from 'vite'

   export default defineConfig({
     base: '/your-repo-name/'
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages in repository settings → Pages → Source: gh-pages branch

### Option 4: Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login and initialize:
   ```bash
   firebase login
   firebase init hosting
   ```

3. Set public directory to `dist`

4. Deploy:
   ```bash
   npm run build
   firebase deploy
   ```

## Post-Deployment Verification

### Check PWA Functionality
1. Open your deployed site in Chrome
2. Open DevTools (F12)
3. Go to Application tab → Service Workers
4. Verify service worker is registered and activated
5. Go to Application tab → Cache Storage
6. Verify `bearbang-v1` cache exists with all assets

### Test Offline Mode
1. With the site open, check "Offline" in DevTools → Service Workers
2. Refresh the page
3. App should load and function normally
4. Try START/STOP/TEST buttons
5. Verify audio plays

### Test PWA Installation

**On Desktop (Chrome/Edge):**
1. Look for install icon in address bar
2. Click to install
3. App opens in standalone window
4. Verify icon and title are correct

**On Mobile (iOS Safari):**
1. Open site in Safari
2. Tap Share button
3. Tap "Add to Home Screen"
4. Verify icon appears on home screen
5. Open from home screen - should open fullscreen

**On Mobile (Android Chrome):**
1. Chrome will show install banner automatically
2. Or tap menu → "Install app"
3. Verify icon on home screen
4. Open - should be fullscreen

## Troubleshooting

### Service Worker Not Working
- **Cause**: Not served over HTTPS
- **Solution**: All modern hosts provide HTTPS automatically. If self-hosting, set up SSL certificate.

### Audio Not Loading
- **Cause**: GitHub raw URL incorrect or not CORS-enabled
- **Solution**:
  - Verify raw URL works in browser
  - GitHub raw URLs are CORS-enabled by default
  - Check browser console for CORS errors

### Assets Not Found (404)
- **Cause**: Incorrect file paths or names
- **Solution**:
  - Verify filenames match exactly (with spaces)
  - Check files are in correct directories
  - Paths are case-sensitive

### Cache Not Updating After Changes
- **Cause**: Old service worker still active
- **Solution**:
  1. Update `CACHE_NAME` in service-worker.js (e.g., `bearbang-v2`)
  2. Rebuild and redeploy
  3. Or: DevTools → Application → Service Workers → Unregister → Hard refresh

## Performance Optimization

### Recommended Netlify Settings
Add `_headers` file in `/public/`:
```
/*
  Cache-Control: public, max-age=31536000, immutable

/
  Cache-Control: no-cache

/service-worker.js
  Cache-Control: no-cache

/manifest.webmanifest
  Cache-Control: no-cache
```

### Recommended Response Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## Updates & Versioning

When you update the app:

1. Update `CACHE_NAME` in `/public/service-worker.js`
   ```javascript
   const CACHE_NAME = "bearbang-v2"; // increment version
   ```

2. Update version in `/package.json`

3. Rebuild and redeploy
   ```bash
   npm run build
   ```

4. Users will automatically get the update when they next visit

## Support & Monitoring

### Check Service Worker Status
Users can check if offline mode is ready:
- Look for "Ready for offline use" toast message
- Check if START button works without network

### User Instructions
Provide users with:
1. URL to your deployed app
2. Instructions to "Add to Home Screen"
3. Reminder to wait for offline ready toast before going offline
4. Safety warnings about volume and wildlife

## Security Notes

- Audio file on GitHub is public - don't include sensitive content
- No authentication required - app is standalone
- No backend/database - all data stored locally
- Service worker caches are domain-specific
