/**
 * Section Divider Component
 * Organiza visualmente diferentes grupos de seções
 */
'use client';

import { Container } from '@/components/primitives/Container/Container';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface SectionDividerProps {
  title: string;
  description?: string;
  variant?: 'home' | 'wireframe' | 'other';
  icon?: string;
}

export function SectionDivider({ 
  title, 
  description, 
  variant = 'wireframe',
  icon = '🎨' 
}: SectionDividerProps) {
  const variants = {
    home: {
      badge: 'border-arco-200 bg-arco-50 text-arco-700',
      gradient: 'from-blue-500/10 to-purple-500/10',
      accentBg: 'bg-blue-600',
    },
    wireframe: {
      badge: 'border-orange-200 bg-orange-50 text-orange-700',
      gradient: 'from-orange-500/10 to-amber-500/10',
      accentBg: 'bg-orange-600',
    },
    other: {
      badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
      gradient: 'from-emerald-500/10 to-teal-500/10',
      accentBg: 'bg-emerald-600',
    },
  };

  const currentVariant = variants[variant];

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      {/* Background Pattern */}
      <div className={`absolute inset-0 bg-gradient-to-r ${currentVariant.gradient} opacity-50`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,0,0,0.02),transparent_70%)]" />
      
      <Container size="xl" className="relative z-10 max-w-6xl">
        <div className="text-center">
          
          {/* Decorative Line */}
          <div className="mb-6 flex items-center justify-center">
            <div className="h-px max-w-xs flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <div className={`mx-4 h-3 w-3 rounded-full ${currentVariant.accentBg}`} />
            <div className="h-px max-w-xs flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>

          {/* Badge */}
          <Badge className={`${currentVariant.badge} mb-4 px-4 py-2 text-sm font-medium`}>
            {icon} {title}
          </Badge>

          {/* Description */}
          {description && (
            <p className="font-barlow mx-auto max-w-2xl text-center text-neutral-600">
              {description}
            </p>
          )}

          {/* Bottom Separator */}
          <div className="mt-8 flex items-center justify-center">
            <Separator className="max-w-24 bg-neutral-300" />
          </div>
        </div>
      </Container>
    </section>
  );
}