/**
 * Agendamentos Hero Section - World-class UX
 * Features: Staggered text reveal, floating elements, gradient blob, scroll animations
 */

'use client'

import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Sparkles, ArrowRight, Calendar, Users, Star, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { spring, stagger, fade, text, presets } from '@/lib/agendamentos/animations'
import { heroImages } from '@/lib/agendamentos/assets'

interface AgendamentosHeroProps {
  onStartBooking: () => void
}

export function AgendamentosHero({ onStartBooking }: AgendamentosHeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  
  // Parallax effect for background
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 200], [1, 0])

  // Mouse-follow gradient blob
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Split text into words for stagger animation - PROFESSIONAL COPY
  const titleWords = "Consultoria Técnica Especializada".split(' ')
  const subtitleWords = "Análise técnica detalhada e recomendações práticas para otimização de performance web e campanhas digitais".split(' ')

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mouse-follow gradient blob */}
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4))',
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          transition={{ type: "spring", damping: 30, stiffness: 100 }}
        />
        
        {/* Parallax background shapes */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        
        {/* Floating icons */}
        <FloatingIcon
          Icon={Sparkles}
          delay={0}
          duration={20}
          className="top-1/4 left-[15%]"
        />
        <FloatingIcon
          Icon={Star}
          delay={2}
          duration={25}
          className="top-1/3 right-[20%]"
        />
        <FloatingIcon
          Icon={Zap}
          delay={4}
          duration={22}
          className="bottom-1/3 left-[25%]"
        />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative container mx-auto px-6 py-20 z-10"
      >
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge with animation */}
          <motion.div
            variants={fade.inDown}
            initial="initial"
            animate="animate"
            transition={{ ...spring.smooth, delay: 0.2 }}
            className="inline-flex items-center justify-center mb-8"
          >
            <Badge 
              variant="secondary" 
              className="px-4 py-2 text-sm font-medium bg-arco-teal-500/10 border border-arco-teal-500/30 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 mr-2 text-arco-teal-400" />
              <span className="text-arco-teal-300 font-semibold">
                Consultoria Técnica
              </span>
            </Badge>
          </motion.div>

          {/* Title with word-by-word reveal */}
          <motion.h1
            variants={text.reveal.container}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                variants={text.reveal.child}
                className="inline-block mr-3 text-white"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle with stagger */}
          <motion.p
            variants={stagger.container(0.4)}
            initial="hidden"
            animate="show"
            className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            {subtitleWords.map((word, index) => (
              <motion.span
                key={index}
                variants={stagger.item}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fade.inUp}
            initial="initial"
            animate="animate"
            transition={{ ...spring.smooth, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover="hover" whileTap="tap" variants={presets.button}>
              <Button
                size="lg"
                onClick={onStartBooking}
                className="group relative px-8 py-6 text-lg font-semibold bg-gradient-to-r from-arco-teal-600 to-arco-orange-500 hover:from-arco-teal-500 hover:to-arco-orange-400 shadow-lg hover:shadow-xl shadow-arco-teal-500/20"
              >
                <span className="flex items-center gap-2 text-white">
                  Agendar Consultoria
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </span>
              </Button>
            </motion.div>

            <motion.div whileHover="hover" whileTap="tap" variants={presets.button}>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  document.getElementById('consultorias')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
                className="px-8 py-6 text-lg font-semibold border-2 backdrop-blur-sm"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Ver Consultorias
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Proof Stats - REAL METRICS */}
          <motion.div
            variants={stagger.container(1)}
            initial="hidden"
            animate="show"
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <StatCard
              icon={Users}
              value="15+"
              label="Projetos concluídos"
            />
            <StatCard
              icon={Star}
              value="60-120min"
              label="Duração das sessões"
            />
            <StatCard
              icon={Zap}
              value="Online"
              label="Google Meet"
            />
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.5
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
          <span className="text-sm font-medium">Role para explorar</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-current rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

// Floating Icon Component
function FloatingIcon({ 
  Icon, 
  delay, 
  duration, 
  className 
}: { 
  Icon: any
  delay: number
  duration: number
  className: string 
}) {
  return (
    <motion.div
      className={cn("absolute text-blue-500/20 dark:text-blue-400/20", className)}
      animate={{
        y: [-20, 20, -20],
        rotate: [0, 360],
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <Icon className="w-12 h-12" />
    </motion.div>
  )
}

// Stat Card Component
function StatCard({ 
  icon: Icon, 
  value, 
  label 
}: { 
  icon: any
  value: string
  label: string 
}) {
  return (
    <motion.div
      variants={stagger.item}
      whileHover={{ 
        scale: 1.05, 
        transition: spring.bouncy 
      }}
      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50"
    >
      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-xs text-slate-600 dark:text-slate-400 text-center">
        {label}
      </div>
    </motion.div>
  )
}
