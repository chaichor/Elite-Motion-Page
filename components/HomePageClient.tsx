'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useReveal } from '@/lib/useReveal';
import { PixelReveal } from '@/components/ui/PixelReveal';
import { KineticText } from '@/components/ui/KineticText';
import { HyperText } from '@/components/ui/HyperText';
import { RippleLink } from '@/components/ui/RippleButton';
import FlickeringGrid from '@/components/ui/FlickeringGrid';
import ProjectCluster, { type ClusterItem } from '@/components/ui/ProjectCluster';
import { clusterStills, coverStill, homeProjects } from '@/lib/projects';
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from '@/components/ui/ScrollBasedVelocity';

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
    title: 'Video para Airbnb & Bienes Raíces',
    description: 'Tomas aéreas cinematográficas y recorridos inmersivos que elevan cualquier propiedad. Aumenta reservaciones con contenido de alta calidad que enamora a tus huéspedes antes de llegar.',
    tag: 'Inmobiliario',
  },
  {
    id: '02',
    title: 'Videos para Restaurantes & Negocios',
    description: 'Contenido visual que hace salivar y convierte. Producción de alto impacto para marcas, menús, aperturas y campañas de temporada.',
    tag: 'Restaurantes',
  },
  {
    id: '03',
    title: 'Producción Comercial',
    description: 'Videos publicitarios y corporativos de calidad cinematográfica. Narrativas visuales que posicionan tu marca y generan ventas reales.',
    tag: 'Comercial',
  },
  {
    id: '04',
    title: 'Cobertura de Eventos',
    description: 'Documentamos cada momento especial con calidad broadcast. Lanzamientos, bodas corporativas, conciertos y eventos de marca.',
    tag: 'Eventos',
  },
  {
    id: '05',
    title: 'Sesión de Fotos',
    description: 'Fotografía profesional para marcas, productos, eventos y retratos. Capturamos la esencia de tu negocio con imágenes de alta calidad.',
    tag: 'Fotografía',
  },
  {
    id: '06',
    title: 'Creación de Landing Pages',
    description: 'Diseño y desarrollo de páginas web optimizadas para conversiones. Destaca tu marca en línea con un sitio rápido y moderno.',
    tag: 'Desarrollo web',
  },
];

const whyUs = [
  {
    id: '01',
    title: 'Estrategia enfocada en ventas',
    description: 'Cada video que producimos tiene un objetivo claro: atraer clientes y convertir. No solo creamos contenido bonito — creamos contenido que funciona.',
  },
  {
    id: '02',
    title: 'Calidad cinematográfica',
    description: 'Grabación y producción de alta calidad con equipos de última generación. Colorización profesional y audio de estudio en cada proyecto.',
  },
  {
    id: '03',
    title: 'Entrega rápida',
    description: 'Entendemos que tu negocio no puede esperar. Tiempos de entrega estrictos sin sacrificar ni un pixel de calidad.',
  },
  {
    id: '04',
    title: 'Optimizado para redes',
    description: 'Formatos verticales, horizontales y cuadrados. Edición nativa para Instagram, TikTok, YouTube y más.',
  },
];

const coverage = [
  {
    id: '01',
    title: 'San Salvador',
    tag: 'Zona central',
    description: 'Cobertura estándar incluida en todos los paquetes. Sin cargos extra por desplazamiento en la capital.',
  },
  {
    id: '02',
    title: 'Resto de departamentos',
    tag: 'Nacional',
    description: 'Disponibilidad en todo el país. El transporte se cotiza aparte, según distancia y logística del rodaje.',
  },
];

/* ─── WhatsApp number ──────────────────────────────────────────── */
const WA = 'https://wa.me/50377350934';

