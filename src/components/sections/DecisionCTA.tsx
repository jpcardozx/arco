'use client';

/**
 * DECISION CTA - FINAL CONVERSION POINT
 *
 * CTA forte após prova social
 * Estágio: Decision (fundo do funil)
 * Objetivo: Conversão imediata
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Clock, Shield } from 'lucide-react';
import { Container } from '../primitives/Container/Container';

export const DecisionCTA: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background accents */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(234,179,8,0.12),transparent_50%)]" />
      </div>

      {/* Animated glow */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(251,146,60,0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 50%, rgba(234,179,8,0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 50%, rgba(251,146,60,0.2) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main headline */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Comece a Multiplicar Seus Leads{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Esta Semana
            </span>
          </h2>

          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            200+ prestadores de serviços locais já estão gerando 350% mais leads.
            É a sua vez de crescer.
          </p>

          {/* Trust signals */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-3 text-left"
            >
              <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Implementação Garantida</h3>
                <p className="text-sm text-slate-400">Sistema completo em 48h ou seu dinheiro de volta</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-3 text-left"
            >
              <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Primeiros Leads em 7 Dias</h3>
                <p className="text-sm text-slate-400">Comece a ver resultados na primeira semana</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-3 text-left"
            >
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">ROI Médio de 420%</h3>
                <p className="text-sm text-slate-400">Investimento se paga em menos de 30 dias</p>
              </div>
            </motion.div>
          </div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="space-y-4"
          >
            <Button
              size="lg"
              className="px-12 py-7 text-lg font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:via-orange-500 hover:to-amber-600 text-slate-900 shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 group"
              onClick={() => {
                const calculator = document.getElementById('roi-calculator');
                calculator?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            >
              Começar Agora - Análise Gratuita
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Button>

            <p className="text-sm text-slate-500">
              ✓ Sem cartão de crédito · ✓ Diagnóstico completo · ✓ Plano personalizado em 24h
            </p>
          </motion.div>

          {/* Urgency element */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-8 inline-block"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/30 rounded-lg px-6 py-3">
              <p className="text-amber-400 font-medium text-sm">
                ⚡ Apenas 3 vagas disponíveis para implementação este mês
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default DecisionCTA;
