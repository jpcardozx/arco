/**
 * URL ANALYZER SECTION
 * Seção dedicada para análise de domínio
 * Lead magnet com CTA para /mydomain
 */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Search, AlertCircle } from 'lucide-react';

export function URLAnalyzerSection() {
  const [domain, setDomain] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    
    setIsAnalyzing(true);
    // Redireciona para /mydomain com o domínio como query param
    setTimeout(() => {
      window.location.href = `/mydomain?domain=${encodeURIComponent(domain)}`;
    }, 800);
  };

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.15),transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-3 py-1.5 text-xs font-medium border-teal-700 bg-teal-900/30 text-teal-300">
              <Search className="w-3.5 h-3.5 mr-2" />
              Análise Gratuita
            </Badge>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Descubra o potencial do seu domínio
            </h2>
            
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Análise técnica instantânea da sua presença digital com recomendações práticas.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="seu-dominio.com.br"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    required
                    disabled={isAnalyzing}
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isAnalyzing || !domain}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Analisando...
                    </>
                  ) : (
                    <>
                      Analisar Domínio
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3 text-xs text-slate-400">
                  <AlertCircle className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  <p>
                    Análise inclui: performance, SEO técnico, acessibilidade e oportunidades de otimização.
                    Resultados disponíveis instantaneamente.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function RefreshCw({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2v6h-6"/>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
      <path d="M3 22v-6h6"/>
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
    </svg>
  );
}
