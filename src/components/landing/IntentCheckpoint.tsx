'use client';

import React, { useState } from 'react';
import type { Tables } from '@/types/supabase';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle,
  TrendingDown,
  DollarSign,
  Target,
  Settings,
  Users,
  MessageCircleQuestion
} from 'lucide-react';
import { useCampaignColors } from '@/hooks/useCampaignColors';

type Campaign = Tables<'campaigns'>;

interface IntentCheckpointProps {
  campaign: Campaign;
  onIntentSelected?: (intent: string) => void;
}

// Challenge options matching our form schema
const challenges = [
  {
    id: 'low_volume',
    label: 'Volume de Leads',
    icon: TrendingDown,
    description: 'Necessidade de aumentar consistentemente a quantidade de oportunidades qualificadas no pipeline.',
  },
  {
    id: 'high_cost',
    label: 'Custo de Aquisição',
    icon: DollarSign,
    description: 'CAC elevado impactando a rentabilidade e tornando o crescimento insustentável.',
  },
  {
    id: 'poor_quality',
    label: 'Qualificação',
    icon: Target,
    description: 'Leads não aderem ao perfil ideal (ICP), gerando baixa taxa de conversão e desperdício de recursos.',
  },
  {
    id: 'technology',
    label: 'Integração',
    icon: Settings,
    description: 'Sistemas descentralizados dificultando automação, rastreamento e análise de performance.',
  },
  {
    id: 'staff',
    label: 'Capacidade Operacional',
    icon: Users,
    description: 'Time sobrecarregado com processos manuais impedindo escalabilidade sustentável.',
  },
  {
    id: 'other',
    label: 'Desafio Específico',
    icon: MessageCircleQuestion,
    description: 'Contexto particular do negócio que requer análise personalizada e solução sob medida.',
  },
];

// Challenge to insights mapping (consultative recommendations)
const challengeInsights: Record<string, { title: string; insight: string }> = {
  'low_volume': {
    title: 'Estratégia de Expansão de Canais',
    insight: 'Vamos mapear seus canais atuais de aquisição, identificar oportunidades não exploradas e desenhar uma estratégia multicanal que maximize seu alcance sem comprometer a qualidade.',
  },
  'high_cost': {
    title: 'Otimização de Performance por Canal',
    insight: 'Faremos uma análise detalhada do funil de conversão, identificando gargalos e oportunidades de otimização para reduzir o CAC enquanto mantemos ou aumentamos o volume.',
  },
  'poor_quality': {
    title: 'Refinamento de ICP e Segmentação',
    insight: 'Desenvolveremos critérios de qualificação baseados em dados, implementando filtros e processos que garantam que apenas leads com alto fit cheguem ao seu time comercial.',
  },
  'technology': {
    title: 'Arquitetura de Automação',
    insight: 'Vamos desenhar uma stack tecnológica integrada, conectando suas ferramentas atuais e implementando automações que eliminem processos manuais e dados fragmentados.',
  },
  'staff': {
    title: 'Automação de Processos Operacionais',
    insight: 'Identificaremos tarefas repetitivas que podem ser automatizadas, liberando seu time para atividades estratégicas e permitindo escalar sem aumentar headcount proporcionalmente.',
  },
  'other': {
    title: 'Diagnóstico Personalizado',
    insight: 'Agende uma conversa consultiva onde vamos explorar seu contexto específico, entender suas particularidades e co-criar uma solução alinhada aos seus objetivos de negócio.',
  },
};

