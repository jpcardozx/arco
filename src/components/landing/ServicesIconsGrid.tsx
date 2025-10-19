/**
 * ServicesIconsGrid Component
 * Grid responsivo de ícones de serviços
 */

import { ReactNode } from 'react'

interface ServiceIcon {
  id: string
  icon: ReactNode
  label: string
  description?: string
  color?: 'pink' | 'amber' | 'purple' | 'cyan'
}

interface ServicesIconsGridProps {
  services: ServiceIcon[]
  title?: string
  subtitle?: string
  columns?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
}

const colorClasses = {
  pink: 'from-pink-500/20 to-pink-500/5 border-pink-500/30 hover:border-pink-500/60',
  amber:
    'from-amber-500/20 to-amber-500/5 border-amber-500/30 hover:border-amber-500/60',
  purple:
    'from-purple-500/20 to-purple-500/5 border-purple-500/30 hover:border-purple-500/60',
  cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 hover:border-cyan-500/60',
}

export function ServicesIconsGrid({
  services,
  title,
  subtitle,
  columns = { mobile: 1, tablet: 2, desktop: 4 },
}: ServicesIconsGridProps) {
  const colsClass = `grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`

  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12 md:mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Icons Grid */}
        <div className={`grid ${colsClass} gap-6 md:gap-8 lg:gap-8`}>
          {services.map((service) => (
            <div
              key={service.id}
              className={`group p-6 md:p-8 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer bg-gradient-to-br ${
                colorClasses[service.color || 'amber']
              }`}
            >
              {/* Icon */}
              <div className="mb-4 text-4xl md:text-5xl">
                {service.icon}
              </div>

              {/* Label */}
              <h3 className="font-semibold text-lg md:text-xl text-white mb-2">
                {service.label}
              </h3>

              {/* Description */}
              {service.description && (
                <p className="text-sm md:text-base text-slate-300">
                  {service.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
