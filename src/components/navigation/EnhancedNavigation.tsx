'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  Users,
  ArrowRight,
  Phone,
  X,
  BookOpen,
  ShoppingBag,
  Sparkles,
  Star,
  Zap,
  ClipboardCheck,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/design-system/tokens';

// Enhanced ARCO Logo with micro-interactions
const ArcoLogo = ({ className, isScrolled }: { className?: string; isScrolled?: boolean }) => (
  <motion.div
    className={cn("relative cursor-pointer", className)}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
  >
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1]
      }}
      className="relative flex items-center"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 scale-150" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 blur-xl rounded-full opacity-0 group-hover:opacity-80 transition-all duration-500" />
        <motion.div
          animate={{
            height: isScrolled ? 40 : 48
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <Image
            src="/logos/horizontal/colorful.png"
            alt="ARCO - Desenvolvimento Web e Marketing Digital"
            width={160}
            height={52}
            className="object-contain h-full w-auto drop-shadow-sm"
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
      </div>
    </motion.div>
  </motion.div>
);

// Professional Navigation Button - NO DUPLICATIONS
const NavButton = ({ 
  href, 
  children, 
  icon: Icon, 
  variant = "ghost", 
  isActive = false,
  badge
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: "ghost" | "cta";
  isActive?: boolean;
  badge?: string;
}) => (
  <Link 
    href={href} 
    className={cn(
      "group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-bold",
      "transition-all duration-300 ease-out rounded-xl overflow-hidden",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
      "hover:scale-[1.02] active:scale-[0.98]",
      variant === "cta" 
        ? "text-white"
        : cn(
            "text-slate-700 hover:text-slate-900",
            isActive && "text-slate-900"
          )
    )}
    style={{
      background: variant === "cta"
        ? 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 50%, #6366f1 100%)'
        : isActive 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.65) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.20) 100%)',
      backdropFilter: variant === "cta" ? 'none' : 'blur(24px) saturate(150%)',
      WebkitBackdropFilter: variant === "cta" ? 'none' : 'blur(24px) saturate(150%)',
      border: variant === "cta" ? 'none' : `1px solid ${isActive ? 'rgba(20,184,166,0.35)' : 'rgba(255,255,255,0.40)'}`,
      boxShadow: variant === "cta"
        ? '0 10px 40px rgba(59,130,246,0.35), 0 4px 16px rgba(59,130,246,0.2), inset 0 1px 0 rgba(255,255,255,0.25)'
        : isActive
        ? '0 4px 20px rgba(20,184,166,0.12), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.70), inset 0 0 0 1px rgba(20,184,166,0.15)'
        : '0 2px 8px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.60)'
    }}
    aria-current={isActive ? "page" : undefined}
  >
    {/* Hover glow layer */}
    <div 
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
      style={{
        background: variant === "cta"
          ? 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)'
          : 'radial-gradient(circle at center, rgba(20,184,166,0.12) 0%, rgba(13,148,136,0.08) 50%, transparent 100%)'
      }}
    />
    
    {/* Shimmer effect */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
      initial={{ x: '-100%' }}
      whileHover={{ x: '200%' }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    />
    
    {Icon && (
      <Icon className="w-4 h-4 transition-all duration-300 relative z-10 group-hover:scale-110" />
    )}
    
    <span className="relative z-10 flex items-center gap-1.5">
      {children}
      {badge && (
        <span className="px-1.5 py-0.5 text-[10px] font-black bg-white/30 rounded-full">
          {badge}
        </span>
      )}
    </span>
    
    {/* Active indicator */}
    {isActive && variant === "ghost" && (
      <motion.div
        className="absolute bottom-0.5 left-1/2 w-8 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
        initial={{ width: 0, x: '-50%' }}
        animate={{ width: 32, x: '-50%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    )}
    
    {/* Hover indicator for non-active */}
    {!isActive && variant === "ghost" && (
      <div className="absolute bottom-0.5 left-1/2 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full w-0 group-hover:w-8 -translate-x-1/2 transition-all duration-300" />
    )}
  </Link>
);

// Enhanced Mobile Menu Item - Advanced Animations
const MobileNavItem = ({ item, index, onClose }: {
  item: {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    badge?: string;
    featured?: boolean;
  };
  index: number;
  onClose: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -40, scale: 0.95 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    transition={{ 
      duration: 0.5, 
      delay: 0.05 + index * 0.08,
      ease: [0.16, 1, 0.3, 1]
    }}
    whileHover={{ scale: 1.02, x: 4 }}
    whileTap={{ scale: 0.98 }}
  >
    <Link
      href={item.href}
      onClick={onClose}
      className={cn(
        "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
        "hover:shadow-2xl active:shadow-lg",
        item.featured && "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
      )}
      style={{
        background: item.featured 
          ? undefined 
          : 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.4) 100%)',
        backdropFilter: !item.featured ? 'blur(20px)' : undefined
      }}
    >
      {/* Enhanced glow for featured */}
      {item.featured && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      
      <motion.div 
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-xl shadow-lg relative z-10",
          item.featured
            ? "bg-gradient-to-br from-blue-500 to-indigo-600"
            : "bg-gradient-to-br from-slate-600 to-slate-700"
        )}
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <item.icon className="w-5 h-5 text-white drop-shadow-sm" />
      </motion.div>
      
      <div className="flex-1 relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900">{item.title}</span>
          {item.badge && (
            <motion.span 
              className="px-2 py-0.5 text-xs font-black bg-blue-500 text-white rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 500 }}
            >
              {item.badge}
            </motion.span>
          )}
          {item.featured && (
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            </motion.div>
          )}
        </div>
        <div className="text-sm text-slate-600 mt-0.5 font-medium">{item.description}</div>
      </div>
      
      <motion.div
        className="relative z-10"
        initial={{ x: 0 }}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors duration-300" />
      </motion.div>
    </Link>
  </motion.div>
);

export const EnhancedNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navigationItems = [
    {
      title: 'Serviços',
      href: '/services',
      icon: ShoppingBag,
      description: 'Soluções sob medida',
      featured: true
    },
    {
      title: 'Portfolio',
      href: '/portfolio',
      icon: BookOpen,
      description: 'Cases reais de crescimento'
    },
    {
      title: 'Sobre',
      href: '/about',
      icon: Users,
      description: 'Conheça nossa expertise'
    },
    {
      title: 'Contato',
      href: '/contact',
      icon: Phone,
      description: 'Fale conosco'
    }
  ];

  const mobileItems = [
    ...navigationItems,
    {
      title: 'Orçamento Gratuito',
      href: '/assessment',
      icon: Star,
      description: 'Análise sem compromisso',
      featured: true,
      badge: 'Grátis'
    }
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled
          ? 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.4) 100%)',
        backdropFilter: isScrolled ? 'blur(48px) saturate(200%) brightness(105%)' : 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: isScrolled ? 'blur(48px) saturate(200%) brightness(105%)' : 'blur(32px) saturate(180%)',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
        boxShadow: isScrolled
          ? '0 10px 50px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)'
          : '0 4px 24px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 30
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between gap-4"
          animate={{ 
            height: isScrolled ? 56 : 96,
            paddingTop: isScrolled ? 3 : 24,
            paddingBottom: isScrolled ? 3 : 24
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo - Ultra compacta no scroll */}
          <Link 
            href="/" 
            className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 rounded-xl transition-all duration-200"
          >
            <ArcoLogo isScrolled={isScrolled} />
          </Link>

          {/* Center Navigation */}
          <nav
            className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-auto"
            role="navigation"
            aria-label="Main navigation"
          >
            <motion.div 
              className="flex items-center rounded-2xl relative"
              animate={{
                gap: isScrolled ? 8 : 12,
                paddingTop: isScrolled ? 8 : 12,
                paddingBottom: isScrolled ? 8 : 12,
                paddingLeft: isScrolled ? 12 : 16,
                paddingRight: isScrolled ? 12 : 16
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.55) 50%, rgba(249,250,251,0.60) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                border: '1px solid rgba(255,255,255,0.50)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04), 0 0 0 1px rgba(20,184,166,0.08), inset 0 1px 0 rgba(255,255,255,0.80), inset 0 -1px 0 rgba(0,0,0,0.03)'
              }}
            >
              {navigationItems.map((item) => (
                <NavButton
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  isActive={activeItem === item.href}
                >
                  {item.title}
                </NavButton>
              ))}
            </motion.div>
          </nav>

          {/* Right Side - CTAs Premium */}
          <motion.div 
            className={cn(
              "hidden lg:flex items-center flex-shrink-0 transition-all duration-300",
              isScrolled ? "gap-3" : "gap-4"
            )}
          >
            {/* Assessment CTA - Professional Secondary Action */}
            <motion.div
              whileHover={{ scale: 1.02, y: -1.5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/assessment"
                className="group inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.16) 0%, rgba(5,150,105,0.12) 50%, rgba(4,120,87,0.10) 100%)',
                  backdropFilter: 'blur(32px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                  border: '1.5px solid rgba(16,185,129,0.35)',
                  boxShadow: '0 2px 12px rgba(16,185,129,0.12), 0 1px 4px rgba(5,150,105,0.08), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 0 0 1px rgba(16,185,129,0.15)',
                  paddingLeft: isScrolled ? '14px' : '18px',
                  paddingRight: isScrolled ? '14px' : '18px',
                  paddingTop: isScrolled ? '10px' : '12px',
                  paddingBottom: isScrolled ? '10px' : '12px'
                }}
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.20) 0%, rgba(5,150,105,0.12) 50%, transparent 75%)'
                  }}
                />
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -2 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative z-10"
                >
                  <ClipboardCheck className="w-4 h-4 text-emerald-700 group-hover:text-emerald-800 transition-colors stroke-[2.5]" />
                </motion.div>
                {!isScrolled && (
                  <span className="relative z-10 font-semibold text-emerald-800 group-hover:text-emerald-900 tracking-[-0.01em] transition-colors text-sm">
                    Análise Gratuita
                  </span>
                )}
              </Link>
            </motion.div>
            
            {/* Primary CTA - Refined Gradient */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02, y: -1.5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Enhanced multi-layer glow */}
              <motion.div 
                className="absolute -inset-1.5 rounded-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(20,184,166,0.5) 0%, rgba(13,148,136,0.28) 40%, transparent 70%)',
                  filter: 'blur(16px)'
                }}
              />
              <motion.div 
                className="absolute -inset-2 rounded-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(20,184,166,0.35) 0%, transparent 60%)',
                  filter: 'blur(24px)'
                }}
              />
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 25%, #0f766e 60%, #115e59 100%)',
                  boxShadow: '0 4px 24px rgba(20,184,166,0.35), 0 2px 12px rgba(13,148,136,0.25), 0 1px 4px rgba(15,118,110,0.20), inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.15), inset 0 0 0 1px rgba(94,234,212,0.25)',
                  border: '1px solid rgba(94,234,212,0.40)',
                  paddingLeft: isScrolled ? '16px' : '22px',
                  paddingRight: isScrolled ? '16px' : '22px',
                  paddingTop: isScrolled ? '10px' : '12px',
                  paddingBottom: isScrolled ? '10px' : '12px'
                }}
              >
                {/* Premium shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/28 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                />
                {/* Dual radial glows */}
                <motion.div 
                  className="absolute inset-0 rounded-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.22) 0%, transparent 50%)'
                  }}
                />
                <motion.div 
                  className="absolute inset-0 rounded-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  style={{
                    background: 'radial-gradient(circle at 50% 100%, rgba(4,120,87,0.35) 0%, transparent 50%)'
                  }}
                />
                <div className="flex items-center justify-center relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, y: -1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <MessageSquare className="w-4 h-4 text-white drop-shadow-md stroke-[2]" />
                  </motion.div>
                  <span className="font-semibold text-white tracking-[-0.01em] text-sm">
                    {isScrolled ? 'Falar com Consultor' : 'Falar com Especialista'}
                  </span>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 lg:hidden">
            {/* Mobile CTA */}
            <motion.div
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 30%, #0f766e 70%, #115e59 100%)',
                  boxShadow: '0 4px 20px rgba(20,184,166,0.35), 0 2px 10px rgba(13,148,136,0.25), inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.12)',
                  border: '1px solid rgba(94,234,212,0.40)'
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/28 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                />
                <MessageSquare className="w-4 h-4 text-white relative z-10 drop-shadow-sm stroke-[2]" />
                <span className="relative z-10 tracking-[-0.01em]">Falar com Consultor</span>
              </Link>
            </motion.div>
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <motion.button
                  className="inline-flex items-center justify-center p-3 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.4) 100%)',
                    backdropFilter: 'blur(32px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(32px) saturate(200%)',
                    border: '1px solid rgba(255,255,255,0.7)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.95)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Abrir menu"
                >
                  <motion.div
                    animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <Menu className="w-5 h-5 text-slate-700" />
                  </motion.div>
                </motion.button>
              </SheetTrigger>
              
              <SheetContent
                side="right"
                className="w-full sm:w-80 border-l border-white/20 p-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)',
                  backdropFilter: 'blur(48px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(48px) saturate(200%)'
                }}
              >
                <motion.div 
                  className="flex flex-col h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {/* Enhanced Header */}
                  <div className="flex items-center justify-between p-6 border-b border-slate-200/60">
                    <ArcoLogo />
                    <motion.button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
                      whileTap={{ scale: 0.95 }}
                      aria-label="Fechar menu"
                    >
                      <X className="w-5 h-5 text-slate-600" />
                    </motion.button>
                  </div>

                  {/* Enhanced Navigation */}
                  <nav className="flex-1 p-6" role="navigation" aria-label="Menu principal mobile">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Navegação
                        </h3>
                        {mobileItems.map((item, index) => (
                          <MobileNavItem
                            key={item.title}
                            item={item}
                            index={index}
                            onClose={() => setIsMobileMenuOpen(false)}
                          />
                        ))}
                      </div>
                    </div>
                  </nav>

                  {/* Bottom CTA */}
                  <motion.div 
                    className="p-6 border-t border-slate-200/60"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2.5 w-full px-6 py-4 text-white rounded-xl transition-all duration-300 group relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 30%, #0f766e 70%, #115e59 100%)',
                          boxShadow: '0 8px 32px rgba(20,184,166,0.40), 0 4px 16px rgba(13,148,136,0.28), 0 2px 6px rgba(15,118,110,0.22), inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.15), inset 0 0 0 1px rgba(94,234,212,0.25)',
                          border: '1px solid rgba(94,234,212,0.40)'
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '200%' }}
                          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                        />
                        {/* Multi-layer radial glows */}
                        <motion.div 
                          className="absolute inset-0 rounded-xl"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          style={{
                            background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.22) 0%, transparent 50%)'
                          }}
                        />
                        <motion.div 
                          className="absolute inset-0 rounded-xl"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.05 }}
                          style={{
                            background: 'radial-gradient(circle at 50% 100%, rgba(15,118,110,0.30) 0%, transparent 50%)'
                          }}
                        />
                        <motion.div
                          whileHover={{ scale: 1.1, y: -1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <MessageSquare className="w-5 h-5 text-white relative z-10 drop-shadow-md stroke-[2]" />
                        </motion.div>
                        <span className="font-semibold relative z-10 text-base tracking-[-0.01em]">Falar com Especialista</span>
                        <motion.div
                          className="relative z-10"
                          initial={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                          <ArrowRight className="w-5 h-5 drop-shadow-sm" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default EnhancedNavigation;