'use client'

import { Badge } from '@/components/ui/badge'
import { Crown, Zap, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TierBadgeProps {
  tier: 'free' | 'paid' | 'admin'
  className?: string
  showLabel?: boolean
}

const tierConfig = {
  free: {
    label: 'Free',
    icon: Zap,
    variant: 'secondary' as const,
    className: 'bg-gray-100 text-gray-700 border-gray-300',
  },
  paid: {
    label: 'Pro',
    icon: Crown,
    variant: 'default' as const,
    className: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0',
  },
  admin: {
    label: 'Admin',
    icon: Shield,
    variant: 'destructive' as const,
    className: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0',
  },
}

export function TierBadge({ tier, className, showLabel = true }: TierBadgeProps) {
  const config = tierConfig[tier]
  const Icon = config.icon

  return (
    <Badge
      variant={config.variant}
      className={cn(
        'gap-1.5 px-3 py-1.5 font-semibold',
        config.className,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {showLabel && <span>{config.label}</span>}
    </Badge>
  )
}