/* ─── Mobile detection hook ────────────────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const check = () =>
      setIsMobile(window.innerWidth < 768 || document.documentElement.classList.contains('em-lite'));
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function HomePageClient() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  useReveal('.portfolio-card, .em-ed-row, .em-cta-inner');

  /* Hovered cluster tile, printed as a readout under the hero. */
  const [focused, setFocused] = useState<(ClusterItem & { index: number }) | null>(null);

  /* refs for GSAP */
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLOListElement>(null);
  const whyRef = useRef<HTMLOListElement>(null);
  const ctaFinalRef = useRef<HTMLDivElement>(null);

  /* ─── GSAP – Desktop animations only ───────────────────── */
  useEffect(() => {
    if (isMobile || reduced) return;

    let ctx: { revert?: () => void } = {};
    let cancelled = false;

    const load = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {

        /* The hero entrance is pure CSS now (KineticText owns the headline,
           `.em-hero-enter` owns everything under it), so GSAP is left with the
           scroll-driven pieces only. */

        /* `from` with immediateRender off keeps the real figures on screen until
           the counter is actually scrolled into view. */
        document.querySelectorAll<HTMLElement>('.stat-number').forEach((el) => {
          gsap.from(el, {
            innerText: 0,
            duration: 1.6,
            ease: 'power2.out',
            immediateRender: false,
            snap: { innerText: 1 },
            scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
            onUpdate() { el.innerText = String(Math.round(parseFloat(el.innerText))); },
          });
        });

        gsap.fromTo('.why-accent-line',
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: whyRef.current, start: 'top 80%', once: true },
          }
        );

      });
    };

    load();

    return () => {
      cancelled = true;
      if (ctx.revert) ctx.revert();
    };
  }, [isMobile, reduced]);

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>

      {/* ═══════════════════════════════════════════════════ HERO */}
      <section ref={heroRef} className="em-hero em-hero-cluster">
        <div className="em-hero-bg">
          <div className="em-flicker-host">
            <FlickeringGrid squareSize={6} gridGap={16} flickerChance={0.14} maxOpacity={0.16} />
          </div>
        </div>

        <div className="container em-hero-head">
          <span className="em-eyebrow em-hero-enter">Elite Motion · El Salvador</span>
          <KineticText
            as="h1"
            className="em-hero-title"
            text={'Producción visual para\nmarcas que venden'}
            highlight="que venden"
          />
          <HyperText
            as="p"
            className="em-hero-subtitle em-hero-enter"
            text="Video, fotografía y dron para restaurantes, Airbnb, inmobiliaria y marcas que necesitan verse mejor que su competencia."
            delay={isMobile ? 0 : 900}
          />
        </div>

        <div className="em-hero-stage">
          <ProjectCluster items={clusterStills} onFocusItem={setFocused} />
          <div className="em-hero-mark">
            <Image src="/logo_white.svg" alt="" width={120} height={120} priority />
          </div>
        </div>

        <div className="container em-hero-foot">
          <p className="em-hero-readout" data-on={focused ? 'true' : 'false'}>
            {focused ? (
              <>
                <b>({String(focused.index + 1).padStart(2, '0')})</b>
                {focused.title} — {focused.tag}
              </>
            ) : (
              'Fotografía · Video · Dron · Motion'
            )}
          </p>

          <div className="em-hero-btns em-hero-enter">
            <RippleLink href="/contacto" className="em-btn em-btn-primary">
              Iniciar Proyecto
            </RippleLink>
            <RippleLink
              href="/portafolio"
              className="em-btn em-btn-outline"
              rippleColor="rgba(0, 229, 255, 0.28)"
            >
              Ver Portafolio
            </RippleLink>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="em-btn em-btn-ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ SCROLL VELOCITY */}
      <section className="em-velocity-band" aria-hidden="true">
        <ScrollVelocityContainer>
          <ScrollVelocityRow baseVelocity={3} direction={1} className="em-velocity-serif">
            Fotografía — Video — Dron — Motion — Fotografía — Video — Dron — Motion —&nbsp;
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={3} direction={-1} className="em-velocity-outline">
            ELITE MOTION · ELITE MOTION · ELITE MOTION ·&nbsp;
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </section>

      {/* ═══════════════════════════════════════════ PROJECT INDEX */}
      <section className="em-section">
        <div className="container">
          <div className="em-section-header">
            <KineticText
              as="h2"
              className="em-section-title"
              text={'Proyectos entregados,\nno mockups'}
              highlight="no mockups"
            />
            <HyperText
              as="p"
              className="em-section-sub"
              text="Cada marca con la que trabajamos tiene su propio expediente visual. Estos son los últimos."
            />
          </div>

          <ol className="em-portfolio-grid">
            {homeProjects.map((project, i) => {
              const still = coverStill(project);
              return (
              <li key={project.slug} className="portfolio-card em-index-card">
                <Link
                  href="/portafolio"
                  className="em-index-link"
                  aria-label={`Ver el proyecto ${project.title}`}
                >
                  <span className="em-index-frame">
                    <PixelReveal fill grid="8x8" seed={i + 1}>
                      {still ? (
                        still.src.includes('%23') ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={still.src}
                            alt={still.alt}
                            className="portfolio-bg-media"
                            draggable={false}
                          />
                        ) : (
                          <Image
                            src={still.src}
                            alt={still.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            quality={70}
                            className="portfolio-bg-media"
                            draggable={false}
                          />
                        )
                      ) : (
                        <video
                          src={project.cover.src}
                          muted
                          playsInline
                          preload="metadata"
                          className="portfolio-bg-media"
                          controlsList="nodownload noplaybackrate noremoteplayback"
                          disablePictureInPicture
                          disableRemotePlayback
                        />
                      )}
                    </PixelReveal>
                  </span>

                  <span className="em-index-meta">
                    <span className="em-work-num">({String(i + 1).padStart(2, '0')})</span>
                    <span className="em-index-name">{project.title}</span>
                    <span className="em-work-cat">{project.category}</span>
                  </span>
                </Link>
              </li>
              );
            })}
          </ol>

          <div className="em-portfolio-cta">
            <RippleLink
              href="/portafolio"
              className="em-btn em-btn-outline"
              rippleColor="rgba(0, 229, 255, 0.28)"
            >
              Ver Todos los Proyectos →
            </RippleLink>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ STATS */}
      <section ref={statsRef} className="em-stats">
        <div className="container">
          <div className="em-stats-head">
            <span className="em-label">Cifras — no promesas</span>
            <p className="em-stats-kicker">El recuento de lo que ya se grabó, editó y entregó.</p>
          </div>
          <div className="em-stats-row">
            {stats.map((s) => (
              <div key={s.label} className="em-stat">
                <div className="em-stat-value">
                  <span className="stat-number" data-target={s.value}>
                    {s.value}
                  </span>
                  <span className="em-stat-suffix">{s.suffix}</span>
                </div>
                <p className="em-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ SERVICES */}
      <section className="em-section">
        <div className="container">
          <div className="em-section-header">
            <span className="em-label">Qué hacemos</span>
            <KineticText
              as="h2"
              className="em-section-title"
              text={'Servicios de producción\nen El Salvador'}
              highlight="en El Salvador"
            />
            <HyperText
              as="p"
              className="em-section-sub"
              text="Seis líneas de trabajo. El mismo criterio: material que se publica y vende, no un reel de demostración."
            />
          </div>

          <ol ref={servicesRef} className="em-ed-list">
            {services.map((svc) => (
              <li key={svc.id} className="em-ed-row">
                <span className="em-ed-num">({svc.id})</span>
                <div>
                  <span className="em-ed-tag">{svc.tag}</span>
                  <h3 className="em-ed-title">{svc.title}</h3>
                  <p className="em-ed-copy">{svc.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ WHY US */}
      <section className="em-section">
        <div className="container">
          <div className="em-section-header">
            <span className="em-label">Por qué nosotros</span>
            <KineticText
              as="h2"
              className="em-section-title"
              text={'¿Por qué elegir\nElite Motion?'}
              highlight="Elite Motion?"
            />
          </div>

          <ol ref={whyRef} className="em-ed-list em-ed-list--why">
            {whyUs.map((item) => (
              <li key={item.id} className="em-ed-row">
                <span className="em-ed-num">({item.id})</span>
                <div>
                  <h3 className="em-ed-title">{item.title}</h3>
                  <p className="em-ed-copy">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ COBERTURA */}
      <section className="em-section em-coverage">
        <div className="container em-coverage-grid">
          <div>
            <div className="em-section-header em-section-header--left">
              <span className="em-label">Cobertura nacional</span>
              <KineticText
                as="h2"
                className="em-section-title"
                text={'Llegamos a\ntodo El Salvador'}
                highlight="todo El Salvador"
              />
              <HyperText
                as="p"
                className="em-section-sub"
                text="Base en San Salvador. Rodamos en todo el país — el traslado se cotiza cuando sales de la capital."
              />
            </div>

            <ol className="em-ed-list em-ed-list--stack">
              {coverage.map((item) => (
                <li key={item.id} className="em-ed-row">
                  <span className="em-ed-num">({item.id})</span>
                  <div>
                    <span className="em-ed-tag">{item.tag}</span>
                    <h3 className="em-ed-title">{item.title}</h3>
                    <p className="em-ed-copy">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="em-coverage-note">
              Proyectos fuera de la capital llevan un cargo adicional por transporte.{' '}
              <Link href="/contacto" className="em-inline">
                Pedir cotización exacta
              </Link>
            </p>
          </div>

          <div className="em-map-container" aria-hidden="true">
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

                  <image
                    href="/dotted_elsalvador.svg"
                    width="824.76"
                    height="508.41"
                    x="51.95"
                    y="21.33"
                    className="em-map-image-filtered"
                  />

                  <circle cx="385" cy="260" r="45" fill="url(#hubGlow)" className="em-map-hub-glow" />

                  <g className="em-ss-marker">
                    <circle cx="385" cy="260" r="4" fill="#00e5ff" filter="url(#boxGlow)" />
                    <circle cx="385" cy="260" r="10" fill="none" stroke="#00e5ff" strokeWidth="1" opacity="0.6">
                      <animate attributeName="r" from="4" to="30" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.6" to="0" dur="3s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  <foreignObject x="340" y="190" width="300" height="150" overflow="visible">
                    <div className="em-hud-label active" style={{ width: 'max-content' }}>
                      <div className="hud-dot" />
                      <div className="hud-text">
                        <span className="hud-title">San Salvador</span>
                        <span className="hud-status">Zona central</span>
                      </div>
                    </div>
                  </foreignObject>

                  <foreignObject x="540" y="280" width="300" height="150" overflow="visible">
                    <div className="em-hud-label" style={{ width: 'max-content' }}>
                      <div className="hud-dot dim" />
                      <div className="hud-text">
                        <span className="hud-title">Nacional</span>
                        <span className="hud-status">Resto del país</span>
                      </div>
                    </div>
                  </foreignObject>
                </svg>
              </div>
            </div>
            <div className="em-map-reflection" />
          </div>
        </div>
      </section>

      <section className="em-cta-section">
        <div className="em-flicker-host">
          <FlickeringGrid squareSize={3} gridGap={8} flickerChance={0.35} maxOpacity={0.22} />
        </div>
        <div ref={ctaFinalRef} className="container em-cta-inner">
          <KineticText
            as="h2"
            className="em-cta-title"
            text={'¿Listo para atraer más clientes\ncon video marketing?'}
            highlight="video marketing"
          />
          <HyperText
            as="p"
            className="em-cta-sub"
            text="Cuéntanos tu proyecto. Respuesta garantizada en menos de 24 horas. Producción audiovisual profesional en El Salvador al alcance de tu negocio."
          />
          <div className="em-cta-btns">
            <RippleLink href="/contacto" className="em-btn em-btn-primary em-pulse">
              Solicitar Cotización
            </RippleLink>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="em-btn em-btn-ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
