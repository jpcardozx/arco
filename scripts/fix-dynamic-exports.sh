#!/bin/bash

# Remove 'export const dynamic' de componentes client
# Esse export só é necessário em Server Components

echo "🔧 Removendo 'export const dynamic' de Client Components..."

files=(
  "src/app/dashboard/checklist/page.tsx"
  "src/app/dashboard/overview/page.tsx"
  "src/app/dashboard/plano-de-acao/page.tsx"
  "src/app/dashboard/saude/page.tsx"
  "src/app/dashboard/diagnostico/page.tsx"
  "src/app/dashboard/leads/page.tsx"
  "src/app/dashboard/finance/page.tsx"
  "src/app/dashboard/checklist/[id]/page.tsx"
  "src/app/dashboard/page.tsx"
  "src/app/dashboard/cloud/page.tsx"
  "src/app/dashboard/diagnostico/[id]/page.tsx"
  "src/app/dashboard/funil/page.tsx"
  "src/app/dashboard/operacoes/page.tsx"
  "src/app/dashboard/mail/page.tsx"
  "src/app/dashboard/crescimento/page.tsx"
  "src/app/dashboard/users/page.tsx"
  "src/app/dashboard/campaigns/page.tsx"
  "src/app/dashboard/documents/page.tsx"
  "src/app/dashboard/settings/page.tsx"
  "src/app/dashboard/whatsapp/page.tsx"
)

count=0
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    # Remove lines with 'export const dynamic'
    sed -i "/^export const dynamic = /d" "$file"
    echo "✅ $file"
    ((count++))
  fi
done

echo ""
echo "✨ Processados $count arquivos"
echo "🎯 Client Components não precisam de 'export const dynamic'"
