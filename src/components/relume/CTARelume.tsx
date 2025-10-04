import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CTARelumeProps {
  title: string;
  description?: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  variant?: 'default' | 'gradient' | 'bordered';
  align?: 'left' | 'center';
  children?: ReactNode;
  className?: string;
}

export function CTARelume({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = 'gradient',
  align = 'center',
  children,
  className,
}: CTARelumeProps) {
  const variants = {
    default: 'bg-white border-2 border-neutral-200',
    gradient: 'bg-gradient-to-br from-neutral-900 to-neutral-800 text-white',
    bordered: 'bg-neutral-50 border-2 border-blue-200',
  };

  const textColor = variant === 'gradient' ? 'text-white' : 'text-neutral-900';
  const descColor = variant === 'gradient' ? 'text-neutral-300' : 'text-neutral-600';

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-2xl py-16 px-8',
        variants[variant],
        className
      )}
    >
      <div
        className={cn(
          'max-w-4xl mx-auto space-y-8',
          align === 'center' && 'text-center'
        )}
      >
        <div className="space-y-4">
          <h2 className={cn('text-3xl md:text-4xl lg:text-5xl font-bold', textColor)}>
            {title}
          </h2>
          {description && (
            <p className={cn('text-lg md:text-xl max-w-2xl', descColor, align === 'center' && 'mx-auto')}>
              {description}
            </p>
          )}
        </div>

        {children}

        <div
          className={cn(
            'flex flex-wrap gap-4',
            align === 'center' && 'justify-center'
          )}
        >
          <a
            href={primaryCta.href}
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {primaryCta.text}
          </a>

          {secondaryCta && (
            <a
              href={secondaryCta.href}
              className={cn(
                'inline-flex items-center justify-center px-8 py-4 font-medium rounded-lg transition-all duration-200',
                variant === 'gradient'
                  ? 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
              )}
            >
              {secondaryCta.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
