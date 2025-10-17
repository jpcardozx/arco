'use client';

import { Check } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  description: string;
}

interface CheckoutSummaryProps {
  plan: Plan;
}

/**
 * Resumo do pedido no checkout
 * Mostra detalhes do plano selecionado
 */
export function CheckoutSummary({ plan }: CheckoutSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price / 100);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 h-fit sticky top-8">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Resumo do Pedido
        </h3>
        <p className="text-gray-600">
          Você está assinando o plano <span className="font-semibold">{plan.name}</span>
        </p>
      </div>

      {/* Plano selecionado */}
      <div className="bg-white rounded-xl p-6 mb-6 border-2 border-blue-500">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-gray-900">{plan.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">
              {formatPrice(plan.price)}
            </div>
            <div className="text-sm text-gray-500">/mês</div>
          </div>
        </div>

        {/* Features incluídas */}
        <div className="space-y-2 mt-4 pt-4 border-t border-gray-200">
          {plan.features.slice(0, 5).map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
          {plan.features.length > 5 && (
            <div className="text-sm text-gray-500 italic">
              +{plan.features.length - 5} recursos adicionais
            </div>
          )}
        </div>
      </div>

      {/* Total */}
      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">Total hoje</span>
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(plan.price)}
          </span>
        </div>
        <div className="text-xs text-gray-600 mt-2">
          Renovação automática mensal. Cancele quando quiser.
        </div>
      </div>

      {/* Garantias */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <span>Pagamento 100% seguro</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Check className="w-5 h-5 text-blue-600" />
          </div>
          <span>Acesso imediato após pagamento</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Check className="w-5 h-5 text-purple-600" />
          </div>
          <span>Suporte prioritário incluso</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Ao confirmar o pagamento, você concorda com nossos{' '}
          <a href="/termos" className="text-blue-600 hover:underline">
            Termos de Uso
          </a>{' '}
          e{' '}
          <a href="/privacidade" className="text-blue-600 hover:underline">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  );
}
