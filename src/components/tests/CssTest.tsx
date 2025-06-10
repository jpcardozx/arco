'use client';

import React from 'react';

/**
 * Componente para testar a aplicação de estilos CSS
 */
export default function CssTest() {
    return (
        <div className="min-h-screen bg-white p-10">
            <h1 className="mb-6 text-4xl font-bold text-blue-600">Teste de CSS</h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Cartões de teste */}
                <div className="rounded-lg bg-blue-100 p-6 shadow-md hover:shadow-lg">
                    <h2 className="text-xl font-semibold text-blue-800">Tailwind Test 1</h2>
                    <p className="mt-2 text-gray-700">Este card usa classes do Tailwind para estilização</p>
                    <button className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                        Botão Estilizado
                    </button>
                </div>

                <div className="rounded-lg bg-green-100 p-6 shadow-md hover:shadow-lg">
                    <h2 className="text-xl font-semibold text-green-800">Tailwind Test 2</h2>
                    <p className="mt-2 text-gray-700">Verificando se os estilos são aplicados corretamente</p>
                    <button className="mt-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700">
                        Outro Botão
                    </button>
                </div>

                <div className="rounded-lg bg-purple-100 p-6 shadow-md hover:shadow-lg">
                    <h2 className="text-xl font-semibold text-purple-800">Tailwind Test 3</h2>
                    <p className="mt-2 text-gray-700">Testando cores e espaçamento</p>
                    <button className="mt-4 rounded bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-700">
                        Botão Roxo
                    </button>
                </div>
            </div>

            {/* Classes premium */}
            <div className="mt-10 rounded-xl bg-neutral-900 p-8 text-white">
                <h2 className="premium-font-serif text-3xl">Estilos Premium</h2>
                <p className="premium-text-highlight mt-4">Este texto deveria ter estilos premium aplicados</p>
            </div>

            {/* Ícones de teste */}
            <div className="mt-10 flex gap-4">
                <span className="rounded-full bg-blue-500 p-3 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                </span>
                <span className="rounded-full bg-green-500 p-3 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                </span>
            </div>

            {/* Animações */}
            <div className="mt-10">
                <div className="animate-pulse rounded-lg bg-red-100 p-4 text-center">
                    Animação de Pulse
                </div>
                <div className="mt-4 animate-bounce rounded-lg bg-yellow-100 p-4 text-center">
                    Animação de Bounce
                </div>
            </div>
        </div>
    );
}
