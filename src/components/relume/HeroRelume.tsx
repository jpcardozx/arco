import { cn } from '@/lib/utils';
import relumeTokens from '@/design-system/tokens/relume-tokens';

interface HeroRelumeProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  image?: {
    src: string;
    alt: string;
  };
  variant?: 'default' | 'dark' | 'gradient';
  className?: string;
}

export function HeroRelume({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  image,
  variant = 'dark',
  className,
}: HeroRelumeProps) {
  const backgrounds = {
    default: 'bg-white',
    dark: 'bg-neutral-900',
    gradient: 'bg-gradient-to-br from-neutral-900 to-neutral-800',
  };

  const textColors = {
    default: 'text-neutral-900',
    dark: 'text-white',
    gradient: 'text-white',
  };

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        backgrounds[variant],
        className
      )}
      style={{
        paddingTop: relumeTokens.components.hero.padding.y,
        paddingBottom: relumeTokens.components.hero.padding.y,
      }}
    >
      {/* Background Pattern (opcional) */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            {subtitle && (
              <p
                className="text-sm font-medium uppercase tracking-wider text-blue-400"
                style={{ fontSize: relumeTokens.typography.fontSize.sm }}
              >
                {subtitle}
              </p>
            )}

            <h1
              className={cn(
                'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight',
                textColors[variant]
              )}
            >
              {title}
            </h1>

            <p
              className={cn(
                'text-lg md:text-xl',
                variant === 'default' ? 'text-neutral-600' : 'text-neutral-300'
              )}
              style={{ fontSize: relumeTokens.typography.fontSize.lg }}
            >
              {description}
            </p>

            {/* CTAs */}
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-wrap gap-4 pt-4">
                {primaryCta && (
                  <a
                    href={primaryCta.href}
                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {primaryCta.text}
                  </a>
                )}

                {secondaryCta && (
                  <a
                    href={secondaryCta.href}
                    className={cn(
                      'inline-flex items-center justify-center px-8 py-4 font-medium rounded-lg transition-all duration-200',
                      variant === 'default'
                        ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
                        : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
                    )}
                  >
                    {secondaryCta.text}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Image */}
          {image && (
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
