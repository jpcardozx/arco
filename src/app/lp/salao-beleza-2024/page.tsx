import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'
import { LandingPageTemplate } from '@/components/landing/LandingPageTemplate'

interface PageProps {
  params: Promise<{ slug: string }>
}

/**
 * LP: Salão de Beleza 2024
 *
 * Exemplo de landing page para "Sistema de Captura Automatizada de Clientes"
 * Com foco em salões de beleza.
 *
 * Reutiliza LandingPageTemplate com campaign data do Supabase
 */

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Sistema Completo de Captura de Clientes para Salões | ARCO',
    description: 'Landing page otimizada para captura de leads em salões. Anúncios segmentados, agendamento automatizado e ROI comprovado.',
  }
}

export default async function SalaoBeleza2024Page() {
  // Para esta página de exemplo, usamos dados hardcoded
  // Em produção, você buscaria de /lp/[slug] dinâmicamente

  const mockCampaign = {
    id: 'salao-2024',
    name: 'Salão de Beleza - Sistema 2024',
    slug: 'salao-beleza-2024',
    hero_title: 'Sistema Completo de Captura de Clientes para Seu Salão',
    hero_subtitle: 'Anúncios segmentados + Página de agendamento otimizada + WhatsApp automático = Mais clientes, com previsibilidade.',
    hero_badge: 'Método testado em 23 salões',
    description: 'Solução end-to-end para captura de leads em salões de beleza',
    is_active: true,
    primary_color: '#F59E0B', // Amber
    secondary_color: '#92400E', // Dark amber
    meta_title: 'Sistema Completo de Captura para Salões',
    meta_description: 'Mais clientes com anúncios segmentados e página otimizada',
    og_image_url: null,
  } as any

  return <LandingPageTemplate campaign={mockCampaign} />
}
