'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/precios', label: 'Precios' },
    { href: '/portafolio', label: 'Portafolio' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header style={{
            position: 'fixed',
            top: '1rem',
            left: '1rem',
            right: '1rem',
            margin: '0 auto',
            width: 'auto',
            maxWidth: '1200px',
            zIndex: 100,
            padding: '0.3rem 1.25rem',
            background: 'rgba(5, 5, 5, 0.45)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
        }}>
            <div className="container flex-between" style={{ padding: 0, width: '100%', maxWidth: '100%' }}>
                {/* Logo */}
                <Link href="/" className="nav-logo-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 1, minWidth: 0 }}>
                    <Image
                        src="/imagotipo_blanco.png"
                        alt="Elite Motion"
                        width={280}
                        height={85}
                        className="nav-logo"
                        priority
                        style={{ 
                            objectFit: 'contain',
                            width: 'auto',
                            maxWidth: '100%'
                        }}
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="flex gap-4" style={{ display: 'none' }} id="desktop-nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                padding: '0.5rem 1rem',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                letterSpacing: '0.05em',
                                color: pathname === link.href ? 'var(--accent)' : 'var(--text-secondary)',
                                transition: 'color var(--transition-fast)',
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <a
                        href="https://wa.me/50377350934"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '0.5rem',
                            padding: '0.5rem',
                            borderRadius: '8px',
                            transition: 'all 0.2s ease',
                        }}
                        aria-label="WhatsApp"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </a>
                    <Link href="/contacto" className="btn btn-primary" style={{ marginLeft: '0.5rem', padding: '0.75rem 1.5rem' }}>
                        Cotizar
                    </Link>
                </nav>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="mobile-toggle"
                    style={{
                        display: 'flex',
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        flexShrink: 0,
                        zIndex: 101,
                    }}
                    aria-label="Toggle menu"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        {isOpen ? (
                            <path d="M6 6l12 12M6 18L18 6" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div
                    id="mobile-nav"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        padding: '1.25rem 0.5rem',
                        marginTop: '0.75rem',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        animation: 'fadeInSlide 0.3s ease forwards',
                    }}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            style={{
                                padding: '0.875rem 1rem',
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: pathname === link.href ? 'var(--em-accent)' : 'rgba(255,255,255,0.7)',
                                borderRadius: '12px',
                                background: pathname === link.href ? 'rgba(0,229,255,0.05)' : 'transparent',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0.5rem 0' }} />
                    <Link
                        href="/contacto"
                        className="em-btn em-btn-primary"
                        onClick={() => setIsOpen(false)}
                        style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                    >
                        Solicitar Cotización
                    </Link>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeInSlide {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
        @media (min-width: 991px) {
          #desktop-nav {
            display: flex !important;
          }
          .mobile-toggle, #mobile-nav {
            display: none !important;
          }
        }
        @media (max-width: 990px) {
          #desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
          header {
            max-width: 95% !important;
          }
          .nav-logo {
            height: 60px !important;
          }
        }
        @media (max-width: 480px) {
          header {
            top: 0.5rem !important;
            padding: 0.2rem 0.8rem !important;
          }
          .nav-logo {
            height: 45px !important;
          }
          .mobile-toggle svg {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
        </header>
    );
}
