import { NextRequest, NextResponse } from 'next/server';
import { Preference } from 'mercadopago';
import { mercadoPagoClient, MP_CONFIG } from '@/lib/payments/mercadopago/client';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    // Check if MercadoPago is enabled
    if (!MP_CONFIG.enabled || !mercadoPagoClient) {
      logger.error('MercadoPago not configured');
      return NextResponse.json(
        { error: 'Payment system not available' },
        { status: 503 }
      );
    }

    const { name, email, phone, amount, product } = await request.json();

    // Validation
    if (!name || !email || !amount) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: name, email, amount' },
        { status: 400 }
      );
    }

    // Create preference
    const preferenceClient = new Preference(mercadoPagoClient);
    const response = await preferenceClient.create({
      body: {
        items: [
          {
            id: 'tripwire-proposta-completa',
            title: 'Proposta Completa - ARCO Digital',
            description: 'Orçamento personalizado + Projeto de implementação + Lista de entregáveis',
            unit_price: amount,
            quantity: 1,
            currency_id: 'BRL',
          },
        ],
        payer: {
          name,
          email,
          phone: phone ? {
            area_code: phone.replace(/\D/g, '').slice(0, 2),
            number: phone.replace(/\D/g, '').slice(2),
          } : undefined,
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL}/tripwire/success`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL}/tripwire/error`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL}/tripwire/pending`,
        },
        auto_return: 'approved',
        statement_descriptor: 'ARCO DIGITAL',
        external_reference: `tripwire_${Date.now()}`,
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago/tripwire`,
        metadata: {
          product,
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
        },
      },
    });

    logger.info('Tripwire preference created', {
      preferenceId: response.id,
      email,
      amount,
    });

    return NextResponse.json({
      checkoutUrl: response.init_point, // URL to redirect user
      preferenceId: response.id,
    });

  } catch (error) {
    logger.error('Error creating tripwire preference', { error });

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Erro ao criar checkout',
      },
      { status: 500 }
    );
  }
}
