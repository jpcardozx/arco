'use client';

import React from "react";

export default function CaseStudiesEnhanced() {
    const cases = [
        {
            title: "E-commerce de Moda",
            description: "Aumento de 45% na taxa de conversão após otimizações de performance técnica e experiência do usuário.",
            image: "/case-study-1.jpg",
            tag: "Varejo"
        },
        {
            title: "Plataforma SaaS B2B",
            description: "Redução de 60% na taxa de abandono do processo de onboarding após redesign baseado em dados.",
            image: "/case-study-2.jpg",
            tag: "Software"
        },
        {
            title: "Marketplace de Serviços",
            description: "Aumento de 32% no valor médio de pedido após implementação de estratégias de cross-selling.",
            image: "/case-study-3.jpg",
            tag: "Serviços"
        }
    ];

    return (
        <div className="bg-neutral-900 text-white py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Estudos de Caso</h2>
                    <p className="text-lg text-neutral-300 mb-10">
                        Resultados reais que transformaram o desempenho dos negócios de nossos clientes
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cases.map((caseItem, index) => (
                        <div key={index} className="bg-neutral-800 rounded-lg overflow-hidden hover:bg-neutral-700 transition-colors cursor-pointer">
                            <div className="h-48 bg-neutral-700 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-indigo-800/40"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-blue-800 text-xs py-1 px-2 rounded font-medium">{caseItem.tag}</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{caseItem.title}</h3>
                                <p className="text-neutral-400 mb-4">{caseItem.description}</p>
                                <div className="text-blue-400 font-medium flex items-center">
                                    <span>Ver estudo completo</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="#"
                        className="inline-block border-2 border-blue-500 text-blue-400 px-8 py-3 rounded-md font-medium hover:bg-blue-900/20 transition-colors"
                    >
                        Ver Todos os Casos
                    </a>
                </div>
            </div>
        </div>
    );
}
