/**
 * STACK TÉCNICO - Refatorado
 * Ferramentas e tecnologias com contexto prático de aplicação
 * Complementa ExpertiseMatrix (que mostra capacidades)
 * Aqui mostramos: "Para que uso isso"
 */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ChevronDown,
  Code2,
  Database,
  Cloud,
  PenTool,
  Zap,
  Shield,
  Layers
} from 'lucide-react';

interface Technology {
  name: string;
  icon: React.ElementType;
  category: string;
  useCase: string; // Foco em aplicação prática
  description: string;
}

interface TechCategory {
  id: string;
  title: string;
  technologies: Technology[];
}

const techStack: TechCategory[] = [
  {
    id: 'frontend',
    title: 'Arquitetura Frontend',
    technologies: [
      {
        name: 'React',
        icon: Code2,
        category: 'Framework UI',
        useCase: 'Gestão de estado complexo',
        description: 'Arquitetura de componentes para interfaces de dashboard, exibições de dados em tempo real e fluxos multi-etapas.'
      },
      {
        name: 'Next.js',
        icon: Code2,
        category: 'Meta-framework',
        useCase: 'Deploy em produção',
        description: 'SSR/SSG para páginas críticas de SEO, App Router para layouts aninhados, Server Components para otimização de data fetching.'
      },
      {
        name: 'TypeScript',
        icon: Code2,
        category: 'Sistema de Tipos',
        useCase: 'Validação de contratos',
        description: 'Validação de contratos de API, segurança de tipos de props, confiança em refatoração em codebases com múltiplos contribuidores.'
      },
      {
        name: 'Tailwind CSS',
        icon: PenTool,
        category: 'Sistema de Estilização',
        useCase: 'Implementação de design system',
        description: 'Design tokens customizados, layouts responsivos, variantes de modo escuro sem CSS bloat.'
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend & Dados',
    technologies: [
      {
        name: 'Supabase',
        icon: Shield,
        category: 'Plataforma Backend',
        useCase: 'Auth + dados em tempo real',
        description: 'Políticas RLS para segurança multi-tenant, Edge Functions para lógica de servidor, Realtime subscriptions para recursos colaborativos.'
      },
      {
        name: 'PostgreSQL',
        icon: Database,
        category: 'Banco de Dados',
        useCase: 'Modelagem relacional',
        description: 'Design de schema para relacionamentos complexos, otimização de queries para dashboards de relatórios, gestão de transações para integridade de dados.'
      },
      {
        name: 'Node.js',
        icon: Database,
        category: 'Runtime',
        useCase: 'Orquestração de APIs',
        description: 'REST APIs para integrações externas, processamento de background jobs, handlers de webhooks para serviços terceiros.'
      }
    ]
  },
  {
    id: 'tools',
    title: 'Ferramentas & DevOps',
    technologies: [
      {
        name: 'Git',
        icon: Code2,
        category: 'Controle de Versão',
        useCase: 'Colaboração em equipe',
        description: 'Workflows de branching, merging e colaboração para equipes de todos os tamanhos com histórico limpo e reversível.'
      },
      {
        name: 'Vercel',
        icon: Cloud,
        category: 'Hospedagem',
        useCase: 'Deploy e escalabilidade',
        description: 'Deploy, escala e gestão de aplicações web modernas com arquitetura edge-first e preview automático por branch.'
      },
      {
        name: 'Figma',
        icon: PenTool,
        category: 'Design',
        useCase: 'Design-to-code',
        description: 'Tradução de designs complexos em código pixel-perfect e pronto para produção com componentes reutilizáveis.'
      }
    ]
  },
  {
    id: 'libraries',
    title: 'Bibliotecas Principais',
    technologies: [
      {
        name: 'Framer Motion',
        icon: Zap,
        category: 'Animação',
        useCase: 'Micro-interações',
        description: 'Animações e transições de UI fluidas, interativas e significativas que melhoram a experiência sem sobrecarregar.'
      },
      {
        name: 'React Three Fiber',
        icon: Layers,
        category: 'Gráficos 3D',
        useCase: 'Visualizações interativas',
        description: 'Cenas 3D performáticas e interativas para web com Three.js em React para storytelling visual e dados complexos.'
      },
      {
        name: 'Zod',
        icon: Shield,
        category: 'Validação',
        useCase: 'Validação end-to-end',
        description: 'Validação de dados robusta e com tipagem segura do cliente ao servidor, garantindo integridade em toda a aplicação.'
      }
    ]
  }
];

export default function TechnicalStack() {
  const [openCategory, setOpenCategory] = useState<string | null>('frontend');

  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(20,184,166,0.08)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 px-4 py-2 text-xs font-medium border-teal-700/50 bg-teal-900/30 text-teal-300">
            Stack Técnico
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Tecnologias & Ferramentas
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            As principais tecnologias que utilizo para construir aplicações web modernas, performáticas e escaláveis.
          </p>
        </motion.div>

        {/* Tech Categories */}
        <div className="space-y-4">
          {techStack.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-white">
                    {category.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: openCategory === category.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  </motion.div>
                </button>

                {/* Technologies List */}
                <AnimatePresence>
                  {openCategory === category.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-800">
                        {category.technologies.map((tech) => (
                          <div
                            key={tech.name}
                            className="p-6 border-b border-slate-800 last:border-b-0"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-4">
                                {React.createElement(tech.icon, { className: "w-6 h-6 text-teal-400 flex-shrink-0" })}
                                <div className="flex-1">
                                  <h4 className="text-lg font-semibold text-white">
                                    {tech.name}
                                  </h4>
                                  <p className="text-sm text-slate-500">
                                    {tech.category}
                                  </p>
                                </div>
                                <Badge className="bg-teal-500/10 border-teal-500/30 text-teal-400 text-xs whitespace-nowrap">
                                  {tech.useCase}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-slate-400 mt-3 pl-10">
                              {tech.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
