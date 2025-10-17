import { NextRequest, NextResponse } from 'next/server';
import { Preference } from 'mercadopago';
import { mercadoPagoClient } from '@/lib/payments/mercadopago/client';
import { logger } from '@/lib/logger';
import { createClient } from '@supabase/supabase-js';
import { createPreferenceLimiter, getClientIp, checkRateLimit } from '@/lib/rate-limiting/checkout-limiter';

// Supabase service role client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    const rateLimit = await checkRateLimit(createPreferenceLimiter, clientIp);

    if (!rateLimit.success) {
      logger.warn('Rate limit exceeded for create-preference', { ip: clientIp });
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetAt.toString(),
            'Retry-After': Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const { planId, userId } = await request.json();

    // Validar userId
    if (!userId) {
      logger.warn('Missing userId for create-preference', { planId });
      return NextResponse.json({ error: 'UserId obrigatório' }, { status: 400 });
    }

    // Validar planId
    if (!planId) {
      logger.warn('Missing planId for create-preference', { userId });
      return NextResponse.json({ error: 'PlanId obrigatório' }, { status: 400 });
    }

    // Buscar plano do banco de dados
    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('id, slug, name, price, description, features')
      .eq('slug', planId)
      .single();

    if (planError) {
      logger.error('Error fetching plan from database', { planId, userId, error: planError.message });
      return NextResponse.json({ error: 'Erro ao consultar o plano.' }, { status: 500 });
    }

    if (!plan) {
      logger.warn('Plan not found', { planId, userId });
      return NextResponse.json({ error: 'Plano inválido' }, { status: 404 });
    }

    // 1. Criar subscription no Supabase (status: incomplete)
    const { data: subscriptionData, error: subscriptionError } = await supabase.rpc(
      'upsert_subscription',
      {
        p_user_id: userId,
        p_plan_slug: planId,
        p_gateway: 'mercadopago',
        p_gateway_subscription_id: `temp_${Date.now()}`, // Temporary ID
        p_status: 'incomplete',
      }
    );

    if (subscriptionError) {
      logger.error('Failed to create subscription', { error: subscriptionError });
      return NextResponse.json(
        { error: 'Erro ao criar subscription' },
        { status: 500 }
      );
    }

    const subscriptionId = subscriptionData;

    logger.info('Subscription created', {
      subscriptionId,
      planId,
      userId,
    });

    // 2. Criar preferência no Mercado Pago
    const preferenceClient = new Preference(mercadoPagoClient);
    const response = await preferenceClient.create({
      body: {
        items: [
          {
            id: plan.id,
            title: `Assinatura ${plan.name} - ARCO`,
            description: plan.description,
            unit_price: plan.price / 100, // Converter centavos para reais
            quantity: 1,
            currency_id: 'BRL',
          },
        ],
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/error`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/pending`,
        },
        auto_return: 'approved',
        statement_descriptor: 'ARCO',
        external_reference: plan.id,
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago/v2`,
        metadata: {
          user_id: userId,
          subscription_id: subscriptionId,
          plan_id: planId,
        },
      },
    });

    const preference = response;

    // 3. Atualizar subscription com preference_id real
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({
        gateway_subscription_id: preference.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', subscriptionId);

    if (updateError) {
      logger.error('Failed to update subscription with preference_id', {
        error: updateError,
      });
    }

    logger.info('Preference created successfully', {
      planId,
      preferenceId: preference.id,
      subscriptionId,
    });

    return NextResponse.json({
      preferenceId: preference.id,
      subscriptionId,
      plan: {
        ...plan,
        price: plan.price, // Manter em centavos no frontend
      },
    });
  } catch (error) {
    logger.error('Error in create-preference', { error });

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao criar preferência',
      },
      { status: 500 }
    );
  }
}
