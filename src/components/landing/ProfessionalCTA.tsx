/**
 * Professional CTA Component
 *
 * S-tier UX: Subtle, professional, non-aggressive
 * Copy: Consultative, not salesy
 * Philosophy: Invite research, not push conversion
 */

'use client';

import { useState } from 'react';
import { trackCTAHover, trackCTAClick } from '@/hooks/useFunnelTracking';

interface ProfessionalCTAProps {
  id: string;
  variant?: 'primary' | 'secondary' | 'text';
  copy: {
    text: string;
    subtext?: string;
  };
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function ProfessionalCTA({
  id,
  variant = 'primary',
  copy,
  href,
  onClick,
  className = '',
}: ProfessionalCTAProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    trackCTAHover(id, copy.text);
  };

  const handleClick = () => {
    trackCTAClick(id, copy.text, href);
    onClick?.();
  };

  // Professional styling: clean, spacious, breathes
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium tracking-tight
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const variantStyles = {
    primary: `
      px-8 py-4 rounded-lg
      bg-slate-900 text-white
      hover:bg-slate-800
      focus:ring-slate-500
      shadow-sm hover:shadow-md
    `,
    secondary: `
      px-8 py-4 rounded-lg
      bg-white text-slate-900
      border border-slate-200
      hover:border-slate-300 hover:bg-slate-50
      focus:ring-slate-500
    `,
    text: `
      px-4 py-2
      text-slate-700 hover:text-slate-900
      underline underline-offset-4
      decoration-slate-300 hover:decoration-slate-500
    `,
  };

  const Component = href ? 'a' : 'button';

  return (
    <div className="flex flex-col items-start gap-2">
      <Component
        href={href}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {copy.text}
      </Component>

      {copy.subtext && (
        <p className="text-sm text-slate-500 max-w-md">
          {copy.subtext}
        </p>
      )}
    </div>
  );
}

/**
 * COPY EXAMPLES (S-Tier Professional)
 */

// ✅ PRIMARY CTA (Consultative)
export const PRIMARY_CTA_COPY = {
  diagnostic: {
    text: 'Agendar Diagnóstico',
    subtext: 'Sessão de 30 minutos sem compromisso',
  },
  explore: {
    text: 'Explorar Metodologia',
    subtext: 'Entenda como funciona antes de decidir',
  },
  conversation: {
    text: 'Iniciar Conversa',
    subtext: 'Tire suas dúvidas com nosso time',
  },
};

// ✅ SECONDARY CTA (Research)
export const SECONDARY_CTA_COPY = {
  cases: {
    text: 'Ver Casos de Uso',
    subtext: 'Resultados reais de clientes similares',
  },
  methodology: {
    text: 'Como Funciona',
    subtext: 'Processo técnico e implementação',
  },
  docs: {
    text: 'Ler Documentação',
    subtext: 'Especificações técnicas completas',
  },
};

// ❌ AVOID (Aggressive/Salesy)
const BAD_CTA_EXAMPLES = {
  urgency: 'Garanta sua vaga AGORA!',
  scarcity: 'Últimas 3 vagas disponíveis',
  pressure: 'Oferta expira em 2 horas',
  generic: 'Clique aqui',
  pricing: 'Ver preços e planos',
};

/**
 * USAGE EXAMPLE
 */

// In landing page:
// <ProfessionalCTA
//   id="hero-primary"
//   variant="primary"
//   copy={PRIMARY_CTA_COPY.diagnostic}
//   onClick={() => openScheduler()}
// />
//
// <ProfessionalCTA
//   id="hero-secondary"
//   variant="secondary"
//   copy={SECONDARY_CTA_COPY.methodology}
//   href="/metodologia"
// />
