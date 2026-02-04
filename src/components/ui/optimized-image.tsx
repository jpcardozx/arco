'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getPlaceholder } from '@/lib/image-placeholders';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  placeholderType?: 'generic' | 'salonInterior' | 'professionalService' | 'products' | 'blur';
  onLoad?: () => void;
  fill?: boolean;
}

/**
 * Componente de imagem otimizada com Next.js Image:
 * - Otimização automática de imagens (WebP/AVIF)
 * - Lazy loading nativo (exceto priority)
 * - Blur placeholder durante carregamento
 * - Fade-in animation suave
 * - Responsive images automático
 * 
 * Performance:
 * - Next.js detecta automaticamente suporte a AVIF
 * - Fallback automático para WebP e JPG
 * - Otimização de tamanho baseada no viewport
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover',
  placeholderType = 'blur',
  onLoad,
  fill = false,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Para imagens externas, usa o img nativo
  const isExternalUrl = src.startsWith('http');

  if (isExternalUrl || hasError) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full transition-opacity duration-400 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ objectFit }}
        />
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-slate-400 text-sm">
            Imagem não disponível
          </div>
        )}
      </div>
    );
  }

  // Para imagens locais, usa Next.js Image com otimização automática
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : (width || 800)}
        height={fill ? undefined : (height || 600)}
        fill={fill}
        priority={priority}
        quality={90}
        onLoad={handleLoad}
        onError={handleError}
        className={className}
        style={{ objectFit }}
        sizes={fill ? '100vw' : undefined}
      />
    </motion.div>
  );
}
