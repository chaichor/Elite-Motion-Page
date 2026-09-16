'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { PixelReveal } from '@/components/ui/PixelReveal';
import { KineticText } from '@/components/ui/KineticText';
import { HyperText } from '@/components/ui/HyperText';
import { useReveal } from '@/lib/useReveal';
import { projects, type Media, type Project } from '@/lib/projects';

const pad = (n: number) => String(n).padStart(2, '0');

function Frame({ item, sizes, priority }: { item: Media; sizes: string; priority?: boolean }) {
  if (item.kind === 'video') {
    return <video src={item.src} muted loop playsInline autoPlay preload="metadata" controlsList="nodownload noplaybackrate noremoteplayback" disablePictureInPicture disableRemotePlayback />;
  }
  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      sizes={sizes}
      quality={75}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      unoptimized
      draggable={false}
    />
  );
}

export default function Portafolio() {
  const [viewer, setViewer] = useState<{ project: Project; index: number } | null>(null);

  useReveal('.em-work');

  const close = useCallback(() => setViewer(null), []);

  const step = useCallback((delta: number) => {
    setViewer((current) => {
      if (!current) return current;
      const next = current.index + delta;
      if (next < 0 || next >= current.project.media.length) return current;
      return { ...current, index: next };
    });
  }, []);

  useEffect(() => {
    if (!viewer) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [viewer, close, step]);

  const shot = viewer ? viewer.project.media[viewer.index] : null;

  return (
    <div className="container em-works">
      <header className="em-works-hero">
        <span className="em-label">Selected work — El Salvador</span>

        <KineticText
          as="h1"
          className="em-works-statement"
          text={'Cada proyecto es una prueba,\nno un portafolio.'}
          highlight="una prueba"
          spread={0.35}
        />

        <HyperText
          as="p"
          className="em-works-lede"
          text="Fotografía, video, dron y diseño para marcas que necesitan verse mejor de lo que la competencia se puede permitir."
        />

        <div className="em-works-index">
          <span className="em-label">{pad(projects.length)} proyectos</span>
          <span className="em-label">
            {projects.reduce((total, project) => total + project.media.length, 0)} piezas entregadas
          </span>
          <span className="em-label">2026</span>
        </div>
      </header>

      <ol className="em-works-list">
        {projects.map((project, i) => (
          <li key={project.slug} className="em-work" data-align={i % 2 === 0 ? 'left' : 'right'}>
            <div className="em-work-head">
              <span className="em-work-num">({pad(i + 1)})</span>
              <h2 className="em-work-title">{project.title}</h2>
              <span className="em-work-cat">
                {project.category} · {project.year}
              </span>
            </div>

            <button
              type="button"
              className="em-work-frame"
              onClick={() => setViewer({ project, index: 0 })}
              aria-label={`Ver el proyecto ${project.title}`}
            >
              <PixelReveal fill grid="6x4" seed={i + 1}>
                <Frame
                  item={project.cover}
                  sizes="(max-width: 900px) 100vw, 70vw"
                  priority={i === 0}
                />
              </PixelReveal>
              <span className="em-work-open">
                Ver {project.media.length} piezas
                <ArrowRight size={13} />
              </span>
            </button>

            <div className="em-work-foot">
              <p className="em-work-summary">{project.summary}</p>
              <ul className="em-work-services">
                {project.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      {viewer && shot && (
        <div
          className="em-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={viewer.project.title}
        >
          <div className="em-viewer-bar">
            <span className="em-viewer-kicker">
              <strong>{viewer.project.title}</strong> — {viewer.project.client}
            </span>
            <div className="em-viewer-tools">
              <span className="em-viewer-count">
                {pad(viewer.index + 1)} / {pad(viewer.project.media.length)}
              </span>
              <button className="em-viewer-btn em-viewer-close" onClick={close} aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="em-viewer-stage">
            {shot.kind === 'image' ? (
              <Image
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                width={1600}
                height={Math.round(1600 / shot.ratio)}
                sizes="92vw"
                quality={75}
                draggable={false}
                unoptimized
              />
            ) : (
              <video
                key={shot.src}
                src={shot.src}
                controls
                autoPlay
                loop
                playsInline
                controlsList="nodownload noplaybackrate noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
              />
            )}
          </div>

          <div className="em-viewer-arrows">
            <button
              className="em-viewer-btn"
              onClick={() => step(-1)}
              disabled={viewer.index === 0}
              aria-label="Pieza anterior"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              className="em-viewer-btn"
              onClick={() => step(1)}
              disabled={viewer.index === viewer.project.media.length - 1}
              aria-label="Pieza siguiente"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
