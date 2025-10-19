# BearBang Quick Start

## 5-Minute Setup

### 1. Add Assets (3 files required)
```
public/
├── audio/repeat_bang.mp3     ← Your loud sound file
├── images/bear logo.png      ← Header logo
└── icons/bear icon.png       ← 512x512 app icon
```

### 2. Upload Audio to GitHub
- Create public repo
- Upload `repeat_bang.mp3`
- Click file → "Raw" → copy URL

### 3. Update URLs (2 places)

**`/src/main.ts` line 3:**
```typescript
const REAL_AUDIO_URL = "https://raw.githubusercontent.com/USER/REPO/main/repeat_bang.mp3";
```

**`/public/service-worker.js` line 5:**
```javascript
const REAL_AUDIO = "https://raw.githubusercontent.com/USER/REPO/main/repeat_bang.mp3";
```

### 4. Build & Deploy
```bash
npm install
npm run build
```

Deploy `/dist` folder to:
- Netlify: https://app.netlify.com/drop (drag & drop)
- Vercel: https://vercel.com/new
- GitHub Pages: Enable in repo settings

### 5. Test
1. Open deployed site
2. Wait for "Ready for offline use" toast
3. Install as PWA ("Add to Home Screen")
4. Test offline mode in DevTools

## Done!

See `SETUP.md` for detailed instructions and `DEPLOYMENT.md` for deployment options.

## Features
- Works offline after first load
- Gapless audio looping
- Screen wake lock (no sleep)
- Volume persistence
- iOS & Android compatible
