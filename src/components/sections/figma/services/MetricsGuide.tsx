/**
 * MetricsGuide - Metas-guia por segmento
 * Design sofisticado com visualizações e animações
 */

import { TrendingUp, DollarSign, Target, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/primitives/Container/Container';

export function MetricsGuide() {
  const segments = [
    {
      category: 'Emergências Casa',
      title: 'CPQL alvo entre R$18 e R$32',
      description: 'Estratégias específicas para serviços de emergência residencial',
      metrics: [
        { label: 'Taxa de conversão alvo', value: '15-25%', trend: 'up' },
        { label: 'Tempo de resposta', value: '< 2h', trend: 'up' },
        { label: 'Ticket médio', value: 'R$ 450-850', trend: 'up' },
      ],
      gradient: 'from-red-500/10 via-orange-500/5 to-yellow-500/10',
      progressGradient: 'from-red-500/30 via-orange-500/20 to-yellow-500/30',
      accentColor: 'text-red-500',
      borderColor: 'border-red-200',
      bgOverlay: 'bg-red-50/50',
    },
    {
      category: 'Auto Rápido',
      title: 'CPQL alvo entre R$20 e R$35',
      description: 'Estratégias específicas para cada segmento automotivo',
      metrics: [
        { label: 'Taxa de conversão alvo', value: '12-20%', trend: 'up' },
        { label: 'Tempo de resposta', value: '< 4h', trend: 'up' },
        { label: 'Ticket médio', value: 'R$ 380-750', trend: 'up' },
      ],
      gradient: 'from-blue-500/10 via-cyan-500/5 to-teal-500/10',
      progressGradient: 'from-blue-500/30 via-cyan-500/20 to-teal-500/30',
      accentColor: 'text-arco-500',
      borderColor: 'border-blue-200',
      bgOverlay: 'bg-blue-50/50',
    },
    {
      category: 'Potencial Ajustado',
      title: 'Ajustes de estratégia',
      description: 'Adaptação contínua para máxima performance',
      metrics: [
        { label: 'ROI esperado', value: '300-500%', trend: 'up' },
        { label: 'Payback', value: '2-4 meses', trend: 'up' },
        { label: 'Crescimento mensal', value: '25-40%', trend: 'up' },
      ],
      gradient: 'from-purple-500/10 via-violet-500/5 to-indigo-500/10',
      progressGradient: 'from-purple-500/30 via-violet-500/20 to-indigo-500/30',
      accentColor: 'text-purple-500',
      borderColor: 'border-purple-200',
      bgOverlay: 'bg-purple-50/50',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-24">
      <Container>
        <div className="space-y-16">
          {/* Header */}
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <Badge variant="outline" className="border-slate-300 bg-white/80 font-barlow text-slate-700 backdrop-blur-sm">
              Métricas
            </Badge>

            <div className="space-y-4">
              <h2 className="font-arsenal text-5xl font-normal uppercase leading-tight text-slate-900 lg:text-6xl">
                Metas-guia por segmento
              </h2>
              <p className="font-barlow text-xl leading-relaxed text-slate-600">
                Indicadores precisos e específicos para diferentes tipos de negócio local
              </p>
            </div>
          </div>

          {/* Segments Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {segments.map((segment, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden border-2 bg-gradient-to-br backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-opacity-60 hover:shadow-xl ${segment.gradient} ${segment.borderColor}`}
              >
                {/* Background overlay */}
                <div
                  className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${segment.bgOverlay}`}
                />

                <CardHeader className="relative z-10 space-y-4 pb-4">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={`font-barlow font-medium backdrop-blur-sm ${segment.borderColor} ${segment.accentColor} bg-white/60`}
                    >
                      {segment.category}
                    </Badge>
                    <div className="rounded-full bg-white/60 p-2 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Target className={`h-5 w-5 ${segment.accentColor}`} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <CardTitle
                      className={`font-arsenal text-2xl font-normal uppercase leading-tight ${segment.accentColor}`}
                    >
                      {segment.title}
                    </CardTitle>
                    <CardDescription className="font-barlow text-base leading-relaxed text-slate-700">
                      {segment.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 space-y-6">
                  {/* Metrics */}
                  <div className="space-y-4">
                    {segment.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="group/metric">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-barlow text-sm font-medium text-slate-600">{metric.label}</span>
                          <div className="flex items-center gap-1">
                            <TrendingUp className={`h-3 w-3 opacity-60 ${segment.accentColor}`} />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`font-arsenal text-xl font-normal uppercase ${segment.accentColor}`}>
                            {metric.value}
                          </span>
                        </div>
                        {metricIndex < segment.metrics.length - 1 && (
                          <div className="mt-3 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="outline"
                    className={`font-barlow group/btn w-full font-medium transition-all duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white ${segment.borderColor}`}
                  >
                    Ver detalhes
                    <BarChart3 className="ml-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                  </Button>
                </CardContent>

                {/* Progress indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1">
                  <div
                    className={`h-full bg-gradient-to-r opacity-60 transition-opacity duration-300 group-hover:opacity-100 ${segment.progressGradient}`}
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom section with additional info */}
          <div className="space-y-8 border-t border-slate-200 pt-8 text-center">
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
              <div className="space-y-2">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <DollarSign className="h-6 w-6 text-slate-600" />
                </div>
                <div className="font-arsenal text-xl font-normal uppercase text-slate-900">ROI Garantido</div>
                <p className="font-barlow text-sm text-slate-600">Métricas objetivas e transparentes</p>
              </div>

              <div className="space-y-2">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Target className="h-6 w-6 text-slate-600" />
                </div>
                <div className="font-arsenal text-xl font-normal uppercase text-slate-900">Segmentação</div>
                <p className="font-barlow text-sm text-slate-600">Estratégias específicas por nicho</p>
              </div>

              <div className="space-y-2">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <TrendingUp className="h-6 w-6 text-slate-600" />
                </div>
                <div className="font-arsenal text-xl font-normal uppercase text-slate-900">Otimização</div>
                <p className="font-barlow text-sm text-slate-600">Ajustes contínuos de performance</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
