import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Deterministic 0–1 noise. Random per-tile delays have to survive hydration,
 * so the value is derived from the index instead of Math.random().
 */
export function seededRandom(index: number, seed = 0) {
  const x = Math.sin(index * 127.1 + seed * 311.7 + 74.7) * 43758.5453;
  return x - Math.floor(x);
}
