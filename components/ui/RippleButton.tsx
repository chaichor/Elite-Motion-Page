'use client';

import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

type Ripple = { key: number; x: number; y: number; size: number };

interface Common {
  children: ReactNode;
  className?: string;
  rippleColor?: string;
  duration?: number;
}

function useRipples(duration: number) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const keyRef = useRef(0);
  const timers = useRef<number[]>([]);

  const spawn = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.2;
      const key = keyRef.current++;

      setRipples((prev) => [
        ...prev,
        {
          key,
          x: event.clientX - rect.left - size / 2,
          y: event.clientY - rect.top - size / 2,
          size,
        },
      ]);

      timers.current.push(
        window.setTimeout(
          () => setRipples((prev) => prev.filter((r) => r.key !== key)),
          duration
        )
      );
    },
    [duration]
  );

  useEffect(
    () => () => {
      timers.current.forEach(window.clearTimeout);
    },
    []
  );

  return { ripples, spawn };
}

function RippleLayer({
  ripples,
  color,
  duration,
}: {
  ripples: Ripple[];
  color: string;
  duration: number;
}) {
  return (
    <span className="em-ripple-layer" aria-hidden="true">
      {ripples.map((r) => (
        <span
          key={r.key}
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            background: color,
            animationDuration: `${duration}ms`,
          }}
        />
      ))}
    </span>
  );
}

type RippleButtonProps = Common & ComponentPropsWithoutRef<'button'>;

export function RippleButton({
  children,
  className,
  rippleColor = 'rgba(5, 5, 5, 0.35)',
  duration = 620,
  onClick,
  ...rest
}: RippleButtonProps) {
  const { ripples, spawn } = useRipples(duration);

  return (
    <button
      className={cn('em-ripple', className)}
      onClick={(event) => {
        spawn(event);
        onClick?.(event);
      }}
      {...rest}
    >
      <span className="em-ripple-content">{children}</span>
      <RippleLayer ripples={ripples} color={rippleColor} duration={duration} />
    </button>
  );
}

type RippleLinkProps = Common & {
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<'a'>, 'href'>;

/** Same ripple, for the CTAs that are links rather than buttons. */
export function RippleLink({
  children,
  className,
  href,
  external,
  rippleColor = 'rgba(5, 5, 5, 0.35)',
  duration = 620,
  onClick,
  ...rest
}: RippleLinkProps) {
  const { ripples, spawn } = useRipples(duration);

  const body = (
    <>
      <span className="em-ripple-content">{children}</span>
      <RippleLayer ripples={ripples} color={rippleColor} duration={duration} />
    </>
  );

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    spawn(event);
    onClick?.(event);
  };

  if (external) {
    return (
      <a
        href={href}
        className={cn('em-ripple', className)}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={cn('em-ripple', className)} onClick={handleClick} {...rest}>
      {body}
    </Link>
  );
}

export default RippleButton;
