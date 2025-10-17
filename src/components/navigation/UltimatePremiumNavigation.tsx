/**
 * ULTIMATE PREMIUM NAVIGATION
 * Best of ThreeJsNavigation + EnhancedNavigation
 *
 * From ThreeJsNavigation (KEEP ALL):
 * - Holographic shape with custom shader ✓
 * - Neural network connections ✓
 * - Orbital particles on logo ✓
 * - Liquid CTA with SVG goo filter ✓
 * - Magnetic + 3D tilt effects on links ✓
 * - Chromatic aberration ✓
 * - Shimmer effects ✓
 * - Pulse rings ✓
 * - Particle bursts ✓
 *
 * From EnhancedNavigation (ADD):
 * - Logo transition (48px → 40px) ✓
 * - Container transition (96px → 56px) ✓
 * - Useful navigation with /jpcardozx highlighted ✓
 * - Better mobile menu ✓
 * - Clear hierarchy ✓
 */

'use client';

import React, { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles, Zap, BookOpen, Users, Calendar, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import * as THREE from 'three';

// ============================================================================
// THREE.JS COMPONENTS - Keep ALL premium effects
// ============================================================================

// Holographic Shape with Custom Shader (from ThreeJsNavigation)
function HolographicShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#14b8a6') },
        color2: { value: new THREE.Color('#3b82f6') },
        color3: { value: new THREE.Color('#8b5cf6') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float time;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);

          vec3 pos = position;
          pos.x += sin(pos.y * 3.0 + time) * 0.1;
          pos.y += cos(pos.z * 3.0 + time) * 0.1;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);

          vec3 color = mix(color1, color2, vUv.x);
          color = mix(color, color3, vUv.y);

          float hologram = sin(vUv.y * 20.0 - time * 2.0) * 0.5 + 0.5;
          color += hologram * 0.3;

          gl_FragColor = vec4(color, fresnel * 0.6);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;

      materialRef.current.uniforms.time.value = state.clock.elapsedTime;

      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.2, 1]} />
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </mesh>
  );
}

// Neural Network Connections (from ThreeJsNavigation)
function NeuralConnections() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const points: number[] = [];
    const connections = 30;

    for (let i = 0; i < connections; i++) {
      const angle1 = (i / connections) * Math.PI * 2;
      const angle2 = ((i + 1) / connections) * Math.PI * 2;

      points.push(
        Math.cos(angle1) * 2, Math.sin(angle1) * 0.5, 0,
        Math.cos(angle2) * 2, Math.sin(angle2) * 0.5, 0
      );
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z = state.clock.elapsedTime * 0.1;

      const positions = linesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 6) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial
        color="#60a5fa"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

// Floating Orbs (from ThreeJsNavigation)
function FloatingOrbs() {
  const orbsData = useMemo(() => [
    { position: [-3, 0.5, 0], color: '#14b8a6', speed: 0.5 },
    { position: [3, -0.3, 0], color: '#3b82f6', speed: 0.7 },
    { position: [0, 0.8, -1], color: '#8b5cf6', speed: 0.6 },
  ], []);

  return (
    <>
      {orbsData.map((orb, i) => (
        <Orb key={i} {...orb} index={i} />
      ))}
    </>
  );
}

