'use client'

import React from 'react'
import type { Tables } from '@/types/supabase'
import { SalaoBeautyAssets } from '@/components/landing/SalaoBeautyAssets'
import SectionContainer from '@/components/animation/SectionContainer'
import SectionDivider from '@/components/animation/SectionDivider'

type Campaign = Tables<'campaigns'>

interface BeautyServicesShowcaseProps {
  campaign: Campaign
}

/**
 * BeautyServicesShowcase
 * 
 * Seção especializada para salões de beleza
 * Exibe serviços, team, produtos e ambiente
 * 
 * Renderiza automaticamente com os assets Tier S
 */
export function BeautyServicesShowcase({
  campaign,
}: BeautyServicesShowcaseProps) {
  const assets = SalaoBeautyAssets({ campaign })

  return (
    <>
      {/* Services Grid */}
      <SectionContainer>
        <assets.components.ServicesShowcase />
      </SectionContainer>

      <SectionDivider variant="wave" />

      {/* Before/After */}
      <SectionContainer>
        <assets.components.BeforeAfterShowcase />
      </SectionContainer>

      <SectionDivider variant="fade" />

      {/* Team */}
      <SectionContainer>
        <assets.components.TeamShowcase />
      </SectionContainer>

      <SectionDivider variant="wave" />

      {/* Products */}
      <SectionContainer>
        <assets.components.ProductsShowcase />
      </SectionContainer>

      <SectionDivider variant="wave" />

      {/* Wellness */}
      <SectionContainer>
        <assets.components.WellnessSection />
      </SectionContainer>
    </>
  )
}
