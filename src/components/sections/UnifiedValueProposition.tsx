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

          {/* Header Section (Asymmetrical) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              Resultados Reais, Parceria Transparente.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-lg text-slate-300 leading-relaxed"
            >
              Nossa metodologia <span className="text-teal-400 font-semibold">alinha seus objetivos aos nossos</span>. Entregamos um sistema de captação de clientes de alta performance, e seu sucesso contínuo é a nossa maior métrica.
            </motion.p>
          </div>

          {/* ROI Stat Card (Overlapping) */}
          <div className="lg:col-span-7 relative h-full flex items-center justify-center">
            <StatCard 
              value="420%" 
              label="ROI Médio Comprovado" 
              icon={TrendingUp} 
              className="lg:absolute lg:-right-12 lg:w-72 z-10" 
              colorClass={{ bg: 'bg-teal-100', text: 'text-teal-700' }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="hidden lg:block w-full h-80 bg-white/40 backdrop-blur-sm rounded-3xl shadow-xl p-6"
            >
              <div className="w-full h-full border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center">
                <p className="text-slate-400">Visualização de Dados Futura</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Benefit Cards */}
          <BenefitCard 
            title="Do Kick-off a Leads em 48 Horas" 
            description="Implementamos seu funil de captação e iniciamos suas campanhas em tempo recorde, para que você veja resultados imediatos."
            icon={Zap}
            colorClass={{ bg: 'bg-orange-100', text: 'text-orange-700' }}
          />
          <BenefitCard 
            title="Metodologia Focada em Conversão" 
            description="Cada etapa do nosso processo é otimizada para uma única coisa: transformar visitantes em clientes qualificados para o seu negócio."
            icon={Target}
            colorClass={{ bg: 'bg-blue-100', text: 'text-blue-700' }}
          />
          <BenefitCard 
            title="Parceria Baseada em Performance" 
            description="Seu sucesso é nosso sucesso. Nosso modelo é estruturado para que cresçamos juntos, com total transparência nos resultados."
            icon={ShieldCheck}
            colorClass={{ bg: 'bg-purple-100', text: 'text-purple-700' }}
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
              <h3 className="text-3xl md:text-4xl font-bold text-white">Descubra o Potencial de Receita Escondido em sua Operação.</h3>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto mt-4 mb-8">Nossa análise gratuita revela o impacto financeiro da performance do seu site e traça um plano de ação claro para otimização.</p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 py-7 px-8 text-lg font-bold shadow-xl hover:shadow-2xl hover:shadow-teal-500/50 hover:scale-105 transition-all duration-300 group"
                onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              >
                Calcular Meu Potencial de ROI
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