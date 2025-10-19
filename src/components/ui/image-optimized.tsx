/**
 * ImageOptimized Component
 * Wrapper da Image do Next.js com otimizações automáticas
 */

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface ImageOptimizedProps extends Omit<ImageProps, 'onLoadingComplete'> {
  fallback?: string
  blurDataURL?: string
}

export function ImageOptimized({
  fallback,
  blurDataURL,
  alt,
  className,
  ...props
}: ImageOptimizedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        alt={alt}
        placeholder="blur"
        blurDataURL={blurDataURL}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />

      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 animate-pulse" />
      )}

      {/* Fallback image */}
      {hasError && fallback && (
        <Image
          alt={`${alt} (fallback)`}
          src={fallback}
          onLoadingComplete={() => setIsLoading(false)}
          {...props}
        />
      )}
    </div>
  )
}
