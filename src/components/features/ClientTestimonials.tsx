'use client';

import React from "react";

export default function ClientTestimonials() {
    const testimonials = [
        {
            text: "A análise da ARCO nos ajudou a identificar problemas críticos que estavam impactando nossas vendas. Após a implementação das correções, vimos um aumento imediato em nossas conversões.",
            author: "Ana Silva",
            position: "CMO, Empresa XYZ"
        },
        {
            text: "Trabalhamos com a ARCO para otimizar nossa plataforma e os resultados superaram nossas expectativas. O tempo de carregamento reduziu significativamente e nossas taxas de conversão aumentaram em mais de 30%.",
            author: "Pedro Costa",
            position: "CTO, Tech Solutions"
        }
    ];

    return (
        <div className="bg-gray-50 py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
                    <p className="text-lg text-gray-600">
                        Resultados reais de empresas que transformaram sua performance digital
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                            <p className="text-gray-700 mb-6">"{testimonial.text}"</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full"></div>
                                <div className="ml-4">
                                    <h4 className="font-semibold">{testimonial.author}</h4>
                                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
