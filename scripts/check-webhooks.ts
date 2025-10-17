import * as dotenv from 'dotenv';
import { getSupabaseAdmin } from '../src/lib/supabase/client';

// Carregar variáveis de ambiente do .env.local
dotenv.config({ path: '.env.local' });

const supabase = getSupabaseAdmin();

async function checkWebhooks() {
  console.log('🔍 Verificando últimos webhooks...\n');

  const { data, error } = await supabase
    .from('webhook_events')
    .select('id, event_type, gateway_event_id, created_at, processed, processed_at, payload')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('❌ Erro ao buscar webhooks:', error);
    return;
  }

  if (!data || data.length === 0) {
    console.log('⚠️  Nenhum webhook encontrado no banco de dados');
    return;
  }

  console.log(`✅ Encontrados ${data.length} webhook(s):\n`);
  
  data.forEach((webhook, index) => {
    console.log(`${index + 1}. 📬 Webhook ID: ${webhook.id.substring(0, 8)}...`);
    console.log(`   Type: ${webhook.event_type}`);
    console.log(`   Gateway Event ID: ${webhook.gateway_event_id}`);
    
    // Payload é JSON, precisa ser parseado
    const payload = typeof webhook.payload === 'object' ? webhook.payload as any : null;
    console.log(`   Action: ${payload?.action || 'N/A'}`);
    
    if (webhook.created_at) {
      console.log(`   Recebido: ${new Date(webhook.created_at).toLocaleString('pt-BR')}`);
    }
    console.log(`   Processado: ${webhook.processed ? '✅ Sim' : '⏳ Não'}`);
    if (webhook.processed_at) {
      console.log(`   Processado em: ${new Date(webhook.processed_at).toLocaleString('pt-BR')}`);
    }
    console.log('');
  });

  // Verificar o webhook de teste específico
  const testWebhook = data.find(w => {
    const payload = typeof w.payload === 'object' ? w.payload as any : null;
    return w.event_type === 'test' && payload?.action === 'test.created';
  });
  
  if (testWebhook) {
    console.log('🎉 WEBHOOK DE TESTE DO MERCADO PAGO ENCONTRADO!');
    console.log(`   ID: ${testWebhook.id}`);
    console.log(`   Gateway Event ID: ${testWebhook.gateway_event_id}`);
    console.log(`   Status: ${testWebhook.processed ? 'Processado' : 'Pendente'}`);
  } else {
    console.log('⚠️  Webhook de teste do Mercado Pago ainda não encontrado no banco');
  }
}

checkWebhooks().catch(console.error);
