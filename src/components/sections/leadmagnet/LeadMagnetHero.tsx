'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle2, TrendingUp, Target, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/primitives/Container/Container';
import { VideoBackground } from '@/components/ui/VideoBackground';
import { cn, designTokens } from '@/design-system/tokens';

const stats = [
  { icon: Download, value: '2.4K+', label: 'Downloads' },
  { icon: TrendingUp, value: '3.8x', label: 'Média de Melhoria' },
  { icon: Target, value: '15', label: 'Pontos Críticos' },
];

export function LeadMagnetHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ x: (e.clientX - window.innerWidth / 2) / 50, y: (e.clientY - window.innerHeight / 2) / 50 });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Video Background - Overlay forte para disfarçar SD + anti-pixelação */}
      <VideoBackground
        src="/videos/social_u5755322468_2D_geometric_vector-style_background_illustration_7c85d9e7-2ffb-479c-bc82-dcdb49c1c25a_1.mp4"
        fadeStyle="dramatic"
        overlayOpacity={82}
        overlayGradient="to-br"
        pauseOnMobile={false}
      />
      
      {/* Overlay adicional para compensar SD quality */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 via-slate-900/30 to-slate-950/40 pointer-events-none z-10" />

      {/* Mouse parallax overlay - mantém interatividade */}
      <motion.div 
        className="absolute inset-0 opacity-20 pointer-events-none z-10" 
        style={{ 
          background: `radial-gradient(700px circle at ${mousePosition.x * 8 + 50}% ${mousePosition.y * 8 + 50}%, rgba(20, 184, 166, 0.15) 0%, transparent 65%)`,
          transition: 'background 0.3s ease-out'
        }} 
      />

      <Container size="xl" className="relative z-30">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-6 border-teal-400/30 bg-teal-500/10 px-4 py-2 text-teal-300 shadow-sm">
              <Zap className="mr-2 h-4 w-4" />
              Material Gratuito • Download Instantâneo
            </Badge>
          </motion.div>

          <motion.h1
            className="mb-6 text-4xl font-bold tracking-tight text-white lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.5)' }}
          >
            Checklist: 15 Pontos para{' '}
            <span 
              className="bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 15px rgba(251, 146, 60, 0.5))' }}
            >
              Otimizar Seu Funil
            </span>
          </motion.h1>

          <motion.p
            className="mb-8 text-xl leading-relaxed text-white lg:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
          >
            Descubra os pontos críticos que impedem seu site de gerar mais leads qualificados.
            <span className="block mt-2 font-semibold text-white">
              Autoavaliação guiada + Benchmarks do setor
            </span>
          </motion.p>

          <motion.div
            className="mb-12 grid grid-cols-3 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-4 md:p-6 shadow-2xl"
              >
                <stat.icon className="mx-auto mb-2 h-6 w-6 text-teal-400 md:h-8 md:w-8" />
                <div className="text-2xl font-bold text-white md:text-3xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>{stat.value}</div>
                <div className="text-xs text-white/90 md:text-sm" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-800/50 backdrop-blur-lg p-6 text-left shadow-xl md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 p-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">O que você vai receber:</h3>
            </div>
            
            <div className="grid gap-3 md:grid-cols-2">
              {[
                'Checklist com 15 pontos críticos',
                'Benchmarks de conversão por setor',
                'Planilha de autoavaliação',
                'Guia de priorização de melhorias',
                'Exemplos práticos e casos reais',
                'Acesso a comunidade exclusiva',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-400" />
                  <span className="text-white font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}