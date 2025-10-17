'use client';

/**
 * UNIFIED VALUE PROPOSITION - v4.0 S-Tier
 * Background: Aurora para profundidade e elegância
 * Editorial layout com hierarquia visual otimizada
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Clock, Target, Users, CheckCircle, Zap, Award, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Container } from '../primitives/Container/Container';
import { cn } from '@/lib/utils';

// --- Background Component: Aurora ---

const AuroraBg: React.FC = () => {
  const colors = ['#1e40af', '#be185d', '#581c87', '#047857'];
  
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      {colors.map((color, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full filter blur-3xl"
          style={{ backgroundColor: color }}
          initial={{ 
            width: Math.random() * 400 + 200,
            height: Math.random() * 400 + 200,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            x: '-50%',
            y: '-50%',
          }}
          animate={{
            x: [`-50%`, `${Math.random() * 40 - 20}%`, '-50%'],
            y: [`-50%`, `${Math.random() * 40 - 20}%`, '-50%'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: index * 2,
          }}
        />
      ))}
    </div>
  );
};

// --- Custom Components for Editorial Layout ---

interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  className?: string;
  colorClass: { bg: string; text: string; };
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, className, colorClass }) => {
  const IconComponent = Icon as any;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className={cn("bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20", className)}
    >
      <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", colorClass.bg)}>
        <IconComponent className={`${colorClass.text} w-7 h-7`} />
      </div>
      <p className="text-5xl font-bold text-white">{value}</p>
      <p className="text-md text-slate-300 font-medium">{label}</p>
    </motion.div>
  );
};

interface BenefitCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  colorClass: { bg: string; text: string; };
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon: Icon, title, description, colorClass }) => {
  const IconComponent = Icon as any;
  return (
    <div className="flex items-start gap-4">
      <div className={cn("flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-1", colorClass.bg)}>
        <IconComponent className={`${colorClass.text} w-6 h-6`} />
      </div>
      <div>
        <h4 className="text-lg font-bold text-white">{title}</h4>
        <p className="text-slate-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// --- Main Component ---

export const UnifiedValueProposition: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
      {/* Aurora Background */}
      <AuroraBg />

      <Container size="xl" className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Header Section (Full Width) */}
          <div className="lg:col-span-12 text-center max-w-4xl mx-auto space-y-6 mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              Metodologia transparente,{' '}
              <span className="text-teal-400">resultados mensuráveis</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-lg text-slate-300 leading-relaxed"
            >
              Não vendemos promessas. Implementamos sistemas de captação com performance verificável e acompanhamento em tempo real.
            </motion.p>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Benefit Cards */}
          <BenefitCard
            title="Implementação Rápida"
            description="Setup completo em 48h. Landing page, tracking e primeiras campanhas rodando. Zero enrolação."
            icon={Zap}
            colorClass={{ bg: 'bg-orange-500/10', text: 'text-orange-400' }}
          />
          <BenefitCard
            title="Otimização Contínua"
            description="Testes A/B semanais, ajustes de copy e bid optimization. Conversão aumenta mês a mês."
            icon={Target}
            colorClass={{ bg: 'bg-blue-500/10', text: 'text-blue-400' }}
          />
          <BenefitCard
            title="Transparência Total"
            description="Dashboard com métricas reais: CPA, ROAS e taxa de conversão. Sem números maquiados."
            icon={ShieldCheck}
            colorClass={{ bg: 'bg-purple-500/10', text: 'text-purple-400' }}
          />
        </div>

        {/* CTA Section */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-slate-800 to-neutral-900 rounded-3xl p-10 md:p-16 text-center overflow-hidden"
          >
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-500/20 rounded-full filter blur-3xl"/>
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500/20 rounded-full filter blur-3xl"/>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Descubra onde está perdendo leads
              </h3>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
                Análise gratuita identifica gargalos de conversão e calcula quanto cada melhoria pode gerar em receita.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all group"
                onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              >
                Calcular Potencial de ROI
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>

      </Container>
    </section>
  );
};

export default UnifiedValueProposition;