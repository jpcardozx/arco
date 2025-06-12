'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

import { cn } from '@/lib/utils/ui-utils';

interface SplitTextProps {
  text: string;
  component?: keyof React.JSX.IntrinsicElements;
  className?: string;
  charClassName?: string;
  charDelay?: number;
  wordSpacing?: boolean;
  isVisible?: boolean;
}

/**
 * SplitText component for advanced text animations
 * Splits text into individual characters for reveal animations
 */
export function SplitText({
  text,
  component = 'div',
  className,
  charClassName,
  charDelay = 0.02,
  wordSpacing = false,
  isVisible = true,
}: SplitTextProps) {
  const [characters, setCharacters] = useState<{ char: string; isSpace: boolean }[]>([]);

  // Split the text into characters when text changes
  useEffect(() => {
    if (!text) return;

    const chars = text.split('').map(char => ({
      char,
      isSpace: char === ' ',
    }));

    setCharacters(chars);
  }, [text]);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: charDelay || 0.02,
      },
    },
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Create the component props
  const Component = component as React.ElementType;

  return (
    <Component className={className}>
      <motion.span
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={containerVariants}
        aria-label={text}
        style={{ display: 'inline-block' }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={`${index}-${char.char}`}
            variants={charVariants}
            className={cn(
              'inline-block',
              char.isSpace && wordSpacing ? 'mr-1.5' : '',
              charClassName
            )}
            style={{
              // Prevent width collapse with space characters
              ...(char.isSpace && { width: char.isSpace ? '0.25em' : 'auto' }),
            }}
            aria-hidden="true"
          >
            {char.char}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
