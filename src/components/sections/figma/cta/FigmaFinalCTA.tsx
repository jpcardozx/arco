/**
 * Figma Final CTA Section - S-Tier Conversion Premium Dark
 * Background: Radial gradients sutis com brand colors
 * Glassmorphism + micro-interações para máxima conversão
 */
'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/primitives/Container/Container';
import { 
  ArrowRight, 
  Clock, 
  Shield, 
  Target, 
  CheckCircle, 
  Star,
  Sparkles,
  Zap,
  TrendingUp
} from 'lucide-react';

// Background Component: Subtle Dark Radial Gradients
const SubtleRadialBg: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <div 
      className="absolute inset-0 overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
    >
      {/* Teal radial - top left */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full filter blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Orange radial - bottom right */}
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 rounded-full filter blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Purple radial - center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full filter blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />

      {/* Mouse follower glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none filter blur-3xl opacity-0 hover:opacity-20 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.2) 0%, transparent 70%)',
          x: useTransform(mouseX, (x) => x - 192),
          y: useTransform(mouseY, (y) => y - 192),
        }}
      />
    </div>
  );
};

export function FigmaFinalCTA() {
  const guarantees = [
    {
      icon: Target,
      title: 'Leads qualificados em 7 dias',
      description: 'Ou devolvemos seu investimento',
    },
    {
      icon: Shield,
      title: 'Garantia de 30 dias',
      description: 'Satisfação total ou dinheiro de volta',
    },
    {
      icon: Clock,
      title: 'Setup em 48h',
      description: 'Implementação completa no final de semana',
    },
  ];

  const pricing = {
    originalPrice: 'R$ 2.970',
    currentPrice: 'R$ 997',
    installments: '3x R$ 332',
    discount: '66% OFF',
    validUntil: 'Oferta válida até domingo',
  };

  const included = [
    'Landing page otimizada para conversão',
    'Campanhas Google Ads configuradas',
    'Scripts de atendimento WhatsApp',
    'Sistema de qualificação de leads',
    'Dashboards de acompanhamento',
    'Treinamento da equipe (2h)',
    'Suporte por 90 dias',
    'Garantia de resultados',
  ];

  const socialProof = [
    { metric: '200+', label: 'Projetos entregues' },
    { metric: '4.9/5', label: 'Satisfação média' },
    { metric: '350%', label: 'Aumento médio de leads' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16 sm:py-20 lg:py-28">
      {/* Subtle Radial Gradients Background */}
      <SubtleRadialBg />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] z-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.3)_1px,transparent_1px)] bg-[length:60px_60px]" />
      </div>

      <Container size="xl" className="relative z-20 max-w-6xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <Badge className="mb-6 border-teal-500/30 bg-teal-500/10 text-teal-400 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 mr-2" />
            Transforme seu negócio hoje
          </Badge>

          <h2 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Seus leads qualificados <br />
            começam{' '}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">amanhã</span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-300">
            Junte-se a mais de 200 prestadores de serviços que aumentaram seus orçamentos em <span className="text-teal-400 font-semibold">350%</span> com nossa estratégia comprovada.
          </p>
        </motion.div>

        {/* Main CTA Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-12 max-w-4xl"
        >
          <Card className="overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl hover:bg-white/8 transition-colors duration-300">
            <CardContent className="p-0">
              {/* Pricing Section */}
              <div className="border-b border-white/10 bg-gradient-to-br from-teal-500/10 via-transparent to-orange-500/10 p-8 text-center relative overflow-hidden">
                {/* Subtle shine effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                />
                
                <div className="mb-4 relative z-10">
                  <span className="text-2xl text-slate-400 line-through">{pricing.originalPrice}</span>
                  <Badge className="ml-3 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
                    {pricing.discount}
                  </Badge>
                </div>

                <div className="mb-2 text-6xl font-bold text-white relative z-10">{pricing.currentPrice}</div>

                <div className="mb-4 text-lg text-slate-300 relative z-10">ou {pricing.installments} sem juros</div>

                <Badge variant="outline" className="border-orange-400/30 bg-orange-500/10 text-orange-300 backdrop-blur-sm relative z-10">
                  <Clock className="w-3 h-3 mr-1" />
                  {pricing.validUntil}
                </Badge>
              </div>

              {/* Included Items */}
              <div className="p-8">
                <h3 className="mb-8 text-center text-2xl font-semibold text-white">Tudo incluído</h3>

                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {included.map((item, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 group"
                    >
                      <CheckCircle className="h-5 w-5 flex-shrink-0 text-teal-400 group-hover:text-teal-300 transition-colors" />
                      <span className="text-slate-300 group-hover:text-white transition-colors">{item}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Main CTA Button */}
                <motion.div 
                  className="mb-6 text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="group relative overflow-hidden transform px-12 py-7 text-lg font-bold text-white shadow-2xl transition-all hover:shadow-teal-500/50 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-emerald-600 border-0"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <span className="relative z-10 flex items-center">
                      <Zap className="mr-2 h-5 w-5" />
                      Quero mais leads agora
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </motion.div>

                <p className="text-center text-sm text-slate-400">
                  <Shield className="inline w-4 h-4 mr-1 text-teal-400" />
                  Suporte premium incluso nos primeiros 3 meses
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Guarantees */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            const colors = [
              { bg: 'bg-teal-500/20', border: 'border-teal-500/30', icon: 'text-teal-400' },
              { bg: 'bg-orange-500/20', border: 'border-orange-500/30', icon: 'text-orange-400' },
              { bg: 'bg-purple-500/20', border: 'border-purple-500/30', icon: 'text-purple-400' },
            ][index];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className={`border ${colors.border} bg-white/5 backdrop-blur-xl text-white hover:bg-white/8 transition-all duration-300 h-full`}>
                  <CardContent className="p-6 text-center">
                    <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${colors.bg} border ${colors.border}`}>
                      <Icon className={`h-7 w-7 ${colors.icon}`} />
                    </div>

                    <h3 className="mb-2 text-lg font-semibold">{guarantee.title}</h3>

                    <p className="text-sm text-slate-300">{guarantee.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Social Proof */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-8 flex flex-wrap items-center justify-center gap-8">
            {socialProof.map((item, index) => {
              const colors = ['text-teal-400', 'text-orange-400', 'text-purple-400'];
              return (
                <motion.div 
                  key={index} 
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className={`text-3xl font-bold ${colors[index]}`}>{item.metric}</div>
                  <div className="text-sm text-slate-400">{item.label}</div>
                </motion.div>
              );
            })}
          </div>

          <div className="mb-4 flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Star className="h-5 w-5 fill-teal-400 text-teal-400" />
              </motion.div>
            ))}
            <span className="ml-2 text-slate-300">Avaliação média dos clientes</span>
          </div>

          <p className="mx-auto max-w-2xl text-sm text-slate-400 italic">
            "A melhor decisão que tomei para meu negócio. Em 3 meses multipliquei por 4 o número de orçamentos." — <span className="text-slate-300">Carlos M., Reformas</span>
          </p>
        </motion.div>

        {/* Urgency */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Card className="mx-auto max-w-lg border border-teal-500/30 bg-gradient-to-r from-teal-500/20 to-orange-500/20 backdrop-blur-xl text-white shadow-xl hover:shadow-teal-500/30 transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="mb-2 flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Clock className="h-5 w-5 text-teal-400" />
                </motion.div>
                <span className="font-semibold">Vagas limitadas</span>
              </div>
              <p className="text-sm text-slate-300">
                Atendemos apenas <span className="text-teal-400 font-bold">10 novos clientes</span> por mês para garantir qualidade do atendimento
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
