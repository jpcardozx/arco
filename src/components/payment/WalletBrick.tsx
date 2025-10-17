'use client';

import { Wallet } from '@mercadopago/sdk-react';

interface WalletBrickProps {
  preferenceId: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  redirectMode?: 'self' | 'blank' | 'modal';
}

/**
 * Wallet Brick - Botão "Pagar com Mercado Pago"
 * 
 * Permite pagamento rápido com conta Mercado Pago:
 * - Pagamento em 1 clique para usuários MP
 * - Alta taxa de aprovação
 * - Ambiente seguro
 * 
 * Ideal para:
 * - Página de pricing (pagamento rápido)
 * - Como opção adicional no checkout
 * 
 * @see https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks/wallet-brick/introduction
 */
export function WalletBrick({
  preferenceId,
  onSuccess,
  onError,
  redirectMode = 'self',
}: WalletBrickProps) {
  const initialization = {
    preferenceId,
    redirectMode: redirectMode === 'modal' ? 'self' : redirectMode, // SDK só aceita 'self' ou 'blank'
  };

  const onReadyWallet = async () => {
    console.log('✅ Wallet Brick carregado');
  };

  const onErrorWallet = async (error: any) => {
    console.error('❌ Erro no Wallet Brick:', error);
    
    // Dynamic import para evitar problemas no server-side
    if (typeof window !== 'undefined') {
      const { toast } = await import('sonner');
      toast.error('Erro no pagamento', {
        id: 'wallet-payment',
        description: error.message || 'Não foi possível processar o pagamento',
      });
    }
    
    onError?.(error);
  };

  const onSubmitWallet = async () => {
    console.log('✅ Pagamento enviado via Wallet Brick');
    
    // Dynamic import para evitar problemas no server-side
    if (typeof window !== 'undefined') {
      const { toast } = await import('sonner');
      toast.loading('Processando pagamento...', {
        id: 'wallet-payment',
        description: 'Aguarde enquanto processamos seu pagamento',
      });
    }
    
    onSuccess?.();
  };

  return (
    <div className="wallet-brick-container">
      <Wallet
        initialization={initialization}
        onReady={onReadyWallet}
        onSubmit={onSubmitWallet}
        onError={onErrorWallet}
      />
    </div>
  );
}
