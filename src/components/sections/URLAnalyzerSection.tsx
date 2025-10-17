/**
 * URL ANALYZER SECTION
 * Lead magnet técnico com design profissional
 * Copy maduro sem promessas vazias
 * 
 * UPDATED: Agora captura dados imediatamente via API
 */
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  Activity,
  FileSearch,
  ShieldCheck,
  MousePointerClick,
  AlertCircle,
  Globe,
  Zap,
  Lock,
  Eye,
  X
} from 'lucide-react';
import { 
  getOrCreateSessionId, 
  getBrowserFingerprint, 
  getUTMParams,
  getRequestMetadata 
} from '@/lib/utils/session';

interface AnalysisMetric {
  icon: React.ElementType;
  label: string;
  technical: string;
}

export function URLAnalyzerSection() {
  const [domain, setDomain] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [captureError, setCaptureError] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [lastAnalyzedDomain, setLastAnalyzedDomain] = useState('');

  // Initialize session ID on mount
  useEffect(() => {
    const id = getOrCreateSessionId();
    setSessionId(id);
  }, []);

  const analysisMetrics: AnalysisMetric[] = [
    {
      icon: Activity,
      label: 'Performance',
      technical: 'LCP, FID, CLS'
    },
    {
      icon: FileSearch,
      label: 'SEO',
      technical: 'Meta, Schema, Indexação'
    },
    {
      icon: ShieldCheck,
      label: 'Segurança',
      technical: 'HTTPS, Headers, CSP'
    },
    {
      icon: MousePointerClick,
      label: 'Usabilidade',
      technical: 'Acessibilidade, UX'
    }
  ];

  const validateDomain = (value: string) => {
    if (!value) {
      setValidationError('');
      return false;
    }
    
    const cleanDomain = value.replace(/^(https?:\/\/)?(www\.)?/, '');
    // Updated regex to accept .com.br, .co.uk, and other multi-part TLDs
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?(\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?)*\.[a-zA-Z]{2,}$/;
    
    if (!domainRegex.test(cleanDomain)) {
      setValidationError('Domínio inválido (ex: exemplo.com.br)');
      return false;
    }
    
    setValidationError('');
    return true;
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDomain(value);
    if (value.length > 3) {
      validateDomain(value);
    } else {
      setValidationError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain || !validateDomain(domain)) return;
    
    // Prevent double submission
    if (isAnalyzing) return;
    
    setIsAnalyzing(true);
    setCaptureError('');
    
    const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
    
    try {
      // Capture data via API
      const response = await fetch('/api/domain/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: cleanDomain,
          sessionId,
          fingerprint: getBrowserFingerprint(),
          source: 'url_analyzer',
          metadata: {
            ...getUTMParams(),
            ...getRequestMetadata(),
            referer: document.referrer,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Falha ao capturar análise');
      }

      // Show results modal instead of redirecting
      setLastAnalyzedDomain(cleanDomain);
      
      // Small delay to ensure UI updates
      setTimeout(() => {
        setShowResultsModal(true);
        setIsAnalyzing(false);
      }, 300);
      
    } catch (error) {
      console.error('[URLAnalyzer] Capture error:', error);
      setCaptureError('Erro ao processar. Por favor, tente novamente.');
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Layered Effects */}
      <div className="absolute inset-0">
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/10 rounded-full blur-[120px]" />
        {/* Bottom accent */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 px-3 py-1.5 text-xs font-medium border-slate-700/50 bg-slate-800/50 text-slate-300 backdrop-blur-sm">
              Análise Técnica
            </Badge>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-[1.15]">
              Diagnóstico técnico do seu site
            </h2>
            
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto">
              Análise automatizada de performance, SEO e acessibilidade. 
              Sem cadastro, resultados em navegador.
            </p>
          </motion.div>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className={`
            backdrop-blur-xl border shadow-2xl transition-all duration-300 overflow-hidden
            ${isFocused 
              ? 'bg-slate-900/80 border-teal-500/40 shadow-teal-500/10' 
              : 'bg-slate-900/60 border-slate-700/50 hover:border-slate-600/50'
            }
          `}>
            <CardContent className="p-8 sm:p-10">
              {/* Input Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-medium mb-3">
                    Domínio
                  </label>
                  
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                    
                    <input
                      type="text"
                      placeholder="exemplo.com.br"
                      value={domain}
                      onChange={handleDomainChange}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      className={`
                        w-full pl-12 pr-12 py-3.5 rounded-lg text-white text-base
                        placeholder:text-slate-500 transition-all duration-200
                        ${isFocused 
                          ? 'bg-slate-800/80 border-2 border-teal-500/50 ring-4 ring-teal-500/10' 
                          : 'bg-slate-800/50 border-2 border-slate-700/50 hover:border-slate-600/50'
                        }
                        ${validationError ? 'border-red-500/50 ring-red-500/10' : ''}
                        focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
                      `}
                      disabled={isAnalyzing}
                      autoComplete="off"
                      spellCheck="false"
                    />
                    
                    {/* Success Indicator */}
                    <AnimatePresence>
                      {domain && !validationError && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          <CheckCircle2 className="w-5 h-5 text-teal-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Validation Error */}
                  <AnimatePresence>
                    {validationError && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-red-400 mt-2"
                      >
                        {validationError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Capture Error Alert */}
                <AnimatePresence>
                  {captureError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-start gap-2 p-3 rounded-lg bg-orange-900/20 border border-orange-700/30"
                    >
                      <AlertCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-orange-300">{captureError}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <Button 
                  type="submit" 
                  disabled={isAnalyzing || !domain || !!validationError}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium py-3.5 text-base rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-900/20 hover:shadow-teal-900/30"
                >
                  {isAnalyzing ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Search className="w-4 h-4" />
                      </motion.div>
                      <span>Salvando análise...</span>
                    </motion.div>
                  ) : (
                    <>
                      Analisar Site
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {/* Analysis Scope */}
              <div className="mt-8 pt-8 border-t border-slate-800">
                <p className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-4">
                  Pontos analisados
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  {analysisMetrics.map((metric, index) => {
                    const Icon = metric.icon as React.FC<{ className?: string }>;
                    return (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * index }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-700/40"
                      >
                        <div className="p-1.5 rounded bg-slate-700/50">
                          <Icon className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-slate-300 mb-0.5">
                            {metric.label}
                          </h4>
                          <p className="text-[10px] text-slate-500 leading-tight">
                            {metric.technical}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer Note */}
                <p className="text-[11px] text-slate-500 leading-relaxed mt-6 text-center">
                  Análise via Lighthouse. Sem coleta de dados pessoais.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technical Foundation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="text-xs text-slate-500">Powered by</span>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-400 font-mono">Lighthouse</span>
              <span className="text-slate-700">•</span>
              <span className="text-xs text-slate-400 font-mono">Web Vitals</span>
              <span className="text-slate-700">•</span>
              <span className="text-xs text-slate-400 font-mono">PageSpeed</span>
            </div>
          </div>
        </motion.div>

        {/* Results Modal - Elegant Beta Version */}
        <AnimatePresence>
          {showResultsModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowResultsModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Accent border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none" />

                {/* Header */}
                <div className="relative z-10 px-6 py-5 border-b border-slate-700/50 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-teal-400" />
                      <h3 className="text-lg font-bold text-white">Análise Iniciada</h3>
                    </div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span className="text-xs font-medium text-amber-300">Versão Beta</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowResultsModal(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                {/* Content */}
                <div className="relative z-10 px-6 py-6 space-y-6">
                  {/* Domain Display */}
                  <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Domínio Analisado</p>
                    <p className="text-lg font-semibold text-white font-mono break-all">{lastAnalyzedDomain}</p>
                  </div>

                  {/* Analysis Metrics Grid */}
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-3">Dados Coletados</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:border-teal-500/30 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <Activity className="w-4 h-4 text-teal-400" />
                          <span className="text-xs font-medium text-slate-300">Performance</span>
                        </div>
                        <p className="text-xs text-slate-500">Core Web Vitals</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:border-teal-500/30 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <FileSearch className="w-4 h-4 text-cyan-400" />
                          <span className="text-xs font-medium text-slate-300">SEO</span>
                        </div>
                        <p className="text-xs text-slate-500">Meta Tags, Schema</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:border-teal-500/30 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <Lock className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-medium text-slate-300">Segurança</span>
                        </div>
                        <p className="text-xs text-slate-500">HTTPS, Headers</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:border-teal-500/30 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <Eye className="w-4 h-4 text-violet-400" />
                          <span className="text-xs font-medium text-slate-300">UX</span>
                        </div>
                        <p className="text-xs text-slate-500">Acessibilidade</p>
                      </div>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <div className="flex gap-3">
                      <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-blue-300 mb-1">Recurso em Desenvolvimento</p>
                        <p className="text-xs text-blue-200/70 leading-relaxed">
                          Relatório completo em breve. Por enquanto, dados básicos de auditoria pública.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-4">
                    <button
                      onClick={() => setShowResultsModal(false)}
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium text-sm transition-all shadow-lg shadow-teal-900/20 hover:shadow-teal-900/30"
                    >
                      Entendido
                    </button>
                    <button
                      onClick={() => setShowResultsModal(false)}
                      className="w-full px-4 py-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 font-medium text-sm transition-colors border border-slate-700/50 hover:border-slate-600/50"
                    >
                      Fechar
                    </button>
                  </div>

                  {/* Footer Note */}
                  <p className="text-center text-[11px] text-slate-500">
                    Análise via Lighthouse • Sem coleta de dados pessoais
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
