import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import relumeTokens from '@/design-system/tokens/relume-tokens';

interface CardRelumeProps {
  title: string;
  description: string;
  icon?: ReactNode;
  image?: {
    src: string;
    alt: string;
  };
  link?: {
    href: string;
    text: string;
  };
  variant?: 'default' | 'outlined' | 'elevated';
  className?: string;
}

export function CardRelume({
  title,
  description,
  icon,
  image,
  link,
  variant = 'default',
  className,
}: CardRelumeProps) {
  const variants = {
    default: 'bg-white border border-neutral-200',
    outlined: 'bg-transparent border-2 border-neutral-300',
    elevated: 'bg-white shadow-lg hover:shadow-xl',
  };

  return (
    <div
      className={cn(
        'rounded-lg transition-all duration-200',
        variants[variant],
        link && 'hover:scale-[1.02] cursor-pointer',
        className
      )}
      style={{
        padding: relumeTokens.components.card.padding,
        borderRadius: relumeTokens.components.card.borderRadius,
      }}
    >
      {/* Image */}
      {image && (
        <div className="mb-6 -mt-6 -mx-6 rounded-t-lg overflow-hidden">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {/* Icon */}
      {icon && (
        <div className="mb-4 text-blue-600">
          {icon}
        </div>
      )}

      {/* Content */}
      <h3
        className="text-xl font-semibold text-neutral-900 mb-3"
        style={{ fontSize: relumeTokens.typography.fontSize.lg }}
      >
        {title}
      </h3>

      <p
        className="text-neutral-600 mb-4"
        style={{ fontSize: relumeTokens.typography.fontSize.base }}
      >
        {description}
      </p>

      {/* Link */}
      {link && (
        <a
          href={link.href}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          style={{ fontSize: relumeTokens.typography.fontSize.sm }}
        >
          {link.text}
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      )}
    </div>
  );
}
