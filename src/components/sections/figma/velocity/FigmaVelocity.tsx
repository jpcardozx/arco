/**
 * Figma Velocity Section - Speed & Performance Metrics
 * Showcases implementation speed and results
 */
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/primitives/Container/Container';
import { Clock, Zap, TrendingUp, Users, Target, Calendar } from 'lucide-react';

// Design tokens unificados
const tokens = {
  colors: { primary: 'blue-600', text: 'gray-900', textMuted: 'gray-600', surface: 'gray-50' },
  spacing: { section: 'py-16 sm:py-20 lg:py-28', container: 'max-w-7xl', containerMd: 'max-w-4xl' },
  typography: { section: 'text-4xl sm:text-5xl font-normal uppercase leading-tight', body: 'text-lg leading-relaxed' }
};

export function FigmaVelocity() {
  const metrics = [
    {
      icon: Clock,
      number: "7",
      unit: "dias",
      description: "Primeiros leads qualificados",
      detail: "Do setup à primeira conversão"
    },
    {
      icon: Zap,
      number: "< 3",
      unit: "min",
      description: "Tempo de resposta médio",
      detail: "SLA de atendimento garantido"
    },
    {
      icon: TrendingUp,
      number: "300%",
      unit: "ROI",
      description: "Retorno médio em 90 dias",
      detail: "Baseado em 200+ projetos"
    },
    {
      icon: Users,
      number: "85%",
      unit: "taxa",
      description: "Conversão lead → orçamento",
      detail: "Qualificação pré-atendimento"
    }
  ];

  const timeline = [
    {
      day: "Dia 1-2",
      title: "Setup Técnico",
      description: "Landing page + tracking configurado",
      status: "setup"
    },
    {
      day: "Dia 3-4", 
      title: "Campanhas Ativas",
      description: "Tráfego pago direcionado iniciado",
      status: "traffic"
    },
    {
      day: "Dia 5-7",
      title: "Primeiros Leads",
      description: "Leads qualificados chegando",
      status: "results"
    },
    {
      day: "Dia 8+",
      title: "Otimização",
      description: "Melhoria contínua dos resultados",
      status: "optimization"
    }
  ];

  return (
    <section className={`bg-white ${tokens.spacing.section}`}>
      <Container size="xl" className={tokens.spacing.container}>
        
        {/* Section Header */}
        <div className={`${tokens.spacing.containerMd} mx-auto text-center mb-16`}>
          <Badge variant="outline" className={`mb-4 border-${tokens.colors.primary.replace('600', '200')} text-${tokens.colors.primary.replace('600', '700')}`}>
            Velocidade
          </Badge>
          
          <h2 className={`${tokens.typography.section} mb-6 text-${tokens.colors.text} font-arsenal`}>
            Resultados em 7 dias
          </h2>
          
          <p className={`${tokens.typography.body} text-${tokens.colors.textMuted} font-barlow`}>
            Implementação rápida com métricas reais de performance para prestadores de serviços locais.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            
            return (
              <Card key={index} className="group text-center border-0 shadow-lg bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 w-16 h-16 mx-auto rounded-2xl bg-blue-500/20 blur-lg group-hover:blur-xl transition-all duration-300" />
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-arco-900 font-arsenal">
                      {metric.number}
                    </span>
                    <span className="text-lg text-arco-600 ml-1 font-barlow">
                      {metric.unit}
                    </span>
                  </div>
              
                  <h3 className="text-sm font-medium text-arco-900 mb-1 font-barlow">
                    {metric.description}
                  </h3>
                  
                  <p className="text-xs text-arco-500 font-barlow">
                    {metric.detail}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
                    <h3 className="text-2xl font-normal uppercase text-center mb-12 text-arco-900 font-arsenal">
            Cronograma de implementação
          </h3>
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Timeline connecting line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200" />
            
            {timeline.map((item, index) => (
              <div key={index} className="relative">
                
                <Card className="group relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1 z-10">
                  <CardContent className="p-6 text-center">
                    
                    {/* Day Badge */}
                    <div className="mb-4">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          item.status === 'setup' ? 'bg-arco-100 text-arco-700' :
                          item.status === 'traffic' ? 'bg-orange-100 text-orange-700' :
                          item.status === 'results' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {item.day}
                      </Badge>
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-lg font-medium text-gray-900 mb-2 font-barlow">
                      {item.title}
                    </h4>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-600 font-barlow">
                      {item.description}
                    </p>
                    
                    {/* Status Icon */}
                    <div className="mt-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      {item.status === 'setup' && <Target className="w-4 h-4 text-arco-600" />}
                      {item.status === 'traffic' && <Zap className="w-4 h-4 text-orange-600" />}
                      {item.status === 'results' && <TrendingUp className="w-4 h-4 text-green-600" />}
                      {item.status === 'optimization' && <Calendar className="w-4 h-4 text-purple-600" />}
                    </div>
                    
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-barlow">
            Quero começar hoje
          </Button>
          <p className="text-sm text-arco-500 mt-3 font-barlow">
            Setup completo em menos de 48h
          </p>
        </div>

      </Container>
    </section>
  );
}