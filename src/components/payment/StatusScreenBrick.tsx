'use client';

import { StatusScreen } from '@mercadopago/sdk-react';

interface StatusScreenBrickProps {
  paymentId: string;
}

/**
 * Status Screen Brick - Tela de confirmação/status do pagamento
 * 
 * Mostra automaticamente:
 * - Status do pagamento (aprovado/pendente/recusado)
 * - Resumo da compra
 * - Detalhes de boleto/pix (quando aplicável)
 * - Suporte a 3DS 2.0 (autenticação adicional)
 * 
 * @see https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks/status-screen-brick/introduction
 */
export function StatusScreenBrick({ paymentId }: StatusScreenBrickProps) {
  const initialization = {
    paymentId,
  };

  const customization = {
    visual: {
      hideStatusDetails: false, // Mostrar detalhes do status
      hideTransactionDate: false, // Mostrar data da transação
      style: {
        theme: 'default' as const, // Tema oficial do MP
      },
    },
    backUrls: {
      error: '/checkout/error', // URL para redirecionar em caso de erro
      return: '/dashboard', // URL para voltar ao dashboard
    },
  };

  const onReady = async () => {
    console.log('✅ Status Screen Brick carregado');
  };

  const onError = async (error: any) => {
    console.error('❌ Erro no Status Screen Brick:', error);
  };

  return (
    <div className="status-screen-brick-container">
      <StatusScreen
        initialization={initialization}
        customization={customization}
        onReady={onReady}
        onError={onError}
      />
    </div>
  );
}
