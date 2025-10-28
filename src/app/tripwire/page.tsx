'use client';

/**
 * TRIPWIRE CHECKOUT PAGE - R$149
 *
 * Página de checkout para proposta completa:
 * - Orçamento personalizado
 * - Projeto de implementação
 * - Lista de entregáveis
 *
 * Integração com Mercado Pago
 */

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DocumentTextIcon,
  CalendarIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import posthog from 'posthog-js';
import { trackMetaEvent } from '@/components/meta-pixel';
import { hasMarketingConsent } from '@/components/cookie-consent-banner';
import { TrustBadges, GuaranteeBadge, SecurePaymentBadge } from '@/components/trust-badges';

function TripwireContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: searchParams?.get('name') || '',
    email: searchParams?.get('email') || '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trackPageView = async () => {
      // PostHog tracking
      posthog.capture('tripwire_page_viewed', {
        intent: 'very_high',
        source: 'email_link',
        prefilled_email: !!searchParams?.get('email'),
      });

      // Meta Pixel: ViewContent
      const eventId = crypto.randomUUID();
      trackMetaEvent('ViewContent', {
        content_name: 'Tripwire - Diagnóstico Completo',
        content_category: 'tripwire',
        value: 147,
        currency: 'BRL',
      }, eventId);

      // Meta CAPI: ViewContent (if consent given)
      if (hasMarketingConsent()) {
        try {
          await fetch('/api/meta/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event_name: 'ViewContent',
              event_id: eventId,
              event_source_url: window.location.href,
              user_data: {
                // Will be enriched with IP/UA server-side
              },
              custom_data: {
                content_name: 'Tripwire - Diagnóstico Completo',
                content_category: 'tripwire',
                value: 147,
                currency: 'BRL',
              },
            }),
          });
        } catch (error) {
          console.error('[Tripwire] Meta CAPI ViewContent failed:', error);
        }
      }
    };

    trackPageView();
  }, [searchParams]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    try {
      // Generate event ID for deduplication
      const eventId = crypto.randomUUID();

      // Track checkout initiation (PostHog)
      posthog.capture('tripwire_checkout_initiated', {
        email: formData.email,
        has_phone: !!formData.phone,
        amount: 147,
      });

      // Track checkout initiation (Meta Pixel)
      trackMetaEvent('InitiateCheckout', {
        content_name: 'Tripwire - Diagnóstico Completo',
        value: 147,
        currency: 'BRL',
      }, eventId);

      // Track checkout initiation (Meta CAPI - if consent)
      if (hasMarketingConsent()) {
        fetch('/api/meta/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_name: 'InitiateCheckout',
            event_id: eventId,
            event_source_url: window.location.href,
            user_data: {
              // Server will enrich with IP/UA
            },
            custom_data: {
              content_name: 'Tripwire - Diagnóstico Completo',
              value: 147,
              currency: 'BRL',
            },
          }),
        }).catch(err => console.error('[Tripwire] Meta CAPI InitiateCheckout failed:', err));
      }

      // Create Mercado Pago checkout
      const response = await fetch('/api/checkout/tripwire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: 147,
          product: 'proposta-completa',
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar checkout');
      }

      const { checkoutUrl } = await response.json();

      // Track redirect
      posthog.capture('tripwire_redirect_to_payment', {
        email: formData.email,
      });

      // Redirect to Mercado Pago
      window.location.href = checkoutUrl;

    } catch (err) {
      setError('Erro ao processar pagamento. Tente novamente.');
      posthog.capture('tripwire_checkout_error', {
        error: err instanceof Error ? err.message : 'Unknown error',
      });
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background effects */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(20,184,166,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:80px_80px] opacity-10" />
      </div>

      <div className="relative z-10 w-full px-6 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-md mb-6">
              <SparklesIcon className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-semibold text-teal-300">Proposta Profissional</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
              Receba sua proposta{' '}
              <span className="text-teal-400">completa</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Documento profissional com orçamento detalhado, cronograma de implementação e lista completa de entregáveis
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">

            {/* Left: What's included */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-teal-500/20 p-8 shadow-2xl sticky top-8">
                <h2 className="text-2xl font-bold text-white mb-6">O que você vai receber:</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <DocumentTextIcon className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-1">
                        Orçamento Personalizado
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Valores detalhados de setup, budget de anúncios, mensalidade e ROI projetado para o seu salão
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-1">
                        Projeto de Implementação
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Cronograma completo com etapas, prazos e responsabilidades de cada fase do projeto
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircleIcon className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-1">
                        Lista de Entregáveis
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Todos os componentes técnicos: landing page, automações, integrações, Meta Pixel, relatórios
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 pt-6 border-t border-slate-700">
                  <GuaranteeBadge />
                </div>

                <div className="mt-6 text-center">
                  <p className="text-3xl font-black text-white mb-1">R$ 147</p>
                  <p className="text-sm text-slate-400 mb-4">Investimento único</p>
                  <SecurePaymentBadge />
                </div>
              </div>
            </motion.div>

            {/* Right: Checkout form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleCheckout} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 lg:p-10 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-2">Finalizar solicitação</h2>
                <p className="text-sm text-slate-400 mb-6">
                  Preencha seus dados para receber a proposta completa
                </p>

                {/* Trust Badges */}
                <div className="mb-8">
                  <TrustBadges variant="compact" />
                </div>

                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-semibold text-slate-200 mb-2 block">
                      Nome completo
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Maria Silva"
                      required
                      className="w-full px-4 py-4 bg-slate-900/80 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white font-medium transition-all hover:border-slate-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-semibold text-slate-200 mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="maria@exemplo.com"
                      required
                      className="w-full px-4 py-4 bg-slate-900/80 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white font-medium transition-all hover:border-slate-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-sm font-semibold text-slate-200 mb-2 block">
                      WhatsApp
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(11) 99999-9999"
                      required
                      className="w-full px-4 py-4 bg-slate-900/80 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white font-medium transition-all hover:border-slate-500"
                    />
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit button */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="mt-8"
                >
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isProcessing}
                    className="w-full group relative text-white font-semibold px-8 py-6 text-base rounded-xl shadow-2xl transition-all duration-300 border-0 overflow-hidden"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
                      boxShadow: '0 10px 40px -10px rgba(20, 184, 166, 0.4)',
                    }}
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Processando...
                      </span>
                    ) : (
                      <>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                        <span className="relative z-10">
                          Pagar R$ 149 com Mercado Pago
                        </span>
                      </>
                    )}
                  </Button>
                </motion.div>

                {/* Trust indicators */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-center gap-6 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheckIcon className="w-4 h-4 text-teal-500" />
                      <span>Pagamento seguro</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircleIcon className="w-4 h-4 text-teal-500" />
                      <span>Garantia 7 dias</span>
                    </div>
                  </div>
                  <p className="text-center text-xs text-slate-500">
                    Você será redirecionado para o Mercado Pago para finalizar o pagamento
                  </p>
                </div>
              </form>

              {/* FAQ */}
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold text-white">Perguntas frequentes:</h3>

                <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
                  <h4 className="text-sm font-semibold text-white mb-2">
                    Quando recebo a proposta?
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Em até 48 horas úteis após a confirmação do pagamento, você receberá por email o documento completo em PDF.
                  </p>
                </div>

                <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
                  <h4 className="text-sm font-semibold text-white mb-2">
                    E se eu não gostar?
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Garantia incondicional de 7 dias. Basta solicitar e devolvemos 100% do valor, sem perguntas.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function TripwirePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    }>
      <TripwireContent />
    </Suspense>
  );
}
