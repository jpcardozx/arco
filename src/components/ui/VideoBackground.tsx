/**
 * VideoBackground Component
 * Premium lazy-loaded video background with glassmorphic fade-in
 * 
 * Features:
 * - Intersection Observer (lazy load)
 * - Smooth fade-in animation
 * - Poster image fallback
 * - Mobile-optimized (optional pause)
 * - Zero layout shift (CLS)
 * - Accessible (respects prefers-reduced-motion)
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface VideoBackgroundProps {
  /** Video source URL */
  src: string;
  
  /** Poster image (shown while loading) */
  poster?: string;
  
  /** Overlay opacity (0-100) */
  overlayOpacity?: number;
  
  /** Overlay gradient direction */
  overlayGradient?: 'to-b' | 'to-t' | 'to-br' | 'to-tr' | 'radial';
  
  /** Fade-in animation style */
  fadeStyle?: 'subtle' | 'dramatic' | 'none';
  
  /** Pause video on mobile devices */
  pauseOnMobile?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Video quality for different viewports */
  srcMobile?: string;
  
  /** Callback when video is loaded */
  onLoaded?: () => void;
}

export function VideoBackground({
  src,
  poster,
  overlayOpacity = 60,
  overlayGradient = 'to-b',
  fadeStyle = 'subtle',
  pauseOnMobile = true,
  className,
  srcMobile,
  onLoaded
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer - Lazy load
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true);
            
            // Load video
            const sourceToUse = isMobile && srcMobile ? srcMobile : src;
            video.src = sourceToUse;
            video.load();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before visible
        threshold: 0.01
      }
    );

    observer.observe(video);

    return () => {
      if (video) observer.unobserve(video);
    };
  }, [src, srcMobile, isMobile, isInView]);

  // Handle video loaded
  const handleLoadedData = () => {
    setIsLoaded(true);
    onLoaded?.();
  };

  // Pause on mobile if needed
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (pauseOnMobile && isMobile) {
      video.pause();
    } else if (isLoaded) {
      video.play().catch(() => {
        // Autoplay blocked, silently fail
        console.log('Video autoplay prevented');
      });
    }
  }, [isMobile, pauseOnMobile, isLoaded]);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      video.pause();
    }
  }, []);

  // Fade animation variants
  const fadeVariants = {
    subtle: {
      initial: { opacity: 0, filter: 'blur(8px)' },
      animate: { opacity: 1, filter: 'blur(0px)' },
      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
    },
    dramatic: {
      initial: { opacity: 0, scale: 1.1, filter: 'blur(20px)' },
      animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
      transition: { duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }
    },
    none: {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      transition: { duration: 0 }
    }
  };

  const selectedFade = fadeVariants[fadeStyle];

  // Gradient overlays
  const gradientClasses = {
    'to-b': 'bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950/90',
    'to-t': 'bg-gradient-to-t from-slate-950/40 via-slate-950/60 to-slate-950/90',
    'to-br': 'bg-gradient-to-br from-slate-950/40 via-slate-950/60 to-slate-950/90',
    'to-tr': 'bg-gradient-to-tr from-slate-950/40 via-slate-950/60 to-slate-950/90',
    'radial': 'bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.4)_0%,rgba(15,23,42,0.9)_100%)]'
  };

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Video Element */}
      <motion.video
        ref={videoRef}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        onLoadedMetadata={(e) => {
          // C\u00e2mera lenta 0.75x para efeito premium
          e.currentTarget.playbackRate = 0.75;
        }}
        preload="metadata"
        onLoadedData={handleLoadedData}
        initial={selectedFade.initial}
        animate={isLoaded ? selectedFade.animate : selectedFade.initial}
        transition={selectedFade.transition}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          WebkitTransform: 'translateZ(0)', // GPU acceleration
          willChange: 'transform, opacity, filter',
          imageRendering: 'crisp-edges', // Anti-pixelamento
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translate3d(0, 0, 0)' // Force hardware acceleration
        }}
        aria-hidden="true"
      >
        {/* Fallback for browsers without video support */}
        <source type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {/* Loading Poster (visible until video loads) */}
      <AnimatePresence>
        {!isLoaded && poster && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-10"
          >
            <img
              src={poster}
              alt=""
              className="h-full w-full object-cover"
              loading="eager"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div 
        className={cn(
          'absolute inset-0 z-20',
          gradientClasses[overlayGradient]
        )}
        style={{ opacity: overlayOpacity / 100 }}
      />

      {/* Subtle noise texture for depth */}
      <div
        className="absolute inset-0 z-30 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  );
}

/**
 * Usage Examples:
 * 
 * // Basic usage
 * <VideoBackground
 *   src="/videos/hero-assessment.mp4"
 *   poster="/videos/posters/assessment.jpg"
 * />
 * 
 * // With mobile optimization
 * <VideoBackground
 *   src="/videos/hero-assessment.mp4"
 *   srcMobile="/videos/hero-assessment-mobile.mp4"
 *   poster="/videos/posters/assessment.jpg"
 *   pauseOnMobile={true}
 * />
 * 
 * // Dramatic fade-in
 * <VideoBackground
 *   src="/videos/hero-methodology.mp4"
 *   poster="/videos/posters/methodology.jpg"
 *   fadeStyle="dramatic"
 *   overlayOpacity={70}
 * />
 * 
 * // Custom gradient
 * <VideoBackground
 *   src="/videos/hero-services.mp4"
 *   poster="/videos/posters/services.jpg"
 *   overlayGradient="radial"
 *   onLoaded={() => console.log('Video loaded!')}
 * />
 */
