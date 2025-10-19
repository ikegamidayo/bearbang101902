# BearBang Deployment Checklist

Use this checklist to ensure everything is ready before deployment.

## 📋 Pre-Deployment

### Assets (Required)
- [ ] **Audio file** added to `/public/audio/repeat_bang.mp3`
  - Format: MP3
  - Content: Loud firecracker/metallic sound
  - Duration: Any (will loop)

- [ ] **Header logo** added to `/public/images/bear logo.png`
  - Note: Filename has a space
  - Format: PNG (transparent background preferred)
  - Size: Any (will be scaled to 64px height)

- [ ] **App icon** added to `/public/icons/bear icon.png`
  - Note: Filename has a space
  - Format: PNG
  - Size: 512x512 pixels minimum

### GitHub Setup (Required)
- [ ] Created public GitHub repository
- [ ] Uploaded `repeat_bang.mp3` to repository
- [ ] Obtained raw file URL (click file → Raw button)
- [ ] URL format: `https://raw.githubusercontent.com/USER/REPO/BRANCH/repeat_bang.mp3`

### Code Updates (Required)
- [ ] Updated `/src/main.ts` line 3 with GitHub raw URL
  ```typescript
  const REAL_AUDIO_URL = "https://raw.githubusercontent.com/...";
  ```

- [ ] Updated `/public/service-worker.js` line 5 with same URL
  ```javascript
  const REAL_AUDIO = "https://raw.githubusercontent.com/...";
  ```

### Build & Test (Required)
- [ ] Ran `npm install` successfully
- [ ] Ran `npm run build` without errors
- [ ] Verified `/dist` folder created
- [ ] Tested with `npm run preview` in browser

## 🧪 Pre-Deploy Testing

### Local Testing
- [ ] Dev server runs: `npm run dev`
- [ ] No console errors in browser
- [ ] All 3 buttons visible and styled correctly
- [ ] Volume slider visible and functional
- [ ] Logo image displays (or shows broken image if not added yet)

### Production Testing
- [ ] Built successfully: `npm run build`
- [ ] Preview server runs: `npm run preview`
- [ ] Service worker registers (check console)
- [ ] "Ready for offline use" toast appears
- [ ] START button works (audio plays)
- [ ] STOP button works (audio stops)
- [ ] TEST button works (one-shot playback)
- [ ] Volume slider adjusts volume
- [ ] Volume persists after page reload

### Offline Testing
- [ ] Opened DevTools → Application → Service Workers
- [ ] Verified service worker status: "activated and running"
- [ ] Checked "Offline" mode in Service Workers panel
- [ ] Refreshed page - app still loads
- [ ] All buttons still functional offline
- [ ] Audio plays offline (if previously loaded)

## 🚀 Deployment

### Choose Hosting (Pick One)
- [ ] **Netlify** (recommended for beginners)
  - Drag & drop: https://app.netlify.com/drop
  - Or: GitHub integration

- [ ] **Vercel**
  - Import GitHub repo
  - Auto-detects settings

- [ ] **GitHub Pages**
  - Enable in repo settings
  - Deploy with gh-pages

- [ ] **Firebase Hosting**
  - Initialize project
  - Deploy with CLI

### Deploy Steps
- [ ] Uploaded `/dist` folder (or connected repo)
- [ ] Deployment successful
- [ ] Received deployment URL
- [ ] Site is accessible via HTTPS

## ✅ Post-Deployment Verification

### Basic Functionality
- [ ] Opened deployed URL in browser
- [ ] Page loads correctly
- [ ] Logo displays (or placeholder if not added)
- [ ] All buttons visible and styled
- [ ] No console errors

### PWA Functionality
- [ ] Service worker registers (check DevTools)
- [ ] "Ready for offline use" toast appears
- [ ] Cache storage populated (DevTools → Application → Cache Storage)
- [ ] All assets cached (check `bearbang-v1` cache)
- [ ] Install prompt appears (desktop) or available in menu

