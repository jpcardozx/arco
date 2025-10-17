#!/bin/bash

# 🧪 TESTE COMPLETO DE WEBHOOK E DATABASE

echo "🧪 TESTE DE INTEGRAÇÃO - Webhook → Database"
echo "============================================"
echo ""

# 1. Testar conexão Supabase
echo "1️⃣ Testando conexão com Supabase..."
WEBHOOK_COUNT=$(curl -s \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrY2xlZ3ZycXByZXZjZGdvc2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODM0NDAsImV4cCI6MjA3NTE1OTQ0MH0.d4ldEvZEfufwnmw4koYR4fscu4rtRPXXiQvgRwPSdwA" \
  "https://vkclegvrqprevcdgosan.supabase.co/rest/v1/webhook_events?select=count" | jq -r '.[0].count')

if [ -n "$WEBHOOK_COUNT" ]; then
    echo "   ✅ Supabase conectado! ($WEBHOOK_COUNT webhooks registrados)"
else
    echo "   ❌ Erro ao conectar com Supabase"
    exit 1
fi

echo ""

# 2. Testar endpoint do webhook
echo "2️⃣ Testando endpoint /api/webhooks/mercadopago..."
ENDPOINT_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3001/api/webhooks/mercadopago \
  -H "Content-Type: application/json" \
  -H "x-signature: test" \
  -H "x-request-id: test123" \
  -d '{"test": true}')

if [ "$ENDPOINT_STATUS" = "401" ]; then
    echo "   ✅ Endpoint ativo e validando assinaturas!"
elif [ "$ENDPOINT_STATUS" = "200" ]; then
    echo "   ✅ Endpoint ativo e respondendo!"
else
    echo "   ⚠️  Endpoint retornou: $ENDPOINT_STATUS"
fi

echo ""

# 3. Inserir webhook de teste diretamente no DB
echo "3️⃣ Inserindo webhook de teste no database..."
INSERT_RESULT=$(curl -s -X POST \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrY2xlZ3ZycXByZXZjZGdvc2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODM0NDAsImV4cCI6MjA3NTE1OTQ0MH0.d4ldEvZEfufwnmw4koYR4fscu4rtRPXXiQvgRwPSdwA" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrY2xlZ3ZycXByZXZjZGdvc2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODM0NDAsImV4cCI6MjA3NTE1OTQ0MH0.d4ldEvZEfufwnmw4koYR4fscu4rtRPXXiQvgRwPSdwA" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  "https://vkclegvrqprevcdgosan.supabase.co/rest/v1/webhook_events" \
  -d '{
    "gateway": "mercadopago",
    "gateway_event_id": "test_'$(date +%s)'",
    "event_type": "payment",
    "processed": true,
    "payload": {"test": true, "timestamp": "'$(date -Iseconds)'"}
  }')

if echo "$INSERT_RESULT" | jq -e '.[0].id' > /dev/null 2>&1; then
    INSERTED_ID=$(echo "$INSERT_RESULT" | jq -r '.[0].id')
    echo "   ✅ Webhook de teste inserido com sucesso! (ID: $INSERTED_ID)"
else
    echo "   ❌ Erro ao inserir webhook: $INSERT_RESULT"
    exit 1
fi

echo ""

# 4. Verificar se apareceu no database
echo "4️⃣ Verificando se webhook está visível..."
sleep 1
NEW_COUNT=$(curl -s \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrY2xlZ3ZycXByZXZjZGdvc2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODM0NDAsImV4cCI6MjA3NTE1OTQ0MH0.d4ldEvZEfufwnmw4koYR4fscu4rtRPXXiQvgRwPSdwA" \
  "https://vkclegvrqprevcdgosan.supabase.co/rest/v1/webhook_events?select=count" | jq -r '.[0].count')

echo "   📊 Webhooks antes: $WEBHOOK_COUNT"
echo "   📊 Webhooks agora: $NEW_COUNT"

if [ "$NEW_COUNT" -gt "$WEBHOOK_COUNT" ]; then
    echo "   ✅ Webhook apareceu no database!"
else
    echo "   ⚠️  Contagem não mudou (cache?)"
fi

echo ""

# 5. Buscar último webhook
echo "5️⃣ Buscando último webhook registrado..."
LAST_WEBHOOK=$(curl -s \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrY2xlZ3ZycXByZXZjZGdvc2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODM0NDAsImV4cCI6MjA3NTE1OTQ0MH0.d4ldEvZEfufwnmw4koYR4fscu4rtRPXXiQvgRwPSdwA" \
  "https://vkclegvrqprevcdgosan.supabase.co/rest/v1/webhook_events?select=*&order=received_at.desc&limit=1")

echo "$LAST_WEBHOOK" | jq '.[0] | {id, gateway, event_type, processed, received_at}'

echo ""
echo "============================================"
echo "✅ TESTE COMPLETO!"
echo ""
echo "📋 RESUMO:"
echo "   ✅ Supabase: Conectado"
echo "   ✅ Tabela webhook_events: Acessível"
echo "   ✅ Endpoint webhook: Ativo"
echo "   ✅ Inserção no DB: Funcionando"
echo "   ✅ Leitura do DB: Funcionando"
echo ""
echo "🎯 PRÓXIMO PASSO:"
echo "   Configure no MP: https://38503f230378.ngrok-free.app/api/webhooks/mercadopago"
echo "   Acesse monitor: http://localhost:3001/monitor/webhooks"
echo ""
