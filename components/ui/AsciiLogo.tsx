'use client';

import { useEffect, useRef } from 'react';

const HEX = '0123456789ABCDEF';

/** Luminance ramp: dim slate through accent cyan to blown-out white. */
const PALETTE_DARK = [
  'rgba(118,138,150,0.10)',
  'rgba(128,150,162,0.20)',
  'rgba(138,162,176,0.32)',
  'rgba(146,180,194,0.46)',
  'rgba(112,202,222,0.62)',
  'rgba(78,218,240,0.78)',
  'rgba(128,238,253,0.92)',
  'rgba(228,253,255,1)',
];

const PALETTE_LIGHT = [
  'rgba(22,20,18,0.08)',
  'rgba(22,20,18,0.16)',
  'rgba(22,20,18,0.28)',
  'rgba(0,90,100,0.42)',
  'rgba(0,110,122,0.58)',
  'rgba(0,122,134,0.74)',
  'rgba(0,70,78,0.88)',
  'rgba(22,20,18,1)',
];

const FRAME_MS = 1000 / 30;

interface AsciiLogoProps {
  lines?: string[];
  className?: string;
}

/**
 * The "trippin spiral" ASCII look, rendered straight to Canvas2D.
 *
 * The procedural rings field and the wordmark mask are both evaluated at one
 * sample per character cell rather than per pixel — a full-resolution shader in
 * JS would cost ~300k samples a frame, this costs ~2.5k. Cells are then batched
 * into eight luminance buckets so each frame issues eight fillStyle changes
 * instead of one per glyph.
 */
