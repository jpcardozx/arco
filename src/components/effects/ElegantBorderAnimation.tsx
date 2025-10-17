/**
 * Elegant Border Animation Component
 * Premium 8-bit inspired neon border effect
 * Evolved from footer neon borders with enhanced elegance
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ElegantBorderAnimationProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'minimal' | 'medium' | 'intense';
  colorScheme?: 'teal' | 'gradient' | 'subtle';
  animated?: boolean;
}

/**
 * Creates elegant animated neon border with pixel-perfect precision
 * Variants:
 * - minimal: Subtle glow effect (default)
 * - medium: Balanced visibility with smooth animation
 * - intense: Strong glow with rapid animation
 */
export const ElegantBorderAnimation: React.FC<ElegantBorderAnimationProps> = ({
  children,
  className,
  variant = 'minimal',
  colorScheme = 'teal',
  animated = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated || !containerRef.current) return;

    const container = containerRef.current;
    const style = container.style;

    // Configuration based on variant
    const configs = {
      minimal: {
        duration: 4000,
        glowBlur: '12px',
        initialOpacity: 0.3,
      },
      medium: {
        duration: 3000,
        glowBlur: '20px',
        initialOpacity: 0.5,
      },
      intense: {
        duration: 2000,
        glowBlur: '30px',
        initialOpacity: 0.7,
      },
    };

    const config = configs[variant];

    // Animate border position (8-bit like scan effect)
    let animationFrameId: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % config.duration) / config.duration;

      // Smooth wave effect using sine wave
      const glowPosition = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5;

      if (colorScheme === 'gradient') {
        style.backgroundImage = `
          linear-gradient(135deg, 
            rgba(20, 184, 166, ${0.15 * glowPosition}) 0%, 
            rgba(6, 182, 212, ${0.1 * glowPosition}) 50%, 
            rgba(20, 184, 166, ${0.15 * glowPosition}) 100%
          )
        `;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [animated, variant, colorScheme]);

  // Color configurations
  const colorConfigs = {
    teal: {
      border: 'border-teal-400/20',
      glow: 'shadow-[0_0_20px_-5px_rgba(20,184,166,0.3)]',
      hoverGlow: 'hover:shadow-[0_0_30px_-3px_rgba(20,184,166,0.4)]',
    },
    gradient: {
      border: 'border-teal-400/15',
      glow: 'shadow-[0_0_24px_-6px_rgba(20,184,166,0.25)]',
      hoverGlow: 'hover:shadow-[0_0_40px_-2px_rgba(20,184,166,0.35)]',
    },
    subtle: {
      border: 'border-white/10',
      glow: 'shadow-[0_0_16px_-8px_rgba(148,163,184,0.2)]',
      hoverGlow: 'hover:shadow-[0_0_24px_-6px_rgba(148,163,184,0.25)]',
    },
  };

  const config = colorConfigs[colorScheme];

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative',
        `border ${config.border}`,
        `${config.glow}`,
        `transition-all duration-500 ${config.hoverGlow}`,
        className
      )}
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {/* Optional: Animated gradient overlay for variant detection */}
      {colorScheme === 'gradient' && (
        <motion.div
          className="absolute inset-0 opacity-0 rounded-[inherit]"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background:
              'linear-gradient(135deg, rgba(20,184,166,0.1), rgba(6,182,212,0.05))',
            pointerEvents: 'none',
          }}
        />
      )}

      {children}
    </div>
  );
};

/**
 * Horizontal line variant - Perfect for navbar bottom border
 */
interface ElegantLineAnimationProps {
  className?: string;
  variant?: 'thin' | 'medium' | 'thick';
  colorScheme?: 'teal' | 'gradient' | 'subtle';
}

export const ElegantLineAnimation: React.FC<ElegantLineAnimationProps> = ({
  className,
  variant = 'thin',
  colorScheme = 'teal',
}) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;

    const line = lineRef.current;
    const style = line.style;

    let animationFrameId: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % 3500) / 3500;

      // Wave effect with more pronounced amplitude
      const waveAmplitude = 0.7;
      const wavePosition = Math.sin(progress * Math.PI * 2) * waveAmplitude + 0.5;

      if (colorScheme === 'gradient') {
        // Enhanced gradient with stronger glow
        style.background = `linear-gradient(90deg,
          rgba(20, 184, 166, ${0.15 * wavePosition}),
          rgba(6, 182, 212, ${0.4 * wavePosition}),
          rgba(20, 184, 166, ${0.15 * wavePosition})
        )`;
        style.boxShadow = `0 0 ${20 * wavePosition}px -2px rgba(20, 184, 166, ${
          0.4 * wavePosition
        }), 0 0 ${10 * wavePosition}px -4px rgba(6, 182, 212, ${0.25 * wavePosition})`;
      } else if (colorScheme === 'teal') {
        style.boxShadow = `0 0 ${20 * wavePosition}px -3px rgba(20, 184, 166, ${
          0.45 * wavePosition
        })`;
      } else {
        style.opacity = `${0.3 + 0.2 * wavePosition}`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [colorScheme]);

  const heightClass = {
    thin: 'h-px',
    medium: 'h-0.5',
    thick: 'h-1',
  };

  const colorClass = {
    teal: 'bg-teal-400/40',
    gradient: 'bg-transparent',
    subtle: 'bg-white/20',
  };

  return (
    <div
      ref={lineRef}
      className={cn(
        heightClass[variant],
        colorClass[colorScheme],
        'w-full transition-all duration-300',
        className
      )}
      style={{
        background:
          colorScheme === 'gradient'
            ? 'linear-gradient(90deg, rgba(20,184,166,0.2), rgba(6,182,212,0.4), rgba(20,184,166,0.2))'
            : undefined,
      }}
    />
  );
};

export default ElegantBorderAnimation;
