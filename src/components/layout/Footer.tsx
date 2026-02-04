/**
 * ARCO Professional Footer v3.0
 * Premium, mature footer with rich content architecture
 * Height: ~1.7 sections with hierarchical visual organization
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Shield,
  Send,
  ExternalLink,
  Copy,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { cn, designTokens } from '@/design-system/tokens';
import { Button } from '../primitives/Button/Button';

// ============= HOOKS CUSTOMIZADOS =============

// Hook: Reduced Motion (Acessibilidade WCAG 2.1 AA)
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Hook: Copy to Clipboard
const useClipboard = (timeout = 2000) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [timeout]);

  return { copied, copy };
};


interface FooterProps {
  variant?: 'default' | 'minimal';
  showPreFooter?: boolean;
}

// Enhanced navigation structure with proper types
interface FooterLink {
  label: string;
  href: string;
  badge?: string;
  external?: boolean;
}

const footerNav = {
  services: {
    title: "Serviços",
    links: [
      { label: "Consultoria Técnica", href: "#", badge: "Core" },
      { label: "Auditoria de Performance", href: "#" },
      { label: "Migração de Sistemas", href: "#" },
      { label: "Otimização de Stack", href: "#" }
    ] as FooterLink[]
  },
  company: {
    title: "Institucional",
    links: [
      { label: "Portfolio", href: "/jpcardozo" },
      { label: "Metodologia", href: "#" },
      { label: "Casos de Uso", href: "#" },
      { label: "Contato", href: "/contato" }
    ] as FooterLink[]
  },
  resources: {
    title: "Recursos",
    links: [
      { label: "Agendamentos", href: "/agendamentos" },
      { label: "Análise de URL", href: "/mydomain" },
      { label: "Documentação Técnica", href: "#" },
      { label: "FAQ", href: "#" }
    ] as FooterLink[]
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Política de Privacidade", href: "#" },
      { label: "Termos de Serviço", href: "#" },
      { label: "Conformidade LGPD", href: "#" }
    ] as FooterLink[]
  }
};

// Certifications and badges
const certifications = [
  {
    icon: Shield,
    label: "LGPD Compliant"
  }
];

// ============= COMPONENTES AUXILIARES =============

// Component: Contact Email com Copy to Clipboard
const ContactEmail = () => {
  const { copied, copy } = useClipboard();
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault();
        copy('arco@consultingarco.com');
      }}
      whileHover={reducedMotion ? {} : { scale: 1.05, y: -4 }}
      whileTap={reducedMotion ? {} : { scale: 0.98 }}
      className="flex items-center gap-3 text-white/80 hover:text-teal-400 transition-all group p-4 rounded-xl border border-teal-400/20 bg-teal-500/5 hover:bg-teal-500/10 hover:border-teal-400/40 hover:shadow-lg hover:shadow-teal-500/10 text-left relative"
    >
      <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-400/30 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
        <Mail className="w-5 h-5 text-teal-300" strokeWidth={2.5} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs text-teal-400/80 mb-0.5 font-semibold uppercase tracking-wider">Email Principal</div>
        <div className="text-sm font-bold truncate">arco@consultingarco.com</div>
      </div>
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={reducedMotion ? {} : { scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
          >
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          </motion.div>
        ) : (
          <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </AnimatePresence>

      {/* Toast notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-teal-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shadow-lg z-50"
          >
            Email copiado!
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-4 border-transparent border-t-teal-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Component: Newsletter Form com Validação
const NewsletterForm = () => {
  type EmailState = 'idle' | 'valid' | 'invalid' | 'loading' | 'success' | 'error';
  const [email, setEmail] = useState('');
  const [emailState, setEmailState] = useState<EmailState>('idle');
  const reducedMotion = useReducedMotion();

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getEmailProgress = (email: string): number => {
    let score = 0;
    if (email.length > 3) score += 25;
    if (email.includes('@')) score += 25;
    if (email.split('@')[1]?.includes('.')) score += 25;
    if (validateEmail(email)) score += 25;
    return score;
  };

  useEffect(() => {
    if (email === '') {
      setEmailState('idle');
      return;
    }

    const timeoutId = setTimeout(() => {
      setEmailState(validateEmail(email) ? 'valid' : 'invalid');
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) return;

    setEmailState('loading');
    
    // Simular API call
    setTimeout(() => {
      setEmailState('success');
      setTimeout(() => {
        setEmail('');
        setEmailState('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            disabled={emailState === 'loading' || emailState === 'success'}
            className={cn(
              "w-full px-4 py-3.5 bg-slate-900/80 border rounded-xl text-white placeholder:text-white/40 transition-all",
              "focus:ring-2 focus:ring-teal-500 focus:border-teal-500",
              emailState === 'invalid' && "border-red-400/50 ring-2 ring-red-400/20",
              emailState === 'valid' && "border-teal-400/50 ring-2 ring-teal-400/20",
              emailState === 'success' && "border-green-400/50",
              (emailState === 'loading' || emailState === 'success') && "opacity-50 cursor-not-allowed"
            )}
          />
          
          {/* Progress bar */}
          {!reducedMotion && email && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getEmailProgress(email)}%` }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Status icon */}
          <AnimatePresence mode="wait">
            {emailState === 'valid' && (
              <motion.div
                initial={reducedMotion ? {} : { scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <CheckCircle2 className="w-5 h-5 text-teal-400" />
              </motion.div>
            )}
            {emailState === 'invalid' && (
              <motion.div
                initial={reducedMotion ? {} : { scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <AlertCircle className="w-5 h-5 text-red-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="submit"
          disabled={emailState === 'loading' || emailState === 'success' || email === ''}
          whileHover={reducedMotion ? {} : { scale: 1.02 }}
          whileTap={reducedMotion ? {} : { scale: 0.98 }}
          className={cn(
            "px-8 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all whitespace-nowrap",
            (emailState === 'loading' || emailState === 'success' || email === '') && "opacity-50 cursor-not-allowed"
          )}
          style={{
            background: `linear-gradient(135deg, ${designTokens.colors.teal[500]} 0%, ${designTokens.colors.teal[600]} 100%)`,
            boxShadow: '0 10px 30px rgba(20, 184, 166, 0.3)'
          }}
        >
          {emailState === 'loading' ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Enviando...
            </span>
          ) : emailState === 'success' ? (
            'Enviado!'
          ) : (
            'Inscrever-se'
          )}
        </motion.button>
      </div>

      {/* Success overlay */}
      <AnimatePresence>
        {emailState === 'success' && (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-teal-500/20 backdrop-blur-sm rounded-xl"
          >
            <div className="text-center">
              <motion.div
                initial={reducedMotion ? {} : { scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="w-12 h-12 text-teal-400 mx-auto mb-2" />
              </motion.div>
              <p className="text-teal-300 font-semibold text-sm">Inscrito com sucesso!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

// Pre-Footer CTA Section
const PreFooterCTA = () => {
  return (
    <section 
      className="relative py-14 sm:py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)'
      }}
    >
      {/* Sophisticated background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 30% 50%, rgba(20,184,166,0.15) 0%, transparent 50%),
                        radial-gradient(circle at 70% 50%, rgba(249,115,22,0.10) 0%, transparent 50%)`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Main CTA Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-white font-bold mb-6"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: '1.2',
                letterSpacing: '-0.035em',
                textShadow: '0 2px 20px rgba(0,0,0,0.3)'
              }}
            >
              Ainda precisa de ajuda?
            </h2>
            
            <p 
              className="text-white/80 mb-10 max-w-2xl mx-auto"
              style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                lineHeight: '1.7',
                letterSpacing: '-0.015em'
              }}
            >
              Receba uma análise técnica gratuita e descubra como otimizar performance, conversão e resultado ou entre em contato com o suporte.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white border-0 shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Solicitar Análise
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <a 
                href="mailto:contato@arco.dev"
                className="px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 inline-flex items-center"
              >
                Falar com Especialista
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Main Footer Component
export const Footer: React.FC<FooterProps> = ({
  variant = 'default',
  showPreFooter = true
}) => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const currentYear = new Date().getFullYear();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let rafId: number;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setShowScrollToTop(window.scrollY > 500);
        }, 100);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <footer 
        className="border-t border-white/10 py-8"
        style={{
          background: 'linear-gradient(180deg, #020617 0%, #0a0a0a 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} ARCO. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacidade" className="text-white/60 hover:text-white transition-colors">
                Privacidade
              </Link>
              <Link href="/termos" className="text-white/60 hover:text-white transition-colors">
                Termos
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Full footer with pre-footer CTA
  return (
    <>
      {/* Pre-Footer CTA Section */}
      {showPreFooter && <PreFooterCTA />}

      {/* Animated 8-bit Neon Gradient Divider */}
      <div className="relative h-1 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              90deg,
              transparent 0%,
              #14b8a6 10%,
              #2dd4bf 20%,
              #5eead4 30%,
              #f97316 40%,
              #fb923c 50%,
              #f97316 60%,
              #5eead4 70%,
              #2dd4bf 80%,
              #14b8a6 90%,
              transparent 100%
            )`,
            backgroundSize: '200% 100%',
            filter: 'blur(1px)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '200% 0%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        {/* Pixel effect overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.3) 2px,
              rgba(0, 0, 0, 0.3) 4px
            )`,
          }}
        />
      </div>

      {/* Main Footer */}
      <footer 
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #0a0a0a 0%, #020617 100%)'
        }}
      >
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-5">
          <div 
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
            className="w-full h-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 relative z-10">

          {/* Top Section - Brand + Newsletter */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-10 sm:mb-14 pb-10 sm:pb-14 border-b border-white/10">
            
            {/* Brand Column - Premium (Mobile-First) */}
            <div className="md:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block mb-8 group relative">
                {/* Logo Vertical White - Elegante com borda neon */}
                <motion.div
                  className="relative p-4 rounded-2xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Animated neon border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/20 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 rounded-2xl border border-teal-400/0 group-hover:border-teal-400/30 group-hover:shadow-[0_0_30px_-5px_rgba(20,184,166,0.3)] transition-all duration-500" />
                  
                  <img
                    src="/logos/vertical/white.png"
                    alt="ARCO"
                    className="h-20 sm:h-28 w-auto relative z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </motion.div>
              </Link>
              
              <p 
                className="text-white/70 mb-8 sm:mb-10 leading-[1.8] text-[15px] font-light max-w-full sm:max-w-[36ch] lg:max-w-[280px]"
                style={{ letterSpacing: '0.01em' }}
              >
                Soluções digitais profissionais com foco em performance e resultados mensuráveis.
              </p>

              {/* Certifications - Refined with elegant animations */}
              <div className="space-y-3 mb-10">
                <p className="text-white/40 text-[11px] uppercase tracking-[0.15em] font-semibold mb-4">Certificações</p>
                <div className="space-y-2.5">
                  {certifications.map((cert, index) => {
                    const IconComponent = cert.icon;
                    return (
                      <motion.div 
                        key={cert.label}
                        className="flex items-center gap-3 group cursor-default"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <motion.div 
                          className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex items-center justify-center group-hover:border-teal-400/40 group-hover:bg-teal-500/5 transition-all duration-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {/* Subtle glow on hover */}
                          <div className="absolute inset-0 rounded-lg bg-teal-400/0 group-hover:bg-teal-400/10 blur-md transition-all duration-300" />
                          <IconComponent className="w-[18px] h-[18px] text-teal-400/80 group-hover:text-teal-300 transition-colors relative z-10" strokeWidth={2.5} />
                        </motion.div>
                        <span className="text-[13px] text-white/60 font-medium tracking-wide group-hover:text-white/80 transition-colors">{cert.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Chat Status - Discrete and elegant */}
              <div className="space-y-3">
                <p className="text-white/40 text-[11px] uppercase tracking-[0.15em] font-semibold">Suporte Direto</p>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-amber-400/70 animate-pulse" />
                  <span className="text-[13px] text-white/60 font-medium">Chat - Em implementação</span>
                </div>
              </div>
            </div>

            {/* Newsletter Column - Enhanced (Mobile-First) */}
            <div className="md:col-span-2 lg:pl-8 xl:pl-12">
              <motion.div 
                className="relative bg-gradient-to-br from-teal-500/10 via-teal-600/5 to-transparent border border-teal-400/20 rounded-2xl p-6 sm:p-8 lg:p-10 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Elegant neon glow on hover */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-teal-400/0 via-teal-500/0 to-orange-400/0 group-hover:from-teal-400/30 group-hover:via-teal-500/20 group-hover:to-orange-400/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 -z-10" />
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-teal-500/20">
                    <Send className="w-6 h-6 text-teal-300" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Insights Semanais
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Receba estratégias de crescimento, cases de sucesso e tendências do mercado digital. Sem spam, apenas conteúdo relevante.
                    </p>
                  </div>
                </div>

                <NewsletterForm />

                <p className="text-white/50 text-xs mt-4">
                  Ao se inscrever, você concorda com nossa{' '}
                  <Link href="/privacidade" className="text-teal-400 hover:underline">
                    Política de Privacidade
                  </Link>
                </p>
              </motion.div>

              {/* Contact Info - Hierarchical Grid com Copy */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
                <ContactEmail />
                
                <motion.a 
                  href="tel:+5521967277533"
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="flex items-center gap-3 text-white/80 hover:text-teal-400 transition-all group p-3 sm:p-4 rounded-xl border border-white/10 hover:border-teal-400/30 hover:bg-teal-500/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-teal-500/10 transition-colors flex-shrink-0">
                    <Phone className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-white/50 mb-0.5">Telefone</div>
                    <div className="text-sm font-medium">(21) 96727-7533</div>
                  </div>
                </motion.a>

                <div className="flex items-center gap-3 text-white/80 p-3 sm:p-4 rounded-xl border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-white/50 mb-0.5">Localização</div>
                    <div className="text-sm font-medium">Rio de Janeiro, RJ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Navigation */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-12 mb-12 sm:mb-16">
            {/* Navigation Columns */}
            {Object.entries(footerNav).map(([key, section]) => (
              <div key={key}>
                <h4 
                  className="text-white font-bold mb-6 text-sm tracking-wider"
                  style={{ letterSpacing: '0.08em' }}
                >
                  {section.title.toUpperCase()}
                </h4>
                <ul className="space-y-3.5">
                  {section.links.map((link, index) => (
                    <motion.li
                      key={`${key}-${link.label}-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      {link.href === '#' ? (
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="text-white/60 hover:text-white/80 transition-colors text-sm inline-flex items-center gap-2 group cursor-default"
                        >
                          <span className="relative">
                            {link.label}
                          </span>
                          {link.badge && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-teal-500/20 text-teal-300 rounded-full">
                              {link.badge}
                            </span>
                          )}
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-white/70 hover:text-teal-400 transition-colors text-sm inline-flex items-center gap-2 group"
                          {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          <span className="relative">
                            {link.label}
                            <span className="absolute bottom-0 left-0 w-0 h-px bg-teal-400 group-hover:w-full transition-all duration-300" />
                          </span>
                          {link.badge && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-teal-500/20 text-teal-300 rounded-full">
                              {link.badge}
                            </span>
                          )}
                          {link.external && (
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8">
            {/* Legal Row */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm order-2 lg:order-1">
                <p className="text-white/50">
                  © {currentYear} ARCO. Todos os direitos reservados.
                </p>
                
                <div className="h-4 w-px bg-white/10 hidden sm:block" />
                
                {/* Developer Credit - Animated Signature */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="group relative inline-flex"
                >
                  <div className="relative inline-flex rounded-2xl p-[1.5px] overflow-visible">
                    {/* Animated conic-gradient border */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: `conic-gradient(
                          from var(--arco-angle) at 50% 50%,
                          transparent,
                          transparent 10%,
                          rgba(20, 184, 166, 0.5) 20%,
                          rgba(16, 185, 129, 0.6) 35%,
                          rgba(245, 158, 11, 0.6) 55%,
                          rgba(249, 115, 22, 0.5) 70%,
                          transparent 85%,
                          transparent
                        )`,
                        animation: 'arco-border-spin 6s linear infinite',
                      }}
                    />
                    {/* Glow layer */}
                    <div
                      className="absolute inset-[-2px] rounded-2xl opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-700"
                      style={{
                        background: `conic-gradient(
                          from var(--arco-angle) at 50% 50%,
                          transparent,
                          rgba(20, 184, 166, 0.3),
                          rgba(245, 158, 11, 0.3),
                          transparent
                        )`,
                        animation: 'arco-border-spin 6s linear infinite',
                      }}
                    />
                    {/* Card */}
                    <div className="relative z-10 flex items-center gap-2.5 sm:gap-3 rounded-[15px] px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-br from-slate-900/95 via-slate-950/98 to-black/95 backdrop-blur-md border border-white/[0.08] shadow-2xl transition-all duration-700 group-hover:shadow-[0_8px_32px_rgba(20,184,166,0.15),0_0_0_1px_rgba(245,158,11,0.1)] group-hover:border-white/[0.12]">
                      {/* Label + pulse dot */}
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-teal-400 to-amber-400 animate-pulse" />
                          <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-teal-400 blur-[3px] animate-pulse" />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400/90 group-hover:text-slate-300 transition-colors duration-500">
                          Desenvolvido por
                        </span>
                      </div>
                      {/* Divider */}
                      <div className="w-px h-5 bg-gradient-to-b from-transparent via-slate-600/50 to-transparent" />
                      {/* GitHub link */}
                      <a
                        href="https://github.com/jpcardozx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link relative flex items-center gap-1.5 transition-all duration-300 hover:scale-105"
                      >
                        <svg className="w-4 h-4 text-slate-400 group-hover/link:text-teal-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span className="font-mono text-xs sm:text-sm font-bold bg-gradient-to-r from-teal-200 via-emerald-200 to-amber-300 bg-clip-text text-transparent group-hover/link:from-teal-300 group-hover/link:via-emerald-300 group-hover/link:to-amber-400 transition-all">
                          jpcardozx
                        </span>
                        <span className="absolute -bottom-0.5 left-5 right-0 h-[1px] bg-gradient-to-r from-teal-400/0 via-teal-400/80 to-amber-400/80 scale-x-0 group-hover/link:scale-x-100 origin-left transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                  {/* Ambient glow */}
                  <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl bg-gradient-to-r from-teal-500/20 via-emerald-500/20 to-amber-500/20 transition-opacity duration-700" />
                </motion.div>
                <style>{`
                  @property --arco-angle {
                    syntax: '<angle>';
                    initial-value: 0deg;
                    inherits: false;
                  }
                  @keyframes arco-border-spin {
                    from { --arco-angle: 0deg; }
                    to { --arco-angle: 360deg; }
                  }
                `}</style>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-xs order-1 lg:order-2">
                <button onClick={(e) => e.preventDefault()} className="text-white/50 hover:text-white/80 transition-colors font-medium cursor-default">
                  Privacidade
                </button>
                <button onClick={(e) => e.preventDefault()} className="text-white/50 hover:text-white/80 transition-colors font-medium cursor-default">
                  Termos
                </button>
                <button onClick={(e) => e.preventDefault()} className="text-white/50 hover:text-white/80 transition-colors font-medium cursor-default">
                  LGPD
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button - S-Tier with Accessibility */}
        <motion.button
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all z-50 group relative overflow-hidden touch-manipulation",
            "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-lg",
            !showScrollToTop && "pointer-events-none opacity-0"
          )}
          whileHover={reducedMotion ? {} : { scale: 1.15, rotate: 15 }}
          whileTap={reducedMotion ? {} : { scale: 0.9 }}
          animate={{
            opacity: showScrollToTop ? 1 : 0,
            y: showScrollToTop ? 0 : 20
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          aria-label="Voltar ao topo"
          style={{
            boxShadow: showScrollToTop ? '0 10px 40px rgba(20,184,166,0.4)' : 'none'
          }}
        >
          {/* Animated ring pulse */}
          {!reducedMotion && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-teal-300"
              animate={{
                scale: [1, 1.5, 1.5],
                opacity: [0.5, 0, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
        </motion.button>
      </footer>
    </>
  );
};

export type { FooterProps };
