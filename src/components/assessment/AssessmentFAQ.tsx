'use client';

/**
 * ASSESSMENT FAQ SECTION
 * Objeção handling com Accordion shadcn
 * Endereça as 5 principais dúvidas
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HelpCircle,
  DollarSign,
  Target,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Download
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ElementType;
  highlight?: string;
}

export const AssessmentFAQ = () => {
  const [openItem, setOpenItem] = useState<string>('');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const faqs: FAQItem[] = [
    {
      id: 'cost',
      question: 'Quanto custa depois do diagnóstico?',
      answer: 'Diagnóstico é 100% gratuito, sempre. Se você decidir implementar, investimento varia de R$ 2.500 a R$ 8.500/mês dependendo do escopo (gestão de anúncios, criação de landing pages, CRM, etc). Mas só cobramos se você fechar 3 clientes a mais que cubram o investimento. Se não rolar, não tem contrato de fidelidade.',
      icon: DollarSign,
      highlight: 'Sem custo inicial, sem cartão de crédito'
    },
    {
      id: 'fit',
      question: 'Funciona para minha especialidade?',
      answer: 'Se você é profissional liberal (médico, dentista, advogado, arquiteto, consultor, psicólogo) e o ticket do seu serviço é acima de R$ 500, sim. Já atendemos: ortopedistas, dermatologistas, cirurgiões plásticos, advogados trabalhistas, contadores, coaches executivos. O que importa é: você tem capacidade de atender mais clientes? Se sim, funciona.',
      icon: Target,
      highlight: 'Qualquer profissão liberal com ticket > R$ 500'
    },
    {
      id: 'tried-before',
      question: 'Já tentei Google Ads e não deu certo. Por quê?',
      answer: '99% das vezes: problema não é o anúncio, é a landing page. Você atrai cliques (paga por isso), mas página não converte visitante em lead. Ou: anúncio atrai público errado porque palavras-chave são genéricas demais (ex: "dentista" ao invés de "implante dentário [sua cidade]"). No diagnóstico, eu identifico exatamente onde está vazando dinheiro: pode ser copy ruim, formulário longo demais, falta de prova social, ou segmentação errada.',
      icon: AlertCircle,
      highlight: 'Identificamos o gargalo real, não sintomas'
    },
    {
      id: 'timeline',
      question: 'Quanto tempo até ver resultado?',
      answer: 'Primeiros leads qualificados: 7-14 dias (após setup completo + otimização inicial). ROI positivo: 30-60 dias (depende do seu ciclo de venda - dentista fecha mais rápido que advogado). Sistema maduro e previsível: 90 dias (quando conseguimos prever X investimento = Y leads com margem de erro de 10%). Mas importante: não é mágica. Precisa ter paciência nas primeiras 2-3 semanas de testes.',
      icon: Clock,
      highlight: 'Primeiros leads em 7-14 dias'
    },
    {
      id: 'requirements',
      question: 'Preciso ter site/Instagram/equipe?',
      answer: 'Site: Sim, é essencial (criamos landing page otimizada se não tiver, incluído no setup). Instagram: Não obrigatório, mas ajuda como prova social. Equipe: Não, você pode ser 100% solo. Só precisa ter capacidade de atender mais clientes (óbvio, né?). CRM/Sistema: Não precisa no início, mas recomendamos após primeiro mês (integramos WhatsApp Business API se quiser automatizar).',
      icon: CheckCircle2,
      highlight: 'Só precisa de capacidade de atender'
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_50%)]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge 
            className="inline-flex items-center gap-2 px-4 py-2 mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(236,72,153,0.2) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(168,85,247,0.3)'
            }}
          >
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span className="text-purple-100 font-semibold">Perguntas Frequentes</span>
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Perguntas Que{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Todo Mundo Faz
            </span>
          </h2>

          <p className="text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
            Transparência total. Sem rodeios, sem letras miúdas.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-2 border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={setOpenItem}
              className="w-full"
            >
              {faqs.map((faq) => {
                const isOpen = openItem === faq.id;
                const IconComponent = faq.icon as React.ComponentType<{ className?: string }>;

                return (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="border-b border-white/10 last:border-0"
                  >
                    <AccordionTrigger className="px-6 py-6 hover:no-underline hover:bg-white/5 transition-colors group">
                      <div className="flex items-start gap-4 text-left w-full">
                        {/* Icon with meaningful transition */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mt-1 relative overflow-hidden">
                          <AnimatePresence mode="wait">
                            {!isOpen ? (
                              <motion.div
                                key="question"
                                initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                exit={{ rotate: 180, scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <IconComponent className="w-6 h-6 text-purple-400" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="answer"
                                initial={{ rotate: -180, scale: 0.8, opacity: 0 }}
                                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                exit={{ rotate: 180, scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <CheckCircle2 className="w-6 h-6 text-green-400" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Question */}
                        <div className="flex-1 pr-8">
                          <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                            {faq.question}
                          </h3>
                          {faq.highlight && (
                            <Badge
                              variant="outline"
                              className="text-xs border-purple-500/50 text-purple-300"
                            >
                              <Sparkles className="w-3 h-3 mr-1" />
                              {faq.highlight}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="pl-16 pr-4"
                      >
                        <p className="text-blue-100/80 leading-relaxed text-base md:text-lg">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Card>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-blue-100/70">
                <strong className="text-white">127+</strong> clientes ativos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-blue-100/70">
                <strong className="text-white">450%</strong> ROI médio
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-purple-400" />
              <span className="text-blue-100/70">
                <strong className="text-white">99%</strong> satisfação
              </span>
            </div>
          </div>
        </motion.div>

        {/* Downgrade Option - Glassmorphic Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12"
        >
          <Card className="border border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-cyan-500/10 backdrop-blur-xl max-w-2xl mx-auto overflow-hidden relative">
            {/* Subtle animated glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-emerald-500/5 to-cyan-500/5 animate-pulse" />
            
            <CardContent className="relative p-6 sm:p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-teal-500/20 border border-teal-500/30 mb-4">
                <Download className="w-7 h-7 text-teal-400" />
              </div>
              
              <h4 className="text-lg sm:text-xl font-bold text-white mb-3">
                Ainda não tem certeza se precisa do diagnóstico completo?
              </h4>
              
              <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed max-w-xl mx-auto">
                Sem problema! Comece com nosso <span className="text-teal-400 font-semibold">checklist gratuito de 15 pontos</span> e 
                veja por você mesmo onde pode melhorar. Depois você decide se quer a análise completa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Email instantâneo</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Sem compromisso</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>100% gratuito</span>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-2 border-teal-400/50 bg-teal-500/10 text-teal-300 hover:bg-teal-500/20 hover:border-teal-400 hover:text-teal-200 backdrop-blur-sm font-semibold px-6 py-5 group"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      if (window.gtag) {
                        window.gtag('event', 'downgrade_clicked', {
                          from_page: 'assessment',
                          to_page: 'free',
                          event_category: 'conversion'
                        });
                      }
                      window.location.href = '/free';
                    }
                  }}
                >
                  <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Baixar Checklist Gratuito (15 pontos)
                </Button>
              </motion.div>
              
              <p className="text-xs text-slate-500 mt-4">
                Mais de 2.400 profissionais já baixaram • Sem cadastro de cartão
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
