import React from 'react';
import Image from 'next/image';

interface Props {
    title: string;
    description: string;
    icon?: string;
    className?: string;
}

export default function FeatureCard({ title, description, icon, className = '' }: Props) {
    return (
        <div className={`group p-8 rounded-[2rem] bg-white border border-violet-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-fuchsia-200 ${className}`}>
            {icon && (
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-violet-50 group-hover:bg-fuchsia-50 transition-colors duration-300">
                    <Image src={icon} alt={title} width={40} height={40} className="w-10 h-10 object-contain" />
                </div>
            )}
            <h3 className="text-xl font-bold text-violet-900 mb-3 group-hover:text-fuchsia-600 transition-colors">
                {title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
                {description}
            </p>
        </div>
    );
}
