/**
 * Enhanced Navbar Animations with Framer Motion
 * 3 Critical Animation Improvements for ARCO Navbar
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

// 1. ANIMAÇÃO: Active Link Indicator - Indicador suave de página ativa
export const ActiveLinkIndicator = ({ isActive, children }: { isActive: boolean; children: React.ReactNode }) => {
  return (
    <motion.div className="relative">
      {children}

      {/* Indicador de linha ativa */}
      <motion.div
        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full"
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isActive ? "100%" : 0,
          opacity: isActive ? 1 : 0
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      />

      {/* Glow effect sutil */}
      <motion.div
        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full blur-sm"
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isActive ? "100%" : 0,
          opacity: isActive ? 0.6 : 0
        }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      />
    </motion.div>
  );
};

// 2. ANIMAÇÃO: Smart Sticky Navbar - Aparece apenas quando necessário
export const SmartStickyNavbar = ({ children }: { children: React.ReactNode }) => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Transform values para animação suave
  const navbarY = useTransform(scrollY, [0, 100], [0, -10]);
  const backdropBlur = useTransform(scrollY, [0, 100], [8, 20]);
  const shadowOpacity = useTransform(scrollY, [0, 100], [0, 0.15]);

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = scrollY.get();

      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    const unsubscribe = scrollY.onChange(updateScrollDirection);
    return unsubscribe;
  }, [scrollY, lastScrollY]);

  return (
    <motion.div
      className="fixed top-0 w-full z-50"
      style={{
        y: navbarY,
        backdropFilter: `blur(${backdropBlur}px)`,
        WebkitBackdropFilter: `blur(${backdropBlur}px)`,
        boxShadow: `0 8px 32px rgba(0,0,0,${shadowOpacity})`
      }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 40,
        duration: 0.3
      }}
    >
      {children}
    </motion.div>
  );
};

// 3. ANIMAÇÃO: Magnetic Button Hover - Efeito magnético suave para CTAs
export const MagneticButton = ({ children, className, ...props }: any) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.15; // Magnetic strength
    const deltaY = (e.clientY - centerY) * 0.15;

    setMousePosition({ x: deltaX, y: deltaY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovering ? 1.05 : 1
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.5
      }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {/* Ripple effect interno */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-400/20 to-orange-400/20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      />

      {/* Glow effect externo */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-500 to-orange-500 blur-lg -z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovering ? 0.4 : 0,
          scale: isHovering ? 1.2 : 0.8
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// CONFIGURAÇÕES DE PERFORMANCE para animações suaves
export const animationConfig = {
  // Configuração otimizada para 60fps
  spring: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 0.8
  },

  // Easing personalizado para animações premium
  customEasing: [0.25, 0.1, 0.25, 1] as [number, number, number, number],

  // Durações padronizadas
  durations: {
    fast: 0.2,
    medium: 0.4,
    slow: 0.6
  },

  // Configuração de scroll otimizada
  scrollConfig: {
    threshold: 50,      // Pixels para ativar sticky
    hideThreshold: 150, // Pixels para ocultar navbar
    sensitivity: 0.15   // Sensibilidade do efeito magnético
  }
};

// Hook personalizado para controle de scroll inteligente
export const useSmartScroll = () => {
  const [scrollState, setScrollState] = useState({
    isScrolled: false,
    direction: 'up' as 'up' | 'down',
    shouldHide: false
  });

  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;

      setScrollState(prev => ({
        isScrolled: currentScrollY > animationConfig.scrollConfig.threshold,
        direction: currentScrollY > lastScrollY ? 'down' : 'up',
        shouldHide: currentScrollY > animationConfig.scrollConfig.hideThreshold &&
                   currentScrollY > lastScrollY
      }));

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollState;
};