'use client';

/**
 * LEAD MAGNET PAGE - Cases de Sucesso + Diagnóstico Gratuito
 *
 * Oferta: PDF com 5 cases reais + Checklist de diagnóstico
 * Objetivo: Capturar leads qualificados (email + segmento)
 * Tracking: Meta CAPI + PostHog (dual tracking)
 *
 * Conversão esperada: 15-25% do tráfego
 * Próximo passo: Email automation → Tripwire (R$147)
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import posthog from 'posthog-js';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Icons
import {
  DocumentTextIcon,
  CheckCircleIcon,
  SparklesIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ClockIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

// Helpers
import { hasMarketingConsent } from '@/components/cookie-consent-banner';

/**
 * Form Validation Schema
 */
const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo'),
  email: z
    .string()
    .email('Email inválido')
    .toLowerCase()
    .trim(),
  segment: z.enum(['ecommerce', 'saas', 'marketplace', 'servicos', 'outro'], {
    required_error: 'Selecione seu segmento',
  }),
});

type FormData = z.infer<typeof formSchema>;

/**
 * Segment Options
 */
const SEGMENTS = [
  { value: 'ecommerce', label: 'E-commerce / Loja Online' },
  { value: 'saas', label: 'SaaS / Software como Serviço' },
  { value: 'marketplace', label: 'Marketplace / Plataforma' },
  { value: 'servicos', label: 'Serviços / Consultoria' },
  { value: 'outro', label: 'Outro' },
] as const;

/**
 * Benefits Data
 */
const BENEFITS = [
  {
    icon: DocumentTextIcon,
    title: '5 Cases Reais de Sucesso',
    description: 'Exemplos práticos de otimizações que geraram ROI mensurável',
  },
  {
    icon: ChartBarIcon,
    title: 'Métricas e Resultados',
    description: 'Core Web Vitals antes/depois, conversão, tempo de carregamento',
  },
  {
    icon: CheckCircleIcon,
    title: 'Checklist de Diagnóstico',
    description: 'Framework completo para avaliar seu projeto (20+ pontos)',
  },
  {
    icon: SparklesIcon,
    title: 'Stack Técnico Detalhado',
    description: 'Tecnologias utilizadas e por que foram escolhidas',
  },
];

/**
 * Social Proof Stats
 */
const STATS = [
  { value: '40%', label: 'Redução média de custos' },
  { value: '2.5x', label: 'Aumento de performance' },
  { value: '100%', label: 'Score Web Vitals' },
];

