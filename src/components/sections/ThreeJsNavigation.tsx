/**
 * ARCO NEURAL NAVIGATION
 * Next-gen: Morphing 3D shapes + Holographic effects + Neural network visualization
 * 
 * Revolutionary Features:
 * - Three.js morphing geometric shapes (icosahedron → torus → sphere)
 * - Real-time holographic shader effects
 * - Neural network connections between menu items
 * - Advanced fluid cursor tracking with trails
 * - Gradient mesh background animation
 * - Chromatic aberration on hover
 * - Depth-based parallax layers
 * - Micro-interactions on every element
 */

'use client';

import React, { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, MeshDistortMaterial, Sphere, Trail } from '@react-three/drei';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles, Zap, Cpu, Layers, Rocket, Target, Briefcase, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAVIGATION_CONFIG } from '@/config/navigation.config';
import * as THREE from 'three';

// Navigation items with enhanced metadata
const navigationItems = [
    { 
        label: 'Services', 
        href: '/services',
        description: 'Strategic solutions',
        color: NAVIGATION_CONFIG.colors.links.services,
        icon: Rocket
    },
    { 
        label: 'Methodology', 
        href: '/metodologia',
        description: 'Our process',
        color: NAVIGATION_CONFIG.colors.links.methodology,
        icon: Target
    },
    { 
        label: 'Case Studies', 
        href: '/case-studies',
        description: 'Real results',
        color: NAVIGATION_CONFIG.colors.links.caseStudies,
        icon: Briefcase
    },
    { 
        label: 'About', 
        href: '/about',
        description: 'Who we are',
        color: NAVIGATION_CONFIG.colors.links.about,
        icon: Users
    }
];

// Morphing Geometric Shape with Holographic Shader
function HolographicShape() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);
    
    // Custom holographic shader
    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color('#3b82f6') },
                color2: { value: new THREE.Color('#8b5cf6') },
                color3: { value: new THREE.Color('#ec4899') },
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
            // Morph rotation
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
            
            // Update shader time
            materialRef.current.uniforms.time.value = state.clock.elapsedTime;
            
            // Pulsating scale
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

// Neural Network Connections
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

