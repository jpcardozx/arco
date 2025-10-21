'use client';

import React, { useState } from 'react';
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
}

/**
 * Componente de imagem otimizada com:
 * - Lazy loading nativo
 * - Suporte a WebP com fallback
 * - Blur placeholder durante carregamento
 * - Fade-in animation
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
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Gera versões WebP e fallback
  const getImageSources = (imageSrc: string) => {
    const isExternalUrl = imageSrc.startsWith('http');
    if (isExternalUrl) return { webp: imageSrc, fallback: imageSrc };

    // Se já é WebP, usa direto
    if (imageSrc.endsWith('.webp')) {
      return {
        webp: imageSrc,
        fallback: imageSrc.replace(/\.webp$/i, '.jpg'), // Tenta JPG como fallback
      };
    }

    // Se é JPG/PNG, gera versão WebP
    const basePath = imageSrc.replace(/\.(jpg|jpeg|png)$/i, '');
    return {
      webp: `${basePath}.webp`,
      fallback: imageSrc,
    };
  };

  const { webp, fallback } = getImageSources(src);
  const placeholder = getPlaceholder(placeholderType, width || 800, height || 600);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Blur placeholder */}
      {!isLoaded && !hasError && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full"
          style={{ objectFit }}
          aria-hidden="true"
        />
      )}

      {/* Imagem principal */}
      <motion.picture
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="block w-full h-full"
      >
        <source srcSet={webp} type="image/webp" />
        <img
          src={fallback}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            objectPosition: 'center',
          }}
          className={isLoaded ? 'opacity-100' : 'opacity-0'}
        />
      </motion.picture>

      {/* Fallback para erro */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-slate-400 text-sm">
          Imagem não disponível
        </div>
      )}
    </div>
  );
}
