'use client';

import { Payment } from '@mercadopago/sdk-react';
import { useState } from 'react';

interface PaymentBrickProps {
  preferenceId: string;
  amount: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: any) => void;
}

/**
 * Payment Brick - Formulário completo de pagamento do Mercado Pago
 * 
 * Suporta:
 * - Cartões de crédito (todos)
 * - Cartão de débito virtual Caixa
 * - Pix
 * - Boleto bancário
 * - Conta Mercado Pago
 * 
 * @see https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks/payment-brick/introduction
 */
export function PaymentBrick({
  preferenceId,
  amount,
  onSuccess,
  onError,
}: PaymentBrickProps) {
  const [loading, setLoading] = useState(false);

  const initialization = {
    amount,
    preferenceId,
    payer: {
      email: '', // Será preenchido pelo usuário no formulário
    },
  };

  const customization = {
    visual: {
      style: {
        theme: 'default' as const, // Tema oficial do MP (otimizado para conversão)
      },
    },
    paymentMethods: {
      creditCard: 'all' as const, // Habilitar todos os cartões de crédito
      debitCard: 'all' as const, // Débito virtual Caixa
      ticket: 'all' as const, // Boleto bancário
      mercadoPago: 'all' as const, // Conta Mercado Pago
      atm: 'all' as const, // Pix
    },
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }: any) => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      fetch('/api/checkout/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          selectedPaymentMethod,
          preferenceId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);

          if (data.error) {
            console.error('Erro ao processar pagamento:', data.error);
            onError(data.error);
            reject(data.error);
          } else {
            console.log('✅ Pagamento processado:', data.paymentId);
            onSuccess(data.paymentId);
            resolve(data);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error('Erro na requisição:', error);
          onError(error);
          reject(error);
        });
    });
  };

  const onReady = async () => {
    console.log('✅ Payment Brick carregado');
  };

  const onErrorBrick = async (error: any) => {
    console.error('❌ Erro no Payment Brick:', error);
    onError(error);
  };

  return (
    <div className="payment-brick-container relative">
      {loading && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex items-center justify-center z-10 rounded-lg">
          <div className="text-center max-w-sm">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-25"></div>
              <div className="relative">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-gray-800 font-semibold text-lg mb-2">
              Processando pagamento seguro
            </p>
            <p className="text-sm text-gray-600">
              Aguarde enquanto confirmamos seus dados com segurança
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Conexão criptografada</span>
            </div>
          </div>
        </div>
      )}

      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onErrorBrick}
      />
    </div>
  );
}
