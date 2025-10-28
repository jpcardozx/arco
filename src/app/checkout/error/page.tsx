'use client';

export const dynamic = 'force-dynamic';

import { MainLayout } from '@/components/layout/MainLayout';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reason = searchParams?.get('reason') || 'Erro desconhecido';

  const commonErrors: Record<string, { title: string; description: string; action: string }> = {
    'cc_rejected_insufficient_amount': {
      title: 'Saldo Insuficiente',
      description: 'Seu cartão não tem saldo suficiente para completar a compra.',
      action: 'Tente outro cartão ou método de pagamento',
    },
    'cc_rejected_bad_filled_security_code': {
      title: 'Código de Segurança Inválido',
      description: 'O código CVV do cartão está incorreto.',
      action: 'Verifique o código de 3 dígitos no verso do cartão',
    },
    'cc_rejected_bad_filled_date': {
      title: 'Data de Validade Inválida',
      description: 'A data de validade do cartão está incorreta.',
      action: 'Verifique a data de validade no cartão',
    },
    'cc_rejected_call_for_authorize': {
      title: 'Autorização Necessária',
      description: 'Você precisa autorizar o pagamento com o banco emissor.',
      action: 'Entre em contato com seu banco',
    },
    'cc_rejected_card_disabled': {
      title: 'Cartão Desabilitado',
      description: 'Este cartão não está ativo ou foi bloqueado.',
      action: 'Entre em contato com seu banco',
    },
  };

  const errorInfo = commonErrors[reason] || {
    title: 'Pagamento Recusado',
    description: reason,
    action: 'Tente novamente com outro método de pagamento',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
                <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-400 to-rose-600 rounded-full mb-6 shadow-lg shadow-red-500/30">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Erro no Pagamento
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Não foi possível processar seu pagamento
          </p>
        </div>

        {/* Detalhes do erro */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="border-l-4 border-red-500 pl-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {errorInfo.title}
            </h2>
            <p className="text-gray-700 mb-4">{errorInfo.description}</p>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm font-medium text-red-800">
                💡 {errorInfo.action}
              </p>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 font-semibold"
          >
            <RefreshCw className="w-5 h-5" />
            Tentar Novamente
          </button>

          <button
            onClick={() => router.push('/pricing' as any)}
            className="bg-white text-gray-700 px-6 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 font-semibold border border-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar aos Planos
          </button>
        </div>

        {/* Métodos alternativos */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Métodos de Pagamento Alternativos
          </h3>
          <p className="text-gray-600 mb-6">
            Tente um destes métodos para completar sua compra:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">💳</div>
                <h4 className="font-semibold text-gray-900">
                  Outro Cartão
                </h4>
              </div>
              <p className="text-sm text-gray-600">
                Use outro cartão de crédito ou débito
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">⚡</div>
                <h4 className="font-semibold text-gray-900">Pix</h4>
              </div>
              <p className="text-sm text-gray-600">
                Pagamento instantâneo via Pix
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">🏦</div>
                <h4 className="font-semibold text-gray-900">Boleto</h4>
              </div>
              <p className="text-sm text-gray-600">
                Pague em qualquer banco ou lotérica
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">🔵</div>
                <h4 className="font-semibold text-gray-900">
                  Mercado Pago
                </h4>
              </div>
              <p className="text-sm text-gray-600">
                Use sua conta Mercado Pago
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Precisa de Ajuda?
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Por que meu pagamento foi recusado?
              </h4>
              <p className="text-sm text-gray-600">
                Os motivos mais comuns são: saldo insuficiente, dados
                incorretos, limite do cartão excedido, ou bloqueio de segurança
                do banco.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                O que fazer se o erro persistir?
              </h4>
              <p className="text-sm text-gray-600">
                Entre em contato com seu banco ou com nosso suporte. Estamos
                disponíveis 24/7 para ajudar.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Meu cartão foi cobrado?
              </h4>
              <p className="text-sm text-gray-600">
                Não se preocupe! Se o pagamento foi recusado, nenhuma cobrança
                foi realizada em seu cartão.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <a
              href="/suporte"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              💬 Falar com o Suporte
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <MainLayout  showFooter={true}>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        }
      >
        <ErrorContent />
      </Suspense>
    </MainLayout>
  );
}
