/**
 * ARCO Landing Page - Custom SVG Illustrations
 * 
 * Ilustrações SVG animadas com Framer Motion para cada seção
 * Estilo: Flat design minimalista, line art, amber palette
 */

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface IllustrationProps {
  className?: string;
  animate?: boolean;
}

/**
 * Calendar Filling Animation - Para HeroSection
 * Ilustra calendário vazio → preenchendo com agendamentos
 */
export function CalendarFillingIllustration({ className, animate = true }: IllustrationProps) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.2, duration: 1, ease: 'easeInOut' },
        opacity: { delay: i * 0.2, duration: 0.3 },
      },
    }),
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1 + i * 0.15,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-full', className)}
    >
      {/* Calendar frame */}
      <motion.rect
        x="60"
        y="80"
        width="280"
        height="280"
        rx="16"
        stroke="#F59E0B"
        strokeWidth="3"
        fill="rgba(245, 158, 11, 0.05)"
        custom={0}
        variants={animate ? pathVariants : undefined}
        initial={animate ? 'hidden' : undefined}
        animate={animate ? 'visible' : undefined}
      />

      {/* Calendar header */}
      <motion.rect
        x="60"
        y="80"
        width="280"
        height="50"
        rx="16"
        fill="rgba(245, 158, 11, 0.15)"
        custom={0.1}
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={animate ? { delay: 0.3, duration: 0.5 } : undefined}
      />

      {/* Week days headers */}
      {[0, 1, 2, 3, 4, 5, 6].map((day) => (
        <motion.circle
          key={`header-${day}`}
          cx={95 + day * 42}
          cy={105}
          r="3"
          fill="#F59E0B"
          custom={0.2 + day * 0.05}
          initial={animate ? { scale: 0 } : undefined}
          animate={animate ? { scale: 1 } : undefined}
          transition={animate ? { delay: 0.5 + day * 0.05, duration: 0.3 } : undefined}
        />
      ))}

      {/* Calendar grid - Empty slots */}
      {[...Array(28)].map((_, i) => {
        const row = Math.floor(i / 7);
        const col = i % 7;
        const x = 95 + col * 42;
        const y = 160 + row * 42;

        return (
          <motion.rect
            key={`slot-${i}`}
            x={x - 15}
            y={y - 15}
            width="30"
            height="30"
            rx="6"
            stroke="rgba(100, 116, 139, 0.2)"
            strokeWidth="1"
            fill="transparent"
            custom={0.3 + (i * 0.02)}
            initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
            animate={animate ? { opacity: 1, scale: 1 } : undefined}
            transition={animate ? { delay: 0.6 + i * 0.02, duration: 0.3 } : undefined}
          />
        );
      })}

      {/* Filled bookings (animados progressivamente) */}
      {[2, 5, 9, 11, 15, 18, 20, 23].map((index, i) => {
        const row = Math.floor(index / 7);
        const col = index % 7;
        const x = 95 + col * 42;
        const y = 160 + row * 42;

        return (
          <motion.g key={`booking-${index}`}>
            {/* Filled slot */}
            <motion.rect
              x={x - 15}
              y={y - 15}
              width="30"
              height="30"
              rx="6"
              fill="#F59E0B"
              custom={i}
              variants={animate ? dotVariants : undefined}
              initial={animate ? 'hidden' : undefined}
              animate={animate ? 'visible' : undefined}
            />
            {/* Checkmark */}
            <motion.path
              d={`M ${x - 8} ${y} L ${x - 3} ${y + 5} L ${x + 8} ${y - 5}`}
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              custom={i}
              variants={animate ? dotVariants : undefined}
              initial={animate ? 'hidden' : undefined}
              animate={animate ? 'visible' : undefined}
            />
          </motion.g>
        );
      })}

      {/* WhatsApp notification badge (aparece no final) */}
      <motion.g
        initial={animate ? { scale: 0, opacity: 0 } : undefined}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={animate ? { delay: 2.5, duration: 0.5, type: 'spring', stiffness: 200 } : undefined}
      >
        <circle cx="320" cy="100" r="24" fill="#25D366" />
        <path
          d="M 310 100 L 318 100 L 322 95"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </svg>
  );
}

/**
 * System Flow Diagram - Para SolutionArchitectureSection
 * Google → Landing → Booking → WhatsApp
 */
