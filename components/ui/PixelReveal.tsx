'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { isLiteMotion } from '@/lib/motion';
import { cn, seededRandom } from '@/lib/utils';

type Grid = { rows: number; cols: number };

const DEFAULT_GRIDS = {
  '6x4': { rows: 4, cols: 6 },
  '8x8': { rows: 8, cols: 8 },
  '8x3': { rows: 3, cols: 8 },
  '4x6': { rows: 6, cols: 4 },
  '3x8': { rows: 8, cols: 3 },
  '10x14': { rows: 14, cols: 10 },
} satisfies Record<string, Grid>;

export type PredefinedGridKey = keyof typeof DEFAULT_GRIDS;

const MIN_GRID = 1;
const MAX_GRID = 16;

interface PixelRevealProps {
  children: ReactNode;
  grid?: PredefinedGridKey;
  customGrid?: Grid;
  grayscaleAnimation?: boolean;
  /** Fade duration of a single pixel, in ms. */
  pixelFadeInDuration?: number;
  /** Upper bound of the random per-pixel delay, in ms. */
  maxAnimationDelay?: number;
  /** Delay before the media desaturates back to full colour, in ms. */
  colorRevealDelay?: number;
  /** Colour of the covering pixels — should match whatever sits behind. */
  tileColor?: string;
  /** Start on mount instead of waiting for the element to scroll into view. */
  trigger?: 'view' | 'mount';
  /** Stretch to the nearest positioned ancestor instead of flowing inline. */
  fill?: boolean;
  /** Varies the random delay pattern between neighbouring tiles. */
  seed?: number;
  className?: string;
}

/**
 * Magic UI's pixel-image reveal, inverted so it works for video too: instead of
 * stamping one <img> per grid cell, a single media node sits under a grid of
 * opaque tiles that dissolve away at random. Same look, one decode, and a video
 * element is never duplicated.
 */
export function PixelReveal({
  children,
  grid = '8x8',
  customGrid,
  grayscaleAnimation = true,
  pixelFadeInDuration = 900,
  maxAnimationDelay = 900,
  colorRevealDelay = 1000,
  tileColor = 'var(--bg-primary)',
  trigger = 'view',
  fill = false,
  seed = 0,
  className,
}: PixelRevealProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [inColor, setInColor] = useState(false);
  const [settled, setSettled] = useState(false);

  const { rows, cols } = useMemo(() => {
    const valid =
      customGrid &&
      Number.isInteger(customGrid.rows) &&
      Number.isInteger(customGrid.cols) &&
      customGrid.rows >= MIN_GRID &&
      customGrid.cols >= MIN_GRID &&
      customGrid.rows <= MAX_GRID &&
      customGrid.cols <= MAX_GRID;

    return valid ? customGrid : DEFAULT_GRIDS[grid];
  }, [customGrid, grid]);

  const tiles = useMemo(
    () =>
      Array.from({ length: rows * cols }, (_, index) => ({
        delay: Math.round(seededRandom(index, seed) * maxAnimationDelay),
      })),
    [rows, cols, maxAnimationDelay, seed]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (
      trigger === 'mount' ||
      isLiteMotion()
    ) {
      setRevealed(true);
      if (isLiteMotion()) {
        setInColor(true);
        setSettled(true);
      }
      return;
    }

    const host = hostRef.current;
    if (!host) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setRevealed(true);
        io.disconnect();
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0.05 }
    );

    io.observe(host);
    return () => io.disconnect();
  }, [trigger]);

  useEffect(() => {
    if (!revealed) return;

    const toColor = window.setTimeout(() => setInColor(true), colorRevealDelay);
    // Tiles are inert once fully transparent, so drop them from the DOM —
    // a filtered gallery can hold a few thousand of them otherwise.
    const toSettle = window.setTimeout(
      () => setSettled(true),
      maxAnimationDelay + pixelFadeInDuration + 120
    );

    return () => {
      window.clearTimeout(toColor);
      window.clearTimeout(toSettle);
    };
  }, [revealed, colorRevealDelay, maxAnimationDelay, pixelFadeInDuration]);

  return (
    <div
      ref={hostRef}
      className={cn('em-pixel', fill && 'em-pixel--fill', className)}
      style={{ ['--em-pixel-tile' as string]: tileColor }}
    >
      <div
        className="em-pixel-media"
        style={{
          filter: grayscaleAnimation && !inColor ? 'grayscale(1)' : 'none',
          transition: grayscaleAnimation
            ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : undefined,
        }}
      >
        {children}
      </div>

      {!mounted && <div className="em-pixel-veil" aria-hidden="true" />}

      {mounted && !settled && (
        <div
          className="em-pixel-tiles"
          aria-hidden="true"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {tiles.map((tile, index) => (
            <span
              key={index}
              style={{
                backgroundColor: tileColor,
                opacity: revealed ? 0 : 1,
                transitionDelay: `${tile.delay}ms`,
                transitionDuration: `${pixelFadeInDuration}ms`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface PixelImageProps extends Omit<PixelRevealProps, 'children'> {
  src: string;
  alt?: string;
}

/** Drop-in for the documented `<PixelImage src="…" />` API. */
export function PixelImage({ src, alt = '', ...rest }: PixelImageProps) {
  return (
    <PixelReveal {...rest}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} draggable={false} />
    </PixelReveal>
  );
}

export default PixelReveal;
