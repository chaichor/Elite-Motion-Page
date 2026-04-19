'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Play, X, ZoomIn } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const assets = [
    { type: 'video', url: '/videos_vertical_portafolio/yaxhe_emprendimiento_sombreros_personalizados.mp4', title: 'Sombreros Personalizados' },
    { type: 'image', url: '/img_portafolio/yaxhe_1.webp', title: 'Sesión de Producto 01' },
    { type: 'image', url: '/img_portafolio/yaxhe 2 (1).webp', title: 'Sesión de Producto 02' },
    { type: 'image', url: '/img_portafolio/yaxhe 3 (1).webp', title: 'Sesión de Producto 03' },
    { type: 'image', url: '/img_portafolio/yaxhe 4 (1).webp', title: 'Sesión de Producto 04' },
    { type: 'logo', url: '', title: '' },
    { type: 'image', url: '/img_portafolio/yaxhe 5 (1).webp', title: 'Sesión de Producto 05' },
    { type: 'image', url: '/img_portafolio/yaxhe 6 (1).webp', title: 'Sesión de Producto 06' },
    { type: 'image', url: '/img_portafolio/yaxhe 7 (1).webp', title: 'Sesión de Producto 07' },
    { type: 'image', url: '/img_portafolio/yaxhe 8 (1).webp', title: 'Sesión de Producto 08' },
    { type: 'image', url: '/img_portafolio/yaxhe 9 (1).webp', title: 'Sesión de Producto 09' },
    { type: 'image', url: '/img_portafolio/Post 01.webp', title: 'Post 01' },
    { type: 'image', url: '/img_portafolio/Post 02.webp', title: 'Post 02' },
    { type: 'image', url: '/img_portafolio/Post 03.webp', title: 'Post 03' },
    { type: 'image', url: '/img_portafolio/Post 04.webp', title: 'Post 04' },
    { type: 'logo', url: '', title: '' },
    { type: 'image', url: '/img_portafolio/Post 05.webp', title: 'Post 05' },
    { type: 'image', url: '/img_portafolio/Post 06.webp', title: 'Post 06' },
    { type: 'image', url: '/img_portafolio/Post 07.webp', title: 'Post 07' },
    { type: 'image', url: '/img_portafolio/Post 08.webp', title: 'Post 08' },
    { type: 'image', url: '/img_portafolio/Post 09.webp', title: 'Post 09' },
    { type: 'logo', url: '', title: '' },
    { type: 'image', url: '/img_portafolio/Post 10.webp', title: 'Post 10' },
    { type: 'image', url: '/img_portafolio/Post 11.webp', title: 'Post 11' },
];

