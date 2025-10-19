'use client';

import React, { useState } from 'react';
import type { Tables } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronDown, Sparkles, Target, Zap, Shield, TrendingUp } from 'lucide-react';
import { useCampaignColors, useGradientStyle } from '@/hooks/useCampaignColors';

type Campaign = Tables<'campaigns'>;

interface HeroSectionProps {
  campaign: Campaign;
}

export function HeroSection({ campaign }: HeroSectionProps) {
  const colors = useCampaignColors(campaign);
  const primaryGradient = useGradientStyle(campaign, 'primary');
  const secondaryGradient = useGradientStyle(campaign, 'secondary');
  const [openSection, setOpenSection] = useState<string | null>(null);
  
  const scrollToCapture = () => {
    document.getElementById('capture')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px]" />
      
      {/* Refined Gradient Orbs - Dynamic Colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[20%] right-[15%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.08]"
          style={{ backgroundColor: colors.primary.solid }}
        />
        <div 
          className="absolute bottom-[25%] left-[20%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.06]"
          style={{ backgroundColor: colors.secondary.solid }}
        />
      </div>

      {/* Main Content - Full Width */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center w-full space-y-8 sm:space-y-10 md:space-y-12">
          
          {/* Refined Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
              <span className="text-xs font-medium text-slate-400 tracking-wide">
                Vagas Limitadas • Outubro 2025
              </span>
            </div>
          </motion.div>

          {/* Professional Headline - Refined Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white max-w-4xl mx-auto"
          >
            {campaign.hero_title || (
              <>
                Sistema Completo de{' '}
                <span 
                  className="bg-clip-text text-transparent bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`
                  }}
                >
                  Captura Automatizada
                </span>
              </>
            )}
          </motion.h1>

          {/* Balanced Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            {campaign.hero_subtitle || 
              'Transformamos seu salão em uma máquina de vendas previsível. Clientes te encontram, agendam sozinhos e confirmam automaticamente.'
            }
          </motion.p>

          {/* Refined Collapsibles - Professional Spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-3xl mx-auto space-y-2.5"
          >
            {/* Collapsible 1: O que você ganha */}
            <Collapsible
              open={openSection === 'value'}
              onOpenChange={() => setOpenSection(openSection === 'value' ? null : 'value')}
            >
              <CollapsibleTrigger className="w-full group">
                <div className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${colors.primary.solid}20 0%, ${colors.secondary.solid}20 100%)`,
                        border: `1px solid ${colors.primary.solid}30`
                      }}
                    >
                      <Target className="w-4 h-4" style={{ color: colors.primary.solid }} />
                    </div>
                    <span className="text-base font-semibold text-white text-left">
                      O que você realmente ganha
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${openSection === 'value' ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <AnimatePresence>
                  {openSection === 'value' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="px-5 py-4 bg-white/[0.02] border border-white/[0.08] border-t-0 rounded-b-xl"
                    >
                      <div className="space-y-3 text-left">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400/80 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-white">Agenda sempre cheia</p>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Cliente encontra você no Google, agenda direto. Sem ficar respondendo WhatsApp o dia todo.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400/80 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-white">Confirmação automática</p>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Sistema lembra o cliente 24h antes. Reduz falta em 73%.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400/80 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-white">Previsibilidade financeira</p>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Você sabe quanto vai faturar na semana que vem. Não é mais surpresa.</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CollapsibleContent>
            </Collapsible>

            {/* Collapsible 2: Como funciona */}
            <Collapsible
              open={openSection === 'how'}
              onOpenChange={() => setOpenSection(openSection === 'how' ? null : 'how')}
            >
              <CollapsibleTrigger className="w-full group">
                <div className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${colors.primary.solid}20 0%, ${colors.secondary.solid}20 100%)`,
                        border: `1px solid ${colors.primary.solid}30`
                      }}
                    >
                      <Zap className="w-4 h-4" style={{ color: colors.primary.solid }} />
                    </div>
                    <span className="text-base font-semibold text-white text-left">
                      Como funciona na prática
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${openSection === 'how' ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <AnimatePresence>
                  {openSection === 'how' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="px-5 py-4 bg-white/[0.02] border border-white/[0.08] border-t-0 rounded-b-xl"
                    >
                      <div className="space-y-3 text-left">
                        <div>
                          <p className="text-sm font-medium text-white mb-1">1. Landing Page profissional</p>
                          <p className="text-xs text-slate-500 leading-relaxed">Página linda no celular com fotos do seu salão. Cliente vê horários disponíveis em tempo real.</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white mb-1">2. Anúncios segmentados</p>
                          <p className="text-xs text-slate-500 leading-relaxed">Só aparece para quem procura "manicure perto de mim" no seu bairro. Budget otimizado.</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white mb-1">3. Automação WhatsApp</p>
                          <p className="text-xs text-slate-500 leading-relaxed">Cliente agenda → recebe confirmação → lembrete 24h antes → aviso 2h antes. Tudo automático.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CollapsibleContent>
            </Collapsible>

            {/* Collapsible 3: Garantias */}
            <Collapsible
              open={openSection === 'guarantee'}
              onOpenChange={() => setOpenSection(openSection === 'guarantee' ? null : 'guarantee')}
            >
              <CollapsibleTrigger className="w-full group">
                <div className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${colors.primary.solid}20 0%, ${colors.secondary.solid}20 100%)`,
                        border: `1px solid ${colors.primary.solid}30`
                      }}
                    >
                      <Shield className="w-4 h-4" style={{ color: colors.primary.solid }} />
                    </div>
                    <span className="text-base font-semibold text-white text-left">
                      Por que confiar
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${openSection === 'guarantee' ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <AnimatePresence>
                  {openSection === 'guarantee' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="px-5 py-4 bg-white/[0.02] border border-white/[0.08] border-t-0 rounded-b-xl"
                    >
                      <div className="space-y-2.5 text-left">
                        <p className="text-xs text-slate-400 leading-relaxed">
                          <strong className="text-white font-medium">23 salões ativos agora.</strong> A Marcela (Santo André) tinha 40% da agenda vazia. Depois de 3 semanas, agenda cheia toda semana.
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          <strong className="text-white font-medium">ROI médio de 340%.</strong> Para cada R$100 investido em anúncio, retorna R$340 em agendamentos.
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          <strong className="text-white font-medium">Transparência total.</strong> Você vê quantas pessoas clicaram, quantas agendaram, quanto custou cada cliente.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>

          {/* Refined CTAs - Professional Sizing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full max-w-md mx-auto"
          >
            <Button
              size="lg"
              className="group relative text-white font-semibold px-8 py-6 text-base rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-0 w-full sm:w-auto"
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
              Ver Disponibilidade
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="border border-white/[0.12] hover:bg-white/[0.06] hover:border-white/[0.18] text-white px-8 py-6 text-base rounded-xl font-semibold transition-all duration-300 w-full sm:w-auto"
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
            className="text-xs text-slate-600 mt-2"
          >
            Setup R$ 897 • Mensalidade a partir de R$ 0 + budget de anúncio (você controla)
          </motion.p>

        </div>
      </div>
    </section>
  );
}
