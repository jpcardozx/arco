/**
 * CONTRIBUIÇÕES OPEN SOURCE
 * Impacto na comunidade através de projetos e contribuições.
 */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Code,
  Box
} from 'lucide-react';

interface Repository {
  name: string;
  description: string;
  tech: string[];
  stars: number;
  forks: number;
  url: string;
  status: 'ativo' | 'mantido' | 'arquivado';
}

const repositories: Repository[] = [
  {
    name: 'react-performance-utils',
    description: 'Uma coleção de hooks e utilitários para otimizar a performance e o uso de memória de componentes React.',
    tech: ['React', 'TypeScript', 'Vite'],
    stars: 234,
    forks: 18,
    url: 'https://github.com/jpcardozx',
    status: 'ativo'
  },
  {
    name: 'nextjs-supabase-template',
    description: 'Um template inicial para Next.js 15 com Supabase, pronto para produção, com autenticação e RLS pré-configurados.',
    tech: ['Next.js', 'Supabase', 'TypeScript'],
    stars: 156,
    forks: 32,
    url: 'https://github.com/jpcardozx',
    status: 'ativo'
  },
  {
    name: 'tailwind-glassmorphism',
    description: 'Um plugin para Tailwind CSS para criar efeitos de glassmorphism acessíveis e performáticos.',
    tech: ['Tailwind CSS', 'PostCSS', 'JS'],
    stars: 89,
    forks: 12,
    url: 'https://github.com/jpcardozx',
    status: 'mantido'
  }
];

const contributions = [
  {
    project: 'Next.js',
    logo: '/logos/nextjs.svg', // Placeholder path
    type: 'Documentação',
    description: 'Esclarecimento sobre o comportamento de cache de Server Components e estratégias de revalidação de dados.'
  },
  {
    project: 'Framer Motion',
    logo: '/logos/framer.svg', // Placeholder path
    type: 'Correção de Bug',
    description: 'Resolvido um bug de animação de layout que afetava contêineres CSS Grid com filhos dinâmicos.'
  },
  {
    project: 'shadcn/ui',
    logo: '/logos/shadcn.svg', // Placeholder path
    type: 'Componente',
    description: 'Contribuí com uma nova variante do seletor de data, acessível e com seleção de intervalo.'
  }
];

const statusColors = {
  ativo: 'text-green-400',
  mantido: 'text-blue-400',
  arquivado: 'text-slate-500'
};

type Tab = 'projects' | 'contributions';

export default function OpenSourceContributions() {
  const [activeTab, setActiveTab] = useState<Tab>('projects');

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.06)_0%,transparent_60%)]" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 px-4 py-2 text-xs font-medium border-purple-700/50 bg-purple-900/30 text-purple-300">
            Open Source
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Impacto Através do Código Aberto
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Construindo ferramentas para a comunidade e contribuindo para os projetos que impulsionam o desenvolvimento web moderno.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 p-1 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <Button
              variant={activeTab === 'projects' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-2 rounded-md transition-all ${activeTab === 'projects' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              Meus Projetos
            </Button>
            <Button
              variant={activeTab === 'contributions' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('contributions')}
              className={`px-6 py-2 rounded-md transition-all ${activeTab === 'contributions' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              Contribuições
            </Button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'projects' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repositories.map((repo, index) => (
                  <motion.div
                    key={repo.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col bg-slate-900/50 backdrop-blur-xl border-slate-800 hover:border-slate-700 transition-all duration-300 p-6 group hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Box className="w-5 h-5 text-purple-400" />
                          <h4 className="text-lg font-semibold text-white">
                            {repo.name}
                          </h4>
                        </div>
                        <span className={`text-xs font-medium ${statusColors[repo.status]}`}>
                          {repo.status}
                        </span>
                      </div>

                      <p className="text-sm text-slate-400 mb-4 flex-grow">
                        {repo.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="border-slate-700/80 bg-slate-800/50 text-slate-300">{tech}</Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="font-semibold text-white">{repo.stars}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <GitFork className="w-4 h-4 text-slate-500" />
                            <span className="font-semibold text-white">{repo.forks}</span>
                          </div>
                        </div>

                        <Button variant="ghost" size="sm" className="text-teal-400 hover:text-teal-300" asChild>
                          <a href={repo.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            Ver <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'contributions' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contributions.map((contribution, index) => (
                  <motion.div
                    key={contribution.project}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                          {/* Placeholder for logo */}
                          <div className="w-8 h-8 bg-slate-700 rounded" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">
                            {contribution.project}
                          </h4>
                          <Badge className="bg-purple-500/10 border-purple-500/30 text-purple-400 text-xs">
                            {contribution.type}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-slate-300">
                        {contribution.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 p-6 text-center">
            <Github className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-white mb-2">
              Explore Toda Minha Atividade Open Source
            </h4>
            <p className="text-sm text-slate-400 mb-4">
              Veja meu histórico completo de contribuições, projetos pessoais e mais no GitHub.
            </p>
            <Button
              variant="outline"
              className="border-slate-700 text-white hover:bg-slate-800"
              asChild
            >
              <a
                href="https://github.com/jpcardozx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                Visitar Perfil no GitHub
              </a>
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
