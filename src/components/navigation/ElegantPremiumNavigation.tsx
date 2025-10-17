/**
 * ELEGANT PREMIUM NAVIGATION
 * Sophisticated but NOT tacky
 *
 * Philosophy: Less is more
 * - ONE Three.js element (holographic shape, subtle)
 * - Clean glassmorphism
 * - Smooth transitions (no magnetic/tilt gimmicks)
 * - Professional color palette
 * - Accessible and fast
 *
 * What we KEEP:
 * ✓ Holographic shape (subtle, low opacity)
 * ✓ Logo transition (48px → 40px)
 * ✓ Container transition (80px → 64px)
 * ✓ Glassmorphism backdrop
 * ✓ Smooth hover states
 * ✓ Clean active indicators
 * ✓ Useful navigation (/jpcardozx highlighted)
 *
 * What we REMOVE:
 * ✗ Orbital particles (tacky)
 * ✗ Particle bursts (excessive)
 * ✗ Chromatic aberration (unnecessary)
 * ✗ Pulse rings (redundant)
 * ✗ Magnetic effects (gimmicky)
 * ✗ 3D tilt (nauseating)
 * ✗ Neural connections (confusing)
 * ✗ Floating orbs (circus)
 */

'use client';

import React, { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, MessageSquare, BookOpen, Calendar, Zap, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import * as THREE from 'three';

// ============================================================================
// THREE.JS - Single Elegant Element
// ============================================================================

function ElegantHolographicShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#14b8a6') },
        color2: { value: new THREE.Color('#0d9488') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float time;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);

          vec3 pos = position;
          pos.x += sin(pos.y * 2.0 + time * 0.3) * 0.05;
          pos.y += cos(pos.z * 2.0 + time * 0.3) * 0.05;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 1.5);
          vec3 color = mix(color1, color2, vUv.y);
          float wave = sin(vUv.y * 10.0 - time * 0.5) * 0.1 + 0.9;

          gl_FragColor = vec4(color * wave, fresnel * 0.15);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.5, 1]} />
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </mesh>
  );
}

// ============================================================================
// LOGO - Clean with Smooth Transition
// ============================================================================

const ElegantLogo = ({ isScrolled }: { isScrolled: boolean }) => (
  <Link href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg">
    <motion.div
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
  </Link>
);

// ============================================================================
// NAVIGATION ITEMS - Professional Structure
// ============================================================================

const navigationItems = [
  {
    label: 'Desenvolvedor',
    href: '/jpcardozx',
    icon: BookOpen,
    color: '#14b8a6'
  },
  {
    label: 'Serviços',
    href: '/services',
    icon: Briefcase,
    color: '#0d9488'
  },
  {
    label: 'Agendamentos',
    href: '/agendamentos',
    icon: Calendar,
    color: '#14b8a6'
  },
  {
    label: 'Quiz',
    href: '/quiz',
    icon: Zap,
    color: '#0d9488'
  }
];

// ============================================================================
// NAV LINK - Elegant Hover, No Gimmicks
// ============================================================================

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const ElegantNavLink = ({ href, label, isActive, onClick }: NavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className={cn(
          "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          isActive ? "text-white" : "text-white/70 hover:text-white"
        )}
        whileHover={{ y: -1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Subtle background */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered || isActive ? 1 : 0,
            backgroundColor: isActive
              ? 'rgba(20, 184, 166, 0.15)'
              : 'rgba(255, 255, 255, 0.05)'
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Content */}
        <span className="relative z-10">{label}</span>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeNav"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-teal-400 rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </motion.div>
    </Link>
  );
};

// ============================================================================
// CTA BUTTON - Premium but Clean
// ============================================================================

const ElegantCTA = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/contact"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative px-6 py-2.5 rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {/* Subtle shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: '200%' } : {}}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        {/* Content */}
        <div className="relative flex items-center gap-2 text-white">
          <MessageSquare className="w-4 h-4" />
          <span className="font-semibold text-sm">Falar com Especialista</span>
        </div>
      </motion.div>
    </Link>
  );
};

// ============================================================================
// MOBILE MENU ITEM - Clean & Fast
// ============================================================================

interface MobileItemProps {
  item: typeof navigationItems[0];
  onClose: () => void;
}

const MobileMenuItem = ({ item, onClose }: MobileItemProps) => (
  <Link
    href={item.href}
    onClick={onClose}
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
  >
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center"
      style={{ backgroundColor: `${item.color}20` }}
    >
      <item.icon className="w-5 h-5" style={{ color: item.color }} />
    </div>
    <span className="flex-1 text-white font-medium">{item.label}</span>
    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
  </Link>
);

// ============================================================================
// MAIN NAVIGATION
// ============================================================================

export const ElegantPremiumNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
  const blurIntensity = Math.min(scrollY / 300, 16);

  return (
    <>
      {/* Three.js Background - Single Elegant Element */}
      <div className="fixed top-0 left-0 right-0 h-24 pointer-events-none z-40 opacity-30">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <ElegantHolographicShape />
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation Bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          backdropFilter: `blur(${blurIntensity}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${blurIntensity}px) saturate(180%)`,
        }}
      >
        <div
          className="border-b"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(15, 23, 42, ${Math.min(scrollY / 250, 0.92)}),
              rgba(15, 23, 42, ${Math.min(scrollY / 350, 0.85)})
            )`,
            borderColor: `rgba(255, 255, 255, ${Math.min(scrollY / 600 + 0.08, 0.15)})`
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex items-center justify-between"
              animate={{
                height: isScrolled ? 64 : 80,
                paddingTop: isScrolled ? 0 : 8,
                paddingBottom: isScrolled ? 0 : 8
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Logo */}
              <ElegantLogo isScrolled={isScrolled} />

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1" role="navigation">
                {navigationItems.map((item) => (
                  <ElegantNavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    isActive={pathname === item.href}
                  />
                ))}
              </nav>

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center gap-4">
                <Link
                  href="/assessment"
                  className="px-4 py-2 text-sm font-medium text-teal-300 hover:text-teal-200 transition-colors"
                >
                  Análise Gratuita
                </Link>
                <ElegantCTA />
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center gap-3 md:hidden">
                <ElegantCTA />

                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <motion.button
                      className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                      whileTap={{ scale: 0.95 }}
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
                            <X className="w-5 h-5 text-white" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Menu className="w-5 h-5 text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    className="w-full sm:w-80 p-0 border-l border-white/10"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.95))',
                      backdropFilter: 'blur(20px)'
                    }}
                  >
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <ElegantLogo isScrolled={false} />
                        <button
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <X className="w-5 h-5 text-white" />
                        </button>
                      </div>

                      {/* Navigation */}
                      <nav className="flex-1 p-6 space-y-2">
                        {navigationItems.map((item) => (
                          <MobileMenuItem
                            key={item.href}
                            item={item}
                            onClose={() => setIsMobileMenuOpen(false)}
                          />
                        ))}
                      </nav>

                      {/* Bottom */}
                      <div className="p-6 border-t border-white/10">
                        <Link
                          href="/assessment"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block w-full px-4 py-3 text-center rounded-lg font-medium text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 transition-colors"
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
        </div>
      </motion.nav>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default ElegantPremiumNavigation;
