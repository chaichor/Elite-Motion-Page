export const LITE_QUERY =
  '(max-width: 768px), (hover: none) and (pointer: coarse)';

/** Touch / narrow viewports, or the user asked for less motion. */
export function isLiteMotion() {
  if (typeof window === 'undefined') return false;
  return (
    document.documentElement.classList.contains('em-lite') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(max-width: 768px)').matches
  );
}
