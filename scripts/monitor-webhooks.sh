#!/bin/bash

# 🎯 ARCO - Monitor de Webhooks Mercado Pago
# Monitora logs em tempo real e registra notificações

echo "🔍 Monitorando Webhooks Mercado Pago..."
echo "📡 Webhook URL: https://c8c50b974bfc.ngrok-free.app/api/webhooks/mercadopago"
echo "🗄️  Database: Supabase (vkclegvrqprevcdgosan)"
echo ""
echo "================================================"
echo "Aguardando notificações do Mercado Pago..."
echo "================================================"
echo ""

# Verificar se ngrok está rodando
if ! curl -s http://localhost:4040/api/tunnels > /dev/null 2>&1; then
    echo "❌ Ngrok não está rodando!"
    echo "Execute: ngrok http 3001"
    exit 1
fi

# Verificar se Next.js está rodando
if ! curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo "❌ Next.js não está rodando!"
    echo "Execute: npm run dev"
    exit 1
fi

echo "✅ Ngrok: Online"
echo "✅ Next.js: Online"
echo ""

# Função para verificar webhooks no Supabase
check_webhooks() {
    local count=$(curl -s \
        -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrY2xlZ3ZycXByZXZjZGdvc2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODM0NDAsImV4cCI6MjA3NTE1OTQ0MH0.d4ldEvZEfufwnmw4koYR4fscu4rtRPXXiQvgRwPSdwA" \
        -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrY2xlZ3ZycXByZXZjZGdvc2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODM0NDAsImV4cCI6MjA3NTE1OTQ0MH0.d4ldEvZEfufwnmw4koYR4fscu4rtRPXXiQvgRwPSdwA" \
        "https://vkclegvrqprevcdgosan.supabase.co/rest/v1/webhook_events?select=count" \
        2>/dev/null | jq -r '.[0].count' 2>/dev/null)
    
    echo "$count"
}

# Contar webhooks inicial
INITIAL_COUNT=$(check_webhooks)
echo "📊 Webhooks já registrados: ${INITIAL_COUNT:-0}"
echo ""
echo "🔄 Monitorando novos webhooks... (Ctrl+C para sair)"
echo ""

# Loop de monitoramento
LAST_COUNT=$INITIAL_COUNT
while true; do
    CURRENT_COUNT=$(check_webhooks)
    
    if [ "$CURRENT_COUNT" != "$LAST_COUNT" ] && [ -n "$CURRENT_COUNT" ]; then
        NEW_WEBHOOKS=$((CURRENT_COUNT - LAST_COUNT))
        echo "🎉 [$(/bin/date '+%H:%M:%S')] NOVO WEBHOOK RECEBIDO! (+$NEW_WEBHOOKS)"
        
        # Buscar último webhook
        LAST_WEBHOOK=$(curl -s \
            -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrY2xlZ3ZycXByZXZjZGdvc2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODM0NDAsImV4cCI6MjA3NTE1OTQ0MH0.d4ldEvZEfufwnmw4koYR4fscu4rtRPXXiQvgRwPSdwA" \
            -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrY2xlZ3ZycXByZXZjZGdvc2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODM0NDAsImV4cCI6MjA3NTE1OTQ0MH0.d4ldEvZEfufwnmw4koYR4fscu4rtRPXXiQvgRwPSdwA" \
            "https://vkclegvrqprevcdgosan.supabase.co/rest/v1/webhook_events?select=*&order=received_at.desc&limit=1" \
            2>/dev/null)
        
        EVENT_TYPE=$(echo "$LAST_WEBHOOK" | jq -r '.[0].event_type' 2>/dev/null)
        RECEIVED_AT=$(echo "$LAST_WEBHOOK" | jq -r '.[0].received_at' 2>/dev/null)
        PROCESSED=$(echo "$LAST_WEBHOOK" | jq -r '.[0].processed' 2>/dev/null)
        
        echo "   📋 Tipo: $EVENT_TYPE"
        echo "   ⏰ Recebido: $RECEIVED_AT"
        echo "   ✅ Processado: $PROCESSED"
        echo ""
        
        LAST_COUNT=$CURRENT_COUNT
    fi
    
    sleep 2
done
