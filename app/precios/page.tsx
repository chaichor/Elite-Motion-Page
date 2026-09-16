'use client';

import { useState } from 'react';
import { KineticText } from '@/components/ui/KineticText';
import { HyperText } from '@/components/ui/HyperText';
import { RippleLink } from '@/components/ui/RippleButton';

const WA = 'https://wa.me/50377350934';

const inmobiliariosPlans = [
  {
    id: 'basico',
    name: 'Básico',
    price: 180,
    badge: null,
    oldPrice: null,
    features: {
      'Fotografías profesionales': '6 fotos',
      'Fotos aéreas con dron': '2 fotos',
      'Videos cortos de la propiedad': '1 video',
      'Dron incluido en video': true,
      Edición: 'Básica',
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
    badge: 'Buena opción',
    oldPrice: null,
    features: {
      'Fotografías profesionales': '12 fotos',
      'Fotos aéreas con dron': '4 fotos',
      'Videos cortos de la propiedad': '2 videos',
      'Dron incluido en video': true,
      Edición: 'Intermedia',
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
    badge: 'Premium',
    oldPrice: 600,
    features: {
      'Fotografías profesionales': '16 fotos',
      'Fotos aéreas con dron': '8 fotos',
      'Videos cortos de la propiedad': '4 videos',
      'Dron incluido en video': true,
      Edición: 'Avanzada',
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
    oldPrice: null,
    features: {
      Grabación: 'Profesional HD',
      'Videos cortos para redes': '3 videos',
      'Sesión fotográfica': '(solo local)',
      Historias: '4 historias',
      Carruseles: '2 carruseles',
      'Copys para videos': true,
      'Calendarización recomendada': true,
      'Grabación con dron': false,
      Edición: 'Básica',
      Correcciones: '1 sencilla',
      'Estrategia de contenido + guión': true,
      'Entrega lista para publicar': true,
      'Manejo de cuentas (Facebook, Instagram, TikTok)': false,
    },
  },
  {
    id: 'pro-redes',
    name: 'Pro',
    price: 300,
    badge: 'Buena opción',
    oldPrice: null,
    features: {
      Grabación: 'Profesional HD',
      'Videos cortos para redes': '6 videos',
      'Sesión fotográfica': '(incl. producto)',
      Historias: '6 historias',
      Carruseles: '6 carruseles',
      'Copys para videos': true,
      'Calendarización recomendada': true,
      'Grabación con dron': true,
      Edición: 'Personalizada',
      Correcciones: '2',
      'Estrategia de contenido + guión': true,
      'Entrega lista para publicar': true,
      'Manejo de cuentas (Facebook, Instagram, TikTok)': false,
    },
  },
  {
    id: 'elite-redes',
    name: 'Elite',
    price: 450,
    badge: 'Premium',
    oldPrice: 500,
    features: {
      Grabación: 'Profesional HD',
      'Videos cortos para redes': '10 videos',
      'Sesión fotográfica': '(incl. producto)',
      Historias: '12 historias',
      Carruseles: '8 carruseles',
      'Copys para videos': true,
      'Calendarización recomendada': true,
      'Grabación con dron': true,
      Edición: 'Avanzada Premium',
      Correcciones: '3',
      'Estrategia de contenido + guión': true,
      'Entrega lista para publicar': true,
      'Manejo de cuentas (Facebook, Instagram, TikTok)': 'Gratis',
    },
  },
];

const fotoPlans = [
  {
    id: 'foto-basico',
    name: 'Básico',
    price: 60,
    badge: null,
    oldPrice: null,
    features: {
      'Fotografías profesionales': '16 fotos',
      'Duración de sesión': '60 minutos',
      Edición: 'Básica HD',
    },
  },
  {
    id: 'foto-pro',
    name: 'Pro',
    price: 80,
    badge: 'Buena opción',
    oldPrice: null,
    features: {
      'Fotografías profesionales': '25 fotos',
      'Duración de sesión': '1 hora 30 min',
      Edición: 'Avanzada',
    },
  },
  {
    id: 'foto-elite',
    name: 'Elite',
    price: 120,
    badge: 'Premium',
    oldPrice: 150,
    features: {
      'Fotografías profesionales': '35 fotos',
      'Duración de sesión': '2 horas',
      Edición: 'Elite',
    },
  },
];

const artesPlans = [
  {
    id: 'artes-basico',
    name: 'Básico',
    price: 60,
    badge: null,
    oldPrice: null,
    features: {
      'Posts para feed': '3 posts',
      Historias: '2 historias',
      Carruseles: false,
      'Sesión de fotos producto/local': false,
      Formatos: 'Feed + Stories',
      'Entrega lista para publicar': true,
      'Correcciones incluidas': '—',
      'Estrategia de contenido': true,
    },
  },
  {
    id: 'artes-pro',
    name: 'Pro',
    price: 120,
    badge: 'Buena opción',
    oldPrice: null,
    features: {
      'Posts para feed': '5 posts',
      Historias: '3 historias',
      Carruseles: '1 carrusel',
      'Sesión de fotos producto/local': true,
      Formatos: 'Feed + Stories',
      'Entrega lista para publicar': true,
      'Correcciones incluidas': '1',
      'Estrategia de contenido': true,
    },
  },
  {
    id: 'artes-elite',
    name: 'Elite',
    price: 200,
    badge: 'Premium',
    oldPrice: null,
    features: {
      'Posts para feed': '8 posts',
      Historias: '5 historias',
      Carruseles: '4 carruseles',
      'Sesión de fotos producto/local': true,
      Formatos: 'Feed + Stories',
      'Entrega lista para publicar': true,
      'Correcciones incluidas': '2',
      'Estrategia de contenido': true,
    },
  },
];

const videosPlans = [
  {
    id: 'videos-basico',
    name: 'Básico',
    price: 150,
    badge: null,
    oldPrice: null,
    features: {
      'Videos cortos': '5 videos',
      Edición: 'Básica',
      Grabación: 'Profesional HD',
      'Copys para videos': true,
      'Estrategia de contenido + guión': true,
      'Entrega lista para publicar': true,
      Correcciones: '1 sencilla',
    },
  },
  {
    id: 'videos-pro',
    name: 'Pro',
    price: 240,
    badge: 'Buena opción',
    oldPrice: null,
    features: {
      'Videos cortos': '10 videos',
      Edición: 'Pro',
      Grabación: 'Profesional HD',
      'Copys para videos': true,
      'Estrategia de contenido + guión': true,
      'Entrega lista para publicar': true,
      Correcciones: '2',
    },
  },
  {
    id: 'videos-elite',
    name: 'Elite',
    price: 350,
    badge: 'Premium',
    oldPrice: null,
    features: {
      'Videos cortos': '16 videos',
      Edición: 'Premium',
      Grabación: 'Profesional HD',
      'Copys para videos': true,
      'Estrategia de contenido + guión': true,
      'Entrega lista para publicar': true,
      Correcciones: '3',
    },
  },
];

const dronPlans = [
  {
    id: 'dron-basico',
    name: 'Básico',
    price: 100,
    badge: null,
    oldPrice: null,
    features: {
      'Tiempo de vuelo': '30 minutos',
      Equipo: 'DJI estabilizado',
      FPV: false,
      'Tomas de video': '1080p',
      'Tomas de fotos': '1080p',
      'Estabilización de videos': false,
      Edición: 'Sin edición',
    },
  },
  {
    id: 'dron-pro',
    name: 'Pro',
    price: 160,
    badge: 'Buena opción',
    oldPrice: null,
    features: {
      'Tiempo de vuelo': '1 hora',
      Equipo: 'DJI estabilizado / FPV',
      FPV: true,
      'Tomas de video': '4K',
      'Tomas de fotos': '4K',
      'Estabilización de videos': true,
      Edición: 'Básica',
    },
  },
  {
    id: 'dron-elite',
    name: 'Elite',
    price: 200,
    badge: 'Premium',
    oldPrice: null,
    features: {
      'Tiempo de vuelo': '2 horas',
      Equipo: 'DJI estabilizado / FPV',
      FPV: true,
      'Tomas de video': '4K',
      'Tomas de fotos': '4K',
      'Estabilización de videos': true,
      Edición: 'Pro',
    },
  },
];

const quoteServices = [
  {
    title: 'Producción Comercial',
    reason:
      'Cada campaña publicitaria requiere planificación de locaciones, actores, iluminación profesional, múltiples días de rodaje y postproducción avanzada. Las variables son únicas por proyecto.',
  },
  {
    title: 'Cobertura de Eventos',
    reason:
      'La duración, el número de camarógrafos requeridos, el tipo de evento y los entregables varían enormemente. Un evento de 2 horas no es igual a uno de 8 horas con requerimientos especiales.',
  },
  {
    title: 'Creación de Landing Pages',
    reason:
      'El diseño web depende del nivel de complejidad, número de secciones, integraciones (formularios, pagos, CRM), animaciones personalizadas y el tiempo de desarrollo necesario.',
  },
];

type Plan = {
  id: string;
  name: string;
  price: number;
  badge: string | null;
  oldPrice?: number | null;
  features: Record<string, string | boolean>;
};

function PricingTable({ plans, notes }: { plans: Plan[]; notes?: string[] }) {
  const featureKeys = Object.keys(plans[0].features);

  return (
    <div className="em-price-scroll">
      <table className="em-price-table">
        <thead>
          <tr>
            <th className="em-price-feature-h">Característica</th>
            {plans.map((plan) => {
              const premium = plan.badge === 'Premium';
              return (
                <th key={plan.id} className="em-price-col" data-premium={premium || undefined}>
                  {plan.badge && <span className="em-price-badge">{plan.badge}</span>}
                  <p className="em-price-name">{plan.name}</p>
                  <p className="em-price-amount">
                    {plan.oldPrice && <span className="em-price-old">${plan.oldPrice}</span>}
                    <span className="em-price-currency">$</span>
                    {plan.price}
                  </p>
                  <RippleLink
                    href={WA}
                    external
                    className={premium ? 'em-btn em-btn-primary' : 'em-btn em-btn-outline'}
                    rippleColor={premium ? 'rgba(255,255,255,0.28)' : 'rgba(0, 229, 255, 0.28)'}
                  >
                    {premium ? 'Lo quiero' : 'Contratar'}
                  </RippleLink>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {featureKeys.map((key) => (
            <tr key={key} className="em-price-row">
              <td className="em-price-key">{key}</td>
              {plans.map((plan) => {
                const premium = plan.badge === 'Premium';
                const val = plan.features[key];
                return (
                  <td key={plan.id} className="em-price-val" data-premium={premium || undefined}>
                    {val === true ? (
                      <span className="em-price-check" aria-label="Incluido">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    ) : val === false ? (
                      <span className="em-price-cross" aria-label="No incluido">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </span>
                    ) : (
                      <span className={val === 'Gratis' ? 'em-price-gratis' : undefined}>{val as string}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {notes && notes.length > 0 && (
        <ul className="em-price-notes">
          {notes.map((n) => (
            <li key={n}>* {n}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

type TabId = 'foto' | 'artes' | 'videos' | 'dron' | 'redes' | 'inmobiliario';

const TABS: { id: TabId; label: string }[] = [
  { id: 'redes', label: 'Redes & contenido' },
  { id: 'foto', label: 'Sesiones de foto' },
  { id: 'artes', label: 'Creación de artes' },
  { id: 'videos', label: 'Creación de videos' },
  { id: 'dron', label: 'Grabación con dron' },
  { id: 'inmobiliario', label: 'Inmobiliario' },
];

export default function Precios() {
  const [activeTab, setActiveTab] = useState<TabId>('redes');

  return (
    <div className="container em-prices">
      <header className="em-prices-hero">
        <span className="em-label">Tarifas 2026 — sin sorpresas</span>
        <KineticText
          as="h1"
          className="em-prices-statement"
          text={'Invierte en la imagen\nque vende por ti.'}
          highlight="que vende"
          spread={0.35}
        />
        <HyperText
          as="p"
          className="em-prices-lede"
          text="Producción audiovisual y fotografía profesional en El Salvador. Tres escalas, un solo criterio: lo que se entrega, no lo que se promete."
        />
      </header>

      <div className="em-price-tabs" role="tablist" aria-label="Categorías de precios">
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`em-price-tab${activeTab === tab.id ? ' is-on' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="em-price-tab-num">({String(i + 1).padStart(2, '0')})</span>
            <span className="em-price-tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
      <p className="em-price-now" aria-live="polite">
        <span>Viendo</span>
        {TABS.find((tab) => tab.id === activeTab)?.label}
      </p>

      {activeTab === 'inmobiliario' && (
        <>
          <div className="em-price-head">
            <KineticText as="h2" className="em-price-title" text="Paquetes inmobiliarios" highlight="inmobiliarios" />
            <HyperText
              as="p"
              className="em-price-sub"
              text="Para Airbnb, propiedades en venta, renta y agencias. Contenido que convierte visitas en reservas."
            />
          </div>
          <PricingTable
            plans={inmobiliariosPlans}
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
          <div className="em-price-head">
            <KineticText
              as="h2"
              className="em-price-title"
              text={'Redes sociales &\ncreación de contenido'}
              highlight="creación de contenido"
            />
            <HyperText
              as="p"
              className="em-price-sub"
              text="Paquetes para marcas, restaurantes y negocios. Solo creación de contenido — el manejo de cuentas aplica costo aparte, excepto en Elite."
            />
          </div>
          <PricingTable
            plans={redesPlans}
            notes={[
              'El precio se puede ver modificado dependiendo del lugar de grabación.',
              'El uso del dron depende de los permisos de la zona y espacio disponible.',
              'Si se requieren modelos se aplicará un cargo extra.',
              'El uso de IA para transiciones o animaciones aplica con cargo extra.',
              'El manejo de cuentas gratuito en el paquete Elite aplica para Facebook, Instagram y TikTok.',
            ]}
          />
        </>
      )}

      {activeTab === 'foto' && (
        <>
          <div className="em-price-head">
            <KineticText as="h2" className="em-price-title" text="Sesiones de fotografía" highlight="fotografía" />
            <HyperText
              as="p"
              className="em-price-sub"
              text="Para marcas, productos, retratos y eventos. Imágenes que elevan tu presencia visual al siguiente nivel."
            />
          </div>
          <PricingTable
            plans={fotoPlans}
            notes={[
              'El precio puede variar dependiendo del lugar de la sesión.',
              'El estudio fotográfico aplica costo aparte si se requiere.',
              'Si se requieren modelos se aplicará un cargo extra.',
            ]}
          />
        </>
      )}

      {activeTab === 'artes' && (
        <>
          <div className="em-price-head">
            <KineticText as="h2" className="em-price-title" text="Paquetes de creación de artes" highlight="artes" />
            <HyperText
              as="p"
              className="em-price-sub"
              text="Piezas gráficas para feed e historias. Pro y Elite incluyen sesión de fotos de producto o local para armar las artes con material propio."
            />
          </div>
          <PricingTable
            plans={artesPlans}
            notes={[
              'El precio puede variar si la sesión de fotos es fuera de San Salvador.',
              'El estudio fotográfico aplica costo aparte si se requiere.',
              'Si se requieren modelos se aplicará un cargo extra.',
              'Las artes se entregan listas para publicar en feed e historias.',
            ]}
          />
        </>
      )}

      {activeTab === 'videos' && (
        <>
          <div className="em-price-head">
            <KineticText as="h2" className="em-price-title" text="Paquetes de creación de videos" highlight="videos" />
            <HyperText
              as="p"
              className="em-price-sub"
              text="Videos cortos para redes. Misma grabación profesional; lo que cambia es el volumen y el nivel de edición."
            />
          </div>
          <PricingTable
            plans={videosPlans}
            notes={[
              'El precio se puede ver modificado dependiendo del lugar de grabación.',
              'Si se requieren modelos se aplicará un cargo extra.',
              'El uso de IA para transiciones o animaciones aplica con cargo extra.',
              'Los videos se entregan listos para publicar.',
            ]}
          />
        </>
      )}

      {activeTab === 'dron' && (
        <>
          <div className="em-price-head">
            <KineticText as="h2" className="em-price-title" text="Paquetes de grabación con dron" highlight="dron" />
            <HyperText
              as="p"
              className="em-price-sub"
              text="Vuelo, fotos y video aéreo. El Básico entrega material crudo en 1080p; Pro y Elite suben a 4K, FPV y edición."
            />
          </div>
          <PricingTable
            plans={dronPlans}
            notes={[
              'El precio se puede ver modificado dependiendo del lugar de grabación.',
              'El uso del dron y del FPV depende de los permisos de la zona y del espacio disponible.',
              'El tiempo de vuelo es tiempo efectivo en el aire, no de jornada completa.',
            ]}
          />
        </>
      )}

      <section className="em-price-custom">
        <div>
          <span className="em-label">A medida</span>
          <KineticText as="h2" className="em-price-title" text="Plan personalizado" highlight="personalizado" />
          <HyperText
            as="p"
            className="em-price-sub"
            text="¿Tu proyecto requiere algo especial? Combinamos servicios, fechas y volúmenes en una sola propuesta."
          />
          <ul className="em-price-custom-list">
            <li>Presupuesto adaptado a tu realidad</li>
            <li>Combinación de servicios a medida</li>
            <li>Asesoría creativa sin costo</li>
            <li>Respuesta en menos de 24 horas</li>
          </ul>
        </div>
        <div className="em-price-panel">
          <h3>Solicitar cotización</h3>
          <p>Descríbenos tu proyecto y te enviamos una propuesta en menos de 24 horas.</p>
          <RippleLink href={WA} external className="em-btn em-btn-primary" rippleColor="rgba(5,5,5,0.28)">
            Escribir por WhatsApp
          </RippleLink>
          <RippleLink href="/contacto" className="em-btn em-btn-outline" rippleColor="rgba(0, 229, 255, 0.28)">
            Enviar formulario
          </RippleLink>
        </div>
      </section>

      <section>
        <div className="em-price-head">
          <KineticText
            as="h2"
            className="em-price-title"
            text={'Servicios que requieren\npropuesta personalizada'}
            highlight="propuesta personalizada"
          />
          <HyperText
            as="p"
            className="em-price-sub"
            text="Estos no tienen un precio fijo porque cada proyecto es único. Definir un solo número sería impreciso — y desventajoso para ti."
          />
        </div>
        <ol className="em-quote-list">
          {quoteServices.map((svc, i) => (
            <li key={svc.title} className="em-quote-item">
              <span className="em-quote-num">({String(i + 1).padStart(2, '0')})</span>
              <div>
                <h3>{svc.title}</h3>
                <p>{svc.reason}</p>
              </div>
              <RippleLink href={WA} external className="em-btn em-btn-ghost" rippleColor="rgba(0, 229, 255, 0.22)">
                Cotizar
              </RippleLink>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
