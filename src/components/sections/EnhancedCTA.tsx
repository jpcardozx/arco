'use client';

import React from "react";

export default function EnhancedCTA() {
    return (
        <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-800 text-white py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Pronto para transformar sua performance digital?
                    </h2>
                    <p className="text-xl mb-10 text-blue-100">
                        Entre em contato conosco para uma análise inicial gratuita e descubra como podemos ajudar sua empresa a recuperar receita perdida.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="#contact"
                            className="bg-white text-blue-900 px-8 py-4 rounded-md font-medium text-lg hover:bg-blue-50 transition-colors"
                        >
                            Fale Conosco
                        </a>
                        <a
                            href="#"
                            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-white/10 transition-colors"
                        >
                            Ver Demonstração
                        </a>
                    </div>

                    <div className="mt-16">
                        <p className="text-blue-200 mb-4">Empresas que confiam na ARCO</p>
                        <div className="flex flex-wrap justify-center gap-8 opacity-70">
                            <div className="h-12 w-24 bg-white/20 rounded"></div>
                            <div className="h-12 w-24 bg-white/20 rounded"></div>
                            <div className="h-12 w-24 bg-white/20 rounded"></div>
                            <div className="h-12 w-24 bg-white/20 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
