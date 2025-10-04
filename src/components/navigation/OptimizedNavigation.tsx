/**
 * Optimized ARCO Navigation
 * Critical improvements: Smart sticky behavior + Reduced padding + Performance optimizations
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  ShoppingBag,
  Users,
  Crown,
  ArrowRight,
  Phone,
  X,
  BookOpen
} from 'lucide-react';
import { cn, designTokens } from '@/design-system/tokens';
import { ActiveLinkIndicator, MagneticButton, useSmartScroll } from './AnimationEnhancements';

// Optimized Logo with smart sizing
const OptimizedLogo = ({ isScrolled }: { isScrolled: boolean }) => (
  <motion.div
    className="relative group cursor-pointer"
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
  >
    <Link href="/" className="block">
      <motion.div
        animate={{
          scale: isScrolled ? 0.9 : 1,
          y: isScrolled ? 2 : 0
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative"
      >
        <Image
          src="/logos/horizontal/colorful.png"
          alt="ARCO - Desenvolvimento Web e Marketing Digital"
          width={140}
          height={44}
          className={cn(
            "object-contain transition-all duration-300",
            isScrolled ? "h-8 w-auto" : "h-10 w-auto",
            "filter contrast-105 saturate-105",
            "group-hover:contrast-110 group-hover:saturate-110"
          )}
          priority
          quality={90}
          sizes="(max-width: 768px) 100px, 140px"
        />
      </motion.div>
    </Link>
  </motion.div>
);

// Smart Navigation Button with active state
const SmartNavButton = ({
  href,
  children,
  icon: Icon,
  isActive = false,
  variant = "ghost"
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  variant?: "ghost" | "cta";
}) => (
  <ActiveLinkIndicator isActive={isActive}>
    <motion.div
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          "relative px-3 py-2 text-sm font-medium transition-all duration-200",
          isActive
            ? "text-teal-600 bg-teal-50/80"
            : "text-gray-700 hover:text-teal-600 hover:bg-gray-50/80",
          variant === "cta" && "bg-gradient-to-r from-teal-500 to-orange-500 text-white hover:shadow-lg"
        )}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.15 }}
          className="mr-2"
        >
          <Icon className="w-4 h-4" />
        </motion.div>
        {children}
      </Link>
    </motion.div>
  </ActiveLinkIndicator>
);

// Navigation items with current page detection
const navigationItems = [
  { href: '/services', icon: ShoppingBag, label: 'Serviços', id: 'services' },
  { href: '/case-studies', icon: BookOpen, label: 'Portfolio', id: 'portfolio' },
  { href: '/about', icon: Users, label: 'Sobre', id: 'about' },
  { href: '/contato', icon: Phone, label: 'Contato', id: 'contato' },
];

export const OptimizedNavigation = () => {
  const { scrollY } = useScroll();
  const { isScrolled, direction, shouldHide } = useSmartScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  // Smart padding animation based on scroll
  const paddingY = useTransform(scrollY, [0, 100], [24, 12]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);

  // Detect current page for active states
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // Optimized scroll handler with requestAnimationFrame
  const handleScroll = useCallback(() => {
    // Handled by useSmartScroll hook
  }, []);

  return (
    <AnimatePresence>
      <motion.header
        className="fixed top-0 w-full z-50"
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
        }}
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: shouldHide ? -100 : 0,
          opacity: shouldHide ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.3
        }}
      >
        {/* Optimized background with reduced complexity */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: isScrolled
              ? 'rgba(255, 255, 255, 0.95)'
              : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: isScrolled ? 'blur(20px)' : 'blur(12px)',
            WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'blur(12px)',
          }}
          animate={{
            borderBottom: isScrolled
              ? '1px solid rgba(0,0,0,0.1)'
              : '1px solid rgba(0,0,0,0.05)',
          }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-between"
            animate={{
              height: isScrolled ? 56 : 72
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Logo - Optimized sizing */}
            <motion.div
              className="flex-shrink-0"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <OptimizedLogo isScrolled={isScrolled} />
            </motion.div>

            {/* Center Navigation - Smart active states */}
            <motion.nav
              className="hidden lg:flex items-center justify-center flex-1"
              role="navigation"
              aria-label="Navegação principal"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center space-x-1">
                {navigationItems.map((item) => (
                  <SmartNavButton
                    key={item.id}
                    href={item.href}
                    icon={item.icon}
                    isActive={currentPath.startsWith(item.href)}
                  >
                    {item.label}
                  </SmartNavButton>
                ))}
              </div>
            </motion.nav>

            {/* CTA Button - Magnetic effect */}
            <motion.div
              className="hidden lg:flex items-center"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MagneticButton
                className={cn(
                  "relative px-6 py-2.5 text-sm font-semibold text-white rounded-lg",
                  "bg-gradient-to-r from-teal-500 to-orange-500",
                  "shadow-lg hover:shadow-xl transition-shadow duration-300",
                  "border-0 overflow-hidden"
                )}
                asChild
              >
                <Link href="/assessment" className="flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Começar Projeto
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Mobile Menu - Optimized */}
            <motion.div
              className="lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 hover:bg-gray-100/80"
                    aria-label="Abrir menu de navegação"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-80 border-l border-gray-200/50 bg-white/95 backdrop-blur-xl"
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between py-6 border-b border-gray-200/50">
                      <OptimizedLogo isScrolled={false} />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label="Fechar menu"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex-1 py-6 space-y-2" role="navigation">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-lg transition-colors",
                            currentPath.startsWith(item.href)
                              ? "bg-teal-50 text-teal-600 border border-teal-200"
                              : "hover:bg-gray-50 text-gray-700"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className={cn(
                            "p-2 rounded-md",
                            currentPath.startsWith(item.href)
                              ? "bg-teal-500 text-white"
                              : "bg-gray-100 text-gray-600"
                          )}>
                            <item.icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </nav>

                    {/* Mobile CTA */}
                    <div className="pt-6 border-t border-gray-200/50">
                      <Button
                        className="w-full bg-gradient-to-r from-teal-500 to-orange-500 text-white border-0 shadow-lg"
                        asChild
                      >
                        <Link href="/assessment" className="flex items-center justify-center gap-2">
                          <Crown className="w-4 h-4" />
                          Começar Projeto
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
};

export default OptimizedNavigation;