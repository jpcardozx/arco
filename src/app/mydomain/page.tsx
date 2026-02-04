'use client';


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  TrendingUp, 
  Clock, 
  Shield,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import ResultsPreviewSection from '@/components/sections/mydomain/ResultsPreviewSection';
import ComparisonBeforeAfterSection from '@/components/sections/mydomain/ComparisonBeforeAfterSection';

/**
 * MYDOMAIN PAGE - Pre-Signup Domain Capture (REFACTORED - DARK MODE)
 * 
 * Flow: URL Analyzer → /mydomain → /signup → /login → /dashboard
 * 
 * Design System (Dark Mode Clean):
 * - Background: slate-950 solid
 * - Cards: slate-900/80 + backdrop-blur-sm
 * - Borders: slate-700/50
 * - Primary CTA: teal-600 to teal-500
 * - Typography: Inter family, responsive scale
 * - Animations: opacity 0→1, y 20→0, duration 0.6s
 * 
 * PHASE 1: UI/UX Refactor ✅
 * - Removed glassmorphism
 * - Professional copy (value-oriented)
 * - Trust indicators with real numbers
 * - Improved form labels with benefits
 */

// ========================================
// SCHEMAS & TYPES
// ========================================

const preSignupSchema = z.object({
  email: z.string().email('Email inválido'),
  domain: z
    .string()
    .min(3, 'Domínio muito curto')
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/,
      'Formato de domínio inválido'
    ),
  name: z.string().min(2, 'Nome muito curto'),
  phone: z.string().optional(),
});

type PreSignupFormData = z.infer<typeof preSignupSchema>;

type DomainStatus = 'idle' | 'checking' | 'available' | 'unavailable' | 'error';

// ========================================
// COMPONENT
// ========================================

