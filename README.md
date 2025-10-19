# 🐻 BearBang

**Offline-first Progressive Web App for bear deterrence in the mountains**

![Version](https://img.shields.io/badge/version-1.0.0-yellow)
![PWA](https://img.shields.io/badge/PWA-ready-green)
![Offline](https://img.shields.io/badge/offline-first-blue)

## 🎯 Purpose

BearBang continuously loops loud sounds (firecracker/metallic) to deter bears while hiking or camping in the mountains. Works completely offline once cached.

## ⚡ Features

- 🔄 **Gapless audio looping** - Continuous sound with no interruptions
- 📴 **Offline-first** - Works without internet after first load
- 🔋 **Screen wake lock** - Prevents device from sleeping during playback
- 🔊 **Volume control** - Adjustable with persistence
- 📱 **PWA installable** - Add to home screen on any device
- 🎨 **High contrast UI** - Yellow & black theme for outdoor visibility
- 📲 **iOS & Android** - Compatible with all modern mobile devices

## 🚀 Quick Start

### 1. Add Your Assets (Required)
Place these 3 files in the project:

```
public/
├── audio/repeat_bang.mp3     ← Your loud sound file
├── images/bear logo.png      ← Header logo (any size)
└── icons/bear icon.png       ← App icon (512x512)
```

### 2. Configure Remote Audio
Upload `repeat_bang.mp3` to a public GitHub repository, then update:

**`/src/main.ts` (line 3):**
```typescript
const REAL_AUDIO_URL = "https://raw.githubusercontent.com/YOUR_USER/YOUR_REPO/main/repeat_bang.mp3";
```

**`/public/service-worker.js` (line 5):**
```javascript
const REAL_AUDIO = "https://raw.githubusercontent.com/YOUR_USER/YOUR_REPO/main/repeat_bang.mp3";
```

### 3. Install & Build
```bash
npm install
npm run build
```

### 4. Deploy
Deploy the `/dist` folder to any static host:

**Easiest: Netlify**
```
https://app.netlify.com/drop
```
Just drag the `/dist` folder!

**Other options:** Vercel, GitHub Pages, Firebase Hosting

See [`DEPLOYMENT.md`](DEPLOYMENT.md) for detailed deployment instructions.

## 📖 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment checklist & options
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete technical overview

## 🎮 Usage

1. **Open the app** (or install as PWA)
2. **Wait for "Ready for offline use"** toast message
3. **START** - Begin continuous looping
4. **STOP** - End playback
5. **TEST** - Play sound once
6. **VOL** - Adjust volume (persists)

## 🏗️ Tech Stack

- **Vite** - Build tool
- **TypeScript** - Type safety
- **Web Audio API** - Gapless audio looping
- **Service Worker** - Offline caching
- **Wake Lock API** - Screen management
- **PWA** - Installable, standalone app

## 📦 Bundle Size

- HTML: 1.39 KB (gzipped: 0.65 KB)
- JavaScript: 2.80 KB (gzipped: 1.28 KB)
- **Total:** ~4 KB (excluding assets)

## 🌐 Browser Support

| Browser | Version | PWA Install | Wake Lock |
|---------|---------|-------------|-----------|
| Chrome | 90+ | ✅ | ✅ |
| Safari | 14+ | ✅ | ❌ |
| Edge | 90+ | ✅ | ✅ |
| Firefox | 90+ | ❌ | ❌ |

*Wake Lock degrades gracefully on unsupported browsers*

## 📱 Installation

### iOS (Safari)
1. Open app in Safari
2. Tap Share button
3. "Add to Home Screen"

### Android (Chrome)
1. Open app in Chrome
2. Tap install banner
3. Or: Menu → "Install app"

### Desktop (Chrome/Edge)
1. Open app
2. Click install icon in address bar
3. Confirm installation

## 🔧 Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Note:** Service Worker only works in production/preview mode.

## 📂 Project Structure

```
bearbang/
├── public/
│   ├── audio/              ← Add repeat_bang.mp3 here
│   ├── images/             ← Add bear logo.png here
│   ├── icons/              ← Add bear icon.png here
│   ├── manifest.webmanifest
│   └── service-worker.js
├── src/
│   ├── main.ts            ← Core app logic
│   └── style.css          ← Styling
├── index.html             ← App shell
└── package.json
```

## 🧪 Testing Offline Mode

1. Build and preview: `npm run build && npm run preview`
2. Open DevTools → Application → Service Workers
3. Check "Offline" mode
4. Refresh page
5. App should work normally

## ⚠️ Safety Notes

- **Protect your hearing** - Don't use at max volume for extended periods
- **Respect wildlife** - Use responsibly and ethically
- **Check regulations** - Verify local laws on wildlife deterrent devices
- **Stay charged** - Keep device charged for extended use
- **Not a guarantee** - Don't rely solely on technology for safety

## 🐛 Troubleshooting

### Audio not playing on iOS
iOS requires user interaction before audio plays. The first tap initializes the audio context.

### Not working offline
Verify service worker registered successfully in DevTools → Application → Service Workers.

### Old version showing after update
Update `CACHE_NAME` in `/public/service-worker.js` (e.g., `bearbang-v2`), rebuild, and redeploy.

### Wake lock not working
Wake Lock API is only supported in Chrome and Edge. On other browsers, the app works but the screen may sleep.

## 📝 License

Use responsibly and in accordance with local wildlife protection laws.

## 🤝 Contributing

This is a production-ready template. Feel free to fork and modify for your needs.

## 🔗 Quick Links

- [View Documentation](SETUP.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Technical Overview](PROJECT_SUMMARY.md)

---

**Ready to deploy?** Follow the [Quick Start](#-quick-start) above or see [QUICKSTART.md](QUICKSTART.md).

Built with ❤️ for mountain safety.
