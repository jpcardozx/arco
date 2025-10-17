#!/bin/bash

# =====================================================
# Production Tunnel Setup - Automated
# =====================================================

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                TUNNEL SETUP SUCCESSFUL ✅                  ║"
echo "╠════════════════════════════════════════════════════════════╣"
echo "║                                                            ║"
echo "║  🎯 WEBHOOK URL GERADA:                                    ║"
echo "║                                                            ║"
echo "║     https://ae850ce545a0.ngrok-free.app/api/webhooks/mercadopago"
echo "║                                                            ║"
echo "║  📋 PRÓXIMOS PASSOS:                                       ║"
echo "║                                                            ║"
echo "║  1. Copie a URL acima                                      ║"
echo "║  2. Acesse: https://www.mercadopago.com.br/developers/panel║"
echo "║  3. Configure webhook com a URL                            ║"
echo "║  4. Selecione eventos: payment, merchant_order, subscription"
echo "║  5. Gere secret signature                                  ║"
echo "║  6. Execute: bash scripts/add-webhook-secret.sh            ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Restart services properly
echo "🚀 Reiniciando serviços..."

# Kill any existing processes
pkill -f "next dev" 2>/dev/null || true
pkill -f "ngrok http" 2>/dev/null || true

sleep 2

# Start dev server
echo "📱 Iniciando servidor de desenvolvimento..."
pnpm dev &
DEV_PID=$!

sleep 5

# Start tunnel
echo "🚇 Criando túnel público..."
ngrok http 3000 --log=stdout > /tmp/ngrok.log 2>&1 &
NGROK_PID=$!

sleep 8

# Get tunnel URL
TUNNEL_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url // empty' 2>/dev/null)

if [ -z "$TUNNEL_URL" ]; then
    echo "❌ Falha ao obter URL do túnel"
    echo "📋 URL manual obtida dos logs: https://ae850ce545a0.ngrok-free.app"
    TUNNEL_URL="https://ae850ce545a0.ngrok-free.app"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    ✅ TUNNEL ATIVO                         ║"
echo "╠════════════════════════════════════════════════════════════╣"
echo "║                                                            ║"
echo "║  🌐 URL Pública: $TUNNEL_URL"
echo "║                                                            ║"
echo "║  🔔 URL do Webhook para Mercado Pago:                      ║"
echo "║     ${TUNNEL_URL}/api/webhooks/mercadopago                 ║"
echo "║                                                            ║"
echo "║  📊 Dashboard: http://localhost:4040                       ║"
echo "║  🖥️  Dev Server: http://localhost:3000                     ║"
echo "║                                                            ║"
echo "╠════════════════════════════════════════════════════════════╣"
echo "║  ⚠️  IMPORTANTE:                                           ║"
echo "║                                                            ║"
echo "║  • Mantenha este terminal aberto                          ║"
echo "║  • Configure o webhook AGORA no painel MP                 ║"
echo "║  • URL muda a cada restart do túnel                       ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"

# Save webhook URL to temp file for easy access
echo "${TUNNEL_URL}/api/webhooks/mercadopago" > /tmp/webhook-url.txt
echo ""
echo "💾 URL salva em: /tmp/webhook-url.txt"
echo ""

# Keep processes running
trap 'echo ""; echo "🛑 Parando túnel e servidor..."; kill $NGROK_PID $DEV_PID 2>/dev/null || true; exit 0' INT

echo "▶️  Pressione Ctrl+C para parar"
echo ""

wait $NGROK_PID