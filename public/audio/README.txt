ASSET REQUIREMENTS
==================

Place your "repeat_bang.mp3" audio file in this directory.

Required:
- Filename: repeat_bang.mp3
- Format: MP3
- Content: Loud firecracker/metallic sound for bear deterrence
- Duration: Any (will be looped seamlessly)
- Recommended: High quality, clear, loud sound

This audio will:
- Loop continuously when START is pressed
- Play once when TEST is pressed
- Be cached by the service worker for offline use

IMPORTANT: Also update the REAL_AUDIO_URL in /src/main.ts and /public/service-worker.js
to point to your GitHub raw file URL for the same audio file.
