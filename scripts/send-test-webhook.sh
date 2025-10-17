#!/bin/bash

# Script para capturar logs do Next.js durante teste de webhook

echo "🔍 Enviando webhook e monitorando resposta..."
echo ""

# Enviar webhook
REQUEST_ID="test-$(date +%s)-debug"

curl -X POST "http://localhost:3000/api/webhooks/mercadopago" \
  -H "Content-Type: application/json" \
  -H "x-signature: fake-signature-for-testing" \
  -H "x-request-id: $REQUEST_ID" \
  -d '{
    "action": "test.created",
    "api_version": "v1",
    "application_id": "2788564632687573",
    "date_created": "2021-11-01T02:02:02Z",
    "id": "123456",
    "live_mode": false,
    "type": "test",
    "user_id": 178150601,
    "data": {"id":"12345633"}
  }' \
  -w "\n\nHTTP Status: %{http_code}\n"

echo ""
echo "✅ Webhook enviado com Request ID: $REQUEST_ID"
echo ""
echo "📋 IMPORTANTE: Verifique os logs do terminal onde 'next dev' está rodando!"
echo "   Procure por linhas que começam com 🔵, 🟡, ❌"
echo ""
echo "🔍 Verificando no banco após 2 segundos..."
sleep 2

npx tsx scripts/check-webhooks.ts