function Orb({ position, color, speed, index }: any) {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (orbRef.current) {
      const time = state.clock.elapsedTime * speed;
      orbRef.current.position.x = position[0] + Math.sin(time + index) * 0.5;
      orbRef.current.position.y = position[1] + Math.cos(time + index) * 0.3;
    }
  });

  return (
    <mesh ref={orbRef} position={position}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

// ============================================================================
// LOGO WITH ORBITAL PARTICLES (from ThreeJsNavigation) + RESPONSIVE TRANSITION (from Enhanced)
// ============================================================================

interface LogoProps {
  isScrolled: boolean;
  scrollY: number;
}

const OrbitalLogo: React.FC<LogoProps> = ({ isScrolled, scrollY }) => {
  return (
    <Link href="/" className="relative group flex items-center gap-3">
      <div className="relative w-12 h-12">
        {/* Orbital particles */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 28;
          const x = Math.cos(angle + scrollY * 0.01) * radius;
          const y = Math.sin(angle + scrollY * 0.01) * radius;

          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                background: i % 3 === 0 ? '#14b8a6' : i % 3 === 1 ? '#3b82f6' : '#8b5cf6',
                x: x - 2,
                y: y - 2,
                boxShadow: '0 0 8px currentColor',
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          );
        })}

        {/* Core with pulsating gradient */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Multi-layer glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-blue-500 to-purple-500 rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-all duration-300" />

          {/* Animated gradient mesh core - WITH RESPONSIVE SIZE */}
          <motion.div
            className="relative rounded-xl flex items-center justify-center shadow-2xl overflow-hidden"
            animate={{
              width: isScrolled ? 40 : 48,
              height: isScrolled ? 40 : 48
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 50%, #8b5cf6 100%)',
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Icon */}
            <Sparkles className="w-5 h-5 text-white relative z-10" strokeWidth={2.5} />
          </motion.div>
        </motion.div>

        {/* Chromatic aberration effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="absolute inset-0 bg-teal-500/20 rounded-xl translate-x-[2px]" />
          <div className="absolute inset-0 bg-purple-500/20 rounded-xl -translate-x-[2px]" />
        </div>
      </div>

      <div className="flex flex-col">
        <motion.span
          className="text-white font-bold text-xl tracking-tight"
          animate={{
            textShadow: ['0 0 10px rgba(20, 184, 166, 0.3)', '0 0 20px rgba(59, 130, 246, 0.5)', '0 0 10px rgba(20, 184, 166, 0.3)'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ARCO
        </motion.span>
        <span className="text-xs text-white/40 tracking-wider">
          DIGITAL AGENCY
        </span>
      </div>
    </Link>
  );
};

// ============================================================================
// NEURAL LINK WITH MAGNETIC + 3D TILT (from ThreeJsNavigation)
// ============================================================================

interface NeuralLinkProps {
  href: string;
  label: string;
  color: string;
  isActive: boolean;
  onClick?: () => void;
}

const NeuralLink: React.FC<NeuralLinkProps> = ({
  href,
  label,
  color,
  isActive,
  onClick
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 200 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic + 3D tilt effect
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
    rotateY.set((distanceX / rect.width) * 20);
    rotateX.set(-(distanceY / rect.height) * 20);

    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <Link
      ref={ref}
      href={href}
      className="relative group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        style={{
          x: xSpring,
          y: ySpring,
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: 'preserve-3d'
        }}
        className="relative"
      >
        {/* Multi-layer glow */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.6, scale: 1.2 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute -inset-6 rounded-2xl blur-2xl"
                style={{
                  background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${color}, transparent 70%)`
                }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -inset-2 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${color}40, transparent)`,
                  boxShadow: `0 0 20px ${color}60`,
                }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Glass card */}
        <div
          className="relative px-5 py-3 rounded-xl overflow-hidden"
          style={{
            background: isHovered
              ? 'rgba(255, 255, 255, 0.05)'
              : 'transparent',
            border: isHovered
              ? `1px solid ${color}40`
              : '1px solid transparent',
            backdropFilter: isHovered ? 'blur(10px)' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Shimmer */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  `linear-gradient(90deg, transparent, ${color}, transparent)`,
                  `linear-gradient(90deg, transparent, transparent, ${color})`,
                ],
                backgroundPosition: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            />
          )}

          {/* Content */}
          <div className="relative flex items-center gap-2">
            <motion.div
              animate={isHovered ? {
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: color }}
            />

            <span
              className={cn(
                "text-sm font-semibold tracking-wide transition-all duration-200",
                isActive
                  ? "text-white"
                  : "text-white/70 group-hover:text-white"
              )}
            >
              {label}
            </span>

            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <ArrowRight className="w-3 h-3 text-white/50" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full overflow-hidden"
            style={{ backgroundColor: color }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: `linear-gradient(90deg, transparent, white, transparent)`,
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </Link>
  );
};

