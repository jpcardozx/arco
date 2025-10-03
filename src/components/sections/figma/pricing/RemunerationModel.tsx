/**
 * RemunerationModel - Modelo de remuneração transparente
 * Design premium com elementos visuais sofisticados
 */

import { Calculator, Shield, TrendingUp, Percent, DollarSign, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/primitives/Container/Container';

export function RemunerationModel() {
  const features = [
    {
      icon: Percent,
      title: 'Estrutura de comissão',
      description: 'Percentual flexível entre 8% e 15% calculado sobre o lucro incremental estimado (LIE).',
      highlight: '8% - 15%',
      color: 'text-arco-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      icon: Calculator,
      title: 'Método de cálculo',
      description: 'Cálculo preciso que considera métricas objetivas e resultados comprovados.',
      highlight: 'Transparente',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      icon: BarChart3,
      title: 'Franquia de margem',
      description: 'Mecanismo que protege ambas as partes e incentiva performance sustentável.',
      highlight: 'Proteção',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      icon: Shield,
      title: 'Limites definidos',
      description: 'Teto máximo de 1,8 vezes o valor do pró-labore para garantir alinhamento.',
      highlight: '1,8x máximo',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-24">
      <Container>
        <div className="space-y-16">
          {/* Header */}
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <Badge variant="outline" className="border-slate-300 bg-white/80 font-barlow text-slate-700 backdrop-blur-sm">
              Transparência
            </Badge>

            <div className="space-y-4">
              <h2 className="font-arsenal text-5xl font-normal uppercase leading-tight text-slate-900 lg:text-6xl">
                Modelo de remuneração
                <span className="block text-slate-600">claro e justo</span>
              </h2>
              <p className="font-barlow text-xl leading-relaxed text-slate-600">
                Compreenda como calculamos nossa remuneração baseada em resultados reais e mensuráveis
              </p>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Features */}
            <div className="space-y-6 lg:col-span-5">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`group relative overflow-hidden border-2 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-opacity-60 hover:shadow-lg ${feature.borderColor}`}
                >
                  <CardHeader className="space-y-3 pb-3">
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-xl p-3 transition-transform duration-300 group-hover:scale-110 ${feature.bgColor}`}
                      >
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="font-arsenal text-xl font-normal uppercase text-slate-900">
                          {feature.title}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className={`font-barlow mt-1 text-xs ${feature.borderColor} ${feature.bgColor} ${feature.color}`}
                        >
                          {feature.highlight}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="font-barlow leading-relaxed text-slate-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Visual element */}
            <div className="flex justify-center lg:col-span-2">
              <div className="h-64 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
            </div>

            {/* Calculation example */}
            <div className="lg:col-span-5">
              <Card className="relative overflow-hidden border-2 border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50">
                <CardHeader className="space-y-4 pb-6 text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white">
                    <DollarSign className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="font-arsenal text-2xl font-normal uppercase text-slate-900">
                      Exemplo de cálculo
                    </CardTitle>
                    <CardDescription className="font-barlow text-slate-600">Cenário real de um prestador local</CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Calculation steps */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <span className="font-barlow text-sm text-slate-600">Faturamento anterior</span>
                      <span className="font-arsenal text-lg font-normal text-slate-900">R$ 12.000</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4">
                      <span className="font-barlow text-sm text-slate-600">Faturamento atual</span>
                      <span className="font-arsenal text-lg font-normal text-green-700">R$ 42.000</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-4">
                      <span className="font-barlow text-sm text-slate-600">Lucro incremental (LIE)</span>
                      <span className="font-arsenal text-lg font-normal text-arco-700">R$ 30.000</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-purple-200 bg-purple-50 p-4">
                      <span className="font-barlow text-sm text-slate-600">Nossa remuneração (12%)</span>
                      <span className="font-arsenal text-xl font-normal text-purple-700">R$ 3.600</span>
                    </div>
                  </div>

                  {/* Result highlight */}
                  <div className="rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-center text-white">
                    <div className="space-y-2">
                      <div className="font-barlow text-sm opacity-80">Seu lucro líquido</div>
                      <div className="font-arsenal text-3xl font-normal">R$ 26.400</div>
                      <div className="font-barlow text-sm opacity-80">+120% de crescimento</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="space-y-6 border-t border-slate-200 pt-8 text-center">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="font-barlow group font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-slate-800 bg-slate-900"
              >
                Entender modelo completo
                <Calculator className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="font-barlow border-slate-300 font-medium text-slate-700 hover:bg-slate-50"
              >
                Calcular meu caso
              </Button>
            </div>

            <p className="font-barlow mx-auto max-w-2xl text-sm text-slate-500">
              Todos os cálculos são baseados em métricas verificáveis e auditáveis. Transparência total em todos os processos.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
