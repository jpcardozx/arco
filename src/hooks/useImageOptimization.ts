/**
 * Hook: useImageOptimization
 * Gerencia otimização de imagens (lazy loading, WebP, blur placeholder)
 */

import { useEffect, useState } from 'react'

interface ImageOptimizationOptions {
  src: string
  alt: string
  priority?: boolean
  blurDataURL?: string
  quality?: number
}

export function useImageOptimization({
  src,
  priority = false,
  blurDataURL,
  quality = 85,
}: ImageOptimizationOptions) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState<string>('')

  useEffect(() => {
    if (!src) return

    // Para images priority, carregar imediatamente
    if (priority) {
      setImageSrc(src)
      setIsLoaded(true)
      return
    }

    // Lazy load com Intersection Observer
    const img = new Image()

    const handleLoad = () => {
      setImageSrc(src)
      setIsLoaded(true)
    }

    const handleError = () => {
      console.warn(`Failed to load image: ${src}`)
      setIsLoaded(false)
    }

    img.onload = handleLoad
    img.onerror = handleError

    // Simular lazy loading delay
    const timeoutId = setTimeout(() => {
      img.src = src
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [src, priority])

  return {
    isLoaded,
    imageSrc,
    blurDataURL: blurDataURL || 'data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB2aWV3Qm94PSIwIDAgMTAgMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRjVGNUY1Ii8+Cjwvc3ZnPg==',
    quality,
  }
}
