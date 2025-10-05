'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import {
  TrendingUp,
  Users,
  DollarSign,
  ArrowRight,
  Sparkles,
  Target,
  BarChart3,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/primitives/Container/Container';
import { cn, designTokens } from '@/design-system/tokens';

// Animated Number Component for Stats
function AnimatedStatNumber({ valueString }: { valueString: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const numericValue = parseFloat(valueString.replace(/[^0-9.,]/g, '').replace(',', '.'));
  const prefix = valueString.match(/^[^0-9]*/)?.[0] || '';
  const suffix = valueString.match(/[^0-9.,]*$/)?.[0] || '';

  useEffect(() => {
    if (inView && !isNaN(numericValue)) {
      const node = ref.current;
      if (!node) return;
      const controls = animate(0, numericValue, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(v) {
          node.textContent = v.toLocaleString('pt-BR', { maximumFractionDigits: 1 });
        }
      });
      return () => controls.stop();
    }
  }, [inView, numericValue]);

  if (isNaN(numericValue)) return <div className="text-2xl font-bold text-white">{valueString}</div>;
  return <div className="text-2xl font-bold text-white">{prefix}<span ref={ref}>0</span>{suffix}</div>;
}


interface QuizQuestion {
  id: string;
  label: string;
  description: string;
  icon: typeof TrendingUp;
  options: {
    value: string;
    label: string;
    multiplier: number;
  }[];
}

const questions: QuizQuestion[] = [
  {
    id: 'traffic',
    label: 'Quantos visitantes seu site tem por mês?',
    description: 'Isso nos ajuda a calcular seu potencial real',
    icon: Users,
    options: [
      { value: '<500', label: 'Menos de 500', multiplier: 0.5 },
      { value: '500-2k', label: '500 a 2.000', multiplier: 1 },
      { value: '2k-5k', label: '2.000 a 5.000', multiplier: 2 },
      { value: '>5k', label: 'Mais de 5.000', multiplier: 3 },
    ],
  },
  {
    id: 'conversion',
    label: 'Qual sua taxa de conversão atual?',
    description: 'De visitantes para leads/contatos',
    icon: Target,
    options: [
      { value: 'unknown', label: 'Não sei', multiplier: 0.5 },
      { value: '<1', label: 'Menos de 1%', multiplier: 1 },
      { value: '1-3', label: '1% a 3%', multiplier: 1.5 },
      { value: '>3', label: 'Mais de 3%', multiplier: 2 },
    ],
  },
  {
    id: 'ticket',
    label: 'Quanto vale um cliente para você?',
    description: 'Ticket médio ou valor vitalício',
    icon: DollarSign,
    options: [
      { value: '<500', label: 'Até R$ 500', multiplier: 0.5 },
      { value: '500-2k', label: 'R$ 500 a R$ 2.000', multiplier: 1 },
      { value: '2k-10k', label: 'R$ 2.000 a R$ 10.000', multiplier: 2.5 },
      { value: '>10k', label: 'Mais de R$ 10.000', multiplier: 4 },
    ],
  },
];

interface PersonalizationResult {
  potential: number;
  segment: 'iniciante' | 'crescimento' | 'maduro';
  message: string;
  action: string;
}

