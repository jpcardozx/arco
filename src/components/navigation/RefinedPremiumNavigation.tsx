/**
 * REFINED PREMIUM NAVIGATION
 * Professional, purposeful, unique
 *
 * FIXES:
 * ✓ Removed cursor-following particles (distracting)
 * ✓ White/light logo for dark navbar (proper contrast)
 * ✓ Strong, specific copy in CTAs (not generic)
 * ✓ Unique UI/UX with brand identity
 *
 * Three.js Approach:
 * - VERY subtle ambient depth OR completely removed
 * - NO interactive gimmicks
 * - Focus on clean, fast, professional design
 *
 * Design Identity:
 * - Dark glassmorphic navbar (slate-900 base)
 * - Teal accent color (brand identity)
 * - Sharp, confident typography
 * - Clear hierarchy and spacing
 * - Professional hover states
 */

'use client';

import React, { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, MessageSquare, BookOpen, Calendar, Zap, Briefcase, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ElegantLineAnimation } from '@/components/effects/ElegantBorderAnimation';
import * as THREE from 'three';

// ============================================================================
// THREE.JS - VERY Subtle Background Depth (Optional)
// ============================================================================

// Minimal ambient particles for subtle depth ONLY
function SubtleDepthField() {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef} geometry={particles}>
      <pointsMaterial
        size={0.02}
        color="#14b8a6"
        transparent
        opacity={0.15}
        sizeAttenuation
      />
    </points>
  );
}

// ============================================================================
// LOGO - WHITE for Dark Navbar
// ============================================================================

