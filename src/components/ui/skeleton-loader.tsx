/**
 * Skeleton Loaders
 * 
 * Componentes de loading inteligentes que melhoram percepção de performance
 * Baseado em design system e acessibilidade
 */

import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'default' | 'pulse' | 'wave';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

/**
 * Skeleton básico com animações
 */
export function Skeleton({
  className,
  variant = 'pulse',
  rounded = 'md',
  ...props
}: SkeletonProps) {
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const variantClasses = {
    default: 'bg-gray-200',
    pulse: 'bg-gray-200 animate-pulse',
    wave: 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-wave',
  };

  return (
    <div
      className={cn(
        'w-full',
        roundedClasses[rounded],
        variantClasses[variant],
        className
      )}
      role="status"
      aria-label="Loading..."
      {...props}
    />
  );
}

/**
 * Card de plano skeleton
 */
export function PlanCardSkeleton() {
  return (
    <div className="border rounded-lg p-6 space-y-4 bg-white">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-24" />
      </div>

      {/* Features list */}
      <div className="space-y-2 pt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-3/6" />
      </div>

      {/* Button */}
      <Skeleton className="h-10 w-full rounded-full" />
    </div>
  );
}

/**
 * Skeleton para WalletBrick durante carregamento
 */
export function WalletBrickSkeleton() {
  return (
    <div className="border rounded-lg p-6 space-y-4 bg-white">
      {/* Título */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-6 w-48" />
      </div>

      {/* Card fields */}
      <div className="space-y-3">
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-12 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Payment button */}
      <Skeleton className="h-12 w-full rounded-lg" />

      {/* Trust badges */}
      <div className="flex gap-4 justify-center pt-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
}

/**
 * Skeleton para subscription status
 */
export function SubscriptionStatusSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>

      <div className="border rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-6 w-28" />
          </div>
        </div>

        <div className="pt-4 border-t">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-5 w-40" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton para tabela de resultados
 */
export function TestResultsTableSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b p-4">
        <div className="grid grid-cols-4 gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border-b last:border-0 p-4">
          <div className="grid grid-cols-4 gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton para página inteira de checkout
 */
export function CheckoutPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      {/* Plans grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <PlanCardSkeleton />
        <PlanCardSkeleton />
        <PlanCardSkeleton />
      </div>

      {/* Wallet brick */}
      <div className="max-w-xl mx-auto">
        <WalletBrickSkeleton />
      </div>
    </div>
  );
}

// Adicionar animação wave ao tailwind.config.mjs se ainda não tiver
export const tailwindWaveAnimation = {
  wave: {
    '0%': { backgroundPosition: '200% 0' },
    '100%': { backgroundPosition: '-200% 0' },
  },
};
