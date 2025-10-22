'use client';

import React, { useState } from 'react';
import type { Tables } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight, Shield, CheckCircle2, Clock, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCampaignColors } from '@/hooks/useCampaignColors';
import { useMetaTracking } from '@/hooks/useMetaTracking';

type Campaign = Tables<'campaigns'>;

interface CaptureSectionProps {
  campaign: Campaign;
}

export function CaptureSection({ campaign }: CaptureSectionProps) {
  const router = useRouter();
  const colors = useCampaignColors(campaign);
  const { trackLead } = useMetaTracking();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    biggest_challenge: '',
    urgency: '',
    monthly_revenue: '',
    ad_experience: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOptionalFields, setShowOptionalFields] = useState(false);

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

      // Track Lead event to Meta
      await trackLead({
        email: formData.email,
        phone: formData.phone,
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ').slice(1).join(' '),
        source: `lp_${campaign.slug}`,
      });

      // Redirect to success page
      router.push(`/lp/${campaign.slug}/success` as any);
    } catch (err) {
      setError('Algo deu errado. Por favor, tente novamente.');
      setIsSubmitting(false);
    }
  };

  const benefits = [
    'Análise personalizada do seu contexto',
    'Suporte direto via WhatsApp',
    'Transparência total sobre processo',
    'Sem compromisso antes de decidir',
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
          {/* Information Badge */}
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
            <span className="text-sm font-semibold text-white">Vamos entender seu contexto</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
            Comece com{' '}
            <span
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right,
                  color-mix(in srgb, ${colors.primary.solid} 70%, white),
                  color-mix(in srgb, ${colors.secondary.solid} 60%, white))`
              }}
            >
              uma conversa
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
            Compartilhe suas informações para que possamos entender melhor seu cenário e propor um caminho adequado
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

            {/* Optional Fields Toggle */}
            <motion.button
              type="button"
              onClick={() => setShowOptionalFields(!showOptionalFields)}
              className="w-full flex items-center justify-between p-3 sm:p-4 rounded-lg border transition-all hover:bg-white/5"
              style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}
              initial={false}
            >
              <span className="text-sm text-slate-400 font-medium">
                Informações adicionais (opcional)
              </span>
              <motion.div
                animate={{ rotate: showOptionalFields ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </motion.div>
            </motion.button>

            {/* Optional Fields */}
            <motion.div
              initial={false}
              animate={showOptionalFields ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-5 sm:space-y-6 pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                {/* Biggest Challenge */}
                <div>
                  <label htmlFor="challenge" className="block text-sm font-semibold text-slate-300 mb-3">
                    Qual é seu maior desafio atualmente?
                  </label>
                  <select
                    id="challenge"
                    value={formData.biggest_challenge}
                    onChange={(e) => setFormData({ ...formData, biggest_challenge: e.target.value })}
                    className="w-full h-12 sm:h-14 px-4 text-base text-white bg-white/5 border-2 rounded-lg transition-colors appearance-none cursor-pointer"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}
                    disabled={isSubmitting}
                  >
                    <option value="">Selecionar...</option>
                    <option value="low_volume">Baixo volume de clientes</option>
                    <option value="high_cost">Custo de aquisição elevado</option>
                    <option value="poor_quality">Qualidade dos clientes</option>
                    <option value="technology">Tecnologia e ferramentas</option>
                    <option value="staff">Gestão e capacitação</option>
                    <option value="other">Outro</option>
                  </select>
                </div>

                {/* Urgency */}
                <div>
                  <label htmlFor="urgency" className="block text-sm font-semibold text-slate-300 mb-3">
                    Qual é seu timeline?
                  </label>
                  <select
                    id="urgency"
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full h-12 sm:h-14 px-4 text-base text-white bg-white/5 border-2 rounded-lg transition-colors appearance-none cursor-pointer"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}
                    disabled={isSubmitting}
                  >
                    <option value="">Selecionar...</option>
                    <option value="immediate">Urgente (esta semana)</option>
                    <option value="this_month">Este mês</option>
                    <option value="this_quarter">Próximos 3 meses</option>
                    <option value="exploring">Apenas explorando</option>
                    <option value="not_sure">Ainda não tenho certeza</option>
                  </select>
                </div>

                {/* Monthly Revenue */}
                <div>
                  <label htmlFor="revenue" className="block text-sm font-semibold text-slate-300 mb-3">
                    Faturamento mensal aproximado
                  </label>
                  <select
                    id="revenue"
                    value={formData.monthly_revenue}
                    onChange={(e) => setFormData({ ...formData, monthly_revenue: e.target.value })}
                    className="w-full h-12 sm:h-14 px-4 text-base text-white bg-white/5 border-2 rounded-lg transition-colors appearance-none cursor-pointer"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}
                    disabled={isSubmitting}
                  >
                    <option value="">Selecionar...</option>
                    <option value="under_10k">Até R$ 10 mil</option>
                    <option value="10k_50k">R$ 10 a 50 mil</option>
                    <option value="50k_100k">R$ 50 a 100 mil</option>
                    <option value="100k_500k">R$ 100 a 500 mil</option>
                    <option value="over_500k">Acima de R$ 500 mil</option>
                  </select>
                </div>

                {/* Ad Experience */}
                <div>
                  <label htmlFor="experience" className="block text-sm font-semibold text-slate-300 mb-3">
                    Experiência com publicidade digital
                  </label>
                  <select
                    id="experience"
                    value={formData.ad_experience}
                    onChange={(e) => setFormData({ ...formData, ad_experience: e.target.value })}
                    className="w-full h-12 sm:h-14 px-4 text-base text-white bg-white/5 border-2 rounded-lg transition-colors appearance-none cursor-pointer"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}
                    disabled={isSubmitting}
                  >
                    <option value="">Selecionar...</option>
                    <option value="never">Nunca tentei</option>
                    <option value="unsuccessful">Tentei, não deu certo</option>
                    <option value="moderate">Tenho um pouco de experiência</option>
                    <option value="strong">Experiência sólida</option>
                    <option value="very_strong">Experiência avançada</option>
                  </select>
                </div>
              </div>
            </motion.div>

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
                  Enviando...
                </>
              ) : (
                <>
                  Continuar
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
