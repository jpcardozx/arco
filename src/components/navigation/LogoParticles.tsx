'use client';

import React, { useCallback, useMemo } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

/**
 * LogoParticles Component
 * 
 * Partículas sutis e elegantes ao redor da logo ARCO
 * - Performance otimizada com tsparticles-slim
 * - Efeito hover interativo
 * - Partículas com gradiente teal/blue
 * - Conexões sutis entre partículas
 */

export const LogoParticles = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  const options: any = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'grab',
            parallax: {
              enable: true,
              force: 60,
              smooth: 10,
            },
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              blink: false,
              consent: false,
              opacity: 0.5,
            },
          },
        },
      },
      particles: {
        color: {
          value: ['#14b8a6', '#0d9488', '#06b6d4', '#0891b2'],
        },
        links: {
          color: '#14b8a6',
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: true,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 25,
        },
        opacity: {
          value: { min: 0.1, max: 0.4 },
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.1,
            sync: false,
          },
        },
        shape: {
          type: ['circle', 'triangle'],
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.5,
            sync: false,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none opacity-60">
      <Particles
        id="logo-particles"
        init={particlesInit}
        options={options}
      />
    </div>
  );
};

export default LogoParticles;
