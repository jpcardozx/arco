#!/bin/bash

# =====================================================
# Complete Ngrok Setup with Authentication
# =====================================================

set -e

echo "🚇 Complete Ngrok Setup for MP Webhooks"
echo ""

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok not found. Installing..."
    sudo snap install ngrok
    echo "✅ ngrok installed"
fi

echo "📋 Ngrok Setup Steps:"
echo ""
echo "1. Create free ngrok account:"
echo "   👉 https://ngrok.com/signup"
echo ""
echo "2. Get your authtoken:"
echo "   👉 https://dashboard.ngrok.com/get-started/your-authtoken"
echo ""
echo "3. Configure authtoken:"
read -p "Paste your ngrok authtoken here: " AUTHTOKEN

if [ -z "$AUTHTOKEN" ]; then
    echo "❌ Authtoken is required"
    exit 1
fi

# Configure authtoken
ngrok config add-authtoken "$AUTHTOKEN"
echo "✅ Authtoken configured"

echo ""
echo "🚀 Starting dev server..."

# Start dev server in background
pnpm dev &
DEV_PID=$!

# Wait for server to start
echo "⏳ Waiting for dev server to start..."
sleep 5

# Check if server is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Dev server running on http://localhost:3000"
else
    echo "❌ Dev server failed to start"
    kill $DEV_PID 2>/dev/null || true
    exit 1
fi

echo ""
echo "🚇 Creating tunnel..."

# Start ngrok tunnel
ngrok http 3000 --log=stdout --log-level=warn &
NGROK_PID=$!

# Wait for ngrok to start
sleep 3

# Get tunnel URL
TUNNEL_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url // empty')

if [ -z "$TUNNEL_URL" ]; then
    echo "❌ Failed to get tunnel URL"
    kill $NGROK_PID $DEV_PID 2>/dev/null || true
    exit 1
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    TUNNEL READY ✅                         ║"
echo "╠════════════════════════════════════════════════════════════╣"
echo "║                                                            ║"
echo "║  🌐 Public URL:                                            ║"
echo "║     $TUNNEL_URL"
echo "║                                                            ║"
echo "║  🔔 Webhook URL for Mercado Pago:                          ║"
echo "║     ${TUNNEL_URL}/api/webhooks/mercadopago                 ║"
echo "║                                                            ║"
echo "║  📊 Ngrok Dashboard:                                       ║"
echo "║     http://localhost:4040                                  ║"
echo "║                                                            ║"
echo "╠════════════════════════════════════════════════════════════╣"
echo "║  📋 Next Steps:                                            ║"
echo "║                                                            ║"
echo "║  1. Copy webhook URL above                                 ║"
echo "║  2. Go to: https://www.mercadopago.com.br/developers/panel║"
echo "║  3. Configure webhook with URL                             ║"
echo "║  4. Generate secret signature                              ║"
echo "║  5. Add secret to .env.local                               ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "⚠️  Keep this terminal open while testing"
echo "⚠️  Press Ctrl+C to stop tunnel and dev server"
echo ""

# Keep running until interrupted
trap 'echo ""; echo "🛑 Stopping tunnel and dev server..."; kill $NGROK_PID $DEV_PID 2>/dev/null || true; exit 0' INT

wait $NGROK_PID