'use client';

import Link from 'next/link';
import { useState } from 'react';

const WA = 'https://wa.me/50377350934';

/* ─── Data ─────────────────────────────────────────────── */

const inmobiliariosPlans = [
  {
    id: 'basico',
    name: 'Básico',
    price: 180,
    badge: null,
    features: {
      'Fotografías profesionales': '6 fotos',
      'Fotos aéreas con dron': '2 fotos',
      'Videos cortos de la propiedad': '1 video',
      'Dron incluido en video': true,
      'Edición': 'Básica',
      'Correcciones incluidas': '—',
      'Motion graphics y animaciones': false,
      'Efectos 3D': false,
      'Dron FPV (recorrido interior)': false,
      'Estrategia de contenido + guión': true,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 300,
    badge: 'Más Popular',
    features: {
      'Fotografías profesionales': '12 fotos',
      'Fotos aéreas con dron': '4 fotos',
      'Videos cortos de la propiedad': '2 videos',
      'Dron incluido en video': true,
      'Edición': 'Intermedia',
      'Correcciones incluidas': '1',
      'Motion graphics y animaciones': true,
      'Efectos 3D': false,
      'Dron FPV (recorrido interior)': false,
      'Estrategia de contenido + guión': true,
    },
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 500,
    badge: null,
    features: {
      'Fotografías profesionales': '16 fotos',
      'Fotos aéreas con dron': '8 fotos',
      'Videos cortos de la propiedad': '4 videos',
      'Dron incluido en video': true,
      'Edición': 'Avanzada',
      'Correcciones incluidas': '2',
      'Motion graphics y animaciones': true,
      'Efectos 3D': true,
      'Dron FPV (recorrido interior)': 'Opcional',
      'Estrategia de contenido + guión': true,
    },
  },
];

const redesPlans = [
  {
    id: 'inicial',
    name: 'Inicial',
    price: 150,
    badge: null,
    features: {
      'Grabación': 'Profesional HD',
      'Videos cortos para redes': '3 videos',
      'Fotos para redes': '8 fotos',
      'Historias': '4 historias',
      'Carruseles': '2 carruseles',
      'Grabación con dron FPV/estabilizado': false,
      'Edición': 'Básica',
      'Correcciones': '1 sencilla',
      'Estrategia de contenido + guión': true,
      'Entrega lista para publicar': true,
    },
  },
  {
    id: 'pro-redes',
    name: 'Pro',
    price: 290,
    badge: 'Más Solicitado',
    features: {
      'Grabación': 'Profesional HD',
      'Videos cortos para redes': '5 videos',
      'Fotos para redes': '12 fotos',
      'Historias': '6 historias',
      'Carruseles': '4 carruseles',
      'Grabación con dron FPV/estabilizado': false,
      'Edición': 'Personalizada',
      'Correcciones': '2',
      'Estrategia de contenido + guión': true,
      'Entrega lista para publicar': true,
    },
  },
  {
    id: 'elite-redes',
    name: 'Elite',
    price: 400,
    badge: null,
    features: {
      'Grabación': 'Profesional HD',
      'Videos cortos para redes': '8 videos',
      'Fotos para redes': '20 fotos',
      'Historias': '8 historias',
      'Carruseles': '6 carruseles',
      'Grabación con dron FPV/estabilizado': true,
      'Edición': 'Avanzada Premium',
      'Correcciones': '3',
      'Estrategia de contenido + guión': true,
      'Entrega lista para publicar': true,
    },
  },
];

const fotoPlans = [
  {
    id: 'foto-basico',
    name: 'Básico',
    price: 60,
    badge: null,
    features: {
      'Fotografías profesionales': '16 fotos',
      'Duración de sesión': '60 minutos',
      'Edición': 'Básica HD',
    },
  },
  {
    id: 'foto-pro',
    name: 'Pro',
    price: 80,
    badge: 'Más Popular',
    features: {
      'Fotografías profesionales': '25 fotos',
      'Duración de sesión': '1 hora 30 min',
      'Edición': 'Avanzada',
    },
  },
  {
    id: 'foto-elite',
    name: 'Elite',
    price: 120,
    badge: null,
    features: {
      'Fotografías profesionales': '35 fotos',
      'Duración de sesión': '2 horas',
      'Edición': 'Elite',
    },
  },
];

const quoteServices = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    title: 'Producción Comercial',
    reason: 'Cada campaña publicitaria requiere planificación de locaciones, actores, iluminación profesional, múltiples días de rodaje y postproducción avanzada. Las variables son únicas por proyecto.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Cobertura de Eventos',
    reason: 'La duración, el número de camarógrafos requeridos, el tipo de evento y los entregables varían enormemente. Un evento de 2 horas no es igual a uno de 8 horas con transmisión en vivo.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Creación de Landing Pages',
    reason: 'El diseño web depende del nivel de complejidad, número de secciones, integraciones (formularios, pagos, CRM), animaciones personalizadas y el tiempo de desarrollo necesario.',
  },
];

