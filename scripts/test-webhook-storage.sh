#!/bin/bash

# Simular o webhook exato que o Mercado Pago enviou
WEBHOOK_URL="http://localhost:3000/api/webhooks/mercadopago"

echo "🧪 Testando armazenamento de webhook..."
echo "📡 URL: $WEBHOOK_URL"
echo ""

# Payload exato do Mercado Pago
PAYLOAD='{
  "action": "test.created",
  "api_version": "v1",
  "application_id": "2788564632687573",
  "date_created": "2021-11-01T02:02:02Z",
  "id": "123456",
  "live_mode": false,
  "type": "test",
  "user_id": 178150601,
  "data": {"id":"12345633"}
}'

echo "📦 Payload:"
echo "$PAYLOAD" | jq '.'
echo ""

# Gerar signature fake (modo dev vai aceitar)
REQUEST_ID="test-$(date +%s)-storage"
SIGNATURE="fake-signature-for-testing"

echo "🔑 Request ID: $REQUEST_ID"
echo "🔏 Signature: $SIGNATURE"
echo ""
echo "📤 Enviando webhook..."
echo ""

# Enviar webhook
RESPONSE=$(curl -s -w "\n\nHTTP_STATUS:%{http_code}" -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -H "x-signature: $SIGNATURE" \
  -H "x-request-id: $REQUEST_ID" \
  -d "$PAYLOAD")

# Extrair status e corpo
HTTP_BODY=$(echo "$RESPONSE" | sed -e 's/HTTP_STATUS:.*//')
HTTP_STATUS=$(echo "$RESPONSE" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')

echo "📥 Response Status: $HTTP_STATUS"
echo "📥 Response Body: $HTTP_BODY"
echo ""

if [ "$HTTP_STATUS" = "200" ]; then
  echo "✅ Webhook aceito com sucesso!"
  echo ""
  echo "🔍 Aguarde 2 segundos e verificando no banco de dados..."
  sleep 2
  
  # Verificar no banco
  npx tsx -e "
    import { createClient } from '@supabase/supabase-js';
    import * as dotenv from 'dotenv';
    
    dotenv.config({ path: '.env.local' });
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    async function check() {
      const { data, error } = await supabase
        .from('webhook_events')
        .select('*')
        .eq('gateway_event_id', '$REQUEST_ID')
        .single();
      
      if (error) {
        console.log('❌ Webhook não encontrado no banco:', error.message);
        return;
      }
      
      if (data) {
        console.log('✅ WEBHOOK ARMAZENADO COM SUCESSO!');
        console.log('   ID:', data.id);
        console.log('   Type:', data.event_type);
        console.log('   Gateway Event ID:', data.gateway_event_id);
        console.log('   Processed:', data.processed);
        console.log('   Received at:', data.received_at);
      }
    }
    
    check();
  "
else
  echo "❌ Webhook rejeitado!"
fi

echo ""
echo "📊 Confira também em: http://localhost:3000/monitor/webhooks"
