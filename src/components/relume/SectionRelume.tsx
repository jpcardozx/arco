import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import relumeTokens from '@/design-system/tokens/relume-tokens';

interface SectionRelumeProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  background?: 'white' | 'neutral' | 'dark';
  centered?: boolean;
  className?: string;
}

export function SectionRelume({
  children,
  title,
  subtitle,
  description,
  background = 'white',
  centered = false,
  className,
}: SectionRelumeProps) {
  const backgrounds = {
    white: 'bg-white',
    neutral: 'bg-neutral-50',
    dark: 'bg-neutral-900',
  };

  const textColors = {
    white: 'text-neutral-900',
    neutral: 'text-neutral-900',
    dark: 'text-white',
  };

  return (
    <section
      className={cn('relative', backgrounds[background], className)}
      style={{
        paddingTop: relumeTokens.components.section.padding.y,
        paddingBottom: relumeTokens.components.section.padding.y,
      }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || subtitle || description) && (
          <div
            className={cn(
              'mb-12 md:mb-16',
              centered && 'text-center mx-auto max-w-3xl'
            )}
          >
            {subtitle && (
              <p
                className="text-sm font-medium uppercase tracking-wider text-blue-600 mb-4"
                style={{ fontSize: relumeTokens.typography.fontSize.sm }}
              >
                {subtitle}
              </p>
            )}

            {title && (
              <h2
                className={cn(
                  'text-3xl md:text-4xl lg:text-5xl font-bold mb-6',
                  textColors[background]
                )}
              >
                {title}
              </h2>
            )}

            {description && (
              <p
                className={cn(
                  'text-lg',
                  background === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
                )}
                style={{ fontSize: relumeTokens.typography.fontSize.lg }}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        {children}
      </div>
    </section>
  );
}
