/**
 * NURTURE PATHS SECTION - Assessment Page
 * Opções para usuários não prontos para assessment completo
 * Downgrade para /free e educação para /metodologia
 */
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Download,
  FileText,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

export function NurturePathsSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const paths = [
    {
      icon: Download,
      badge: "Recurso Gratuito",
      badgeColor: "from-teal-500 to-green-500",
      title: "Prefere Começar com Algo Mais Simples?",
      description: "Baixe nosso checklist gratuito com 15 pontos críticos de otimização. Material prático para implementar hoje mesmo.",
      benefits: [
        "Checklist PDF de 15 pontos",
        "Autoavaliação guiada",
        "Benchmarks do setor"
      ],
      ctaText: "Baixar Checklist Gratuito",
      ctaHref: "/free",
      bgGradient: "from-teal-500/10 to-green-500/10",
      borderColor: "border-teal-400/30",
      iconColor: "text-teal-400"
    },
    {
      icon: FileText,
      badge: "Entenda o Processo",
      badgeColor: "from-indigo-500 to-purple-500",
      title: "Quer Entender Nossa Metodologia Antes?",
      description: "Veja em detalhes como transformamos diagnóstico em resultados. Processo 100% transparente e auditável.",
      benefits: [
        "Sistema de controle de investimento",
        "Otimização contínua documentada",
        "Casos reais com ROI comprovado"
      ],
      ctaText: "Ver Nossa Metodologia",
      ctaHref: "/metodologia",
      bgGradient: "from-indigo-500/10 to-purple-500/10",
      borderColor: "border-indigo-400/30",
      iconColor: "text-indigo-400"
    }
  ];

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 space-y-4"
          >
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-arsenal font-bold text-white"
              style={{ textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}
            >
              Não Está Pronto Para o Diagnóstico Completo?
            </h2>
            <p
              className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}
            >
              Sem problema. Escolha uma opção que faça mais sentido para você agora:
            </p>
          </motion.div>

          {/* Paths Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {paths.map((path, index) => {
              const IconComponent = path.icon as React.ComponentType<{ className?: string }>;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                >
                  <Card className={`h-full border-2 ${path.borderColor} bg-gradient-to-br ${path.bgGradient} backdrop-blur-xl hover:scale-[1.02] transition-all duration-300 group`}>
                    <CardContent className="p-6 sm:p-8 space-y-6">

                      {/* Icon + Badge */}
                      <div className="flex items-start justify-between">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${path.badgeColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${path.badgeColor} text-xs font-bold text-white`}>
                          {path.badge}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h3
                          className="text-xl sm:text-2xl font-arsenal font-bold text-white"
                          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}
                        >
                          {path.title}
                        </h3>
                        <p
                          className="text-sm sm:text-base text-slate-300 leading-relaxed"
                          style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
                        >
                          {path.description}
                        </p>
                      </div>

                      {/* Benefits */}
                      <div className="space-y-2.5 py-4 border-t border-white/10">
                        {path.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <CheckCircle2 className={`w-5 h-5 ${path.iconColor} flex-shrink-0`} />
                            <span
                              className="text-sm text-slate-200 font-medium"
                              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
                            >
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Button
                        size="lg"
                        variant="outline"
                        className={`w-full group/btn border-2 ${path.borderColor} bg-white/5 hover:bg-white/10 text-white py-6 rounded-xl transition-all duration-300`}
                        onClick={() => window.location.href = path.ctaHref}
                      >
                        <span className="flex items-center justify-center gap-3">
                          <span className="font-semibold">{path.ctaText}</span>
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </span>
                      </Button>

                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <p className="text-sm text-slate-300">
                Você pode voltar e solicitar o diagnóstico completo a qualquer momento
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
