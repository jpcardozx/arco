'use client';

import React, { useRef } from 'react';
import type { Tables } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, Zap, Shield, TrendingUp } from 'lucide-react';
import { useCampaignColors } from '@/hooks/useCampaignColors';
import { useParallax } from '@/hooks/useParallax';
import { OptimizedImage } from '@/components/ui/optimized-image';

type Campaign = Tables<'campaigns'>;

interface HeroSectionProps {
  campaign: Campaign;
}

export function HeroSection({ campaign }: HeroSectionProps) {
  const colors = useCampaignColors(campaign);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  // Use hook customizado de parallax (já otimizado)
  const bgParallax = useParallax(bgRef, { speed: 0.3, enableOnMobile: false });

  const scrollToCapture = () => {
    document.getElementById('capture')?.scrollIntoView({ behavior: 'smooth' });
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

      {/* Texture grid estático (sem parallax para evitar conflito) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:80px_80px] opacity-15" />

      {/* Conteúdo principal - SEM transform para evitar cortar */}
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
              <span className="text-sm font-medium text-slate-200">
                Metodologia Verificada
              </span>
              <div className="w-px h-4 bg-slate-600" />
              <span className="text-sm font-semibold text-white">
                Estruturação de Oferta
              </span>
            </div>
          </motion.div>

          {/* Headline - Integração profundidade luz/sombra */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.06] max-w-4xl"
            style={{ 
              textShadow: '0 2px 24px rgba(0,0,0,0.6), 0 0 48px rgba(0,0,0,0.3)' 
            }}
          >
            <span className="text-slate-100">
              Cliente te encontra,{' '}
            </span>
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
                filter: 'brightness(1.3) saturate(1.2)',
                textShadow: 'none'
              }}
            >
              <span style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, 
                  ${colors.primary.solid}40 0%, 
                  ${colors.secondary.solid}40 100%)`,
                filter: 'blur(16px)',
                zIndex: -1
              }} />
              agenda sozinho
            </span>
            <span className="text-slate-100">
              , confirma{' '}
            </span>
            <span className="text-slate-400">
              automaticamente
            </span>
          </motion.h1>

          {/* Subheadline - LEGIBILIDADE MELHORADA */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed drop-shadow-lg"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          >
            Piloto realizado entre janeiro e março de 2025 revelou{' '}
            <strong className="text-slate-100 font-semibold">padrões consistentes de crescimento</strong>.{' '}
            Análise completa da distribuição de performance — incluindo limitantes identificados e{' '}
            <strong className="text-slate-100 font-semibold">variáveis críticas de sucesso</strong>.
          </motion.p>

          {/* Key Benefits - Integração luz/sombra */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl"
          >
            {/* Benefit 1: Visibilidade */}
            <div 
              className="group relative p-5 rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.1] hover:border-white/[0.15] transition-all duration-300 backdrop-blur-sm"
              style={{
                boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.05), 0 2px 12px rgba(0,0,0,0.3)'
              }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 relative"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary.solid}15 0%, ${colors.secondary.solid}15 100%)`,
                  boxShadow: `0 0 20px ${colors.primary.solid}20, inset 0 1px 0 rgba(255,255,255,0.1)`
                }}
              >
                <Target className="w-5 h-5" style={{ color: colors.primary.solid, filter: 'drop-shadow(0 0 4px currentColor)' }} />
              </div>
              <h3 className="text-sm font-semibold text-slate-100 mb-2">
                Te encontram no Google
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                87% das clientes buscam no Google antes de decidir. Sistema posiciona você nos primeiros resultados.
              </p>
            </div>

            {/* Benefit 2: Automação */}
            <div 
              className="group relative p-5 rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.1] hover:border-white/[0.15] transition-all duration-300 backdrop-blur-sm"
              style={{
                boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.05), 0 2px 12px rgba(0,0,0,0.3)'
              }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 relative"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary.solid}15 0%, ${colors.secondary.solid}15 100%)`,
                  boxShadow: `0 0 20px ${colors.primary.solid}20, inset 0 1px 0 rgba(255,255,255,0.1)`
                }}
              >
                <Zap className="w-5 h-5" style={{ color: colors.primary.solid, filter: 'drop-shadow(0 0 4px currentColor)' }} />
              </div>
              <h3 className="text-sm font-semibold text-slate-100 mb-2">
                Agenda sozinho 24/7
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cliente escolhe horário, confirma automaticamente. Lembretes via WhatsApp reduzem no-show de 28% para 9%.
              </p>
            </div>

            {/* Benefit 3: Transparência */}
            <div 
              className="group relative p-5 rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.1] hover:border-white/[0.15] transition-all duration-300 backdrop-blur-sm"
              style={{
                boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.05), 0 2px 12px rgba(0,0,0,0.3)'
              }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 relative"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary.solid}15 0%, ${colors.secondary.solid}15 100%)`,
                  boxShadow: `0 0 20px ${colors.primary.solid}20, inset 0 1px 0 rgba(255,255,255,0.1)`
                }}
              >
                <Shield className="w-5 h-5" style={{ color: colors.primary.solid, filter: 'drop-shadow(0 0 4px currentColor)' }} />
              </div>
              <h3 className="text-sm font-semibold text-slate-100 mb-2">
                Dados em tempo real
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Veja quantas pessoas clicaram, quantas agendaram, quanto custou cada cliente. Transparência total.
              </p>
            </div>
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
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'cta_click', {
                      cta_type: 'primary',
                      cta_text: 'Ver Disponibilidade',
                      section: 'hero'
                    });
                  }
                  scrollToCapture();
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
                  Ver Disponibilidade
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'cta_click', {
                      cta_type: 'secondary',
                      cta_text: 'Ver Casos Reais',
                      section: 'hero'
                    });
                  }
                  document.getElementById('proof')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Ver Casos Reais
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
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500/60" />
              <span>ROI médio de 340%</span>
            </div>

            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-700" />

            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" style={{ color: `${colors.accent.text}60` }} />
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
