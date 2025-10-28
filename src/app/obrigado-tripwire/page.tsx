'use client';

/**
 * THANK YOU PAGE - Tripwire Purchase
 *
 * Página de confirmação após compra do tripwire (R$147)
 * - Confirmação de pagamento processando
 * - Próximos passos
 * - CTA para agendar consultoria
 *
 * Objetivo: Confirmar compra + direcionar para agendamento
 */

import React, { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import posthog from 'posthog-js';

// UI Components
import { Button } from '@/components/ui/button';

// Icons
import {
  CheckCircleIcon,
  EnvelopeIcon,
  CalendarIcon,
  DocumentTextIcon,
  SparklesIcon,
  ArrowRightIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

function ThankYouTripwireContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams?.get('email') || '';
  const paymentId = searchParams?.get('payment_id') || '';
  const status = searchParams?.get('status') || 'processing';

  useEffect(() => {
    // Track thank you page view
    posthog.capture('tripwire_thank_you_page_viewed', {
      email_provided: !!email,
      payment_id: paymentId,
      payment_status: status,
    });
  }, [email, paymentId, status]);

  const handleAgendamentoCTA = () => {
    posthog.capture('agendamento_cta_clicked', {
      source: 'tripwire_thank_you_page',
      email,
      payment_id: paymentId,
    });

    router.push(`/agendamentos?email=${encodeURIComponent(email)}&tripwire=true`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500/20 to-orange-500/20 border-2 border-teal-500/50 flex items-center justify-center">
              <CheckCircleIcon className="w-12 h-12 text-teal-400" />
            </div>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 md:p-12 text-center"
          >
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pagamento Confirmado! 🎉
            </h1>

            <p className="text-lg text-slate-300 mb-8">
              Obrigado pela confiança. Estamos processando sua compra.
            </p>

            {/* Payment Info */}
            <div className="mb-8 space-y-3">
              {email && (
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-1">
                    <EnvelopeIcon className="w-4 h-4" />
                    <span>Email de confirmação enviado para:</span>
                  </div>
                  <p className="text-teal-400 font-medium">{email}</p>
                </div>
              )}

              {paymentId && (
                <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700">
                  <div className="text-xs text-slate-500 mb-1">ID do Pagamento</div>
                  <p className="text-slate-300 font-mono text-sm">{paymentId}</p>
                </div>
              )}
            </div>

            {/* Next Steps */}
            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Próximos Passos</h2>

              <div className="flex items-start gap-3 text-left p-4 rounded-lg bg-slate-800/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-sm">
                  1
                </div>
                <div>
                  <p className="text-white font-medium mb-1">
                    Aguarde o email de confirmação
                  </p>
                  <p className="text-sm text-slate-400">
                    Você receberá um email com todos os detalhes da sua compra em até 5
                    minutos
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left p-4 rounded-lg bg-slate-800/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-sm">
                  2
                </div>
                <div>
                  <p className="text-white font-medium mb-1">
                    Receba o diagnóstico completo
                  </p>
                  <p className="text-sm text-slate-400">
                    Em até 48h você receberá sua análise técnica personalizada + proposta
                    de implementação
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left p-4 rounded-lg bg-slate-800/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-sm">
                  3
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Agende sua consultoria</p>
                  <p className="text-sm text-slate-400">
                    Reserve seu horário para discutirmos o diagnóstico e tirar dúvidas
                  </p>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center gap-2">
                <DocumentTextIcon className="w-5 h-5 text-teal-400" />
                O que está incluído
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircleIcon className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Análise técnica completa da sua aplicação</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircleIcon className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Orçamento detalhado com cronograma</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircleIcon className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Lista de entregáveis e especificações técnicas</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircleIcon className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Recomendações de stack e arquitetura</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircleIcon className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>30 minutos de consultoria ao vivo</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-slate-900 text-sm text-slate-500">
                  Próxima ação recomendada
                </span>
              </div>
            </div>

            {/* Agendamento CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="p-6 rounded-xl bg-gradient-to-br from-teal-500/10 to-orange-500/10 border border-teal-500/30"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <CalendarIcon className="w-5 h-5 text-teal-400" />
                <span className="text-sm font-medium text-teal-300">
                  Garanta seu horário
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2">
                Agende já sua consultoria
              </h2>

              <p className="text-slate-300 mb-6">
                Escolha o melhor horário para discutirmos seu projeto em detalhes
              </p>

              <Button
                onClick={handleAgendamentoCTA}
                className="w-full bg-gradient-to-r from-teal-500 to-orange-500 hover:from-teal-600 hover:to-orange-600 text-white font-semibold py-6 text-lg transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Ver Horários Disponíveis
                  <ArrowRightIcon className="w-5 h-5" />
                </span>
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <SparklesIcon className="w-4 h-4" />
                <span>Agendas limitadas - reserve agora</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-slate-500">
              Dúvidas sobre seu pedido?{' '}
              <a
                href="mailto:arco@consultingarco.com"
                className="text-teal-400 hover:underline"
              >
                Entre em contato
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ObrigadoTripwirePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
          <div className="text-white">Carregando...</div>
        </div>
      }
    >
      <ThankYouTripwireContent />
    </Suspense>
  );
}
