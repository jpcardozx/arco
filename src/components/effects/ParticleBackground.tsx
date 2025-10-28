/**
 * Particle Background - Lightweight Stub
 */
'use client'

import { ReactNode } from 'react'

interface ParticleBackgroundProps {
  children?: ReactNode
  variant?: string
  className?: string
  density?: number
}

export function ParticleBackground({ children, className = '' }: ParticleBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  )
}

export default ParticleBackground
