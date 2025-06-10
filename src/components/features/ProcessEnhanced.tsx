'use client';

import React from "react";

export default function ProcessEnhanced() {
    const steps = [
        {
            number: "01",
            title: "Análise Técnica",
            description: "Identificamos problemas técnicos invisíveis que estão impactando sua receita."
        },
        {
            number: "02",
            title: "Estratégia de Correção",
            description: "Desenvolvemos um plano de ação para resolver os problemas identificados."
        },
        {
            number: "03",
            title: "Implementação",
            description: "Aplicamos as correções necessárias com foco em resultados rápidos."
        },
        {
            number: "04",
            title: "Mensuração de Resultados",
            description: "Monitoramos os indicadores financeiros para comprovar o impacto das correções."
        }
    ];

    return (
        <div className="bg-white py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Nosso Processo</h2>
                    <p className="text-lg text-gray-600">
                        Uma abordagem estratégica para transformar problemas técnicos em ganhos financeiros
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="text-4xl font-bold text-blue-600 mb-4">{step.number}</div>
                            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
