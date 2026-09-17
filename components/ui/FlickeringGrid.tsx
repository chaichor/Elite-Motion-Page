'use client';

import { useEffect, useRef } from 'react';
import { isLiteMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  /** Chance per second that any given square retargets its opacity. */
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
  className?: string;
}

function toRgb(color: string) {
  if (typeof document === 'undefined') return '0, 229, 255';
  const resolved = color.startsWith('var(')
    ? getComputedStyle(document.documentElement).getPropertyValue(color.slice(4, -1)).trim() || color
    : color;
  const probe = document.createElement('canvas').getContext('2d');
  if (!probe) return '0, 229, 255';
  probe.fillStyle = resolved || getComputedStyle(document.documentElement).getPropertyValue('--em-accent').trim() || '#00e5ff';
  probe.fillRect(0, 0, 1, 1);
  const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
  return `${r}, ${g}, ${b}`;
}

export default function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = 'var(--em-accent)',
  maxOpacity = 0.25,
  className,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (isLiteMotion()) return;

    let rgb = toRgb(color);
    const step = squareSize + gridGap;

    let cols = 0;
    let rows = 0;
    let squares = new Float32Array(0);
    let dpr = 1;
    let frame = 0;
    let last = performance.now();
    let visible = true;

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;

      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      cols = Math.ceil(width / step);
      rows = Math.ceil(height / step);
      squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
    };

    const draw = (now: number) => {
      if (!visible) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(draw);
      if (now - last < 80) return;
      const delta = Math.min((now - last) / 1000, 0.12);
      last = now;

      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * delta) {
          squares[i] = Math.random() * maxOpacity;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `rgba(${rgb}, 1)`;
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const opacity = squares[x * rows + y];
          if (opacity < 0.02) continue;
          ctx.globalAlpha = opacity;
          ctx.fillRect(
            x * step * dpr,
            y * step * dpr,
            squareSize * dpr,
            squareSize * dpr
          );
        }
      }
      ctx.globalAlpha = 1;
    };

    resize();
    frame = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !frame) {
          last = performance.now();
          frame = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 }
    );
    io.observe(host);

    const themeWatch = new MutationObserver(() => {
      rgb = toRgb(color);
    });
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      themeWatch.disconnect();
    };
  }, [squareSize, gridGap, flickerChance, color, maxOpacity]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('em-flicker-grid', className)}
      aria-hidden="true"
    />
  );
}
