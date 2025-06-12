'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check, Mail, MessageCircle, Shield, Calendar, Users } from 'lucide-react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

// Collaboration process steps
interface CollaborationStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const COLLABORATION_STEPS: CollaborationStep[] = [
  {
    id: 'initial-consultation',
    title: 'Consulta Inicial',
    description:
      'Uma discussão focada de 30 minutos para entender seus desafios atuais de percepção e objetivos de negócio.',
    icon: <MessageCircle className="h-6 w-6" />,
  },
  {
    id: 'perception-diagnosis',
    title: 'Diagnóstico de Percepção',
    description:
      'Análise aprofundada de suas lacunas atuais de percepção-valor e seu impacto econômico.',
    icon: <Shield className="h-6 w-6" />,
  },
  {
    id: 'strategic-proposal',
    title: 'Proposta Estratégica',
    description:
      'Plano personalizado de engenharia de percepção com entregáveis específicos, cronograma e resultados esperados.',
    icon: <Users className="h-6 w-6" />,
  },
  {
    id: 'implementation',
    title: 'Implementação Colaborativa',
    description:
      'Execução sistemática da estratégia de alinhamento de percepção com revisões regulares de progresso.',
    icon: <Calendar className="h-6 w-6" />,
  },
];

// FAQ items
interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Como isso é diferente de serviços padrão de marketing ou design?',
    answer:
      'O marketing tradicional foca em criar assets atraentes ou mensagens gerais. A engenharia de percepção identifica especificamente e corrige o desalinhamento entre sua entrega real de valor e como esse valor é percebido no mercado. Esta abordagem sistemática cria resultados econômicos mensuráveis garantindo que sua expertise e qualidade sejam adequadamente reconhecidas antes das considerações de preço.',
  },
  {
    question: 'Que tipos de negócios se beneficiam mais da engenharia de percepção?',
    answer:
      "Empresas com ofertas premium de alto valor que estão enfrentando resistência de preço, ciclos de vendas excessivos, ou taxas de conversão abaixo do esperado se beneficiam mais. Isso é particularmente eficaz para negócios cuja excelência técnica ou qualidade não está adequadamente refletida em seu posicionamento de mercado.",
  },
  {
    question: 'Quanto tempo leva para ver resultados?',
    answer:
      'Melhorias iniciais de percepção podem ser medidas dentro de 2-4 semanas de implementação. Impactos econômicos mais abrangentes tipicamente se tornam claramente mensuráveis dentro de 60-90 dias à medida que os novos sistemas de percepção se engajam completamente com seu mercado.',
  },
  {
    question: 'Vocês garantem resultados?',
    answer:
      "Embora métricas específicas variem por setor e modelo de negócio, ofereço uma garantia concreta de performance em todos os engajamentos premium: se não alcançarmos pelo menos 30% de melhoria em nossa métrica alvo principal dentro do prazo acordado, você recebe otimização adicional sem custo extra até atingirmos esse patamar.",
  },
];

export default function PortfolioCollaboration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    if (expandedFAQ === index) {
      setExpandedFAQ(null);
    } else {
      setExpandedFAQ(index);
    }
  };

  return (
    <section id="contact" ref={containerRef} className="bg-neutral-50 py-24">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-blue-600">
            Work Together
          </span>
          <h2 className="mb-4 mt-2 font-serif text-4xl text-neutral-900">Abordagem Colaborativa</h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            Minha abordagem enfatiza transparência, alinhamento estratégico e resultados mensuráveis.
            Aqui está como trabalharemos juntos para transformar sua percepção de mercado.
          </p>
        </motion.div>

        {/* Collaboration process */}
        <div className="mb-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {COLLABORATION_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative rounded-xl border border-neutral-200 bg-white p-8 shadow-sm"
              >
                <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-medium text-white">
                  {index + 1}
                </div>

                <div className="mb-4 inline-block rounded-lg bg-blue-50 p-3 text-blue-600">
                  {step.icon}
                </div>

                <h3 className="mb-3 text-xl font-medium text-neutral-900">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            <div className="bg-neutral-900 p-10 text-white md:p-12">
              <h3 className="mb-6 text-2xl font-medium text-white">
                Comece com uma Conversa Diagnóstica
              </h3>
              <p className="mb-8 text-neutral-300">
                Inicie com uma consulta focada para determinar se há uma lacuna significativa de
                percepção-valor impactando seus resultados de negócio.
              </p>

              <div className="mb-10 space-y-4">
                {[
                  'Avaliação inicial sem compromisso',
                  'Identificação específica de lacuna de percepção',
                  'Estimativa preliminar de impacto econômico',
                  'Abordagem de colaboração transparente',
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-3 mt-1 flex-shrink-0 rounded-full bg-green-500 p-1">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-neutral-200">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="mailto:contact@example.com"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
              >
                <Mail className="mr-2 h-5 w-5" />
                Schedule Consultation
              </a>
            </div>

            <div className="p-10 md:p-12">
              <h3 className="mb-6 text-2xl font-medium text-neutral-900">
                Perguntas Frequentes
              </h3>

              <div className="space-y-4">
                {FAQ_ITEMS.map((item, index) => (
                  <div key={index} className="overflow-hidden rounded-lg border border-neutral-200">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex w-full items-center justify-between p-4 text-left focus:outline-none"
                    >
                      <span className="font-medium text-neutral-900">{item.question}</span>
                      <ArrowRight
                        className={`h-5 w-5 text-neutral-500 transition-transform ${expandedFAQ === index ? 'rotate-90' : ''
                          }`}
                      />
                    </button>

                    {expandedFAQ === index && (
                      <div className="px-4 pb-4">
                        <p className="text-neutral-700">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="mb-4 text-2xl font-medium text-neutral-900">
            Pronto para Transformar sua Percepção de Mercado?
          </h3>
          <p className="mx-auto mb-8 max-w-xl text-neutral-600">
            Cada dia que seu valor não é adequadamente percebido representa uma perda financeira quantificável.
            Vamos corrigir esse desalinhamento.
          </p>

          <Link
            href="/diagnose"
            className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-4 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Comece com um Perception Snapshot™
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
