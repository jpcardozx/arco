'use client';

import { useEffect, useState } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';

interface MercadoPagoProviderProps {
  children: React.ReactNode;
}

/**
 * Provider para inicializar o SDK do Mercado Pago
 * IMPORTANTE: Deve ser inicializado apenas uma vez na aplicação
 * 
 * @see https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks/common-initialization
 */
export function MercadoPagoProvider({ children }: MercadoPagoProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;

    if (!publicKey) {
      setError('Chave pública do Mercado Pago não configurada');
      console.error('NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY não encontrada');
      return;
    }

    if (!isInitialized) {
      try {
        initMercadoPago(publicKey, {
          locale: 'pt-BR',
        });
        
        setIsInitialized(true);
        console.log('✅ Mercado Pago SDK inicializado');
      } catch (err) {
        setError('Erro ao inicializar SDK do Mercado Pago');
        console.error('Erro ao inicializar Mercado Pago SDK:', err);
      }
    }
  }, [isInitialized]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Erro de Configuração
          </h2>
          <p className="text-gray-700">{error}</p>
          <p className="text-sm text-gray-500 mt-4">
            Verifique suas variáveis de ambiente.
          </p>
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-25"></div>
            <div className="relative inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
          <p className="text-gray-700 font-medium text-lg">Inicializando sistema de pagamentos...</p>
          <p className="text-gray-500 text-sm mt-2">Conectando ao Mercado Pago</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
