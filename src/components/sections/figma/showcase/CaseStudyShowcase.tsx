/**
 * import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Users, Target, Zap } from 'lucide-react';StudyShowcase - Seção de estudos de caso premium
 * Design premium com before/after e métricas detalhadas
 */
'use client';

import { useState } from 'react';
import {
  TrendingUp,
  ArrowRight,
  Calendar,
  MapPin,
  DollarSign,
  Target,
  BarChart3,
  Users,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/primitives/Container/Container';

export function CaseStudyShowcase() {
  const [selectedCase, setSelectedCase] = useState(0);

  const cases = [
    {
      id: 'emergencia-casa',
      category: 'Emergências Casa',
      client: 'HidroFix Emergências',
      location: 'São Paulo, SP',
      duration: '6 meses',
      image: 'https://placehold.co/600x400',
      challenge: 'Baixa qualidade de leads e alto CPQL. Campanhas dispersas sem foco estratégico.',
      solution:
        'Implementação de funil específico para emergências com landing pages otimizadas para urgência e campanhas de busca com palavras-chave de alta intenção.',
      beforeAfter: {
        before: {
          leads: '45/mês',
          cpql: 'R$ 67',
          conversion: '8.2%',
          revenue: 'R$ 18.500',
        },
        after: {
          leads: '156/mês',
          cpql: 'R$ 24',
          conversion: '22.8%',
          revenue: 'R$ 67.200',
        },
      },
      metrics: [
        { label: 'Aumento em leads', value: '+247%', color: 'text-green-600' },
        { label: 'Redução CPQL', value: '-64%', color: 'text-arco-600' },
        { label: 'Melhoria conversão', value: '+178%', color: 'text-purple-600' },
        { label: 'Crescimento receita', value: '+263%', color: 'text-orange-600' },
      ],
      testimonial: {
        text: 'Em 6 meses, a ARCO transformou completamente nosso negócio. Saímos de poucos leads caros para uma operação escalável e lucrativa.',
        author: 'Roberto Silva',
        role: 'Fundador, HidroFix',
      },
    },
    {
      id: 'auto-rapido',
      category: 'Auto Rápido',
      client: 'TechCar Express',
      location: 'Rio de Janeiro, RJ',
      duration: '4 meses',
      image: 'https://placehold.co/600x400',
      challenge: 'Concorrência alta e dificuldade para se destacar no mercado automotivo local.',
      solution:
        'Estratégia de nicho com foco em serviços expressos, campanhas segmentadas por urgência e landing pages com social proof específico do setor.',
      beforeAfter: {
        before: {
          leads: '28/mês',
          cpql: 'R$ 89',
          conversion: '6.5%',
          revenue: 'R$ 12.800',
        },
        after: {
          leads: '94/mês',
          cpql: 'R$ 31',
          conversion: '18.7%',
          revenue: 'R$ 44.200',
        },
      },
      metrics: [
        { label: 'Aumento em leads', value: '+236%', color: 'text-green-600' },
        { label: 'Redução CPQL', value: '-65%', color: 'text-arco-600' },
        { label: 'Melhoria conversão', value: '+188%', color: 'text-purple-600' },
        { label: 'Crescimento receita', value: '+245%', color: 'text-orange-600' },
      ],
      testimonial: {
        text: 'A ARCO entendeu perfeitamente nosso nicho. As campanhas são precisas e os resultados, consistentes mês após mês.',
        author: 'Carlos Mendes',
        role: 'Proprietário, TechCar',
      },
    },
    {
      id: 'casa-reformas',
      category: 'Casa & Reformas',
      client: 'Master Reformas',
      location: 'Belo Horizonte, MG',
      duration: '8 meses',
      image: 'https://placehold.co/600x400',
      challenge: 'Sazonalidade forte e dificuldade para manter leads qualificados durante todo o ano.',
      solution:
        'Estratégia multi-sazonal com campanhas adaptativas, remarketing inteligente e landing pages específicas por tipo de serviço.',
      beforeAfter: {
        before: {
          leads: '32/mês',
          cpql: 'R$ 112',
          conversion: '5.8%',
          revenue: 'R$ 24.600',
        },
        after: {
          leads: '127/mês',
          cpql: 'R$ 38',
          conversion: '19.4%',
          revenue: 'R$ 89.300',
        },
      },
      metrics: [
        { label: 'Aumento em leads', value: '+297%', color: 'text-green-600' },
        { label: 'Redução CPQL', value: '-66%', color: 'text-arco-600' },
        { label: 'Melhoria conversão', value: '+234%', color: 'text-purple-600' },
        { label: 'Crescimento receita', value: '+263%', color: 'text-orange-600' },
      ],
      testimonial: {
        text: 'Mesmo nos meses mais difíceis, a ARCO mantém nossos leads em alta. A estratégia se adapta às mudanças do mercado.',
        author: 'Ana Paula Costa',
        role: 'Diretora, Master Reformas',
      },
    },
  ];

  const currentCase = cases[selectedCase];

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-24">
      <Container>
        <div className="space-y-16">
          {/* Header */}
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <Badge variant="outline" className="border-slate-300 bg-white/80 font-barlow text-slate-700 backdrop-blur-sm">
              Casos de sucesso
            </Badge>

            <div className="space-y-4">
              <h2 className="font-arsenal text-5xl font-normal uppercase leading-tight text-slate-900 lg:text-6xl">
                Resultados reais de
                <span className="block text-slate-600">clientes reais</span>
              </h2>
              <p className="font-barlow text-xl leading-relaxed text-slate-600">
                Conheça as transformações que alcançamos para prestadores de serviços em diferentes segmentos
              </p>
            </div>
          </div>

          {/* Case selector */}
          <div className="flex flex-wrap justify-center gap-4">
            {cases.map((caseItem, index) => (
              <Button
                key={index}
                variant={selectedCase === index ? 'default' : 'outline'}
                onClick={() => setSelectedCase(index)}
                className="font-barlow font-medium"
              >
                {caseItem.category}
              </Button>
            ))}
          </div>

          {/* Selected case showcase */}
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Case image and info */}
            <div className="space-y-6">
              <Card className="overflow-hidden border-2 border-slate-200 bg-white/80 backdrop-blur-sm">
                <div className="relative">
                  <img src={currentCase.image} alt={currentCase.client} className="h-64 w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <Badge className="mb-2 border-white/30 bg-white/20 backdrop-blur-sm">{currentCase.category}</Badge>
                    <h3 className="font-arsenal text-xl font-normal uppercase">{currentCase.client}</h3>
                  </div>
                </div>

                <CardContent className="space-y-4 p-6">
                  <div className="font-barlow flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {currentCase.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {currentCase.duration}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-arsenal mb-2 text-lg font-normal uppercase text-slate-900">Desafio</h4>
                      <p className="font-barlow text-sm leading-relaxed text-slate-600">{currentCase.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-arsenal mb-2 text-lg font-normal uppercase text-slate-900">Solução</h4>
                      <p className="font-barlow text-sm leading-relaxed text-slate-600">{currentCase.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Before vs After */}
              <Card className="border-2 border-slate-200 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-arsenal text-2xl font-normal uppercase text-slate-900">
                    Antes vs Depois
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Before */}
                    <div className="space-y-4">
                      <h4 className="font-arsenal text-lg font-normal uppercase text-red-600">Antes</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-barlow text-sm text-slate-600">Leads/mês</span>
                          <span className="font-arsenal text-sm text-red-600">{currentCase.beforeAfter.before.leads}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-barlow text-sm text-slate-600">CPQL</span>
                          <span className="font-arsenal text-sm text-red-600">{currentCase.beforeAfter.before.cpql}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-barlow text-sm text-slate-600">Conversão</span>
                          <span className="font-arsenal text-sm text-red-600">
                            {currentCase.beforeAfter.before.conversion}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-barlow text-sm text-slate-600">Receita</span>
                          <span className="font-arsenal text-sm text-red-600">{currentCase.beforeAfter.before.revenue}</span>
                        </div>
                      </div>
                    </div>

                    {/* After */}
                    <div className="space-y-4">
                      <h4 className="font-arsenal text-lg font-normal uppercase text-green-600">Depois</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-barlow text-sm text-slate-600">Leads/mês</span>
                          <span className="font-arsenal text-sm text-green-600">{currentCase.beforeAfter.after.leads}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-barlow text-sm text-slate-600">CPQL</span>
                          <span className="font-arsenal text-sm text-green-600">{currentCase.beforeAfter.after.cpql}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-barlow text-sm text-slate-600">Conversão</span>
                          <span className="font-arsenal text-sm text-green-600">
                            {currentCase.beforeAfter.after.conversion}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-barlow text-sm text-slate-600">Receita</span>
                          <span className="font-arsenal text-sm text-green-600">{currentCase.beforeAfter.after.revenue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key metrics */}
              <div className="grid grid-cols-2 gap-4">
                {currentCase.metrics.map((metric, index) => (
                  <Card key={index} className="border-2 border-slate-200 bg-white/80 p-4 text-center backdrop-blur-sm">
                    <div className={`font-arsenal mb-1 text-2xl font-normal ${metric.color}`}>{metric.value}</div>
                    <div className="font-barlow text-xs text-slate-600">{metric.label}</div>
                  </Card>
                ))}
              </div>

              {/* Testimonial */}
              <Card className="border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="font-arsenal text-4xl text-slate-300">"</div>
                    <p className="font-barlow italic leading-relaxed text-slate-700">{currentCase.testimonial.text}</p>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-200" />
                      <div>
                        <div className="font-arsenal text-sm font-normal uppercase text-slate-900">
                          {currentCase.testimonial.author}
                        </div>
                        <div className="font-barlow text-xs text-slate-600">{currentCase.testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="space-y-6 border-t border-slate-200 pt-8 text-center">
            <div className="space-y-4">
              <h3 className="font-arsenal text-2xl font-normal uppercase text-slate-900">Quer resultados similares?</h3>
              <p className="font-barlow mx-auto max-w-2xl text-lg text-slate-600">
                Agende uma análise gratuita e descubra como podemos transformar seu negócio
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="font-barlow group font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-slate-800 bg-slate-900"
              >
                Quero minha análise gratuita
                <TrendingUp className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="font-barlow border-slate-300 font-medium text-slate-700 hover:bg-slate-50"
              >
                Ver mais casos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
