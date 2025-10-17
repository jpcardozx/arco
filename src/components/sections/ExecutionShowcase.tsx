/**
 * EXECUTION SHOWCASE - S-Tier Editorial Design
 * Layout: Assimétrico com tipografia premium e grid sofisticado
 * Posicionamento: Demonstração de excelência técnica, não portfolio genérico
 * Design Philosophy: "Mostrar, não falar" - Let the work speak
 */

'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Sparkles,
  Layers,
  ShieldCheck,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

const pillarColors = {
  blue: {
    bg: 'bg-blue-600/10',
    border: 'border-blue-600/30',
    text: 'text-blue-400',
    hoverBorder: 'hover:border-blue-600/50',
  },
  purple: {
    bg: 'bg-purple-600/10',
    border: 'border-purple-600/30',
    text: 'text-purple-400',
    hoverBorder: 'hover:border-purple-600/50',
  },
  green: {
    bg: 'bg-green-600/10',
    border: 'border-green-600/30',
    text: 'text-green-400',
    hoverBorder: 'hover:border-green-600/50',
  },
};

export function ExecutionShowcase() {
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

  const qualityPillars = [
    {
      icon: Layers,
      label: 'Arquitetura Escalável',
      description: 'Next.js 15 + Supabase. Arquitetura preparada para crescimento.',
      color: 'blue',
    },
    {
      icon: ShieldCheck,
      label: 'Segurança Enterprise',
      description: 'RLS nativo, autenticação JWT e recursos de conformidade LGPD.',
      color: 'purple',
    },
    {
      icon: BarChart3,
      label: 'Performance Tracking',
      description: 'Dashboards com métricas de conversão, CPA e ROAS para acompanhamento.',
      color: 'green',
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
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-slate-950"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,116,139,0.1)_0%,transparent_70%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center" ref={contentRef}>
          {/* Coluna de Conteúdo (Esquerda) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <Badge className="bg-blue-600/10 border-blue-600/30 text-blue-300 py-1.5 px-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Casos de Implementação
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Aplicações em produção
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 leading-relaxed">
                Sistemas funcionais com métricas reais de performance. Documentação técnica e processos de deployment incluídos.
              </p>
            </div>

            {/* Quality Pillars */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="space-y-6"
            >
              {qualityPillars.map((pillar) => {
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
                    <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', colorClass.bg, colorClass.border)}>
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

          {/* Coluna do Mockup (Direita) */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ y: springY3 }}
            className="relative"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
              
              <Card className="relative overflow-hidden border-2 border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center px-4 h-10 border-b border-white/10 bg-slate-800/60">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  </div>
                </div>

                <div className="relative w-full bg-slate-900">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="relative w-full h-auto"
                  >
                    <Image
                      src="/mockup.png"
                      alt="Sistema Completo de Captação - Mockup Profissional"
                      width={1200}
                      height={675}
                      quality={95}
                      priority
                      className="w-full h-auto object-contain"
                    />
                  </motion.div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
