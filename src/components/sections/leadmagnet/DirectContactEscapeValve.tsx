/**
 * DIRECT CONTACT ESCAPE VALVE
 * Para leads quentes que querem falar direto após ver valor
 * GAP #3 - Free → Contato direto
 */
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Phone,
  ArrowRight,
  Clock,
  CheckCircle2,
  Zap,
  MessageSquare
} from 'lucide-react';

export function DirectContactEscapeValve() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-2 border-orange-400/30 bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-xl overflow-hidden">
              <CardContent className="p-8 sm:p-12">

                {/* Split Layout */}
                <div className="grid md:grid-cols-5 gap-8 items-center">

                  {/* Left: Icon + Message */}
                  <div className="md:col-span-3 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                        <Zap className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3
                          className="text-2xl sm:text-3xl font-arsenal font-bold text-white mb-3"
                          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}
                        >
                          Prefere Falar Direto com um Especialista?
                        </h3>
                        <p
                          className="text-base sm:text-lg text-slate-200 leading-relaxed"
                          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}
                        >
                          Alguns clientes preferem ir direto ao ponto. Se você já identificou
                          oportunidades e quer implementar agora, podemos conversar.
                        </p>
                      </div>
                    </div>

                    {/* Quick Benefits */}
                    <div className="space-y-2.5 pt-4 border-t border-white/10">
                      {[
                        { icon: Clock, text: "Consultoria gratuita de 30 minutos" },
                        { icon: CheckCircle2, text: "Plano de ação personalizado" },
                        { icon: MessageSquare, text: "Sem pressão comercial" }
                      ].map((item, index) => {
                        const IconComponent = item.icon as React.ComponentType<{ className?: string }>;
                        return (
                          <div key={index} className="flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-orange-400 flex-shrink-0" />
                            <span
                              className="text-sm text-slate-200 font-medium"
                              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
                            >
                              {item.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: CTA */}
                  <div className="md:col-span-2">
                    <div className="space-y-4">
                      <Button
                        size="lg"
                        className="w-full group relative overflow-hidden px-8 py-7 text-lg font-bold rounded-2xl bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 hover:from-orange-700 hover:via-amber-600 hover:to-orange-700 shadow-2xl shadow-orange-500/40 transition-all duration-500 hover:scale-105"
                        onClick={() => window.location.href = '/contato'}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          <Phone className="w-6 h-6 flex-shrink-0" />
                          <span>Agendar Conversa</span>
                          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                        </span>

                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                          animate={{ x: ['-200%', '200%'] }}
                          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                        />
                      </Button>

                      <p className="text-xs text-center text-slate-400">
                        📅 Resposta em até 4 horas úteis
                      </p>
                    </div>
                  </div>

                </div>

                {/* Bottom Note */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm text-center text-slate-300">
                    <strong className="text-white">Nota:</strong> Esta é a opção mais rápida
                    se você já tem clareza sobre seus objetivos e quer implementar.
                  </p>
                </div>

              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
