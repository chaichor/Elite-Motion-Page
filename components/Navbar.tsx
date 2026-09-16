'use client';

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import { useReducedMotion } from '@/lib/useReducedMotion';

const WA = 'https://wa.me/50377350934';
const DESKTOP = 1025;

const links = [
  { href: '/', label: 'Inicio', id: '01' },
  { href: '/precios', label: 'Precios', id: '02' },
  { href: '/portafolio', label: 'Portafolio', id: '03' },
];

export default function Navbar() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ready, setReady] = useState(false);
  const [indicator, setIndicator] = useState({ x: 0, w: 0, on: false });
  const listRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const openedRef = useRef(false);

  const placeIndicator = (el: HTMLElement | null) => {
    if (!el) {
      setIndicator((prev) => ({ ...prev, on: false }));
      return;
    }
    setIndicator({ x: el.offsetLeft, w: el.offsetWidth, on: true });
  };

  const syncActive = () => {
    const nav = listRef.current;
    if (!nav) return;
    placeIndicator(nav.querySelector<HTMLElement>('[data-active="true"]'));
  };

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), reduced ? 0 : 90);
    return () => window.clearTimeout(id);
  }, [reduced]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= DESKTOP) setOpen(false);
      syncActive();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('em-bar-open', open);
    return () => document.documentElement.classList.remove('em-bar-open');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      openedRef.current = true;
      overlayRef.current?.querySelector<HTMLElement>('a')?.focus();
      return;
    }
    if (!openedRef.current) return;
    const burger = burgerRef.current;
    if (burger && getComputedStyle(burger).display !== 'none') burger.focus();
  }, [open]);

  useLayoutEffect(() => {
    const nav = listRef.current;
    if (!nav) return;
    syncActive();
    const ro = new ResizeObserver(syncActive);
    ro.observe(nav);
    return () => ro.disconnect();
  }, [pathname, ready]);

  const current = links.find((l) => l.href === pathname) ?? { id: '04', label: 'Contacto' };

  return (
    <>
      <header
        className="em-bar"
        data-ready={ready ? 'true' : 'false'}
        data-scrolled={scrolled ? 'true' : 'false'}
        data-open={open ? 'true' : 'false'}
      >
        <div className="em-bar-inner">
          <Link href="/" className="em-bar-brand" onClick={() => setOpen(false)}>
            <Image
              src="/imagotipo_blanco.png"
              alt="Elite Motion"
              width={220}
              height={66}
              className="em-bar-logo"
              priority
            />
          </Link>

          <nav
            className="em-bar-links"
            ref={listRef}
            aria-label="Principal"
            onMouseLeave={syncActive}
          >
            <span
              className="em-bar-indicator"
              style={{
                transform: `translateX(${indicator.x}px)`,
                width: indicator.w,
                opacity: indicator.on ? 1 : 0,
              }}
              aria-hidden="true"
            />
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={active ? 'true' : 'false'}
                  className="em-bar-link"
                  onMouseEnter={(e) => placeIndicator(e.currentTarget)}
                  onFocus={(e) => placeIndicator(e.currentTarget)}
                >
                  <span className="em-bar-num">({link.id})</span>
                  <span className="em-bar-label">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="em-bar-actions">
            <span className="em-bar-live" aria-hidden="true">
              <i />
              SS
            </span>
            <ThemeToggle />
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="em-bar-wa"
              aria-label="WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <Link href="/contacto" className="em-btn em-btn-primary em-bar-cta">
              Cotizar
            </Link>
            <button
              ref={burgerRef}
              type="button"
              className="em-bar-burger"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              aria-controls="em-bar-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={overlayRef}
        id="em-bar-menu"
        className="em-bar-overlay"
        data-open={open ? 'true' : 'false'}
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        <p className="em-bar-overlay-giant" aria-hidden="true">
          {current.id}
        </p>
        <div className="em-bar-overlay-meta">
          <span>Estudio audiovisual</span>
          <span>San Salvador</span>
          <span>14.69° N</span>
        </div>
        <nav className="em-bar-overlay-nav" aria-label="Móvil">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="em-bar-overlay-link"
              data-active={pathname === link.href ? 'true' : 'false'}
              style={{ '--i': i } as CSSProperties}
              onClick={() => setOpen(false)}
            >
              <span className="em-bar-overlay-num">({link.id})</span>
              <span className="em-bar-overlay-label">{link.label}</span>
            </Link>
          ))}
          <Link
            href="/contacto"
            className="em-bar-overlay-link"
            data-active={pathname === '/contacto' ? 'true' : 'false'}
            style={{ '--i': 3 } as CSSProperties}
            onClick={() => setOpen(false)}
          >
            <span className="em-bar-overlay-num">(04)</span>
            <span className="em-bar-overlay-label">Contacto</span>
          </Link>
        </nav>
        <div className="em-bar-overlay-foot">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="em-btn em-btn-ghost">
            WhatsApp
          </a>
          <Link href="/contacto" className="em-btn em-btn-primary" onClick={() => setOpen(false)}>
            Cotizar
          </Link>
        </div>
      </div>
    </>
  );
}
