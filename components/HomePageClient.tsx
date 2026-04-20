'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ─── Data ────────────────────────────────────────────────────── */
const stats = [
  { value: 10, suffix: '+', label: 'Proyectos Completados' },
  { value: 100, suffix: '%', label: 'Clientes Satisfechos' },
  { value: 100, suffix: '%', label: 'Calidad de Producción' },
  { value: 72, suffix: 'h', label: 'Respuesta Garantizada' },
];

const services = [
  {
    id: '01',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Video para Airbnb & Bienes Raíces',
    description: 'Tomas aéreas cinematográficas y recorridos inmersivos que elevan cualquier propiedad. Aumenta reservaciones con contenido de alta calidad que enamora a tus huéspedes antes de llegar.',
    tag: 'Inmobiliario',
    size: 'large',
    color: '#00e5ff',
  },
  {
    id: '02',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    title: 'Videos para Restaurantes & Negocios',
    description: 'Contenido visual que hace salivar y convierte. Producción de alto impacto para marcas, menús, aperturas y campañas de temporada.',
    tag: 'Restaurantes',
    size: 'medium',
    color: '#ff6b35',
  },
  {
    id: '03',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    title: 'Producción Comercial',
    description: 'Videos publicitarios y corporativos de calidad cinematográfica. Narrativas visuales que posicionan tu marca y generan ventas reales.',
    tag: 'Comercial',
    size: 'medium',
    color: '#a855f7',
  },
  {
    id: '04',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Cobertura de Eventos',
    description: 'Documentamos cada momento especial con calidad broadcast. Lanzamientos, bodas corporativas, conciertos y eventos de marca.',
    tag: 'Eventos',
    size: 'small',
    color: '#00e5ff',
  },
  {
    id: '05',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
        <circle cx="12" cy="13" r="4"></circle>
      </svg>
    ),
    title: 'Sesión de Fotos',
    description: 'Fotografía profesional para marcas, productos, eventos y retratos. Capturamos la esencia de tu negocio con imágenes de alta calidad.',
    tag: 'Fotografía',
    size: 'medium',
    color: '#ff6b35',
  },
  {
    id: '06',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Creación de Landing Pages',
    description: 'Diseño y desarrollo de páginas web optimizadas para conversiones. Destaca tu marca en línea con un sitio rápido y moderno.',
    tag: 'Desarrollo Web',
    size: 'large',
    color: '#a855f7',
  },
];

const whyUs = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: 'Estrategia Enfocada en Ventas',
    description: 'Cada video que producimos tiene un objetivo claro: atraer clientes y convertir. No solo creamos contenido bonito — creamos contenido que funciona.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
    ),
    title: 'Calidad Cinematográfica',
    description: 'Grabación y producción de alta calidad con equipos de última generación. Colorización profesional y audio de estudio en cada proyecto.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Entrega Rápida',
    description: 'Entendemos que tu negocio no puede esperar. Tiempos de entrega estrictos sin sacrificar ni un pixel de calidad.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: 'Optimizado para Redes Sociales',
    description: 'Formatos verticales, horizontales y cuadrados. Edición nativa para Instagram, TikTok, YouTube y más.',
  },
];

const portfolio = [
  { id: 2, type: 'image', url: '/img_portafolio/yaxhe_1.webp', label: 'Sesión de Producto', tag: 'Comercial', accent: 'linear-gradient(135deg,#1a0a0a 0%,#ff6b3522 100%)' },
  { id: 1, type: 'video', url: '/videos_vertical_portafolio/yaxhe_emprendimiento_sombreros_personalizados.mp4', label: 'Sombreros Personalizados', tag: 'Comercial', accent: 'linear-gradient(135deg,#0a1628 0%,#00e5ff22 100%)' },
  { id: 3, type: 'image', url: '/img_portafolio/Post 07.webp', label: 'Sesión Fotográfica', tag: 'Fotografía', accent: 'linear-gradient(135deg,#0d0a1a 0%,#a855f722 100%)' },
];

/* ─── WhatsApp number ──────────────────────────────────────────── */
const WA = 'https://wa.me/50377350934';

