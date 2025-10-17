/**
 * NAVEGAÇÃO DO PORTFÓLIO - Edição Estratégica com Three.js
 * Navbar elegante com profundidade sutil, elementos 3D estratégicos e UX profissional.
 *
 * Funcionalidades:
 * - Camadas de profundidade sutis para elegância
 * - Transição de partículas no logo (estratégico)
 * - Efeito de scroll parallax discreto
 * - Three.js otimizado para performance
 * - UI/UX limpo com sofisticação 3D
 */

'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Menu, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import * as THREE from 'three';

// Seções do portfólio para scroll suave
const portfolioSections = [
    { id: 'hero', label: 'Início' },
    { id: 'skills', label: 'Capacidades' },
    { id: 'stack', label: 'Stack Técnico' },
    { id: 'case-study', label: 'Case Study' },
    { id: 'process', label: 'Processo' },
    { id: 'contact', label: 'Contato' },
];

// Camadas de Profundidade Estratégicas - Partículas mínimas para profundidade sofisticada
function DepthLayers({ scrollY }: { scrollY: number }) {
    const pointsRef = useRef<THREE.Points>(null);
    
    // Campo de partículas otimizado (50 partículas vs. centenas)
    const particleCount = 50;
    const positions = React.useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 12;     // dispersão x
            pos[i * 3 + 1] = (Math.random() - 0.5) * 6;  // dispersão y
            pos[i * 3 + 2] = Math.random() * -4 - 1;     // profundidade z
        }
        return pos;
    }, []);

    useFrame(() => {
        if (pointsRef.current) {
            // Parallax sutil com o scroll
            pointsRef.current.rotation.y = scrollY * 0.0002;
            pointsRef.current.position.y = scrollY * -0.001;
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#14b8a6"
                size={1.2}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
}

// Anel de Partículas no Logo - Realce de marca elegante ao redor do logo
function LogoParticleRing({ isHovered }: { isHovered: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    
    // 6 partículas em um círculo perfeito
    const particles = React.useMemo(() => 
        Array.from({ length: 6 }, (_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 1.8;
            return {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                z: 0,
                delay: i * 0.1
            };
        }), []
    );

    useFrame((state) => {
        if (groupRef.current) {
            // Rotação suave no hover
            const targetRotation = isHovered ? state.clock.elapsedTime * 0.2 : state.clock.elapsedTime * 0.05;
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotation, 0.1);
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {particles.map((particle, i) => (
                <mesh key={i} position={[particle.x, particle.y, particle.z]}>
                    <sphereGeometry args={[0.03, 8, 8]} />
                    <meshBasicMaterial 
                        color="#14b8a6" 
                        transparent 
                        opacity={isHovered ? 0.8 : 0.4} 
                    />
                </mesh>
            ))}
        </group>
    );
}

// Cena Three.js Estratégica - Otimizada para a navbar
function NavbarScene({ scrollY, logoHovered }: { scrollY: number; logoHovered: boolean }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 35 }}
            dpr={[1, 1.5]} // Reduzido de [1, 2] para performance
        >
            <Suspense fallback={null}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.4} color="#14b8a6" />
                
                {/* Camadas de profundidade atrás de tudo */}
                <DepthLayers scrollY={scrollY} />
                
                {/* Partículas do logo no centro */}
                <LogoParticleRing isHovered={logoHovered} />
            </Suspense>
        </Canvas>
    );
}

