import type { Metadata } from 'next';
import Link from 'next/link';
import AsciiLogo from '@/components/ui/AsciiLogo';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
};

const LOGO_LINES = ['ELITE', 'MOTION'];

export default function NotFound() {
  return (
    <section className="em-ascii-footer em-404">
      <div className="container">
        <p className="em-eyebrow em-404-kicker">Error — 404</p>
        <AsciiLogo lines={LOGO_LINES} />
        <p className="em-ascii-sr">Elite Motion</p>

        <h1 className="em-404-title em-serif">Esta página no está en el set.</h1>
        <p className="em-404-lede">
          La dirección no corresponde a ningún proyecto, tarifa ni ruta de este sitio.
        </p>

        <div className="em-ascii-meta">
          <span>EL SALVADOR · AUDIOVISUAL</span>
          <nav className="em-ascii-nav">
            <Link href="/">Inicio</Link>
            <Link href="/precios">Precios</Link>
            <Link href="/portafolio">Portafolio</Link>
            <Link href="/contacto">Cotizar</Link>
          </nav>
          <span>404</span>
        </div>

        <div className="em-404-actions">
          <Link href="/" className="em-btn em-btn-primary">
            Volver al inicio
          </Link>
          <Link href="/portafolio" className="em-btn em-btn-outline">
            Ver portafolio
          </Link>
          <Link href="/contacto" className="em-btn em-btn-ghost">
            Cotizar
          </Link>
        </div>
      </div>
    </section>
  );
}
