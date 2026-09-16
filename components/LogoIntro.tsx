'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { isLiteMotion } from '@/lib/motion';

/**
 * The overlay ships in the server markup so it covers the page from the very
 * first paint. `html.em-intro-skip`, set by the inline script in the layout,
 * hides it for repeat visitors before any of this runs.
 *
 * The home collage hydrates underneath while this is up, so the first screen
 * is already decoding when the overlay lets go.
 */
export default function LogoIntro() {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (root.classList.contains('em-intro-skip')) {
      root.classList.remove('em-intro-lock');
      setDone(true);
      return;
    }

    const lite = isLiteMotion();
    const leaveAt = window.setTimeout(() => setLeaving(true), lite ? 1100 : 1800);
    const doneAt = window.setTimeout(() => {
      sessionStorage.setItem('em-logo-intro', '1');
      root.classList.remove('em-intro-lock');
      setDone(true);
    }, lite ? 1550 : 2400);

    return () => {
      window.clearTimeout(leaveAt);
      window.clearTimeout(doneAt);
      root.classList.remove('em-intro-lock');
    };
  }, []);

  if (done) return null;

  return (
    <div className={`em-logo-intro${leaving ? ' is-leaving' : ''}`} aria-hidden="true">
      <div className="em-logo-intro-mark">
        <Image
          src="/imagotipo_blanco.png"
          alt=""
          width={520}
          height={160}
          priority
          style={{ width: 'min(72vw, 420px)', height: 'auto' }}
        />
      </div>
    </div>
  );
}
