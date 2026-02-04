export const dynamic = 'force-dynamic';

import type { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing/LandingPageTemplate'
import { salaoBeleza2024Campaign } from './campaign-data'

/**
 * LP: Salão de Beleza 2024
 *
 * Landing page para venda de "Sistema de Captura Automatizada de Clientes"
 * Contexto específico: Salões de beleza (manicure, cabelo, depilação, etc)
 *
 * Características:
 * - Hero com pain points do salon owner
 * - Real cases com salões (Carol, Marina, Lapa)
 * - Pricing estruturado para salon business
 * - Copy focado em ganho de clientes + redução de falta
 * - ROI calculator integrado
 */

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: salaoBeleza2024Campaign.meta_title,
    description: salaoBeleza2024Campaign.meta_description,
    openGraph: {
      title: salaoBeleza2024Campaign.meta_title,
      description: salaoBeleza2024Campaign.meta_description,
      type: 'website',
    },
  }
}

export default function SalaoBeleza2024Page() {
  return <LandingPageTemplate campaign={salaoBeleza2024Campaign} />
}
