/**
 * HeroWithImageSection Component
 * Hero section com background image otimizado
 */

import Image from 'next/image'
import { ReactNode } from 'react'

interface HeroWithImageSectionProps {
  backgroundImage: string
  backgroundImageAlt?: string
  title: string | ReactNode
  subtitle: string | ReactNode
  children?: ReactNode
  height?: 'screen' | 'half' | 'auto'
  priority?: boolean
}

export function HeroWithImageSection({
  backgroundImage,
  backgroundImageAlt = 'Hero Background',
  title,
  subtitle,
  children,
  height = 'screen',
  priority = true,
}: HeroWithImageSectionProps) {
  const heightClass = {
    screen: 'h-screen',
    half: 'h-[80vh]',
    auto: 'h-auto',
  }[height]

  return (
    <section className={`relative w-full overflow-hidden ${heightClass}`}>
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={backgroundImageAlt}
        fill
        priority={priority}
        quality={85}
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-8 py-12 md:py-0">
        <div className="max-w-3xl text-center space-y-6">
          {/* Title */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            style={{
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Children (CTA buttons, etc) */}
          {children && <div className="pt-6">{children}</div>}
        </div>
      </div>
    </section>
  )
}
