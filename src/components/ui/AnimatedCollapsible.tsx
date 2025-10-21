'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface AnimatedCollapsibleProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
  titleClassName?: string
  contentClassName?: string
  iconPosition?: 'left' | 'right'
  onToggle?: (isOpen: boolean) => void
}

/**
 * Componente collapsible com animações suaves e acessibilidade
 * Usado para conteúdo expansível com tracking de comportamento
 */
export function AnimatedCollapsible({
  title,
  children,
  defaultOpen = false,
  className = '',
  titleClassName = '',
  contentClassName = '',
  iconPosition = 'right',
  onToggle,
}: AnimatedCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    if (isOpen) {
      const contentHeight = contentRef.current.scrollHeight
      setHeight(contentHeight)

      // Remove height depois da animação para permitir resize
      const timer = setTimeout(() => {
        setHeight(undefined)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setHeight(contentRef.current.scrollHeight)

      // Force reflow
      setTimeout(() => {
        setHeight(0)
      }, 10)
    }
  }, [isOpen])

  const handleToggle = () => {
    const newState = !isOpen
    setIsOpen(newState)
    onToggle?.(newState)
  }

  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      <button
        onClick={handleToggle}
        className={`w-full px-6 py-4 flex items-center justify-between gap-4 text-left transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-arco-accent focus:ring-inset ${titleClassName}`}
        aria-expanded={isOpen}
        aria-controls="collapsible-content"
      >
        {iconPosition === 'left' && (
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        )}

        <span className="flex-1 font-semibold text-gray-900">{title}</span>

        {iconPosition === 'right' && (
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>

      <div
        id="collapsible-content"
        ref={contentRef}
        style={{ height }}
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <div className={`px-6 py-4 ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * Grupo de collapsibles onde apenas um pode estar aberto por vez (accordion)
 */
interface AnimatedAccordionProps {
  items: Array<{
    title: string
    content: React.ReactNode
  }>
  defaultOpenIndex?: number
  className?: string
  itemClassName?: string
}

export function AnimatedAccordion({
  items,
  defaultOpenIndex,
  className = '',
  itemClassName = '',
}: AnimatedAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex !== undefined ? defaultOpenIndex : null
  )

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <AnimatedCollapsible
          key={index}
          title={item.title}
          defaultOpen={index === openIndex}
          className={itemClassName}
          onToggle={(isOpen) => {
            setOpenIndex(isOpen ? index : null)
          }}
        >
          {item.content}
        </AnimatedCollapsible>
      ))}
    </div>
  )
}
