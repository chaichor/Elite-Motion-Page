'use client';

import { useEffect, useState } from 'react';
import { isLiteMotion } from './motion';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return reduced;
}

export function useLiteMotion() {
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrow = window.matchMedia('(max-width: 768px)');
    const sync = () => setLite(isLiteMotion());
    sync();
    reduce.addEventListener('change', sync);
    narrow.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    return () => {
      reduce.removeEventListener('change', sync);
      narrow.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  return lite;
}
