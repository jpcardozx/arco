'use client'

import { useEffect, useState, RefObject } from 'react'

interface ScrollProgressOptions {
  offset?: number
  smooth?: boolean
}

/**
 * Hook para tracking de progresso de scroll com parallax effects
 *
 * @param ref - Ref do elemento a ser observado
 * @param options - Configurações do parallax
 * @returns progress - Valor entre 0 e 1 representando o progresso do scroll
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement>,
  options: ScrollProgressOptions = {}
): number {
  const { offset = 0, smooth = true } = options
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!ref.current) return

    const handleScroll = () => {
      if (!ref.current) return

      const element = ref.current
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + window.scrollY
      const elementHeight = rect.height
      const windowHeight = window.innerHeight

      const scrollPosition = window.scrollY + windowHeight - offset
      const elementScrollStart = elementTop
      const elementScrollEnd = elementTop + elementHeight

      // Calcula progresso entre 0 e 1
      let calculatedProgress = 0

      if (scrollPosition > elementScrollStart && scrollPosition < elementScrollEnd + windowHeight) {
        const visibleDistance = scrollPosition - elementScrollStart
        const totalDistance = elementHeight + windowHeight
        calculatedProgress = Math.min(Math.max(visibleDistance / totalDistance, 0), 1)
      } else if (scrollPosition >= elementScrollEnd + windowHeight) {
        calculatedProgress = 1
      }

      setProgress(smooth ? calculatedProgress : Math.round(calculatedProgress))
    }

    handleScroll() // Initial calculation
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [ref, offset, smooth])

  return progress
}

/**
 * Hook simplificado para verificar se elemento está visível no viewport
 */
export function useInView(
  ref: RefObject<HTMLElement>,
  threshold = 0.1
): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, threshold])

  return inView
}

/**
 * Hook para parallax baseado em scroll velocity
 */
export function useScrollVelocity(): number {
  const [velocity, setVelocity] = useState(0)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let lastTimestamp = Date.now()

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTimestamp = Date.now()

      const distance = currentScrollY - lastScrollY
      const time = currentTimestamp - lastTimestamp

      const calculatedVelocity = Math.abs(distance / time)

      setVelocity(calculatedVelocity)

      lastScrollY = currentScrollY
      lastTimestamp = currentTimestamp
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return velocity
}
