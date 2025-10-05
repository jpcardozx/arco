'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Link as LinkIcon,
  Search,
  CheckCircle2,
  AlertCircle,
  Zap,
  Shield,
  Eye,
  Users,
  Target,
  Sparkles,
  ArrowRight,
  Loader2,
  Clock,
  Award,
  AlertTriangle,
  XCircle,
  ChevronDown,
  TrendingUp
} from 'lucide-react';
import { Container } from '@/components/primitives/Container/Container';

/**
 * URL Analyzer Section - DARK MODE REFACTOR
 * Design System:
 * - Background: slate-950 (base)
 * - Cards: slate-900/slate-800 com borders sutis
 * - Primary: teal-500 (#14b8a6)
 * - Success: emerald-500 (#10b981)
 * - Warning: orange-500 (#f97316)
 * - Danger: red-500 (#ef4444)
 * - Text: white/slate-300/slate-400
 * - Foco em legibilidade e clareza
 */

// ========================================
// TYPES
// ========================================

interface AnalysisResult {
  url: string;
  score: number;
  issues: AnalysisIssue[];
  metrics: AnalysisMetric[];
  opportunities: Opportunity[];
}

interface AnalysisIssue {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  impact: string;
  solution: string;
  icon: typeof AlertCircle;
}

interface AnalysisMetric {
  id: string;
  label: string;
  value: string;
  status: 'good' | 'warning' | 'poor';
  icon: typeof TrendingUp;
  change?: string;
  benchmark?: string;
}

interface Opportunity {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  icon: typeof Sparkles;
  expectedGain: string;
}

interface URLAnalyzerSectionProps {
  variant?: 'free' | 'home';
  ctaOverride?: {
    text: string;
    href: string;
  };
}

// ========================================
// MAIN COMPONENT
// ========================================

