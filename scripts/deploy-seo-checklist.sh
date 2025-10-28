#!/bin/bash

# =============================================================================
# DEPLOY CHECKLIST - SEO Implementation
# =============================================================================

echo "🚀 ARCO - Deploy Checklist para SEO"
echo "===================================="
echo ""

# 1. Build com sitemap
echo "📦 1. Building projeto com sitemap..."
pnpm build

if [ ! -f "public/sitemap.xml" ]; then
  echo "❌ ERRO: sitemap.xml não foi gerado!"
  exit 1
fi

echo "✅ Sitemap gerado: public/sitemap.xml"
echo ""

# 2. Verificar variáveis de ambiente
echo "🔐 2. Verificando variáveis de ambiente..."

required_vars=(
  "NEXT_PUBLIC_SUPABASE_URL"
  "SUPABASE_SERVICE_ROLE_KEY"
  "CRON_SECRET"
  "NEXT_PUBLIC_META_PIXEL_ID"
  "META_CONVERSION_API_ACCESS_TOKEN"
  "POSTHOG_API_KEY"
)

missing_vars=()
for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    missing_vars+=("$var")
  fi
done

if [ ${#missing_vars[@]} -gt 0 ]; then
  echo "⚠️  ATENÇÃO: Variáveis faltando (configure no Vercel):"
  for var in "${missing_vars[@]}"; do
    echo "   - $var"
  done
else
  echo "✅ Todas as variáveis configuradas"
fi
echo ""

# 3. Verificar arquivos SEO
echo "📄 3. Verificando arquivos de SEO..."

seo_files=(
  "next-sitemap.config.js"
  "vercel.json"
  "src/components/seo/local-business-schema.tsx"
  "src/lib/google-search-console.ts"
  "src/app/api/seo/sync-daily/route.ts"
)

missing_files=()
for file in "${seo_files[@]}"; do
  if [ ! -f "$file" ]; then
    missing_files+=("$file")
  fi
done

if [ ${#missing_files[@]} -gt 0 ]; then
  echo "❌ ERRO: Arquivos faltando:"
  for file in "${missing_files[@]}"; do
    echo "   - $file"
  done
  exit 1
else
  echo "✅ Todos os arquivos SEO presentes"
fi
echo ""

# 4. Checklist pós-deploy
echo "📋 4. CHECKLIST PÓS-DEPLOY"
echo "=========================="
echo ""
echo "Após o deploy na Vercel, execute:"
echo ""
echo "✅ 1. Verificar sitemap acessível:"
echo "   curl https://www.consultingarco.com/sitemap.xml"
echo ""
echo "✅ 2. Verificar robots.txt:"
echo "   curl https://www.consultingarco.com/robots.txt"
echo ""
echo "✅ 3. Verificar Schema.org (view-source):"
echo "   https://www.consultingarco.com/"
echo "   Busque por: 'application/ld+json'"
echo ""
echo "✅ 4. Submeter sitemap ao Search Console:"
echo "   node scripts/submit-sitemap.js"
echo ""
echo "✅ 5. Configurar variáveis no Vercel:"
echo "   - CRON_SECRET"
echo "   - GOOGLE_SERVICE_ACCOUNT_KEY (quando criar)"
echo ""
echo "✅ 6. Testar endpoint de sincronização:"
echo "   curl -H 'Authorization: Bearer SEU_CRON_SECRET' \\"
echo "        https://www.consultingarco.com/api/seo/sync-daily"
echo ""
echo "===================================="
echo "🎯 Deploy pronto! Siga o checklist acima."
