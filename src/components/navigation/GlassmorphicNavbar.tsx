'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  Users,
  Crown,
  ArrowRight,
  Phone,
  X,
  BookOpen,
  ShoppingBag
} from 'lucide-react';
import { cn } from '@/design-system/tokens';
import { LogoParticles } from './LogoParticles';

/**
 * GlassmorphicNavbar Component
 * 
 * Navbar premium com:
 * - Glassmorfismo avançado com múltiplas camadas
 * - Textura sutil em noise pattern
 * - Partículas elegantes ao redor da logo
 * - Efeitos hover sofisticados
 * - Performance otimizada
 */

// Logo Component com Partículas e Glassmorfismo
const ArcoLogoWithParticles = ({ className, isScrolled }: { className?: string; isScrolled?: boolean }) => (
  <div className={cn("relative cursor-pointer", className)}>
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
      className="relative flex items-center"
    >
      {/* Partículas ao redor da logo */}
      <div className="absolute -inset-8 pointer-events-none">
        <LogoParticles />
      </div>
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 via-blue-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        whileHover={{ scale: 1.1 }}
      />
      
      <motion.div
        animate={{
          scale: isScrolled ? 0.92 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative z-10"
      >
        <Image
          src="/logos/horizontal/colorful.png"
          alt="ARCO - Desenvolvimento Web e Marketing Digital"
          width={160}
          height={52}
          className={cn(
            "object-contain transition-all duration-300",
            isScrolled ? "h-11 w-auto" : "h-12 w-auto"
          )}
          priority
          quality={95}
          sizes="(max-width: 768px) 120px, 160px"
          style={{
            imageRendering: 'auto' as const,
            objectFit: 'contain',
            objectPosition: 'left center'
          }}
        />
      </motion.div>
    </motion.div>
  </div>
);

// Enhanced Navigation Button com Glassmorfismo Premium
const GlassNavButton = ({ 
  href, 
  children, 
  icon: Icon, 
  variant = "ghost", 
  isActive = false 
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: "ghost" | "cta";
  isActive?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.4,
      ease: "easeOut"
    }}
    whileHover={{ scale: 1.03, y: -1 }}
    whileTap={{ scale: 0.98 }}
  >
    <Link 
      href={href} 
      className={cn(
        "group relative inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium",
        "transition-all duration-300 ease-out rounded-xl",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2",
        variant === "cta" 
          ? "bg-gradient-to-r from-teal-500 via-teal-600 to-blue-600 text-white shadow-lg shadow-teal-500/25" +
            " hover:shadow-xl hover:shadow-teal-500/40 border-0" +
            " hover:from-teal-600 hover:via-teal-700 hover:to-blue-700"
          : // Glassmorfismo Premium para botões normais
            "text-slate-700 hover:text-slate-900" +
            " backdrop-blur-xl bg-white/50 hover:bg-white/70" +
            " border border-white/40 hover:border-white/60" +
            " shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]" +
            " hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)]" +
            (isActive ? " bg-white/70 text-slate-900 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]" : "")
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>
      
      {/* Textura sutil */}
      <div className="absolute inset-0 rounded-xl opacity-30 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
      
      {Icon && (
        <Icon className={cn(
          "w-4 h-4 transition-transform duration-300 relative z-10",
          "group-hover:scale-110 group-hover:rotate-3"
        )} />
      )}
      <span className="relative z-10 font-semibold">{children}</span>
      
      {variant !== "cta" && (
        <div className={cn(
          "absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full",
          "transition-all duration-300 ease-out",
          "w-0 group-hover:w-3/4 -translate-x-1/2"
        )} />
      )}
    </Link>
  </motion.div>
);

export const GlassmorphicNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const navbarBlur = useTransform(scrollY, [0, 100], [8, 20]);
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.85, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-500 ease-out",
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 35,
        duration: 0.3
      }}
    >
      {/* Background com Glassmorfismo Avançado */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          backdropFilter: `blur(${navbarBlur}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${navbarBlur}px) saturate(180%)`,
        }}
      >
        {/* Camada base com gradiente sutil */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/80"
          style={{ opacity: navbarOpacity }}
        />
        
        {/* Textura sutil de noise */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            mixBlendMode: 'overlay'
          }}
        />
        
        {/* Border sutil no topo */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        
        {/* Border sutil embaixo */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/40 to-transparent" />
        
        {/* Glow effect sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 via-transparent to-transparent" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between"
          animate={{ 
            paddingTop: isScrolled ? 14 : 18, 
            paddingBottom: isScrolled ? 14 : 18 
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Logo com Partículas */}
          <motion.div
            className="flex-shrink-0 group"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link 
              href="/" 
              className="block focus:outline-none focus-visible:shadow-lg focus-visible:shadow-teal-500/25 rounded-lg transition-shadow duration-200"
            >
              <ArcoLogoWithParticles isScrolled={isScrolled} />
            </Link>
          </motion.div>

          {/* Center Navigation - Glassmorfismo Premium */}
          <motion.nav
            className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            role="navigation"
            aria-label="Main navigation"
          >
            <div className={cn(
              "flex items-center gap-1.5 p-2",
              "backdrop-blur-2xl bg-white/60",
              "rounded-2xl border border-white/50",
              "shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]",
              "relative overflow-hidden"
            )}>
              {/* Textura de fundo sutil */}
              <div 
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundSize: '150px 150px'
                }}
              />
              
              {/* Highlight sutil no topo */}
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              
              <GlassNavButton href="/services" icon={ShoppingBag}>
                Serviços
              </GlassNavButton>
              <GlassNavButton href="/case-studies" icon={BookOpen}>
                Portfolio
              </GlassNavButton>
              <GlassNavButton href="/contato" icon={Phone}>
                Contato
              </GlassNavButton>
              <GlassNavButton href="/about" icon={Users}>
                Sobre
              </GlassNavButton>
            </div>
          </motion.nav>

          {/* Right Side - CTAs */}
          <motion.div
            className="hidden lg:flex items-center gap-3 flex-shrink-0"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/assessment"
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl",
                  "text-slate-600 hover:text-slate-800",
                  "backdrop-blur-xl bg-white/40 hover:bg-white/60",
                  "border border-white/30 hover:border-white/50",
                  "transition-all duration-200",
                  "shadow-[0_4px_16px_0_rgba(31,38,135,0.1)]",
                  "hover:shadow-[0_4px_16px_0_rgba(31,38,135,0.2)]"
                )}
              >
                Orçamento Grátis
              </Link>
            </motion.div>
            <GlassNavButton href="/contato" variant="cta" icon={ArrowRight}>
              Começar Projeto
            </GlassNavButton>
          </motion.div>          {/* Mobile Menu */}
          <motion.div
            className="flex items-center gap-3 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/contato"
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl",
                "bg-gradient-to-r from-teal-500 to-blue-600 text-white",
                "shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/35",
                "transition-all duration-200 active:scale-95"
              )}
            >
              <ArrowRight className="w-3.5 h-3.5" />
              Projeto
            </Link>
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <motion.button
                  className={cn(
                    "inline-flex items-center justify-center p-2.5 rounded-xl",
                    "backdrop-blur-xl bg-white/50 hover:bg-white/70",
                    "border border-white/40 hover:border-white/60",
                    "transition-all duration-200",
                    "focus:outline-none focus-visible:shadow-lg focus-visible:shadow-teal-500/25"
                  )}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Abrir menu de navegação"
                >
                  <motion.div
                    animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Menu className="w-5 h-5 text-slate-700" />
                  </motion.div>
                </motion.button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-80 border-l border-white/20 p-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
              >
                <motion.div 
                  className="flex flex-col h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-slate-200/60">
                    <ArcoLogoWithParticles />
                    <motion.button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-all duration-200"
                      whileTap={{ scale: 0.95 }}
                      aria-label="Fechar menu"
                    >
                      <X className="w-5 h-5 text-slate-600" />
                    </motion.button>
                  </div>

                  {/* Main Navigation */}
                  <nav className="flex-1 p-6" role="navigation" aria-label="Menu principal mobile">
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Navegação</h3>
                        {[
                          { title: 'Serviços', href: '/services', icon: ShoppingBag, description: 'Ver todos os serviços' },
                          { title: 'Portfolio', href: '/case-studies', icon: BookOpen, description: 'Cases de sucesso' },
                          { title: 'Sobre Nós', href: '/about', icon: Users, description: 'Nossa história' },
                          { title: 'Contato', href: '/contato', icon: Phone, description: 'Fale conosco' }
                        ].map((item, index) => (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-4 p-4 hover:bg-white/60 active:bg-white/80 rounded-2xl transition-all duration-200 group min-h-[60px]"
                            >
                              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200">
                                <item.icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-slate-900">{item.title}</div>
                                <div className="text-sm text-slate-600">{item.description}</div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-200" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </nav>

                  {/* Bottom Actions */}
                  <motion.div 
                    className="p-6 border-t border-slate-200/60 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <Link
                      href="/assessment"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full p-3 text-slate-600 hover:text-slate-900 hover:underline underline-offset-4 transition-all duration-200 text-sm font-medium"
                    >
                      <Crown className="w-4 h-4" />
                      <span>Orçamento Gratuito</span>
                    </Link>
                    
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Link
                        href="/contato"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-3 w-full p-4 bg-gradient-to-r from-teal-500 via-teal-600 to-blue-600 hover:from-teal-600 hover:via-teal-700 hover:to-blue-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 group relative overflow-hidden"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <Phone className="w-5 h-5 relative z-10" />
                        <span className="font-bold relative z-10">Começar Projeto Agora</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default GlassmorphicNavbar;
