/**
 * Figma Pillars Section - Three Strategic Pillars
 * Web, Traffic, Operation strategy
 */
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/primitives/Container/Container';
import { ArrowRight, Globe, Target, Users } from 'lucide-react';

export function FigmaPillars() {
  const pillars = [
    {
      icon: Globe,
      badge: 'Web',
      title: 'Captação inteligente',
      description: 'Landing pages modulares com análise de conversão em tempo real.',
      features: ['Design responsivo otimizado', 'Formulários de alta conversão', 'Integração com WhatsApp'],
      color: 'from-arco-600 to-arco-800',
    },
    {
      icon: Target,
      badge: 'Tráfego',
      title: 'Intenção qualificada',
      description: 'Tráfego pago segmentado com orçamento inteligente por região.',
      features: ['Google Ads otimizado', 'Segmentação geográfica', 'Ajuste automático de orçamento'],
      color: 'from-success-600 to-success-800',
    },
    {
      icon: Users,
      badge: 'Operação',
      title: 'Atendimento eficiente',
      description: 'SLA menor que 3 minutos e redução significativa de no-shows.',
      features: ['Chatbot qualificador', 'Scripts de atendimento', 'Follow-up automatizado'],
      color: 'from-arco-500 to-arco-700',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-arco-50 via-white to-arco-100/30 py-16 sm:py-20 lg:py-28">
      <Container size="xl" className="max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <Badge className="mb-6 border-arco-200 bg-arco-100 px-4 py-2 text-arco-700">🎨 Metodologia</Badge>

          <h2 className="font-arsenal mb-6 text-4xl font-normal uppercase leading-tight text-arco-900 sm:text-5xl">
            Como trabalhamos
          </h2>

          <p className="font-barlow mx-auto max-w-2xl text-lg leading-relaxed text-arco-600">
            Três pilares estratégicos testados em mais de 200 projetos para maximizar suas conversões.
          </p>

          {/* Visual separator */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-0.5 w-8 bg-gradient-to-r from-transparent to-arco-300" />
            <div className="h-2 w-2 rounded-full bg-arco-400" />
            <div className="h-0.5 w-8 bg-gradient-to-l from-transparent to-arco-300" />
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <Card
                key={index}
                className="group relative overflow-hidden rounded-2xl border-arco-200/30 bg-white/50 backdrop-blur-sm transition-all duration-500 hover:border-arco-300/60 hover:shadow-glass"
              >
                <CardHeader className="relative z-10 pb-4 text-center">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-5 transition-opacity duration-500 group-hover:opacity-10`}
                  />

                  {/* Badge */}
                  <Badge className="mx-auto mb-4 border-arco-200 bg-arco-100 text-arco-700">{pillar.badge}</Badge>

                  {/* Icon */}
                  <div className="relative mx-auto mb-6">
                    <div
                      className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.color} transition-transform duration-500 group-hover:scale-110`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <CardTitle className="font-arsenal text-xl font-bold text-arco-900">{pillar.title}</CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 pt-0 text-center">
                  {/* Description */}
                  <p className="font-barlow mb-6 leading-relaxed text-arco-600">{pillar.description}</p>

                  {/* Features List */}
                  <div className="mb-6 space-y-3">
                    {pillar.features.map((feature, idx) => (
                      <div key={idx} className="font-barlow flex items-center gap-3 text-sm text-arco-700">
                        <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-arco-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button variant="outline" size="sm" className="group/btn w-full border-arco-200 text-arco-700 hover:bg-arco-50">
                    Saiba mais
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="font-barlow mb-6 text-arco-600">Pronto para implementar esses pilares no seu negócio?</p>
          <Button size="lg" className="group rounded-xl bg-arco-600 px-8 py-3 text-white hover:bg-arco-700">
            Começar Agora
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Container>
    </section>
  );
}