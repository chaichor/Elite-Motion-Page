'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Play, X, ZoomIn, ArrowLeft, Camera, Video, Palette } from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────── */

type ProjectAsset = {
  type: 'image' | 'video';
  url: string;
  title: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  thumbnailType: 'image' | 'video';
  assets: ProjectAsset[];
  aspectRatio?: string;
};

type Category = {
  id: string;
  label: string;
  icon: 'camera' | 'video' | 'palette';
  color: string;
  projects: Project[];
};

const categories: Category[] = [
  {
    id: 'foto',
    label: 'Sesiones Fotográficas',
    icon: 'camera',
    color: '#ff6b35',
    projects: [
      {
        id: 'retrato',
        name: 'Sesiones Retrato',
        description: 'Fotografía profesional de retrato con iluminación y composición de alto nivel.',
        thumbnail: '/img_portafolio/Post 01.webp',
        thumbnailType: 'image',
        assets: [
          { type: 'image', url: '/img_portafolio/Post 01.webp', title: 'Retrato 01' },
          { type: 'image', url: '/img_portafolio/Post 02.webp', title: 'Retrato 02' },
          { type: 'image', url: '/img_portafolio/Post 03.webp', title: 'Retrato 03' },
          { type: 'image', url: '/img_portafolio/Post 04.webp', title: 'Retrato 04' },
          { type: 'image', url: '/img_portafolio/Post 05.webp', title: 'Retrato 05' },
          { type: 'image', url: '/img_portafolio/Post 06.webp', title: 'Retrato 06' },
          { type: 'image', url: '/img_portafolio/Post 07.webp', title: 'Retrato 07' },
          { type: 'image', url: '/img_portafolio/Post 08.webp', title: 'Retrato 08' },
          { type: 'image', url: '/img_portafolio/Post 09.webp', title: 'Retrato 09' },
          { type: 'image', url: '/img_portafolio/Post 10.webp', title: 'Retrato 10' },
          { type: 'image', url: '/img_portafolio/Post 11.webp', title: 'Retrato 11' },
        ],
      },
      {
        id: 'producto',
        name: 'Sesiones de Producto',
        description: 'Fotografía de producto comercial que destaca cada detalle de tu marca.',
        thumbnail: '/img_portafolio/yaxhe_1.webp',
        thumbnailType: 'image',
        assets: [
          { type: 'image', url: '/img_portafolio/yaxhe_1.webp', title: 'Producto 01' },
          { type: 'image', url: '/img_portafolio/yaxhe 2 (1).webp', title: 'Producto 02' },
          { type: 'image', url: '/img_portafolio/yaxhe 3 (1).webp', title: 'Producto 03' },
          { type: 'image', url: '/img_portafolio/yaxhe 4 (1).webp', title: 'Producto 04' },
          { type: 'image', url: '/img_portafolio/yaxhe 5 (1).webp', title: 'Producto 05' },
          { type: 'image', url: '/img_portafolio/yaxhe 6 (1).webp', title: 'Producto 06' },
          { type: 'image', url: '/img_portafolio/yaxhe 7 (1).webp', title: 'Producto 07' },
          { type: 'image', url: '/img_portafolio/yaxhe 8 (1).webp', title: 'Producto 08' },
          { type: 'image', url: '/img_portafolio/yaxhe 9 (1).webp', title: 'Producto 09' },
        ],
      },
    ],
  },
  {
    id: 'video',
    label: 'Videos',
    icon: 'video',
    color: '#a855f7',
    projects: [
      {
        id: 'dron',
        name: 'Videos Dron',
        description: 'Tomas aéreas cinematográficas con dron profesional y FPV.',
        thumbnail: '/videos_vertical_portafolio/videos_dron/Videos%20dron%20punta%20mango.mp4',
        thumbnailType: 'video',
        aspectRatio: '9/16',
        assets: [
          { type: 'video', url: '/videos_vertical_portafolio/videos_dron/Videos%20dron%20punta%20mango.mp4', title: 'Videos Dron Punta Mango' },
          { type: 'video', url: '/videos_vertical_portafolio/videos_dron/second.mp4', title: 'Vuelo de Dron - Elite Motion' },
        ],
      },
      {
        id: 'yaxhe',
        name: 'Sombreros Yaxhe',
        description: 'Producción audiovisual para la marca Yaxhe — sombreros personalizados.',
        thumbnail: '/img_portafolio/yaxhe_1.webp',
        thumbnailType: 'image',
        aspectRatio: '9/16',
        assets: [
          { type: 'video', url: '/videos_vertical_portafolio/yaxhe_emprendimiento_sombreros_personalizados.mp4', title: 'Sombreros Yaxhe — Video Promocional' },
          { type: 'image', url: '/img_portafolio/yaxhe_1.webp', title: 'Yaxhe 01' },
          { type: 'image', url: '/img_portafolio/yaxhe 2 (1).webp', title: 'Yaxhe 02' },
          { type: 'image', url: '/img_portafolio/yaxhe 3 (1).webp', title: 'Yaxhe 03' },
          { type: 'image', url: '/img_portafolio/yaxhe 4 (1).webp', title: 'Yaxhe 04' },
          { type: 'image', url: '/img_portafolio/yaxhe 5 (1).webp', title: 'Yaxhe 05' },
          { type: 'image', url: '/img_portafolio/yaxhe 6 (1).webp', title: 'Yaxhe 06' },
          { type: 'image', url: '/img_portafolio/yaxhe 7 (1).webp', title: 'Yaxhe 07' },
          { type: 'image', url: '/img_portafolio/yaxhe 8 (1).webp', title: 'Yaxhe 08' },
          { type: 'image', url: '/img_portafolio/yaxhe 9 (1).webp', title: 'Yaxhe 09' },
        ],
      },
    ],
  },
  {
    id: 'artes',
    label: 'Artes y Historias',
    icon: 'palette',
    color: '#10b981',
    projects: [
      {
        id: 'taqueria-posts',
        name: 'Taquería Jalisco — Posts',
        description: 'Diseño de artes visuales y publicaciones comerciales para redes sociales.',
        thumbnail: '/artes_y_historias/post/POST%20%231.jpg',
        thumbnailType: 'image',
        aspectRatio: '1/1',
        assets: [
          { type: 'image', url: '/artes_y_historias/post/POST%20%231.jpg', title: 'Post 01' },
          { type: 'image', url: '/artes_y_historias/post/POST%20%232.jpg', title: 'Post 02' },
          { type: 'image', url: '/artes_y_historias/post/POST%20%233.jpg', title: 'Post 03' },
          { type: 'image', url: '/artes_y_historias/post/POST%20%234.jpg', title: 'Post 04' },
          { type: 'image', url: '/artes_y_historias/post/POST%20%235.jpg', title: 'Post 05' },
        ],
      },
      {
        id: 'taqueria-historias',
        name: 'Taquería Jalisco — Historias',
        description: 'Diseño de historias verticales interactivas para Instagram y Facebook.',
        thumbnail: '/artes_y_historias/historias/HISTORIA%20%231.jpg',
        thumbnailType: 'image',
        aspectRatio: '9/16',
        assets: [
          { type: 'image', url: '/artes_y_historias/historias/HISTORIA%20%231.jpg', title: 'Historia 01' },
          { type: 'image', url: '/artes_y_historias/historias/HISTORIA%20%232.jpg', title: 'Historia 02' },
          { type: 'image', url: '/artes_y_historias/historias/HISTORIA%20%233.jpg', title: 'Historia 03' },
          { type: 'image', url: '/artes_y_historias/historias/HISTORIA%20%234.jpg', title: 'Historia 04' },
          { type: 'image', url: '/artes_y_historias/historias/HISTORIA%20%235.jpg', title: 'Historia 05' },
          { type: 'image', url: '/artes_y_historias/historias/HISTORIA%20%236.jpg', title: 'Historia 06' },
        ],
      },
    ],
  },
];

