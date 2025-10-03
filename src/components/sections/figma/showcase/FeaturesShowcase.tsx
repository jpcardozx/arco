/**
 * FeaturesShowcase - Showcase de características e diferenciais
 * Design premium com grid de features e animações
 */

import { 
  Target, 
  BarChart3, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Smartphone,
  Globe,
  Settings,
  Award
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/primitives/Container/Container'

export function FeaturesShowcase() {
  const mainFeatures = [
    {
      icon: Target,
      title: 'Leads Qualificados',
      description: 'Foco em prospects com alta intenção de compra, não apenas volume',
      benefits: ['CPQL otimizado', 'Qualificação automática', 'Segmentação precisa'],
      color: 'text-arco-600',
      bgColor: 'bg-blue-50',
      gradient: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      icon: BarChart3,
      title: 'Métricas Precisas',
      description: 'Acompanhamento detalhado com transparência total nos resultados',
      benefits: ['ROI transparente', 'Relatórios semanais', 'Dashboard em tempo real'],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      gradient: 'from-green-500/10 to-emerald-500/10'
    },
    {
      icon: Zap,
      title: 'Resultados Rápidos',
      description: 'Primeiros leads qualificados em 72 horas, otimização contínua',
      benefits: ['Setup em 7-14 dias', 'Primeiros leads em 72h', 'Otimização quinzenal'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      gradient: 'from-purple-500/10 to-violet-500/10'
    },
    {
      icon: Shield,
      title: 'Garantia de Resultados',
      description: 'Metodologia comprovada com garantias baseadas em métricas objetivas',
      benefits: ['Metas claras', 'SLA definido', 'Cancelamento sem custos'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      gradient: 'from-orange-500/10 to-red-500/10'
    }
  ]

  const additionalFeatures = [
    {
      icon: Clock,
      title: 'Atendimento 24/7',
      description: 'Suporte dedicado para questões urgentes'
    },
    {
      icon: Users,
      title: 'Equipe Especializada',
      description: 'Profissionais com 8+ anos de experiência'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Landing pages otimizadas para dispositivos móveis'
    },
    {
      icon: Globe,
      title: 'Cobertura Nacional',
      description: 'Atendimento em todo território brasileiro'
    },
    {
      icon: Settings,
      title: 'Automação Inteligente',
      description: 'Processos automatizados para máxima eficiência'
    },
    {
      icon: Award,
      title: 'Metodologia Premiada',
      description: 'Reconhecida por resultados consistentes'
    }
  ]

  const stats = [
    { value: '350%', label: 'Aumento médio em leads' },
    { value: '72h', label: 'Para primeiros resultados' },
    { value: '200+', label: 'Clientes satisfeitos' },
    { value: '420%', label: 'ROI médio em 90 dias' }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <Container>
        <div className="space-y-20">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <Badge 
              variant="outline" 
              className="border-slate-300 bg-white/80 text-slate-700 font-['Barlow'] backdrop-blur-sm"
            >
              Diferenciais ARCO
            </Badge>
            
            <div className="space-y-4">
              <h2 className="font-['Arsenal_SC'] text-5xl lg:text-6xl font-normal uppercase leading-tight text-slate-900">
                Por que somos
                <span className="block text-slate-600">diferentes</span>
              </h2>
              <p className="text-xl text-slate-600 font-['Barlow'] leading-relaxed">
                Metodologia única que combina tecnologia, estratégia e execução para resultados consistentes
              </p>
            </div>
          </div>

          {/* Main features grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <Card 
                key={index}
                className={`group relative overflow-hidden border-2 border-slate-200 hover:border-slate-300 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl bg-gradient-to-br ${feature.gradient} backdrop-blur-sm`}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="font-['Arsenal_SC'] text-2xl font-normal uppercase text-slate-900">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </div>
                  
                  <CardDescription className="text-slate-600 font-['Barlow'] text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-3">
                        <CheckCircle className={`h-5 w-5 ${feature.color} flex-shrink-0`} />
                        <span className="text-slate-700 font-['Barlow'] text-sm">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-200/60">
                    <Button 
                      variant="outline" 
                      className={`w-full group/btn border-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-900 font-['Barlow'] font-medium transition-all duration-300`}
                    >
                      Saber mais
                      <TrendingUp className="ml-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                    </Button>
                  </div>
                </CardContent>

                {/* Hover accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient.replace('/10', '/40')} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </Card>
            ))}
          </div>

          {/* Additional features */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="font-['Arsenal_SC'] text-3xl font-normal uppercase text-slate-900 mb-4">
                Recursos adicionais
              </h3>
              <p className="text-slate-600 font-['Barlow'] text-lg">
                Tudo que você precisa em uma solução completa
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalFeatures.map((feature, index) => (
                <Card 
                  key={index}
                  className="group border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-md bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors">
                        <feature.icon className="h-6 w-6 text-slate-600" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-['Arsenal_SC'] text-lg font-normal uppercase text-slate-900">
                          {feature.title}
                        </h4>
                        <p className="text-slate-600 font-['Barlow'] text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats section */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 lg:p-12 text-white">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h3 className="font-['Arsenal_SC'] text-3xl lg:text-4xl font-normal uppercase">
                  Resultados que comprovam
                </h3>
                <p className="text-slate-300 font-['Barlow'] text-lg leading-relaxed max-w-2xl mx-auto">
                  Números baseados em mais de 200 campanhas ativas e 8 anos de experiência
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className="font-['Arsenal_SC'] text-4xl lg:text-5xl font-normal text-yellow-400">
                      {stat.value}
                    </div>
                    <div className="text-slate-300 font-['Barlow'] text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center space-y-6 pt-8 border-t border-slate-200">
            <div className="space-y-4">
              <h3 className="font-['Arsenal_SC'] text-2xl font-normal uppercase text-slate-900">
                Experimente nossa metodologia
              </h3>
              <p className="text-slate-600 font-['Barlow'] text-lg max-w-2xl mx-auto">
                Descubra como podemos aplicar esses diferenciais ao seu negócio
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white font-['Barlow'] font-medium group transition-all duration-300 hover:scale-105"
              >
                Solicitar demonstração
                <Target className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 font-['Barlow'] font-medium"
              >
                Ver casos de sucesso
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}