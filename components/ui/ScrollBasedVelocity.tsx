'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { cn } from '@/lib/utils';

const wrap = (min: number, max: number, value: number) => {
  const span = max - min;
  return ((((value - min) % span) + span) % span) + min;
};

export function ScrollVelocityContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('em-velocity', className)}>{children}</div>;
}

interface RowProps {
  children: ReactNode;
  /** Idle speed in % of the track width per second. */
  baseVelocity?: number;
  direction?: 1 | -1;
  className?: string;
}

/**
 * A marquee row whose speed and direction are pushed around by scroll velocity,
 * so the band reacts to the reader instead of looping at a constant rate.
 */
export function ScrollVelocityRow({
  children,
  baseVelocity = 20,
  direction = 1,
  className,
}: RowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // Narrow range: scrolling should nudge the marquee along, not launch it.
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1.4], {
    clamp: false,
  });

  const directionRef = useRef<1 | -1>(1);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;

    let moveBy = directionRef.current * direction * baseVelocity * (delta / 1000);
    // A flick of the wheel can spike the spring well past the mapped range, so
    // cap how much the scroll is allowed to contribute.
    const factor = Math.max(-2, Math.min(2, velocityFactor.get()));

    // Scrolling backwards flips the row; scrolling forwards accelerates it.
    if (factor < 0) directionRef.current = -1;
    else if (factor > 0) directionRef.current = 1;

    moveBy += directionRef.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={cn('em-velocity-row', className)}>
      <motion.div className="em-velocity-track" style={{ x }}>
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} aria-hidden={i > 0 ? 'true' : undefined}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
