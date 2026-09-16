'use client';

import Link from 'next/link';
import AsciiLogo from '@/components/ui/AsciiLogo';

const LOGO_LINES = ['ELITE', 'MOTION'];

export default function Footer() {
  return (
    <footer className="em-ascii-footer">
      <div className="container">
        <AsciiLogo lines={LOGO_LINES} />
        <p className="em-ascii-sr">Elite Motion</p>

        <div className="em-ascii-meta">
          <span>EL SALVADOR · AUDIOVISUAL</span>
          <nav className="em-ascii-nav">
            <Link href="/">Inicio</Link>
            <Link href="/precios">Precios</Link>
            <Link href="/portafolio">Portafolio</Link>
            <Link href="/contacto">Cotizar</Link>
          </nav>
          <span>© 2026</span>
        </div>

        <div className="em-ascii-social">
          <a href="https://wa.me/50377350934" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="https://www.facebook.com/elitemotion.sv/" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com/elitemotion_sv" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://tiktok.com/@elitemotion_sv" target="_blank" rel="noopener noreferrer">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
