/**
 * PROFESSIONAL JOURNEY COMPONENTS
 * Visual progression through sales funnel
 * Reduces repetition by showing user's journey progress
 */
'use client';

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/primitives/Container/Container'
import { 
  Search, 
  FileText, 
  Users, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Star,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react'

// ============================================================================
// JOURNEY PROGRESS - Shows where user is in the funnel
// ============================================================================

interface JourneyProgressProps {
  currentStep: 'awareness' | 'consideration' | 'evaluation' | 'decision';
  showNextStep?: boolean;
}

export function JourneyProgress({ currentStep, showNextStep = true }: JourneyProgressProps) {
  const steps = [
    {
      id: 'awareness',
      label: 'Descoberta',
      description: 'Entendendo o problema',
      icon: Search,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'consideration', 
      label: 'Avaliação',
      description: 'Explorando soluções',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'evaluation',
      label: 'Comparação', 
      description: 'Analisando opções',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'decision',
      label: 'Decisão',
      description: 'Pronto para agir',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  const currentIndex = steps.findIndex(step => step.id === currentStep);
  const nextStep = steps[currentIndex + 1];

  return (
    <div className="py-8 bg-gray-50">
      <Container>
        <div className="max-w-4xl mx-auto">
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index <= currentIndex;
              const isCurrent = step.id === currentStep;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all
                    ${isCurrent 
                      ? `${step.color} ${step.bgColor} border-current shadow-md` 
                      : isActive 
                        ? 'text-gray-600 bg-gray-100 border-gray-300'
                        : 'text-gray-400 bg-white border-gray-200'
                    }
                  `}>
                    {isActive && !isCurrent ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <StepIcon className="w-6 h-6" />
                    )}
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`
                      w-16 h-0.5 mx-4
                      ${index < currentIndex ? 'bg-gray-300' : 'bg-gray-200'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Current Step Info */}
          <div className="text-center">
            <Badge variant="outline" className="mb-2">
              Etapa {currentIndex + 1} de {steps.length}
            </Badge>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {steps[currentIndex].label}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {steps[currentIndex].description}
            </p>

            {/* Next Step Preview */}
            {showNextStep && nextStep && (
              <div className="bg-white rounded-lg p-4 border border-gray-200 inline-block">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-500">Próximo:</span>
                  <div className="flex items-center gap-2">
                    <nextStep.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{nextStep.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

// ============================================================================
// TRUST SIGNALS - Professional credibility indicators
// ============================================================================

interface TrustSignalsProps {
  variant?: 'minimal' | 'detailed' | 'inline';
  showAll?: boolean;
}

export function TrustSignals({ variant = 'minimal', showAll = false }: TrustSignalsProps) {
  const signals = [
    {
      icon: Star,
      label: '4.9/5 Avaliação',
      value: '47+ clientes',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: TrendingUp,
      label: '+200% Crescimento',
      value: 'Média comprovada',
      color: 'text-green-600', 
      bgColor: 'bg-green-50'
    },
    {
      icon: Clock,
      label: '6 Anos',
      value: 'Experiência',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Shield,
      label: '100% Satisfação',
      value: 'Garantia total',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  if (variant === 'inline') {
    return (
      <div className="flex items-center justify-center gap-6 py-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
          <span>4.9/5 • 47+ clientes</span>
        </div>
        <div className="w-px h-4 bg-gray-300" />
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span>+200% crescimento médio</span>
        </div>
        <div className="w-px h-4 bg-gray-300" />
        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4 text-purple-600" />
          <span>100% satisfação</span>
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <section className="py-12 bg-white">
        <Container>
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">Credibilidade</Badge>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Números que Comprovam Nossa Excelência
            </h3>
            <p className="text-gray-600">
              Transparência total em todos os nossos resultados
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {signals.map((signal, idx) => {
              const SignalIcon = signal.icon;
              return (
                <Card key={idx} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className={`
                      inline-flex items-center justify-center w-12 h-12 rounded-full mb-4
                      ${signal.bgColor}
                    `}>
                      <SignalIcon className={`w-6 h-6 ${signal.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {signal.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {signal.value}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>
    );
  }

  // Minimal variant
  return (
    <div className="py-6 border-t border-b border-gray-200 bg-gray-50">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {signals.slice(0, showAll ? 4 : 2).map((signal, idx) => {
            const SignalIcon = signal.icon;
            return (
              <div key={idx} className="flex items-center justify-center gap-2">
                <SignalIcon className={`w-5 h-5 ${signal.color}`} />
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">{signal.label}</div>
                  <div className="text-gray-600">{signal.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

// ============================================================================
// VALUE PROPOSITION LADDER - Progressive value revelation
// ============================================================================

interface ValueLadderProps {
  level: 'basic' | 'intermediate' | 'advanced';
  context: string;
}

export function ValueLadder({ level, context }: ValueLadderProps) {
  const valueByLevel = {
    basic: {
      title: 'Mais Leads Qualificados',
      points: [
        'Sistema que funciona 24/7',
        'Leads com maior intenção de compra', 
        'Redução do custo por lead'
      ],
      cta: 'Ver Como Funciona'
    },
    intermediate: {
      title: 'Operação Escalável e Lucrativa',
      points: [
        'Processo documentado e replicável',
        'Time especializado dedicado',
        'Métricas e otimização contínua',
        'ROI positivo em 30 dias'
      ],
      cta: 'Entender a Metodologia'
    },
    advanced: {
      title: 'Crescimento Sustentável e Previsível',
      points: [
        'Múltiplos canais sincronizados',
        'Automação inteligente de nutrição',
        'Dashboard executivo em tempo real',
        'Estratégia de expansão territorial',
        'Suporte técnico especializado'
      ],
      cta: 'Agendar Consultoria Estratégica'
    }
  };

  const value = valueByLevel[level];

  return (
    <section className="py-16">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Level Indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              {['basic', 'intermediate', 'advanced'].map((lvl, idx) => (
                <div key={lvl} className={`
                  w-3 h-3 rounded-full transition-all
                  ${lvl === level 
                    ? 'bg-blue-600 scale-125' 
                    : idx < ['basic', 'intermediate', 'advanced'].indexOf(level)
                      ? 'bg-blue-300'
                      : 'bg-gray-200'
                  }
                `} />
              ))}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {value.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {value.points.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 text-left">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{point}</span>
              </div>
            ))}
          </div>

          <Button size="lg">
            {value.cta}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          {level !== 'advanced' && (
            <p className="text-sm text-gray-500 mt-4">
              Quer ver mais detalhes? Continue explorando...
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

// Components are already exported inline above