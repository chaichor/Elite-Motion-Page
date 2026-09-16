'use client';

import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function applyTheme(next: Theme) {
  const root = document.documentElement;
  const go = () => {
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('em-theme', next);
    } catch {
      /* private mode */
    }
  };

  if (typeof document.startViewTransition === 'function') {
    document.startViewTransition(go);
  } else {
    go();
  }
}

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const sync = () => setTheme(readTheme());
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, []);

  const isLight = theme === 'light';
  const label = isLight ? 'Activar modo oscuro' : 'Activar modo claro';

  return (
    <button
      type="button"
      className={`em-theme-toggle ${className}`.trim()}
      aria-label={label}
      title={label}
      onClick={() => {
        const next = isLight ? 'dark' : 'light';
        applyTheme(next);
        setTheme(next);
      }}
    >
      {isLight ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}
