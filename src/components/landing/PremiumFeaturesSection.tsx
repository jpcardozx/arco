/**
 * Premium Features Section
 * Showcases luxury beauty services with 8 icons + descriptions
 * Para: Homepage + LP
 */

import { ReactNode } from 'react'

interface Feature {
  id: string
  icon: ReactNode
  title: string
  description: string
  emoji: string
}

interface PremiumFeaturesSectionProps {
  title?: string
  subtitle?: string
  features?: Feature[]
  layout?: 'grid-2' | 'grid-4' | 'grid-8'
}

export function PremiumFeaturesSection({
  title = 'Premium Services',
  subtitle = 'Comprehensive beauty & wellness solutions',
  features = [],
  layout = 'grid-4',
}: PremiumFeaturesSectionProps) {
  const gridClass = {
    'grid-2': 'grid-cols-1 md:grid-cols-2',
    'grid-4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    'grid-8': 'grid-cols-2 md:grid-cols-4 lg:grid-cols-4',
  }[layout]

  return (
    <section className="py-20 md:py-28 px-4 md:px-8 bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className={`grid ${gridClass} gap-6 md:gap-8`}>
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative p-6 md:p-8 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10"
            >
              {/* Icon Container */}
              <div className="mb-4 text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-300">
                {feature.emoji}
              </div>

              {/* Content */}
              <h3 className="font-semibold text-lg md:text-xl text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Accent */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
