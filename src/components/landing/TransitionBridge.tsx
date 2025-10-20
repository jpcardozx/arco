'use client'

import React from 'react'
import type { Tables } from '@/types/supabase'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useCampaignColors } from '@/hooks/useCampaignColors'

type Campaign = Tables<'campaigns'>;

interface TransitionBridgeProps {
  campaign?: Campaign;
  text: string;
  icon?: LucideIcon;
  variant?: 'minimal' | 'icon' | 'full';
}

/**
 * Transition Bridge
 *
 * Conecta seções com mensagem clara
 * Posição: Entre seções principais
 *
 * Objetivo: Manter fluxo narrativo
 */

export function TransitionBridge({
  campaign,
  text,
  icon: Icon,
  variant = 'minimal',
}: TransitionBridgeProps) {
  const colors = campaign ? useCampaignColors(campaign) : { primary: { solid: '#F59E0B' } };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className="py-12 md:py-16 px-4 text-center"
    >
      {variant === 'minimal' && (
        <p className="text-slate-400 text-sm md:text-base">
          {text}
        </p>
      )}

      {variant === 'icon' && (
        <div className="flex flex-col items-center gap-3">
          {Icon && (
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon
                className="w-6 h-6"
                style={{ color: colors.primary.solid }}
              />
            </motion.div>
          )}
          <p className="text-slate-400 text-sm md:text-base font-medium">
            {text}
          </p>
        </div>
      )}

      {variant === 'full' && (
        <div className="flex flex-col items-center gap-4 max-w-xl mx-auto">
          {Icon && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: `${colors.primary.solid}15`,
                border: `2px solid ${colors.primary.solid}40`,
              }}
            >
              <Icon className="w-6 h-6" style={{ color: colors.primary.solid }} />
            </motion.div>
          )}
          <p className="text-slate-300 text-base md:text-lg font-semibold">
            {text}
          </p>
        </div>
      )}
    </motion.div>
  );
}
