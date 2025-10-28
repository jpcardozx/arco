/**
 * Trust Badges Component
 * 
 * Elementos de credibilidade e segurança para checkout
 * - Garantia clara
 * - Segurança de pagamento
 * - Proteção de dados
 * - Social proof
 */

import { ShieldCheckIcon, LockClosedIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

interface TrustBadgesProps {
  variant?: 'horizontal' | 'vertical' | 'compact';
  showGuarantee?: boolean;
  showSecurity?: boolean;
  showPrivacy?: boolean;
}

export function TrustBadges({
  variant = 'horizontal',
  showGuarantee = true,
  showSecurity = true,
  showPrivacy = true,
}: TrustBadgesProps) {
  const badges = [
    showSecurity && {
      icon: LockClosedIcon,
      title: 'Pagamento Seguro',
      description: 'Criptografia SSL 256-bit via MercadoPago',
      color: 'teal',
    },
    showGuarantee && {
      icon: CheckBadgeIcon,
      title: 'Garantia de 7 Dias',
      description: 'Reembolso total sem perguntas',
      color: 'green',
    },
    showPrivacy && {
      icon: ShieldCheckIcon,
      title: 'Dados Protegidos',
      description: 'LGPD compliant • Sem spam',
      color: 'blue',
    },
  ].filter(Boolean);

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
        {showSecurity && (
          <div className="flex items-center gap-1">
            <LockClosedIcon className="w-3 h-3" />
            <span>Pagamento Seguro</span>
          </div>
        )}
        {showGuarantee && (
          <div className="flex items-center gap-1">
            <CheckBadgeIcon className="w-3 h-3" />
            <span>Garantia 7 dias</span>
          </div>
        )}
        {showPrivacy && (
          <div className="flex items-center gap-1">
            <ShieldCheckIcon className="w-3 h-3" />
            <span>LGPD compliant</span>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className="space-y-3">
        {badges.map((badge, index) => {
          if (!badge) return null;
          const Icon = badge.icon;
          return (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-${badge.color}-500/10 border border-${badge.color}-500/20 flex items-center justify-center`}>
                <Icon className={`w-5 h-5 text-${badge.color}-400`} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{badge.title}</div>
                <div className="text-xs text-slate-400">{badge.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // horizontal (default)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {badges.map((badge, index) => {
        if (!badge) return null;
        const Icon = badge.icon;
        return (
          <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
              <Icon className="w-5 h-5 text-teal-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">{badge.title}</div>
              <div className="text-xs text-slate-400 truncate">{badge.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Guarantee Badge
 * Badge destacado de garantia para checkout
 */
export function GuaranteeBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-300">
      <CheckBadgeIcon className="w-5 h-5" />
      <span className="text-sm font-medium">
        Garantia de 7 dias • Reembolso total
      </span>
    </div>
  );
}

/**
 * Secure Payment Badge
 * Badge de pagamento seguro
 */
export function SecurePaymentBadge() {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-400">
      <LockClosedIcon className="w-4 h-4 text-teal-400" />
      <span>
        Pagamento seguro por <strong className="text-white">MercadoPago</strong>
      </span>
    </div>
  );
}

/**
 * Social Proof Stats
 * Estatísticas reais de social proof
 */
interface SocialProofStatsProps {
  clients?: number;
  rating?: number;
  projects?: number;
}

export function SocialProofStats({
  clients = 50,
  rating = 4.9,
  projects = 120,
}: SocialProofStatsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{clients}+</div>
        <div className="text-xs text-slate-400">Clientes atendidos</div>
      </div>
      <div className="text-center">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-bold text-white">{rating}</span>
          <span className="text-yellow-400">★</span>
        </div>
        <div className="text-xs text-slate-400">Avaliação média</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{projects}+</div>
        <div className="text-xs text-slate-400">Projetos entregues</div>
      </div>
    </div>
  );
}