export default function MyDomainPage() {
  const router = useRouter();
  const [domainStatus, setDomainStatus] = useState<DomainStatus>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PreSignupFormData>({
    resolver: zodResolver(preSignupSchema),
  });

  const watchedDomain = watch('domain');

  // Real-time domain validation - PHASE 4: Integrated with API
  useEffect(() => {
    if (!watchedDomain || watchedDomain.length < 3) {
      setDomainStatus('idle');
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setDomainStatus('checking');

      try {
        const response = await fetch('/api/domain/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain: watchedDomain }),
        });

        if (!response.ok) {
          throw new Error('Validation failed');
        }

        const { data } = await response.json();
        
        setDomainStatus(data.isAvailable ? 'available' : 'unavailable');
      } catch (error) {
        console.error('Domain validation error:', error);
        setDomainStatus('error');
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [watchedDomain]);

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Basic sanitization
    e.target.value = value.toLowerCase().replace(/\s/g, '');
  };

  const onSubmit = async (data: PreSignupFormData) => {
    setIsSubmitting(true);

    try {
      // PHASE 4: Integrated with API
      const response = await fetch('/api/presignup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit');
      }

      const result = await response.json();
      
      console.log('Pre-signup successful:', result);
      
      // Store backup in localStorage (optional)
      localStorage.setItem('arco_presignup_data', JSON.stringify(data));
      
      // Redirect to signup with token
      router.push(`/signup?token=${result.data.token}` as any);
    } catch (error) {
      console.error('Error submitting pre-signup:', error);
      setIsSubmitting(false);
      
      // TODO Phase 4: Show error toast notification
      alert(error instanceof Error ? error.message : 'Erro ao processar cadastro. Tente novamente.');
    }
  };

  return (
    <MainLayout>
      {/* Dark Mode Background */}
      <section className="min-h-screen bg-slate-950 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/30" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl"
          >
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                <span>Etapa 1 de 2 • Análise Inicial</span>
                <span className="text-teal-400 font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Faltam 2 minutos
                </span>
              </div>
              <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-teal-600 to-teal-500"
                />
              </div>
            </div>

            {/* Main card */}
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 sm:p-10 shadow-2xl">
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/50 mb-6"
                >
                  <Sparkles className="w-10 h-10 text-teal-400" />
                </motion.div>

                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                  Desbloqueie Seu Diagnóstico Personalizado
                </h1>

                <p className="text-slate-300 text-lg leading-relaxed">
                  Analisamos <strong className="text-teal-400">850+ empresas</strong> e identificamos padrões críticos 
                  que aumentam conversões em <strong className="text-emerald-400">até 340%</strong>. 
                  Receba seu relatório em <strong className="text-white">48 horas</strong>.
                </p>
              </div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 pb-8 border-b border-slate-700/50"
              >
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-800/50">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
                  <span className="text-xs text-slate-400 leading-tight">850+ empresas</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-800/50">
                  <TrendingUp className="w-5 h-5 text-teal-400 mb-2" />
                  <span className="text-xs text-slate-400 leading-tight">+340% ROI médio</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-800/50">
                  <Clock className="w-5 h-5 text-orange-400 mb-2" />
                  <span className="text-xs text-slate-400 leading-tight">Relatório em 48h</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-800/50">
                  <Shield className="w-5 h-5 text-purple-400 mb-2" />
                  <span className="text-xs text-slate-400 leading-tight">LGPD compliant</span>
                </div>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Onde enviamos seu relatório? *
                    <span className="block text-xs text-slate-400 mt-1 font-normal">
                      + 3 insights exclusivos sobre seu setor
                    </span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    placeholder="seu.email@empresa.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Domain field */}
                <div>
                  <label htmlFor="domain" className="block text-sm font-medium text-white mb-2">
                    Qual site vamos analisar? *
                    <span className="block text-xs text-slate-400 mt-1 font-normal">
                      Diagnóstico completo de UX, conversão e performance
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      {...register('domain')}
                      type="text"
                      id="domain"
                      onChange={handleDomainChange}
                      className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all pr-12"
                      placeholder="seusite.com.br"
                    />
                    {domainStatus === 'checking' && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 className="w-5 h-5 text-teal-400 animate-spin" />
                      </div>
                    )}
                    {domainStatus === 'available' && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </div>
                    )}
                    {domainStatus === 'unavailable' && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <XCircle className="w-5 h-5 text-red-400" />
                      </div>
                    )}
                  </div>
                  {errors.domain && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      {errors.domain.message}
                    </p>
                  )}
                  {domainStatus === 'available' && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-emerald-400 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Pronto para análise! Iremos auditar +50 pontos críticos
                    </motion.p>
                  )}
                  {domainStatus === 'unavailable' && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-orange-400 flex items-center gap-1"
                    >
                      <XCircle className="w-4 h-4" />
                      Este domínio já possui análise em andamento
                    </motion.p>
                  )}
                </div>

                {/* Name field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Como prefere ser chamado? *
                    <span className="block text-xs text-slate-400 mt-1 font-normal">
                      Personalizaremos o relatório para você
                    </span>
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    placeholder="João Silva"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone field (optional) */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    Telefone para contato prioritário{' '}
                    <span className="text-slate-500 font-normal">(opcional)</span>
                    <span className="block text-xs text-slate-400 mt-1 font-normal">
                      Receba insights via WhatsApp antes do relatório completo
                    </span>
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    placeholder="+55 (11) 99999-9999"
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting || domainStatus === 'checking'}
                  className="group relative w-full py-4 px-6 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-xl shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="flex flex-col items-start">
                          <span className="text-base">Processando análise...</span>
                        </span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span className="flex flex-col items-start">
                          <span className="text-base">Gerar Meu Relatório Grátis</span>
                          <span className="text-xs font-normal text-teal-100">
                            Disponível por 48h apenas
                          </span>
                        </span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                {/* Privacy note */}
                <p className="text-xs text-center text-slate-500 mt-4">
                  Ao continuar, você concorda com nossa{' '}
                  <a href="/privacy" className="text-teal-400 hover:underline">
                    Política de Privacidade
                  </a>{' '}
                  e{' '}
                  <a href="/terms" className="text-teal-400 hover:underline">
                    Termos de Uso
                  </a>
                  . Seus dados são criptografados e protegidos pela LGPD.
                </p>
              </form>

              {/* Enhanced trust footer */}
              <div className="mt-8 pt-8 border-t border-slate-700/50">
                <p className="text-center text-sm text-slate-400 mb-4">
                  Por que empresas confiam na ARCO?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/30">
                    <div className="text-2xl font-bold text-teal-400 mb-1">850+</div>
                    <div className="text-xs text-slate-400">Sites Analisados</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/30">
                    <div className="text-2xl font-bold text-emerald-400 mb-1">340%</div>
                    <div className="text-xs text-slate-400">ROI Médio</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/30">
                    <div className="text-2xl font-bold text-orange-400 mb-1">48h</div>
                    <div className="text-xs text-slate-400">Tempo de Entrega</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PHASE 2: Additional S-Tier Sections */}
      <ResultsPreviewSection />
      <ComparisonBeforeAfterSection />
    </MainLayout>
  );
}
