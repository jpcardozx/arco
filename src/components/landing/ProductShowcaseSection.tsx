/**
 * Product Showcase Section
 * Displays luxury beauty products with image
 * Para: LP Salão de Beleza
 */

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

interface ProductShowcaseSectionProps {
  image: string
  imageFallback?: string
  imageAlt?: string
  title: string
  subtitle?: string
  description?: string
  highlights?: string[]
  cta?: {
    text: string
    href: string
  }
  ctaSecondary?: {
    text: string
    href: string
  }
  imagePosition?: 'left' | 'right'
  children?: ReactNode
}

export function ProductShowcaseSection({
  image,
  imageFallback,
  imageAlt = 'Product Showcase',
  title,
  subtitle,
  description,
  highlights = [],
  cta,
  ctaSecondary,
  imagePosition = 'left',
  children,
}: ProductShowcaseSectionProps) {
  const imageOrder = imagePosition === 'left' ? 'order-1 lg:order-1' : 'order-2 lg:order-2'
  const contentOrder = imagePosition === 'left' ? 'order-2 lg:order-2' : 'order-1 lg:order-1'

  return (
    <section className="py-20 md:py-28 px-4 md:px-8 bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className={`${imageOrder} rounded-xl overflow-hidden shadow-2xl h-96 md:h-[500px] lg:h-[550px]`}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              quality={85}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className={contentOrder}>
            {/* Title Section */}
            <div className="mb-8">
              {subtitle && (
                <p className="text-amber-500 font-semibold text-sm md:text-base mb-3 uppercase tracking-wide">
                  {subtitle}
                </p>
              )}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {title}
              </h2>
            </div>

            {/* Description */}
            {description && (
              <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed">
                {description}
              </p>
            )}

            {/* Highlights */}
            {highlights.length > 0 && (
              <ul className="mb-8 space-y-3">
                {highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-slate-200"
                  >
                    <span className="text-amber-500 font-bold mt-1">✓</span>
                    <span className="text-base md:text-lg">{highlight}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              {cta && (
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                >
                  <a href={cta.href}>{cta.text}</a>
                </Button>
              )}
              {ctaSecondary && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-800"
                >
                  <a href={ctaSecondary.href}>{ctaSecondary.text}</a>
                </Button>
              )}
            </div>

            {/* Children (additional content) */}
            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  )
}
