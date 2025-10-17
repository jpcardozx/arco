/**
 * INFORMAÇÕES DE CONTATO
 * CTAs claros e múltiplos pontos de contato para diferentes públicos.
 */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  Calendar,
  ArrowRight,
  Users,
  Send
} from 'lucide-react';

interface ContactMethod {
  icon: React.ElementType;
  label: string;
  value: string;
  url: string;
  description: string;
}

const socialMethods: ContactMethod[] = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/jpcardozx',
    url: 'https://linkedin.com/in/jpcardozx',
    description: 'Histórico profissional e rede'
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@jpcardozx',
    url: 'https://github.com/jpcardozx',
    description: 'Código, projetos e contribuições'
  },
  {
    icon: Twitter,
    label: 'Twitter / X',
    value: '@jpcardozx',
    url: 'https://twitter.com/jpcardozx',
    description: 'Insights técnicos e atualizações'
  }
];

export default function ContactInformation() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(20,184,166,0.1)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 px-4 py-2 text-xs font-medium border-teal-700/50 bg-teal-900/30 text-teal-300">
            Contato
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Iniciar Conversa
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Discutir projetos, consultoria técnica ou oportunidades profissionais.
          </p>
        </motion.div>

        {/* Main Contact Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Primary Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="h-full bg-gradient-to-br from-slate-900 to-slate-800/80 border-slate-700 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Mensagem Direta</h3>
                  <p className="text-slate-400 text-sm">Resposta em até 24h úteis</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                  Online
                </div>
              </div>
              
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Nome</label>
                    <Input 
                      type="text" 
                      placeholder="Ex: Maria Silva" 
                      className="bg-slate-900/50 border-slate-700 focus:border-teal-500/50 focus:ring-teal-500/20 h-11" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email</label>
                    <Input 
                      type="email" 
                      placeholder="contato@empresa.com" 
                      className="bg-slate-900/50 border-slate-700 focus:border-teal-500/50 focus:ring-teal-500/20 h-11" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Assunto</label>
                  <Input 
                    type="text" 
                    placeholder="Ex: Consultoria de Performance" 
                    className="bg-slate-900/50 border-slate-700 focus:border-teal-500/50 focus:ring-teal-500/20 h-11" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Mensagem</label>
                  <Textarea 
                    placeholder="Descreva o contexto: tipo de projeto, stack atual, desafios principais..." 
                    className="bg-slate-900/50 border-slate-700 focus:border-teal-500/50 focus:ring-teal-500/20 min-h-[140px] resize-none" 
                  />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-slate-500">
                    Seus dados são <span className="text-teal-400">privados e seguros</span>
                  </p>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all duration-300"
                  >
                    Enviar Mensagem <Send className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>

          {/* Secondary Contact Options */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full bg-slate-900/50 backdrop-blur-xl border-slate-800 p-6 hover:border-purple-500/30 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <Calendar className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Consultoria</h3>
                    <p className="text-xs text-purple-400/80">30 minutos gratuitos</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                  Discussão técnica sobre arquitetura, performance, ou migração de sistemas.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all"
                  asChild
                >
                  <a href="/agendamentos">Agendar Consultoria <ArrowRight className="w-4 h-4 ml-2" /></a>
                </Button>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full bg-slate-900/50 backdrop-blur-xl border-slate-800 p-6 hover:border-teal-500/30 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                    <Users className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Recrutadores</h3>
                    <p className="text-xs text-teal-400/80">Entrevista técnica</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                  Demonstração ao vivo de código, discussão de arquitetura ou apresentação de portfolio.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-teal-500/30 text-teal-400 hover:bg-teal-500/10 hover:border-teal-500/50 transition-all"
                  asChild
                >
                  <a href="/agendamentos">Agendar Entrevista <ArrowRight className="w-4 h-4 ml-2" /></a>
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-24 text-center"
        >
          <p className="text-sm text-slate-600">
            Este portfólio foi construído com Next.js, React e Three.js.
            <br />
            Consulte o código-fonte no{' '}
            <a
              href="https://github.com/jpcardozx"
              className="text-teal-400 hover:text-teal-300 transition-colors underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