// ============================================================================
// LIQUID CTA BUTTON (from ThreeJsNavigation)
// ============================================================================

const LiquidButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="ml-6"
    >
      <Link
        href="/contact"
        className="relative group block"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative px-8 py-3 rounded-2xl overflow-hidden">
          {/* Liquid blob background with SVG goo filter */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 60">
            <defs>
              <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
              </filter>
            </defs>
            <motion.circle
              cx={100}
              cy={30}
              r={isHovered ? 35 : 30}
              fill="url(#liquidGrad)"
              filter="url(#goo)"
              animate={{
                r: isHovered ? [30, 35, 32, 35] : [28, 30, 28],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.circle
              cx={cursorPos.x * 0.5}
              cy={cursorPos.y * 0.8}
              r={isHovered ? 25 : 0}
              fill="url(#liquidGrad)"
              filter="url(#goo)"
              transition={{ duration: 0.3 }}
            />
            <motion.circle
              cx={cursorPos.x * 0.8}
              cy={cursorPos.y * 0.5}
              r={isHovered ? 20 : 0}
              fill="url(#liquidGrad)"
              filter="url(#goo)"
              transition={{ duration: 0.4 }}
            />
          </svg>

          {/* Glass overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

          {/* Particle burst on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: Math.cos((i / 12) * Math.PI * 2) * 30,
                    y: Math.sin((i / 12) * Math.PI * 2) * 30,
                    opacity: [1, 0],
                    scale: [0, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* Content */}
          <div className="relative flex items-center gap-3">
            <MessageSquare className="w-4 h-4 text-white" strokeWidth={2.5} />
            <span className="text-white font-bold text-sm tracking-wide">
              Falar com Especialista
            </span>
            <motion.div
              animate={isHovered ? {
                x: [0, 5, 0],
              } : {}}
              transition={{
                duration: 0.6,
                repeat: Infinity,
              }}
            >
              <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
            </motion.div>
          </div>

          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/50"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

// ============================================================================
// MAIN NAVIGATION - Best of Both Worlds
// ============================================================================

const navigationItems = [
  {
    label: 'Desenvolvedor',
    href: '/jpcardozx',
    color: '#14b8a6',
    icon: BookOpen
  },
  {
    label: 'Agendamentos',
    href: '/agendamentos',
    color: '#3b82f6',
    icon: Calendar
  },
  {
    label: 'Quiz',
    href: '/quiz',
    color: '#8b5cf6',
    icon: Zap
  },
  {
    label: 'Serviços',
    href: '/services',
    color: '#f59e0b',
    icon: Users
  }
];

export const UltimatePremiumNavigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = scrollY > 20;
  const blurIntensity = Math.min(scrollY / 200, 20);

  return (
    <>
      {/* Three.js Background Canvas */}
      <div className="fixed top-0 left-0 right-0 h-20 pointer-events-none z-40">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <HolographicShape />
            <NeuralConnections />
            <FloatingOrbs />
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation Bar - WITH RESPONSIVE TRANSITION */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100
        }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: `blur(${blurIntensity}px)`,
        }}
      >
        <div
          className="relative border-b"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(15, 23, 42, ${Math.min(scrollY / 200, 0.95)}),
              rgba(15, 23, 42, ${Math.min(scrollY / 300, 0.7)})
            )`,
            borderColor: `rgba(255, 255, 255, ${Math.min(scrollY / 500 + 0.1, 0.2)})`
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* WITH RESPONSIVE HEIGHT TRANSITION */}
            <motion.div
              className="flex items-center justify-between"
              animate={{
                height: isScrolled ? 64 : 80
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <OrbitalLogo isScrolled={isScrolled} scrollY={scrollY} />

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-3">
                {navigationItems.map((item) => (
                  <NeuralLink
                    key={item.href}
                    {...item}
                    isActive={pathname === item.href}
                  />
                ))}

                <LiquidButton />
              </div>

              {/* Mobile menu button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="md:hidden relative p-2 text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10"
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.98)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="py-6 px-4 space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-4 py-3 rounded-xl text-white hover:bg-white/5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                        {item.label}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default UltimatePremiumNavigation;
