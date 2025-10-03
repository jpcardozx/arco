/**
 * Data Evidence Section - Transparency with Precise Data
 * Shows data transparency and statistical validation
 */
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/primitives/Container/Container';
import { BarChart3, Download, FileText, TrendingUp, Users, Target } from 'lucide-react';

const tokens = {
  colors: { primary: 'blue-600', text: 'gray-900', textMuted: 'gray-600', surface: 'gray-50' },
  spacing: { section: 'py-16 sm:py-20 lg:py-28', container: 'max-w-7xl', containerMd: 'max-w-6xl' },
  typography: { section: 'text-4xl sm:text-5xl font-normal uppercase leading-tight', body: 'text-lg leading-relaxed' }
};

export function DataEvidence() {
  const dataPoints = [
    {
      icon: BarChart3,
      label: 'Período de análise',
      value: 'agosto–setembro 2025',
      description: '2 meses completos de dados'
    },
    {
      icon: Users,
      label: 'Base amostral',
      value: '6 contas diferentes',
      description: 'Setores diversificados'
    },
    {
      icon: Target,
      label: 'Margem de erro',
      value: 'estatisticamente validada',
      description: 'Metodologia rigorosa'
    }
  ];

  const results = [
    {
      metric: '+347%',
      label: 'Aumento médio de leads',
      sublabel: 'Primeiros 60 dias'
    },
    {
      metric: '92%',
      label: 'Taxa de conversão',
      sublabel: 'Lead para orçamento'
    },
    {
      metric: 'R$ 4.20',
      label: 'CPA médio',
      sublabel: 'Custo por aquisição'
    },
    {
      metric: '780%',
      label: 'ROI médio',
      sublabel: 'Retorno do investimento'
    }
  ];

  return (
    <section className={`bg-${tokens.colors.surface} ${tokens.spacing.section}`}>
      <Container size="xl" className={tokens.spacing.container}>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-6 bg-purple-50 text-purple-700 border-purple-200 px-4 py-2">
                📊 Evidências
              </Badge>
              
              <h2 className={`${tokens.typography.section} mb-6 text-${tokens.colors.text} font-arsenal`}>
                Transparência total com dados precisos e períodos específicos
              </h2>
              
              <p className={`${tokens.typography.body} text-${tokens.colors.textMuted} font-barlow mb-8`}>
                Análise rigorosa com base em amostras representativas. 
                Todos os dados são auditáveis e estatisticamente validados.
              </p>
            </div>

            {/* Data Points */}
            <div className="space-y-6">
              {dataPoints.map((point, index) => {
                const Icon = point.icon;
                
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-900 mb-1 font-barlow">{point.label}:</h4>
                      <p className="text-lg font-medium text-purple-700 mb-1 font-arsenal">{point.value}</p>
                      <p className="text-sm text-neutral-600 font-barlow">{point.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-barlow">
                <Download className="w-4 h-4 mr-2" />
                Baixar relatório
              </Button>
              
              <Button variant="outline" className="font-barlow">
                <FileText className="w-4 h-4 mr-2" />
                Ver metodologia
              </Button>
            </div>
          </div>

          {/* Right - Results Grid */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-2 font-arsenal uppercase">
                Resultados Comprovados
              </h3>
              <p className="text-neutral-600 font-barlow">
                Métricas reais de performance das campanhas analisadas
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {results.map((result, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2 font-arsenal">
                      {result.metric}
                    </div>
                    <h4 className="font-semibold text-neutral-900 mb-1 font-barlow">
                      {result.label}
                    </h4>
                    <p className="text-sm text-neutral-600 font-barlow">
                      {result.sublabel}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Info */}
            <Card className="border-0 shadow-sm bg-purple-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-2 font-barlow">
                      Metodologia Validada
                    </h4>
                    <p className="text-sm text-purple-800 font-barlow leading-relaxed">
                      Análise conduzida seguindo padrões científicos de amostragem e 
                      validação estatística. Todos os resultados são reproduzíveis e auditáveis.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </Container>
    </section>
  );
}