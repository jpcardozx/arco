'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { motion } from 'framer-motion';
import { designTokens } from '@/design-system/tokens';

// Stunning React Spring Particle System - Multiple layers with sophisticated distribution
interface ParticleBackgroundProps {
  variant?: 'hero' | 'subtle' | 'premium';
  className?: string;
  density?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
  direction: number;
  layer: number;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  variant = 'hero',
  className = '',
  density = 120
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Advanced particle configuration with stunning visual hierarchy
  const particleConfig = useMemo(() => {
    const configs = {
      hero: {
        count: Math.floor(density * 1.2),
        layers: 4,
        colors: [designTokens.colors.teal[400], designTokens.colors.orange[400], designTokens.colors.teal[500], designTokens.colors.orange[500]],
        sizeRange: [1, 14],
        speedRange: [0.3, 1.6],
        distribution: 'organic'
      },
      subtle: {
        count: Math.floor(density * 0.6),
        layers: 3,
        colors: [designTokens.colors.teal[300], designTokens.colors.orange[300], designTokens.colors.neutral[400]],
        sizeRange: [1, 8],
        speedRange: [0.2, 1.2],
        distribution: 'uniform'
      },
      premium: {
        count: Math.floor(density * 1.5),
        layers: 5,
        colors: [designTokens.colors.teal[500], designTokens.colors.orange[500], designTokens.colors.emerald[500], designTokens.colors.teal[700], designTokens.colors.orange[600]],
        sizeRange: [2, 20],
        speedRange: [0.4, 2.2],
        distribution: 'clustered'
      }
    };
    return configs[variant];
  }, [variant, density]);

  // Generate sophisticated particle distribution
  const particles = useMemo(() => {
    const config = particleConfig;
    const particleArray: Particle[] = [];

    for (let layer = 0; layer < config.layers; layer++) {
      const layerParticleCount = Math.floor(config.count / config.layers);

      for (let i = 0; i < layerParticleCount; i++) {
        let x, y;

        // Different distribution patterns for stunning visual hierarchy
        switch (config.distribution) {
          case 'organic':
            // Natural cluster distribution with golden ratio
            const angle = i * 137.508; // Golden angle
            const radius = Math.sqrt(i) * 15;
            x = 50 + (radius * Math.cos(angle * Math.PI / 180)) / 2;
            y = 50 + (radius * Math.sin(angle * Math.PI / 180)) / 2;
            break;

          case 'clustered':
            // Multiple focal points with gaussian distribution
            const clusterCenters = [
              { x: 20, y: 30 }, { x: 80, y: 20 }, { x: 70, y: 80 }, { x: 30, y: 70 }
            ];
            const cluster = clusterCenters[Math.floor(Math.random() * clusterCenters.length)];
            x = cluster.x + (Math.random() - 0.5) * 40;
            y = cluster.y + (Math.random() - 0.5) * 40;
            break;

          default: // uniform
            x = Math.random() * 100;
            y = Math.random() * 100;
        }

        // Ensure particles stay within bounds
        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));

        const size = config.sizeRange[0] + Math.random() * (config.sizeRange[1] - config.sizeRange[0]);
        const layerIntensity = 1 - (layer / config.layers);

        particleArray.push({
          id: layer * 1000 + i,
          x,
          y,
          size: size * (0.5 + layerIntensity * 0.5),
          color: config.colors[Math.floor(Math.random() * config.colors.length)],
          opacity: (0.1 + Math.random() * 0.7) * layerIntensity,
          speed: config.speedRange[0] + Math.random() * (config.speedRange[1] - config.speedRange[0]),
          direction: Math.random() * 360,
          layer
        });
      }
    }

    return particleArray;
  }, [particleConfig]);

  // Background layer animations
  const backgroundAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: mounted ? 1 : 0 },
    config: { duration: 2000 }
  });

  if (!mounted) return null;

  return (
    <animated.div
      style={backgroundAnimation}
      className={`absolute inset-0 pointer-events-none ${className}`}
    >
      {/* Multi-layer particle system */}
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
          animate={{
            opacity: particle.opacity,
            scale: [1, 1.1, 1],
            y: [0, -20, 0],
            x: [0, Math.sin(particle.direction) * 10, 0],
          }}
          transition={{
            opacity: { delay: index * 0.02, duration: 1, ease: "easeOut" },
            scale: { duration: 8 + particle.speed * 4, repeat: Infinity, ease: "easeInOut", delay: particle.layer * 0.5 },
            y: { duration: 8 + particle.speed * 4, repeat: Infinity, ease: "easeInOut", delay: particle.layer * 0.5 },
            x: { duration: 8 + particle.speed * 4, repeat: Infinity, ease: "easeInOut", delay: particle.layer * 0.5 },
          }}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color} 0%, ${particle.color}80 40%, transparent 70%)`,
            borderRadius: '50%',
            filter: `blur(${Math.max(0.5, particle.size * 0.1)}px) drop-shadow(0 0 ${particle.size}px ${particle.color}40)`,
            zIndex: particle.layer + 1,
          }}
        />
      ))}

      {/* Dynamic CSS animations for each particle */}
      <style jsx>{`
        ${particles.map(particle => `
          @keyframes float-${particle.id} {
            0%, 100% {
              transform: translate(0px, 0px) rotate(0deg) scale(1);
              opacity: ${particle.opacity};
            }
            25% {
              transform: translate(${Math.sin(particle.direction) * 20}px, ${Math.cos(particle.direction) * 15}px) rotate(90deg) scale(1.1);
              opacity: ${particle.opacity * 1.3};
            }
            50% {
              transform: translate(${Math.sin(particle.direction + 90) * 25}px, ${Math.cos(particle.direction + 90) * 20}px) rotate(180deg) scale(0.9);
              opacity: ${particle.opacity * 0.7};
            }
            75% {
              transform: translate(${Math.sin(particle.direction + 180) * 15}px, ${Math.cos(particle.direction + 180) * 25}px) rotate(270deg) scale(1.2);
              opacity: ${particle.opacity * 1.1};
            }
          }
        `).join('')}

        /* Hardware acceleration for smooth performance */
        * {
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform, opacity;
        }
      `}</style>
    </animated.div>
  );
};

export default ParticleBackground;