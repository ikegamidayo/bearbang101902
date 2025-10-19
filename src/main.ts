// BearBang - Progressive Web App for bear deterrence
// Replace the following URL with your actual GitHub raw audio file URL
// GitHub Pagesのサブパス（/bearbang101902/）に自動追従させる
const REAL_AUDIO_URL     = `${import.meta.env.BASE_URL}audio/repeat_bang.mp3`;
const FALLBACK_AUDIO_URL = `${import.meta.env.BASE_URL}audio/repeat_bang.mp3`;

// Audio playback state
let audioCtx: AudioContext | null = null;
let gain: GainNode | null = null;
let buffer: AudioBuffer | null = null;
let source: AudioBufferSourceNode | null = null;
let wakeLock: any = null;

// DOM element references
const $ = (s: string) => document.querySelector(s)! as HTMLElement;
const startBtn = $("#startBtn") as HTMLButtonElement;
const stopBtn = $("#stopBtn") as HTMLButtonElement;
const testBtn = $("#testBtn") as HTMLButtonElement;
const volInput = $("#vol") as HTMLInputElement;
const splash = $("#splash");
const toast = $("#toast");

/**
 * Initialize AudioContext and GainNode on first user interaction
 * Restores volume from localStorage
 */
async function ensureContext() {
  if (!audioCtx) {
    // @ts-ignore - Handle browser prefixes
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new Ctx();
    gain = audioCtx.createGain();
    gain.connect(audioCtx.destination);

    // Restore saved volume or default to 0.9
    const saved = localStorage.getItem("bb_vol");
    gain.gain.value = saved ? Number(saved) : 0.9;
    volInput.value = String(gain.gain.value);
  }
}

/**
 * Fetch and decode audio from a given URL
 * Uses cache-first strategy via fetch cache
 */
async function fetchBuffer(url: string): Promise<AudioBuffer> {
  await ensureContext();
  const res = await fetch(url, { cache: "force-cache" });
  const arr = await res.arrayBuffer();
  return await audioCtx!.decodeAudioData(arr);
}

/**
 * Load audio buffer from remote or fallback URL
 * Caches buffer in memory after first load
 */
async function loadBuffer() {
  if (buffer) return buffer;

  try {
    // Try remote URL first
    buffer = await fetchBuffer(REAL_AUDIO_URL);
  } catch {
    // Fall back to local asset
    buffer = await fetchBuffer(FALLBACK_AUDIO_URL);
  }

  return buffer!;
}

/**
 * Start gapless looping of the audio buffer
 * Creates a new BufferSourceNode with loop enabled
 */
function startLoop() {
  if (!audioCtx || !gain || !buffer || source) return;

  source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.connect(gain);
  source.start(0);
}

/**
 * Stop the currently playing loop
 * Safely disconnects and nullifies source node
 */
function stopLoop() {
  if (source) {
    try { source.stop(); } catch {}
    try { source.disconnect(); } catch {}
    source = null;
  }
}

/**
 * Request Screen Wake Lock to prevent device sleep during playback
 * Automatically re-requests when visibility changes
 */
async function requestWakeLock() {
  try {
    // @ts-ignore - Wake Lock API
    if ("wakeLock" in navigator) {
      wakeLock = await (navigator as any).wakeLock.request("screen");
    }

    // Re-request wake lock when returning to tab
    document.addEventListener("visibilitychange", async () => {
      if (document.visibilityState === "visible" && source) {
        try {
          // @ts-ignore
          wakeLock = await (navigator as any).wakeLock.request("screen");
        } catch {}
      }
    });
  } catch {}
}

/**
 * Release the Screen Wake Lock
 */
function releaseWakeLock() {
  try { wakeLock?.release?.(); } catch {}
  wakeLock = null;
}

/**
 * Update button states based on playback status
 */
function updateButtons(playing: boolean) {
  startBtn.disabled = playing;
  stopBtn.disabled = !playing;
  startBtn.setAttribute("aria-pressed", String(playing));
  stopBtn.setAttribute("aria-pressed", String(!playing));
}

/**
 * START button handler
 * Resumes audio context, loads buffer, starts loop, requests wake lock
 */
startBtn.addEventListener("click", async () => {
  await ensureContext();

  // Resume context for iOS/mobile browsers
  if (audioCtx!.state === "suspended") {
    await audioCtx!.resume();
  }

  await loadBuffer();
  startLoop();
  requestWakeLock();
  updateButtons(true);
});

/**
 * STOP button handler
 * Stops loop and releases wake lock
 */
stopBtn.addEventListener("click", () => {
  stopLoop();
  releaseWakeLock();
  updateButtons(false);
});

/**
 * TEST button handler
 * Plays audio once without looping
 */
testBtn.addEventListener("click", async () => {
  await ensureContext();

  if (!buffer) await loadBuffer();

  const oneshot = audioCtx!.createBufferSource();
  oneshot.buffer = buffer!;
  oneshot.connect(gain!);
  oneshot.start(0);
});

/**
 * Volume slider handler
 * Updates gain and persists to localStorage
 */
volInput.addEventListener("input", () => {
  if (gain) {
    gain.gain.value = Number(volInput.value);
    localStorage.setItem("bb_vol", String(gain.gain.value));
  }
});

/**
 * Service Worker registration and splash screen handling
 * Registers SW for offline functionality and shows ready toast
 */
// --- Service Worker registration and splash screen handling ---
window.addEventListener("load", () => {
  // Hide splash after timeout or when SW is ready
  const hideSplash = () => splash.classList.add("hidden");
  setTimeout(hideSplash, 1500);

  if ("serviceWorker" in navigator) {
    // ← base に追従したパスで登録
    const swPath = `${import.meta.env.BASE_URL}service-worker.js`;

    navigator.serviceWorker
      .register(swPath)
      .then(async () => {
        // wait for SW to be ready
        await navigator.serviceWorker.ready;
        hideSplash();

        // Show offline-ready toast
        toast.removeAttribute("hidden");
        setTimeout(() => toast.setAttribute("hidden", ""), 2000);
      })
      .catch(() => {
        // Even if SW fails, hide splash eventually
        hideSplash();
      });
  } else {
    hideSplash();
  }
});
