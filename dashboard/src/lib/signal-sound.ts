/** Optional, off-by-default ambient sonic signature for the Signal Field. */

let enabled = false;
let ctx: AudioContext | null = null;
let last = 0;

function ensure() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(freq: number, gain: number, dur: number) {
  if (!enabled) return;
  const now = Date.now();
  if (now - last < 260) return;
  last = now;
  const ac = ensure();
  if (!ac) return;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, ac.currentTime);
  g.gain.linearRampToValueAtTime(gain, ac.currentTime + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
  osc.connect(g).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + dur + 0.05);
}

export const signalSound = {
  get enabled() {
    return enabled;
  },
  toggle() {
    enabled = !enabled;
    if (enabled) ensure();
    return enabled;
  },
  convert: () => tone(660, 0.045, 0.5),
  hesitate: () => tone(196, 0.03, 0.7),
};
