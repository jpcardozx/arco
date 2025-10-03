'use client';

/**
 * ENHANCED HERO - Tailwind v4 + shadcn patterns
 * Zero inline styles, design tokens unificados
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Zap,
  ChevronDown,
  Crown,
  TrendingUp,
  Users,
  type LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedHeroProps {
  badge?: {
    text: string;
  };
  title: string;
  subtitle?: string;
  primaryCta?: {
    text: string;
  };
  secondaryCta?: {
    text: string;
  };
}

const StatsCard = ({
  value,
  label,
  icon: Icon,
  delay = 0
}: {
  value: string;
  label: string;
  icon: LucideIcon;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: 'spring', stiffness: 200 }}
    className="arco-glass rounded-xl p-4 relative overflow-hidden group hover:scale-105 transition-transform duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10 flex items-start gap-3">
      <div className="p-2 rounded-lg bg-arco-teal-500/20">
        <Icon className="w-5 h-5 text-arco-teal-400" aria-hidden="true" />
      </div>
      <div>
        <div className="text-2xl font-bold text-white"><>{value}</></div>
        <div className="text-sm text-neutral-400"><>{label}</></div>
      </div>
    </div>
  </motion.div>
);

export const EnhancedHero: React.FC<EnhancedHeroProps> = ({
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({
            x: (e.clientX - window.innerWidth / 2) / 50,
            y: (e.clientY - window.innerHeight / 2) / 50
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { value: '350%', label: 'Mais Leads', icon: TrendingUp },
    { value: '48h', label: 'Implementação', icon: Zap },
    { value: '200+', label: 'Empresas', icon: Users }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden arco-hero-bg">

      {/* Interactive spotlight */}
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 8 + 50}% ${mousePosition.y * 8 + 50}%, rgba(20, 184, 166, 0.15), transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="arco-container arco-section relative z-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <Badge className="arco-cta-primary border-0 px-6 py-3 text-white font-semibold">
                  <Crown className="w-4 h-4 mr-2" />
                  <>{badge.text}</>
                </Badge>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-neutral-300 max-w-xl"
              >
                {subtitle}
              </motion.p>
            )}

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {primaryCta && (
                <Button
                  size="lg"
                  onClick={() => {
                    const el = document.getElementById('roi-calculator');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="arco-cta-primary border-0 px-8 py-6 text-lg font-bold text-white"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  <>{primaryCta.text}</>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}

              {secondaryCta && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    const el = document.getElementById('social-proof');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="arco-glass border-arco-neutral-600 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
                >
                  <>{secondaryCta.text}</>
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* Right: Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="grid gap-4"
          >
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                delay={0.7 + index * 0.1}
              />
            ))}

            {/* Live indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="arco-glass rounded-xl p-6 relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-arco-emerald-500 rounded-full"
                />
                <div>
                  <div className="text-sm font-semibold text-white"><>Sistema Ativo</></div>
                  <div className="text-xs text-neutral-400"><>Gerando leads 24/7</></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
      >
        <span className="text-sm font-medium"><>Descobrir mais</></span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="p-2 rounded-full arco-glass group-hover:bg-white/10 transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-arco-neutral-950/60 to-transparent pointer-events-none" />
    </section>
  );
};

export default EnhancedHero;
