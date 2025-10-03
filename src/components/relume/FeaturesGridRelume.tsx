import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import relumeTokens from '@/design-system/tokens/relume-tokens';

interface Feature {
  icon?: ReactNode;
  title: string;
  description: string;
}

interface FeaturesGridRelumeProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function FeaturesGridRelume({
  features,
  columns = 3,
  className,
}: FeaturesGridRelumeProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={cn('grid gap-8', gridCols[columns], className)}
    >
      {features.map((feature, index) => (
        <div
          key={index}
          className="space-y-4"
        >
          {feature.icon && (
            <div className="text-blue-600 w-12 h-12">
              {feature.icon}
            </div>
          )}
          <h3
            className="text-xl font-semibold text-neutral-900"
            style={{ fontSize: relumeTokens.typography.fontSize.lg }}
          >
            {feature.title}
          </h3>
          <p
            className="text-neutral-600"
            style={{ fontSize: relumeTokens.typography.fontSize.base }}
          >
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
