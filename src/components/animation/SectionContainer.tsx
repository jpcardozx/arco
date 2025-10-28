/**
 * Section Container - Animation wrapper stub
 */
'use client'

import { ReactNode } from 'react'

interface SectionContainerProps {
  children: ReactNode
  className?: string
}

export function SectionContainer({ children, className = '' }: SectionContainerProps) {
  return <div className={className}>{children}</div>
}

export default SectionContainer
