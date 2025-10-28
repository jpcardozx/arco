/**
 * Simple Section Parallax - Lightweight version
 */
'use client'

import { ReactNode } from 'react'

export interface SectionParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
  id?: string
  backgroundColor?: string
  showParticles?: boolean
  delay?: number
}

export function SectionParallax({ children, className = '', id }: SectionParallaxProps) {
  return (
    <section className={className} id={id}>
      {children}
    </section>
  )
}
