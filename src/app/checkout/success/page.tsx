'use client';


import { StatusScreenBrick } from '@/components/payment/StatusScreenBrick';
import { MercadoPagoProvider } from '@/providers/MercadoPagoProvider';
import { MainLayout } from '@/components/layout/MainLayout';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams?.get('paymentId');
  const subscriptionId = searchParams?.get('subscription_id');
  
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>('processing');
  const [isActivated, setIsActivated] = useState(false);
  
  // Real-time subscription updates
  useEffect(() => {
    if (!subscriptionId) return;
    
    const supabase = createClient();
    
    // Fetch initial status
    supabase
      .from('subscriptions')
      .select('status')
      .eq('id', subscriptionId)
      .single()
      .then(({ data, error }) => {
        if (data) {
          setSubscriptionStatus(data.status);
          if (data.status === 'active') {
            setIsActivated(true);
            toast.success('Assinatura ativada!', {
              description: 'Seu plano está ativo e pronto para uso',
            });
          }
        }
      });
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel(`subscription-${subscriptionId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'subscriptions',
          filter: `id=eq.${subscriptionId}`,
        },
        (payload) => {
          const newStatus = payload.new.status;
          setSubscriptionStatus(newStatus);
          
          if (newStatus === 'active' && !isActivated) {
            setIsActivated(true);
            toast.success('Assinatura ativada!', {
              description: 'Seu plano está ativo e pronto para uso',
              duration: 5000,
            });
          } else if (newStatus === 'canceled') {
            toast.error('Assinatura cancelada', {
              description: 'Entre em contato com o suporte',
            });
          }
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [subscriptionId, isActivated]);

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header celebratório */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mb-6 animate-bounce shadow-lg shadow-green-500/50">
              {subscriptionStatus === 'active' ? (
                <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
              ) : (
                <Loader2 className="w-12 h-12 text-white animate-spin" />
              )}
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
              Pagamento Confirmado! 🎉
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto mb-4">
              {subscriptionStatus === 'active' 
                ? 'Seu plano foi ativado com sucesso e já está disponível'
                : 'Processando ativação do seu plano...'}
            </p>
            
            {/* Status Badge */}
            {subscriptionId && (
              <div className="inline-flex items-center gap-2">
                {subscriptionStatus === 'active' ? (
                  <Badge className="bg-green-500 text-white">
                    ✅ Assinatura Ativa
                  </Badge>
                ) : subscriptionStatus === 'processing' || subscriptionStatus === 'incomplete' ? (
                  <Badge className="bg-yellow-500 text-white animate-pulse">
                    ⏳ Processando...
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    Status: {subscriptionStatus}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Status Screen Brick */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <StatusScreenBrick paymentId={paymentId} />
          </div>

          {/* Informações adicionais */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-3xl mb-2">📧</div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Email de Confirmação
              </h3>
              <p className="text-sm text-gray-600">
                Você receberá um email com os detalhes do pagamento
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Acesso Imediato
              </h3>
              <p className="text-sm text-gray-600">
                Após aprovação, você terá acesso instantâneo ao sistema
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Suporte 24/7
              </h3>
              <p className="text-sm text-gray-600">
                Dúvidas? Nossa equipe está pronta para ajudar
              </p>
            </div>
          </div>

          {/* FAQ rápido */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Quanto tempo leva para processar?
                </h4>
                <p className="text-sm text-gray-600">
                  Pagamentos com cartão são processados instantaneamente. Pix
                  leva até 2 minutos. Boleto pode levar até 3 dias úteis.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  E se meu pagamento for recusado?
                </h4>
                <p className="text-sm text-gray-600">
                  Você será notificado imediatamente e poderá tentar novamente
                  com outro método de pagamento.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Como cancelo minha assinatura?
                </h4>
                <p className="text-sm text-gray-600">
                  Você pode cancelar a qualquer momento pelo dashboard, sem
                  burocracia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MercadoPagoProvider>
  );
}

export default function SuccessPage() {
  return (
    <MainLayout  showFooter={true}>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </MainLayout>
  );
}