export function IntentCheckpoint({
  campaign,
  onIntentSelected,
}: IntentCheckpointProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const colors = useCampaignColors(campaign);

  const handleSelect = (challengeId: string) => {
    setSelectedChallenge(challengeId);
  };

  const handleConfirm = () => {
    if (selectedChallenge) {
      onIntentSelected?.(selectedChallenge);
      // Scroll to capture form
      setTimeout(() => {
        const captureForm = document.querySelector('[data-section="capture"]');
        captureForm?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  const selectedInsight = selectedChallenge ? challengeInsights[selectedChallenge] : null;

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
      {/* Premium dark background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Gradient orbs for depth - dark version */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Header - Premium dark style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div 
              className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/15 via-blue-500/15 to-teal-500/15 border border-teal-500/30 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <HelpCircle className="w-5 h-5 text-teal-400" strokeWidth={2.5} />
              <span className="text-sm font-bold uppercase tracking-wider text-teal-300">
                Entendimento
              </span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
              Qual é seu maior desafio{' '}
              <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                hoje?
              </span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Isso nos ajuda a entender melhor seu contexto e propor uma solução adequada.{' '}
              <span className="font-semibold text-slate-300">Sem compromisso, sem pressão.</span>
            </p>
          </motion.div>

          {/* Challenge Grid - Premium dark cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12"
          >
            {challenges.map((challenge, index) => (
              <motion.button
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(challenge.id)}
                className={`
                  relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group overflow-hidden
                  backdrop-blur-md
                  ${
                    selectedChallenge === challenge.id
                      ? 'bg-gradient-to-br from-teal-500/15 via-blue-500/10 to-teal-500/15 border-teal-500/50 shadow-[0_8px_32px_rgba(20,184,166,0.25),0_4px_16px_rgba(20,184,166,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]'
                      : 'bg-white/[0.03] border-white/10 hover:border-teal-500/30 hover:bg-white/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_24px_rgba(20,184,166,0.15),0_4px_12px_rgba(0,0,0,0.4)]'
                  }
                `}
                style={{
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Animated gradient background on hover */}
                <div 
                  className={`
                    absolute inset-0 bg-gradient-to-br from-teal-500/10 via-blue-500/10 to-teal-500/10 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10
                    ${selectedChallenge === challenge.id ? 'opacity-100' : ''}
                  `}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon com background - dark version */}
                  <motion.div 
                    className={`
                      inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4
                      transition-all duration-300
                      ${
                        selectedChallenge === challenge.id
                          ? 'bg-gradient-to-br from-teal-500/25 to-blue-500/25 shadow-lg shadow-teal-500/30 border border-teal-500/30'
                          : 'bg-white/5 group-hover:bg-teal-500/15 group-hover:shadow-md group-hover:shadow-teal-500/20 border border-white/10 group-hover:border-teal-500/30'
                      }
                    `}
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <challenge.icon 
                      className={`w-7 h-7 ${
                        selectedChallenge === challenge.id 
                          ? 'text-teal-400' 
                          : 'text-slate-400 group-hover:text-teal-400'
                      }`}
                      strokeWidth={2}
                    />
                  </motion.div>
                  
                  <h4 className={`
                    font-bold mb-2 text-base sm:text-lg tracking-tight
                    ${selectedChallenge === challenge.id ? 'text-white' : 'text-slate-200 group-hover:text-white'}
                  `}>
                    {challenge.label}
                  </h4>
                  
                  <p className={`
                    text-sm leading-relaxed
                    ${selectedChallenge === challenge.id ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-300'}
                  `}>
                    {challenge.description}
                  </p>

                  {/* Selection checkmark - premium */}
                  {selectedChallenge === challenge.id && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="absolute top-4 right-4"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center shadow-lg shadow-teal-500/40 border border-teal-400/30">
                        <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Insight Display - Premium dark card */}
          {selectedInsight && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative rounded-2xl border-2 border-teal-500/40 p-6 sm:p-8 mb-8 sm:mb-10 overflow-hidden backdrop-blur-md bg-gradient-to-br from-teal-500/10 via-blue-500/5 to-teal-500/10 shadow-[0_8px_32px_rgba(20,184,166,0.2),0_4px_16px_rgba(20,184,166,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]"
            >
              {/* Animated glow - dark version */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-blue-500/10 -z-10" />
              
              <div className="flex items-start gap-4">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/40 border border-teal-400/30"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2.5} />
                </motion.div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-3 text-lg sm:text-xl tracking-tight">
                    {selectedInsight.title}
                  </h3>
                  <p className="text-base text-slate-300 leading-relaxed">
                    {selectedInsight.insight}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* CTA - Premium dark buttons */}
          {selectedChallenge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-base transition-all overflow-hidden shadow-[0_8px_32px_rgba(20,184,166,0.3),0_4px_16px_rgba(20,184,166,0.2)] hover:shadow-[0_12px_40px_rgba(20,184,166,0.4),0_6px_20px_rgba(20,184,166,0.25)]"
                style={{
                  background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #0ea5e9 100%)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                
                {/* Pulsing glow */}
                <motion.div
                  className="absolute -inset-1 rounded-xl bg-gradient-to-r from-teal-500 via-blue-500 to-cyan-500 opacity-50 blur-lg -z-10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <span className="relative z-10 tracking-tight">Continuar para conversa</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedChallenge(null)}
                className="px-8 py-4 rounded-xl font-semibold text-slate-300 border-2 border-white/20 transition-all hover:text-white hover:border-white/40 hover:bg-white/5 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_16px_rgba(255,255,255,0.1)]"
              >
                Ver outras opções
              </motion.button>
            </motion.div>
          )}

          {/* Empty state message - dark refined */}
          {!selectedChallenge && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-lg shadow-teal-500/50" />
                <p className="text-sm font-medium text-slate-400">
                  Selecione uma opção acima para continuar
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
