'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Star, Quote, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/primitives/Container/Container';
import { cn } from '@/lib/utils';

function AnimatedStat({ valueString }: { valueString: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const numericValue = parseFloat(valueString.replace(/[^0-9.,]/g, '').replace(',', '.'));
  const prefix = valueString.match(/^[^0-9]*/)?.[0] || '';
  const suffix = valueString.match(/[^0-9.,]*$/)?.[0] || '';

  useEffect(() => {
    if (inView && !isNaN(numericValue)) {
      const node = ref.current;
      if (!node) return;
      const controls = animate(0, numericValue, { duration: 2, ease: 'easeOut', onUpdate: v => { node.textContent = v.toLocaleString('pt-BR', { maximumFractionDigits: 1 }); } });
      return () => controls.stop();
    }
  }, [inView, numericValue]);

  if (isNaN(numericValue)) return <div className="text-3xl font-bold text-white">{valueString}</div>;
  return <div className="text-3xl font-bold text-white">{prefix}<span ref={ref}>0</span>{suffix}</div>;
}

const testimonials = [
  {
    name: 'Carlos Mendes',
    role: 'Diretor de Marketing, Clínica Premium',
    quote: 'O checklist nos ajudou a identificar 8 gargalos críticos. Implementamos 5 deles e os leads qualificados aumentaram 127% em 45 dias.',
    rating: 5,
  },
  {
    name: 'Ana Paula Costa',
    role: 'Proprietária, Escritório de Arquitetura',
    quote: 'Material direto ao ponto, sem enrolação. Usei a planilha de ROI para convencer meu sócio a finalmente investir em uma estratégia de tráfego pago.',
    rating: 5,
  },
  {
    name: 'Roberto Lima',
    role: 'Gerente Comercial, Academia Fitness',
    quote: 'Eu achava que meu site estava bom. O checklist me provou que estávamos perdendo mais de 60% dos visitantes por erros básicos de UX e design.',
    rating: 5,
  },
];

const trustIndicators = [
  { icon: Users, value: '2.4K+', label: 'Downloads' },
  { icon: Star, value: '4.8/5', label: 'Avaliação Média' },
  { icon: TrendingUp, value: '3.8x', label: 'Melhoria Média Reportada' },
];

export function LeadMagnetSocialProof() {
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

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return names[0].substring(0, 2);
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
      {/* Background gradient - limpo e discreto */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-950 to-slate-900" />
      
      {/* Mouse parallax overlay - mantém interatividade */}
      <motion.div 
        className="absolute inset-0 opacity-20 pointer-events-none z-10" 
        style={{ 
          background: `radial-gradient(700px circle at ${mousePosition.x * 8 + 50}% ${mousePosition.y * 8 + 50}%, rgba(20, 184, 166, 0.12) 0%, transparent 65%)`,
          transition: 'background 0.3s ease-out'
        }} 
      />

      <Container size="xl" className="relative z-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16 text-center max-w-3xl mx-auto">
          <Badge className="mb-4 bg-white/10 backdrop-blur-sm border-white/20 px-4 py-2 text-white">
            <Star className="mr-2 h-4 w-4 text-yellow-400 fill-yellow-400" />
            Resultados Reais
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
            O que dizem os profissionais que <span className="bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">já aplicaram o checklist</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">Resultados reais de empresas que identificaram e corrigiram gargalos em seus funis.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Card className="group h-full border border-white/10 bg-slate-800/50 backdrop-blur-lg flex flex-col">
                <CardContent className="p-6 flex flex-col flex-1">
                  <Quote className="mb-4 h-8 w-8 text-teal-400/30" />
                  <blockquote className="flex-1 mb-6 text-slate-300 leading-relaxed text-lg">“{testimonial.quote}”</blockquote>
                  <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-xl font-bold text-white flex-shrink-0">
                      {getInitials(testimonial.name)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-16">
          <Card className="border border-white/10 bg-slate-800/50 backdrop-blur-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="border-r border-white/10 last:border-r-0 sm:px-6">
                    <indicator.icon className="mx-auto mb-3 h-8 w-8 text-teal-400" />
                    <AnimatedStat valueString={indicator.value} />
                    <div className="text-sm text-slate-400">{indicator.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-12 text-center text-sm text-slate-500">
          <p>* Para garantir a confidencialidade, os dados foram anonimizados de acordo com as normas da Lei Geral de Proteção de Dados (LGPD) e os NDAs assinados com nossos clientes.</p>
        </motion.div>

        {/* Upsell to Assessment - Premium Glassmorphic Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <Card className="relative overflow-hidden border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl max-w-3xl mx-auto">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />
            
            <CardContent className="relative p-8 sm:p-10">
              <div className="text-center mb-6">
                <Badge className="mb-4 bg-gradient-to-r from-orange-500/20 to-purple-500/20 text-orange-300 border-orange-500/30 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold">
                  <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
                  Próximo Nível
                </Badge>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                  Checklist baixado. <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">E agora?</span>
                </h3>
                
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                  O checklist mostra <span className="text-white font-semibold">os pontos gerais</span>. 
                  Mas você sabe <span className="text-orange-400 font-semibold">onde VOCÊ especificamente</span> está 
                  perdendo clientes? E <span className="text-purple-400 font-semibold">quanto isso custa</span> por mês?
                </p>
              </div>

              {/* Comparison Grid */}
              <div className="grid gap-4 sm:grid-cols-2 max-w-xl mx-auto mb-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="text-left p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-teal-400" />
                    <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Com Checklist</div>
                  </div>
                  <div className="text-sm text-slate-300">Visão geral dos problemas comuns</div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="text-left p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-orange-500/30 backdrop-blur-sm relative overflow-hidden"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 blur-xl" />
                  
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                      <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Com Diagnóstico</div>
                    </div>
                    <div className="text-sm text-white font-semibold">Análise personalizada + priorização + ROI exato</div>
                  </div>
                </motion.div>
              </div>

              {/* Value Props */}
              <div className="grid gap-3 sm:grid-cols-3 max-w-2xl mx-auto mb-8">
                {[
                  { icon: TrendingUp, text: 'Análise em 24-48h' },
                  { icon: Users, text: 'Relatório personalizado' },
                  { icon: ArrowRight, text: 'Call de 30min incluída' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <item.icon className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg"
                  className="w-full sm:w-auto mx-auto bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 hover:from-orange-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold shadow-lg shadow-orange-500/20 border-0 px-8 py-6 text-base group"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      if ((window as any).gtag) {
                        (window as any).gtag('event', 'upsell_clicked', {
                          from_page: 'free',
                          to_page: 'assessment',
                          event_category: 'conversion'
                        });
                      }
                      window.location.href = '/assessment';
                    }
                  }}
                >
                  Agendar Diagnóstico Personalizado
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              
              <p className="text-xs text-slate-400 mt-4 text-center">
                <span className="text-orange-400 font-semibold">R$ 497</span> • Análise completa em 48h • Call estratégica opcional • Garantia de satisfação
              </p>
            </CardContent>
          </Card>
        </motion.div>

      </Container>
    </section>
  );
}