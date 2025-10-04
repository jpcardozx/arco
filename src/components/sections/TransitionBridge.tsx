'use client';

/**
 * TRANSITION BRIDGE - STORYTELLING CONNECTOR
 *
 * Conecta seções criando narrativa fluida
 * Transições suaves com movimento sutil
 * Uso estratégico de perguntas retóricas
 * Background: GridAndGlow para elegância sutil
 */

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ChevronDown } from 'lucide-react';
import { cn } from '@/design-system/tokens';

interface TransitionBridgeProps {
  question?: string;
  statement?: string;
  context?: string;
  variant?: 'question' | 'statement' | 'minimal';
  showArrow?: boolean;
  className?: string;
}

// Background Component: Grid & Glow
const GridAndGlowBg: React.FC = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <style jsx>{`
        .grid-glow-bg {
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(to right, rgba(20, 184, 166, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 184, 166, 0.08) 1px, transparent 1px);
          background-size: 60px 60px;
          position: absolute;
          inset: 0;
        }
        .grid-glow-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), rgba(20, 184, 166, 0.15), transparent);
          opacity: 0.4;
          transition: background 0.2s ease-out;
          pointer-events: none;
        }
      `}</style>
      <div className="grid-glow-bg" />
    </>
  );
};

export const TransitionBridge: React.FC<TransitionBridgeProps> = ({
  question,
  statement,
  context,
  variant = 'question',
  showArrow = true,
  className
}) => {
  const content = question || statement;

  if (!content) return null;

  return (
    <section
      className={cn(
        "py-12 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden",
        className
      )}
    >
      {/* Grid & Glow Background */}
      <GridAndGlowBg />

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Main content */}
          {variant === 'question' && content && (
            <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-3">
              {content}
            </h3>
          )}

          {variant === 'statement' && content && (
            <p className="text-xl lg:text-2xl font-medium text-slate-300 mb-3">
              {content}
            </p>
          )}

          {variant === 'minimal' && content && (
            <p className="text-lg text-slate-400 font-medium">
              {content}
            </p>
          )}

          {/* Context */}
          {context && (
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
          {showArrow && (
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
