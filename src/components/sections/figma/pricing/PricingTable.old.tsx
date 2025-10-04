/**
 * Pricing Table Section - Service Plans Comparison
 * Professional pricing table with detailed comparison
 */
'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/primitives/Container/Container';
import { Check, Star, ArrowRight, Zap } from 'lucide-react';

export function PricingTable() {
  const plans = [
    {
      name: 'Setup Inicial',
      price: 'R$ 2.970',
      period: 'uma vez',
      description: 'Implementação completa da operação',
      featured: false,
      features: [
        'Landing page otimizada',
        'Configuração Google Ads',
        'Integração WhatsApp',
        'Analytics e tracking',
        'Treinamento inicial (2h)',
        'Suporte 30 dias',
      ],
      cta: 'Começar agora',
      color: 'border-gray-200',
    },
    {
      name: 'Retainer 6 meses',
      price: 'R$ 4.470',
      period: 'por mês',
      description: 'Gestão completa e otimização contínua',
      featured: true,
      features: [
        'Tudo do Setup Inicial',
        'Gestão de campanhas',
        'Otimização contínua',
        'Relatórios mensais',
        'Suporte prioritário',
        'Consultoria estratégica',
        'A/B testing constante',
        'ROI garantido',
      ],
      cta: 'Plano recomendado',
      color: 'border-blue-500 ring-2 ring-blue-500',
    },
    {
      name: 'Consultoria Pontual',
      price: 'R$ 597',
      period: 'por sessão',
      description: 'Diagnóstico e estratégia personalizada',
      featured: false,
      features: [
        'Auditoria completa',
        'Análise de concorrência',
        'Plano estratégico',
        'Relatório detalhado',
        'Sessão de 90min',
        'Gravação da sessão',
      ],
      cta: 'Agendar consultoria',
      color: 'border-gray-200',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container size="xl" className="max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <Badge className="mb-6 border-green-200 bg-green-50 px-4 py-2 text-green-700">💰 Investimento</Badge>

                    <h2 className="font-arsenal mb-6 text-4xl font-normal uppercase leading-tight text-neutral-900 sm:text-5xl">
            Planos e Preços
          </h2>

                    <p className="font-barlow mx-auto max-w-2xl text-lg leading-relaxed text-neutral-600">
            Escolha o plano ideal para transformar seu negócio com nossa metodologia comprovada.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative transition-all duration-300 hover:shadow-xl ${plan.color} ${
                plan.featured ? 'z-10 scale-105 shadow-2xl' : 'shadow-lg'
              }`}
            >
              {/* Featured Badge */}
              {plan.featured && (
                <div className="absolute left-1/2 top-[-1rem] -translate-x-1/2 transform">
                  <Badge className="bg-blue-600 px-4 py-2 text-white shadow-lg">
                    <Star className="mr-1 h-4 w-4" />
                    Mais popular
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4 text-center">
                <h3 className="font-arsenal mb-2 text-xl font-semibold uppercase text-neutral-900">{plan.name}</h3>
                <p className="font-barlow mb-4 text-sm text-neutral-600">{plan.description}</p>

                {/* Price */}
                <div className="mb-4">
                  <span className="font-arsenal text-4xl font-bold text-neutral-900">{plan.price}</span>
                  <span className="font-barlow ml-2 text-neutral-600">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                {/* Features List */}
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check
                        className={`mt-0.5 h-5 w-5 flex-shrink-0 ${plan.featured ? 'text-arco-600' : 'text-green-600'}`}
                      />
                      <span className="font-barlow text-sm text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`font-barlow w-full py-3 ${
                    plan.featured
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}
                >
                  {plan.cta}
                  {plan.featured ? <Zap className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="font-barlow mb-6 text-neutral-600">Não tem certeza qual plano escolher? Fale conosco.</p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="outline" className="font-barlow">
              Comparar planos
            </Button>
            <Button className="font-barlow bg-green-600 text-white hover:bg-green-700">
              Falar com consultor
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
