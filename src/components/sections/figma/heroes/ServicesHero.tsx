/**
 * ServicesHero - Professional Hero for Services Page
 * Pattern: Homepage PremiumHero + Contact glassmorphism
 * Stack: shadcn/ui + Framer Motion + Unsplash hero image
 */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, BarChart3, Users, Zap, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/primitives/Container/Container';

export function ServicesHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { icon: Target, value: '350%', label: 'Aumento médio em leads', color: 'text-orange-400' },
    { icon: BarChart3, value: '7 dias', label: 'Para primeiros resultados', color: 'text-teal-400' },
    { icon: Users, value: '200+', label: 'Prestadores atendidos', color: 'text-emerald-400' }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-20 sm:py-28 lg:py-32">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-500/10 via-teal-500/10 to-transparent rounded-full blur-3xl"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-transparent rounded-full blur-3xl"
        animate={{
          x: -mousePosition.x,
          y: -mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge 
                variant="outline" 
                className="border-orange-400/30 bg-orange-400/10 text-orange-400 hover:bg-orange-400/20 transition-all duration-300 backdrop-blur-sm"
              >
                <Zap className="w-3 h-3 mr-1.5" />
                Soluções Estratégicas Comprovadas
              </Badge>
            </motion.div>
              
            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] text-white">
                Transforme Seu Negócio em{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-orange-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                    Máquina de Leads
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-teal-400/20 to-emerald-400/20 blur-2xl"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </span>
              </h1>
                
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                Metodologia completa de <strong className="text-white">captação + conversão + retenção</strong> testada em 200+ prestadores de serviços locais. Resultados mensuráveis em 7 dias.
              </p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 group"
                aria-label="Descobrir solução personalizada para seu negócio"
              >
                Descobrir Minha Solução
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/30"
                aria-label="Ver detalhes da metodologia ARCO"
              >
                <Award className="mr-2 h-4 w-4" aria-hidden="true" />
                Ver Metodologia
              </Button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10"
              role="list"
              aria-label="Estatísticas de sucesso"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center group cursor-default"
                    role="listitem"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400 leading-tight">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Hero Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            {/* Glassmorphic Card with Image */}
            <div className="relative aspect-[4/5] lg:aspect-square rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-emerald-500/20" />
              
              {/* Image from Unsplash - Professional workspace */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format')`,
                }}
                role="img"
                aria-label="Workspace profissional com dados de analytics"
              />
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-center space-y-6 backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-white/10"
                >
                  <div className="space-y-2">
                    <div className="text-7xl font-bold text-white">
                      420<span className="text-orange-400">%</span>
                    </div>
                    <div className="text-xl text-white font-medium">
                      ROI Médio
                    </div>
                    <div className="text-sm text-slate-300">
                      em 12 meses de operação
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-emerald-400">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm font-medium">Crescimento Sustentável</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating stats cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -left-4 top-1/4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-xl hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">7 dias</div>
                  <div className="text-xs text-slate-300">Primeiros leads</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -right-4 bottom-1/4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-xl hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">200+</div>
                  <div className="text-xs text-slate-300">Clientes ativos</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}