'use client';

/**
 * THANK YOU PAGE - Lead Magnet
 *
 * Página de confirmação após captura de lead
 * - Confirmação de envio do PDF
 * - CTA secundário para Tripwire (R$147)
 * - Tracking de conversão
 *
 * Objetivo: Confirmar ação + warm up para tripwire
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
  SparklesIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams?.get('email') || '';

  useEffect(() => {
    // Track thank you page view
    posthog.capture('lead_thank_you_page_viewed', {
      email_provided: !!email,
      source: 'lead_magnet',
    });
  }, [email]);

  const handleTripwireCTA = () => {
    posthog.capture('tripwire_cta_clicked', {
      source: 'lead_thank_you_page',
      email,
    });

    router.push(`/tripwire?email=${encodeURIComponent(email)}`);
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
              Tudo certo! 🎉
            </h1>

            <p className="text-lg text-slate-300 mb-8">
              Seu material está a caminho
            </p>

            {/* Email Confirmation */}
            {email && (
              <div className="mb-8 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-1">
                  <EnvelopeIcon className="w-4 h-4" />
                  <span>Enviado para:</span>
                </div>
                <p className="text-teal-400 font-medium">{email}</p>
              </div>
            )}

            {/* Next Steps */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 text-left p-4 rounded-lg bg-slate-800/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-sm">
                  1
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Verifique seu email</p>
                  <p className="text-sm text-slate-400">
                    O PDF com os 5 cases + checklist deve chegar em até 2 minutos
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left p-4 rounded-lg bg-slate-800/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-sm">
                  2
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Confira a caixa de spam</p>
                  <p className="text-sm text-slate-400">
                    Se não encontrar na caixa de entrada, procure em Promoções ou Spam
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left p-4 rounded-lg bg-slate-800/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-sm">
                  3
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Marque como importante</p>
                  <p className="text-sm text-slate-400">
                    Assim você não perde as próximas dicas e materiais exclusivos
                  </p>
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
                  Enquanto isso...
                </span>
              </div>
            </div>

            {/* Tripwire CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="p-6 rounded-xl bg-gradient-to-br from-teal-500/10 to-orange-500/10 border border-teal-500/30"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <SparklesIcon className="w-5 h-5 text-teal-400" />
                <span className="text-sm font-medium text-teal-300">
                  Próximo Passo Recomendado
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2">
                Quer um diagnóstico completo do seu projeto?
              </h2>

              <p className="text-slate-300 mb-4">
                Análise técnica personalizada + proposta de implementação detalhada
              </p>

              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-2xl font-bold text-white">R$ 147</span>
                <span className="text-sm text-slate-400 line-through">R$ 497</span>
              </div>

              <Button
                onClick={handleTripwireCTA}
                className="w-full bg-gradient-to-r from-teal-500 to-orange-500 hover:from-teal-600 hover:to-orange-600 text-white font-semibold py-6 text-lg transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Ver Diagnóstico Completo
                  <ArrowRightIcon className="w-5 h-5" />
                </span>
              </Button>

              {/* Trust Indicators */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheckIcon className="w-4 h-4 text-teal-400" />
                  <span>Pagamento 100% seguro via MercadoPago</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <CheckCircleIcon className="w-4 h-4 text-teal-400" />
                  <span>Garantia de 7 dias - reembolso total sem burocracia</span>
                </div>
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
              Dúvidas?{' '}
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

export default function ObrigadoLeadPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
          <div className="text-white">Carregando...</div>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
