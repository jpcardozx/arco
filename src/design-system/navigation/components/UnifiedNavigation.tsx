/**
 * UnifiedNavigation Component
 *
 * Navbar definitiva e global para todo o projeto ARCO
 *
 * Features:
 * - Logo transition white → colorful on scroll
 * - Glassmorphism responsivo
 * - Suporte a temas (light/dark/auto)
 * - Variantes configuráveis (landing/corporate/dashboard)
 * - Componentes atômicos reutilizáveis
 * - Mobile-first e acessível
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowRight,
  BookOpen,
  ShoppingBag,
  Building2,
  Phone,
  Calendar,
  Briefcase,
  Mail,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ElegantLineAnimation } from '@/components/effects/ElegantBorderAnimation';
import { useNavigation } from '../hooks/useNavigation';
import { NavigationLogo } from './NavigationLogo';
import { NavigationLink } from './NavigationLink';
import { NavigationCTA } from './NavigationCTA';
import { navigationTokens, type NavigationVariant, type NavigationTheme } from '../tokens';

// Navigation configuration by variant
const NAVIGATION_CONFIG = {
  landing: {
    links: [
      { href: '/services', label: 'Soluções', icon: ShoppingBag },
      { href: '/metodologia', label: 'Como Funciona', icon: BookOpen },
      { href: '/#cases', label: 'Cases', icon: Award },
      { href: '/contato', label: 'Contato', icon: Phone },
    ],
    cta: {
      primary: { href: '/login', label: 'Login', icon: ArrowRight },
      secondary: { href: '/contato', label: 'Começar Projeto' },
    },
  },
  corporate: {
    links: [
      { href: '/jpcardozo', label: 'Desenvolvedor', icon: BookOpen },
      { href: '/services', label: 'Serviços', icon: Briefcase },
      { href: '/sobre', label: 'Sobre', icon: Building2 },
      { href: '/agendamentos', label: 'Agendamentos', icon: Calendar },
      { href: '/contato', label: 'Contato', icon: Mail },
    ],
    cta: {
      primary: { href: '/contato', label: 'Iniciar Projeto', icon: ArrowRight },
      secondary: null,
    },
  },
  dashboard: {
    links: [
      { href: '/dashboard', label: 'Dashboard', icon: BookOpen },
      { href: '/agendamentos', label: 'Agendamentos', icon: Calendar },
      { href: '/clientes', label: 'Clientes', icon: ShoppingBag },
    ],
    cta: {
      primary: null,
      secondary: null,
    },
  },
} as const;

interface UnifiedNavigationProps {
  variant?: NavigationVariant;
  theme?: NavigationTheme;
  showParticles?: boolean;
  className?: string;
}

export const UnifiedNavigation: React.FC<UnifiedNavigationProps> = ({
  variant = 'landing',
  theme = 'auto',
  showParticles = true,
  className,
}) => {
  const navigation = useNavigation({ variant, theme, enableParticles: showParticles });
  const config = NAVIGATION_CONFIG[variant];

  const {
    isScrolled,
    isMobileMenuOpen,
    colors,
    getBackgroundStyle,
    toggleMobileMenu,
    closeMobileMenu,
  } = navigation;

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        className={cn('fixed top-0 left-0 right-0', className)}
        style={{ zIndex: navigationTokens.zIndex.navbar }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="relative">
          {/* Background with glassmorphism */}
          <div
            className="absolute inset-0 transition-all duration-300"
            style={getBackgroundStyle()}
          >
            {/* Border bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px transition-colors duration-300"
              style={{
                background: isScrolled
                  ? `linear-gradient(to right, transparent, ${colors.border.default}, transparent)`
                  : 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
              }}
            />
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              className="flex items-center justify-between"
              animate={{
                height: isScrolled
                  ? navigationTokens.height.desktop.scrolled
                  : navigationTokens.height.desktop.default,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Logo */}
              <NavigationLogo
                navigation={navigation}
                showParticles={navigation.enableParticles}
                logoVariant="auto"
              />

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-2">
                {config.links.map((link) => (
                  <NavigationLink
                    key={link.href}
                    navigation={navigation}
                    href={link.href}
                    icon={link.icon}
                  >
                    {link.label}
                  </NavigationLink>
                ))}
              </nav>

              {/* Desktop CTAs */}
              <div className="hidden md:flex items-center gap-3">
                {config.cta.primary && (
                  <NavigationCTA
                    navigation={navigation}
                    href={config.cta.primary.href}
                    icon={config.cta.primary.icon}
                    variant="primary"
                  >
                    {config.cta.primary.label}
                  </NavigationCTA>
                )}

                {config.cta.secondary && (
                  <NavigationCTA
                    navigation={navigation}
                    href={config.cta.secondary.href}
                    variant="secondary"
                  >
                    {config.cta.secondary.label}
                  </NavigationCTA>
                )}
              </div>

              {/* Mobile Menu */}
              <div className="flex items-center gap-2 md:hidden">
                {config.cta.primary && (
                  <NavigationCTA
                    navigation={navigation}
                    href={config.cta.primary.href}
                    icon={config.cta.primary.icon}
                    variant="primary"
                    compact
                  >
                    {config.cta.primary.label}
                  </NavigationCTA>
                )}

                <Sheet open={isMobileMenuOpen} onOpenChange={toggleMobileMenu}>
                  <SheetTrigger asChild>
                    <motion.button
                      className={cn(
                        'p-2.5 rounded-xl border backdrop-blur-sm transition-all',
                        isScrolled
                          ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-slate-300'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-600/50 hover:border-slate-500/50'
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Menu"
                    >
                      <AnimatePresence mode="wait">
                        {isMobileMenuOpen ? (
                          <X className={cn('w-5 h-5', isScrolled ? 'text-slate-900' : 'text-white')} />
                        ) : (
                          <Menu className={cn('w-5 h-5', isScrolled ? 'text-slate-900' : 'text-white')} />
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    className="w-full sm:w-96 p-0 border-l border-slate-700/50 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 backdrop-blur-2xl"
                  >
                    <MobileMenu config={config} navigation={navigation} />
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
      <div
        style={{
          height: isScrolled
            ? navigationTokens.height.desktop.scrolled
            : navigationTokens.height.desktop.default,
        }}
      />
    </>
  );
};

// Mobile Menu Component
interface MobileMenuProps {
  config: typeof NAVIGATION_CONFIG[NavigationVariant];
  navigation: ReturnType<typeof useNavigation>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ config, navigation }) => {
  const { closeMobileMenu, isPathActive } = navigation;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-700/50 bg-slate-800/30">
        <NavigationLogo navigation={navigation} showParticles={false} />
        <motion.button
          onClick={closeMobileMenu}
          className="p-2 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-5 space-y-2 overflow-y-auto">
        {config.links.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={link.href}
              onClick={closeMobileMenu}
              className={cn(
                'flex items-center gap-4 p-4 rounded-xl transition-all group',
                isPathActive(link.href)
                  ? 'bg-gradient-to-br from-teal-500/15 to-teal-600/10 border border-teal-500/30 shadow-lg shadow-teal-500/10'
                  : 'hover:bg-white/10 border border-transparent hover:border-white/10'
              )}
            >
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center transition-all flex-shrink-0',
                  isPathActive(link.href)
                    ? 'bg-teal-500/20 text-teal-400 shadow-lg shadow-teal-500/20'
                    : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-slate-200'
                )}
              >
                <link.icon className="w-5 h-5" />
              </div>

              <span
                className={cn(
                  'flex-1 font-semibold text-base',
                  isPathActive(link.href) ? 'text-white' : 'text-slate-300 group-hover:text-white'
                )}
              >
                {link.label}
              </span>

              <ArrowRight
                className={cn(
                  'w-5 h-5 transition-all flex-shrink-0',
                  isPathActive(link.href)
                    ? 'text-teal-400'
                    : 'text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1'
                )}
              />
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Bottom CTAs */}
      {(config.cta.primary || config.cta.secondary) && (
        <div className="p-5 border-t border-slate-700/50 bg-slate-800/30 space-y-3">
          <p className="text-xs text-center text-slate-500">
            Sistema de agendamento online disponível 24/7
          </p>
        </div>
      )}
    </div>
  );
};

// Re-export Link from next
import Link from 'next/link';

export default UnifiedNavigation;
