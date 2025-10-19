/**
 * TestimonialsWithImage Component
 * Seção de testimoniais com imagem side-by-side
 */

import Image from 'next/image'
import { ReactNode } from 'react'

interface Testimonial {
  id: string
  quote: string
  author: string
  role?: string
  rating?: number
}

interface TestimonialsWithImageProps {
  image: string
  imageAlt?: string
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
  children?: ReactNode
  layout?: 'side-by-side' | 'stacked'
  imagePosition?: 'left' | 'right'
}

export function TestimonialsWithImage({
  image,
  imageAlt = 'Testimonial Image',
  title,
  subtitle,
  testimonials = [],
  children,
  layout = 'side-by-side',
  imagePosition = 'left',
}: TestimonialsWithImageProps) {
  const gridClass =
    layout === 'side-by-side'
      ? `grid grid-cols-1 ${imagePosition === 'left' ? 'lg:grid-cols-2' : 'lg:grid-cols-2'} gap-12 lg:gap-16 items-center`
      : 'space-y-12'

  const imageOrder = imagePosition === 'left' ? 'order-1 lg:order-1' : 'order-2 lg:order-2'
  const contentOrder =
    imagePosition === 'left' ? 'order-2 lg:order-2' : 'order-1 lg:order-1'

  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className={gridClass}>
          {/* Image - Left or Right */}
          <div className={`${imageOrder} rounded-xl overflow-hidden shadow-xl h-80 md:h-96 lg:h-[500px]`}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              quality={85}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content - Right or Left */}
          <div className={contentOrder}>
            {/* Header */}
            {(title || subtitle) && (
              <div className="mb-8 md:mb-12">
                {title && (
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-lg md:text-xl text-slate-400">
                    {subtitle}
                  </p>
                )}
              </div>
            )}

            {/* Testimonials */}
            {testimonials.length > 0 && (
              <div className="space-y-6 md:space-y-8 mb-8">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="p-6 md:p-8 rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: 'rgba(212, 175, 55, 0.05)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                    }}
                  >
                    {/* Rating */}
                    {testimonial.rating && (
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <span key={i} className="text-lg text-amber-500">
                              ★
                            </span>
                          )
                        )}
                      </div>
                    )}

                    {/* Quote */}
                    <p className="text-base md:text-lg text-white italic leading-relaxed mb-4">
                      &quot;{testimonial.quote}&quot;
                    </p>

                    {/* Author */}
                    <div>
                      <p className="font-semibold text-white">
                        {testimonial.author}
                      </p>
                      {testimonial.role && (
                        <p className="text-sm text-slate-400">
                          {testimonial.role}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA or Custom Content */}
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
