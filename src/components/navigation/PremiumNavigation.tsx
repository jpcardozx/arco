'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
import { cn, designTokens } from '@/design-system/tokens';
import { navigationVariants } from './variants';

// ARCO Logo Component - Clean and Professional
const ArcoLogo = ({ className, isScrolled }: { className?: string; isScrolled?: boolean }) => (
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
      <motion.div
        animate={{
          scale: isScrolled ? 0.92 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative"
      >
        <Image
          src="/logos/horizontal/colorful.png"
          alt="ARCO - Desenvolvimento Web e Marketing Digital"
          width={160}
          height={52}
          className={cn(
            "object-contain transition-all duration-300",
            isScrolled ? "h-9 w-auto" : "h-12 w-auto"
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

// Enhanced Navigation Button with Premium UX
const NavButton = ({ href, children, icon: Icon, variant = "ghost", isActive = false }: {
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
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Link 
      href={href} 
      className={cn(
        "group relative inline-flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium",
        "transition-all duration-200 ease-out rounded-xl",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        variant === "cta" 
          ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg" +
            " hover:shadow-xl hover:shadow-teal-500/30 border-0" +
            " hover:from-teal-600 hover:to-teal-700" +
            " focus-visible:shadow-2xl focus-visible:shadow-teal-500/40"
          : "text-slate-700 hover:text-slate-900 bg-white/40 hover:bg-white/60 backdrop-blur-sm" +
            " border border-white/30 hover:border-white/50 hover:shadow-md" +
            " focus-visible:bg-white/70 focus-visible:border-teal-500/30 focus-visible:shadow-lg" +
            (isActive ? " bg-white/70 text-slate-900 shadow-sm" : "")
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {variant === "cta" && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      {Icon && (
        <Icon className={cn(
          "w-4 h-4 transition-transform duration-200 relative z-10",
          "group-hover:scale-105"
        )} />
      )}
      <span className="relative z-10">{children}</span>
      {variant !== "cta" && (
        <div className={cn(
          "absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full",
          "transition-all duration-300 ease-out",
          "w-0 group-hover:w-3/4 -translate-x-1/2"
        )} />
      )}
    </Link>
  </motion.div>
);

// Navigation Items - Streamlined Professional Structure
const navigationItems = [
  {
    title: 'Serviços',
    items: [
      {
        title: 'Web Development',
        description: 'Desenvolvimento web profissional e moderno',
        href: '/services',
        icon: ShoppingBag,
        featured: true,
      },
      {
        title: 'Marketing Digital',
        description: 'Estratégias de tráfego e conversão',
        href: '/services/marketing',
        icon: Users,
        badge: 'Popular',
      },
      {
        title: 'Consultoria',
        description: 'Consultoria especializada em crescimento',
        href: '/services/consulting',
        icon: Crown,
      },
    ],
  },
  {
    title: 'Portfolio',
    items: [
      {
        title: 'Case Studies',
        description: 'Projetos de sucesso e resultados alcançados',
        href: '/case-studies',
        icon: BookOpen,
        featured: true,
        badge: 'Destaque',
      },
      {
        title: 'Projetos Recentes',
        description: 'Nossos trabalhos mais recentes',
        href: '/portfolio',
        icon: Crown,
      },
      {
        title: 'Clientes',
        description: 'Empresas que confiam em nosso trabalho',
        href: '/clients',
        icon: Users,
      },
    ],
  },
  {
    title: 'Empresa',
    items: [
      {
        title: 'Sobre Nós',
        description: 'Conheça nossa história e missão',
        href: '/about',
        icon: Users,
        featured: true,
      },
      {
        title: 'Contato',
        description: 'Entre em contato conosco',
        href: '/contact',
        icon: Phone,
      },
    ],
  },
];

export const PremiumNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      className={navigationVariants({ isScrolled })}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between"
          animate={{ height: isScrolled ? 72 : 84 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Logo - Left Side with enhanced spacing */}
          <motion.div
            className="flex-shrink-0"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link href="/" className="block focus:outline-none focus-visible:shadow-lg focus-visible:shadow-blue-500/25 rounded-lg transition-shadow duration-200">
              <ArcoLogo isScrolled={isScrolled} />
            </Link>
          </motion.div>

          {/* Center Navigation - Main Links */}
          <motion.nav
            className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            role="navigation"
            aria-label="Main navigation"
          >
            <div className="flex items-center gap-1 p-2 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/40 shadow-sm">
              <NavButton href="/services" icon={ShoppingBag}>
                Serviços
              </NavButton>
              <NavButton href="/case-studies" icon={BookOpen}>
                Portfolio
              </NavButton>
              <NavButton href="/about" icon={Users}>
                Sobre
              </NavButton>
              <NavButton href="/contact" icon={Phone}>
                Contato
              </NavButton>
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
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors duration-200"
              >
                Orçamento Grátis
              </Link>
            </motion.div>
            <NavButton href="/contact" variant="cta" icon={ArrowRight}>
              Começar Projeto
            </NavButton>
          </motion.div>

          {/* Mobile Menu */}
          <motion.div
            className="flex items-center gap-3 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Mobile CTA - Simplified */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              Projeto
            </Link>
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <motion.button
                  className="inline-flex items-center justify-center p-2.5 bg-white/40 hover:bg-white/60 backdrop-blur-sm border border-white/30 hover:border-white/50 rounded-xl transition-all duration-200 focus:outline-none focus-visible:shadow-lg focus-visible:shadow-blue-500/25"
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
                    <ArcoLogo />
                    <motion.button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-all duration-200 focus:outline-none focus-visible:shadow-md focus-visible:shadow-slate-400/30"
                      whileTap={{ scale: 0.95 }}
                      aria-label="Fechar menu"
                    >
                      <X className="w-5 h-5 text-slate-600" />
                    </motion.button>
                  </div>

                  {/* Main Navigation */}
                  <nav className="flex-1 p-6" role="navigation" aria-label="Menu principal mobile">
                    <div className="space-y-8">
                      {/* Quick Links */}
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Navegação</h3>
                        {[
                          { title: 'Serviços', href: '/services', icon: ShoppingBag, description: 'Nossas soluções' },
                          { title: 'Portfolio', href: '/case-studies', icon: BookOpen, description: 'Projetos realizados' },
                          { title: 'Sobre Nós', href: '/about', icon: Users, description: 'Nossa história' },
                          { title: 'Contato', href: '/contact', icon: Phone, description: 'Fale conosco' }
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
                              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200">
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
                    {/* Secondary CTA */}
                    <Link
                      href="/assessment"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-3 w-full p-4 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all duration-200 group"
                    >
                      <Crown className="w-5 h-5 text-slate-600 group-hover:text-slate-800" />
                      <span className="font-semibold text-slate-700 group-hover:text-slate-900">Orçamento Gratuito</span>
                    </Link>
                    
                    {/* Primary CTA */}
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Link
                        href="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-3 w-full p-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 group relative overflow-hidden"
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

export default PremiumNavigation;