#!/bin/bash

# =====================================================
# Setup Development Tunnel for Mercado Pago Webhooks
# =====================================================

set -e

echo "🚇 Setting up development tunnel for webhooks"
echo ""

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "📦 Installing ngrok..."
    npm install -g @ngrok/ngrok
fi

# Check if authenticated
if ! ngrok config check &> /dev/null; then
    echo ""
    echo "🔐 Ngrok authentication required"
    echo ""
    echo "1. Create free account: https://ngrok.com/signup"
    echo "2. Get authtoken: https://dashboard.ngrok.com/get-started/your-authtoken"
    echo "3. Run: ngrok config add-authtoken YOUR_TOKEN"
    echo ""
    read -p "Press Enter after authentication is complete..."
fi

echo ""
echo "🚀 Starting tunnel to localhost:3000..."
echo ""
echo "⚠️  Keep this terminal open while testing webhooks"
echo ""
echo "📋 Next steps:"
echo "1. Copy the HTTPS URL shown below"
echo "2. Add '/api/webhooks/mercadopago' to the end"
echo "3. Configure in Mercado Pago panel"
echo ""
echo "Press Ctrl+C to stop tunnel"
echo ""

# Start tunnel
ngrok http 3000 --log=stdout --log-level=info --log-format=term