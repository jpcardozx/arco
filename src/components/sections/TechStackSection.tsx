/**
 * TECH STACK SECTION
 * Apresenta a stack tecnológica de forma profissional
 * Com collapsibles para mapear interesse do lead
 * Traduz termos técnicos para valor de negócio
 */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown, 
  Zap, 
  Shield, 
  TrendingUp, 
  Code2, 
  Database, 
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface TechItem {
  id: string;
  icon: React.ElementType;
  category: string;
  tagline: string;
  technical: string;
  businessValue: string;
  benefits: string[];
}

export function TechStackSection() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const techStack: TechItem[] = [
    {
      id: 'frontend',
      icon: Code2,
      category: 'Frontend de Performance',
      tagline: 'Carrega rápido, converte mais',
      technical: 'Next.js 15 + React 19 + TypeScript',
      businessValue: 'Cada segundo de carregamento importa. Sites rápidos aumentam conversão e reduzem abandono. Next.js garante performance superior através de renderização otimizada e código otimizado automaticamente.',
      benefits: [
        'Carregamento inicial < 1.5s = menos abandono de visitantes',
        'SEO otimizado nativamente = mais tráfego orgânico',
        'TypeScript reduz bugs em 40% = menos retrabalho e custos'
      ]
    },
    {
      id: 'backend',
      icon: Database,
      category: 'Backend Escalável',
      tagline: 'Cresce com seu negócio',
      technical: 'Supabase (PostgreSQL + Auth + APIs)',
      businessValue: 'Infraestrutura que escala automaticamente. Suporte desde 100 até 100.000 usuários sem mudanças na arquitetura. Row-Level Security garante isolamento total de dados entre clientes.',
      benefits: [
        'Escalabilidade automática = sem custos surpresa com crescimento',
        'Autenticação enterprise-grade = conformidade LGPD nativa',
        'APIs prontas = reduz 60% do tempo de desenvolvimento'
      ]
    },
    {
      id: 'infrastructure',
      icon: Layers,
      category: 'Infraestrutura Global',
      tagline: 'Deploy em minutos, não semanas',
      technical: 'Vercel Edge Network + CDN Global',
      businessValue: 'Deploy automático a cada atualização. Conteúdo servido da edge mais próxima do usuário. Zero downtime, zero configuração de servidores. Monitoramento e logs integrados.',
      benefits: [
        'Zero downtime em atualizações = negócio sempre no ar',
        'Edge computing = latência <100ms globalmente',
        'Deploy em 2min = iteração rápida baseada em feedback'
      ]
    }
  ];

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.08)_0%,transparent_50%)]" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Premium */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 px-4 py-2 text-xs font-medium border-teal-700/50 bg-teal-900/30 text-teal-300 backdrop-blur-xl">
              <Sparkles className="w-3 h-3 mr-1.5 inline-block" />
              Stack de Alta Performance
            </Badge>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Tecnologia que{' '}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                acelera resultados
              </span>
            </h2>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Cada escolha técnica impacta diretamente conversão, escalabilidade e custo de manutenção. 
              Conheça como nossa stack traduz-se em vantagem competitiva.
            </p>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Stack Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
          >
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-600/30 p-8 shadow-2xl">
              <div className="relative w-full rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-purple-500/10" />
                <Image
                  src="/stack.png"
                  alt="Stack Tecnológica - Next.js, TypeScript, Tailwind CSS, Supabase"
                  width={800}
                  height={600}
                  quality={90}
                  className="w-full h-auto rounded-lg relative z-10"
                  priority
                />
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-700/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400 mb-1">
                    <TrendingUp className="w-5 h-5 inline-block" />
                  </div>
                  <p className="text-xs text-slate-400">Performance</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    <Shield className="w-5 h-5 inline-block" />
                  </div>
                  <p className="text-xs text-slate-400">Segurança</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">
                    <Zap className="w-5 h-5 inline-block" />
                  </div>
                  <p className="text-xs text-slate-400">Velocidade</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Interactive Collapsibles */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {techStack.map((item, index) => {
              const isOpen = openItem === item.id;
              const Icon = item.icon as React.FC<{ className?: string }>;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className={`
                      bg-white/5 backdrop-blur-xl border transition-all duration-300 overflow-hidden
                      ${isOpen 
                        ? 'border-teal-500/50 shadow-lg shadow-teal-500/10' 
                        : 'border-slate-600/20 hover:border-slate-500/40'
                      }
                    `}
                  >
                    {/* Collapsible Header */}
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-6 text-left flex items-start justify-between gap-4 group"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`
                          p-3 rounded-lg transition-colors
                          ${isOpen 
                            ? 'bg-teal-500/20 border border-teal-500/30' 
                            : 'bg-slate-800/50 border border-slate-700/30 group-hover:bg-slate-700/50'
                          }
                        `}>
                          <Icon className={`w-5 h-5 ${isOpen ? 'text-teal-400' : 'text-slate-400'}`} />
                        </div>
                        
                        <div className="flex-1 pt-0.5">
                          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-teal-300 transition-colors">
                            {item.category}
                          </h3>
                          <p className="text-sm text-slate-400">
                            {item.tagline}
                          </p>
                          <p className="text-xs text-slate-500 mt-2 font-mono">
                            {item.technical}
                          </p>
                        </div>
                      </div>

                      <ChevronDown 
                        className={`
                          w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 mt-1
                          ${isOpen ? 'rotate-180 text-teal-400' : 'group-hover:text-slate-300'}
                        `}
                      />
                    </button>

                    {/* Collapsible Content */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-6 pb-6 pt-2 space-y-4 border-t border-slate-700/30">
                            {/* Business Value */}
                            <div>
                              <h4 className="text-xs uppercase tracking-wider text-teal-400 font-semibold mb-2">
                                Valor para o Negócio
                              </h4>
                              <p className="text-sm text-slate-300 leading-relaxed">
                                {item.businessValue}
                              </p>
                            </div>

                            {/* Benefits List */}
                            <div>
                              <h4 className="text-xs uppercase tracking-wider text-teal-400 font-semibold mb-3">
                                Impacto Direto
                              </h4>
                              <ul className="space-y-2">
                                {item.benefits.map((benefit, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                    <div className="w-1 h-1 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                                    <span>{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}

            {/* CTA Premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <Card className="bg-gradient-to-br from-teal-900/30 to-cyan-900/20 backdrop-blur-xl border border-teal-700/30 p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h4 className="text-base font-semibold text-white mb-2">
                      Quer entender como isso se aplica ao seu projeto?
                    </h4>
                    <p className="text-sm text-slate-300">
                      Analisamos sua situação atual e mostramos oportunidades específicas de melhoria.
                    </p>
                  </div>
                  <Link href="/mydomain">
                    <Button 
                      className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-teal-500/20 whitespace-nowrap"
                    >
                      Analisar Site
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
