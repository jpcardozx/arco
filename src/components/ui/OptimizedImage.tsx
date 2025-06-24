/**
 * ARCO PERFORMANCE PATCH: Critical Image Optimization
 * Target: <0.8s LCP, 98+ Lighthouse Score
 */

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
    src: string
    alt: string
    priority?: boolean
    fallback?: string
    quality?: number
}

/**
 * Performance-first image component with AVIF/WebP optimization
 */
export function OptimizedImage({
    src,
    alt,
    priority = false,
    fallback,
    quality = 75, // Mais agressivo para performance
    className = '',
    ...props
}: OptimizedImageProps) {
    const [imageError, setImageError] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    // Auto-detect critical images
    const isCritical = priority || className.includes('hero') || className.includes('lcp')

    // Determinar se usar versão otimizada
    const isLocal = !src.startsWith('http') && !src.includes('.svg')
    const baseName = isLocal ? src.replace(/\.[^/.]+$/, '').replace(/^\//, '') : src

    const handleError = () => setImageError(true)
    const handleLoad = () => setImageLoaded(true)

    const imageSrc = imageError && fallback ? fallback : src

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <Image
                src={imageSrc}
                alt={alt}
                priority={isCritical}
                quality={quality}
                onError={handleError}
                onLoad={handleLoad}
                className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                {...props}
            />

            {/* Loading placeholder */}
            {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </div>
    )
}

/**
 * Background image component with optimized loading
 * For hero sections and large background images
 */
interface OptimizedBackgroundProps {
    src: string
    alt: string
    children: React.ReactNode
    className?: string
    priority?: boolean
}

export function OptimizedBackground({
    src,
    alt,
    children,
    className = '',
    priority = false
}: OptimizedBackgroundProps) {
    const [loaded, setLoaded] = useState(false)

    return (
        <div className={`relative ${className}`}>
            <OptimizedImage
                src={src}
                alt={alt}
                fill
                priority={priority}
                quality={90}
                className="object-cover"
                onLoad={() => setLoaded(true)}
            />

            {/* Content overlay */}
            <div className={`relative z-10 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                {children}
            </div>

            {/* Loading state */}
            {!loaded && (
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-20">
                    <div className="text-white text-center">
                        <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-sm opacity-70">Optimizing experience...</p>
                    </div>
                </div>
            )}
        </div>
    )
}

/**
 * Progressive image loading for galleries and case studies
 */
interface ProgressiveImageProps extends Omit<OptimizedImageProps, 'placeholder'> {
    placeholder?: 'blur' | 'empty'
    blurDataURL?: string
}

export function ProgressiveImage({
    placeholder,
    blurDataURL,
    ...props
}: ProgressiveImageProps) {
    return (
        <OptimizedImage
            {...props}
            placeholder={blurDataURL ? 'blur' : placeholder ? 'empty' : 'blur'}
            blurDataURL={blurDataURL || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyEkBBurSMaVJCUnlp2zEr/ALGMDaMCIGgCUQ9eA6hwF8W1w/IZqhqQ='}
        />
    )
}
