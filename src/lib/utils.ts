import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function para combinar class names de forma inteligente
 * 
 * Combina clsx() com tailwind-merge() para:
 * - Concatenação condicional de classes
 * - Merge inteligente de classes conflitantes do Tailwind
 * - Performance otimizada
 * 
 * @param inputs - Array de valores de classe (strings, objetos, arrays)
 * @returns String com classes combinadas e otimizadas
 * 
 * @example
 * ```tsx
 * cn('px-2 py-1', isActive && 'bg-blue-500', className)
 * cn('bg-red-500', 'bg-blue-500') // resultado: 'bg-blue-500'
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default cn
