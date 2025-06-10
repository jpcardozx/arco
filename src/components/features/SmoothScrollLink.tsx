'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { trackPortfolioEvent } from '../../lib/portfolioAnalytics';

interface SmoothScrollLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  duration?: number;
  offset?: number;
}

export default function SmoothScrollLink({
  to,
  children,
  className = '',
  duration = 0.8,
  offset = 0,
}: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const targetId = to.replace(/.*#/, '');
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    // Track the click event
    if (typeof window !== 'undefined') {
      try {
        trackPortfolioEvent({
          eventName: 'navigation_click',
          section: targetId,
          action: 'scroll',
        });
      } catch (e) {
        console.error('Could not track navigation event:', e);
      }
    }

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <motion.a
      href={to}
      onClick={handleClick}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.a>
  );
}
