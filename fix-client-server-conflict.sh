#!/bin/bash

# Script para corrigir conflito entre 'use client' e exports de Server Component
# Remove linhas problemáticas de páginas Client Component

echo "🔧 Corrigindo conflitos use client + server exports..."
echo ""

fixed_count=0

# Encontra todas as páginas .tsx
while IFS= read -r file; do
  # Verifica se tem 'use client'
  if grep -q "use client" "$file"; then
    # Verifica se tem exports problemáticos
    if grep -q "export const dynamic" "$file" || \
       grep -q "export const dynamicParams" "$file" || \
       grep -q "generateStaticParams" "$file"; then

      echo "📝 Corrigindo: $file"

      # Cria backup
      cp "$file" "$file.backup"

      # Remove as linhas problemáticas:
      # 1. export const dynamic = ...
      # 2. export const dynamicParams = ...
      # 3. export async function generateStaticParams() { ... }
      # 4. Linhas vazias extras resultantes

      # Usa sed para remover as linhas
      sed -i '/^export const dynamic = /d' "$file"
      sed -i '/^export const dynamicParams = /d' "$file"
      sed -i '/^export async function generateStaticParams/,/^}/d' "$file"

      # Remove múltiplas linhas vazias consecutivas (deixa no máximo 2)
      sed -i '/^$/N;/^\n$/N;/^\n\n$/d' "$file"

      ((fixed_count++))
    fi
  fi
done < <(find src/app -name "page.tsx" -type f)

echo ""
echo "✅ Correção concluída!"
echo "📊 Arquivos corrigidos: $fixed_count"
echo "💾 Backups salvos como: *.backup"
echo ""
echo "Para reverter se necessário: find src/app -name '*.backup' -exec bash -c 'mv \"\$0\" \"\${0%.backup}\"' {} \;"
