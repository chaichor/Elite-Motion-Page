'use client';

import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, .em-chip, .em-svc';

/**
 * Spring-chased pointer. The native cursor is only hidden once this mounts and
 * only on fine-pointer, motion-tolerant devices — if the script never runs,
 * the real cursor stays.
 */
export default function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || calm.matches) return;

    const root = document.documentElement;
    root.classList.add('em-cursor-on');

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const arrow = { ...target };
    const trail = { ...target };
    let angle = 0;
    let scale = 1;
    let frame = 0;

    // Offset of the arrow tip inside its 26×30 box. The tip is the hotspot, so
    // it has to land on the real pointer coordinate — centring the glyph
    // instead puts the visible point up and to the left of where a click
    // actually registers.
    const TIP_X = 2.5;
    const TIP_Y = 2.2;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      root.classList.add('em-cursor-live');

      const hot = (e.target as Element | null)?.closest?.(INTERACTIVE);
      root.classList.toggle('em-cursor-hot', Boolean(hot));
    };

    const onLeave = () => root.classList.remove('em-cursor-live');
    const onDown = () => root.classList.add('em-cursor-press');
    const onUp = () => root.classList.remove('em-cursor-press');

    const tick = () => {
      const px = arrow.x;
      const py = arrow.y;

      // The arrow is kept tight against the pointer so aim stays accurate; the
      // ring carries the lag that gives the cursor its weight.
      arrow.x += (target.x - arrow.x) * 0.65;
      arrow.y += (target.y - arrow.y) * 0.65;
      trail.x += (arrow.x - trail.x) * 0.13;
      trail.y += (arrow.y - trail.y) * 0.13;

      const vx = arrow.x - px;
      const vy = arrow.y - py;
      const speed = Math.hypot(vx, vy);

      if (speed > 0.35) {
        const next = (Math.atan2(vy, vx) * 180) / Math.PI + 90;
        // Shortest-path interpolation, or the arrow spins the long way round
        // every time the pointer crosses the -180/180 seam.
        let diff = ((next - angle + 540) % 360) - 180;
        angle += diff * 0.25;
      }

      scale += (1 + Math.min(speed / 45, 0.45) - scale) * 0.2;

      dot.style.transform = `translate3d(${arrow.x - TIP_X}px, ${arrow.y - TIP_Y}px, 0) rotate(${angle}deg) scale(${scale})`;
      ring.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`;

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      root.classList.remove('em-cursor-on', 'em-cursor-live', 'em-cursor-hot', 'em-cursor-press');
    };
  }, []);

  return (
    <div className="em-cursor" aria-hidden="true">
      <div ref={ringRef} className="em-cursor-ring" />
      <div ref={dotRef} className="em-cursor-arrow">
        <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
          <path
            d="M2.5 2.2 23 15.4 13.4 17 9.1 26.6z"
            fill="currentColor"
            stroke="var(--bg-primary)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
