'use client';

export const dynamic = 'force-dynamic'

import { MainLayout } from '@/components/layout/MainLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CollapsibleSection } from '@/components/ui/collapsible-section';
import {
  Check,
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
  Gauge,
  Shield,
  Cpu
} from 'lucide-react';
import Link from 'next/link';

/**
 * Services Page - Transparência e clareza sobre capacidades e processo
 * Tom: Profissional, informativo, sem pressão de vendas
 */

const SERVICES = [
  {
    id: 'diagnostico',
    name: 'Diagnóstico Digital',
    description: 'Avaliação técnica inicial de seu ambiente digital',
    icon: Gauge,
    features: [
      'Análise de Core Web Vitals (LCP, FID, CLS)',
      'Auditoria técnica SEO',
      'Verificação de segurança (SSL, headers, vulnerabilidades)',
      'Relatório estruturado com priorização',
      'Sem vinculação ou obrigatoriedade'
    ],
    cta: 'Solicitar Análise',
    ctaHref: '/#roi-calculator',
    highlighted: false
  },
  {
    id: 'consultoria',
    name: 'Consultoria Estratégica',
    description: 'Sessão estruturada para identificar oportunidades',
    icon: Target,
    features: [
      'Análise aprofundada da operação digital',
      'Mapeamento de gargalos técnicos e comerciais',
      'Plano de ação priorizado por impacto',
      'Documentação da sessão para referência',
      'Suporte técnico por 7 dias após',
      'Garantia de satisfação 100%'
    ],
    cta: 'Agendar Consultoria',
    ctaHref: '/agendamentos',
    highlighted: true
  },
  {
    id: 'implementacao',
    name: 'Implementação Técnica',
    description: 'Desenvolvimento e execução de soluções customizadas',
    icon: Cpu,
    features: [
      'Desenvolvimento web (Next.js, React)',
      'Integração com sistemas e CRM',
      'Setup de infraestrutura e automações',
      'Configuração de analytics e tracking',
      'Treinamento da equipe interna',
      'Suporte técnico contínuo'
    ],
    cta: 'Solicitar Proposta',
    ctaHref: '/contato',
    highlighted: false
  }
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Diagnóstico',
    description: 'Análise completa da situação atual - identificação de gargalos e oportunidades',
    duration: '1-2 semanas'
  },
  {
    number: '02',
    title: 'Planejamento',
    description: 'Desenvolvimento de estratégia contextualizada com objetivos mensuráveis',
    duration: '1-2 semanas'
  },
  {
    number: '03',
    title: 'Execução',
    description: 'Implementação gradual com checkpoints e ajustes baseados em dados',
    duration: '4-12 semanas'
  },
  {
    number: '04',
    title: 'Otimização',
    description: 'Monitoramento contínuo e iterações para maximizar resultados',
    duration: 'Contínuo'
  }
];

export default function ServicesPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-teal-500/10 border-teal-500/30 text-teal-400">
              Serviços
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Serviços Digitais
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Três níveis de engajamento para diferentes necessidades. Escolha o ponto de entrada que 
              melhor se alinha com seu momento e objetivos.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {SERVICES.map((service) => (
              <Card
                key={service.id}
                className={`relative ${
                  service.highlighted
                    ? 'border-teal-500/50 bg-slate-800/50 shadow-lg shadow-teal-500/10'
                    : 'border-slate-700 bg-slate-800/30'
                }`}
              >
                {service.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-teal-500 text-white">Mais Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-white mb-2">
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={service.ctaHref} className="block">
                    <Button
                      className={`w-full ${
                        service.highlighted
                          ? 'bg-teal-500 hover:bg-teal-600 text-white'
                          : 'bg-slate-700 hover:bg-slate-600 text-white'
                      }`}
                    >
                      {service.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-orange-500/10 border-orange-500/30 text-orange-400">
                Metodologia
              </Badge>
              <h2 className="text-3xl font-bold text-white mb-4">
                Como Trabalhamos
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Processo estruturado e transparente, com foco em resultados mensuráveis
              </p>
            </div>

            <div className="space-y-6">
              {PROCESS_STEPS.map((step, idx) => (
                <Card
                  key={step.number}
                  className="border-slate-700 bg-slate-800/30 hover:border-slate-600 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
                          <span className="text-xl font-bold text-teal-400">
                            {step.number}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-white">
                            {step.title}
                          </h3>
                          <Badge variant="outline" className="text-slate-400 border-slate-600">
                            {step.duration}
                          </Badge>
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto border-teal-500/30 bg-slate-800/50">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Não tem certeza por onde começar?
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Comece com uma análise gratuita do seu site ou agende uma
                consultoria estratégica para entender suas oportunidades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#roi-calculator">
                  <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
                    <Zap className="w-5 h-5 mr-2" />
                    Análise Gratuita
                  </Button>
                </Link>
                <Link href="/agendamentos">
                  <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                    <Calendar className="w-5 h-5 mr-2" />
                    Agendar Consultoria
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
}
