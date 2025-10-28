/**
 * Enhanced Hero Section with Analytics Tracking
 *
 * Example implementation showing how to integrate analytics tracking
 */

'use client';

import React, { useRef } from 'react';
import type { Tables } from '@/types/supabase';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCampaignColors } from '@/hooks/useCampaignColors';
import { useParallax } from '@/hooks/useParallax';
import { useAnalytics } from '@/hooks/useAnalytics';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { TrackableButton } from '@/components/analytics/TrackableButton';
import { TrackableSection } from '@/components/analytics/TrackableSection';

type Campaign = Tables<'campaigns'>;

interface HeroSectionEnhancedProps {
  campaign: Campaign;
}

export function HeroSectionEnhanced({ campaign }: HeroSectionEnhancedProps) {
  const colors = useCampaignColors(campaign);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { trackInteraction } = useAnalytics();

  // Use hook customizado de parallax (já otimizado)
  const bgParallax = useParallax(bgRef, { speed: 0.3, enableOnMobile: false });

  const scrollToCapture = async () => {
    // Track scroll intent
    await trackInteraction('Hero CTA', 'click', {
      location: 'hero-section',
      cta_text: 'Começar agora',
      campaign_slug: campaign.slug,
    });

    const captureElement = document.querySelector('[data-section="capture"]');
    captureElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <TrackableSection
      sectionName="hero"
      trackOnce={true}
      threshold={0.5}
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Background com parallax suave */}
      <div ref={bgRef} style={bgParallax.style} className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <OptimizedImage
            src="/landing/images/anabelle-carite-_wofGSSFb1Q-unsplash.webp"
            alt="Ambiente elegante de salão profissional"
            placeholderType="blur"
            priority={true}
            className="w-full h-full object-cover"
            objectFit="cover"
          />
          {/* Gradient overlay FORTALECIDO para melhor legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/95" />
        </div>
      </div>

      {/* Texture grid estático */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:80px_80px] opacity-15" />

      {/* Conteúdo principal */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-20 sm:py-24 md:py-28 lg:py-36">
        <div className="flex flex-col items-center text-center w-full max-w-5xl mx-auto space-y-10 sm:space-y-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-800/70 border border-slate-700/60 backdrop-blur-md shadow-lg">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium text-slate-200">Metodologia Verificada</span>
              <div className="w-px h-4 bg-slate-600" />
              <span className="text-sm font-semibold text-white">Estruturação de Oferta</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.06] max-w-4xl"
            style={{
              textShadow: '0 2px 24px rgba(0,0,0,0.6), 0 0 48px rgba(0,0,0,0.3)',
            }}
          >
            <span className="text-slate-100">Cliente te encontra, </span>
            <span
              className="relative inline-block"
              style={{
                background: `linear-gradient(135deg,
                  ${colors.primary.solid} 0%,
                  ${colors.secondary.solid} 50%,
                  ${colors.primary.solid} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              não o contrário
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl leading-relaxed"
          >
            Sistema completo de captura de leads qualificados para{' '}
            <span className="font-semibold text-white">profissionais de alto valor</span> que transformam visitantes
            em agendamentos confirmados
          </motion.p>

          {/* CTA Button with Tracking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto"
          >
            <TrackableButton
              trackLabel="Hero CTA: Começar Agora"
              trackCategory="cta"
              trackProperties={{
                location: 'hero-section',
                campaign_slug: campaign.slug,
                button_position: 'primary',
              }}
              showFeedback={false}
              onClick={scrollToCapture}
              className="group relative px-8 py-4 rounded-xl font-bold text-white text-base transition-all overflow-hidden shadow-[0_8px_32px_rgba(20,184,166,0.3),0_4px_16px_rgba(20,184,166,0.2)] hover:shadow-[0_12px_40px_rgba(20,184,166,0.4),0_6px_20px_rgba(20,184,166,0.25)]"
              style={{
                background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #0ea5e9 100%)',
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />

              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Começar agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </TrackableButton>

            <TrackableButton
              trackLabel="Hero CTA: Ver Prova"
              trackCategory="navigation"
              trackProperties={{
                location: 'hero-section',
                campaign_slug: campaign.slug,
                button_position: 'secondary',
              }}
              variant="outline"
              onClick={() => {
                document.querySelector('[data-section="proof"]')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-xl font-semibold text-slate-300 border-2 border-slate-600 hover:border-slate-400 hover:text-white bg-slate-900/50 backdrop-blur-sm transition-all"
            >
              Ver prova social
            </TrackableButton>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-slate-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Sem contrato de permanência</span>
            </div>
            <div className="w-px h-4 bg-slate-600" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>ROI médio de 4x em 90 dias</span>
            </div>
            <div className="w-px h-4 bg-slate-600" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Implementação em 30 dias</span>
            </div>
          </motion.div>
        </div>
      </div>
    </TrackableSection>
  );
}

export default HeroSectionEnhanced;
