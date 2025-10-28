/**
 * TrackableButton Component
 *
 * Button component that automatically tracks clicks with visual feedback
 */

'use client';

import React, { type ButtonHTMLAttributes, type ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Button } from '@/components/ui/button';

// ============================================================================
// TYPES
// ============================================================================

interface TrackableButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  trackLabel: string;
  trackCategory?: 'cta' | 'navigation' | 'form' | 'action';
  trackProperties?: Record<string, any>;
  showFeedback?: boolean;
  feedbackDuration?: number;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

// ============================================================================
// COMPONENT
// ============================================================================

export function TrackableButton({
  children,
  trackLabel,
  trackCategory = 'cta',
  trackProperties,
  showFeedback = false,
  feedbackDuration = 1500,
  onClick,
  variant = 'default',
  ...props
}: TrackableButtonProps) {
  const { trackInteraction } = useAnalytics();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the click
    await trackInteraction(trackLabel, 'click', {
      element_type: 'button',
      category: trackCategory,
      ...trackProperties,
    });

    // Show feedback if enabled
    if (showFeedback) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), feedbackDuration);
    }

    // Call original onClick
    onClick?.(e);
  };

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      className="relative overflow-hidden"
      {...props}
    >
      {/* Button content */}
      <span className={showSuccess ? 'opacity-0' : 'opacity-100'}>{children}</span>

      {/* Success feedback */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-green-500"
          >
            <CheckCircle2 className="w-5 h-5 text-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}

export default TrackableButton;
