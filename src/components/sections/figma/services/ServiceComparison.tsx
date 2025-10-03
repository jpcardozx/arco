/**
 * ServiceComparison - Premium Services Grid V2
 * Pattern: Homepage card grids + Contact glassmorphism
 * Stack: shadcn/ui + Framer Motion + Unsplash images (4 total)
 * Icons: 8 custom Lucide icons matching service context
 */
'use client';

import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Code2, 
  Megaphone, 
  Headphones, 
  Zap,
  Globe,
  MessageSquare,
  BarChart3,
  Target,
  Rocket,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/primitives/Container/Container';

export function ServiceComparison() {
  const services = [
    {
      category: 'Desenvolvimento Web',
      title: 'Captação Inteligente de Leads',
      description: 'Landing pages de alta conversão + CRM integrado para capturar e nutrir leads qualificados',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
      icon: Code2,
      features: [
        { text: 'Páginas modulares otimizadas para SEO', icon: Globe },
        { text: 'Análise contínua de performance com Hotjar', icon: BarChart3 },
        { text: 'Iterações quinzenais baseadas em dados', icon: TrendingUp },
        { text: 'Testes A/B para maximizar conversão', icon: Target },
      ],
      cta: 'Otimizar Meu Site',
      gradient: 'from-orange-500/20 via-orange-400/10 to-transparent',
      borderColor: 'border-orange-500/20',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-400',
      hoverShadow: 'hover:shadow-orange-500/20',
    },
    {
      category: 'Tráfego Pago',
      title: 'Aquisição Precisa de Clientes',
      description: 'Google Ads + Meta Ads com targeting cirúrgico para leads com alta intenção de compra',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      icon: Megaphone,
      features: [
        { text: 'Palavras-chave de cauda longa + negativas', icon: Zap },
        { text: 'Remarketing estratégico sem saturação', icon: Target },
        { text: 'Otimização de ROI por canal', icon: BarChart3 },
        { text: 'Relatórios semanais transparentes', icon: TrendingUp },
      ],
      cta: 'Escalar Tráfego',
      gradient: 'from-teal-500/20 via-teal-400/10 to-transparent',
      borderColor: 'border-teal-500/20',
      iconBg: 'bg-teal-500/10',
      iconColor: 'text-teal-400',
      hoverShadow: 'hover:shadow-teal-500/20',
    },
    {
      category: 'Atendimento Digital',
      title: 'Conversão Ágil e Inteligente',
      description: 'WhatsApp Business + chatbots para resposta em segundos e conversão em horas',
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80',
      icon: Headphones,
      features: [
        { text: 'Comunicação omnichannel integrada', icon: MessageSquare },
        { text: 'Automação de processos repetitivos', icon: Rocket },
        { text: 'Scripts de conversão testados', icon: Target },
        { text: 'Follow-up automatizado inteligente', icon: Zap },
      ],
      cta: 'Acelerar Conversão',
      gradient: 'from-emerald-500/20 via-emerald-400/10 to-transparent',
      borderColor: 'border-emerald-500/20',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
      hoverShadow: 'hover:shadow-emerald-500/20',
    },
    {
      category: 'Performance & Analytics',
      title: 'Dados Para Decisões Estratégicas',
      description: 'Dashboards em tempo real + relatórios executivos para otimização contínua',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      icon: BarChart3,
      features: [
        { text: 'Google Analytics 4 configurado', icon: Globe },
        { text: 'Dashboards executivos personalizados', icon: BarChart3 },
        { text: 'Relatórios mensais com insights', icon: TrendingUp },
        { text: 'Recomendações baseadas em dados', icon: Target },
      ],
      cta: 'Ver Métricas',
      gradient: 'from-purple-500/20 via-purple-400/10 to-transparent',
      borderColor: 'border-purple-500/20',
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-400',
      hoverShadow: 'hover:shadow-purple-500/20',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-slate-50" aria-labelledby="services-heading">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-60" aria-hidden="true" />
      
      <Container className="relative z-10">
        <div className="space-y-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl space-y-6 text-center"
          >
            <Badge variant="outline" className="border-slate-300 bg-white/80 backdrop-blur-sm" aria-label="Categoria">
              <Rocket className="w-3 h-3 mr-1.5" aria-hidden="true" />
              Metodologia Integrada 360°
            </Badge>

            <div className="space-y-4">
              <h2 id="services-heading" className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
                4 Pilares do{' '}
                <span className="bg-gradient-to-r from-orange-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
                  Crescimento Sustentável
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
                Solução completa que combina <strong className="text-slate-900">desenvolvimento + tráfego + conversão + dados</strong> em um único sistema integrado
              </p>
            </div>
          </motion.div>

          {/* Services Grid - 2x2 layout for 4 services */}
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card
                    className={`group relative overflow-hidden border-2 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] ${service.borderColor} ${service.hoverShadow} hover:shadow-2xl h-full`}
                  >
                    {/* Image Header */}
                    <div className="relative h-48 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url('${service.image}')` }}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-b ${service.gradient}`} />
                      
                      {/* Floating icon */}
                      <div className="absolute top-4 right-4">
                        <div className={`p-3 rounded-xl ${service.iconBg} backdrop-blur-md border border-white/20 shadow-lg`}>
                          <Icon className={`h-6 w-6 ${service.iconColor}`} />
                        </div>
                      </div>

                      {/* Category badge */}
                      <div className="absolute bottom-4 left-4">
                        <Badge className={`${service.iconBg} ${service.iconColor} border-white/20 backdrop-blur-sm`}>
                          {service.category}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="space-y-3">
                      <CardTitle className="text-2xl font-bold text-slate-900 leading-tight">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-base text-slate-600 leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Features list with custom icons */}
                      <div className="space-y-3">
                        {service.features.map((feature, featureIndex) => {
                          const FeatureIcon = feature.icon;
                          return (
                            <div key={featureIndex} className="group/item flex items-start gap-3">
                              <div className={`mt-0.5 p-1 rounded ${service.iconBg}`}>
                                <FeatureIcon className={`h-4 w-4 ${service.iconColor}`} />
                              </div>
                              <span className="text-sm text-slate-700 leading-relaxed flex-1">
                                {feature.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* CTA Button */}
                      <Button
                        variant="outline"
                        className={`w-full border-2 ${service.borderColor} hover:${service.iconBg} hover:${service.iconColor} transition-all duration-300 group/btn`}
                      >
                        {service.cta}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </CardContent>

                    {/* Bottom accent line */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                    />
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="pt-8 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 group"
              >
                Ver Metodologia Completa
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <div className="inline-flex items-center gap-2 text-slate-600">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">ROI médio de 420% em 12 meses</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
