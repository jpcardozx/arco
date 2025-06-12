'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from './button';
import { Section } from './section';
import { Heading } from '../components/ui/heading';
import { cn } from '@/lib/utils/ui-utils';
import { withTranslation } from '@/lib/utils/with-translation';

interface CallToActionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  backgroundImage?: string;
  backgroundOverlayColor?: string;
  backgroundPattern?: 'dots' | 'lines' | 'grid' | 'waves' | 'none';
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg';
  withAnimation?: boolean;
  theme?: 'light' | 'dark';
  withAccentElement?: boolean;
  accentPosition?: 'top-left' | 'bottom-right';
  className?: string;
  // Provided by withTranslation HOC
  t: (key: string) => string;
}

function CallToActionComponent({
  title,
  subtitle,
  description,
  primaryButtonText,
  primaryButtonHref = '#',
  secondaryButtonText,
  secondaryButtonHref = '#',
  backgroundImage,
  backgroundOverlayColor = 'rgba(0, 0, 0, 0.7)',
  backgroundPattern = 'none',
  align = 'center',
  size = 'md',
  withAnimation = true,
  theme = 'dark',
  withAccentElement = true,
  accentPosition = 'bottom-right',
  className,
  t,
}: CallToActionProps) {
  // Text alignment classes
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  // Size classes
  const sizeClasses = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-24',
  };

  // Use provided text or translation keys
  const displayTitle = title || t('title');
  const displaySubtitle = subtitle || t('subtitle');
  const displayDescription = description || t('description');
  const displayPrimaryButtonText = primaryButtonText || t('buttons.primary');
  const displaySecondaryButtonText = secondaryButtonText || t('buttons.secondary');

  // Pattern background styles
  const patternStyles = {
    dots: {
      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
    },
    lines: {
      backgroundImage:
        'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
    },
    grid: {
      backgroundImage:
        'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
    },
    waves: {
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      backgroundSize: '100px 20px',
    },
    none: {},
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Section
      className={cn(
        'relative isolate overflow-hidden',
        theme === 'dark' ? 'text-white' : 'text-neutral-900',
        sizeClasses[size],
        className
      )}
    >
      {/* Background elements */}
      {backgroundImage && (
        <div className="absolute inset-0 -z-10">
          <Image src={backgroundImage} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ backgroundColor: backgroundOverlayColor }} />
        </div>
      )}

      {/* Background pattern */}
      {backgroundPattern !== 'none' && (
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={patternStyles[backgroundPattern]}
        />
      )}

      {/* Content */}
      <div
        className={cn(
          'container relative z-10 mx-auto flex flex-col gap-8 px-4',
          alignClasses[align]
        )}
      >
        {withAnimation ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className={cn('flex flex-col gap-6', alignClasses[align])}
          >
            {subtitle && (
              <motion.div variants={itemVariants}>
                <span className="text-sm font-medium uppercase tracking-wider opacity-80 md:text-base">
                  {displaySubtitle}
                </span>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <Heading
                level={2}
                className={cn(
                  'max-w-3xl text-3xl md:text-4xl lg:text-5xl',
                  align === 'center' && 'mx-auto'
                )}
              >
                {displayTitle}
              </Heading>
            </motion.div>

            {description && (
              <motion.div variants={itemVariants}>
                <p
                  className={cn(
                    'max-w-2xl text-lg opacity-90 md:text-xl',
                    align === 'center' && 'mx-auto'
                  )}
                >
                  {displayDescription}
                </p>
              </motion.div>
            )}

            <motion.div
              variants={itemVariants}
              className={cn('mt-4 flex flex-wrap gap-4', align === 'center' && 'justify-center')}
            >
              {primaryButtonText && (
                <Button size="lg" variant={theme === 'dark' ? 'default' : 'outline'} asChild>
                  <Link href={primaryButtonHref}>
                    {displayPrimaryButtonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}

              {secondaryButtonText && (
                <Button size="lg" variant={theme === 'dark' ? 'outline' : 'ghost'} asChild>
                  <Link href={secondaryButtonHref}>{displaySecondaryButtonText}</Link>
                </Button>
              )}
            </motion.div>
          </motion.div>
        ) : (
          <div className={cn('flex flex-col gap-6', alignClasses[align])}>
            {/* Non-animated version of the same content structure */}
            {subtitle && (
              <span className="text-sm font-medium uppercase tracking-wider opacity-80 md:text-base">
                {displaySubtitle}
              </span>
            )}

            <Heading
              level={2}
              className={cn(
                'max-w-3xl text-3xl md:text-4xl lg:text-5xl',
                align === 'center' && 'mx-auto'
              )}
            >
              {displayTitle}
            </Heading>

            {description && (
              <p
                className={cn(
                  'max-w-2xl text-lg opacity-90 md:text-xl',
                  align === 'center' && 'mx-auto'
                )}
              >
                {displayDescription}
              </p>
            )}

            <div
              className={cn('mt-4 flex flex-wrap gap-4', align === 'center' && 'justify-center')}
            >
              {primaryButtonText && (
                <Button size="lg" variant={theme === 'dark' ? 'default' : 'outline'} asChild>
                  <Link href={primaryButtonHref}>
                    {displayPrimaryButtonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}

              {secondaryButtonText && (
                <Button size="lg" variant={theme === 'dark' ? 'outline' : 'ghost'} asChild>
                  <Link href={secondaryButtonHref}>{displaySecondaryButtonText}</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Accent elements */}
      {withAccentElement && (
        <div
          className={cn(
            'absolute h-48 w-48 rounded-full bg-blue-500/20 blur-3xl md:h-64 md:w-64',
            accentPosition === 'top-left' ? '-left-24 -top-24' : '-bottom-24 -right-24'
          )}
        />
      )}
    </Section>
  );
}

// Export with translation
export const CallToAction = withTranslation(CallToActionComponent, 'components.callToAction');