/* ─── Mobile detection hook ────────────────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function HomePageClient() {
  const isMobile = useIsMobile();

  /* refs for GSAP */
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaBtnsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const ctaFinalRef = useRef<HTMLDivElement>(null);

  /* ─── GSAP – Desktop animations only ───────────────────── */
  useEffect(() => {
    if (isMobile) return;

    let ctx: { revert?: () => void } = {};

    const load = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {

        /* ── Hero timeline ─────────────────────────────── */
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo(badgeRef.current,
          { opacity: 0, y: 30, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }
        )
          .fromTo(h1Ref.current,
            { opacity: 0, y: 50, filter: 'blur(12px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, '-=0.4'
          )
          .fromTo(subtitleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 }, '-=0.5'
          )
          .fromTo(ctaBtnsRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 }, '-=0.3'
          );

        /* ── Stats counters ────────────────────────────── */
        const statEls = document.querySelectorAll<HTMLElement>('.stat-number');
        statEls.forEach((el) => {
          const target = parseFloat(el.dataset.target || '0');
          gsap.fromTo(
            el,
            { innerText: 0 },
            {
              innerText: target,
              duration: 2,
              ease: 'power2.out',
              snap: { innerText: target < 10 ? 0.1 : 1 },
              scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
              onUpdate() { el.innerText = String(Math.round(parseFloat(el.innerText))); },
            }
          );
        });

        /* ── Services bento stagger ────────────────────── */
        gsap.fromTo(
          '.bento-card',
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: servicesRef.current, start: 'top 75%' },
          }
        );

        /* ── Why Us smooth scroll animation ──────────────────── */
        gsap.fromTo(
          '.why-card',
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: whyRef.current, start: 'top 75%' },
          }
        );

        /* Animated accent line */
        gsap.fromTo('.why-accent-line',
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: whyRef.current, start: 'top 80%' },
          }
        );

        /* ── Portfolio ─────────────────────────────────── */
        gsap.fromTo(
          '.portfolio-card',
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.7, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: portfolioRef.current, start: 'top 80%' },
          }
        );

        /* ── CTA Final ─────────────────────────────────── */
        gsap.fromTo(ctaFinalRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: ctaFinalRef.current, start: 'top 80%' },
          }
        );

      });
    };

    load();

    return () => { if (ctx.revert) ctx.revert(); };
  }, [isMobile]);

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>

      {/* ═══════════════════════════════════════════════════ HERO */}
      <section ref={heroRef} className="em-hero">
        {/* Mesh background */}
        <div className="em-hero-bg">
          <div className="hero-grid-lines" />
        </div>

        <div className="em-hero-content">
          <span ref={badgeRef} className="em-badge em-hero-badge" style={{ opacity: isMobile ? 1 : 0 }}>
          Producción Audiovisual en El Salvador
          </span>

          <h1 ref={h1Ref} className="em-hero-title" style={{ opacity: isMobile ? 1 : 0 }}>
            Contenido Visual que{' '}
            <span className="em-gradient-text">Atrae Clientes</span>{' '}
            y Hace Crecer tu Negocio
          </h1>

          <p ref={subtitleRef} className="em-hero-subtitle" style={{ opacity: isMobile ? 1 : 0 }}>
            Creamos videos comerciales, contenido para redes sociales y producción audiovisual
            de alto impacto para marcas, restaurantes, Airbnb y empresas en El Salvador.
          </p>

          <div ref={ctaBtnsRef} className="em-hero-btns" style={{ opacity: isMobile ? 1 : 0 }}>
            <Link href="/contacto" className="em-btn em-btn-primary">
              Iniciar Proyecto
            </Link>
            <Link href="/portafolio" className="em-btn em-btn-outline">
              Ver Portafolio
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="em-btn em-btn-wa">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="em-scroll-indicator">
            <div className="em-scroll-dot" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ STATS */}
      <section className="em-stats-section">
        <div ref={statsRef} className="em-stats-grid container">
          {stats.map((s) => (
            <div key={s.label} className="em-stat-card">
              <div className="em-stat-value">
                <span
                  className="stat-number"
                  data-target={s.value}
                >
                  {s.value}
                </span>
                <span className="em-stat-suffix">{s.suffix}</span>
              </div>
              <p className="em-stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════ SERVICES (BENTO) */}
      <section className="em-section">
        <div className="container">
          <div className="em-section-header">
            <span className="em-badge">Nuestros Servicios</span>
            <h2 className="em-section-title">
              Servicios de Producción Audiovisual<br />
              <span className="em-gradient-text">en El Salvador</span>
            </h2>
            <p className="em-section-sub">
              Soluciones visuales completas para cada industria y necesidad.
              Video marketing que convierte, conecta y vende.
            </p>
          </div>

          <div ref={servicesRef} className="em-bento-grid">
            {services.map((svc, i) => (
              <div
                key={svc.id}
                className={`bento-card em-bento-card em-bento-${svc.size}`}
                style={{
                  '--card-color': svc.color,
                  opacity: isMobile ? 1 : 0,
                } as React.CSSProperties}
              >
                <div className="em-bento-icon" style={{ color: svc.color }}>{svc.icon}</div>
                <span className="em-bento-tag">{svc.tag}</span>
                <h3 className="em-bento-title">{svc.title}</h3>
                <p className="em-bento-desc">{svc.description}</p>
                <div className="em-bento-num">{String(i + 1).padStart(2, '0')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ WHY US */}
      <section className="em-section">
        <div className="container">
          <div className="em-section-header">
            <span className="em-badge">Diferenciación</span>
            <h2 className="em-section-title">¿Por qué elegir<br /><span className="em-gradient-text">Elite Motion?</span></h2>
            <div className="why-accent-line em-accent-line" />
          </div>

          <div ref={whyRef} className="em-why-grid">
            {whyUs.map((item, i) => (
              <div
                key={item.title}
                className="why-card em-why-card em-bento-card"
                style={{
                  '--card-color': 'var(--em-accent)',
                  opacity: isMobile ? 1 : 0
                } as React.CSSProperties}
              >
                <div className="em-bento-icon" style={{ color: 'var(--em-accent)' }}>{item.icon}</div>
                <h3 className="em-bento-title">{item.title}</h3>
                <p className="em-bento-desc">{item.description}</p>
                <div className="em-bento-num">{String(i + 1).padStart(2, '0')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ PORTFOLIO PREVIEW */}
      <section className="em-section">
        <div className="container">
          <div className="em-section-header">
            <span className="em-badge">Portafolio</span>
            <h2 className="em-section-title">
              Producción Visual de<br /><span className="em-gradient-text">Alto Impacto</span>
            </h2>
            <p className="em-section-sub">
              Cada proyecto es una historia contada con imágenes que venden.
            </p>
          </div>

          <div ref={portfolioRef} className="em-portfolio-grid">
            {portfolio.map((item) => (
              <div
                key={item.id}
                className="portfolio-card em-portfolio-card"
                style={{
                  background: item.accent,
                  opacity: isMobile ? 1 : 0,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {item.type === 'video' ? (
                  <video 
                    src={item.url} 
                    muted 
                    loop 
                    playsInline 
                    autoPlay 
                    className="portfolio-bg-media"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      zIndex: 0,
                      transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
                    }}
                  />
                ) : (
                  <img 
                    src={item.url} 
                    alt={item.label}
                    className="portfolio-bg-media"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      zIndex: 0,
                      transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.3, 1)'
                    }}
                  />
                )}

                <div className="em-portfolio-overlay" style={{ zIndex: 1 }}>

                  <div className="em-portfolio-info">
                    <span className="em-portfolio-tag">{item.tag}</span>
                    <p className="em-portfolio-label">{item.label}</p>
                  </div>
                </div>

                {/* Cinematic film-grain texture overlay */}
                <div className="em-film-grain" style={{ zIndex: 2 }} />

                {/* Decorative camera/film elements */}
                <div className="em-portfolio-deco" style={{ zIndex: 2 }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className="em-portfolio-cta">
            <Link href="/portafolio" className="em-btn em-btn-outline">
              Ver Todos los Proyectos →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ COBERTURA 3D */}
      <section className="em-coverage-section">
        <div className="container em-coverage-grid">
          <div className="em-coverage-content">
            <span className="em-badge" style={{ display: 'inline-block', padding: '0.35rem 1rem', background: 'rgba(0, 229, 255, 0.1)', color: '#00e5ff', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid rgba(0, 229, 255, 0.25)' }}>
              Área de Cobertura
            </span>
            <h2 className="em-section-title" style={{ margin: '20px 0', textAlign: 'left', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}>
              Llegamos a <span className="em-gradient-text">todo El Salvador</span>
            </h2>
            <p className="em-section-sub" style={{ marginBottom: '40px', maxWidth: '85%', textAlign: 'left', fontSize: '0.95rem' }}>
              Nuestra base operativa se encuentra en <strong>San Salvador</strong>, donde ofrecemos cobertura total sin cargos adicionales.
            </p>
            
            <div className="em-coverage-features">
              <div className="em-coverage-item">
                <div className="em-coverage-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="em-feature-title">San Salvador (Zona Central)</h3>
                  <p className="em-feature-p">Cobertura estándar incluida en todos los paquetes prioritarios.</p>
                </div>
              </div>
              <div className="em-coverage-item">
                <div className="em-coverage-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="em-feature-title">Resto de Departamentos</h3>
                  <p className="em-feature-p">Disponibilidad nacional con logística optimizada según tu ubicación.</p>
                </div>
              </div>
            </div>
            
            <div className="em-coverage-cta">
              <p>Proyectos fuera de la capital llevan un cargo adicional por transporte. <br/><strong>Contáctanos para una cotización exacta.</strong></p>
            </div>
          </div>

          <div className="em-map-container">
            <div className="em-map-3d-wrapper">
              <div className="em-map-base">
                <svg viewBox="50 0 830 510" className="em-svg-map">
                  <defs>
                    <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
                    </radialGradient>
                    <filter id="boxGlow">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* High Accuracy Dotted Map from /public/dotted_elsalvador.svg */}
                  <image 
                    href="/dotted_elsalvador.svg" 
                    width="824.76" 
                    height="508.41" 
                    x="51.95" 
                    y="21.33"
                    className="em-map-image-filtered"
                  />

                  {/* San Salvador Hub */}
                  <circle cx="385" cy="260" r="45" fill="url(#hubGlow)" className="em-map-hub-glow" />
                  
                  <g className="em-ss-marker">
                    <circle cx="385" cy="260" r="4" fill="#00e5ff" filter="url(#boxGlow)" />
                    <circle cx="385" cy="260" r="10" fill="none" stroke="#00e5ff" strokeWidth="1" opacity="0.6">
                      <animate attributeName="r" from="4" to="30" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.6" to="0" dur="3s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* HUD Markers */}
                  <foreignObject x="340" y="190" width="300" height="150" overflow="visible">
                    <div className="em-hud-label active" style={{ width: 'max-content' }}>
                       <div className="hud-dot"></div>
                       <div className="hud-text">
                         <span className="hud-title">San Salvador</span>
                         <span className="hud-status">ZONA CENTRAL</span>
                       </div>
                    </div>
                  </foreignObject>

                  <foreignObject x="540" y="280" width="300" height="150" overflow="visible">
                    <div className="em-hud-label" style={{ width: 'max-content' }}>
                       <div className="hud-dot dim"></div>
                       <div className="hud-text">
                         <span className="hud-title">Nacional</span>
                         <span className="hud-status">RESTO DEL PAÍS</span>
                       </div>
                    </div>
                  </foreignObject>
                </svg>
              </div>
            </div>
            <div className="em-map-reflection"></div>
          </div>
        </div>

        <style jsx>{`
          .em-coverage-section {
            padding: 120px 0;
            background: #020202;
            position: relative;
            overflow: hidden;
          }

          .em-coverage-grid {
            display: grid;
            grid-template-columns: 1.1fr 1.3fr;
            gap: 60px;
            align-items: center;
          }

          .em-feature-title {
            font-size: 1rem;
            margin-bottom: 4px;
            color: #fff;
            font-weight: 700;
          }

          .em-feature-p {
             font-size: 0.88rem;
             color: rgba(255, 255, 255, 0.45);
             line-height: 1.5;
          }

          .em-coverage-features {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .em-coverage-item {
            display: flex;
            gap: 16px;
            background: rgba(255, 255, 255, 0.02);
            padding: 20px;
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .em-coverage-item:hover {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(0, 229, 255, 0.2);
            transform: translateX(8px);
          }

          .em-coverage-icon {
            background: rgba(0, 229, 255, 0.05);
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            flex-shrink: 0;
            border: 1px solid rgba(0, 229, 255, 0.1);
          }

          .em-coverage-cta {
             margin-top: 32px;
             font-size: 0.9rem;
             color: rgba(255, 255, 255, 0.5);
             padding: 20px;
             border-radius: 4px;
             border: 1px solid rgba(255, 255, 255, 0.03);
             background: linear-gradient(to right, rgba(255,255,255,0.01), transparent);
          }

          .em-coverage-cta strong {
             color: #00e5ff;
          }

          .em-badge {
            display: inline-block;
            padding: 8px 20px;
            background: rgba(0, 229, 255, 0.08);
            color: #00e5ff;
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            border-left: 3px solid #00e5ff;
          }

          .em-section-sub {
            color: rgba(255, 255, 255, 0.6);
            font-size: 1.25rem;
            margin-bottom: 48px;
            line-height: 1.5;
            max-width: 90%;
          }

          .em-coverage-features {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .em-coverage-item {
            display: flex;
            gap: 20px;
            background: rgba(255, 255, 255, 0.03);
            padding: 24px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .em-coverage-item:hover {
            background: rgba(0, 229, 255, 0.04);
            border-color: rgba(0, 229, 255, 0.3);
            transform: translateY(-5px);
          }

          .em-coverage-icon {
            font-size: 2rem;
            background: rgba(0, 229, 255, 0.1);
            width: 64px;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            flex-shrink: 0;
          }

          .em-coverage-item h3 {
             font-size: 1.3rem;
             margin-bottom: 6px;
             color: #fff;
             font-weight: 700;
          }

          .em-coverage-item p {
             font-size: 1rem;
             color: rgba(255, 255, 255, 0.5);
             line-height: 1.4;
          }

          /* 3D MAP STYLES */
          .em-map-container {
            position: relative;
            height: 600px;
            display: flex;
            align-items: center;
            justify-content: center;
            perspective: 2500px;
          }

          .em-map-3d-wrapper {
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transform: rotateX(22deg) rotateZ(-12deg) translateY(-40px);
            transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          }

          .em-map-container:hover .em-map-3d-wrapper {
            transform: rotateX(15deg) rotateZ(-8deg) translateY(-10px);
          }

          .em-svg-map {
            width: 100%;
            height: 100%;
            overflow: visible;
          }

          .em-hud-label {
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(12px);
            padding: 10px 16px;
            border-radius: 4px;
            border-left: 2px solid rgba(255, 255, 255, 0.2);
            color: #fff;
            box-shadow: 0 10px 30px rgba(0,0,0,0.6);
            /* Counter-rotate for readability at current map angle */
            transform: rotateZ(12deg) rotateX(-22deg) scale(1.1);
            transition: all 0.8s ease;
            white-space: nowrap;
          }

          .em-map-container:hover .em-hud-label {
            transform: rotateZ(8deg) rotateX(-15deg) scale(1.2);
          }

          .em-hud-label.active {
            border-left-color: #00e5ff;
          }

          .hud-dot {
            width: 8px;
            height: 8px;
            background: #00e5ff;
            border-radius: 50%;
            box-shadow: 0 0 10px #00e5ff;
          }

          .hud-dot.dim {
            background: #666;
            box-shadow: none;
          }

          .hud-text {
            display: flex;
            flex-direction: column;
          }

          .hud-title {
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }

          .hud-status {
            font-size: 0.65rem;
            color: rgba(255, 255, 255, 0.5);
            font-weight: 500;
          }

          .em-map-hub-glow {
            animation: hubPulse 3.5s infinite ease-in-out;
          }

          .em-map-reflection {
            position: absolute;
            bottom: 8%;
            width: 160%;
            height: 45%;
            background: 
              radial-gradient(ellipse at center, rgba(168, 85, 247, 0.12) 0%, transparent 60%),
              radial-gradient(ellipse at center, rgba(0, 229, 255, 0.18) 10%, transparent 50%);
            transform: rotateX(75deg);
            pointer-events: none;
            z-index: 0;
            filter: blur(50px);
            opacity: 0.85;
          }

          @keyframes hubPulse {
            0%, 100% { opacity: 0.4; transform: scale(0.9); }
            50% { opacity: 0.7; transform: scale(1.15); }
          }

          @media (max-width: 968px) {
            .em-coverage-grid {
              grid-template-columns: 1fr;
              gap: 30px;
            }
            .em-map-container {
               height: 400px;
               order: -1;
               margin-bottom: 40px;
            }
            .em-hud-label {
               transform: rotateZ(12deg) rotateX(-55deg) scale(0.85);
            }
            .em-section-title {
               font-size: 2.8rem;
            }
          }
        `}</style>
      </section>



      <section className="em-cta-section">
        <div ref={ctaFinalRef} className="container em-cta-inner" style={{ opacity: isMobile ? 1 : 0 }}>
          <span className="em-badge">¿Listo para Crecer?</span>
          <h2 className="em-cta-title">
            ¿Listo para atraer más clientes<br />con <span className="em-gradient-text">video marketing</span>?
          </h2>
          <p className="em-cta-sub">
            Cuéntanos tu proyecto. Respuesta garantizada en menos de 24 horas.
            Producción audiovisual profesional en El Salvador al alcance de tu negocio.
          </p>
          <div className="em-cta-btns">
            <Link href="/contacto" className="em-btn em-btn-primary em-pulse">
              Solicitar Cotización
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="em-btn em-btn-wa">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
