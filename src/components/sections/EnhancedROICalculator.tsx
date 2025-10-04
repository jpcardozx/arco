'use client';

/**
 * ENHANCED ROI CALCULATOR - v2.1 S-Tier
 * Background: FloatingShapes para interatividade visual
 * Otimizado para legibilidade e conversão
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Calculator,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Zap,
  Info,
  ArrowRight,
  DollarSign,
  BarChart,
  Target,
} from 'lucide-react';

interface CalculatorInputs {
  monthlyRevenue: number;
  currentLoadTime: number;
  mobileTrafficPercentage: number;
  industry: string;
}

interface ROIResults {
  currentLoss: number;
  potentialRecovery: number;
  annualRecovery: number;
  roi: number;
  paybackPeriod: number;
}

const industryMultipliers = {
  ecommerce: { base: 1.2, mobile: 1.4 },
  saas: { base: 1.0, mobile: 1.1 },
  finance: { base: 1.3, mobile: 1.6 },
  healthcare: { base: 0.9, mobile: 1.2 },
  education: { base: 0.8, mobile: 1.0 },
  real_estate: { base: 1.1, mobile: 1.3 },
};

// Background Component: Floating Shapes
const FloatingShapesBg: React.FC = () => {
  const shapes = useMemo(() => [
    { id: 1, x: 10, y: 20, size: 120, color: '#14b8a6', opacity: 0.15 },
    { id: 2, x: 85, y: 15, size: 90, color: '#f97316', opacity: 0.12 },
    { id: 3, x: 50, y: 70, size: 100, color: '#8b5cf6', opacity: 0.1 },
    { id: 4, x: 20, y: 80, size: 80, color: '#14b8a6', opacity: 0.08 },
    { id: 5, x: 75, y: 60, size: 70, color: '#f97316', opacity: 0.1 },
  ], []);

  const [props, set] = useSpring(() => ({ 
    xy: [0, 0],
    config: { mass: 20, tension: 80, friction: 100 }
  }));

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      onMouseMove={({ clientX, clientY }) => {
        const x = (clientX - window.innerWidth / 2) / 50;
        const y = (clientY - window.innerHeight / 2) / 50;
        set({ xy: [x, y] });
      }}
    >
      {shapes.map(shape => (
        <animated.div
          key={shape.id}
          style={{
            position: 'absolute',
            top: `${shape.y}%`,
            left: `${shape.x}%`,
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
            borderRadius: '50%',
            filter: 'blur(40px)',
            opacity: shape.opacity,
            transform: props.xy.to((x, y) => `translate3d(${x * (shape.size / 100)}px, ${y * (shape.size / 100)}px, 0)`),
            willChange: 'transform'
          }}
        />
      ))}
    </div>
  );
};

export const EnhancedROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyRevenue: 100000,
    currentLoadTime: 3.2,
    mobileTrafficPercentage: 60,
    industry: 'ecommerce',
  });
  const [results, setResults] = useState<ROIResults | null>(null);

  const calculateROI = (): ROIResults => {
    const { monthlyRevenue, currentLoadTime, mobileTrafficPercentage, industry } = inputs;
    const multiplier = industryMultipliers[industry as keyof typeof industryMultipliers];

    const loadTimeImpact = Math.min((currentLoadTime - 1.8) * 0.07, 0.4);
    const mobileImpact = (mobileTrafficPercentage / 100) * multiplier.mobile;
    const desktopImpact = ((100 - mobileTrafficPercentage) / 100) * multiplier.base;

    const totalImpactFactor = Math.max(0, loadTimeImpact * (mobileImpact + desktopImpact));
    const currentLoss = monthlyRevenue * totalImpactFactor;
    const potentialRecovery = currentLoss * 0.8;
    const annualRecovery = potentialRecovery * 12;

    const optimizationCost = 15000;
    const roi = annualRecovery > 0 ? (annualRecovery / optimizationCost) * 100 : 0;
    const paybackPeriod = potentialRecovery > 0 ? optimizationCost / potentialRecovery : 0;

    return {
      currentLoss: Math.round(currentLoss),
      potentialRecovery: Math.round(potentialRecovery),
      annualRecovery: Math.round(annualRecovery),
      roi: Math.round(roi),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
    };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputs.monthlyRevenue > 0) {
        setResults(calculateROI());
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputs]);

  const handleInputChange = (field: keyof CalculatorInputs, value: number | string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="roi-calculator" className="arco-section relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-18 sm:py-24 lg:py-32">
      {/* Floating Shapes Background - Interactive */}
      <FloatingShapesBg />

      {/* Premium Dark Background with Depth */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Foundation gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        {/* Multi-layer radial gradients */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-teal-500/30 rounded-full filter blur-3xl" />
          <div className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 bg-orange-500/20 rounded-full filter blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-teal-600/15 rounded-full filter blur-3xl" />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(20, 184, 166, 0.15) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(20, 184, 166, 0.15) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient opacity-40"
             style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)' }}
        />
      </div>

      <div className="arco-container relative z-10 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <Badge variant="outline" className="border-teal-400/40 bg-teal-500/20 text-teal-300 px-6 py-3 text-sm font-bold shadow-lg">
            <Calculator className="w-4 h-4 mr-2" />
            Diagnóstico Financeiro
          </Badge>

          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Sua performance é um <span className="text-teal-400">freio de mão</span> financeiro?
          </h2>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Descubra em 60 segundos o potencial de receita que a otimização de performance pode desbloquear para o seu negócio.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 h-full shadow-2xl hover:bg-white/8 transition-all duration-300 group">
              <CardContent className="p-6 sm:p-8 space-y-6 sm:space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-500/20 border border-teal-500/30">
                      <BarChart className="w-5 h-5 text-teal-400" />
                    </div>
                    <span className="hidden sm:inline">Parâmetros do seu Negócio</span>
                    <span className="sm:hidden">Seus Dados</span>
                  </h3>
                  <Badge variant="outline" className="border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    Rápido
                  </Badge>
                </div>

                <div className="space-y-5 sm:space-y-6">
                  {/* Monthly Revenue */}
                  <motion.div 
                    className="space-y-3"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Label htmlFor="revenue" className="text-slate-200 font-semibold flex items-center gap-2 text-sm sm:text-base">
                      <DollarSign className="w-4 h-4 text-teal-400" />
                      Receita mensal do site
                    </Label>
                    <div className="relative group/input">
                      <Input
                        id="revenue"
                        type="number"
                        value={inputs.monthlyRevenue}
                        onChange={(e) => handleInputChange('monthlyRevenue', parseInt(e.target.value) || 0)}
                        className="text-base sm:text-lg bg-slate-900/60 border-slate-600/30 text-white focus:border-teal-500 focus:ring-teal-500/50 transition-all duration-200 hover:bg-slate-900/80 pl-4 pr-12 h-12 sm:h-14"
                        placeholder="100000"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">
                        R$
                      </div>
                    </div>
                  </motion.div>

                  {/* Load Time */}
                  <motion.div 
                    className="space-y-3"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="loadtime" className="text-slate-200 font-semibold flex items-center gap-2 cursor-help text-sm sm:text-base">
                            <TrendingUp className="w-4 h-4 text-orange-400" />
                            LCP atual (segundos)
                            <Info className="w-4 h-4 text-slate-400 hover:text-teal-400 transition-colors" />
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-800 border border-white/10 text-white max-w-xs">
                          <p className="text-sm">Largest Contentful Paint: tempo que o maior elemento da página leva para carregar.</p>
                          <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer" className="text-teal-400 underline hover:text-teal-300 text-sm mt-2 inline-block">
                            Meça aqui no PageSpeed Insights →
                          </a>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <div className="relative group/input">
                      <Input
                        id="loadtime"
                        type="number"
                        step="0.1"
                        value={inputs.currentLoadTime}
                        onChange={(e) => handleInputChange('currentLoadTime', parseFloat(e.target.value) || 0)}
                        className="text-base sm:text-lg bg-slate-900/60 border-slate-600/30 text-white focus:border-teal-500 focus:ring-teal-500/50 transition-all duration-200 hover:bg-slate-900/80 pl-4 pr-12 h-12 sm:h-14"
                        placeholder="3.2"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">
                        seg
                      </div>
                    </div>
                    {inputs.currentLoadTime > 2.5 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-xs text-orange-400"
                      >
                        <AlertCircle className="w-3 h-3" />
                        <span>Acima do ideal - oportunidade de melhoria!</span>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Mobile Traffic */}
                  <motion.div 
                    className="space-y-3"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Label htmlFor="mobile" className="text-slate-200 font-semibold flex items-center gap-2 text-sm sm:text-base">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Tráfego mobile
                    </Label>
                    <div className="relative group/input">
                      <Input
                        id="mobile"
                        type="number"
                        min={0} 
                        max={100}
                        value={inputs.mobileTrafficPercentage}
                        onChange={(e) => handleInputChange('mobileTrafficPercentage', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="text-base sm:text-lg bg-slate-900/60 border-slate-600/30 text-white focus:border-teal-500 focus:ring-teal-500/50 transition-all duration-200 hover:bg-slate-900/80 pl-4 pr-12 h-12 sm:h-14"
                        placeholder="60"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">
                        %
                      </div>
                    </div>
                    {/* Visual range indicator */}
                    <div className="relative h-2 bg-slate-800/50 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full"
                        initial={{ width: '60%' }}
                        animate={{ width: `${inputs.mobileTrafficPercentage}%` }}
                        transition={{ type: "spring", stiffness: 100 }}
                      />
                    </div>
                  </motion.div>

                  {/* Industry */}
                  <motion.div 
                    className="space-y-3"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Label htmlFor="industry" className="text-slate-200 font-semibold flex items-center gap-2 text-sm sm:text-base">
                      <Target className="w-4 h-4 text-teal-400" />
                      Sua Indústria
                    </Label>
                    <Select
                      value={inputs.industry}
                      onValueChange={(value) => handleInputChange('industry', value)}
                    >
                      <SelectTrigger className="text-base sm:text-lg bg-slate-900/60 border-slate-600/30 text-white focus:border-teal-500 focus:ring-teal-500/50 h-12 sm:h-14 hover:bg-slate-900/80 transition-all duration-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        <SelectItem value="ecommerce" className="text-white hover:bg-slate-800 focus:bg-slate-800">
                          <span className="flex items-center gap-2">
                            🛒 E-commerce
                          </span>
                        </SelectItem>
                        <SelectItem value="saas" className="text-white hover:bg-slate-800 focus:bg-slate-800">
                          <span className="flex items-center gap-2">
                            💻 SaaS
                          </span>
                        </SelectItem>
                        <SelectItem value="finance" className="text-white hover:bg-slate-800 focus:bg-slate-800">
                          <span className="flex items-center gap-2">
                            💰 Finanças
                          </span>
                        </SelectItem>
                        <SelectItem value="healthcare" className="text-white hover:bg-slate-800 focus:bg-slate-800">
                          <span className="flex items-center gap-2">
                            🏥 Saúde
                          </span>
                        </SelectItem>
                        <SelectItem value="education" className="text-white hover:bg-slate-800 focus:bg-slate-800">
                          <span className="flex items-center gap-2">
                            📚 Educação
                          </span>
                        </SelectItem>
                        <SelectItem value="real_estate" className="text-white hover:bg-slate-800 focus:bg-slate-800">
                          <span className="flex items-center gap-2">
                            🏠 Imóveis
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-teal-600/95 via-emerald-600/95 to-teal-700/95 backdrop-blur-xl border border-teal-400/20 text-white h-full shadow-2xl group">
              {/* Subtle shine effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
              />

              <CardContent className="relative z-10 p-6 sm:p-8 space-y-5 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/20 border border-white/30">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <span className="hidden sm:inline">Seu Potencial de Crescimento</span>
                    <span className="sm:hidden">Potencial</span>
                  </h3>
                </div>

                {results ? (
                  <motion.div 
                    className="space-y-5 sm:space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Potential Recovery - Hero Metric */}
                    <motion.div 
                      className="bg-white/15 backdrop-blur-sm border border-white/30 rounded-2xl p-5 sm:p-6 text-center relative overflow-hidden group/card"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                      
                      <div className="relative z-10">
                        <div className="text-xs sm:text-sm text-white/90 mb-2 font-medium uppercase tracking-wide">
                          💰 Receita Mensal Recuperável
                        </div>
                        <motion.div 
                          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          +R$ {results.potentialRecovery.toLocaleString('pt-BR')}
                        </motion.div>
                        <div className="text-sm sm:text-base lg:text-lg text-white/80 mt-2">
                          <span className="text-white/60">ou</span> R$ {results.annualRecovery.toLocaleString('pt-BR')}{' '}
                          <span className="text-white/60">por ano</span>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <motion.div 
                        className="text-center p-4 sm:p-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all duration-300 group/metric"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                          {results.roi}%
                        </div>
                        <div className="text-xs sm:text-sm text-white/80">ROI Anual</div>
                        <div className="text-xs text-white/60 mt-1">Estimado</div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center p-4 sm:p-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all duration-300 group/metric"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                          {results.paybackPeriod}<span className="text-xl sm:text-2xl">m</span>
                        </div>
                        <div className="text-xs sm:text-sm text-white/80">Payback</div>
                        <div className="text-xs text-white/60 mt-1">Investimento</div>
                      </motion.div>
                    </div>

                    {/* Current Loss - De-emphasized */}
                    <motion.div 
                      className="text-center p-3 sm:p-4 bg-red-500/15 backdrop-blur-sm border border-red-400/30 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center justify-center gap-2 text-xs text-red-200 mb-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>Perda estimada atual</span>
                      </div>
                      <div className="text-lg sm:text-xl font-semibold text-red-100">
                        -R$ {results.currentLoss.toLocaleString('pt-BR')} <span className="text-sm">/ mês</span>
                      </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        size="lg"
                        className="w-full bg-white text-teal-700 hover:bg-slate-50 border-0 py-6 sm:py-7 text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group/button"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        <CheckCircle2 className="w-5 h-5 mr-2 group-hover/button:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Receber Análise Detalhada</span>
                        <span className="sm:hidden">Análise Gratuita</span>
                        <ArrowRight className="w-5 h-5 ml-2 group-hover/button:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>

                    <div className="flex items-center justify-center gap-2 text-xs text-white/70">
                      <CheckCircle2 className="w-3 h-3 text-white/80" />
                      <p className="text-center">
                        Análise 100% gratuita • Sem compromisso
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="flex flex-col items-center justify-center h-64 sm:h-80 text-white/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Calculator className="w-12 h-12 sm:w-16 sm:h-16 mb-4 text-white/40" />
                    <p className="text-center text-sm sm:text-base px-4">
                      Preencha os campos ao lado para <br className="hidden sm:block" />
                      <span className="text-white font-semibold">calcular seu potencial</span>
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-slate-400 text-center max-w-3xl mx-auto"
        >
          Cálculo baseado em 7% de perda de conversão por segundo de lentidão (acima de 1.8s LCP), com multiplicadores por indústria e 80% de recuperação. Valores são estimativas para fins ilustrativos.
        </motion.p>
      </div>
    </section>
  );
};

export default EnhancedROICalculator;
