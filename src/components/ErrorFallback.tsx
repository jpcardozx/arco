import React from 'react';

interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
    return (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 my-4 mx-auto max-w-2xl rounded shadow-sm">
            <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 className="text-lg font-semibold text-red-800">Algo deu errado</h2>
            </div>
            <p className="text-red-700 mb-4">
                {error.message || "Ocorreu um erro ao carregar este componente."}
            </p>
            <div className="flex justify-between items-center">
                <p className="text-sm text-red-600">
                    Por favor, tente novamente ou entre em contato com o suporte técnico.
                </p>
                <button
                    onClick={resetErrorBoundary}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
                >
                    Tentar Novamente
                </button>
            </div>
        </div>
    );
}
