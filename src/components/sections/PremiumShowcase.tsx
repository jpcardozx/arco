'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Zap, Target, Award, Globe, TrendingUp, Sparkles, Code, Palette, Rocket, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PremiumFeature {
  icon: LucideIcon
  title: string
  description: string
  color: string
  benefit: string
}

const premiumFeatures: PremiumFeature[] = [
  {
    icon: Code,
    title: 'Desenvolvimento Web Moderno',
    description: 'Sites e aplicações com React, Next.js e TypeScript. Código limpo, escalável e fácil de manter.',
    color: 'from-teal-600 to-teal-500',
    benefit: '5+ anos exp.'
  },
  {
    icon: TrendingUp,
    title: 'Estratégias de Tráfego',
    description: 'SEO técnico, otimização de conversão e análise de performance para aumentar sua visibilidade online.',
    color: 'from-orange-500 to-orange-600',
    benefit: 'Resultados reais'
  },
  {
    icon: Target,
    title: 'Design Responsivo',
    description: 'Interfaces que funcionam perfeitamente em desktop, tablet e mobile. Foco na experiência do usuário.',
    color: 'from-emerald-600 to-teal-500',
    benefit: 'Mobile-first'
  },
  {
    icon: Zap,
    title: 'Performance Otimizada',
    description: 'Sites rápidos com Core Web Vitals otimizados. Carregamento eficiente e experiência fluida.',
    color: 'from-amber-500 to-orange-500',
    benefit: 'Velocidade real'
  },
  {
    icon: Palette,
    title: 'Identidade Visual',
    description: 'Design systems consistentes e identidade visual coesa. Cada projeto reflete a personalidade da marca.',
    color: 'from-teal-500 to-emerald-500',
    benefit: 'Marca forte'
  },
  {
    icon: Award,
    title: 'Suporte Contínuo',
    description: 'Acompanhamento pós-entrega, atualizações técnicas e suporte para crescimento do seu projeto.',
    color: 'from-orange-600 to-amber-500',
    benefit: 'Longo prazo'
  }
]

const PremiumFeatureCard = ({ feature, index }: { feature: PremiumFeature; index: number }) => {
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white overflow-hidden">
        <CardContent className="p-8">
          <div className="relative mb-6">
            <div className={cn(
              "inline-flex p-4 rounded-2xl bg-gradient-to-r mb-4",
              feature.color
            )}>
              <Icon className="w-8 h-8 text-white" aria-hidden="true" />
            </div>

            <Badge
              className="absolute -top-2 -right-2 bg-gradient-to-r from-teal-600 to-orange-500 text-white border-0 shadow-lg"
            >
              {feature.benefit}
            </Badge>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
            {feature.title}
          </h3>

          <p className="text-gray-600 leading-relaxed mb-6">
            {feature.description}
          </p>

          <Button
            variant="outline"
            className="w-full group-hover:bg-teal-50 group-hover:border-teal-500 group-hover:text-teal-600 transition-all duration-300"
          >
            Saiba Mais
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const StatsSection = () => {
  const stats = [
    { value: '5+', label: 'Anos de Experiência', color: 'text-teal-600' },
    { value: '30+', label: 'Projetos Entregues', color: 'text-orange-500' },
    { value: '95%', label: 'Clientes Satisfeitos', color: 'text-emerald-600' },
    { value: '100%', label: 'Código Personalizado', color: 'text-amber-600' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 + index * 0.1, type: "spring", bounce: 0.5 }}
          className="space-y-2"
        >
          <div className={cn("text-3xl lg:text-4xl font-bold", stat.color)}>
            {stat.value}
          </div>
          <div className="text-gray-600 text-sm font-medium">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export const PremiumShowcase = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-orange-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-to-r from-teal-600 to-orange-500 text-white border-0 mb-4">
            <Star className="w-4 h-4 mr-2" />
            Soluções ARCO
          </Badge>

          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Desenvolvimento &
            <span className="block bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent">
              Crescimento Digital
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Criamos sites modernos e implementamos estratégias de tráfego para
            fazer seu negócio crescer na internet com resultados mensuráveis.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mb-20">
          <StatsSection />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {premiumFeatures.map((feature, index) => (
            <PremiumFeatureCard
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center bg-white rounded-3xl p-12 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Stack Tecnológico Premium
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Next.js 15', desc: 'React Framework' },
              { name: 'TypeScript', desc: 'Type Safety' },
              { name: 'Framer Motion', desc: 'Animations' },
              { name: 'Tailwind CSS', desc: 'Styling' }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="text-center p-4 rounded-xl bg-gray-50 hover:bg-teal-50 transition-colors duration-300"
              >
                <div className="font-semibold text-gray-900 mb-1">{tech.name}</div>
                <div className="text-sm text-gray-600">{tech.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-teal-600 to-orange-500 hover:from-teal-700 hover:to-orange-600 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-xl shadow-teal-500/25 hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300"
          >
            Conversar Conosco
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default PremiumShowcase