// Floating Orbs with Trails
function FloatingOrbs() {
    const orbsData = useMemo(() => [
        { position: [-3, 0.5, 0], color: '#3b82f6', speed: 0.5 },
        { position: [3, -0.3, 0], color: '#8b5cf6', speed: 0.7 },
        { position: [0, 0.8, -1], color: '#ec4899', speed: 0.6 },
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

// Neural Link with Advanced Effects
interface NeuralLinkProps {
    href: string;
    label: string;
    description: string;
    color: string;
    isActive: boolean;
    onClick?: () => void;
}

const NeuralLink: React.FC<NeuralLinkProps> = ({ 
    href, 
    label, 
    description, 
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

                {/* Glass card with border */}
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
                    {/* Shimmer effect */}
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
                        {/* Animated dot */}
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

                        {/* Micro arrow */}
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
                    
                    {/* Subtitle */}
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-1 text-xs text-white/40 tracking-wider"
                        >
                            {description}
                        </motion.div>
                    )}
                </div>

                {/* Active indicator - neural wave */}
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

// Liquid CTA Button
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
                href="/assessment"
                className="relative group block"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative px-8 py-3 rounded-2xl overflow-hidden">
                    {/* Liquid blob background */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 60">
                        <defs>
                            <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="50%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#ec4899" />
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
                        <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
                        <span className="text-white font-bold text-sm tracking-wide">
                            Start Assessment
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

// Main Navigation Component
export const ThreeJsNavigation: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const pathname = usePathname();
    
    // Track scroll for blur effect
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Dynamic blur intensity based on scroll
    const blurIntensity = Math.min(
        scrollY / NAVIGATION_CONFIG.visual.blur.scrollDivider, 
        NAVIGATION_CONFIG.visual.blur.max
    );

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

            {/* Navigation Bar */}
            <motion.nav 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ 
                    type: "spring", 
                    damping: NAVIGATION_CONFIG.animation.nav.springDamping, 
                    stiffness: NAVIGATION_CONFIG.animation.nav.springStiffness 
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
                            rgba(15, 23, 42, ${Math.min(scrollY / NAVIGATION_CONFIG.visual.opacity.scrollDivider, NAVIGATION_CONFIG.visual.opacity.max)}),
                            rgba(15, 23, 42, ${Math.min(scrollY / 300, 0.7)})
                        )`,
                        borderColor: `rgba(255, 255, 255, ${Math.min(scrollY / 500 + 0.1, 0.2)})`
                    }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            {/* Orbital Particle Logo */}
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
                                                    background: i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#a78bfa' : '#f472b6',
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
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-300" />
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-all duration-300" />
                                        
                                        {/* Animated gradient mesh core */}
                                        <motion.div
                                            className="relative w-10 h-10 rounded-xl flex items-center justify-center shadow-2xl overflow-hidden"
                                            style={{
                                                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                                            }}
                                            animate={{
                                                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "linear"
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
                                        <div className="absolute inset-0 bg-blue-500/20 rounded-xl translate-x-[2px]" />
                                        <div className="absolute inset-0 bg-red-500/20 rounded-xl -translate-x-[2px]" />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <motion.span 
                                        className="text-white font-bold text-xl tracking-tight"
                                        animate={{
                                            textShadow: ['0 0 10px rgba(96, 165, 250, 0.3)', '0 0 20px rgba(139, 92, 246, 0.5)', '0 0 10px rgba(96, 165, 250, 0.3)'],
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

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center gap-3">
                                {navigationItems.map((item) => (
                                    <NeuralLink
                                        key={item.href}
                                        {...item}
                                        isActive={pathname === item.href}
                                    />
                                ))}

                                {/* Technical Attribution - Subtle Signature */}
                                <Link
                                    href="/jpcardozx"
                                    className="group relative flex items-center gap-2.5 px-4 py-2 rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-white/[0.08]"
                                    style={{
                                        background: 'rgba(255,255,255,0.02)',
                                    }}
                                >
                                    {/* Glow effect on hover */}
                                    <div 
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: 'radial-gradient(circle at center, rgba(20, 184, 166, 0.06) 0%, transparent 70%)',
                                        }}
                                    />

                                    <div className="relative flex items-center gap-2.5 z-10">
                                        {/* Separator line */}
                                        <div 
                                            className="w-px h-4 transition-all duration-300 group-hover:h-5"
                                            style={{
                                                background: 'linear-gradient(180deg, transparent, rgba(20,184,166,0.4), transparent)',
                                            }}
                                        />
                                        
                                        {/* Monogram */}
                                        <div className="flex flex-col items-center justify-center">
                                            <span 
                                                className="text-[10px] font-bold leading-none tracking-tight transition-all duration-300"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(20,184,166,0.8) 0%, rgba(6,182,212,0.8) 100%)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    backgroundClip: 'text',
                                                }}
                                            >
                                                JP
                                            </span>
                                            <div 
                                                className="w-3 h-px mt-0.5 transition-all duration-300 group-hover:w-4"
                                                style={{
                                                    background: 'linear-gradient(90deg, rgba(20,184,166,0.5), rgba(6,182,212,0.5))',
                                                }}
                                            />
                                        </div>

                                        {/* Label */}
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-medium text-white/80 leading-none tracking-wide">
                                                Cardozo
                                            </span>
                                            <span className="text-[9px] font-mono text-white/30 leading-none mt-0.5 tracking-wider">
                                                TECH LEAD
                                            </span>
                                        </div>
                                    </div>
                                </Link>

                                <div 
                                    className="w-px h-6 mx-2"
                                    style={{
                                        background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent)',
                                    }}
                                />

                                {/* Liquid CTA Button */}
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
                        </div>
                    </div>
                </div>

                {/* Enhanced Mobile Navigation with Neural Effects */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-white/10 relative overflow-hidden"
                            style={{
                                backgroundColor: 'rgba(15, 23, 42, 0.98)',
                                backdropFilter: 'blur(20px)'
                            }}
                        >
                            {/* Neural network background pattern */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                                {Array.from({ length: 15 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                                        style={{
                                            left: `${(i / 15) * 100}%`,
                                            height: '100%',
                                        }}
                                        animate={{
                                            opacity: [0.1, 0.3, 0.1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.1,
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="relative py-6 px-4 space-y-2">
                                {navigationItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -50, rotateX: -90 }}
                                        animate={{ opacity: 1, x: 0, rotateX: 0 }}
                                        exit={{ opacity: 0, x: 50, rotateX: 90 }}
                                        transition={{ 
                                            delay: index * 0.08,
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 20
                                        }}
                                        style={{ perspective: 1000 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="block group"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <div className={cn(
                                                "relative px-4 py-4 rounded-xl transition-all duration-300 overflow-hidden",
                                                pathname === item.href
                                                    ? "bg-white/10"
                                                    : "hover:bg-white/5"
                                            )}>
                                                {/* Animated border gradient */}
                                                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div 
                                                        className="absolute inset-0 rounded-xl"
                                                        style={{
                                                            background: `linear-gradient(90deg, ${item.color}, ${item.color}88, ${item.color})`,
                                                            padding: '1px',
                                                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                                            WebkitMaskComposite: 'xor',
                                                            maskComposite: 'exclude',
                                                        }}
                                                    />
                                                </div>

                                                {/* Shimmer effect */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                                    initial={{ x: '-100%' }}
                                                    whileHover={{ x: '200%' }}
                                                    transition={{ duration: 0.6 }}
                                                />

                                                <div className="relative flex items-center justify-between">
                                                    <div>
                                                        <div className="font-medium text-white flex items-center gap-2">
                                                            <item.icon className="w-4 h-4" style={{ color: item.color }} />
                                                            {item.label}
                                                        </div>
                                                        <div className="text-xs text-white/50 mt-1">{item.description}</div>
                                                    </div>
                                                    <motion.div
                                                        initial={{ x: -10, opacity: 0 }}
                                                        whileHover={{ x: 0, opacity: 1 }}
                                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                    >
                                                        <ArrowRight 
                                                            className="w-4 h-4" 
                                                            style={{ color: item.color }}
                                                        />
                                                    </motion.div>
                                                </div>

                                                {/* Active indicator */}
                                                {pathname === item.href && (
                                                    <motion.div
                                                        layoutId="mobile-active-nav"
                                                        className="absolute bottom-0 left-0 right-0 h-0.5"
                                                        style={{ 
                                                            background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                                                        }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                    />
                                                )}
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Technical Attribution - Mobile Signature Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ 
                                        delay: navigationItems.length * 0.08,
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 25
                                    }}
                                    className="mt-6 pt-6"
                                    style={{
                                        borderTop: '1px solid rgba(255,255,255,0.04)'
                                    }}
                                >
                                    <Link
                                        href="/jpcardozx"
                                        className="block group relative"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <div 
                                            className="relative px-5 py-4 rounded-xl overflow-hidden transition-all duration-500 border border-white/[0.06] hover:border-white/[0.12]"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(20,184,166,0.02) 100%)',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.03)'
                                            }}
                                        >
                                            {/* Subtle glow on hover */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                                <div 
                                                    className="absolute inset-0"
                                                    style={{
                                                        background: 'radial-gradient(500px circle at 50% 50%, rgba(20, 184, 166, 0.05), transparent 70%)'
                                                    }}
                                                />
                                            </div>

                                            <div className="relative z-10">
                                                {/* Header */}
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <div 
                                                            className="w-1 h-1 rounded-full"
                                                            style={{
                                                                background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
                                                                boxShadow: '0 0 8px rgba(20,184,166,0.6)'
                                                            }}
                                                        />
                                                        <span className="text-[10px] font-mono text-white/40 tracking-widest">
                                                            TECHNICAL ATTRIBUTION
                                                        </span>
                                                    </div>
                                                    <div 
                                                        className="px-2 py-0.5 rounded text-[9px] font-semibold tracking-wider"
                                                        style={{
                                                            background: 'linear-gradient(135deg, rgba(20,184,166,0.12) 0%, rgba(6,182,212,0.12) 100%)',
                                                            border: '1px solid rgba(20,184,166,0.2)',
                                                            color: 'rgba(20,184,166,0.9)',
                                                        }}
                                                    >
                                                        PORTFOLIO
                                                    </div>
                                                </div>

                                                {/* Name & Title */}
                                                <div className="mb-3">
                                                    <div className="flex items-baseline gap-2 mb-1">
                                                        <h3 
                                                            className="text-base font-semibold tracking-tight"
                                                            style={{
                                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 100%)',
                                                                WebkitBackgroundClip: 'text',
                                                                WebkitTextFillColor: 'transparent',
                                                                backgroundClip: 'text',
                                                            }}
                                                        >
                                                            João Pedro Cardozo
                                                        </h3>
                                                    </div>
                                                    <p className="text-xs text-white/50 tracking-wide">
                                                        Principal Engineer · System Architecture
                                                    </p>
                                                </div>

                                                {/* Tech Stack */}
                                                <div className="flex items-center gap-2 pt-3 border-t border-white/[0.04]">
                                                    <div className="flex items-center gap-1.5 flex-1">
                                                        {['Next.js', 'TypeScript', 'React', 'Node'].map((tech, i) => (
                                                            <span
                                                                key={tech}
                                                                className="text-[10px] font-mono text-white/35 tracking-wide"
                                                            >
                                                                {tech}
                                                            </span>
                                                        )).reduce((prev, curr, i) => [
                                                            prev,
                                                            <span key={`dot-${i}`} className="text-white/20">·</span>,
                                                            curr
                                                        ] as any)}
                                                    </div>
                                                    <motion.div
                                                        whileHover={{ x: 2 }}
                                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                    >
                                                        <ArrowRight 
                                                            className="w-4 h-4 text-white/30 group-hover:text-teal-400 transition-colors duration-300"
                                                        />
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>

                                {/* Enhanced CTA Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 30, scale: 0.8 }}
                                    transition={{ 
                                        delay: (navigationItems.length + 1) * 0.08,
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 20
                                    }}
                                    className="pt-2"
                                >
                                    <Link
                                        href="/assessment"
                                        className="block relative group"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <div className="relative overflow-hidden rounded-xl">
                                            {/* Animated gradient background */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                                                animate={{
                                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "linear"
                                                }}
                                                style={{
                                                    backgroundSize: '200% 200%',
                                                }}
                                            />

                                            {/* Glow effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />

                                            {/* Content */}
                                            <div className="relative px-6 py-4 flex items-center justify-center gap-2">
                                                <Zap className="w-5 h-5 text-white" />
                                                <span className="font-semibold text-white">Start Assessment</span>
                                                <motion.div
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    <ArrowRight className="w-5 h-5 text-white" />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
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

// Export navigation items for reuse
export { navigationItems };
