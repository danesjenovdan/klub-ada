/*
 * Motion for the social posts. Every post is a pure function of the playhead
 * `t` (seconds): nothing runs on its own clock, so the preview, a PNG still and
 * every frame of an exported video are the same picture at the same `t`. These
 * helpers turn `t` into the 0..1 progress of each beat and shape it.
 */

export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export const mix = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

/** Progress of a beat that starts at `start` and lasts `duration` seconds. */
export const beat = (t: number, start: number, duration: number) =>
  duration <= 0 ? (t >= start ? 1 : 0) : clamp((t - start) / duration);

export const ease = {
  linear: (p: number) => p,
  outCubic: (p: number) => 1 - Math.pow(1 - p, 3),
  inCubic: (p: number) => p * p * p,
  inOutCubic: (p: number) =>
    p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2,
  outExpo: (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p)),
  inOutExpo: (p: number) =>
    p === 0
      ? 0
      : p === 1
        ? 1
        : p < 0.5
          ? Math.pow(2, 20 * p - 10) / 2
          : (2 - Math.pow(2, -20 * p + 10)) / 2,
  /** Overshoots a touch and settles: for things that land. */
  outBack: (p: number) => {
    // Exact at the ends: rounding would leave a sliver above 0 at the start,
    // and callers test `> 0` to know whether something has appeared yet.
    if (p <= 0 || p >= 1) return p <= 0 ? 0 : 1;
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
  },
  /** A damped spring, settling by the end of the beat. */
  spring: (p: number) =>
    p === 0 || p === 1 ? p : 1 - Math.exp(-6 * p) * Math.cos(p * Math.PI * 3.2),
};

/**
 * Quantise progress to `count` whole steps, the way the site's pixel art
 * moves: things materialise in a few hard jumps instead of a smooth fade.
 */
export const steps = (progress: number, count: number) =>
  Math.floor(progress * count) / count;

/**
 * Deterministic noise in 0..1 for an integer seed, so "random" layouts (pixel
 * dissolves, confetti) come out the same in every frame and every export.
 */
export const hash = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** The first `progress` of `text`, for typing a line out character by character. */
export const typed = (text: string, progress: number) =>
  Array.from(text)
    .slice(0, Math.round(Array.from(text).length * clamp(progress)))
    .join("");

/** A terminal caret that blinks twice a second while `on`. */
export const caretVisible = (t: number, on = true) =>
  on && Math.floor(t * 2.2) % 2 === 0;