export default function Portafolio() {
    const [selectedAsset, setSelectedAsset] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const introRef = useRef<HTMLDivElement>(null);

    // Asset Preloading Logic (Solo esperamos los primeros 8 para que la página sea rápida)
    useEffect(() => {
        const priorityAssets = assets.slice(0, 8).filter(a => a.type === 'image' || a.type === 'video');
        let loadedCount = 0;
        
        if (priorityAssets.length === 0) {
            setIsLoading(false);
            return;
        }

        const onAssetLoaded = () => {
            loadedCount++;
            setProgress(Math.round((loadedCount / priorityAssets.length) * 100));
            if (loadedCount === priorityAssets.length) {
                setTimeout(() => setIsLoading(false), 500);
            }
        };

        priorityAssets.forEach(asset => {
            if (asset.type === 'image') {
                const img = new Image();
                img.src = asset.url;
                img.onload = onAssetLoaded;
                img.onerror = onAssetLoaded;
            } else if (asset.type === 'video') {
                const video = document.createElement('video');
                video.src = asset.url;
                video.onloadeddata = onAssetLoaded;
                video.onerror = onAssetLoaded;
            }
        });
    }, []);

    // Scroll Animations & Header Interactivity
    useEffect(() => {
        // Optimized Animation for Portfolio Items (Fade and slide up, runs once per item)
        const items = document.querySelectorAll('.portfolio-item-wrapper');
        items.forEach((item) => {
            gsap.fromTo(item, 
                { opacity: 0, y: 40 },
                {
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Intro Header Parallax/Ambient movement
        const intro = introRef.current;
        if (intro) {
            // Set initial transform state through GSAP to avoid conflicts with inline styles
            gsap.set('.ambient-grid', { 
                perspective: 1000, 
                rotateX: 20,
                scale: 1.1
            });

            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                // Use a more subtle movement factor
                const xPos = (clientX / window.innerWidth - 0.5) * 60;
                const yPos = (clientY / window.innerHeight - 0.5) * 60;
                
                gsap.to('.intro-text', {
                    x: xPos / 2,
                    y: yPos / 4,
                    duration: 1.2,
                    ease: 'power2.out'
                });

                gsap.to('.ambient-grid', {
                    x: -xPos,
                    y: -yPos,
                    duration: 2,
                    ease: 'power1.out',
                    // Keep the rotations consistent during movement
                    overwrite: 'auto'
                });
            };
            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    // Lightbox Logic
    const openLightbox = (asset: any) => {
        setSelectedAsset(asset);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedAsset(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <main className="portfolio-page" style={{ backgroundColor: '#101214', color: '#fff', overflowX: 'hidden' }}>
            {isLoading && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: '#101214',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    transition: 'opacity 0.5s ease', color: 'white'
                }}>
                    <img src="/imagotipo_blanco.png" alt="Cargando" style={{ maxWidth: '200px', marginBottom: '30px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                    <div style={{ width: '250px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: 'var(--em-accent)', transition: 'width 0.3s ease' }} />
                    </div>
                    <p style={{ marginTop: '15px', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)' }}>
                        CARGANDO {progress}%
                    </p>
                    <style>{`
                        @keyframes pulse {
                            0% { opacity: 0.6; transform: scale(0.98); }
                            50% { opacity: 1; transform: scale(1); }
                            100% { opacity: 0.6; transform: scale(0.98); }
                        }
                    `}</style>
                </div>
            )}
            {/* Intro Section */}
            <section ref={introRef} className="intro" style={{ 
                minHeight: '100vh', display: 'flex', flexDirection: 'column', 
                alignItems: 'center', justifyContent: 'flex-start', position: 'relative',
                overflow: 'hidden', paddingTop: '28vh' // Higher due to no global padding
            }}>
                <div className="ambient-grid" style={{
                    position: 'absolute', inset: '-20%', // More padding to avoid edge cutting
                    backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.08) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(0, 229, 255, 0.08) 1.5px, transparent 1.5px)',
                    backgroundSize: '120px 120px',
                    opacity: 0.4, zIndex: 0, pointerEvents: 'none'
                }} />

                <div className="intro-text text-center" style={{ position: 'relative', zIndex: 1 }}>
                    <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>Showreel 2026</span>
                    <h1 style={{ 
                        fontSize: 'clamp(4rem, 15vw, 12rem)', 
                        textTransform: 'uppercase', 
                        lineHeight: 0.8, 
                        fontWeight: 900, 
                        letterSpacing: '-0.05em' 
                    }}>
                        Elite <br />
                        <span className="text-accent" style={{ color: 'var(--em-accent)' }}>Motion</span>
                    </h1>
                    <p style={{ marginTop: '2rem', fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                        { '{ Audiovisual Production SV }' }
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div style={{
                    position: 'absolute', bottom: '5vh', left: '50%',
                    transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '1rem', opacity: 0.5
                }}>
                    <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Scroll Down</span>
                    <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--em-accent), transparent)' }}></div>
                </div>
            </section>

            {/* Work Section */}
            <section className="work" style={{ backgroundColor: '#1a1d20', padding: '10vh 0' }}>
                <div className="container-full" style={{ padding: '0 5vw' }}>
                    {/* Rows of 4 items each */}
                    {Array.from({ length: Math.ceil(assets.length / 4) }).map((_, rowIndex) => (
                        <div key={rowIndex} className="portfolio-row flex" style={{ width: '100%', marginBottom: '2vw' }}>
                            {assets.slice(rowIndex * 4, rowIndex * 4 + 4).map((asset, index) => (
                                <div key={index} className="col" style={{ flex: 1, aspectRatio: '3/4', padding: '0.5vw' }}>
                                    { asset.type === 'logo' ? (
                                        // Branding Imagotipo Column
                                        <div style={{ 
                                            width: '100%', height: '100%', display: 'flex', 
                                            alignItems: 'center', justifyContent: 'center',
                                            textAlign: 'center'
                                        }}>
                                            <img
                                                src="/imagotipo_blanco.png"
                                                alt="Elite Motion"
                                                style={{ 
                                                    width: '100%', maxWidth: '220px', height: 'auto',
                                                    opacity: 1
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        // Asset Column
                                        <div 
                                            className="portfolio-item-wrapper" 
                                            onClick={() => openLightbox(asset)}
                                            style={{ 
                                                position: 'relative', width: '100%', height: '100%', 
                                                overflow: 'hidden', cursor: 'pointer',
                                                borderRadius: '12px'
                                            }}
                                        >
                                            {asset.type === 'image' ? (
                                                <img 
                                                    src={asset.url} 
                                                    alt={asset.title} 
                                                    loading="lazy"
                                                    decoding="async"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                                    className="hover-scale"
                                                />
                                            ) : (
                                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                                    <video 
                                                        muted loop playsInline 
                                                        preload="none"
                                                        poster={asset.poster}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    >
                                                        <source src={asset.url} type="video/mp4" />
                                                    </video>
                                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                                                        <Play size={48} fill="white" color="white" />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="item-overlay" style={{
                                                position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                                display: 'flex', alignItems: 'flex-end', padding: '1.5rem', opacity: 0, transition: 'opacity 0.3s ease'
                                            }}>
                                                <div className="flex-between w-full">
                                                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{asset.title}</span>
                                                    <ZoomIn size={18} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* Outro */}
            <section className="outro" style={{ 
                height: '60vh', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', backgroundColor: '#101214' 
            }}>
                <div className="text-center">
                    <p style={{ fontSize: '0.8rem', opacity: 0.5, letterSpacing: '0.3em' }}>{ '{ ELITE MOTION SV - 2026 }' }</p>
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedAsset && (
                <div className="lightbox-overlay" style={{
                    position: 'fixed', inset: 0, zIndex: 1000, 
                    backgroundColor: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '2rem'
                }}>
                    <button onClick={closeLightbox} style={{ 
                        position: 'absolute', top: '2rem', right: '2rem', 
                        background: 'none', border: 'none', color: 'white', cursor: 'pointer' 
                    }}>
                        <X size={40} />
                    </button>
                    
                    <div className="lightbox-content" style={{ 
                        maxWidth: '90vw', maxHeight: '90vh', position: 'relative',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {selectedAsset.type === 'image' ? (
                            <img 
                                src={selectedAsset.url} 
                                alt={selectedAsset.title} 
                                style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px' }}
                            />
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

            <style jsx>{`
                .hover-scale:hover {
                    transform: scale(1.1);
                }
                .portfolio-item-wrapper:hover .item-overlay {
                    opacity: 1 !important;
                }
                @media (max-width: 768px) {
                    .portfolio-row {
                        flex-direction: column !important;
                    }
                    .col {
                        aspect-ratio: auto !important;
                        height: 60vh !important;
                    }
                    .branding-text {
                        font-size: 8vw !important;
                    }
                }
            `}</style>
        </main>
    );
}
