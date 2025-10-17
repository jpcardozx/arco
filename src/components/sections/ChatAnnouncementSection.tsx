/**
 * Chat Announcement Section
 * Professional announcement for upcoming live chat feature
 * Discrete, elegant, before footer
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Calendar, Zap } from 'lucide-react';
import { cn } from '@/design-system/tokens';

export const ChatAnnouncementSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
          className="w-full h-full"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Card elegante */}
          <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 sm:p-10 lg:p-12 overflow-hidden">
            {/* Subtle accent glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />
            
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-400/20 mb-6"
              >
                <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-teal-400" strokeWidth={2} />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl font-bold text-white mb-4"
              >
                Live Chat
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg text-white/70 leading-relaxed mb-8"
              >
                Estamos desenvolvendo um sistema de chat direto para atendimento técnico em tempo real. 
                Suporte imediato para dúvidas sobre projetos e consultorias.
              </motion.p>

              {/* Release info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
              >
                {/* Release date */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl">
                  <Calendar className="w-4 h-4 text-teal-400" strokeWidth={2} />
                  <span className="text-sm font-semibold text-white">
                    Release: Novembro/2024
                  </span>
                </div>

                {/* Status badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-amber-500/10 border border-amber-400/20 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-sm font-medium text-amber-200">
                    Em desenvolvimento
                  </span>
                </div>
              </motion.div>

              {/* Feature preview */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    { icon: Zap, label: 'Resposta Imediata', desc: '< 5 minutos' },
                    { icon: MessageSquare, label: 'Suporte Técnico', desc: 'Atendimento humano' },
                    { icon: Calendar, label: 'Horário Comercial', desc: 'Seg-Sex 9h-18h' }
                  ].map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + (index * 0.1) }}
                        className="flex flex-col items-center text-center"
                      >
                        <Icon className="w-5 h-5 text-teal-400/80 mb-2" strokeWidth={2} />
                        <div className="text-xs sm:text-sm font-medium text-white/90 mb-1">
                          {feature.label}
                        </div>
                        <div className="text-xs text-white/50">
                          {feature.desc}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
