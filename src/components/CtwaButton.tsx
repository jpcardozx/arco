/**
 * CTWA (Click-to-WhatsApp) S-Tier Component
 * 
 * Componente production-ready para botão de contato WhatsApp com tracking automático.
 * 
 * Features:
 * - Tracking automático de evento "Contact" via Meta Conversions API
 * - Coleta de FBP/FBC para EMQ
 * - Deduplicação de eventos
 * - Estados de loading e feedback visual
 * - Acessibilidade completa
 * - Mobile-first design
 * 
 * Estratégia de funil:
 * Contact (CTWA) → Lead → Schedule → Purchase
 * 
 * Por que "Contact" primeiro:
 * - Volume alto (8-15% dos visitantes)
 * - CAC baixo (evento barato para otimizar)
 * - Dados iniciais para algoritmo Meta
 */

'use client';

import { useCallback, useState } from 'react';
import { useMetaTracking } from '@/hooks/useMetaTracking';
import { Button } from '@/components/ui/button';
import { MessageCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES
// ============================================================================

export interface CtwaButtonProps {
  /** Número do WhatsApp (formato: 5511999999999) */
  phoneNumber: string;
  
  /** Mensagem pré-preenchida (opcional) */
  message?: string;
  
  /** Email do usuário (se disponível, melhora EMQ) */
  userEmail?: string;
  
  /** Telefone do usuário (se disponível, melhora EMQ) */
  userPhone?: string;
  
  /** Origem do clique (para tracking) */
  source?: string;
  
  /** Variante visual */
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
  
  /** Tamanho */
  size?: 'sm' | 'md' | 'lg';
  
  /** Texto do botão */
  label?: string;
  
  /** Mostrar ícone */
  showIcon?: boolean;
  
  /** ClassName adicional */
  className?: string;
  
  /** Desabilitar tracking (para testes) */
  disableTracking?: boolean;
  
  /** Callback após clique (opcional) */
  onAfterClick?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CtwaButton({
  phoneNumber,
  message = 'Olá! Vi seu site e gostaria de saber mais.',
  userEmail,
  userPhone,
  source = 'website',
  variant = 'default',
  size = 'md',
  label = 'Falar no WhatsApp',
  showIcon = true,
  className,
  disableTracking = false,
  onAfterClick,
}: CtwaButtonProps) {
  const { trackContact } = useMetaTracking();
  const [status, setStatus] = useState<'idle' | 'tracking' | 'success' | 'error'>('idle');

  /**
   * Formata número de telefone para WhatsApp (remove caracteres especiais)
   */
  const formatWhatsAppNumber = useCallback((phone: string): string => {
    return phone.replace(/\D/g, '');
  }, []);

  /**
   * Constrói URL do WhatsApp
   */
  const buildWhatsAppUrl = useCallback((): string => {
    const formattedNumber = formatWhatsAppNumber(phoneNumber);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
  }, [phoneNumber, message, formatWhatsAppNumber]);

  /**
   * Handler principal do clique
   */
  const handleClick = useCallback(async () => {
    setStatus('tracking');

    try {
      // 1. Rastrear evento "Contact" (se tracking habilitado)
      if (!disableTracking) {
        // Gerar email/phone placeholder se não fornecido
        const trackingEmail = userEmail || `anonymous_${Date.now()}@ctwa.placeholder`;
        const trackingPhone = userPhone;

        const response = await trackContact({
          email: trackingEmail,
          phone: trackingPhone,
          message: `CTWA click from ${source}`,
        });

        console.log('📲 [CTWA] Contact event tracked', {
          success: response.success,
          eventId: response.eventId,
          source,
          isDuplicate: response.isDuplicate,
        });

        if (response.success) {
          setStatus('success');
        } else if (response.isDuplicate) {
          console.warn('[CTWA] Duplicate event detected, proceeding anyway');
          setStatus('success');
        } else {
          console.error('[CTWA] Tracking failed, proceeding anyway');
          setStatus('error');
        }
      } else {
        setStatus('success');
      }

      // 2. Pequeno delay para feedback visual
      await new Promise(resolve => setTimeout(resolve, 300));

      // 3. Abrir WhatsApp em nova aba
      const whatsappUrl = buildWhatsAppUrl();
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // 4. Callback (se fornecido)
      if (onAfterClick) {
        onAfterClick();
      }

      // 5. Reset status após 2s
      setTimeout(() => setStatus('idle'), 2000);

    } catch (error) {
      console.error('[CTWA] Error handling click', error);
      setStatus('error');

      // Fallback: abrir WhatsApp mesmo com erro de tracking
      const whatsappUrl = buildWhatsAppUrl();
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      setTimeout(() => setStatus('idle'), 2000);
    }
  }, [
    disableTracking,
    userEmail,
    userPhone,
    source,
    trackContact,
    buildWhatsAppUrl,
    onAfterClick,
  ]);

  /**
   * Mapeamento de variantes para classes
   */
  const variantClasses = {
    default: 'bg-[#25D366] hover:bg-[#20BA5A] text-white',
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
    outline: 'border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10',
    ghost: 'hover:bg-[#25D366]/10 text-[#25D366]',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  /**
   * Conteúdo do botão baseado no estado
   */
  const renderContent = () => {
    if (status === 'tracking') {
      return (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Conectando...</span>
        </>
      );
    }

    if (status === 'success') {
      return (
        <>
          <CheckCircle2 className="w-4 h-4" />
          <span>Abrindo WhatsApp...</span>
        </>
      );
    }

    return (
      <>
        {showIcon && <MessageCircle className="w-4 h-4" />}
        <span>{label}</span>
      </>
    );
  };

  return (
    <Button
      onClick={handleClick}
      disabled={status === 'tracking'}
      className={cn(
        'inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-300',
        'shadow-md hover:shadow-lg',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      aria-label={`Enviar mensagem via WhatsApp para ${phoneNumber}`}
    >
      {renderContent()}
    </Button>
  );
}

// ============================================================================
// VARIANTS
// ============================================================================

/**
 * Variante flutuante (sticky bottom-right)
 */
export function CtwaButtonFloating({
  phoneNumber,
  message,
  userEmail,
  userPhone,
  source = 'floating_button',
}: Pick<CtwaButtonProps, 'phoneNumber' | 'message' | 'userEmail' | 'userPhone' | 'source'>) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <CtwaButton
        phoneNumber={phoneNumber}
        message={message}
        userEmail={userEmail}
        userPhone={userPhone}
        source={source}
        variant="default"
        size="lg"
        label=""
        showIcon={true}
        className="rounded-full w-14 h-14 p-0 shadow-2xl hover:scale-110 transition-transform"
      />
    </div>
  );
}

/**
 * Variante inline em formulário
 */
export function CtwaButtonInline({
  phoneNumber,
  message,
  userEmail,
  userPhone,
  source = 'form_inline',
}: Pick<CtwaButtonProps, 'phoneNumber' | 'message' | 'userEmail' | 'userPhone' | 'source'>) {
  return (
    <CtwaButton
      phoneNumber={phoneNumber}
      message={message}
      userEmail={userEmail}
      userPhone={userPhone}
      source={source}
      variant="outline"
      size="md"
      label="Prefiro WhatsApp"
      showIcon={true}
      className="w-full"
    />
  );
}

/**
 * Variante CTA hero
 */
export function CtwaButtonHero({
  phoneNumber,
  message,
  userEmail,
  userPhone,
  source = 'hero_cta',
}: Pick<CtwaButtonProps, 'phoneNumber' | 'message' | 'userEmail' | 'userPhone' | 'source'>) {
  return (
    <CtwaButton
      phoneNumber={phoneNumber}
      message={message}
      userEmail={userEmail}
      userPhone={userPhone}
      source={source}
      variant="default"
      size="lg"
      label="Falar com Especialista"
      showIcon={true}
      className="shadow-2xl hover:shadow-[#25D366]/50"
    />
  );
}

export default CtwaButton;
