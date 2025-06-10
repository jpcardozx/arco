/**
 * Função de utilitário para mesclar classNames com o Tailwind
 * Baseada na biblioteca tailwind-merge para evitar conflitos de classes
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
