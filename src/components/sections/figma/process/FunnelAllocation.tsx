/**
 * Funnel Allocation Section - Traffic Strategy by Funnel Stage
 * Shows strategic traffic allocation across funnel stages
 */
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/primitives/Container/Container';
import { TrendingUp, Target, Users, ArrowDown, DollarSign, Zap } from 'lucide-react';

export function FunnelAllocation() {
  const funnelStages = [
    {
      stage: 'Bottom Funnel',
      allocation: '60-85%',
      description: 'Foco máximo em alta intenção',
      icon: Target,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      examples: ['Palavras-chave transacionais', 'Remarketing de carrinho', 'Anúncios de produto'],
    },
    {
      stage: 'Middle Funnel',
      allocation: '15-30%',
      description: 'Nutrição e consideração',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      examples: ['Conteúdo educativo', 'Comparações', 'Reviews e depoimentos'],
    },
    {
      stage: 'Top Funnel',
      allocation: '0-10%',
      description: 'Consciência mínima',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-arco-700',
      examples: ['Brand awareness', 'Conteúdo viral', 'Interesse geral'],
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container size="xl" className="max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-4 border-arco-200 bg-arco-50 text-arco-700">📊 Estratégia de Funil</Badge>

                            <h2 className="font-arsenal mb-6 text-4xl font-normal uppercase leading-tight text-neutral-900 sm:text-5xl">
                Alocação
                <br />
                Inteligente
              </h2>

                            <p className="font-barlow text-lg leading-relaxed text-neutral-600">
                Distribuição estratégica do orçamento para maximizar ROI em cada etapa do funil.
              </p>
            </div>

            {/* Key Principles */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                  <div className="h-2 w-2 rounded-full bg-green-600" />
                </div>
                <div>
                                    <h4 className="font-barlow font-medium text-neutral-900">Máxima eficiência</h4>
                  <p className="font-barlow text-sm text-neutral-600">Foco em alta intenção de compra</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                  <DollarSign className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-barlow font-medium text-neutral-900">ROI otimizado</h4>
                  <p className="font-barlow text-sm text-neutral-600">Cada real investido com propósito</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-barlow font-medium text-neutral-900">Conversão acelerada</h4>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                  <div className="h-2 w-2 rounded-full bg-orange-600" />
                </div>
                <div>
                  <h4 className="font-barlow font-medium text-gray-900">ROI otimizado</h4>
                  <p className="font-barlow text-sm text-gray-600">Cada real investido com propósito</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                </div>
                <div>
                  <h4 className="font-barlow font-medium text-neutral-900">Conversão acelerada</h4>
                  <p className="font-barlow text-sm text-neutral-600">Jornada otimizada para fechamento</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Funnel Visualization */}
          <div className="space-y-4">
            {funnelStages.map((stage, index) => {
              const Icon = stage.icon;

              return (
                <div key={index} className="relative">
                  {/* Connecting Arrow */}
                  {index < funnelStages.length - 1 && (
                    <div className="absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 transform">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 bg-white">
                        <ArrowDown className="h-4 w-4 text-neutral-400" />
                      </div>
                    </div>
                  )}

                  <Card className={`${stage.bgColor} border-0 shadow-sm transition-shadow hover:shadow-md`}>
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${stage.color}`}
                          >
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className={`font-barlow font-semibold ${stage.textColor}`}>{stage.stage}</h3>
                            <p className="font-barlow text-sm text-neutral-600">{stage.description}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className={`font-arsenal text-2xl font-bold ${stage.textColor}`}>{stage.allocation}</div>
                          <div className="font-barlow text-xs text-gray-500">do esforço</div>
                        </div>
                      </div>

                      {/* Examples */}
                      <div className="space-y-2">
                        <h4 className="font-barlow text-sm font-medium text-gray-800">Exemplos:</h4>
                        <div className="flex flex-wrap gap-2">
                          {stage.examples.map((example, idx) => (
                            <span key={idx} className="font-barlow rounded-full bg-white/60 px-2 py-1 text-xs text-gray-700">
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
