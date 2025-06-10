'use client';

import React from "react";

export default function HeroARCOEnhanced() {
    return (
        <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white min-h-[85vh] flex items-center">
            <div className="container mx-auto px-4 py-24 mt-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Transforme métricas em resultados financeiros
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100">
                        Para empresas que perdem receita devido a problemas técnicos invisíveis,
                        oferecemos análises precisas e correções estratégicas que geram resultados imediatos.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="#contact"
                            className="bg-white text-blue-900 px-8 py-3 rounded-md font-medium text-lg hover:bg-blue-50 transition-colors"
                        >
                            Start Your Journey
                        </a>
                        <a
                            href="#process"
                            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-medium text-lg hover:bg-white/10 transition-colors"
                        >
                            See More
                        </a>
                    </div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                            <div className="text-3xl font-bold text-blue-300">37%</div>
                            <div className="text-sm mt-2">Aumento médio na taxa de checkout</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                            <div className="text-3xl font-bold text-blue-300">2.8s</div>
                            <div className="text-sm mt-2">Redução no tempo de carregamento</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                            <div className="text-3xl font-bold text-blue-300">28%</div>
                            <div className="text-sm mt-2">Aumento no valor médio de pedido</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