/* ─── Sub-components ────────────────────────────────────── */

type Plan = {
  id: string;
  name: string;
  price: number;
  badge: string | null;
  features: Record<string, string | boolean>;
};

type TableProps = {
  plans: Plan[];
  color: string;
  notes?: string[];
};

function PricingTable({ plans, color, notes }: TableProps) {
  const featureKeys = Object.keys(plans[0].features);
  const popularIdx = plans.findIndex(p => p.badge);

  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <table className="price-table">
        <thead>
          <tr>
            <th className="price-table-feature-col">Característica</th>
            {plans.map((plan, i) => (
              <th
                key={plan.id}
                className={`price-table-plan-col${i === popularIdx ? ' plan-highlight' : ''}`}
                style={i === popularIdx ? { '--plan-color': color } as React.CSSProperties : {}}
              >
                {plan.badge && (
                  <span className="plan-badge" style={{ background: color, color: '#050505' }}>
                    {plan.badge}
                  </span>
                )}
                <div className="plan-name">{plan.name}</div>
                <div className="plan-price" style={i === popularIdx ? { color } : {}}>
                  <span className="plan-currency">$</span>
                  {plan.price}
                </div>
                <Link href={WA} target="_blank" rel="noopener noreferrer"
                  className="plan-cta-btn"
                  style={i === popularIdx
                    ? { background: color, color: '#050505' }
                    : { border: `1px solid rgba(255,255,255,0.15)`, color: '#fafafa' }
                  }
                >
                  Contratar
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureKeys.map((key) => (
            <tr key={key} className="price-table-row">
              <td className="price-table-feature-label">{key}</td>
              {plans.map((plan, i) => {
                const val = plan.features[key];
                return (
                  <td
                    key={plan.id}
                    className={`price-table-value${i === popularIdx ? ' plan-highlight-cell' : ''}`}
                    style={i === popularIdx ? { '--plan-color': color } as React.CSSProperties : {}}
                  >
                    {val === true ? (
                      <span className="check-icon" style={{ color }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      </span>
                    ) : val === false ? (
                      <span className="cross-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      </span>
                    ) : (
                      <span className="value-text">{val as string}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {notes && notes.length > 0 && (
        <ul className="table-notes-list">
          {notes.map((n, i) => (
            <li key={i} className="table-note-item">* {n}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function Precios() {
  const [activeTab, setActiveTab] = useState<'inmobiliario' | 'redes' | 'foto'>('foto');

  const tabs: { id: 'inmobiliario' | 'redes' | 'foto'; label: string; color: string }[] = [
    { id: 'foto',         label: 'Sesiones de Foto',      color: '#ff6b35' },
    { id: 'redes',        label: 'Redes & Contenido',     color: '#a855f7' },
    { id: 'inmobiliario', label: 'Paquetes Inmobiliarios', color: '#00e5ff' },
  ];

  const activeColor = tabs.find(t => t.id === activeTab)?.color ?? '#00e5ff';

  return (
    <>
      <main style={{ backgroundColor: '#0a0a0a', color: '#fafafa', minHeight: '100vh', overflowX: 'hidden' }}>

        {/* ── Hero ─────────────────────────────────────── */}
        <section style={{ paddingTop: '140px', paddingBottom: '4rem', textAlign: 'center', position: 'relative' }}>
          <div className="price-hero-grid" />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <span className="em-badge">Planes de Trabajo 2026</span>
            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginTop: '1.25rem',
              lineHeight: 1.1,
            }}>
              Invierte en tu <span style={{ color: '#00e5ff' }}>Imagen</span> Visual
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.1rem', maxWidth: '600px', margin: '1.25rem auto 0', lineHeight: 1.7 }}>
              Producción audiovisual y fotografía profesional en El Salvador. Elige el plan que mejor se adapta a tus objetivos.
            </p>
          </div>
        </section>

        {/* ── Category Tabs ────────────────────────────── */}
        <section style={{ paddingBottom: '5rem' }}>
          <div className="container">

            {/* Tabs */}
            <div className="price-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`price-tab-btn${activeTab === tab.id ? ' active' : ''}`}
                  style={activeTab === tab.id ? { '--tab-color': tab.color, borderColor: tab.color, color: tab.color } as React.CSSProperties : {}}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Section titles */}
            {activeTab === 'inmobiliario' && (
              <>
                <div className="price-section-header">
                  <h2 className="price-section-title">Paquetes <span style={{ color: '#00e5ff' }}>Inmobiliarios</span></h2>
                  <p className="price-section-sub">Para Airbnb, propiedades en venta, renta y agencias inmobiliarias. Contenido que convierte visitas en reservas.</p>
                </div>
                <PricingTable
                  plans={inmobiliariosPlans}
                  color="#00e5ff"
                  notes={[
                    'El precio puede variar dependiendo del lugar de grabación.',
                    'Si se requieren modelos se aplicará un cargo extra.',
                    'Todos los planes incluyen dron para el video final.',
                    'El uso de IA para transiciones o animaciones aplica con cargo extra.',
                  ]}
                />
              </>
            )}

            {activeTab === 'redes' && (
              <>
                <div className="price-section-header">
                  <h2 className="price-section-title">Redes Sociales & <span style={{ color: '#a855f7' }}>Creación de Contenido</span></h2>
                  <p className="price-section-sub">Paquetes enfocados en generar contenido de alto impacto para marcas, restaurantes y negocios. Solo creación de contenido — el manejo de cuentas aplica costo aparte.</p>
                </div>
                <PricingTable
                  plans={redesPlans}
                  color="#a855f7"
                  notes={[
                    'El precio se puede ver modificado dependiendo del lugar de grabación.',
                    'El uso del dron FPV y estabilizado depende de los permisos de la zona y espacio.',
                    'Si se requieren modelos se aplicará un cargo extra.',
                    'El uso de IA para transiciones o animaciones aplica con cargo extra.',
                  ]}
                />
              </>
            )}

            {activeTab === 'foto' && (
              <>
                <div className="price-section-header">
                  <h2 className="price-section-title">Sesiones de <span style={{ color: '#ff6b35' }}>Fotografía</span></h2>
                  <p className="price-section-sub">Para marcas, productos, retratos y eventos. Imágenes que elevan tu presencia visual al siguiente nivel.</p>
                </div>
                <PricingTable
                  plans={fotoPlans}
                  color="#ff6b35"
                  notes={[
                    'El precio puede variar dependiendo del lugar de la sesión.',
                    'El estudio fotográfico aplica costo aparte si se requiere.',
                    'Si se requieren modelos se aplicará un cargo extra.',
                  ]}
                />
              </>
            )}
          </div>
        </section>

        {/* ── Custom Quote ─────────────────────────────── */}
        <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,229,255,0.025)' }}>
          <div className="container">
            <div className="custom-quote-inner">
              <div>
                <span className="em-badge">¿Algo diferente?</span>
                <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '1rem 0 0.75rem' }}>
                  Plan <span style={{ color: '#00e5ff' }}>Personalizado</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '460px' }}>
                  ¿Tu proyecto requiere algo especial? Cuéntanos tu visión y construimos un plan a tu medida: combinación de servicios, fechas específicas, volúmenes de entrega o requerimientos únicos.
                </p>
                <ul style={{ listStyle: 'none', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {['Presupuesto adaptado a tu realidad', 'Combinación de servicios a medida', 'Asesoría creativa sin costo', 'Respuesta en menos de 24 horas'].map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="custom-quote-card">
                <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Solicitar Cotización</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                  Descríbenos tu proyecto y te enviamos una propuesta en menos de 24 horas.
                </p>
                <Link href={WA} target="_blank" rel="noopener noreferrer" className="em-btn em-btn-primary em-pulse" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Escribir por WhatsApp
                </Link>
                <Link href="/contacto" className="em-btn em-btn-outline" style={{ width: '100%', justifyContent: 'center', display: 'flex', marginTop: '0.75rem' }}>
                  Enviar Formulario
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── On-Quote Services ────────────────────────── */}
        <section style={{ padding: '5rem 0' }}>
          <div className="container">
            <div className="price-section-header">
              <span className="em-badge">Por Cotización</span>
              <h2 className="price-section-title" style={{ marginTop: '1rem' }}>
                Servicios que requieren<br /><span style={{ color: '#a855f7' }}>propuesta personalizada</span>
              </h2>
              <p className="price-section-sub">Estos servicios no tienen un precio fijo porque cada proyecto es completamente único. La complejidad, duración, locaciones y requerimientos específicos hacen que definir un solo precio sería impreciso y desventajoso para ti como cliente.</p>
            </div>

            <div className="quote-services-grid">
              {quoteServices.map(svc => (
                <div key={svc.title} className="quote-service-card">
                  <div className="quote-service-icon">
                    {svc.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '1.15rem', margin: '1rem 0 0.6rem' }}>{svc.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.65, flex: 1 }}>{svc.reason}</p>
                  <Link href={WA} target="_blank" rel="noopener noreferrer" className="quote-service-btn">
                    Solicitar cotización →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <style>{`
        .price-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
          pointer-events: none;
        }

        /* Tabs */
        .price-tabs {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .price-tab-btn {
          padding: 0.65rem 1.5rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .price-tab-btn:hover {
          color: rgba(255,255,255,0.8);
          border-color: rgba(255,255,255,0.25);
        }
        .price-tab-btn.active {
          background: rgba(0,229,255,0.08);
          font-weight: 700;
        }

        /* Section header */
        .price-section-header {
          text-align: center;
          margin-bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .price-section-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.2;
          color: #fafafa;
          margin: 0;
        }
        .price-section-sub {
          font-family: 'Outfit', sans-serif;
          color: rgba(255,255,255,0.5);
          font-size: 0.95rem;
          max-width: 580px;
          line-height: 1.7;
          margin: 0;
        }

        /* Pricing Table */
        .price-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }
        .price-table thead tr {
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .price-table-feature-col {
          text-align: left;
          padding: 1.5rem 1rem 1.5rem 0;
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          width: 30%;
        }
        .price-table-plan-col {
          text-align: center;
          padding: 1rem 1.5rem 2rem;
          vertical-align: top;
          position: relative;
        }
        .price-table-plan-col.plan-highlight {
          background: rgba(255,255,255,0.03);
          border-radius: 16px 16px 0 0;
          border: 1px solid var(--plan-color, #00e5ff);
          border-bottom: none;
        }
        .plan-badge {
          display: inline-block;
          padding: 0.2rem 0.75rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 100px;
          margin-bottom: 0.6rem;
        }
        .plan-name {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #fafafa;
          margin-bottom: 0.35rem;
        }
        .plan-price {
          font-family: 'Outfit', sans-serif;
          font-size: 2.4rem;
          font-weight: 800;
          color: #fafafa;
          line-height: 1;
          margin-bottom: 1.25rem;
        }
        .plan-currency {
          font-size: 1.1rem;
          vertical-align: super;
          margin-right: 2px;
        }
        .plan-cta-btn {
          display: inline-block;
          padding: 0.6rem 1.4rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .plan-cta-btn:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }

        /* Table body */
        .price-table-row:nth-child(even) td {
          background: rgba(255,255,255,0.015);
        }
        .price-table-feature-label {
          padding: 0.9rem 1rem 0.9rem 0;
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.65);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          text-align: left;
        }
        .price-table-value {
          text-align: center;
          padding: 0.9rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.75);
        }
        .plan-highlight-cell {
          background: rgba(255,255,255,0.02);
          border-left: 1px solid rgba(255,255,255,0.04);
          border-right: 1px solid rgba(255,255,255,0.04);
        }
        .price-table tbody tr:last-child .plan-highlight-cell {
          border-radius: 0 0 16px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .check-icon { display: inline-flex; }
        .cross-icon { display: inline-flex; color: rgba(255,255,255,0.2); }
        .value-text { font-weight: 600; }
        .table-note {
          margin-top: 1.25rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.3);
          line-height: 1.6;
        }

        /* Custom Quote */
        .custom-quote-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .custom-quote-card {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 2rem;
        }

        /* Quote Services Grid */
        .quote-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 1rem;
        }
        .quote-service-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }
        .quote-service-card:hover {
          border-color: rgba(168,85,247,0.4);
          background: rgba(168,85,247,0.04);
          transform: translateY(-4px);
        }
        .quote-service-icon {
          color: #a855f7;
          display: inline-flex;
        }
        .quote-service-btn {
          margin-top: 1.5rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: #a855f7;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: gap 0.2s;
        }
        .quote-service-btn:hover {
          color: #c084fc;
        }

        /* Notes vertical list */
        .table-notes-list {
          list-style: none;
          margin-top: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding: 0;
        }
        .table-note-item {
          font-family: 'Outfit', sans-serif;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.3);
          line-height: 1.6;
        }
        /* Responsive */
        @media (max-width: 900px) {
          .custom-quote-inner {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .quote-services-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .price-tabs {
            gap: 0.5rem;
          }
          .price-tab-btn {
            font-size: 0.78rem;
            padding: 0.55rem 1rem;
          }
        }
      `}</style>
    </>
  );
}