export default function AsciiLogo({
  lines = ['ELITE', 'MOTION'],
  className,
}: AsciiLogoProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let palette = document.documentElement.getAttribute('data-theme') === 'light' ? PALETTE_LIGHT : PALETTE_DARK;
    const syncPalette = () => {
      palette = document.documentElement.getAttribute('data-theme') === 'light' ? PALETTE_LIGHT : PALETTE_DARK;
    };
    const themeWatch = new MutationObserver(syncPalette);
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    let cols = 0;
    let rows = 0;
    let cellW = 0;
    let cellH = 0;
    let mask = new Float32Array(0);

    const buckets: number[][] = Array.from({ length: 8 }, () => []);
    const glyphs: string[][] = Array.from({ length: 8 }, () => []);

    const pointer = { x: 0, y: 0, strength: 0, inside: false };

    let frame = 0;
    let visible = true;
    let lastDraw = 0;
    let start = performance.now();

    /** Renders the wordmark into a cols×rows luminance bitmap. */
    const buildMask = () => {
      if (!cols || !rows) return;

      const off = document.createElement('canvas');
      off.width = cols;
      off.height = rows;
      const octx = off.getContext('2d', { willReadFrequently: true });
      if (!octx) return;

      octx.fillStyle = '#000';
      octx.fillRect(0, 0, cols, rows);
      octx.fillStyle = '#fff';
      octx.textBaseline = 'middle';
      octx.textAlign = 'center';

      const block = rows / (lines.length + 0.55);
      const size = block * 0.94;
      const top = (rows - block * lines.length) / 2 + block / 2;

      lines.forEach((line, i) => {
        octx.font = `900 ${size}px Archivo, "Helvetica Neue", Helvetica, sans-serif`;
        const width = octx.measureText(line).width || 1;
        // Cells are ~0.6 as wide as they are tall, so the mask has to be drawn
        // pre-stretched to come out proportional on screen.
        const scaleX = (cols * 0.88) / width;

        octx.save();
        octx.translate(cols / 2, top + i * block);
        octx.scale(scaleX, 1);
        octx.fillText(line, 0, 0);
        octx.restore();
      });

      const { data } = octx.getImageData(0, 0, cols, rows);
      mask = new Float32Array(cols * rows);
      for (let i = 0; i < mask.length; i++) mask[i] = data[i * 4] / 255;
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cell = rect.width < 560 ? 9 : rect.width < 1024 ? 11 : 13;

      cellH = cell;
      cellW = Math.max(4, Math.round(cell * 0.6));
      cols = Math.max(8, Math.floor(rect.width / cellW));
      rows = Math.max(6, Math.floor(rect.height / cellH));

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${cell}px "Sohne Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      buildMask();
    };

    const render = (now: number) => {
      const t = calm ? 0 : (now - start) / 1000;
      const aspect = (cols * cellW) / (rows * cellH);

      for (let i = 0; i < 8; i++) {
        buckets[i].length = 0;
        glyphs[i].length = 0;
      }

      const pointerFade = pointer.strength;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let u = (x / cols - 0.5) * 2 * aspect;
          let v = (y / rows - 0.5) * 2;

          if (pointerFade > 0.01) {
            const pu = (pointer.x - 0.5) * 2 * aspect;
            const pv = (pointer.y - 0.5) * 2;
            const dx = u - pu;
            const dy = v - pv;
            const d = Math.hypot(dx, dy);
            const radius = 0.62;
            if (d < radius) {
              const a = (1 - d / radius) ** 2 * 1.35 * pointerFade;
              const c = Math.cos(a);
              const s = Math.sin(a);
              u = pu + dx * c - dy * s;
              v = pv + dx * s + dy * c;
            }
          }

          const warp =
            0.48 * Math.sin(v * 2.6 + t * 0.62) +
            0.29 * Math.cos(u * 2.1 - t * 0.44);
          const r = Math.hypot(u, v) * 2.4;
          const field = Math.sin(r * 6 - t * 1.7 + warp * 3) * 0.5 + 0.5;

          const m = mask[y * cols + x] || 0;
          let lum = field * field * 0.18 + m * (0.3 + 0.55 * field);

          // shimmer
          lum *= 0.72 + 0.34 * Math.sin(t * 2.6 + x * 0.26 - y * 0.42);
          // contrast 150
          lum = (lum - 0.5) * 1.5 + 0.5;
          // halftone
          const halftone = 0.5 + 0.5 * Math.sin(x * 1.15) * Math.sin(y * 1.15);
          lum *= 1 - 0.3 * (1 - halftone);
          // grain
          lum += (((x * 92837 + y * 689287 + ((t * 8) | 0) * 15731) % 97) / 97 - 0.5) * 0.06;

          if (lum < 0.1) continue;
          if (lum > 1) lum = 1;

          const bucket = Math.min(7, (lum * 8) | 0);
          buckets[bucket].push(x * cellW + cellW / 2, y * cellH + cellH / 2);
          glyphs[bucket].push(HEX[Math.min(15, (lum * 16) | 0)]);
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let b = 0; b < 8; b++) {
        const points = buckets[b];
        if (!points.length) continue;

        ctx.fillStyle = palette[b];
        // Only the hottest cells carry a bloom, so the shadow cost stays small.
        if (b === 7) {
          ctx.shadowColor = 'rgba(0,229,255,0.75)';
          ctx.shadowBlur = 9;
        }

        const chars = glyphs[b];
        for (let i = 0, p = 0; i < chars.length; i++, p += 2) {
          ctx.fillText(chars[i], points[p], points[p + 1]);
        }

        if (b === 7) ctx.shadowBlur = 0;
      }
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (!visible) return;
      if (now - lastDraw < FRAME_MS) return;
      lastDraw = now;

      if (!pointer.inside && pointer.strength > 0) {
        pointer.strength = Math.max(0, pointer.strength - 0.04);
      } else if (pointer.inside && pointer.strength < 1) {
        pointer.strength = Math.min(1, pointer.strength + 0.08);
      }

      render(now);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
      pointer.inside = true;
    };

    const onPointerLeave = () => {
      pointer.inside = false;
    };

    resize();

    if (calm) {
      start = performance.now();
      render(start);
    } else {
      frame = requestAnimationFrame(loop);
      host.addEventListener('pointermove', onPointerMove, { passive: true });
      host.addEventListener('pointerleave', onPointerLeave);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (calm) render(performance.now());
    });
    ro.observe(host);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(host);

    // Web fonts land after first paint and change the mask metrics.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        buildMask();
        if (calm) render(performance.now());
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      themeWatch.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
    };
    // A fresh array literal from the caller must not restart the animation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join('\u0000')]);

  return (
    <div ref={hostRef} className={className ?? 'em-ascii-stage'}>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
