import { cn } from '@/lib/utils';
import relumeTokens from '@/design-system/tokens/relume-tokens';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialRelumeProps {
  testimonial: Testimonial;
  variant?: 'card' | 'minimal';
  className?: string;
}

export function TestimonialRelume({
  testimonial,
  variant = 'card',
  className,
}: TestimonialRelumeProps) {
  if (variant === 'minimal') {
    return (
      <div className={cn('space-y-4', className)}>
        <blockquote
          className="text-lg italic text-neutral-700"
          style={{ fontSize: relumeTokens.typography.fontSize.lg }}
        >
          "{testimonial.quote}"
        </blockquote>
        <div className="flex items-center gap-3">
          {testimonial.avatar && (
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-semibold text-neutral-900">{testimonial.author}</p>
            <p className="text-sm text-neutral-600">
              {testimonial.role}
              {testimonial.company && ` • ${testimonial.company}`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-white rounded-lg p-6 shadow-md border border-neutral-200 space-y-6',
        className
      )}
      style={{
        padding: relumeTokens.components.card.padding,
        borderRadius: relumeTokens.components.card.borderRadius,
      }}
    >
      {/* Rating */}
      {testimonial.rating && (
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={cn(
                'w-5 h-5',
                i < testimonial.rating! ? 'text-yellow-400 fill-current' : 'text-neutral-300'
              )}
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote
        className="text-lg text-neutral-700"
        style={{ fontSize: relumeTokens.typography.fontSize.lg }}
      >
        "{testimonial.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-semibold text-neutral-900">{testimonial.author}</p>
          <p className="text-sm text-neutral-600">
            {testimonial.role}
            {testimonial.company && ` • ${testimonial.company}`}
          </p>
        </div>
      </div>
    </div>
  );
}
