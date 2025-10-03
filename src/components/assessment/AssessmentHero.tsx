'use client';

/**
 * ASSESSMENT HERO - S-TIER PROFESSIONAL
 * Advanced animations, parallax, and micro-interactions
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from 'react-type-animation';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp,
  Clock,
  Shield,
  Zap,
  Target,
  Award,
  LineChart,
  Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface AssessmentHeroProps {
  onStartAssessment: () => void;
}

// Floating Animation Component
const FloatingElement = ({ children, delay = 0, duration = 3 }: { children: React.ReactNode; delay?: number; duration?: number }) => (
  <motion.div
    animate={{
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

// Stats Counter Component
const AnimatedCounter = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / 50;
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [inView, end]);

  return (
    <span ref={ref} className="font-bold">
      {count}{suffix}
    </span>
  );
};

export const AssessmentHero = ({ onStartAssessment }: AssessmentHeroProps) => {
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  // Smooth spring animations
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });

  const benefits = [
    {
      icon: TrendingUp,
      stat: '350%',
      title: "Crescimento Médio",
      description: "Em volume de leads qualificados nos primeiros 60 dias",
      color: "from-blue-500 via-blue-600 to-indigo-600",
      glowColor: "rgba(59, 130, 246, 0.4)"
    },
    {
      icon: Clock,
      stat: '7',
      suffix: ' dias',
      title: "Implementação",
      description: "Do diagnóstico à operação completa gerando resultados",
      color: "from-indigo-500 via-purple-600 to-purple-700",
      glowColor: "rgba(99, 102, 241, 0.4)"
    },
    {
      icon: Award,
      stat: '100%',
      title: "Garantia Real",
      description: "Satisfação ou devolvemos 100% do investimento",
      color: "from-purple-500 via-pink-600 to-pink-700",
      glowColor: "rgba(168, 85, 247, 0.4)"
    }
  ];

  const stats = [
    { value: 127, suffix: '+', label: 'Clientes Ativos' },
    { value: 450, suffix: '%', label: 'ROI Médio' },
    { value: 99, suffix: '%', label: 'Satisfação' },
    { value: 48, suffix: 'h', label: 'Suporte' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-20 sm:p-28 lg:p-32">
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs with Parallax */}
        <motion.div
          style={{ y: springY1 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          style={{ y: springY2 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <FloatingElement delay={0} duration={4}>
                <Badge 
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full border-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(99,102,241,0.2) 100%)',
                    backdropFilter: 'blur(20px)',
                    borderColor: 'rgba(59,130,246,0.5)',
                    boxShadow: '0 8px 32px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}
                >
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-100">Diagnóstico Estratégico Premium</span>
                </Badge>
              </FloatingElement>
            </motion.div>

            {/* Main Title with Type Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.1]">
                <span className="block mb-2">Multiplique Seus</span>
                <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  <TypeAnimation
                    sequence={[
                      'Resultados',
                      2000,
                      'Leads Qualificados',
                      2000,
                      'Faturamento',
                      2000,
                      'Oportunidades',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl lg:text-3xl text-blue-100/90 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Análise estratégica completa do seu posicionamento digital. 
              <span className="font-semibold text-white"> Identifique gargalos, otimize conversões</span> e 
              projete crescimento escalável com metodologia comprovada.
            </motion.p>

            {/* CTA Button with Advanced Effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={onStartAssessment}
                  className="relative overflow-hidden px-10 py-7 text-xl font-black rounded-2xl group border-2 border-blue-400/50"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 50%, #6366f1 100%)',
                    boxShadow: '0 20px 60px rgba(59,130,246,0.5), inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Rocket className="w-6 h-6" />
                    Solicitar Diagnóstico Gratuito
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  {/* Animated Shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-400/50 to-purple-400/50 blur-xl" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Resposta em 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span>Sem Compromisso</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <Card 
                  className="border-2 border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300"
                  style={{
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-black text-white mb-2">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-blue-200/80 font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Benefits Grid with Advanced Interactions */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 + index * 0.15 }}
                whileHover={{ scale: 1.03, y: -10 }}
                onHoverStart={() => setHoveredBenefit(index)}
                onHoverEnd={() => setHoveredBenefit(null)}
              >
                <Card 
                  className="relative overflow-hidden border-2 h-full transition-all duration-500"
                  style={{
                    background: hoveredBenefit === index 
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    borderColor: hoveredBenefit === index ? 'rgba(59,130,246,0.8)' : 'rgba(255,255,255,0.1)',
                    boxShadow: hoveredBenefit === index 
                      ? `0 20px 60px ${benefit.glowColor}` 
                      : '0 8px 32px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Animated Background Gradient */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0`}
                    animate={{
                      opacity: hoveredBenefit === index ? 0.1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  <CardContent className="p-8 relative z-10">
                    {/* Icon with Glow */}
                    <motion.div
                      animate={{
                        rotate: hoveredBenefit === index ? 360 : 0,
                        scale: hoveredBenefit === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 relative`}
                      style={{
                        boxShadow: hoveredBenefit === index 
                          ? `0 10px 40px ${benefit.glowColor}` 
                          : '0 4px 20px rgba(0,0,0,0.3)'
                      }}
                    >
                      <benefit.icon className="w-8 h-8 text-white" />
                      {/* Pulse Effect */}
                      {hoveredBenefit === index && (
                        <motion.div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.color}`}
                          animate={{
                            scale: [1, 1.5],
                            opacity: [0.5, 0],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                          }}
                        />
                      )}
                    </motion.div>

                    {/* Stat */}
                    <div className="text-5xl font-black text-white mb-2">
                      {benefit.stat}
                      {benefit.suffix && <span className="text-3xl text-blue-300">{benefit.suffix}</span>}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-blue-200/80 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center gap-2 text-blue-300"
        >
          <span className="text-sm font-medium">Role para continuar</span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-blue-400 flex items-start justify-center p-2"
            animate={{
              borderColor: ['rgba(59,130,246,0.5)', 'rgba(59,130,246,1)', 'rgba(59,130,246,0.5)'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-blue-400 rounded-full"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
