/**
 * useNavigation Hook
 *
 * Hook reutilizável que centraliza toda a lógica de navegação
 * Pode ser usado em qualquer componente de navbar
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { navigationTokens, type NavigationVariant, type NavigationTheme } from '../tokens';

interface UseNavigationOptions {
  variant?: NavigationVariant;
  theme?: NavigationTheme;
  scrollThreshold?: number;
  enableParticles?: boolean;
}

export function useNavigation(options: UseNavigationOptions = {}) {
  const {
    variant = 'landing',
    theme = 'auto',
    scrollThreshold = 20,
    enableParticles = true,
  } = options;

  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    handleScroll(); // Check initial state
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  // Detect dark mode preference
  useEffect(() => {
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setPrefersDarkMode(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersDarkMode(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Determine active theme
  const activeTheme = useMemo(() => {
    if (theme === 'auto') {
      return prefersDarkMode ? 'dark' : 'light';
    }
    return theme;
  }, [theme, prefersDarkMode]);

  // Get theme colors
  const colors = useMemo(() => {
    return navigationTokens.colors[activeTheme];
  }, [activeTheme]);

  // Check if a path is active
  const isPathActive = useCallback((path: string) => {
    const currentPath = pathname;
    if (!currentPath) return false;
    if (path === '/' && currentPath === '/') return true;
    if (path === '/') return false;
    return currentPath.startsWith(path);
  }, [pathname]);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Get logo source based on scroll state
  const getLogoSrc = useCallback((variant: 'white' | 'colorful' | 'auto' = 'auto') => {
    if (variant === 'auto') {
      // White logo when not scrolled, colorful when scrolled
      return isScrolled
        ? '/logos/horizontal/colorful.png'
        : '/logos/horizontal/white.png';
    }
    return `/logos/horizontal/${variant}.png`;
  }, [isScrolled]);

  // Get navbar background style
  const getBackgroundStyle = useCallback(() => {
    const blur = isScrolled
      ? navigationTokens.glassmorphism.blur.scrolled
      : navigationTokens.glassmorphism.blur.default;

    const saturation = isScrolled
      ? navigationTokens.glassmorphism.saturation.scrolled
      : navigationTokens.glassmorphism.saturation.default;

    return {
      backgroundColor: isScrolled
        ? colors.background.scrolled
        : colors.background.default,
      backdropFilter: `blur(${blur}) saturate(${saturation})`,
      WebkitBackdropFilter: `blur(${blur}) saturate(${saturation})`,
      boxShadow: isScrolled
        ? navigationTokens.shadow.scrolled
        : navigationTokens.shadow.default,
    };
  }, [isScrolled, colors]);

  // Get container height
  const getContainerHeight = useCallback((isMobile: boolean = false) => {
    const heights = isMobile
      ? navigationTokens.height.mobile
      : navigationTokens.height.desktop;

    return isScrolled ? heights.scrolled : heights.default;
  }, [isScrolled]);

  return {
    // State
    isScrolled,
    isMobileMenuOpen,
    activeTheme,
    pathname,

    // Colors & styles
    colors,
    getBackgroundStyle,
    getContainerHeight,
    getLogoSrc,

    // Path utilities
    isPathActive,

    // Actions
    toggleMobileMenu,
    closeMobileMenu,

    // Config
    variant,
    enableParticles: enableParticles && !isMobileMenuOpen,
  };
}

export type UseNavigationReturn = ReturnType<typeof useNavigation>;
