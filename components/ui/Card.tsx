import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    highlighted?: boolean;
}

export default function Card({
    children,
    className = '',
    highlighted = false,
}: CardProps) {
    return (
        <div
            className={`glass-card ${className}`}
            style={highlighted ? {
                borderColor: 'var(--accent)',
                boxShadow: '0 0 30px var(--accent-glow)',
            } : {}}
        >
            {children}
        </div>
    );
}
