'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { RocketIcon } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';


import { Badge } from './badge';
import { Section } from './section';
import { SplitText } from './split-text';
import { cn } from '../../../lib/utils/ui-utils';


interface TextRevealDemoProps {
  heading?: string;
  subheading?: string;
  paragraphs?: string[];
  className?: string;
  withBadge?: boolean;
  badgeText?: string;
  revealSpeed?: 'slow' | 'medium' | 'fast';
  staggerChildren?: boolean;
  theme?: 'light' | 'dark' | 'gradient';
  direction?: 'ltr' | 'rtl';
}

export function TextRevealDemo({
  heading = 'Advanced Text Reveal Animation',
  subheading = 'Crafted with precision and attention to detail',
  paragraphs = [
    "This component showcases the sophisticated animation capabilities that ARCO's design system provides. The staggered reveal creates a smooth reading experience.",
    'By breaking text into individual spans, we can create engaging interactions that grab attention without being distracting.',
  ],
  className,
  withBadge = true,
  badgeText = '✨ Modern UX',
  revealSpeed = 'medium',
  staggerChildren = true,
  theme = 'light',
  direction = 'ltr',
}: TextRevealDemoProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  // Speed configurations
  const speedConfig = {
    slow: 0.04,
    medium: 0.02,
    fast: 0.01,
  };

  // Theme configurations
  const themeClasses = {
    light: 'text-neutral-900 bg-white',
    dark: 'text-white bg-neutral-900',
    gradient: 'text-white bg-gradient-to-br from-blue-600 to-indigo-800',
  };

  // Direction configuration
  const directionClass = direction === 'rtl' ? 'text-right' : 'text-left';

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <Section className={cn('py-16', themeClasses[theme], className)}>
      <motion.div
        ref={ref}
        className={cn('container mx-auto px-4', directionClass)}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerChildren ? 0.1 : 0,
            },
          },
        }}
      >
        {withBadge && (
          <motion.div
            className="mb-6"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut' },
              },
            }}
          >
            <Badge
              variant={theme === 'light' ? 'outline' : 'default'}
              size="md"
              icon={<RocketIcon size={12} />}
              withIcon
            >
              {badgeText}
            </Badge>
          </motion.div>
        )}

        <div className="mb-8">
          <SplitText
            text={heading}
            component="h2"
            className="text-4xl font-bold md:text-5xl lg:text-6xl"
            charDelay={speedConfig[revealSpeed]}
            isVisible={isInView}
          />
        </div>

        <div className="mb-12">
          <SplitText
            text={subheading}
            component="h3"
            className="text-xl opacity-75 md:text-2xl"
            charDelay={speedConfig[revealSpeed] * 2}
            isVisible={isInView}
          />
        </div>

        <div className="max-w-3xl space-y-6">
          {paragraphs.map((paragraph, i) => (
            <SplitText
              key={i}
              text={paragraph}
              component="p"
              className="text-lg leading-relaxed"
              charDelay={speedConfig[revealSpeed] * 3}
              wordSpacing
              isVisible={isInView}
            />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
