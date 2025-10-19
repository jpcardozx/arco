'use client';

import { useMemo } from 'react';
import type { Tables } from '@/types/supabase';
import { generateColorPalette } from '@/lib/landing/colors';

type Campaign = Tables<'campaigns'>;

/**
 * Hook to access campaign color palette
 * Generates sophisticated color variations from campaign colors
 */
export function useCampaignColors(campaign: Campaign) {
  const palette = useMemo(() => {
    // Use cta_button_color as primary, generate secondary from it
    return generateColorPalette(
      campaign.cta_button_color,
      null // Secondary will be auto-generated
    );
  }, [campaign.cta_button_color]);

  return palette;
}

/**
 * Hook to get inline gradient styles
 * Use when Tailwind arbitrary values don't work (dynamic colors)
 */
export function useGradientStyle(campaign: Campaign, variant: 'primary' | 'secondary' = 'primary') {
  const palette = useCampaignColors(campaign);
  const colors = variant === 'primary' ? palette.primary : palette.secondary;
  
  return useMemo(() => ({
    backgroundImage: `linear-gradient(to right, ${colors.from}, ${colors.via}, ${colors.to})`,
  }), [colors]);
}
