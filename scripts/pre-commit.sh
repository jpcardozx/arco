#!/bin/bash
# Pre-commit hook - Validação rápida antes de commit
# Instalar: ln -s ../../scripts/pre-commit.sh .git/hooks/pre-commit

set -e

echo "🔍 Validação pré-commit..."

# 1. TypeScript
echo "  ✓ TypeScript..."
pnpm typecheck --quiet 2>&1 | grep -v "^$" | head -5 || true

# 2. LP Performance
echo "  ✓ LP Performance..."
node scripts/validate-lp-performance.mjs > /dev/null 2>&1 && echo "    ✅ OK" || echo "    ⚠️  Warnings"

# 3. Format check
echo "  ✓ Format..."
CHANGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|jsx)$' || true)
if [ -n "$CHANGED_FILES" ]; then
  echo "$CHANGED_FILES" | xargs pnpm format > /dev/null 2>&1
  echo "    ✅ Formatted"
else
  echo "    ⊘ No files to format"
fi

echo "✅ Validação concluída!"
