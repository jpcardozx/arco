/**
 * PROFESSIONAL NAVIGATION - B2B Excellence
 *
 * Philosophy:
 * - Navigation exists to help users find content, NOT to impress
 * - Performance > Visual effects
 * - Clarity > Creativity
 * - Accessibility > Aesthetics
 *
 * Design Principles:
 * - Clean glassmorphism (no Three.js pollution)
 * - Proper hierarchy: Services → Solutions → About → Contact
 * - Single primary CTA (Falar com Especialista)
 * - Responsive logo transition (subtle, professional)
 * - Fast mobile menu (no unnecessary delays)
 * - Accessibility first (WCAG AAA)
 */

'use client';

import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  X,
  ArrowRight,
  MessageSquare,
  Home,
  Briefcase,
  Layers,
  Phone,
  Calendar,
  Zap,
  User
} from 'lucide-react';

// ============================================================================
// LOGO COMPONENT - Clean & Professional
// ============================================================================

const ArcoLogo = memo(({ isScrolled }: { isScrolled: boolean }) => (
  <motion.div
    className="relative"
    whileHover={{ scale: 1.01 }}
    transition={{ duration: 0.2 }}
  >
    <motion.div
      animate={{ height: isScrolled ? 40 : 48 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image
        src="/logos/horizontal/colorful.png"
        alt="ARCO - Desenvolvimento Web e Marketing Digital"
        width={160}
        height={48}
        className="object-contain h-full w-auto"
        priority
        quality={95}
        sizes="(max-width: 768px) 120px, 160px"
      />
    </motion.div>
  </motion.div>
));

ArcoLogo.displayName = 'ArcoLogo';

// ============================================================================
// NAVIGATION STRUCTURE - Proper Hierarchy
// ============================================================================

const navigationItems = [
  {
    label: 'Início',
    href: '/',
    icon: Home,
    description: 'Página inicial'
  },
  {
    label: 'Serviços',
    href: '/services',
    icon: Briefcase,
    description: 'Nossas soluções'
  },
  {
    label: 'Soluções',
    href: '/metodologia',
    icon: Layers,
    description: 'Metodologia e processos'
  },
  {
    label: 'Agendamentos',
    href: '/agendamentos',
    icon: Calendar,
    description: 'Agende uma consultoria'
  },
  {
    label: 'Contato',
    href: '/contact',
    icon: Phone,
    description: 'Fale conosco'
  }
];

// Secondary navigation (for footer or mobile)
const secondaryItems = [
  {
    label: 'Quiz',
    href: '/quiz',
    icon: Zap,
    description: 'Descubra sua solução ideal'
  },
  {
    label: 'Desenvolvedor',
    href: '/jpcardozo',
    icon: User,
    description: 'Portfólio técnico'
  }
];

// ============================================================================
// NAVIGATION ITEM - Clean & Accessible
// ============================================================================

interface NavItemProps {
  href: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem = memo(({ href, label, isActive, onClick }: NavItemProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      "relative px-3 py-2 text-sm font-medium transition-colors duration-200",
      "hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg",
      isActive ? "text-slate-900" : "text-slate-600"
    )}
  >
    <span className="relative z-10">{label}</span>

    {/* Active indicator */}
    {isActive && (
      <motion.div
        layoutId="activeIndicator"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-full"
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    )}

    {/* Hover background */}
    <motion.div
      className="absolute inset-0 bg-slate-100 rounded-lg -z-10"
      initial={{ opacity: 0, scale: 0.95 }}
      whileHover={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15 }}
    />
  </Link>
));

NavItem.displayName = 'NavItem';

// ============================================================================
// PRIMARY CTA - Single, Clear Call-to-Action
// ============================================================================

const PrimaryCTA = memo(({ isScrolled }: { isScrolled: boolean }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.2 }}
  >
    <Link
      href="/contact"
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30"
      style={{
        background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
      }}
    >
      <MessageSquare className="w-4 h-4" />
      {!isScrolled && <span>Falar com Especialista</span>}
      {isScrolled && <span>Contato</span>}
    </Link>
  </motion.div>
));

PrimaryCTA.displayName = 'PrimaryCTA';

// ============================================================================
// MOBILE MENU ITEM - Fast & Clear
// ============================================================================

interface MobileMenuItemProps {
  item: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
  };
  onClose: () => void;
}

const MobileMenuItem = memo(({ item, onClose }: MobileMenuItemProps) => (
  <Link
    href={item.href}
    onClick={onClose}
    className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group"
  >
    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-50 text-teal-600 group-hover:bg-teal-100 transition-colors">
      <item.icon className="w-5 h-5" />
    </div>

    <div className="flex-1">
      <div className="font-semibold text-slate-900">{item.label}</div>
      <div className="text-sm text-slate-500">{item.description}</div>
    </div>

    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-teal-600 transition-colors" />
  </Link>
));

MobileMenuItem.displayName = 'MobileMenuItem';

// ============================================================================
// MAIN NAVIGATION COMPONENT
// ============================================================================

export const ProfessionalNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allMobileItems = [...navigationItems, ...secondaryItems];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(255, 255, 255, 0.80)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        boxShadow: isScrolled
          ? '0 4px 24px rgba(0, 0, 0, 0.06)'
          : '0 2px 8px rgba(0, 0, 0, 0.03)'
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between"
          animate={{
            height: isScrolled ? 64 : 80
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg"
          >
            <ArcoLogo isScrolled={isScrolled} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={pathname === item.href}
              />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/assessment"
              className="px-4 py-2 text-sm font-medium text-teal-700 hover:text-teal-800 hover:bg-teal-50 rounded-lg transition-colors"
            >
              Análise Gratuita
            </Link>
            <PrimaryCTA isScrolled={isScrolled} />
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-sm text-white"
              style={{
                background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
              }}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contato</span>
            </Link>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="inline-flex items-center justify-center p-2.5 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Menu"
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <X className="w-5 h-5 text-slate-700" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Menu className="w-5 h-5 text-slate-700" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full sm:w-96 p-0 bg-white"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <ArcoLogo isScrolled={false} />
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      aria-label="Fechar menu"
                    >
                      <X className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>

                  {/* Navigation */}
                  <nav className="flex-1 overflow-y-auto p-6" role="navigation" aria-label="Mobile navigation">
                    <div className="space-y-1">
                      {allMobileItems.map((item) => (
                        <MobileMenuItem
                          key={item.href}
                          item={item}
                          onClose={() => setIsMobileMenuOpen(false)}
                        />
                      ))}
                    </div>
                  </nav>

                  {/* Bottom CTA */}
                  <div className="p-6 border-t border-slate-200">
                    <Link
                      href="/assessment"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors"
                    >
                      Análise Gratuita
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
};

export default ProfessionalNavigation;