export function PersonalizationSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<PersonalizationResult | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ x: (e.clientX - window.innerWidth / 2) / 50, y: (e.clientY - window.innerHeight / 2) / 50 });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateResult = useCallback((finalAnswers: Record<string, string>) => {
    const multiplier = questions.reduce((acc, q) => {
      const answer = finalAnswers[q.id];
      const option = q.options.find(opt => opt.value === answer);
      return acc * (option?.multiplier || 1);
    }, 1);

    let segment: PersonalizationResult['segment'];
    if (multiplier < 1) segment = 'iniciante';
    else if (multiplier < 3) segment = 'crescimento';
    else segment = 'maduro';

    const basePotential = 3500;
    const potential = Math.round(basePotential * multiplier);

    const messages = {
      iniciante: `Você tem um ótimo ponto de partida! Com os ajustes certos, seu potencial é de +R$ ${potential.toLocaleString('pt-BR')}/mês em receita adicional.`,
      crescimento: `Seu negócio está no caminho certo! Corrigindo os ${15} pontos críticos, você pode alcançar +R$ ${potential.toLocaleString('pt-BR')}/mês.`,
      maduro: `Excelente! Você tem alto volume e já converte. Otimizações estratégicas podem gerar +R$ ${potential.toLocaleString('pt-BR')}/mês.`,
    };

    const actions = {
      iniciante: 'Baixe o checklist e comece pelos 5 pontos de maior impacto',
      crescimento: 'Baixe o checklist completo e implemente o plano de 30 dias',
      maduro: 'Baixe o checklist + agende sessão estratégica gratuita',
    };

    setResult({
      potential,
      segment,
      message: messages[segment],
      action: actions[segment],
    });
  }, []);

  const handleAnswer = useCallback((value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(curr => curr + 1);
      }, 300);
    } else {
      setTimeout(() => {
        calculateResult(newAnswers);
      }, 300);
    }
  }, [currentQuestion, answers, calculateResult]);

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, #0a0a0a 0%, #0f0f0f 15%, #1a1a1a 35%, #1f1f1f 55%, #171717 75%, #0a0a0a 100%)` }} />
        <motion.div className="absolute inset-0 opacity-25" style={{ background: `radial-gradient(700px circle at ${mousePosition.x * 8 + 50}% ${mousePosition.y * 8 + 50}%, rgba(20, 184, 166, 0.12) 0%, transparent 65%)`, transition: 'background 0.3s ease-out' }} />
        <div className="absolute inset-0 opacity-60" style={{ background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)` }} />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 text-center">
            <Badge className="mb-4 bg-white/10 backdrop-blur-sm border-white/20 px-4 py-2 text-white">
              <Sparkles className="mr-2 h-4 w-4" />
              Personalização Inteligente
            </Badge>
            <h2 className="mb-4 text-3xl font-bold text-white lg:text-5xl">
              Descubra seu{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${designTokens.colors.teal[400]} 0%, ${designTokens.colors.orange[400]} 100%)`,
                }}
              >
                potencial de crescimento
              </span>
            </h2>
            <p className="text-lg text-slate-300 lg:text-xl">
              3 perguntas rápidas para personalizar seu checklist
            </p>
          </motion.div>

          <Card
            className="relative overflow-hidden border-0"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)`,
              backdropFilter: 'blur(20px)',
              boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)`,
            }}
          >
            <CardContent className="p-8 md:p-12">
              {!result ? (
                <>
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-300">Pergunta {currentQuestion + 1} de {questions.length}</span>
                      <span className="text-sm font-medium text-slate-300">{Math.round(progress)}%</span>
                    </div>
                    {/* Progressive Glow Progress Bar - esquenta conforme avança */}
                    <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full relative"
                        style={{
                          background: progress < 50
                            ? `linear-gradient(90deg, ${designTokens.colors.teal[600]}, ${designTokens.colors.teal[400]})`
                            : `linear-gradient(90deg, ${designTokens.colors.teal[400]}, ${designTokens.colors.orange[500]})`,
                          boxShadow: progress === 100
                            ? `0 0 20px ${designTokens.colors.orange[500]}80, 0 0 40px ${designTokens.colors.orange[500]}40`
                            : progress > 50
                            ? `0 0 10px ${designTokens.colors.teal[400]}60`
                            : 'none'
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        {/* Micro-celebration nos marcos */}
                        {[33, 66, 100].includes(Math.round(progress)) && (
                          <motion.div
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 0] }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `radial-gradient(circle, ${progress === 100 ? designTokens.colors.orange[400] : designTokens.colors.teal[400]}60, transparent)`,
                            }}
                          />
                        )}
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                      <div className="mb-8">
                        <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-4">
                          {React.createElement(questions[currentQuestion].icon, { className: 'h-8 w-8 text-teal-400' })}
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-white">{questions[currentQuestion].label}</h3>
                        <p className="text-slate-300">{questions[currentQuestion].description}</p>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        {questions[currentQuestion].options.map((option, index) => (
                          <motion.button
                            key={option.value}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            onClick={() => handleAnswer(option.value)}
                            className={cn(
                              'group relative overflow-hidden rounded-xl p-6 text-left transition-all duration-300',
                              'bg-white/5 hover:bg-white/10',
                              'border border-white/10 hover:border-white/30',
                              answers[questions[currentQuestion].id] === option.value && 'border-teal-400 bg-teal-400/10'
                            )}
                          >
                            <span className="relative z-10 text-lg font-semibold text-white">{option.label}</span>
                            <ArrowRight className="absolute right-6 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full" style={{ background: `linear-gradient(135deg, ${designTokens.colors.teal[500]} 0%, ${designTokens.colors.teal[600]} 100%)` }}>
                    <Zap className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="mb-3 text-3xl font-bold text-white">Potencial identificado!</h3>
                  
                  {/* Result with Context */}
                  <div className="mb-6 space-y-3">
                    <div className="inline-flex items-center gap-3 rounded-full px-6 py-3" style={{ background: `linear-gradient(135deg, ${designTokens.colors.teal[500]}20 0%, ${designTokens.colors.orange[500]}20 100%)`, border: `1px solid ${designTokens.colors.teal[400]}40` }}>
                      <TrendingUp className="h-6 w-6 text-teal-400" />
                      <div className="text-left">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-white">
                            +<AnimatedStatNumber valueString={`R$ ${result.potential.toLocaleString('pt-BR')}`} />
                          </span>
                          <span className="text-slate-300">/mês</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Context badges */}
                    <div className="flex items-center justify-center gap-3 text-sm">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-2 text-teal-300"
                      >
                        <TrendingUp className="w-4 h-4" />
                        <span>+{Math.round((result.potential / 5000) * 100)}% vs sua situação atual</span>
                      </motion.div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-xs text-slate-400"
                    >
                      Baseado em 127 clientes similares no segmento <span className="font-semibold text-teal-400">{result.segment}</span>
                    </motion.div>
                  </div>
                  
                  <p className="mb-8 text-lg leading-relaxed text-slate-200">{result.message}</p>
                  <div className="mb-6 rounded-xl bg-white/5 p-6 backdrop-blur-sm border border-white/10">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-teal-400" />
                      <p className="text-left text-slate-200">{result.action}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button size="lg" className="group h-14 px-8 text-lg font-semibold" style={{ background: `linear-gradient(135deg, ${designTokens.colors.teal[600]} 0%, ${designTokens.colors.teal[700]} 100%)` }} onClick={() => { const formSection = document.querySelector('form'); formSection?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}>
                      Baixar Checklist Personalizado
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 border-white/30 px-8 text-lg font-semibold text-white hover:bg-white/10" onClick={resetQuiz}>Refazer Quiz</Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {!result && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { icon: Users, value: '2.437', label: 'Já fizeram' },
                { icon: BarChart3, value: '3.8x', label: 'ROI médio' },
                { icon: Target, value: '87%', label: 'Taxa de sucesso' },
              ].map((stat, index) => (
                <div key={index} className="rounded-xl bg-white/5 p-4 backdrop-blur-sm border border-white/10">
                  <stat.icon className="mx-auto mb-2 h-6 w-6 text-teal-400" />
                  <AnimatedStatNumber valueString={stat.value} />
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}