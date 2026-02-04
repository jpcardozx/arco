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
      tagline: 'Performance e otimização de carregamento',
      technical: 'Next.js 15 + React 19 + TypeScript',
      businessValue: 'Next.js oferece renderização otimizada e código otimizado automaticamente, garantindo carregamento rápido e experiência responsiva. TypeScript adiciona segurança de tipos para maior manutenibilidade.',
      benefits: [
        'Carregamento otimizado com renderização server-side',
        'SEO otimizado nativamente para melhor indexação',
        'TypeScript para maior segurança de tipos e manutenibilidade'
      ]
    },
    {
      id: 'backend',
      icon: Database,
      category: 'Backend Escalável',
      tagline: 'Infraestrutura escalável e segura',
      technical: 'Supabase (PostgreSQL + Auth + APIs)',
      businessValue: 'Infraestrutura que escala automaticamente conforme demanda. Row-Level Security garante isolamento de dados entre clientes. Arquitetura preparada para crescimento sustentável.',
      benefits: [
        'Escalabilidade automática conforme demanda',
        'Autenticação enterprise-grade com conformidade LGPD',
        'APIs RESTful prontas para integração rápida'
      ]
    },
    {
      id: 'infrastructure',
      icon: Layers,
      category: 'Infraestrutura Global',
      tagline: 'Deploy automatizado e monitoramento',
      technical: 'Vercel Edge Network + CDN Global',
      businessValue: 'Deploy automático a cada atualização. Conteúdo servido da edge mais próxima do usuário para melhor performance. Monitoramento e logs integrados.',
      benefits: [
        'Deploy automático com zero-downtime strategies',
        'Edge computing para distribuição global de conteúdo',
        'CI/CD integrado para iterações contínuas'
      ]
    }
  ];

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Premium Background Effects - REDUZIDOS */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.06)_0%,transparent_50%)]" />
      
      {/* Animated Grid - MAIS SUTIL */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Premium - DIMENSIONAMENTO OTIMIZADO */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-3.5 py-1.5 text-xs font-semibold border-teal-700/50 bg-teal-900/30 text-teal-300 backdrop-blur-xl">
              <Sparkles className="w-3 h-3 mr-1.5 inline-block" />
              Tecnologias & Ferramentas
            </Badge>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              Ferramentas de{' '}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                desenvolvimento
              </span>
            </h2>
            
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Ecossistema completo para construção de aplicações web robustas. Frontend, backend, infraestrutura e ferramentas de produtividade.
            </p>
          </motion.div>
        </div>

        {/* Main Content Grid - DIMENSIONAMENTO OTIMIZADO */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Stack Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
          >
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-600/30 p-6 sm:p-8 shadow-2xl hover:border-slate-500/40 transition-all duration-300">
              <div className="relative w-full rounded-xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-purple-500/10 group-hover:from-teal-500/15 group-hover:to-purple-500/15 transition-all duration-300" />
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
              
              {/* Quick Stats - MELHORADOS */}
              <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-slate-700/50">
                <div className="text-center group">
                  <div className="text-xl font-bold text-teal-400 mb-1 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-4 h-4 inline-block" />
                  </div>
                  <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">Performance</p>
                </div>
                <div className="text-center group">
                  <div className="text-xl font-bold text-purple-400 mb-1 group-hover:scale-110 transition-transform">
                    <Shield className="w-4 h-4 inline-block" />
                  </div>
                  <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">Segurança</p>
                </div>
                <div className="text-center group">
                  <div className="text-xl font-bold text-cyan-400 mb-1 group-hover:scale-110 transition-transform">
                    <Zap className="w-4 h-4 inline-block" />
                  </div>
                  <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">Velocidade</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Interactive Collapsibles - CARDS MELHORADOS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-3"
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
                  whileHover={!isOpen ? { scale: 1.01, y: -2 } : {}}
                >
                  <Card 
                    className={`
                      bg-white/5 backdrop-blur-xl border transition-all duration-300 overflow-hidden
                      ${isOpen 
                        ? 'border-teal-500/50 shadow-lg shadow-teal-500/10' 
                        : 'border-slate-600/20 hover:border-slate-500/40 hover:shadow-lg'
                      }
                    `}
                  >
                    {/* Collapsible Header - DIMENSIONAMENTO OTIMIZADO */}
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-5 text-left flex items-start justify-between gap-3 group"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`
                          p-2.5 rounded-lg transition-all duration-300
                          ${isOpen 
                            ? 'bg-gradient-to-br from-teal-500/20 to-cyan-500/10 border border-teal-500/30 shadow-md' 
                            : 'bg-slate-800/50 border border-slate-700/30 group-hover:bg-slate-700/50 group-hover:border-slate-600/40'
                          }
                        `}>
                          <Icon className={`w-4 h-4 ${isOpen ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-300'} transition-colors`} />
                        </div>
                        
                        <div className="flex-1 pt-0.5">
                          <h3 className="text-base font-semibold text-white mb-1 group-hover:text-teal-300 transition-colors">
                            {item.category}
                          </h3>
                          <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                            {item.tagline}
                          </p>
                          <p className="text-xs text-slate-500 mt-1.5 font-mono">
                            {item.technical}
                          </p>
                        </div>
                      </div>

                      <ChevronDown 
                        className={`
                          w-4 h-4 text-slate-400 transition-all duration-300 flex-shrink-0 mt-1
                          ${isOpen ? 'rotate-180 text-teal-400' : 'group-hover:text-slate-300'}
                        `}
                      />
                    </button>

                    {/* Collapsible Content - DIMENSIONAMENTO OTIMIZADO */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-5 pb-5 pt-2 space-y-3 border-t border-slate-700/30">
                            {/* Business Value */}
                            <div>
                              <h4 className="text-xs uppercase tracking-wider text-teal-400 font-semibold mb-1.5">
                                Valor para o Negócio
                              </h4>
                              <p className="text-xs text-slate-300 leading-relaxed">
                                {item.businessValue}
                              </p>
                            </div>

                            {/* Benefits List */}
                            <div>
                              <h4 className="text-xs uppercase tracking-wider text-teal-400 font-semibold mb-2">
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