const RefinedLogo = ({ isScrolled }: { isScrolled: boolean }) => (
  <Link href="/" className="relative group flex-shrink-0">
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      <motion.div
        animate={{ height: isScrolled ? 36 : 44 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden"
        style={{ width: 'auto', maxWidth: '140px' }}
      >
        {/* Use white/light logo for dark navbar */}
        <Image
          src="/logos/horizontal/white.png"
          alt="ARCO - Desenvolvimento Web e Tráfego Pago"
          width={140}
          height={44}
          className="object-contain object-left h-full w-auto"
          priority
          quality={95}
          style={{ maxHeight: '100%' }}
        />
        {/* Subtle glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-teal-500/20 -z-10 pointer-events-none" />
      </motion.div>
    </motion.div>
  </Link>
);

// ============================================================================
// NAVIGATION ITEMS - Clear Hierarchy
// ============================================================================

const navigationItems = [
  {
    label: 'Desenvolvedor',
    href: '/jpcardozo',
    icon: BookOpen,
  },
  {
    label: 'Serviços',
    href: '/services',
    icon: Briefcase,
  },
  {
    label: 'Agendamentos',
    href: '/agendamentos',
    icon: Calendar,
  },
  {
    label: 'Contato',
    href: '/contato',
    icon: Mail,
  }
];

// ============================================================================
// NAV LINK - Professional & Clean
// ============================================================================

interface NavLinkProps {
  item: typeof navigationItems[0];
  isActive: boolean;
  onClick?: () => void;
}

const RefinedNavLink = ({ item, isActive, onClick }: NavLinkProps) => {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className="relative group"
    >
      <motion.div
        className={cn(
          "relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200",
          isActive
            ? "text-white bg-gradient-to-br from-teal-500/15 to-teal-600/10 shadow-lg shadow-teal-500/10 border border-teal-500/20"
            : "text-slate-200 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10"
        )}
        whileHover={{ y: -1, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
      >
        <item.icon className={cn(
          "w-4 h-4 transition-colors flex-shrink-0",
          isActive ? "text-teal-400" : "text-slate-400 group-hover:text-slate-200"
        )} />

        <span className="whitespace-nowrap">{item.label}</span>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="navActive"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent rounded-full"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </motion.div>
    </Link>
  );
};

// ============================================================================
// CTAs - STRONG Copy, Not Generic
// ============================================================================

const PrimaryCTA = ({ compact = false }: { compact?: boolean }) => (
  <Link href="/contato">
    <motion.div
      className={cn(
        "relative group overflow-hidden",
        compact ? "rounded-lg" : "rounded-xl"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Refined gradient background */}
      <motion.div
        className={cn(
          "relative flex items-center justify-center gap-2.5 font-bold text-white",
          "backdrop-blur-md",
          compact 
            ? "px-3.5 py-2 text-sm" 
            : "px-6 py-3 text-base"
        )}
        style={{
          background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)',
          boxShadow: '0 4px 20px rgba(20, 184, 166, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
          border: '1px solid rgba(20, 184, 166, 0.3)',
        }}
      >
        {/* Subtle animated glow */}
        <motion.div
          className="absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 blur-sm -z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(20,184,166,0.4), rgba(6,182,212,0.3))',
          }}
          animate={{ 
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Icon with smooth rotation */}
        <motion.div
          whileHover={{ rotateZ: 8 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        >
          <MessageSquare className="w-4.5 h-4.5 flex-shrink-0" strokeWidth={2.5} />
        </motion.div>

        {/* Text */}
        <span className={cn(
          "font-bold tracking-tight relative z-10",
          compact ? "hidden sm:inline" : ""
        )}>
          {compact ? "Conversa" : "Agendar Conversa"}
        </span>

        {/* Refined shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-150%' }}
          whileHover={{ x: '150%' }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </motion.div>
    </motion.div>
  </Link>
);

// ============================================================================
// MOBILE MENU ITEM
// ============================================================================

interface MobileItemProps {
  item: typeof navigationItems[0];
  isActive: boolean;
  onClose: () => void;
}

const MobileNavItem = ({ item, isActive, onClose }: MobileItemProps) => (
  <Link
    href={item.href}
    onClick={onClose}
  >
    <motion.div
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl transition-all group",
        isActive
          ? "bg-gradient-to-br from-teal-500/15 to-teal-600/10 border border-teal-500/30 shadow-lg shadow-teal-500/10"
          : "hover:bg-white/10 border border-transparent hover:border-white/10"
      )}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center transition-all flex-shrink-0",
        isActive
          ? "bg-teal-500/20 text-teal-400 shadow-lg shadow-teal-500/20"
          : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-slate-200"
      )}>
        <item.icon className="w-5 h-5" />
      </div>

      <span className={cn(
        "flex-1 font-semibold text-base",
        isActive ? "text-white" : "text-slate-300 group-hover:text-white"
      )}>
        {item.label}
      </span>

      <ArrowRight className={cn(
        "w-5 h-5 transition-all flex-shrink-0",
        isActive ? "text-teal-400" : "text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1"
      )} />
    </motion.div>
  </Link>
);

// ============================================================================
// MAIN NAVIGATION
// ============================================================================

export const RefinedPremiumNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navigation Bar with Elegant Glassmorphism */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div
          className={cn(
            "border-b transition-all duration-300",
            isScrolled 
              ? "bg-slate-900/95 backdrop-blur-xl border-slate-700/50 shadow-xl shadow-black/20" 
              : "bg-slate-900/80 backdrop-blur-lg border-white/5"
          )}
          style={{
            backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'blur(16px) saturate(150%)',
            WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'blur(16px) saturate(150%)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex items-center justify-between"
              animate={{
                height: isScrolled ? 68 : 80,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <RefinedLogo isScrolled={isScrolled} />

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                {navigationItems.map((item) => (
                  <RefinedNavLink
                    key={item.href}
                    item={item}
                    isActive={pathname === item.href}
                  />
                ))}
              </nav>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-3">
                <PrimaryCTA />
              </div>

              {/* Mobile */}
              <div className="flex items-center gap-2 lg:hidden">
                <PrimaryCTA compact />

                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <motion.button 
                      className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 hover:border-slate-500/50 backdrop-blur-sm transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <AnimatePresence mode="wait">
                        {isMobileMenuOpen ? (
                          <X className="w-5 h-5 text-white" />
                        ) : (
                          <Menu className="w-5 h-5 text-white" />
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    className="w-full sm:w-96 p-0 border-l border-slate-700/50 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 backdrop-blur-2xl"
                  >
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-center justify-between p-5 border-b border-slate-700/50 bg-slate-800/30">
                        <RefinedLogo isScrolled={false} />
                        <motion.button
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="p-2 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10 transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <X className="w-5 h-5 text-white" />
                        </motion.button>
                      </div>

                      {/* Navigation */}
                      <nav className="flex-1 p-5 space-y-2 overflow-y-auto">
                        {navigationItems.map((item, index) => (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <MobileNavItem
                              item={item}
                              isActive={pathname === item.href}
                              onClose={() => setIsMobileMenuOpen(false)}
                            />
                          </motion.div>
                        ))}
                      </nav>

                      {/* Bottom Action */}
                      <div className="p-5 border-t border-slate-700/50 bg-slate-800/30 space-y-3">
                        <p className="text-xs text-center text-slate-500">
                          Sistema de agendamento online disponível 24/7
                        </p>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Elegant Bottom Border Animation */}
        <ElegantLineAnimation variant="thin" colorScheme="gradient" />
      </motion.nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-20 sm:h-20" />
    </>
  );
};

export default RefinedPremiumNavigation;
