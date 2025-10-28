/**
 * Transition Bridge - Stub minimalista
 */
'use client'

import { ReactNode } from 'react'

interface TransitionBridgeProps {
  children?: ReactNode
  statement?: string
  variant?: string
}

export function TransitionBridge({ children, statement }: TransitionBridgeProps) {
  return (
    <div className="py-12">
      {statement && <p className="text-center text-muted-foreground">{statement}</p>}
      {children}
    </div>
  )
}

export default TransitionBridge
