import React from 'react';
import Image from 'next/image';

interface Props {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
}

export default function FloatingMascot({ src, alt, width = 500, height = 500, className = '' }: Props) {
    return (
        <div className={`relative ${className}`}>
            {/* Background Glow */}
            <div className="absolute inset-0 bg-violet-500/10 blur-[100px] rounded-full" />

            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="relative z-10 w-full h-auto drop-shadow-2xl animate-float"
                priority
            />
        </div>
    );
}
