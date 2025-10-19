# BearBang Setup Guide

## Overview
BearBang is a production-ready Progressive Web App designed to deter bears in the mountains by continuously looping a loud sound. It works completely offline once cached.

## Required Assets

Before deploying, you need to provide three assets:

### 1. Audio File
- **Location**: `/public/audio/repeat_bang.mp3`
- **Requirements**:
  - Loud firecracker or metallic sound
  - MP3 format
  - Any duration (will loop seamlessly)
  - High quality recommended

### 2. Header Logo
- **Location**: `/public/images/bear logo.png`
- **Requirements**:
  - Filename must have a space: "bear logo.png"
  - Wide format suitable for header
  - PNG format (transparent background preferred)
  - Appears in app header and splash screen

### 3. App Icon
- **Location**: `/public/icons/bear icon.png`
- **Requirements**:
  - Filename must have a space: "bear icon.png"
  - 512x512 pixels minimum
  - PNG format
  - Used as PWA home screen icon

## Configuration

### Update Audio URLs

You need to update the remote audio URL in TWO files:

#### 1. `/src/main.ts` (line 3)
```typescript
const REAL_AUDIO_URL = "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/repeat_bang.mp3";
```

#### 2. `/public/service-worker.js` (line 5)
```javascript
const REAL_AUDIO = "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/repeat_bang.mp3";
```

Replace `YOUR_USERNAME`, `YOUR_REPO`, and `main` with your actual GitHub repository details where you've uploaded the audio file.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will be available at http://localhost:5173

**Note**: Service Worker will not function in development mode. Use preview mode to test offline functionality.

## Building for Production

```bash
npm run build
```

This will:
1. Type-check with TypeScript
2. Build optimized bundles
3. Output to `/dist` directory

## Testing Offline Functionality

After building:

```bash
npm run preview
```

Then:
1. Open the app in your browser
2. Wait for "Ready for offline use" toast
3. Open DevTools > Application > Service Workers
4. Check "Offline" mode
5. Refresh - the app should still work

## PWA Installation

Once deployed:

### On Mobile (iOS/Android)
1. Open the app in Safari (iOS) or Chrome (Android)
2. Tap the share button
3. Select "Add to Home Screen"
4. The app will install with your bear icon

### On Desktop (Chrome/Edge)
1. Open the app
2. Click the install icon in the address bar
3. Confirm installation

## Features

- **Offline-First**: Works completely offline after first load
- **Gapless Looping**: Continuous sound with no gaps
- **Wake Lock**: Prevents screen from sleeping during playback
- **Volume Control**: Adjustable volume with persistence
- **iOS Compatible**: Works on iOS with proper audio resumption
- **Responsive**: Works on all screen sizes

## File Structure

```
bearbang/
├── public/
│   ├── audio/
│   │   └── repeat_bang.mp3          # Your audio file
│   ├── icons/
│   │   └── bear icon.png            # 512x512 app icon
│   ├── images/
│   │   └── bear logo.png            # Header logo
│   ├── manifest.webmanifest         # PWA manifest
│   └── service-worker.js            # Offline caching
├── src/
│   ├── main.ts                      # App logic
│   └── style.css                    # Styling
├── index.html                       # HTML shell
└── package.json                     # Dependencies
```

## Deployment

Deploy the `/dist` folder to any static hosting service:

- **Netlify**: Drop the dist folder or connect to GitHub
- **Vercel**: Import your repository
- **GitHub Pages**: Enable in repository settings
- **Firebase Hosting**: `firebase deploy`

### Important for PWA
Make sure your hosting serves:
- `manifest.webmanifest` with correct MIME type (`application/manifest+json`)
- `service-worker.js` from the root path
- HTTPS (required for service workers)

## Troubleshooting

### Service Worker Not Registering
- Ensure you're on HTTPS (or localhost)
- Check browser console for errors
- Clear browser cache and reload

### Audio Not Playing on iOS
- iOS requires user interaction before playing audio
- The first tap on any button will initialize the audio context
- Make sure audio files are in supported formats (MP3 works)

### Offline Mode Not Working
- Verify service worker registered successfully
- Check cache storage in DevTools
- Ensure all assets have correct paths
- Remote audio URL must be accessible and CORS-enabled

### Volume Not Persisting
- Check localStorage is enabled in browser
- Look for "bb_vol" key in DevTools > Application > Local Storage

## Safety Notes

Include these warnings for users:
- Protect your hearing - don't use at maximum volume for extended periods
- Respect wildlife and use responsibly
- Check local regulations regarding wildlife deterrent devices
- Keep device charged or connected to power for extended use

## License

Use responsibly and in accordance with local wildlife protection laws.
