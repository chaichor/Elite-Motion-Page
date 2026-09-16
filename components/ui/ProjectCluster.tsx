'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
  /** 0 = far, 1 = near. Drives both stacking and parallax travel. */
  depth: number;
};

/** Hand-placed collage. Percentages of the cluster box, deliberately overlapping. */
const SLOTS: Slot[] = [
  { x: 2, y: 4, w: 15, h: 19, depth: 0.25 },
  { x: 26, y: 2, w: 16, h: 32, depth: 0.35 },
  { x: 40, y: 0, w: 20, h: 20, depth: 0.2 },
  { x: 58, y: 3, w: 14, h: 29, depth: 0.45 },
  { x: 14, y: 16, w: 18, h: 20, depth: 0.55 },
  { x: 68, y: 14, w: 20, h: 21, depth: 0.3 },
  { x: 4, y: 34, w: 17, h: 33, depth: 0.75 },
  { x: 20, y: 40, w: 22, h: 21, depth: 0.9 },
  { x: 60, y: 36, w: 18, h: 33, depth: 0.85 },
  { x: 78, y: 40, w: 16, h: 18, depth: 0.5 },
  { x: 10, y: 62, w: 20, h: 35, depth: 0.65 },
  { x: 30, y: 66, w: 18, h: 19, depth: 1 },
  { x: 46, y: 60, w: 16, h: 33, depth: 0.95 },
  { x: 62, y: 66, w: 20, h: 19, depth: 0.7 },
  { x: 80, y: 62, w: 17, h: 30, depth: 0.55 },
];

const SWAP_MS = 480;

interface ProjectClusterProps {
  items: ClusterItem[];
  /** Fires as tiles are hovered so the page can print a readout. */
  onFocusItem?: (item: (ClusterItem & { index: number }) | null) => void;
}

/**
 * A shuffling collage of project stills. One tile swaps at a time rather than
 * the whole board, which keeps the motion alive without ever looking like a
 * slideshow, and keeps each frame's work to a single image transition.
 */
export default function ProjectCluster({ items, onFocusItem }: ProjectClusterProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<number[]>(() =>
    SLOTS.map((_, i) => i % Math.max(items.length, 1))
  );
  const [previous, setPrevious] = useState<(number | null)[]>(() => SLOTS.map(() => null));
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (items.length <= SLOTS.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let tick = 0;
    const id = window.setInterval(() => {
      const slot = tick % SLOTS.length;
      tick++;

      setCurrent((prevIndices) => {
        const shown = new Set(prevIndices);
        let next = (prevIndices[slot] + SLOTS.length) % items.length;
        // Never show the same still twice on the board at once.
        while (shown.has(next)) next = (next + 1) % items.length;

        setPrevious((p) => {
          const copy = [...p];
          copy[slot] = prevIndices[slot];
          return copy;
        });

        const copy = [...prevIndices];
        copy[slot] = next;
        return copy;
      });
    }, 1400);

    return () => window.clearInterval(id);
  }, [items.length]);

  /* Pointer parallax, written straight to CSS custom properties so React
     never re-renders on mouse move. */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    const target = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      eased.x += (target.x - eased.x) * 0.06;
      eased.y += (target.y - eased.y) * 0.06;
      host.style.setProperty('--em-cl-x', `${(-eased.x * 26).toFixed(2)}px`);
      host.style.setProperty('--em-cl-y', `${(-eased.y * 18).toFixed(2)}px`);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  const focus = (slot: number | null) => {
    setActive(slot);
    if (!onFocusItem) return;
    if (slot === null) {
      onFocusItem(null);
      return;
    }
    const index = current[slot];
    onFocusItem({ ...items[index], index });
  };

  if (!items.length) return null;

  return (
    <div ref={hostRef} className="em-cluster">
      {SLOTS.map((slot, i) => {
        const item = items[current[i] % items.length];
        const prevIndex = previous[i];
        const prevItem = prevIndex === null ? null : items[prevIndex % items.length];
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
              ['--em-depth' as string]: slot.depth,
            }}
            onPointerEnter={() => focus(i)}
            onPointerLeave={() => focus(null)}
          >
            {prevItem && (
              <Image
                key={`out-${prevItem.src}`}
                src={prevItem.src}
                alt=""
                fill
                sizes="(max-width: 768px) 40vw, 22vw"
                quality={70}
                className="em-cluster-img is-out"
                unoptimized
                draggable={false}
              />
            )}
            <Image
              key={`in-${item.src}`}
              src={item.src}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 40vw, 22vw"
              quality={70}
              priority={i < 4}
              className="em-cluster-img is-in"
              style={{ animationDuration: `${SWAP_MS}ms` }}
              draggable={false}
              unoptimized
            />
          </figure>
        );
      })}
    </div>
  );
}
