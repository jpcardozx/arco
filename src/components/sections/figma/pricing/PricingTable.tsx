/**
 * PricingTable - Transparent Pricing with Packages
 * Pattern: ServiceComparison glassmorphism + responsive design
 * Stack: shadcn/ui + Framer Motion + accessibility features
 */
'use client';

import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  ArrowRight, 
  Sparkles, 
  Zap,
  Crown,
  Star,
  TrendingUp,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/primitives/Container/Container';
import { cn } from '@/design-system/tokens';

export function PricingTable() {
  const packages = [
    {
      name: 'Essencial',
      tagline: 'Para quem está começando',
      price: 'R$ 2.497',
      period: '/mês',
      description: 'Fundação sólida para captação de leads locais',
      icon: Zap,
      badge: 'Mais popular',
      badgeColor: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
      gradient: 'from-orange-500/10 to-orange-600/5',
      borderColor: 'border-orange-500/20',
      iconColor: 'text-orange-500',
      features: [
        { text: 'Landing page profissional', included: true },
        { text: 'Google Ads ou Meta Ads (1 canal)', included: true },
        { text: 'CRM básico integrado', included: true },
        { text: 'WhatsApp Business configurado', included: true },
        { text: 'Relatórios mensais', included: true },
        { text: 'Suporte por email', included: true },
        { text: 'Dashboard de analytics', included: false },
        { text: 'Remarketing avançado', included: false },
      ],
      cta: 'Começar Agora',
      highlight: false,
    },
    {
      name: 'Profissional',
      tagline: 'Para crescimento acelerado',
      price: 'R$ 4.997',
      period: '/mês',
      description: 'Sistema completo de captação + conversão + otimização',
      icon: Crown,
      badge: 'Recomendado',
      badgeColor: 'bg-teal-500/10 text-teal-600 border-teal-500/20',
      gradient: 'from-teal-500/10 to-teal-600/5',
      borderColor: 'border-teal-500/30',
      iconColor: 'text-teal-500',
      features: [
        { text: 'Tudo do Essencial +', included: true, highlight: true },
        { text: 'Google Ads + Meta Ads (multi-canal)', included: true },
        { text: 'CRM avançado com automação', included: true },
        { text: 'Dashboard analytics em tempo real', included: true },
        { text: 'Remarketing estratégico', included: true },
        { text: 'A/B testing contínuo', included: true },
        { text: 'Relatórios semanais', included: true },
        { text: 'Suporte prioritário (WhatsApp)', included: true },
      ],
      cta: 'Escalar Agora',
      highlight: true,
    },
    {
      name: 'Enterprise',
      tagline: 'Para domínio de mercado',
      price: 'Customizado',
      period: '',
      description: 'Solução sob medida com consultor dedicado',
      icon: Star,
      badge: 'Premium',
      badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      gradient: 'from-purple-500/10 to-purple-600/5',
      borderColor: 'border-purple-500/20',
      iconColor: 'text-purple-500',
      features: [
        { text: 'Tudo do Profissional +', included: true, highlight: true },
        { text: 'Multi-canal avançado (Google + Meta + LinkedIn)', included: true },
        { text: 'Chatbot com IA conversacional', included: true },
        { text: 'Consultor dedicado 20h/mês', included: true },
        { text: 'Revisões estratégicas semanais', included: true },
        { text: 'Suporte VIP 24/7', included: true },
        { text: 'Integrações customizadas', included: true },
        { text: 'Treinamento in-company', included: true },
      ],
      cta: 'Agendar Consultoria',
      highlight: false,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-white" aria-labelledby="pricing-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" aria-hidden="true" />

      <Container className="relative z-10">
        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl space-y-6 text-center"
          >
            <Badge variant="outline" className="border-slate-300 bg-white/80 backdrop-blur-sm">
              <Shield className="w-3 h-3 mr-1.5" aria-hidden="true" />
              Preços Transparentes
            </Badge>

            <div className="space-y-4">
              <h2 id="pricing-heading" className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
                Invista em{' '}
                <span className="bg-gradient-to-r from-orange-500 via-teal-500 to-purple-500 bg-clip-text text-transparent">
                  Crescimento Real
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
                Sem taxas ocultas. Sem surpresas. <strong className="text-slate-900">Apenas resultados mensuráveis</strong>
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>ROI médio de 420% | Sem fidelidade | Cancele quando quiser</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => {
              const Icon = pkg.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card
                    className={cn(
                      'group relative overflow-hidden backdrop-blur-sm transition-all duration-500 h-full flex flex-col',
                      pkg.highlight 
                        ? 'border-2 border-teal-500/40 shadow-2xl shadow-teal-500/20 scale-105' 
                        : 'border-2 hover:scale-105',
                      pkg.borderColor
                    )}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-50`} />
                    
                    {pkg.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <Badge className={cn('shadow-lg backdrop-blur-sm', pkg.badgeColor)}>
                          <Sparkles className="w-3 h-3 mr-1" />
                          {pkg.badge}
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="relative space-y-4 pt-8">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pkg.gradient} border-2 ${pkg.borderColor} flex items-center justify-center`}>
                        <Icon className={`h-7 w-7 ${pkg.iconColor}`} />
                      </div>

                      <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold text-slate-900">{pkg.name}</CardTitle>
                        <CardDescription className="text-sm text-slate-600">{pkg.tagline}</CardDescription>
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-slate-900">{pkg.price}</span>
                        {pkg.period && <span className="text-lg text-slate-600">{pkg.period}</span>}
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed">{pkg.description}</p>
                    </CardHeader>

                    <CardContent className="relative space-y-6 flex-1 flex flex-col">
                      <ul className="space-y-3 flex-1">
                        {pkg.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <div className={cn('mt-0.5 p-0.5 rounded-full flex-shrink-0', feature.included ? 'bg-emerald-500/10' : 'bg-slate-200')}>
                              {feature.included ? <Check className="h-4 w-4 text-emerald-600" /> : <X className="h-4 w-4 text-slate-400" />}
                            </div>
                            <span className={cn('text-sm leading-relaxed', feature.included ? 'text-slate-700' : 'text-slate-400', feature.highlight && 'font-semibold text-slate-900')}>
                              {feature.text}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        size="lg"
                        variant={pkg.highlight ? 'default' : 'outline'}
                        className={cn('w-full transition-all duration-300 group/btn', pkg.highlight ? 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-500/30' : `border-2 ${pkg.borderColor}`)}
                      >
                        {pkg.cta}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <Card className="inline-block border-2 border-emerald-500/20 bg-emerald-50/50 backdrop-blur-sm">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900">Garantia de 30 dias</div>
                  <div className="text-sm text-slate-600">Se não ver resultados, devolvemos 100%</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