export default function LeadMagnetPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formProgress, setFormProgress] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      segment: undefined,
    },
  });

  /**
   * Track form progress for UX
   */
  useEffect(() => {
    const subscription = form.watch((value) => {
      let progress = 0;
      if (value.name && value.name.length >= 2) progress += 33;
      if (value.email && value.email.includes('@')) progress += 33;
      if (value.segment) progress += 34;
      setFormProgress(progress);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  /**
   * Track page view
   */
  useEffect(() => {
    posthog.capture('lead_magnet_page_viewed', {
      source: 'direct',
      intent: 'low_to_medium',
    });
  }, []);

  /**
   * Handle form submission
   */
  const onSubmit = async (data: FormData) => {
    setError(null);
    setIsSubmitting(true);

    try {
      // Check marketing consent
      const hasConsent = hasMarketingConsent();

      // Track form submission (client-side)
      posthog.capture('lead_magnet_form_submitted', {
        segment: data.segment,
        has_consent: hasConsent,
      });

      // Submit to API (dual tracking: PostHog + Meta CAPI)
      const response = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'lead_magnet',
          consent: hasConsent,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao enviar formulário');
      }

      const result = await response.json();

      // Track success
      posthog.capture('lead_captured_success', {
        lead_id: result.leadId,
        segment: data.segment,
      });

      // Redirect to thank you page
      router.push(`/obrigado-lead?email=${encodeURIComponent(data.email)}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);

      posthog.capture('lead_capture_error', {
        error: errorMessage,
        segment: data.segment,
      });

      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
              <SparklesIcon className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-medium text-teal-300">
                Material Gratuito
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              5 Cases de Sucesso em
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-orange-400">
                Otimização Web
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Descubra como empresas reduziram custos em até 40% e aumentaram
              performance em 2.5x com arquitetura moderna e otimizações estratégicas.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-orange-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-sm text-slate-300"
            >
              <CheckCircleIcon className="w-4 h-4 text-teal-400" />
              <span>✓ Sem compromisso ✓ Sem cartão ✓ Envio instantâneo</span>
            </motion.div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <ArrowDownTrayIcon className="w-6 h-6 text-teal-400" />
                  O que você vai receber
                </h2>

                <div className="space-y-6">
                  {BENEFITS.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <motion.div
                        key={benefit.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                        className="flex gap-4"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-orange-500/20 border border-teal-500/30 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-teal-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {benefit.title}
                          </h3>
                          <p className="text-sm text-slate-400">
                            {benefit.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Trust Badge */}
                <div className="mt-8 pt-8 border-t border-slate-800">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <ShieldCheckIcon className="w-5 h-5 text-teal-400" />
                    <span>
                      Sem spam. Seus dados estão seguros e você pode cancelar a
                      qualquer momento.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 sticky top-8">
                {/* Progress Bar */}
                {formProgress > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span>Progresso</span>
                      <span>{formProgress}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${formProgress}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-gradient-to-r from-teal-500 to-orange-500"
                      />
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Receba o material agora
                  </h2>
                  <p className="text-sm text-slate-400">
                    Enviaremos o PDF completo + checklist para seu email em menos de 1 minuto
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Nome Completo</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="João Silva"
                                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                {...field}
                              />
                              {field.value && field.value.length >= 2 && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                  <CheckCircleIcon className="w-5 h-5 text-teal-400" />
                                </motion.div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email Profissional</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="email"
                                placeholder="joao@empresa.com"
                                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                {...field}
                              />
                              {field.value && field.value.includes('@') && field.value.includes('.') && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                  <CheckCircleIcon className="w-5 h-5 text-teal-400" />
                                </motion.div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Segment Field */}
                    <FormField
                      control={form.control}
                      name="segment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Seu Segmento</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                                <SelectValue placeholder="Selecione seu segmento" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              {SEGMENTS.map((segment) => (
                                <SelectItem
                                  key={segment.value}
                                  value={segment.value}
                                  className="text-white hover:bg-slate-700"
                                >
                                  {segment.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-slate-500 text-xs">
                            Isso nos ajuda a enviar cases relevantes para você
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg bg-red-500/10 border border-red-500/30"
                      >
                        <p className="text-sm text-red-400">{error}</p>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting || formProgress < 100}
                      className="w-full bg-gradient-to-r from-teal-500 to-orange-500 hover:from-teal-600 hover:to-orange-600 text-white font-semibold py-6 text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </span>
                      ) : (
                        <>
                          <span className="flex items-center gap-2">
                            <ArrowDownTrayIcon className="w-5 h-5" />
                            Baixar Material Gratuito
                          </span>
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </>
                      )}
                    </Button>

                    {formProgress < 100 && formProgress > 0 && (
                      <p className="text-xs text-slate-500 text-center -mt-2">
                        Preencha todos os campos para continuar
                      </p>
                    )}

                    {/* Privacy Note */}
                    <p className="text-xs text-slate-500 text-center">
                      Ao enviar, você concorda com nossa{' '}
                      <a href="/privacy" className="text-teal-400 hover:underline">
                        Política de Privacidade
                      </a>
                      . Usamos cookies para melhorar sua experiência.
                    </p>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>

          {/* Social Proof Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16"
          >
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-3xl font-bold text-white mb-2">200+</div>
                <div className="text-sm text-slate-400">Profissionais já baixaram</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-3xl font-bold text-white mb-2">4.8/5</div>
                <div className="text-sm text-slate-400">Avaliação do material</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-sm text-slate-400">Conteúdo prático</div>
              </div>
            </div>

            {/* FAQ */}
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-white text-center mb-6">Perguntas Frequentes</h3>
              <div className="space-y-4">
                <details className="group bg-slate-900/50 border border-slate-800 rounded-xl p-5 cursor-pointer">
                  <summary className="text-white font-semibold list-none flex items-center justify-between">
                    <span>O que vem no PDF?</span>
                    <CheckCircleIcon className="w-5 h-5 text-teal-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-sm text-slate-400 mt-3">
                    5 cases reais de otimização com métricas antes/depois, stack técnico utilizado, 
                    e um checklist com 20+ pontos para avaliar seu projeto.
                  </p>
                </details>

                <details className="group bg-slate-900/50 border border-slate-800 rounded-xl p-5 cursor-pointer">
                  <summary className="text-white font-semibold list-none flex items-center justify-between">
                    <span>Vou receber spam?</span>
                    <CheckCircleIcon className="w-5 h-5 text-teal-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-sm text-slate-400 mt-3">
                    Não. Enviamos apenas conteúdo relevante e você pode cancelar a qualquer momento.
                    Seus dados são protegidos conforme LGPD.
                  </p>
                </details>

                <details className="group bg-slate-900/50 border border-slate-800 rounded-xl p-5 cursor-pointer">
                  <summary className="text-white font-semibold list-none flex items-center justify-between">
                    <span>Quanto tempo leva para receber?</span>
                    <CheckCircleIcon className="w-5 h-5 text-teal-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-sm text-slate-400 mt-3">
                    O material chega no seu email em até 1 minuto. Se não encontrar, confira a caixa de spam.
                  </p>
                </details>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
