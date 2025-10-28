'use client';

import React, { useRef, useEffect } from 'react';
import type { Tables } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CalculatorIcon,
  ArrowRightIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { useCampaignColors } from '@/hooks/useCampaignColors';
import { useParallax } from '@/hooks/useParallax';
import { OptimizedImage } from '@/components/ui/optimized-image';
import posthog from 'posthog-js';

type Campaign = Tables<'campaigns'>;

interface HeroSectionProps {
  campaign: Campaign;
}

export function HeroSection({ campaign }: HeroSectionProps) {
  const colors = useCampaignColors(campaign);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const viewTrackedRef = useRef(false);

  // Use hook customizado de parallax (já otimizado)
  const bgParallax = useParallax(bgRef, { speed: 0.3, enableOnMobile: false });

  // Track hero view (50% in viewport)
  useEffect(() => {
    if (viewTrackedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            posthog.capture('hero_viewed', {
              campaign_id: campaign.id,
              campaign_name: campaign.name,
            });
            viewTrackedRef.current = true;
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [campaign.id, campaign.name]);

  const scrollToCalculator = () => {
    posthog.capture('hero_cta_primary_clicked', {
      cta_text: 'Calcular Potencial',
      intent: 'high',
      campaign_id: campaign.id,
    });
    document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProof = () => {
    posthog.capture('hero_cta_secondary_clicked', {
      cta_text: 'Ver Dados Completos',
      intent: 'medium',
      campaign_id: campaign.id,
    });
    document.getElementById('proof')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Background com parallax suave */}
      <div 
        ref={bgRef}
        style={bgParallax.style}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 opacity-35">
          <OptimizedImage
            src="/landing/images/anabelle-carite-_wofGSSFb1Q-unsplash.webp"
            alt="Ambiente elegante de salão profissional"
            placeholderType="blur"
            priority={true}
            className="w-full h-full object-cover"
            objectFit="cover"
          />
          {/* Gradient overlay (clarear para mostrar ambiente) */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/75 to-slate-950/90" />
        </div>
      </div>

      {/* Texture grid estático (sem parallax para evitar conflito) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:80px_80px] opacity-15" />

      {/* Conteúdo principal */}
      <div className="relative z-10 w-full px-6 sm:px-8 md:px-10 lg:px-16 py-24 sm:py-32 md:py-40">
        <div className="flex flex-col items-center text-center w-full max-w-5xl mx-auto space-y-12">

          {/* Badge - Dados reais */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800/70 border border-teal-500/20 backdrop-blur-md shadow-lg">
              <ChartBarIcon className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-medium text-slate-200">
                23 salões ativos
              </span>
              <div className="w-px h-4 bg-slate-600" />
              <span className="text-sm font-semibold text-slate-100">
                Dados reais, transparentes
              </span>
            </div>
          </motion.div>

          {/* Headline - Consultivo */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] max-w-4xl"
            style={{
              textShadow: '0 2px 24px rgba(0,0,0,0.6)'
            }}
          >
            <span className="text-slate-100">
              Seu salão merece
            </span>
            <br />
            <span className="text-teal-400">
              clientes previsíveis
            </span>
          </motion.h1>

          {/* Subheadline - Consultivo + Transparente */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl sm:text-2xl text-slate-300 max-w-3xl leading-relaxed"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          >
            Sistema de captura testado em 23 salões.{' '}
            <strong className="text-slate-100 font-semibold">Cada resultado é diferente</strong>{' '}
            — vamos calcular uma projeção realista para o seu caso.
          </motion.p>

          {/* Key Benefits - Com Heroicons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-4xl"
          >
            {/* Benefit 1: Visibilidade */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-teal-500/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4">
                <ChartBarIcon className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-100 mb-2">
                Te encontram no Google
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Anúncios segmentados para quem busca seu serviço na sua região.
              </p>
            </motion.div>

            {/* Benefit 2: Automação */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-teal-500/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4">
                <SparklesIcon className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-100 mb-2">
                Agenda sozinho 24/7
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Cliente escolhe horário e confirma. WhatsApp automático reduz falta.
              </p>
            </motion.div>

            {/* Benefit 3: Transparência */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-teal-500/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4">
                <ShieldCheckIcon className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-100 mb-2">
                Dados em tempo real
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Veja cliques, agendamentos e custo por cliente. Transparência total.
              </p>
            </motion.div>
          </motion.div>

          {/* Refined CTAs - Professional Sizing with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full max-w-md mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="group relative text-white font-semibold px-8 py-6 text-base rounded-xl shadow-2xl transition-all duration-300 border-0 w-full overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`,
                  boxShadow: `0 10px 40px -10px ${colors.primary.solid}40`,
                }}
                onClick={() => {
                  // GA4 tracking
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'cta_click', {
                      cta_type: 'primary',
                      cta_text: 'Ver Disponibilidade',
                      section: 'hero'
                    });
                  }

                  // PostHog tracking
                  posthog.capture('hero_cta_clicked', {
                    cta_type: 'primary',
                    cta_text: 'Calcular Potencial',
                    intent: 'high',
                    campaign_id: campaign.id,
                  });

                  scrollToCalculator();
                }}
              >
                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  Calcular Potencial do Meu Salão
                  <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="ghost"
                className="border border-white/[0.12] hover:bg-white/[0.06] hover:border-white/[0.18] text-white px-8 py-6 text-base rounded-xl font-semibold transition-all duration-300 w-full"
                onClick={() => {
                  // GA4 tracking
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'cta_click', {
                      cta_type: 'secondary',
                      cta_text: 'Ver Casos Reais',
                      section: 'hero'
                    });
                  }

                  // PostHog tracking
                  posthog.capture('hero_cta_clicked', {
                    cta_type: 'secondary',
                    cta_text: 'Ver Dados Completos',
                    intent: 'medium',
                    campaign_id: campaign.id,
                  });

                  scrollToProof();
                }}
              >
                Ver Dados Completos
              </Button>
            </motion.div>
          </motion.div>

          {/* Subtle Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border border-slate-800 bg-gradient-to-br"
                    style={{
                      backgroundImage: i % 2 === 0 
                        ? `linear-gradient(135deg, ${colors.primary.solid}40 0%, ${colors.secondary.solid}40 100%)`
                        : `linear-gradient(135deg, ${colors.secondary.solid}40 0%, ${colors.primary.solid}40 100%)`
                    }}
                  />
                ))}
              </div>
              <span className="font-medium text-slate-400">
                23 salões ativos
              </span>
            </div>

            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-700" />

            <div className="flex items-center gap-1.5">
              <ArrowTrendingUpIcon className="w-3.5 h-3.5 text-emerald-500/60" />
              <span>ROI médio de 340%</span>
            </div>

            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-700" />

            <div className="flex items-center gap-1.5">
              <SparklesIcon className="w-3.5 h-3.5 text-teal-500/60" />
              <span>Resultados em 7-10 dias</span>
            </div>
          </motion.div>

          {/* Honest Pricing - Subtle Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xs text-slate-500 mt-2"
          >
            Setup R$ 897 • Mensalidade a partir de R$ 0 + budget de anúncio (você controla)
          </motion.p>
        </div>
      </div>
    </section>
  );
}
