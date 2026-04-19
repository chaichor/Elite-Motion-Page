'use client';

import { useState, useEffect } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Animate from 0 to 100 over ~2 seconds
        const duration = 2000;
        const interval = 20;
        const increment = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    // Start exit animation
                    setTimeout(() => {
                        setIsExiting(true);
                        setTimeout(onComplete, 800);
                    }, 300);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#050505',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
                opacity: isExiting ? 0 : 1,
                transform: isExiting ? 'scale(1.1)' : 'scale(1)',
                pointerEvents: isExiting ? 'none' : 'auto',
            }}
        >
            {/* Animated background particles */}
            <div style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                opacity: 0.3,
            }}>
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: '2px',
                            height: '2px',
                            background: '#00e5ff',
                            borderRadius: '50%',
                            animation: `floatParticle ${3 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Glowing orb behind text */}
            <div className="loading-orb" style={{
                position: 'absolute',
                width: 'min(300px, 80vw)',
                height: 'min(300px, 80vw)',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)',
                animation: 'pulseGlow 2s ease-in-out infinite',
            }} />

            {/* Progress number */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    fontSize: 'clamp(5rem, 15vw, 10rem)',
                    fontWeight: 800,
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '-0.05em',
                    background: 'linear-gradient(135deg, #ffffff 0%, #00e5ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    transition: 'all 0.1s ease',
                }}
            >
                {Math.floor(progress)}%
            </div>

            {/* Subtitle */}
            <div
                className="loading-subtitle"
                style={{
                    position: 'relative',
                    zIndex: 1,
                    marginTop: '0.75rem',
                    fontSize: 'clamp(0.65rem, 2.5vw, 0.875rem)',
                    fontWeight: 500,
                    letterSpacing: 'clamp(0.15em, 1vw, 0.3em)',
                    textTransform: 'uppercase',
                    color: 'rgba(255, 255, 255, 0.5)',
                    opacity: progress > 50 ? 1 : 0,
                    transform: progress > 50 ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'all 0.5s ease',
                }}
            >
                Elite Motion
            </div>

            {/* Progress bar */}
            <div
                className="loading-progress-bar"
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'min(200px, 60vw)',
                    height: '2px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        height: '100%',
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, #00e5ff, #ffffff)',
                        borderRadius: '2px',
                        transition: 'width 0.1s ease',
                        boxShadow: '0 0 20px rgba(0, 229, 255, 0.5)',
                    }}
                />
            </div>

            <style jsx>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(${Math.random() > 0.5 ? '' : '-'}30px, -50px);
            opacity: 0.8;
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
      `}</style>
        </div>
    );
}
