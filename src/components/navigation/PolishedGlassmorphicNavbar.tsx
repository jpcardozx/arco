/**
 * Polished Glassmorphic Navbar
 * 
 * Design refinado e minimalista:
 * - Glassmorfismo sutil sem excessos
 * - Partículas discretas (apenas desktop)
 * - Texturas muito sutis
 * - Animações suaves e profissionais
 * - Performance otimizada
 */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  Users,
  ArrowRight,
  Phone,
  X,
  BookOpen,
  ShoppingBag,
  Crown,
  Gift,
  Award
} from 'lucide-react';
import { cn } from '@/design-system/tokens';
import { LogoParticles } from './LogoParticles';

// Logo Component - Clean & Professional
const ArcoLogo = ({ className, isScrolled, showParticles = true }: { 
  className?: string; 
  isScrolled?: boolean;
  showParticles?: boolean;
}) => (
  <div className={cn("relative", className)}>
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex items-center"
    >
      {/* Partículas sempre visíveis em desktop */}
      {showParticles && (
        <div className="absolute -inset-8 pointer-events-none hidden lg:block opacity-80">
          <LogoParticles />
        </div>
      )}
      
      <motion.div
        animate={{ scale: isScrolled ? 0.95 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative z-10"
      >
        <Image
          src={isScrolled ? "/logos/horizontal/colorful.png" : "/logos/horizontal/white.png"}
          alt="ARCO"
          width={160}
          height={52}
          className={cn(
            "object-contain transition-all duration-300",
            isScrolled ? "h-10 w-auto" : "h-11 w-auto"
          )}
          priority
          quality={95}
          sizes="(max-width: 768px) 120px, 160px"
        />
      </motion.div>
    </motion.div>
  </div>
);

// Navigation Button - S-Tier Elegance with Depth
const NavButton = ({ 
  href, 
  children, 
  icon: Icon,
  variant = "ghost",
  isScrolled = false,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: "ghost" | "primary";
  isScrolled?: boolean;
}) => (
  <motion.div
    whileHover={{ y: -2 }}
    whileTap={{ y: 0 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <Link 
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg overflow-hidden",
        "transition-all duration-500 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60 focus-visible:ring-offset-2",
        variant === "primary"
          ? "bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 text-white" +
            " hover:from-teal-600 hover:via-teal-700 hover:to-teal-800" +
            " shadow-[0_8px_16px_rgba(20,184,166,0.25),0_4px_8px_rgba(20,184,166,0.15)]" +
            " hover:shadow-[0_12px_24px_rgba(20,184,166,0.35),0_6px_12px_rgba(20,184,166,0.2)]" +
            " before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 before:hover:opacity-100 before:transition-opacity before:duration-500"
          : isScrolled
          ? "text-slate-800 hover:text-teal-600" +
            " bg-white/90 hover:bg-white" +
            " border border-slate-200/60 hover:border-teal-400/50" +
            " shadow-[0_2px_8px_rgba(15,23,42,0.08)]" +
            " hover:shadow-[0_8px_16px_rgba(20,184,166,0.12),0_4px_8px_rgba(20,184,166,0.08)]" +
            " backdrop-blur-md"
          : "text-white hover:text-teal-100" +
            " bg-white/[0.08] hover:bg-white/[0.15]" +
            " border border-white/20 hover:border-teal-300/40" +
            " backdrop-blur-xl" +
            " shadow-[0_4px_12px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.06)]" +
            " hover:shadow-[0_8px_20px_rgba(20,184,166,0.15),0_4px_10px_rgba(20,184,166,0.1)]"
      )}
    >
      {/* Shimmer effect */}
      <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      </span>
      
      {Icon && (
        <motion.span 
          className={cn(
            "flex items-center justify-center w-5 h-5 rounded-md transition-all duration-500",
            variant === "primary"
              ? "bg-white/15 shadow-inner shadow-black/10 group-hover:bg-white/25"
              : isScrolled
              ? "bg-gradient-to-br from-teal-50 to-teal-100/50 group-hover:from-teal-100 group-hover:to-teal-200/80 shadow-inner shadow-teal-200/50"
              : "bg-white/15 shadow-inner shadow-white/10 group-hover:bg-white/25"
          )}
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Icon className="w-3 h-3" />
        </motion.span>
      )}
      
      <span className="relative z-10 tracking-wide">
        {children}
      </span>
    </Link>
  </motion.div>
);

export function PolishedGlassmorphicNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const navbarBlur = useTransform(scrollY, [0, 100], [12, 20]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Background - Glassmorphism sutil */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ backdropFilter: `blur(${navbarBlur}px) saturate(160%)` }}
      >
                <div className={cn(
          "absolute inset-0 transition-colors duration-300",
          isScrolled 
            ? "bg-white/95" 
            : "bg-transparent"
        )} />
        
        {/* Texture removed - was causing TV noise effect */}
        
        {/* Border bottom sutil */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between"
          animate={{ 
            paddingTop: isScrolled ? 12 : 16, 
            paddingBottom: isScrolled ? 12 : 16 
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <ArcoLogo isScrolled={isScrolled} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center" role="navigation">
            <NavButton href="/services" icon={ShoppingBag} isScrolled={isScrolled}>
              Soluções
            </NavButton>
            <NavButton href="/metodologia" icon={BookOpen} isScrolled={isScrolled}>
              Como Funciona
            </NavButton>
            <NavButton href="/#cases" icon={Award} isScrolled={isScrolled}>
              Cases
            </NavButton>
            <NavButton href="/contato" icon={Phone} isScrolled={isScrolled}>
              Contato
            </NavButton>
          </nav>

          {/* Desktop CTA - Login principal, Começar Projeto secundário */}
          <div className="hidden lg:flex items-center gap-3">
            <NavButton href="/login" variant="primary" icon={ArrowRight}>
              Login
            </NavButton>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link
                href="/contato"
                className={cn(
                  "group relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg overflow-hidden",
                  "transition-all duration-500",
                  isScrolled 
                    ? "text-slate-700 hover:text-teal-600" +
                      " bg-gradient-to-br from-slate-50 to-slate-100/80 hover:from-white hover:to-slate-50" +
                      " border border-slate-200/60 hover:border-teal-300/60" +
                      " shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:shadow-[0_6px_16px_rgba(20,184,166,0.1)]"
                    : "text-white hover:text-teal-100" +
                      " bg-white/[0.06] hover:bg-white/[0.12]" +
                      " border border-white/20 hover:border-teal-300/30" +
                      " backdrop-blur-lg" +
                      " shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_16px_rgba(20,184,166,0.12)]"
                )}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative tracking-wide">Começar Projeto</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/contato"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white text-sm font-medium rounded-lg shadow-md"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              Projeto
            </Link>
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-lg bg-white/40 backdrop-blur-md border border-white/30 hover:bg-white/60 transition-all"
                  aria-label="Menu"
                >
                  <Menu className="w-5 h-5 text-slate-700" />
                </button>
              </SheetTrigger>
              
              <SheetContent
                side="right"
                className="w-full sm:w-80 p-0 border-l border-slate-200"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <ArcoLogo showParticles={false} />
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-slate-100 rounded-lg"
                      aria-label="Fechar"
                    >
                      <X className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>

                  {/* Navigation */}
                  <nav className="flex-1 p-6 space-y-2">
                    {[
                      { title: 'Soluções', href: '/services', icon: ShoppingBag },
                      { title: 'Como Funciona', href: '/metodologia', icon: BookOpen },
                      { title: 'Cases', href: '/#cases', icon: Award },
                      { title: 'Contato', href: '/contato', icon: Phone }
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-4 hover:bg-slate-50 rounded-xl transition-colors group"
                      >
                        <div className="p-2 bg-teal-100 rounded-lg group-hover:bg-teal-200 transition-colors">
                          <item.icon className="w-5 h-5 text-teal-700" />
                        </div>
                        <span className="font-semibold text-slate-900">{item.title}</span>
                        <ArrowRight className="w-4 h-4 ml-auto text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </nav>

                  {/* Bottom CTAs - Login principal */}
                  <div className="p-6 border-t border-slate-200 space-y-3">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full p-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-xl shadow-lg transition-all"
                    >
                      <ArrowRight className="w-5 h-5" />
                      <span className="font-bold">Login</span>
                    </Link>
                    
                    <Link
                      href="/contato"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full p-3 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">Começar Projeto</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}

export default PolishedGlassmorphicNavbar;
