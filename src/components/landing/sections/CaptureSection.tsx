'use client';

import React, { useState } from 'react';
import type { Tables } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight, Shield, CheckCircle2, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCampaignColors } from '@/hooks/useCampaignColors';

type Campaign = Tables<'campaigns'>;

interface CaptureSectionProps {
  campaign: Campaign;
}

export function CaptureSection({ campaign }: CaptureSectionProps) {
  const router = useRouter();
  const colors = useCampaignColors(campaign);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Submit lead to API
      const response = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          campaign_slug: campaign.slug,
          campaign_id: campaign.id,
          source: 'landing_page',
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar formulário');
      }

      // Redirect to success page
      router.push(`/lp/${campaign.slug}/success` as any);
    } catch (err) {
      setError('Algo deu errado. Por favor, tente novamente.');
      setIsSubmitting(false);
    }
  };

  const benefits = [
    'Acesso imediato ao sistema completo',
    'Consultoria gratuita de 30 minutos',
    'Suporte prioritário via WhatsApp',
    'Sem compromisso ou cartão de crédito',
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px]" />
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[128px] opacity-[0.06]"
          style={{ backgroundColor: colors.primary.solid }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[96px] opacity-[0.05]"
          style={{ backgroundColor: colors.secondary.solid }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Urgency Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: `${colors.primary.solid}40`
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Clock className="w-4 h-4" style={{ color: colors.primary.solid }} />
            <span className="text-sm font-semibold text-white">Últimas vagas com consultoria gratuita</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
            Comece{' '}
            <span 
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(to right, 
                  color-mix(in srgb, ${colors.primary.solid} 70%, white), 
                  color-mix(in srgb, ${colors.secondary.solid} 60%, white))`
              }}
            >
              hoje mesmo
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
            Preencha abaixo e receba acesso imediato + consultoria estratégica personalizada
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl border mb-8"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderColor: 'rgba(255, 255, 255, 0.08)'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-5 sm:space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                Seu nome completo
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Maria Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 sm:h-14 text-base sm:text-lg border-2 bg-white/5 text-white placeholder:text-slate-500 focus:border-opacity-100 transition-colors"
                style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                WhatsApp (com DDD)
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 98765-4321"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-12 sm:h-14 text-base sm:text-lg border-2 bg-white/5 text-white placeholder:text-slate-500 focus:border-opacity-100 transition-colors"
                style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                Seu melhor email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="maria@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 sm:h-14 text-base sm:text-lg border-2 bg-white/5 text-white placeholder:text-slate-500 focus:border-opacity-100 transition-colors"
                style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="p-4 rounded-lg border text-sm"
                style={{ 
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  borderColor: 'rgba(239, 68, 68, 0.3)'
                }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <span className="text-red-400">{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full h-14 sm:h-16 text-base sm:text-lg font-bold text-white rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.02]"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${colors.primary.solid}, ${colors.secondary.solid})`
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  Quero Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            {/* Trust Badge */}
            <div className="pt-5 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Seus dados estão 100% protegidos (LGPD)</span>
              </div>
            </div>
          </div>
        </motion.form>

        {/* Benefits List */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl border"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: colors.primary.solid }} />
              <span className="text-sm sm:text-base text-slate-300">{benefit}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Privacy Notice */}
        <motion.div
          className="text-center text-slate-500 text-xs sm:text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            Ao se cadastrar, você concorda com nossa{' '}
            <a href="/privacy" className="underline hover:text-white transition-colors">
              Política de Privacidade
            </a>
            {' '}e{' '}
            <a href="/terms" className="underline hover:text-white transition-colors">
              Termos de Uso
            </a>
          </p>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
