'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  Download,
  CheckCircle2,
  Calendar,
  TrendingUp,
  Users,
  Award,
  Rocket,
  Clock,
  ArrowRight,
  Sparkles,
  type LucideIcon
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/primitives/Container/Container';
import { cn, designTokens } from '@/design-system/tokens';

interface RoadmapStep {
  phase: string;
  title: string;
  description: string;
  icon: LucideIcon;
  duration: string;
  actions: string[];
  result: string;
  color: keyof typeof designTokens.colors;
}

const roadmapSteps: RoadmapStep[] = [
  { phase: 'Hoje', title: 'Download & Primeira Análise', description: 'Receba o checklist e faça autoavaliação inicial.', icon: Download, duration: '30 minutos', actions: ['Baixe o PDF completo', 'Marque os pontos que já faz', 'Identifique gaps críticos'], result: 'Score inicial identificado', color: 'teal' },
  { phase: 'Semana 1', title: 'Quick Wins - Impacto Imediato', description: 'Implemente os 5 pontos de maior ROI.', icon: Rocket, duration: '5-10 horas', actions: ['Otimize velocidade', 'Ajuste CTAs acima da dobra', 'Configure pixels de rastreamento'], result: '+30-50% em conversão', color: 'orange' },
  { phase: 'Semana 2-3', title: 'Otimizações Técnicas', description: 'Ajustes de UX e performance.', icon: TrendingUp, duration: '8-15 horas', actions: ['Melhore hierarquia visual', 'Implemente lazy loading', 'Configure email automático'], result: '+20-30% adicional', color: 'emerald' },
  { phase: 'Semana 4', title: 'Validação & Escala', description: 'Medir resultados e escalar o que funciona.', icon: Award, duration: 'Contínuo', actions: ['Analise métricas (GA4)', 'Compare com benchmarks', 'A/B teste variações'], result: 'ROI sustentável', color: 'emerald' },
];

function TimelineIcon({ icon: Icon, color, isActive }: { icon: LucideIcon; color: any; isActive: boolean }) {
  return (
    <motion.div
      className="absolute left-1/2 top-4 -translate-x-1/2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-700"
      style={{ background: `radial-gradient(circle, ${color[700]} 0%, ${color[900]} 100%)` }}
      animate={isActive ? { scale: 1.1, boxShadow: `0 0 30px ${color[500]}60` } : { scale: 1, boxShadow: `0 0 15px ${color[500]}30` }}
      transition={{ duration: 0.3 }}
    >
      <Icon className="h-8 w-8 text-white" />
    </motion.div>
  );
}

export function ImplementationRoadmap() {
  const [activeStep, setActiveStep] = useState<number | null>(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-black to-slate-900" />

      <Container className="relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 text-center max-w-3xl mx-auto">
          <Badge className="mb-4 bg-white/10 backdrop-blur-sm border-white/20 px-4 py-2 text-white">
            <Calendar className="mr-2 h-4 w-4" />
            Seu Plano de 30 Dias
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-white lg:text-5xl">
            Da teoria à <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${designTokens.colors.teal[400]} 0%, ${designTokens.colors.orange[400]} 100%)` }}>prática em 4 semanas</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-300 lg:text-xl">Roadmap passo-a-passo para implementar o checklist e ver resultados mensuráveis.</p>
        </motion.div>

        <div className="relative mx-auto max-w-2xl" ref={ref}>
          <svg width="10" height="100%" viewBox="0 0 10 1200" className="absolute left-1/2 -translate-x-1/2 h-full" preserveAspectRatio="none">
            <motion.path
              d="M 5 0 V 1200"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="gradient" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor={designTokens.colors.teal[500]} />
                <stop offset="100%" stopColor={designTokens.colors.orange[500]} />
              </linearGradient>
            </defs>
          </svg>

          <div className="space-y-16">
            {roadmapSteps.map((step, index) => {
              const color = (designTokens.colors[step.color] || designTokens.colors.teal) as any;
              const isActive = activeStep === index;

              return (
                <div key={index} className="relative">
                  <TimelineIcon icon={step.icon} color={color} isActive={isActive} />
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <Card
                      className={cn(
                        'group cursor-pointer overflow-hidden border transition-all duration-300 ml-24',
                        isActive ? 'border-teal-400/50 shadow-2xl shadow-teal-500/20' : 'border-white/10 bg-slate-800/50 backdrop-blur-lg hover:border-white/20'
                      )}
                      onClick={() => setActiveStep(isActive ? null : index)}
                    >
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <Badge className="border-0 px-3 py-1 text-white" style={{ background: `linear-gradient(135deg, ${color[500]} 0%, ${color[600]} 100%)` }}>{step.phase}</Badge>
                          <div className="flex items-center gap-2 text-sm text-slate-400"><Clock className="h-4 w-4" />{step.duration}</div>
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-white">{step.title}</h3>
                        <p className="mb-4 text-slate-300">{step.description}</p>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden border-t border-white/10 pt-4 mt-4">
                              <h4 className="mb-3 font-semibold text-white">Ações práticas:</h4>
                              <ul className="space-y-2">
                                {step.actions.map((action, actionIndex) => (
                                  <motion.li key={actionIndex} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: actionIndex * 0.1 }} className="flex items-start gap-2">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: color[400] }} />
                                    <span className="text-slate-300">{action}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ background: `${color[500]}15`, color: color[300] }}>
                          <Sparkles className="h-4 w-4" />
                          <span className="font-semibold text-sm">{step.result}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}