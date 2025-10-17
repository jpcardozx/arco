/**
 * FEATURED CASE STUDY - IMOBILIÁRIA IPÊ
 * Case study de projeto real com foco em entregas técnicas
 * Design profissional focado em resultados mensuráveis
 */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, ChevronDown, Code2, TrendingUp, 
  Calendar, Briefcase, Zap, Target, ExternalLink,
  CheckCircle2, FileText, Users, Database, Cloud
} from 'lucide-react';
import Image from 'next/image';

export default function FeaturedCaseStudy() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative py-32 bg-slate-950 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-950 to-slate-950" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-teal-400" />
            <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
              Case Study
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Projeto em destaque
          </h2>
          <p className="text-slate-400 max-w-2xl">
            Desenvolvimento full-stack de plataforma imobiliária completa com CRM, gestão de leads e headless CMS
          </p>
        </motion.div>

        {/* Collapsible Case Study Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div 
            className="relative backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
              boxShadow: `
                0 20px 40px rgba(0,0,0,0.4),
                0 0 0 1px rgba(255,255,255,0.08),
                inset 0 1px 0 rgba(255,255,255,0.15)
              `
            }}
          >
            {/* Header (sempre visível) */}
            <div 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-8 cursor-pointer hover:bg-white/5 transition-colors"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-6 flex-1">
                  {/* Logo */}
                  <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg p-2">
                    <Image
                      src="/ipeLogo.png"
                      alt="Imobiliária Ipê"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>

                  {/* Title info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Ipê Imóveis
                    </h3>
                    <p className="text-sm text-teal-400 font-medium mb-3">
                      Plataforma Imobiliária Full-Stack com CRM Integrado e CMS Headless
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        2025
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        Desenvolvedor Full-Stack Responsável
                      </span>
                      <span>•</span>
                      <a 
                        href="https://www.imobiliariaipe.com.br" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 hover:text-teal-400 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        imobiliariaipe.com.br
                      </a>
                    </div>
                  </div>
                </div>

                {/* Chevron */}
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6 text-slate-400" />
                </motion.div>
              </div>
            </div>

            {/* Expandable Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-8 space-y-8 border-t border-white/10 pt-8">
                    {/* Overview */}
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">
                        Visão Geral do Projeto
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Desenvolvimento completo de plataforma imobiliária moderna integrando website público, 
                        CRM para corretores e sistema de gestão de conteúdo headless. O projeto envolveu desde 
                        wireframing e design UI/UX até implementação full-stack e migração de infraestrutura.
                      </p>
                    </div>

                    {/* Challenge & Solution */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Target className="w-5 h-5 text-teal-400" />
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                            Desafio
                          </h4>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          Imobiliária precisava de plataforma completa que unificasse presença digital com 
                          ferramentas internas de gestão, permitindo que corretores gerenciassem leads, 
                          negociações e conteúdo do site de forma autônoma e eficiente.
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Zap className="w-5 h-5 text-teal-400" />
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                            Solução
                          </h4>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          Arquitetura moderna com Next.js para performance, Sanity CMS para gestão de conteúdo 
                          intuitiva, dashboard CRM personalizado para corretores, e migração para infraestrutura 
                          AWS com Cloudflare R2 para otimização de custos e performance.
                        </p>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2 className="w-5 h-5 text-teal-400" />
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                          Responsabilidades Principais
                        </h4>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          'Wireframing e prototipagem da plataforma completa',
                          'Design UI/UX com foco em conversão e usabilidade',
                          'Conversão Figma → Código com componentes Shadcn',
                          'Implementação frontend com Next.js + React',
                          'Integração Sanity CMS para gestão headless de conteúdo',
                          'Dashboard CRM com gestão de leads e negociações',
                          'Sistema de tarefas e follow-up para corretores',
                          'Migração de provedor antigo para AWS',
                          'Setup Cloudflare R2 para storage otimizado',
                          'Otimização de performance e Core Web Vitals'
                        ].map((item, i) => (
                          <div 
                            key={i}
                            className="flex items-start gap-2 text-sm text-slate-300"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Code2 className="w-5 h-5 text-teal-400" />
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                          Stack Técnico
                        </h4>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-slate-500 mb-2 font-medium">Frontend</div>
                          <div className="flex flex-wrap gap-2">
                            {['Next.js', 'React', 'TypeScript', 'Shadcn UI', 'Tailwind CSS'].map(tech => (
                              <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-300 border border-white/10">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-2 font-medium">Backend & CMS</div>
                          <div className="flex flex-wrap gap-2">
                            {['Sanity CMS', 'Node.js', 'API REST'].map(tech => (
                              <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-300 border border-white/10">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-2 font-medium">Infraestrutura</div>
                          <div className="flex flex-wrap gap-2">
                            {['AWS', 'Cloudflare R2', 'Vercel'].map(tech => (
                              <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-300 border border-white/10">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-teal-400" />
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                          Features Entregues
                        </h4>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <Users className="w-5 h-5 text-teal-400 mb-2" />
                          <h5 className="text-sm font-bold text-white mb-1">CRM Corretores</h5>
                          <p className="text-xs text-slate-400">
                            Dashboard com gestão de leads, pipeline de negociações e sistema de tarefas
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <Database className="w-5 h-5 text-teal-400 mb-2" />
                          <h5 className="text-sm font-bold text-white mb-1">Headless CMS</h5>
                          <p className="text-xs text-slate-400">
                            Sanity Studio para gestão facilitada de imóveis, conteúdo e mídia
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <Cloud className="w-5 h-5 text-teal-400 mb-2" />
                          <h5 className="text-sm font-bold text-white mb-1">Infraestrutura</h5>
                          <p className="text-xs text-slate-400">
                            Migração para AWS + R2 com otimização de custos e performance
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Results */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-teal-400" />
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                          Resultados Técnicos
                        </h4>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          { label: 'Lighthouse Score', value: '95+', desc: 'Otimização de performance' },
                          { label: 'LCP', value: '< 2.0s', desc: 'Core Web Vitals em dia' },
                          { label: 'Gestão de Conteúdo', value: '100%', desc: 'Autonomia total do cliente' }
                        ].map((result, i) => (
                          <div 
                            key={i}
                            className="p-5 rounded-xl bg-white/5 border border-white/10"
                          >
                            <div className="text-3xl font-bold text-teal-400 mb-2">
                              {result.value}
                            </div>
                            <div className="text-xs font-semibold text-white mb-1">
                              {result.label}
                            </div>
                            <div className="text-xs text-slate-400">
                              {result.desc}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex justify-center pt-4">
                      <a
                        href="https://www.imobiliariaipe.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-400 text-slate-950 font-medium text-sm hover:bg-teal-300 transition-all duration-300 shadow-lg shadow-teal-400/30"
                      >
                        Visitar Site
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
