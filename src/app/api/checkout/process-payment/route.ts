import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

/**
 * API Route para processar pagamento via Payment Brick
 * 
 * NOTA: Com Payment Brick, o pagamento é processado diretamente pelo MP
 * e nós recebemos o resultado via webhook. Esta rota pode ser usada para
 * validações adicionais ou tracking.
 */
export async function POST(request: NextRequest) {
  try {
    const { formData, selectedPaymentMethod, preferenceId } = await request.json();

    logger.info('Processing payment', {
      paymentMethod: selectedPaymentMethod,
      preferenceId,
    });

    // O Payment Brick já envia os dados diretamente para o MP
    // Aqui você pode adicionar lógica adicional como:
    // - Salvar tentativa de pagamento
    // - Enviar para analytics
    // - Validações extras
    
    // Retornar sucesso (o webhook do MP processará o resultado real)
    return NextResponse.json({
      success: true,
      message: 'Pagamento em processamento',
      paymentId: formData?.payment_id || 'pending',
    });

  } catch (error) {
    logger.error('Error processing payment', { error });

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao processar pagamento',
      },
      { status: 500 }
    );
  }
}
