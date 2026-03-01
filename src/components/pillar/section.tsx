import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
    id?: string;
    bg?: 'white' | 'violet' | 'gray' | 'fuchsia';
}

export default function PillarSection({ children, className = '', id, bg = 'white' }: Props) {
    const bgClasses = {
        white: 'bg-white',
        violet: 'bg-violet-900 text-white',
        gray: 'bg-gray-50',
        fuchsia: 'bg-fuchsia-50',
    };

    return (
        <section
            id={id}
            className={`py-20 px-4 md:py-28 ${bgClasses[bg]} ${className}`}
        >
            <div className="mx-auto max-w-7xl">
                {children}
            </div>
        </section>
    );
}
