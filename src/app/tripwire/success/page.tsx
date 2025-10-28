'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  EnvelopeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import posthog from 'posthog-js';

export default function TripwireSuccessPage() {
  useEffect(() => {
    posthog.capture('tripwire_purchase_success', {
      amount: 149,
      product: 'proposta-completa',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-gradient-to-br from-teal-500/10 via-slate-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl border border-teal-500/30 p-12 shadow-2xl text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-teal-500/20 flex items-center justify-center">
          <CheckCircleIcon className="w-10 h-10 text-teal-400" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">
          Pagamento confirmado! 🎉
        </h1>

        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
          Sua proposta completa será preparada e enviada em até <strong className="text-teal-300">48 horas úteis</strong>.
        </p>

        <div className="space-y-4 mb-8 text-left">
          <div className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-xl">
            <EnvelopeIcon className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-semibold text-white mb-1">
                Documento por email
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Você receberá um PDF profissional com orçamento detalhado, projeto de implementação e lista completa de entregáveis.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-xl">
            <ClockIcon className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-semibold text-white mb-1">
                Próximos passos
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Nossa equipe entrará em contato via WhatsApp para alinhar detalhes e tirar dúvidas sobre a proposta.
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-500">
          Não se preocupe se não receber imediatamente. Pode levar até 48h úteis para preparar seu documento personalizado.
        </p>
      </motion.div>
    </div>
  );
}
