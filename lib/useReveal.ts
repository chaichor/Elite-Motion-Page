'use client';

import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Reveals elements as they enter the viewport. The hidden state is applied from
 * JS so the page stays readable if the script never runs, and the observer is
 * attached to the element itself rather than a clipped wrapper so the
 * intersection rect stays measurable.
 */
export function useReveal(selector: string, deps: unknown[] = []) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.rise = '1';
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
    );

    nodes.forEach((node, i) => {
      node.dataset.rise = '0';
      node.style.setProperty('--rise-delay', `${Math.min(i % 4, 3) * 70}ms`);
      io.observe(node);
    });

    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, reduced, ...deps]);
}
