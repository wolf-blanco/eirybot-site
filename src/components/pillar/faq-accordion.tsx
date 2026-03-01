import React from 'react';

interface FAQ {
    q: string;
    a: string;
}

interface Props {
    items: FAQ[];
    locale: string;
}

export default function FAQAccordion({ items, locale }: Props) {
    return (
        <div className="space-y-4 max-w-3xl mx-auto">
            {items.map((item, i) => (
                <div
                    key={i}
                    className="group border border-violet-100 rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:border-violet-200 hover:shadow-md"
                >
                    <div className="p-6 cursor-pointer">
                        <h4 className="font-bold text-violet-900 flex justify-between items-center group-hover:text-violet-700">
                            {item.q}
                            <span className="text-violet-300 group-hover:text-violet-500 transition-transform duration-300 group-hover:rotate-90">→</span>
                        </h4>
                        <div className="mt-3 text-gray-600 text-sm leading-relaxed">
                            {item.a}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
