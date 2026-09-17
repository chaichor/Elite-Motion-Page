'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { isLiteMotion } from '@/lib/motion';

export type ClusterItem = {
  src: string;
  title: string;
  tag: string;
};

type Slot = {
  x: number;
  y: number;
  w: number;
  h: number;
  depth: number;
};

/** Cipher-like: fewer, larger overlapping frames — not a 15-cell mosaic. */
const DESKTOP_SLOTS: Slot[] = [
  { x: 3, y: 6, w: 24, h: 38, depth: 0.28 },
  { x: 26, y: 2, w: 20, h: 30, depth: 0.18 },
  { x: 50, y: 8, w: 26, h: 34, depth: 0.42 },
  { x: 74, y: 4, w: 22, h: 40, depth: 0.26 },
  { x: 6, y: 48, w: 22, h: 44, depth: 0.62 },
  { x: 30, y: 40, w: 28, h: 36, depth: 0.88 },
  { x: 58, y: 46, w: 22, h: 42, depth: 0.74 },
  { x: 78, y: 50, w: 19, h: 38, depth: 0.5 },
];

const MOBILE_SLOTS: Slot[] = [
  { x: 3, y: 4, w: 54, h: 44, depth: 0.4 },
  { x: 52, y: 2, w: 45, h: 36, depth: 0.28 },
  { x: 4, y: 50, w: 46, h: 46, depth: 0.7 },
  { x: 52, y: 42, w: 46, h: 38, depth: 0.85 },
];

interface ProjectClusterProps {
  items: ClusterItem[];
  onFocusItem?: (item: (ClusterItem & { index: number }) | null) => void;
}

/**
 * Editorial stills collage. Cipher keeps a small set of already-sized frames
 * on one transformed plane; we do the same: no per-tile will-change, no
 * clip-path, no grayscale, and no perpetual rAF. Phones stay on four tiles.
 */
export default function ProjectCluster({ items, onFocusItem }: ProjectClusterProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [slots, setSlots] = useState<Slot[]>(MOBILE_SLOTS);
  const [active, setActive] = useState<number | null>(null);
  const pool = items.slice(0, Math.max(slots.length, 1));

  useEffect(() => {
    if (isLiteMotion()) return;
    setSlots(DESKTOP_SLOTS);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (isLiteMotion()) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    let running = false;
    let visible = true;
    const target = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
    };

    const tick = () => {
      eased.x += (target.x - eased.x) * 0.08;
      eased.y += (target.y - eased.y) * 0.08;
      host.style.setProperty('--em-cl-x', `${(-eased.x * 18).toFixed(1)}px`);
      host.style.setProperty('--em-cl-y', `${(-eased.y * 12).toFixed(1)}px`);

      if (Math.abs(target.x - eased.x) < 0.002 && Math.abs(target.y - eased.y) < 0.002) {
        stop();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || !visible) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      start();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      start();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerleave', onLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) stop();
      },
      { threshold: 0 }
    );
    io.observe(host);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const focus = (slot: number | null) => {
    setActive(slot);
    if (!onFocusItem) return;
    if (slot === null || !pool[slot]) {
      onFocusItem(null);
      return;
    }
    onFocusItem({ ...pool[slot], index: slot });
  };

  if (!pool.length) return null;

  return (
    <div ref={hostRef} className="em-cluster">
      {slots.map((slot, i) => {
        const item = pool[i % pool.length];
        const isActive = active === i;

        return (
          <figure
            key={i}
            className="em-cluster-tile"
            data-active={isActive ? 'true' : 'false'}
            data-dim={active !== null && !isActive ? 'true' : 'false'}
            style={{
              left: `${slot.x}%`,
              top: `${slot.y}%`,
              width: `${slot.w}%`,
              height: `${slot.h}%`,
              zIndex: isActive ? 40 : Math.round(slot.depth * 20) + 1,
            }}
            onPointerEnter={() => focus(i)}
            onPointerLeave={() => focus(null)}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 54vw, 22vw"
              quality={55}
              priority={i < 2}
              loading={i < 2 ? undefined : 'lazy'}
              className="em-cluster-img"
              draggable={false}
            />
          </figure>
        );
      })}
    </div>
  );
}
