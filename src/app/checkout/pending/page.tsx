'use client';

export const dynamic = 'force-dynamic'

import { StatusScreenBrick } from '@/components/payment/StatusScreenBrick';
import { MercadoPagoProvider } from '@/providers/MercadoPagoProvider';
import { MainLayout } from '@/components/layout/MainLayout';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Clock } from 'lucide-react';

function PendingContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams?.get('paymentId');

  if (!paymentId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Pagamento não encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            Não foi possível localizar as informações do seu pagamento.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ir para o Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <MercadoPagoProvider>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full mb-6 shadow-lg shadow-yellow-500/30 animate-pulse">
              <Clock className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Pagamento Pendente
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Aguardando confirmação do seu pagamento
            </p>
          </div>

          {/* Status Screen Brick */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <StatusScreenBrick paymentId={paymentId} />
          </div>

          {/* Informações sobre métodos pendentes */}
          <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              O que fazer agora?
            </h3>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🏦</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Boleto Bancário
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Se você escolheu boleto, ele foi enviado por email. Você
                      também pode acessá-lo acima.
                    </p>
                    <p className="text-sm text-gray-500">
                      ⏱️ <strong>Prazo:</strong> O pagamento pode levar até 3
                      dias úteis para ser confirmado após o pagamento.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">💳</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Pix
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Se você escolheu Pix, copie o código QR ou use o código
                      Pix Copia e Cola mostrado acima.
                    </p>
                    <p className="text-sm text-gray-500">
                      ⚡ <strong>Prazo:</strong> Confirmação em até 2 minutos
                      após o pagamento.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🔍</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Revisão Manual
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Em alguns casos, o pagamento pode estar em análise por
                      questões de segurança.
                    </p>
                    <p className="text-sm text-gray-500">
                      📧 <strong>Prazo:</strong> Você será notificado por email
                      assim que o pagamento for aprovado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ações rápidas */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="/dashboard"
              className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all group"
            >
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                Acessar Dashboard
              </h3>
              <p className="text-sm text-gray-600">
                Acompanhe o status do seu pagamento
              </p>
            </a>

            <a
              href="/suporte"
              className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all group"
            >
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                Suporte
              </h3>
              <p className="text-sm text-gray-600">
                Precisa de ajuda? Fale conosco
              </p>
            </a>
          </div>
        </div>
      </div>
    </MercadoPagoProvider>
  );
}

export default function PendingPage() {
  return (
    <MainLayout  showFooter={true}>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-600"></div>
          </div>
        }
      >
        <PendingContent />
      </Suspense>
    </MainLayout>
  );
}
