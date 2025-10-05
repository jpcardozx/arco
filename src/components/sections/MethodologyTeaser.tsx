/**
 * METHODOLOGY TEASER - S-Tier Editorial Design
 * Conecta a execução com o processo, demonstrando o "como".
 * Design Philosophy: Clareza, Estrutura e Transparência.
 */

'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  GitBranch,
  ClipboardCheck,
  Scaling
} from 'lucide-react';
import { cn } from '@/lib/utils';

const pillarColors = {
  indigo: {
    bg: 'bg-indigo-600/10',
    border: 'border-indigo-600/30',
    text: 'text-indigo-400',
    hoverBorder: 'hover:border-indigo-600/50',
  },
  cyan: {
    bg: 'bg-cyan-600/10',
    border: 'border-cyan-600/30',
    text: 'text-cyan-400',
    hoverBorder: 'hover:border-cyan-600/50',
  },
  emerald: {
    bg: 'bg-emerald-600/10',
    border: 'border-emerald-600/30',
    text: 'text-emerald-400',
    hoverBorder: 'hover:border-emerald-600/50',
  },
};

export function MethodologyTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: contentRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y3 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const springY3 = useSpring(y3, { stiffness: 120, damping: 30 });

  const methodologyPillars = [
    {
      icon: GitBranch,
      label: 'Processo Estruturado',
      description: 'Nossa metodologia é documentada, auditável e otimizada para resultados.',
      color: 'indigo',
    },
    {
      icon: Scaling,
      label: 'Foco em Escalabilidade',
      description: 'Construímos sistemas que crescem com seu negócio, sem sacrificar a performance.',
      color: 'cyan',
    },
    {
      icon: ClipboardCheck,
      label: 'Transparência e Controle',
      description: 'Acesso total a dashboards e relatórios para acompanhar cada etapa do projeto.',
      color: 'emerald',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-slate-950 border-t border-slate-800"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/10 to-slate-950" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center" ref={contentRef}>
          
          {/* Coluna do Visual (Esquerda) */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ y: springY3 }}
            className="relative"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-emerald-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
              
              <Card className="relative overflow-hidden border-2 border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-600 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Documentação Detalhada</h3>
                </div>
                <p className="text-slate-400">
                  Acesse nossa metodologia completa para entender como transformamos investimento em receita de forma previsível e controlada.
                </p>
                
                <div className="space-y-3 pt-4 border-t border-white/10">
                  {[
                    "Sistema de controle de custo por lead",
                    "Processo de qualificação automática",
                    "Otimização diária em tempo real",
                    "Alocação estratégica de orçamento"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>

                <Link href="/metodologia">
                  <motion.div
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 group cursor-pointer"
                  >
                    <span>Explorar a Metodologia</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
              </Card>
            </div>
          </motion.div>

          {/* Coluna de Conteúdo (Direita) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <Badge className="bg-indigo-600/10 border-indigo-600/30 text-indigo-300 py-1 px-3">
                <GitBranch className="w-4 h-4 mr-2" />
                O Processo por Trás dos Resultados
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Nossa Metodologia de Aceleração
              </h1>
              <h2 className="text-lg sm:text-xl text-slate-400 leading-relaxed">
                Não acreditamos em fórmulas mágicas. Nossos resultados são fruto de um processo estruturado, transparente e focado em otimização contínua.
              </h2>
            </div>

            {/* Methodology Pillars */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="space-y-6"
            >
              {methodologyPillars.map((pillar) => {
                const colorClass = pillarColors[pillar.color as keyof typeof pillarColors];
                return (
                  <motion.div
                    key={pillar.label}
                    variants={itemVariants}
                    className={cn(
                      'flex items-start gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-800/70 transition-colors duration-300',
                      colorClass.hoverBorder
                    )}
                  >
                    <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0', colorClass.bg, colorClass.border)}>
                      <pillar.icon className={cn('w-6 h-6', colorClass.text)} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-md">{pillar.label}</h3>
                      <p className="text-slate-400 text-sm">{pillar.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
