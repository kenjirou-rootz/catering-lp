// Warm editorial animation constants
// Easing curves
export const EASE_REVEAL: [number, number, number, number] = [0.645, 0.045, 0.355, 1];
export const EASE_DEFAULT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
export const EASE_EDITORIAL: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Spring config for CTA buttons (~2% overshoot)
export const SPRING_CTA = { type: "spring" as const, stiffness: 400, damping: 17 };

// Duration system (seconds)
export const DURATION = {
  FAST: 0.2,
  DEFAULT: 0.4,
  SLOW: 0.6,
  SLOWER: 1.0,
  SLOWEST: 1.2,
} as const;

// Stagger delays (seconds)
export const STAGGER = {
  LINE: 0.05,
  ITEM: 0.08,
  HERO: 0.3,
} as const;

// Ticker animation
export const TICKER = {
  SPEED: 50,
  LERP: 0.08,
  GAP: 16,
} as const;
