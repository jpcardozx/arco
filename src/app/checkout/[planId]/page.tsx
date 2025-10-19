'use client';

export const dynamic = 'force-dynamic'

import { PaymentBrick } from '@/components/payment/PaymentBrick';
import { CheckoutSummary } from '@/components/payment/CheckoutSummary';
import { MercadoPagoProvider } from '@/providers/MercadoPagoProvider';
import { MainLayout } from '@/components/layout/MainLayout';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Shield, Lock } from 'lucide-react';
import Link from 'next/link';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  description: string;
}

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function createPreference() {
      try {
        setLoading(true);

        if (!params?.planId) {
          throw new Error('Plan ID não encontrado');
        }

        // Criar preferência no backend
        const response = await fetch('/api/checkout/create-preference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planId: params.planId }),
        });

        if (!response.ok) {
          throw new Error('Erro ao criar preferência de pagamento');
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setPreferenceId(data.preferenceId);
        setPlan(data.plan);
      } catch (error) {
        console.error('Error creating preference:', error);
        setError(
          error instanceof Error
            ? error.message
            : 'Erro ao carregar checkout'
        );
      } finally {
        setLoading(false);
      }
    }

    createPreference();
  }, [params?.planId]);

  const handleSuccess = (paymentId: string) => {
    console.log('✅ Pagamento aprovado:', paymentId);
    router.push(`/checkout/success?paymentId=${paymentId}` as any);
  };

  const handleError = (error: any) => {
    console.error('❌ Erro no pagamento:', error);
    const errorMessage =
      error?.message || 'Erro ao processar pagamento';
    router.push(`/checkout/error?reason=${encodeURIComponent(errorMessage)}` as any);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Ops! Algo deu errado
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para planos
          </Link>
        </div>
      </div>
    );
  }

  if (loading || !preferenceId || !plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Preparando checkout...</p>
          <p className="text-gray-500 text-sm mt-2">
            Aguarde enquanto configuramos seu pagamento
          </p>
        </div>
      </div>
    );
  }

  return (
    <MainLayout  showFooter={true}>
      <MercadoPagoProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-8">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar para planos
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Finalizar Assinatura
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Pagamento 100% seguro processado pelo Mercado Pago
              </p>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Resumo do pedido - 2 colunas */}
              <div className="lg:col-span-2">
                <CheckoutSummary plan={plan} />
              </div>

              {/* Formulário de pagamento - 3 colunas */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  {/* Header do formulário */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Dados de Pagamento
                    </h2>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Seus dados estão protegidos e não são armazenados
                    </p>
                  </div>

                  {/* Payment Brick */}
                  <PaymentBrick
                    preferenceId={preferenceId}
                    amount={plan.price}
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />

                  {/* Footer do formulário */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                      <img
                        src="/mercadopago-logo.svg"
                        alt="Mercado Pago"
                        className="h-6 opacity-75"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span>Pagamento processado com segurança</span>
                    </div>
                  </div>
                </div>

                {/* Métodos de pagamento disponíveis */}
                <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Métodos de pagamento disponíveis:
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      'Cartão de Crédito',
                      'Cartão de Débito',
                      'Pix',
                      'Boleto Bancário',
                      'Conta Mercado Pago',
                    ].map((method) => (
                      <div
                        key={method}
                        className="bg-white rounded-lg px-3 py-2 text-sm text-gray-700 text-center shadow-sm"
                      >
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MercadoPagoProvider>
    </MainLayout>
  );
}