/* ─── Page ──────────────────────────────────────────────── */

export default function Portafolio() {
  const [activeTab, setActiveTab] = useState<string>('foto');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<ProjectAsset | null>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeCategory = categories.find(c => c.id === activeTab)!;
  const activeColor = activeCategory.color;

  // Intro parallax
  useEffect(() => {
    const intro = introRef.current;
    if (intro) {
      gsap.set('.pf-ambient-grid', {
        perspective: 1000,
        rotateX: 20,
        scale: 1.1,
      });

      const handleMouseMove = (e: MouseEvent) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 60;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 60;

        gsap.to('.pf-intro-text', {
          x: xPos / 2,
          y: yPos / 4,
          duration: 1.2,
          ease: 'power2.out',
        });

        gsap.to('.pf-ambient-grid', {
          x: -xPos,
          y: -yPos,
          duration: 2,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Animate content changes
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeTab, selectedProject]);

  // Lightbox
  const openLightbox = (asset: ProjectAsset) => {
    setSelectedAsset(asset);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedAsset(null);
    document.body.style.overflow = 'auto';
  };

  // Navigation
  const openProject = (project: Project) => {
    setSelectedProject(project);
  };

  const goBack = () => {
    setSelectedProject(null);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedProject(null);
  };

  return (
    <>
      <main style={{ backgroundColor: '#0a0a0a', color: '#fafafa', minHeight: '100vh', overflowX: 'hidden' }}>

        {/* ── Hero ─────────────────────────────────────── */}
        <section ref={introRef} style={{
          paddingTop: '140px', paddingBottom: '4rem', textAlign: 'center', position: 'relative',
          overflow: 'hidden',
        }}>
          <div className="pf-ambient-grid" style={{
            position: 'absolute', inset: '-20%',
            backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            opacity: 0.6, zIndex: 0, pointerEvents: 'none',
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
          }} />
          <div className="container pf-intro-text" style={{ position: 'relative', zIndex: 1 }}>
            <span className="em-badge">Portafolio 2026</span>
            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginTop: '1.25rem',
              lineHeight: 1.1,
            }}>
              Nuestro <span style={{ color: '#00e5ff' }}>Trabajo</span>
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.55)', fontSize: '1.1rem',
              maxWidth: '600px', margin: '1.25rem auto 0', lineHeight: 1.7,
            }}>
              Explora nuestra producción audiovisual y fotográfica. Cada proyecto refleja nuestra pasión por la excelencia visual.
            </p>
          </div>
        </section>

        {/* ── Category Tabs + Content ────────────────────── */}
        <section style={{ paddingBottom: '5rem' }}>
          <div className="container">

            {/* Main Category Tabs */}
            <div className="pf-tabs">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleTabChange(cat.id)}
                  className={`pf-tab-btn${activeTab === cat.id ? ' active' : ''}`}
                  style={activeTab === cat.id ? {
                    '--tab-color': cat.color,
                    borderColor: cat.color,
                    color: cat.color,
                    background: `${cat.color}12`,
                  } as React.CSSProperties : {}}
                >
                  {cat.icon === 'camera' ? <Camera size={16} /> : cat.icon === 'video' ? <Video size={16} /> : <Palette size={16} />}
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Content area */}
            <div ref={contentRef}>
              {!selectedProject ? (
                /* ── Project Cards (submenu) ──────────── */
                <>
                  <div className="pf-section-header">
                    <h2 className="pf-section-title">
                      {activeCategory.icon === 'camera' ? (
                        <>Sesiones <span style={{ color: activeColor }}>Fotográficas</span></>
                      ) : activeCategory.icon === 'video' ? (
                        <>Producción de <span style={{ color: activeColor }}>Video</span></>
                      ) : (
                        <>Artes y <span style={{ color: activeColor }}>Historias</span></>
                      )}
                    </h2>
                    <p className="pf-section-sub">
                      {activeCategory.icon === 'camera'
                        ? 'Selecciona un tipo de sesión fotográfica para explorar nuestro trabajo.'
                        : activeCategory.icon === 'video'
                        ? 'Selecciona un proyecto de video para ver nuestra producción audiovisual.'
                        : 'Explora nuestros diseños de artes visuales e historias para redes sociales.'}
                    </p>
                  </div>

                  <div className="pf-projects-grid">
                    {activeCategory.projects.map((project) => (
                      <button
                        key={project.id}
                        className="pf-project-card"
                        onClick={() => openProject(project)}
                        style={{ '--card-color': activeColor } as React.CSSProperties}
                      >
                        {/* Thumbnail */}
                        <div className="pf-project-thumb">
                          {project.thumbnailType === 'video' ? (
                            <video autoPlay muted loop playsInline preload="metadata"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            >
                              <source src={project.thumbnail} type="video/mp4" />
                            </video>
                          ) : (
                            <Image
                              src={project.thumbnail}
                              alt={project.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              style={{ objectFit: 'cover' }}
                            />
                          )}
                          <div className="pf-project-thumb-overlay">
                            <span className="pf-project-count">
                              {project.assets.length > 0
                                ? `${project.assets.length} ${
                                    activeTab === 'artes'
                                      ? 'diseños'
                                      : project.assets.every(a => a.type === 'video')
                                      ? 'videos'
                                      : project.assets.some(a => a.type === 'video')
                                      ? 'archivos'
                                      : 'fotos'
                                  }`
                                : 'Próximamente'}
                            </span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="pf-project-info">
                          <h3 className="pf-project-name">{project.name}</h3>
                          <p className="pf-project-desc">{project.description}</p>
                          <span className="pf-project-link" style={{ color: activeColor }}>
                            {project.assets.length > 0 ? 'Ver proyecto →' : 'Próximamente →'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                /* ── Project Detail (gallery) ────────── */
                <>
                  {/* Back button */}
                  <button className="pf-back-btn" onClick={goBack} style={{ color: activeColor }}>
                    <ArrowLeft size={18} />
                    Volver a {activeCategory.label}
                  </button>

                  {/* Project header */}
                  <div className="pf-section-header">
                    <h2 className="pf-section-title">
                      <span style={{ color: activeColor }}>{selectedProject.name}</span>
                    </h2>
                    <p className="pf-section-sub">{selectedProject.description}</p>
                  </div>

                  {/* Gallery Grid */}
                  {selectedProject.assets.length > 0 ? (
                    <div
                      className="pf-gallery-grid"
                      style={selectedProject.aspectRatio === '9/16' ? {
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'
                      } : selectedProject.aspectRatio === '16/9' ? {
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
                      } : {}}
                    >
                      {selectedProject.assets.map((asset, index) => (
                        <div
                          key={index}
                          className="pf-gallery-item"
                          onClick={() => openLightbox(asset)}
                          style={{
                            '--card-color': activeColor,
                            aspectRatio: selectedProject.aspectRatio || '3/4'
                          } as React.CSSProperties}
                        >
                          {asset.type === 'image' ? (
                            <Image
                              src={asset.url}
                              alt={asset.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                              style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                              className="pf-gallery-img"
                              priority={index < 4}
                            />
                          ) : (
                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                              <video
                                autoPlay muted loop playsInline preload="metadata"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              >
                                <source src={asset.url} type="video/mp4" />
                              </video>
                              <div className="pf-video-play-overlay">
                                <Play size={48} fill="white" color="white" />
                              </div>
                            </div>
                          )}
                          <div className="pf-gallery-overlay">
                            <div className="pf-gallery-overlay-inner">
                              <span className="pf-gallery-title">{asset.title}</span>
                              <ZoomIn size={18} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="pf-coming-soon">
                      <div className="pf-coming-soon-icon" style={{ color: activeColor }}>
                        {activeCategory.icon === 'camera' ? <Camera size={64} /> : activeCategory.icon === 'video' ? <Video size={64} /> : <Palette size={64} />}
                      </div>
                      <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.5rem', marginTop: '1.5rem' }}>
                        Contenido Próximamente
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', maxWidth: '400px', lineHeight: 1.7, marginTop: '0.75rem' }}>
                        Estamos preparando el contenido de este proyecto. Vuelve pronto para ver nuestro trabajo más reciente.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── Outro ───────────────────────────────────── */}
        <section style={{
          padding: '4rem 0', display: 'flex', alignItems: 'center',
          justifyContent: 'center', borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ textAlign: 'center', padding: '0 1rem' }}>
            <p style={{ fontSize: 'clamp(0.6rem, 3vw, 0.8rem)', opacity: 0.5, letterSpacing: '0.2em', fontFamily: "'Outfit', sans-serif" }}>
              {'{ ELITE MOTION SV — 2026 }'}
            </p>
          </div>
        </section>

        {/* ── Lightbox Modal ──────────────────────────── */}
        {selectedAsset && (
          <div className="pf-lightbox" onClick={closeLightbox}>
            <button className="pf-lightbox-close" onClick={closeLightbox}>
              <X size={32} />
            </button>
            <div className="pf-lightbox-content" onClick={(e) => e.stopPropagation()}>
              {selectedAsset.type === 'image' ? (
                <div style={{ position: 'relative', width: '90vw', height: '90vh' }}>
                  <Image
                    src={selectedAsset.url}
                    alt={selectedAsset.title}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ) : (
                <video
                  controls autoPlay loop
                  style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '8px' }}
                >
                  <source src={selectedAsset.url} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        )}
      </main>

      <style>{`
        /* ── Tabs ───────────────────────────────────── */
        .pf-tabs {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .pf-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
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
        .pf-tab-btn:hover {
          color: rgba(255,255,255,0.8);
          border-color: rgba(255,255,255,0.25);
        }
        .pf-tab-btn.active {
          font-weight: 700;
        }

        /* ── Section Header ─────────────────────────── */
        .pf-section-header {
          text-align: center;
          margin-bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .pf-section-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.2;
          color: #fafafa;
          margin: 0;
        }
        .pf-section-sub {
          font-family: 'Outfit', sans-serif;
          color: rgba(255,255,255,0.5);
          font-size: 0.95rem;
          max-width: 580px;
          line-height: 1.7;
          margin: 0;
        }

        /* ── Back Button ────────────────────────────── */
        .pf-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          cursor: pointer;
          transition: all 0.25s ease;
          margin-bottom: 2rem;
        }
        .pf-back-btn:hover {
          border-color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.06);
          transform: translateX(-4px);
        }

        /* ── Project Cards Grid ─────────────────────── */
        .pf-projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .pf-project-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.35s ease;
          display: flex;
          flex-direction: column;
          text-align: left;
          padding: 0;
          font-family: inherit;
          color: inherit;
        }
        .pf-project-card:hover {
          border-color: var(--card-color, rgba(255,255,255,0.2));
          background: rgba(255,255,255,0.05);
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 40px color-mix(in srgb, var(--card-color, #fff) 15%, transparent);
        }

        /* Thumbnail */
        .pf-project-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
          overflow: hidden;
        }
        .pf-project-thumb-overlay {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          z-index: 2;
        }
        .pf-project-count {
          display: inline-block;
          padding: 0.3rem 0.75rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          color: rgba(255,255,255,0.85);
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .pf-project-card:hover .pf-project-thumb img,
        .pf-project-card:hover .pf-project-thumb video {
          transform: scale(1.05);
        }
        .pf-project-thumb img,
        .pf-project-thumb video {
          transition: transform 0.5s ease !important;
        }

        /* Info */
        .pf-project-info {
          padding: 1.5rem 1.75rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }
        .pf-project-name {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.2rem;
          color: #fafafa;
          margin: 0;
        }
        .pf-project-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }
        .pf-project-link {
          font-family: 'Outfit', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          margin-top: 0.5rem;
          transition: gap 0.2s, letter-spacing 0.2s;
        }
        .pf-project-card:hover .pf-project-link {
          letter-spacing: 0.06em;
        }

        /* ── Gallery Grid ───────────────────────────── */
        .pf-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .pf-gallery-item {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          border-radius: 12px;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.3s ease;
        }
        .pf-gallery-item:hover {
          border-color: var(--card-color, rgba(255,255,255,0.2));
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          transform: translateY(-4px);
        }
        .pf-gallery-item:hover .pf-gallery-img {
          transform: scale(1.1) !important;
        }
        .pf-gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent 50%);
          display: flex;
          align-items: flex-end;
          padding: 1.25rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .pf-gallery-item:hover .pf-gallery-overlay {
          opacity: 1;
        }
        .pf-gallery-overlay-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .pf-gallery-title {
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: #fafafa;
        }

        /* Video play overlay */
        .pf-video-play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.2);
          transition: background 0.3s;
        }
        .pf-gallery-item:hover .pf-video-play-overlay {
          background: rgba(0,0,0,0.35);
        }

        /* ── Coming Soon ────────────────────────────── */
        .pf-coming-soon {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 6rem 2rem;
          background: rgba(255,255,255,0.02);
          border: 1px dashed rgba(255,255,255,0.08);
          border-radius: 20px;
        }
        .pf-coming-soon-icon {
          opacity: 0.3;
        }

        /* ── Lightbox ───────────────────────────────── */
        .pf-lightbox {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0,0,0,0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .pf-lightbox-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          z-index: 1010;
          transition: all 0.2s;
        }
        .pf-lightbox-close:hover {
          background: rgba(255,255,255,0.15);
          transform: rotate(90deg);
        }
        .pf-lightbox-content {
          max-width: 90vw;
          max-height: 90vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Responsive ─────────────────────────────── */
        @media (max-width: 900px) {
          .pf-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .pf-tabs {
            gap: 0.5rem;
          }
          .pf-tab-btn {
            font-size: 0.78rem;
            padding: 0.55rem 1rem;
          }
          .pf-gallery-grid {
            grid-template-columns: 1fr;
          }
          .pf-projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