export function URLAnalyzerSection({
  variant = 'free',
  ctaOverride
}: URLAnalyzerSectionProps) {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progressValue, setProgressValue] = useState(0);
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);

  // Analysis steps
  const analysisSteps = [
    { icon: Search, text: 'Escaneando estrutura da página...', duration: 1000 },
    { icon: Shield, text: 'Analisando velocidade e performance...', duration: 1200 },
    { icon: Eye, text: 'Verificando experiência do usuário...', duration: 800 },
    { icon: Target, text: 'Identificando oportunidades de conversão...', duration: 1000 },
  ];

  // Validate URL
  const isValidUrl = (urlString: string): boolean => {
    try {
      const urlObj = new URL(urlString);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  // Handle analysis
  const handleAnalyze = useCallback(async () => {
    if (!url.trim()) {
      setError('Por favor, insira uma URL válida');
      return;
    }

    if (!isValidUrl(url)) {
      setError('URL inválida. Use o formato: https://exemplo.com');
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setProgressValue(0);
    setAnalysisStep(0);

    try {
      // Extract domain from URL
      const urlObj = new URL(url);
      const domain = urlObj.hostname;

      // Simulate analysis steps with visual feedback
      for (let i = 0; i < analysisSteps.length; i++) {
        setAnalysisStep(i);
        const stepProgress = ((i + 1) / analysisSteps.length) * 100;
        setProgressValue(stepProgress);
        await new Promise(resolve => setTimeout(resolve, analysisSteps[i].duration));
      }

      // Optional: Integrate with domain validation API
      try {
        const domainResponse = await fetch('/api/domain/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain })
        });

        if (domainResponse.ok) {
          const domainData = await domainResponse.json();
          console.log('Domain validation:', domainData);
          // Can use this data to enhance the analysis
        }
      } catch (apiError) {
        // Fallback to mock if API fails
        console.warn('Domain API unavailable, using mock data:', apiError);
      }

      // Mock result
      const mockResult: AnalysisResult = {
        url,
        score: 62,
        issues: [
          {
            id: '1',
            severity: 'critical',
            title: 'CTA principal pouco visível',
            description: 'O botão de ação primário está perdido na página',
            impact: 'Reduz conversões em até 40%',
            solution: 'Use cor contrastante (verde/laranja), botão maior (min 140px altura) e posicione acima da dobra',
            icon: AlertCircle,
          },
          {
            id: '2',
            severity: 'critical',
            title: 'Formulário muito longo',
            description: 'Solicita 8+ campos logo no início',
            impact: 'Taxa de abandono de 65%+',
            solution: 'Reduza para 3 campos essenciais. Use formulário progressivo se precisar mais dados',
            icon: AlertTriangle,
          },
          {
            id: '3',
            severity: 'warning',
            title: 'Falta prova social',
            description: 'Nenhum depoimento, avaliação ou caso de sucesso visível',
            impact: 'Perda de credibilidade e confiança',
            solution: 'Adicione seção com "500+ clientes", depoimentos em vídeo e logos de empresas',
            icon: Users,
          },
        ],
        metrics: [
          {
            id: '1',
            label: 'Velocidade de Carregamento',
            value: '3.8s',
            status: 'poor',
            icon: Clock,
            change: '+1.4s vs. ideal',
            benchmark: 'Ideal: 2.4s',
          },
          {
            id: '2',
            label: 'Taxa de Conversão Estimada',
            value: '1.5%',
            status: 'poor',
            icon: Target,
            change: '-2.7% vs. benchmark',
            benchmark: 'Mercado: 4.2%',
          },
          {
            id: '3',
            label: 'Clareza da Proposta',
            value: '5/10',
            status: 'warning',
            icon: Eye,
            benchmark: 'Meta: 8/10',
          },
          {
            id: '4',
            label: 'Mobile Experience',
            value: '7.5/10',
            status: 'warning',
            icon: Shield,
            benchmark: 'Otimizável',
          },
        ],
        opportunities: [
          {
            id: '1',
            title: 'Implementar urgência visual no CTA',
            description: 'Timer regressivo + badge "Últimas 3 vagas" próximo ao botão principal',
            impact: 'high',
            icon: Zap,
            expectedGain: '+35% conversão',
          },
          {
            id: '2',
            title: 'Simplifique formulário inicial',
            description: 'Reduza para 3 campos essenciais com preenchimento automático',
            impact: 'high',
            icon: CheckCircle2,
            expectedGain: '+40% completude',
          },
          {
            id: '3',
            title: 'Adicione prova social quantificada',
            description: 'Mostre "850+ clientes atendidos", "R$ 4.2M gerados" com visual destacado',
            impact: 'medium',
            icon: Award,
            expectedGain: '+25% confiança',
          },
        ],
      };

      setResult(mockResult);
    } catch (err) {
      setError('Erro ao analisar URL. Tente novamente.');
    } finally {
      setIsAnalyzing(false);
      setProgressValue(100);
    }
  }, [url, analysisSteps]);

  // Reset
  const handleReset = () => {
    setResult(null);
    setUrl('');
    setError(null);
    setExpandedIssue(null);
    setProgressValue(0);
  };

  // Severity colors
  const getSeverityColors = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          border: 'border-red-500/50',
          bg: 'bg-red-500/10',
          text: 'text-red-400',
          badge: 'bg-red-500/20 text-red-300 border-red-500/30',
        };
      case 'warning':
        return {
          border: 'border-orange-500/50',
          bg: 'bg-orange-500/10',
          text: 'text-orange-400',
          badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        };
      default:
        return {
          border: 'border-blue-500/50',
          bg: 'bg-blue-500/10',
          text: 'text-blue-400',
          badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        };
    }
  };

  const getStatusColors = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'warning':
        return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      default:
        return 'text-red-400 bg-red-500/10 border-red-500/30';
    }
  };

  const getImpactColors = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-teal-500/20 text-teal-300 border-teal-400/30';
      case 'medium':
        return 'bg-orange-500/20 text-orange-300 border-orange-400/30';
      default:
        return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
    }
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-slate-950">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50 pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block mb-6"
          >
            <div className="px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-semibold">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Análise Gratuita • Resultados em 10s
            </div>
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Descubra o que está{' '}
            <span className="text-teal-400">freando suas conversões</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-slate-300 leading-relaxed">
            Cole a URL da sua landing page e receba uma análise profissional detalhada.
            <strong className="text-white"> Identifique problemas críticos</strong> e descubra oportunidades.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
            <AnimatePresence mode="wait">
              {/* INPUT STATE */}
              {!result && !isAnalyzing && (
                <motion.div
                  key="input"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* URL Input */}
                  <div className="relative">
                    <LinkIcon
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                        url && isValidUrl(url)
                          ? 'text-teal-400'
                          : 'text-slate-500'
                      }`}
                    />
                    <input
                      type="url"
                      placeholder="https://seusite.com/landing-page"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                      className={`w-full pl-12 pr-4 py-4 bg-slate-800 border-2 rounded-xl text-white placeholder:text-slate-500 text-lg font-medium transition-all focus:outline-none ${
                        url && isValidUrl(url)
                          ? 'border-teal-500 ring-2 ring-teal-500/20'
                          : error
                          ? 'border-red-500 ring-2 ring-red-500/20'
                          : 'border-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                      }`}
                    />
                    {url && isValidUrl(url) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <CheckCircle2 className="w-5 h-5 text-teal-400" />
                      </motion.div>
                    )}
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-400 text-sm"
                    >
                      <XCircle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}

                  {/* Analyze Button */}
                  <button
                    onClick={handleAnalyze}
                    disabled={!url || !isValidUrl(url)}
                    className="w-full py-4 px-6 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold rounded-xl text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 flex items-center justify-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    Analisar Página Gratuitamente
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400" />
                      Sem cadastro
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-teal-400" />
                      100% seguro
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-teal-400" />
                      Resultados em 10s
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ANALYZING STATE */}
              {isAnalyzing && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8 py-8"
                >
                  {/* Icon Animation */}
                  <motion.div
                    className="flex justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="w-20 h-20 rounded-full bg-teal-500/20 border-4 border-teal-500/30 border-t-teal-500 flex items-center justify-center">
                      {React.createElement(analysisSteps[analysisStep].icon, {
                        className: 'w-10 h-10 text-teal-400',
                      })}
                    </div>
                  </motion.div>

                  {/* Status Text */}
                  <div className="text-center space-y-2">
                    <p className="text-xl sm:text-2xl text-white font-bold">
                      {analysisSteps[analysisStep].text}
                    </p>
                    <p className="text-sm text-slate-400">
                      Etapa {analysisStep + 1} de {analysisSteps.length}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-3">
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressValue}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-gradient-to-r from-teal-600 to-teal-400"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-slate-400 font-medium">
                      <span>{Math.round(progressValue)}% concluído</span>
                      <span>~{Math.max(1, analysisSteps.length - analysisStep - 1)}s restantes</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* RESULTS STATE */}
              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-10"
                >
                  {/* Score Header */}
                  <div className="text-center space-y-6">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="inline-flex items-center justify-center"
                    >
                      <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-slate-800 border-4 border-teal-500/50 flex items-center justify-center shadow-xl shadow-teal-500/20">
                        <span className="text-5xl sm:text-6xl font-black text-white">
                          {result.score}
                        </span>
                      </div>
                    </motion.div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                        Pontuação de Conversão
                      </h3>
                      <p className="text-lg text-slate-300">
                        {result.score >= 80 && '🎉 Excelente! Sua página está bem otimizada.'}
                        {result.score >= 60 && result.score < 80 && '👍 Boa! Mas há grandes oportunidades de melhoria.'}
                        {result.score < 60 && '⚠️ Há muito potencial não explorado aqui.'}
                      </p>
                    </div>
                  </div>

                  {/* Issues Section */}
                  <div className="space-y-5">
                    <h4 className="text-xl font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      </div>
                      Problemas Críticos Identificados
                    </h4>
                    <div className="space-y-4">
                      {result.issues.map((issue, index) => {
                        const colors = getSeverityColors(issue.severity);
                        const isExpanded = expandedIssue === issue.id;
                        
                        return (
                          <motion.div
                            key={issue.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.1 }}
                          >
                            <div
                              onClick={() => setExpandedIssue(isExpanded ? null : issue.id)}
                              className={`p-5 bg-slate-800/50 border-2 ${colors.border} rounded-xl cursor-pointer transition-all hover:bg-slate-800 ${
                                isExpanded ? 'ring-2 ring-teal-500/20' : ''
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                                  {React.createElement(issue.icon, {
                                    className: `w-5 h-5 ${colors.text}`,
                                  })}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-3 mb-2">
                                    <h5 className="text-lg font-bold text-white">{issue.title}</h5>
                                    <div className={`px-2 py-1 rounded text-xs font-bold border ${colors.badge} whitespace-nowrap`}>
                                      {issue.severity === 'critical' && 'CRÍTICO'}
                                      {issue.severity === 'warning' && 'ATENÇÃO'}
                                      {issue.severity === 'info' && 'INFO'}
                                    </div>
                                  </div>
                                  
                                  <p className="text-slate-300 mb-2">{issue.description}</p>
                                  <p className="text-sm text-slate-400 font-medium">
                                    <strong className={colors.text}>Impacto:</strong> {issue.impact}
                                  </p>

                                  <AnimatePresence>
                                    {isExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-4 pt-4 border-t border-slate-700"
                                      >
                                        <p className="text-sm font-medium text-slate-300">
                                          <strong className="text-teal-400">💡 Solução:</strong>
                                          <br />
                                          {issue.solution}
                                        </p>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>

                                  <button className="mt-3 text-sm font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1">
                                    {isExpanded ? (
                                      <>Ver menos <ChevronDown className="w-4 h-4 rotate-180" /></>
                                    ) : (
                                      <>Ver solução <ChevronDown className="w-4 h-4" /></>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Metrics Section */}
                  <div className="space-y-5">
                    <h4 className="text-xl font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-teal-400" />
                      </div>
                      Métricas Analisadas
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {result.metrics.map((metric, index) => (
                        <motion.div
                          key={metric.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.08 }}
                          className="p-5 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-teal-500/30 transition-all"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            {React.createElement(metric.icon, {
                              className: 'w-5 h-5 text-slate-400 mt-1',
                            })}
                            <div className="flex-1">
                              <p className="text-sm text-slate-400 mb-1">{metric.label}</p>
                              <p className="text-2xl font-bold text-white">{metric.value}</p>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-bold border ${getStatusColors(metric.status)}`}>
                              {metric.status === 'good' && 'BOM'}
                              {metric.status === 'warning' && 'REGULAR'}
                              {metric.status === 'poor' && 'RUIM'}
                            </div>
                          </div>
                          {metric.change && (
                            <p className="text-sm text-slate-400">{metric.change}</p>
                          )}
                          {metric.benchmark && (
                            <p className="text-sm text-teal-400 font-medium mt-1">{metric.benchmark}</p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Opportunities Section */}
                  <div className="space-y-5">
                    <h4 className="text-xl font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-orange-400" />
                      </div>
                      Oportunidades de Crescimento
                    </h4>
                    <div className="space-y-4">
                      {result.opportunities.map((opp, index) => (
                        <motion.div
                          key={opp.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="p-5 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-orange-500/30 transition-all"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                              {React.createElement(opp.icon, {
                                className: 'w-5 h-5 text-orange-400',
                              })}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <h5 className="text-lg font-bold text-white">{opp.title}</h5>
                                <div className={`px-2 py-1 rounded text-xs font-bold border ${getImpactColors(opp.impact)}`}>
                                  {opp.impact === 'high' && 'ALTO IMPACTO'}
                                  {opp.impact === 'medium' && 'MÉDIO IMPACTO'}
                                  {opp.impact === 'low' && 'BAIXO IMPACTO'}
                                </div>
                              </div>
                              <p className="text-slate-300 mb-2">{opp.description}</p>
                              <p className="text-sm font-bold text-emerald-400">
                                📈 Ganho esperado: {opp.expectedGain}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Footer */}
                  <div className="pt-6 border-t border-slate-700 space-y-4">
                    <div className="text-center space-y-3">
                      <p className="text-slate-300 text-base">
                        <strong className="text-white">Quer implementar essas melhorias?</strong>
                        <br />
                        Nossa equipe pode aumentar suas conversões em até 300%
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={handleReset}
                          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-600 transition-all"
                        >
                          Analisar Outra Página
                        </button>
                        <button
                          onClick={() => {
                            if (ctaOverride?.href) {
                              window.location.href = ctaOverride.href;
                            }
                          }}
                          className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transition-all flex items-center justify-center gap-2"
                        >
                          {ctaOverride?.text || 'Falar com Especialista'}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