### Audio Functionality
- [ ] START button plays audio
- [ ] Audio loops continuously without gaps
- [ ] STOP button stops playback
- [ ] TEST button plays once
- [ ] Volume slider works
- [ ] Volume setting persists after reload

### Offline Mode
- [ ] Enabled offline mode in DevTools
- [ ] Refreshed page - still loads
- [ ] All functionality works offline
- [ ] Audio plays (if previously cached)

### Installation Testing

#### Desktop (Chrome/Edge)
- [ ] Install icon appears in address bar
- [ ] Clicked install → app installed
- [ ] App opens in standalone window (no browser UI)
- [ ] App icon correct (or generic if not provided)
- [ ] App functions normally

#### Mobile (iOS Safari)
- [ ] Opened site in Safari
- [ ] Tapped Share → "Add to Home Screen"
- [ ] App icon appears on home screen
- [ ] Tapped icon → opens fullscreen
- [ ] Yellow theme color visible
- [ ] Audio plays after first tap

#### Mobile (Android Chrome)
- [ ] Install banner appeared (or menu → "Install app")
- [ ] Installed to home screen
- [ ] App icon correct
- [ ] Opens fullscreen
- [ ] All features work

### Performance
- [ ] Page loads in < 2 seconds
- [ ] Service worker activates quickly
- [ ] Audio loads on first play (may take a moment)
- [ ] No lag when interacting with buttons
- [ ] Volume slider responsive

## 🎯 Optional Enhancements

### Documentation
- [ ] Updated README with deployment URL
- [ ] Added screenshot to README
- [ ] Documented any custom modifications
- [ ] Added user instructions

### Customization
- [ ] Customized colors (if desired)
- [ ] Modified button text/layout (if needed)
- [ ] Added additional features
- [ ] Updated safety warnings

### Monitoring
- [ ] Set up analytics (if desired)
- [ ] Monitor error logs
- [ ] Test on multiple devices
- [ ] Get user feedback

## 🐛 Troubleshooting Checklist

If something isn't working:

### Audio Issues
- [ ] Verified audio file format is MP3
- [ ] Checked GitHub raw URL is accessible
- [ ] Confirmed CORS not blocking request
- [ ] On iOS: tapped button first (required)
- [ ] Checked browser console for errors

### Offline Issues
- [ ] Service worker registered successfully
- [ ] Waited for "Ready for offline use" toast
- [ ] Checked cache storage populated
- [ ] HTTPS enabled (required for service workers)
- [ ] Cleared old cache if updating

### Installation Issues
- [ ] Site served over HTTPS
- [ ] manifest.webmanifest accessible
- [ ] Icons present (or will show generic)
- [ ] Manifest has no JSON errors

### Visual Issues
- [ ] Asset paths correct (with spaces encoded)
- [ ] Images in correct directories
- [ ] CSS loaded correctly
- [ ] JavaScript bundle loaded

## 📊 Success Criteria

Your deployment is successful when:

✅ Site loads over HTTPS
✅ Service worker registers and activates
✅ "Ready for offline use" toast appears
✅ All buttons functional
✅ Audio plays and loops correctly
✅ Works offline after first load
✅ Installable as PWA
✅ Opens fullscreen when installed

## 🎉 You're Done!

Once all checks pass, your BearBang PWA is production-ready!

### Next Steps
1. Share the URL with users
2. Provide installation instructions
3. Test on various devices
4. Monitor for any issues
5. Update as needed

### User Instructions Template

```
BearBang is ready! Here's how to use it:

1. Visit: [YOUR_DEPLOYMENT_URL]
2. Wait for "Ready for offline use" message
3. Install: Tap "Add to Home Screen" (mobile) or install icon (desktop)
4. Use: Tap START to begin looping, STOP to end, TEST to preview
5. Offline: Works without internet after first load

Safety: Use responsibly, protect your hearing, respect wildlife.
```

---

Need help? Check:
- [SETUP.md](SETUP.md) - Detailed instructions
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Technical details