export const PortfolioNavigation: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('hero');
    const [logoHovered, setLogoHovered] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Rastreia a seção ativa
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        portfolioSections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            {/* Fundo Estratégico com Three.js - Profundidade sutil */}
            <div className="fixed top-0 left-0 right-0 h-16 pointer-events-none z-40">
                <NavbarScene scrollY={scrollY} logoHovered={logoHovered} />
            </div>

            {/* Barra de Navegação Elegante */}
            <motion.nav 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50"
            >
                <div 
                    className="border-b border-white/10 backdrop-blur-md"
                    style={{
                        backgroundColor: `rgba(2, 6, 23, ${Math.min(scrollY / 100 + 0.85, 0.95)})`,
                    }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20"> {/* Increased height for better presence */}
                            {/* Back Navigation - Enhanced with breadcrumb feel */}
                            <div className="flex items-center gap-4">
                                <Link 
                                    href="/" 
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-teal-400 hover:bg-white/5 transition-all duration-300 group border border-transparent hover:border-teal-500/20"
                                >
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    <span className="text-sm font-medium">
                                        <span className="hidden sm:inline">Voltar para </span>ARCO
                                    </span>
                                </Link>
                                
                                {/* Breadcrumb separator */}
                                <div className="hidden sm:flex items-center gap-2 text-slate-600">
                                    <span>/</span>
                                    <span className="text-xs text-slate-500 font-mono">portfolio</span>
                                </div>
                            </div>

                            {/* Enhanced Professional Brand Identity */}
                            <motion.div 
                                className="flex items-center gap-4 relative"
                                onHoverStart={() => setLogoHovered(true)}
                                onHoverEnd={() => setLogoHovered(false)}
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                {/* Professional Avatar Circle */}
                                <div className="relative">
                                    <motion.div 
                                        className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm overflow-hidden"
                                        animate={logoHovered ? {
                                            boxShadow: ["0 0 0 rgba(20, 184, 166, 0)", "0 0 20px rgba(20, 184, 166, 0.4)", "0 0 0 rgba(20, 184, 166, 0)"]
                                        } : {}}
                                        transition={{ duration: 1.5, repeat: logoHovered ? Infinity : 0 }}
                                    >
                                        <Image src="/profile.png" alt="João Pedro Cardozo" width={40} height={40} />
                                    </motion.div>
                                    {/* Online indicator */}
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950" />
                                </div>
                                
                                {/* Enhanced Brand Text */}
                                <div className="text-left">
                                    <motion.div 
                                        className="text-xl font-bold text-white tracking-tight"
                                        animate={logoHovered ? { 
                                            textShadow: "0 0 25px rgba(20, 184, 166, 0.6)" 
                                        } : {
                                            textShadow: "0 0 0px rgba(20, 184, 166, 0)" 
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        Pedro Cardozo
                                    </motion.div>
                                    <div className="text-xs text-teal-400/90 font-mono tracking-wider flex items-center gap-2">
                                        Desenvolvedor Full-Stack
                                        <div className="hidden sm:block w-1 h-1 bg-teal-400/60 rounded-full" />
                                        <span className="hidden sm:inline text-slate-500">Disponível</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Enhanced Desktop Navigation */}
                            <div className="hidden md:flex items-center gap-2">
                                {portfolioSections.slice(1, 5).map((section) => (
                                    <motion.button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`
                                            px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative group
                                            ${activeSection === section.id 
                                                ? 'text-teal-400 bg-teal-400/15 shadow-lg shadow-teal-500/10' 
                                                : 'text-slate-400 hover:text-white hover:bg-white/8'
                                            }
                                        `}
                                    >
                                        {/* Enhanced active indicator */}
                                        {activeSection === section.id && (
                                            <>
                                                <motion.div
                                                    layoutId="portfolio-active-bg"
                                                    className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-teal-400/20 rounded-xl border border-teal-500/30"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                                <motion.div
                                                    layoutId="portfolio-active-dot"
                                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-teal-400 rounded-full"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            </>
                                        )}
                                        
                                        {/* Hover glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        <span className="relative z-10">{section.label}</span>
                                    </motion.button>
                                ))}

                                {/* Enhanced Contact CTA */}
                                <motion.button
                                    onClick={() => scrollToSection('contact')}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 0 30px rgba(20, 184, 166, 0.4)",
                                        background: "linear-gradient(135deg, rgba(20, 184, 166, 0.3), rgba(6, 182, 212, 0.3))"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="ml-4 px-5 py-2.5 bg-gradient-to-r from-teal-500/20 to-teal-400/20 border border-teal-500/40 text-teal-400 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 relative overflow-hidden group"
                                >
                                    {/* Animated background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-teal-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

                                    <span className="relative z-10">Contato</span>
                                    <motion.div
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative z-10"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.div>
                                </motion.button>
                            </div>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
        </div>
    </div>
</div>

{/* Enhanced Mobile Navigation */}
<AnimatePresence>
    {isMobileMenuOpen && (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-md"
        >
            {/* Mobile Menu Header */}
            <div className="px-4 py-3 border-b border-white/10">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-400 font-mono">Navegação</div>
                    <div className="text-xs text-teal-400/80 bg-teal-400/10 px-2 py-1 rounded-full">
                        {portfolioSections.findIndex(s => s.id === activeSection) + 1} / {portfolioSections.length}
                    </div>
                </div>
            </div>

            <div className="py-3 px-4 space-y-1">
                {portfolioSections.map((section, index) => (
                    <motion.button
                        key={section.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => scrollToSection(section.id)}
                        className={`
                            w-full p-4 rounded-xl text-left transition-all duration-300 relative group flex items-center justify-between
                            ${activeSection === section.id 
                                ? 'bg-teal-400/15 text-teal-400 border border-teal-500/30' 
                                : 'text-slate-300 hover:bg-white/5 hover:text-white'
                            }
                        `}
                    >
                        <div className="flex items-center gap-3">
                            {/* Section number indicator */}
                            <div className={`
                                w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold
                                ${activeSection === section.id 
                                    ? 'bg-teal-400/20 text-teal-400' 
                                    : 'bg-slate-700/50 text-slate-500 group-hover:bg-slate-600/50 group-hover:text-slate-400'
                                }
                            `}>
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            
                            <div>
                                <div className="font-medium">{section.label}</div>
                                <div className="text-xs text-slate-500 mt-0.5">
                                    {index === 0 && "Apresentação profissional"}
                                    {index === 1 && "Especialização & expertise"}
                                    {index === 2 && "Tecnologias & ferramentas"}
                                    {index === 3 && "Projeto detalhado IPE"}
                                    {index === 4 && "Metodologia de entrega"}
                                    {index === 5 && "Agende uma conversa"}
                                </div>
                            </div>
                        </div>

                        {/* Progress indicator for active section */}
                        {activeSection === section.id && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 bg-teal-400 rounded-full"
                            />
                        )}

                        {/* Hover arrow for inactive sections */}
                        {activeSection !== section.id && (
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Mobile menu footer with quick actions */}
            <div className="px-4 py-3 border-t border-white/10 bg-slate-900/50">
                <motion.button
                    onClick={() => scrollToSection('contact')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3 bg-gradient-to-r from-teal-500/20 to-teal-400/20 border border-teal-500/40 text-teal-400 rounded-xl font-medium flex items-center justify-center gap-2 hover:from-teal-500/30 hover:to-teal-400/30 transition-all"
                >
                    <span>Entre em Contato</span>
                    <ArrowRight className="w-4 h-4" />
                </motion.button>
            </div>
        </motion.div>
    )}
</AnimatePresence>
</motion.nav>

{/* Spacer for fixed navbar */}
<div className="h-20" />
</>
);
};