export function SystemFlowIllustration({ className, animate = true }: IllustrationProps) {
  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.4,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      transition: {
        delay: i * 0.4 + 0.3,
        duration: 0.6,
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <svg
      viewBox="0 0 600 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-full', className)}
    >
      {/* Connecting lines */}
      <motion.path
        d="M 120 100 L 230 100"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeDasharray="4 4"
        custom={0}
        variants={animate ? lineVariants : undefined}
        initial={animate ? 'hidden' : undefined}
        animate={animate ? 'visible' : undefined}
      />
      <motion.path
        d="M 340 100 L 450 100"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeDasharray="4 4"
        custom={1}
        variants={animate ? lineVariants : undefined}
        initial={animate ? 'hidden' : undefined}
        animate={animate ? 'visible' : undefined}
      />

      {/* Node 1: Google */}
      <motion.g
        custom={0}
        variants={animate ? nodeVariants : undefined}
        initial={animate ? 'hidden' : undefined}
        animate={animate ? 'visible' : undefined}
      >
        <circle cx="60" cy="100" r="50" fill="rgba(245, 158, 11, 0.1)" stroke="#F59E0B" strokeWidth="2" />
        <text x="60" y="108" textAnchor="middle" fontSize="14" fill="#F59E0B" fontWeight="600">
          Google
        </text>
      </motion.g>

      {/* Node 2: Landing */}
      <motion.g
        custom={1}
        variants={animate ? nodeVariants : undefined}
        initial={animate ? 'hidden' : undefined}
        animate={animate ? 'visible' : undefined}
      >
        <circle cx="280" cy="100" r="50" fill="rgba(245, 158, 11, 0.1)" stroke="#F59E0B" strokeWidth="2" />
        <text x="280" y="108" textAnchor="middle" fontSize="14" fill="#F59E0B" fontWeight="600">
          Landing
        </text>
      </motion.g>

      {/* Node 3: Booking */}
      <motion.g
        custom={2}
        variants={animate ? nodeVariants : undefined}
        initial={animate ? 'hidden' : undefined}
        animate={animate ? 'visible' : undefined}
      >
        <circle cx="500" cy="100" r="50" fill="rgba(245, 158, 11, 0.1)" stroke="#F59E0B" strokeWidth="2" />
        <text x="500" y="108" textAnchor="middle" fontSize="14" fill="#F59E0B" fontWeight="600">
          WhatsApp
        </text>
      </motion.g>
    </svg>
  );
}

/**
 * Growth Chart - Para ProofSection
 * Gráfico de crescimento de bookings mês a mês
 */
export function GrowthChartIllustration({ className, animate = true }: IllustrationProps) {
  const barData = [
    { month: 'M1', height: 60, value: 8 },
    { month: 'M2', height: 105, value: 14 },
    { month: 'M3', height: 135, value: 18 },
  ];

  return (
    <svg
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-full', className)}
    >
      {/* Axis */}
      <line x1="40" y1="20" x2="40" y2="170" stroke="#64748B" strokeWidth="2" />
      <line x1="40" y1="170" x2="280" y2="170" stroke="#64748B" strokeWidth="2" />

      {/* Bars */}
      {barData.map((bar, i) => (
        <motion.g key={bar.month}>
          <motion.rect
            x={70 + i * 80}
            y={170 - bar.height}
            width="50"
            height={bar.height}
            rx="4"
            fill="#F59E0B"
            initial={animate ? { height: 0, y: 170 } : undefined}
            animate={animate ? { height: bar.height, y: 170 - bar.height } : undefined}
            transition={animate ? { delay: i * 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] } : undefined}
          />
          <motion.text
            x={95 + i * 80}
            y={160 - bar.height}
            textAnchor="middle"
            fontSize="14"
            fill="#F59E0B"
            fontWeight="600"
            initial={animate ? { opacity: 0 } : undefined}
            animate={animate ? { opacity: 1 } : undefined}
            transition={animate ? { delay: i * 0.3 + 0.4, duration: 0.3 } : undefined}
          >
            {bar.value}
          </motion.text>
          <text x={95 + i * 80} y="190" textAnchor="middle" fontSize="12" fill="#64748B">
            {bar.month}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

/**
 * Timeline Roadmap - Para ImplementationGuideSection
 * 90-day implementation timeline
 */
export function TimelineIllustration({ className, animate = true }: IllustrationProps) {
  const milestones = [
    { day: 7, label: 'Setup', x: 80 },
    { day: 30, label: 'Launch', x: 200 },
    { day: 60, label: 'Optimize', x: 320 },
    { day: 90, label: 'Scale', x: 440 },
  ];

  return (
    <svg
      viewBox="0 0 520 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-full', className)}
    >
      {/* Timeline line */}
      <motion.line
        x1="60"
        y1="60"
        x2="460"
        y2="60"
        stroke="#F59E0B"
        strokeWidth="3"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={animate ? { duration: 1.5, ease: 'easeInOut' } : undefined}
      />

      {/* Milestones */}
      {milestones.map((milestone, i) => (
        <motion.g
          key={milestone.day}
          initial={animate ? { scale: 0, opacity: 0 } : undefined}
          animate={animate ? { scale: 1, opacity: 1 } : undefined}
          transition={animate ? { delay: 0.5 + i * 0.3, duration: 0.4, type: 'spring' } : undefined}
        >
          <circle cx={milestone.x} cy="60" r="12" fill="#F59E0B" stroke="white" strokeWidth="3" />
          <text x={milestone.x} y="95" textAnchor="middle" fontSize="12" fill="#64748B" fontWeight="600">
            {milestone.label}
          </text>
          <text x={milestone.x} y="35" textAnchor="middle" fontSize="10" fill="#F59E0B">
            Dia {milestone.day}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
