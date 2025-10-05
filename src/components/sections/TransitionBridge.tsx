'use client';

/**
 * TRANSITION BRIDGE - STORYTELLING CONNECTOR
 *
 * Conecta seções criando narrativa fluida
 * Transições suaves com movimento sutil
 * Variant minimal: sóbrio e profissional
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/design-system/tokens';

interface TransitionBridgeProps {
  question?: string;
  statement?: string;
  context?: string;
  variant?: 'question' | 'statement' | 'minimal';
  showArrow?: boolean;
  className?: string;
}

export const TransitionBridge: React.FC<TransitionBridgeProps> = ({
  question,
  statement,
  context,
  variant = 'question',
  showArrow = false,
  className
}) => {
  const content = question || statement;

  if (!content) return null;

  return (
    <section
      className={cn(
        "py-8 sm:py-12 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden",
        className
      )}
    >
      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Question variant */}
          {variant === 'question' && content && (
            <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-3">
              {content}
            </h3>
          )}

          {/* Statement variant */}
          {variant === 'statement' && content && (
            <p className="text-xl lg:text-2xl font-medium text-slate-300 mb-3">
              {content}
            </p>
          )}

          {/* Minimal variant - sóbrio e profissional */}
          {variant === 'minimal' && content && (
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-slate-700 to-slate-600" />
              <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">
                {content}
              </p>
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-slate-700 to-slate-600" />
            </div>
          )}

          {/* Context */}
          {context && variant !== 'minimal' && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-base text-slate-500 mt-2"
            >
              {context}
            </motion.p>
          )}

          {/* Arrow indicator */}
          {showArrow && variant !== 'minimal' && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              animate={{ y: [0, 8, 0] }}
              className="mt-6 inline-flex items-center justify-center"
            >
              <ChevronDown className="w-6 h-6 text-slate-600" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TransitionBridge;
