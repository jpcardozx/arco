import { cn } from '@/lib/utils';
import relumeTokens from '@/design-system/tokens/relume-tokens';

interface Stat {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
}

interface StatsRelumeProps {
  stats: Stat[];
  variant?: 'default' | 'dark';
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatsRelume({
  stats,
  variant = 'default',
  columns = 4,
  className,
}: StatsRelumeProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  const textColor = variant === 'dark' ? 'text-white' : 'text-neutral-900';
  const labelColor = variant === 'dark' ? 'text-neutral-300' : 'text-neutral-600';

  return (
    <div className={cn('grid gap-8', gridCols[columns], className)}>
      {stats.map((stat, index) => (
        <div key={index} className="text-center space-y-2">
          <div className={cn('text-4xl md:text-5xl font-bold', textColor)}>
            {stat.prefix}
            {stat.value}
            {stat.suffix}
          </div>
          <p
            className={labelColor}
            style={{ fontSize: relumeTokens.typography.fontSize.base }}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
