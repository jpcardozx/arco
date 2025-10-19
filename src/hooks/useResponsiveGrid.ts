/**
 * Hook: useResponsiveGrid
 * Gerencia grid responsivo baseado em breakpoints
 */

import { useEffect, useState } from 'react'

export type GridBreakpoint = 'mobile' | 'tablet' | 'desktop' | 'desktopXl'

interface GridConfig {
  mobile?: number
  tablet?: number
  desktop?: number
  desktopXl?: number
}

export function useResponsiveGrid(config: GridConfig) {
  const [breakpoint, setBreakpoint] = useState<GridBreakpoint>('desktop')
  const [columns, setColumns] = useState<number>(config.desktop || 3)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width < 640) {
        setBreakpoint('mobile')
        setColumns(config.mobile || 1)
      } else if (width < 1024) {
        setBreakpoint('tablet')
        setColumns(config.tablet || 2)
      } else if (width < 1536) {
        setBreakpoint('desktop')
        setColumns(config.desktop || 3)
      } else {
        setBreakpoint('desktopXl')
        setColumns(config.desktopXl || 4)
      }
    }

    // Call on mount
    handleResize()

    // Add listener
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [config])

  return {
    breakpoint,
    columns,
    gridColsClass: `grid-cols-${columns}`,
  }
}
