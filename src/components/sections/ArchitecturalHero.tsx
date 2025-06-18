'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PremiumSection, PremiumButton } from '../experience/PremiumComponents'
import { Suspense } from 'react'
import confetti from 'canvas-confetti'

/**
 * ArchitecturalHero - Hero section com experiência premium completa
 * Integra GSAP, Framer Motion, Three.js, e micro-interações avançadas
 */
export function ArchitecturalHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    })

    // Advanced parallax transforms
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e
            const { innerWidth, innerHeight } = window
            setMousePosition({
                x: (clientX / innerWidth - 0.5) * 20,
                y: (clientY / innerHeight - 0.5) * 20
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const handleCTAClick = () => {
        // Premium celebration effect
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#8b5cf6', '#06b6d4']
        })
    }

    const stats = [
        { value: '847%', label: 'ROI médio em 12 meses', icon: '📈' },
        { value: '3.2s', label: 'Tempo de decisão otimizado', icon: '⚡' },
        { value: '99.7%', label: 'Precisão em previsões', icon: '🎯' }
    ]

    return (
        <PremiumSection className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div ref={containerRef} className="absolute inset-0">
                {/* Premium 3D Background */}
                <Canvas className="absolute inset-0">
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.2} />
                        <pointLight position={[10, 10, 10]} intensity={0.5} />
                        {/* Geometric background elements */}
                        <mesh position={[2, 1, -5]} rotation={[0, Math.PI / 4, 0]}>
                            <boxGeometry args={[0.5, 0.5, 0.5]} />
                            <meshStandardMaterial color="#3b82f6" opacity={0.1} transparent />
                        </mesh>
                        <mesh position={[-2, -1, -3]} rotation={[Math.PI / 6, 0, Math.PI / 3]}>
                            <octahedronGeometry args={[0.3]} />
                            <meshStandardMaterial color="#8b5cf6" opacity={0.1} transparent />
                        </mesh>
                    </Suspense>
                </Canvas>

                {/* Premium Gradient Background with Parallax */}
                <motion.div
                    style={{ y, scale }}
                    className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
                />

                {/* Animated Grid Pattern */}
                <motion.div
                    style={{
                        x: mousePosition.x,
                        y: mousePosition.y,
                        opacity
                    }}
                    className="absolute inset-0 opacity-10"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="premium-fade-in"
                >
                    {/* Premium Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
                    >
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        Sistema Neural de Otimização em Tempo Real
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                    >
                        Arquitetura de
                        <motion.span
                            initial={{ backgroundPosition: '0% 50%' }}
                            animate={{ backgroundPosition: '100% 50%' }}
                            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                            className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] ml-4"
                        >
                            Conversão
                        </motion.span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
                    >
                        Transforme visitantes em clientes com nossa plataforma de inteligência artificial
                        que otimiza cada elemento da jornada de compra em tempo real.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                    >
                        <PremiumButton
                            variant="primary"
                            size="lg"
                            onClick={handleCTAClick}
                            className="text-lg px-8 py-4"
                        >
                            Iniciar Otimização Gratuita
                        </PremiumButton>

                        <PremiumButton
                            variant="secondary"
                            size="lg"
                            className="text-lg"
                        >
                            Ver Demonstração ao Vivo
                        </PremiumButton>
                    </motion.div>

                    {/* Premium Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                                whileHover={{ scale: 1.05 }}
                                className="premium-scale-in"
                            >
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                                    <div className="text-3xl mb-2">{stat.icon}</div>
                                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                                    <div className="text-slate-400 text-sm">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Premium Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-1 h-3 bg-white/50 rounded-full mt-2"
                    />
                </motion.div>
                <p className="text-white/50 text-xs mt-2">Scroll para explorar</p>
            </motion.div>
        </PremiumSection>
    )
}
