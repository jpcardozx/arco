// @ts-nocheck
/**
 * Cron job diário para sincronizar dados de SEO
 * Configurar no Vercel: https://vercel.com/docs/cron-jobs
 * 
 * Exemplo de configuração no vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/seo/sync-daily",
 *     "schedule": "0 6 * * *"
 *   }]
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase/server';
import { getRecentSearchAnalytics, aggregateSearchMetrics } from '@/lib/google-search-console';

// Verifica token de autenticação (previne execução não autorizada)
function verifyAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.warn('⚠️  CRON_SECRET não configurado');
    return false;
  }

  return authHeader === `Bearer ${cronSecret}`;
}

export async function GET(request: NextRequest) {
  // Autenticação
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = await createSupabaseAdmin();

    // 1. Busca dados do Search Console (últimos 7 dias)
    const searchData = await getRecentSearchAnalytics('consultingarco.com', 7);
    const metrics = aggregateSearchMetrics(searchData);

    console.log('📊 Dados do Search Console:', {
      rows: searchData.length,
      clicks: metrics.totalClicks,
      impressions: metrics.totalImpressions,
    });

    // 2. Salva dados brutos no Supabase
    if (searchData.length > 0) {
      const { error: insertError } = await supabase
        .from('search_console_daily')
        .insert(
          searchData.map((row) => ({
            keyword: row.keyword,
            page: row.page,
            clicks: row.clicks,
            impressions: row.impressions,
            ctr: row.ctr,
            position: row.position,
            date: new Date().toISOString().split('T')[0],
          }))
        );

      if (insertError) {
        console.error('❌ Erro ao salvar no Supabase:', insertError);
      }
    }

    // 3. Salva métricas agregadas
    const { error: metricsError } = await supabase
      .from('seo_metrics_daily')
      .insert({
        total_clicks: metrics.totalClicks,
        total_impressions: metrics.totalImpressions,
        avg_ctr: metrics.avgCTR,
        avg_position: metrics.avgPosition,
        date: new Date().toISOString().split('T')[0],
      });

    if (metricsError) {
      console.error('❌ Erro ao salvar métricas:', metricsError);
    }

    return NextResponse.json({
      success: true,
      data: {
        rows: searchData.length,
        metrics,
      },
    });
  } catch (error) {
    console.error('❌ Erro no sync diário:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
