/**
 * ImplementationProcess - Processo de implementação
 * Design refinado com timeline visual e animações
 */

import { Rocket, CheckCircle, Clock, ArrowRight, Zap, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/primitives/Container/Container';

export function ImplementationProcess() {
  const phases = [
    {
      icon: Rocket,
      phase: '01',
      title: 'Sprint de implementação',
      duration: '7-14 dias',
      description: 'Período inicial para estabelecer fundamentos sólidos',
      tasks: [
        'Auditoria completa do negócio atual',
        'Definição de metas e KPIs específicos',
        'Setup inicial de ferramentas e processos',
        'Criação das primeiras campanhas',
      ],
      color: 'text-arco-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      accentGradient: 'from-blue-500/10 to-cyan-500/10',
      progressGradient: 'from-blue-500/30 to-cyan-500/30',
      hoverGradient: 'from-blue-500/5 to-cyan-500/5',
    },
    {
      icon: Target,
      phase: '02',
      title: 'Critérios de sucesso',
      duration: 'Avaliação contínua',
      description: 'Métricas claras para avaliação de performance inicial',
      tasks: [
        'Monitoramento de conversões em tempo real',
        'Análise de qualidade dos leads',
        'Otimização baseada em dados',
        'Relatórios semanais de progresso',
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      accentGradient: 'from-green-500/10 to-emerald-500/10',
      progressGradient: 'from-green-500/30 to-emerald-500/30',
      hoverGradient: 'from-green-500/5 to-emerald-500/5',
    },
    {
      icon: Zap,
      phase: '03',
      title: 'Migração e escala',
      duration: 'Transição suave',
      description: 'Processo de transição e crédito para próxima fase',
      tasks: [
        'Transição para operação completa',
        'Escalonamento de campanhas eficazes',
        'Integração com sistemas existentes',
        'Treinamento da equipe interna',
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      accentGradient: 'from-purple-500/10 to-violet-500/10',
      progressGradient: 'from-purple-500/30 to-violet-500/30',
      hoverGradient: 'from-purple-500/5 to-violet-500/5',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white via-slate-50/50 to-white py-24">
      <Container>
        <div className="space-y-16">
          {/* Header */}
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <Badge variant="outline" className="border-slate-300 bg-white/80 font-barlow text-slate-700 backdrop-blur-sm">
              Implementação
            </Badge>

            <div className="space-y-4">
              <h2 className="font-arsenal text-5xl font-normal uppercase leading-tight text-slate-900 lg:text-6xl">
                Processo estruturado
                <span className="block text-slate-600">em 3 fases</span>
              </h2>
              <p className="font-barlow text-xl leading-relaxed text-slate-600">
                Metodologia comprovada para garantir resultados desde os primeiros dias
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connection line */}
            <div className="absolute right-0 top-1/2 left-0 hidden h-px -translate-y-1/2 transform bg-gradient-to-r from-transparent via-slate-300 to-transparent lg:block" />

            <div className="grid gap-8 lg:grid-cols-3">
              {phases.map((phase, index) => (
                <Card
                  key={index}
                  className={`group relative overflow-hidden border-2 bg-gradient-to-br backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-opacity-60 hover:shadow-xl ${phase.borderColor} ${phase.accentGradient}`}
                >
                  {/* Phase number */}
                  <div className="absolute -right-4 -top-4 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 font-arsenal text-lg font-normal text-white">
                    {phase.phase}
                  </div>

                  <CardHeader className="relative z-10 space-y-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-xl p-3 transition-transform duration-300 group-hover:scale-110 ${phase.bgColor}`}
                      >
                        <phase.icon className={`h-6 w-6 ${phase.color}`} />
                      </div>
                      <div className="flex-1">
                        <Badge
                          variant="outline"
                          className={`font-barlow mb-2 text-xs ${phase.borderColor} ${phase.bgColor} ${phase.color}`}
                        >
                          {phase.duration}
                        </Badge>
                        <CardTitle className="font-arsenal text-2xl font-normal uppercase leading-tight text-slate-900">
                          {phase.title}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="font-barlow text-base leading-relaxed text-slate-600">
                      {phase.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-6">
                    {/* Tasks list */}
                    <div className="space-y-3">
                      {phase.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="group/task flex items-start gap-3">
                          <CheckCircle className={`mt-1 h-4 w-4 flex-shrink-0 ${phase.color}`} />
                          <span className="font-barlow text-sm leading-relaxed text-slate-700">{task}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progress indicator */}
                    <div className="pt-4">
                      <div className={`h-2 overflow-hidden rounded-full ${phase.bgColor}`}>
                        <div
                          className={`h-full bg-gradient-to-r transition-all duration-1000 ease-out ${phase.progressGradient}`}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  </CardContent>

                  {/* Hover effect overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${phase.hoverGradient}`}
                  />
                </Card>
              ))}
            </div>
          </div>

          {/* Success metrics */}
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white lg:p-12">
            <div className="space-y-8 text-center">
              <div className="space-y-4">
                <h3 className="font-arsenal text-3xl font-normal uppercase lg:text-4xl">Resultados típicos</h3>
                <p className="font-barlow mx-auto max-w-2xl text-lg leading-relaxed text-slate-300">
                  O que nossos clientes alcançam durante o processo de implementação
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                <div className="space-y-2 text-center">
                  <div className="font-arsenal text-4xl font-normal text-yellow-400">72h</div>
                  <div className="font-barlow text-sm text-slate-300">Para primeiros leads qualificados</div>
                </div>

                <div className="space-y-2 text-center">
                  <div className="font-arsenal text-4xl font-normal text-yellow-400">+180%</div>
                  <div className="font-barlow text-sm text-slate-300">Aumento médio na primeira semana</div>
                </div>

                <div className="space-y-2 text-center">
                  <div className="font-arsenal text-4xl font-normal text-yellow-400">14 dias</div>
                  <div className="font-barlow text-sm text-slate-300">Para operação otimizada</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="font-barlow group font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-slate-800 bg-slate-900"
              >
                Iniciar implementação
                <Rocket className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Button>

              <div className="font-barlow flex items-center gap-2 text-sm text-slate-500">
                <Clock className="h-4 w-4" />
                <span>Setup completo em 7-14 dias</span>
              </div>
            </div>

            <p className="font-barlow mx-auto max-w-2xl text-sm text-slate-500">
              Processo estruturado com acompanhamento dedicado e suporte completo durante toda a implementação
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
