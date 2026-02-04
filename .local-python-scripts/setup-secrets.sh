#!/bin/bash

# Script para configurar secrets no Supabase
# Uso: ./scripts/setup-secrets.sh

set -e

echo "🔐 Configurando Supabase Secrets..."

# Obter variáveis do .env.local
if [ ! -f .env.local ]; then
  echo "❌ Arquivo .env.local não encontrado"
  exit 1
fi

# Extrair META_CONVERSION_API_TOKEN
META_TOKEN=$(grep "^META_CONVERSION_API_TOKEN=" .env.local | cut -d= -f2)

if [ -z "$META_TOKEN" ]; then
  echo "❌ META_CONVERSION_API_TOKEN não encontrado em .env.local"
  exit 1
fi

echo "✅ Token encontrado (comprimento: ${#META_TOKEN})"

# Configurar no Supabase
echo "📤 Enviando para Supabase Secrets..."
npx supabase secrets set META_CONVERSION_API_TOKEN="$META_TOKEN"

echo "✅ Secrets configurados com sucesso!"
echo ""
echo "📊 Verificando..."
npx supabase secrets list
