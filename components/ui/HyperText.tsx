'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ElementType } from 'react';
import { isLiteMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface HyperTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Total scramble time in ms; scaled up a little for long strings. */
  duration?: number;
  delay?: number;
  startOnView?: boolean;
  style?: CSSProperties;
}

/**
 * Scrambles into the real copy once, the first time the text is scrolled into
 * view. The true string is what renders on the server and what the animation
 * ends on, so crawlers and screen readers only ever see the readable version.
 */
export function HyperText({
  text,
  as: Tag = 'p',
  className,
  duration,
  delay = 0,
  startOnView = true,
  style,
}: HyperTextProps) {
  const hostRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const [display, setDisplay] = useState(text);

  const chars = Array.from(text);
  // Long paragraphs should not take proportionally longer, or the tail of a
  // three-line sentence is still churning after the reader got there.
  const runtime = duration ?? Math.min(240 + chars.length * 14, 1400);

  const run = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);

    const source = Array.from(text);
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / runtime, 1);
      const front = progress * source.length;

      setDisplay(
        source
          .map((char, i) => {
            if (i < front) return char;
            if (char === ' ' || char === '\n' || char === '\u00A0') return char;
            // Keep punctuation in place so the line measures the same width.
            if (!/[\p{L}\p{N}]/u.test(char)) return char;
            const glyph = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
            return char === char.toLowerCase() ? glyph.toLowerCase() : glyph;
          })
          .join('')
      );

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
        setDisplay(text);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [text, runtime]);

  useEffect(() => setDisplay(text), [text]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !startOnView) return;
    if (isLiteMotion()) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        io.disconnect();
        window.setTimeout(run, delay);
      },
      { threshold: 0.15 }
    );

    io.observe(host);
    return () => io.disconnect();
  }, [run, delay, startOnView]);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    []
  );

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={hostRef as any}
      className={cn('em-hyper', className)}
      style={style}
    >
      {display}
    </Tag>
  );
}

export default HyperText;
