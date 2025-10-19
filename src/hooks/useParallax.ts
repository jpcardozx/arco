/**
 * Parallax Hook - Elegant scroll-based parallax effect
 * 
 * Provides smooth parallax animations based on scroll position
 * with performance optimization and reduced motion support
 */

'use client';

import { useEffect, useState, RefObject } from 'react';

interface ParallaxOptions {
  speed?: number; // Parallax speed multiplier (default: 0.5)
  direction?: 'vertical' | 'horizontal';
  enableOnMobile?: boolean;
}

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  options: ParallaxOptions = {}
) {
  const {
    speed = 0.5,
    direction = 'vertical',
    enableOnMobile = false,
  } = options;

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile && !enableOnMobile) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      
      // Calculate offset based on scroll progress
      const calculatedOffset = (scrollProgress - 0.5) * 100 * speed;
      setOffset(calculatedOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed, enableOnMobile]);

  return {
    offset,
    style: {
      transform: direction === 'vertical' 
        ? `translateY(${offset}px)` 
        : `translateX(${offset}px)`,
    },
  };
}

/**
 * Mouse Parallax Hook - Parallax based on mouse position
 */
export function useMouseParallax(intensity: number = 20) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * intensity;
      const y = (e.clientY / window.innerHeight - 0.5) * intensity;
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);

  return {
    x: position.x,
    y: position.y,
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`,
    },
  };
}

/**
 * Scroll Progress Hook - Track scroll progress of an element
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the element has been scrolled through
      const scrolled = windowHeight - rect.top;
      const total = windowHeight + elementHeight;
      const percentage = Math.max(0, Math.min(100, (scrolled / total) * 100));
      
      setProgress(percentage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return progress;
}
