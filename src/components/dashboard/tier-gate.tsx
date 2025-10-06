'use client'

import { Lock, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { ReactNode } from 'react'

interface TierGateProps {
  children?: ReactNode
  requiredTier: 'pro' | 'enterprise'
  userTier: 'free' | 'pro' | 'enterprise'
  feature: string
  description?: string
}

export function TierGate({
  children,
  requiredTier,
  userTier,
  feature,
  description
}: TierGateProps) {
  // Se o usuário tem acesso, mostrar conteúdo
  const tierOrder = { free: 0, pro: 1, enterprise: 2 }
  const hasAccess = tierOrder[userTier] >= tierOrder[requiredTier]

  if (hasAccess) {
    return <>{children}</>
  }

  // Se não tem acesso, mostrar upgrade prompt
  const tierName = requiredTier === 'pro' ? 'Pro' : 'Enterprise'
  const tierPrice = requiredTier === 'pro' ? 'R$ 97/mês' : 'Sob consulta'

  return (
    <Card className="border-2 border-dashed">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          {requiredTier === 'pro' ? (
            <Sparkles className="h-8 w-8 text-primary" />
          ) : (
            <Lock className="h-8 w-8 text-primary" />
          )}
        </div>
        
        <CardTitle className="text-xl">
          {feature}
        </CardTitle>
        
        <CardDescription className="text-base">
          {description || `Este recurso está disponível apenas no plano ${tierName}`}
        </CardDescription>
      </CardHeader>

      <CardContent className="text-center text-sm text-muted-foreground">
        <div className="inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2 mb-4">
          <span className="font-semibold text-foreground">{tierName}</span>
          <span>•</span>
          <span>{tierPrice}</span>
        </div>

        {requiredTier === 'pro' && (
          <ul className="text-left space-y-2 max-w-sm mx-auto">
            <li className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Análises ilimitadas</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Monitoramento 24/7</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Histórico ilimitado</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Alertas personalizados</span>
            </li>
          </ul>
        )}
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button asChild size="lg" className="w-full">
          <Link href="/pricing">
            Fazer Upgrade para {tierName}
          </Link>
        </Button>
        
        <Button asChild variant="ghost" size="sm" className="w-full">
          <Link href="/pricing">
            Ver todos os planos
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
