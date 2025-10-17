/**
 * WhatsApp Button Component
 * Elegant floating button for WhatsApp contact
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/design-system/tokens';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
  variant?: 'floating' | 'inline' | 'discrete';
  size?: 'sm' | 'md' | 'lg';
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = 'Olá! Gostaria de mais informações.',
  className,
  variant = 'floating',
  size = 'md'
}) => {
  const formatPhoneNumber = (phone: string): string => {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    // Ensure it starts with 55 (Brazil code) if not already
    return cleaned.startsWith('55') ? cleaned : `55${cleaned}`;
  };

  const whatsappUrl = `https://wa.me/${formatPhoneNumber(phoneNumber)}?text=${encodeURIComponent(message)}`;

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-14 h-14 sm:w-16 sm:h-16'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-6 h-6 sm:w-7 sm:h-7'
  };

  // Floating variant - Fixed position
  if (variant === 'floating') {
    return (
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "fixed bottom-6 left-6 sm:bottom-8 sm:left-8 rounded-full flex items-center justify-center z-40 group overflow-hidden touch-manipulation",
          "bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg transition-all duration-300",
          sizeClasses[size],
          className
        )}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contato via WhatsApp"
        style={{
          boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)'
        }}
      >
        {/* Animated ring pulse */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#25D366]"
          animate={{
            scale: [1, 1.4, 1.4],
            opacity: [0.6, 0, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        
        {/* Icon */}
        <MessageCircle className={cn(iconSizes[size], "relative z-10")} strokeWidth={2} />
        
        {/* Tooltip on hover */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none"
        >
          Fale conosco no WhatsApp
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
        </motion.div>
      </motion.a>
    );
  }

  // Inline variant - Regular button
  if (variant === 'inline') {
    return (
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300",
          "bg-[#25D366] hover:bg-[#20BA5A] shadow-lg hover:shadow-xl",
          className
        )}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        style={{
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.3)'
        }}
      >
        <MessageCircle className="w-5 h-5" strokeWidth={2} />
        <span>Falar no WhatsApp</span>
      </motion.a>
    );
  }

  // Discrete variant - Minimal, elegant
  if (variant === 'discrete') {
    return (
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
          "text-white/70 hover:text-white border border-white/10 hover:border-[#25D366]/50",
          "bg-white/5 hover:bg-[#25D366]/10",
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <MessageCircle className="w-4 h-4" strokeWidth={2} />
        <span>WhatsApp</span>
      </motion.a>
    );
  }

  return null;
};
