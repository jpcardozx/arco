#!/bin/bash

################################################################################
# Git Pre-commit Security Hook
#
# Previne commit de tokens, keys e dados sensíveis
# Instalação: cp scripts/pre-commit-security-check.sh .git/hooks/pre-commit
#             chmod +x .git/hooks/pre-commit
################################################################################

RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

errors=0

echo ""
echo "🔒 Security check..."
echo ""

# Check for Meta Access Tokens (EAAxxxxxx...)
if git diff --cached | grep -E "EAA[A-Za-z0-9_-]{100,}"; then
  echo -e "${RED}❌ ERRO: Meta Access Token detectado!${NC}"
  echo "   Remova tokens antes de commitar"
  echo "   Use: git reset HEAD <file>"
  echo ""
  errors=$((errors + 1))
fi

# Check for JWT tokens
if git diff --cached | grep -E "eyJ[A-Za-z0-9_-]{100,}"; then
  echo -e "${YELLOW}⚠️  AVISO: JWT Token detectado (Supabase key?)${NC}"
  echo "   Verifique se é um token sensível"
  echo "   JWT tokens públicos (anon key) podem ser OK"
  echo "   Mas service_role keys NUNCA devem ser comitadas"
  echo ""
  errors=$((errors + 1))
fi

# Check for AWS keys
if git diff --cached | grep -E "AKIA[0-9A-Z]{16}"; then
  echo -e "${RED}❌ ERRO: AWS Access Key ID detectado!${NC}"
  errors=$((errors + 1))
fi

# Check for private keys
if git diff --cached | grep -E "BEGIN RSA PRIVATE KEY|BEGIN PRIVATE KEY|BEGIN OPENSSH PRIVATE KEY"; then
  echo -e "${RED}❌ ERRO: Private key detectado!${NC}"
  errors=$((errors + 1))
fi

# Check for database passwords/connection strings
if git diff --cached | grep -iE "password\s*[:=]\s*['\"][^'\"]{8,}['\"]"; then
  echo -e "${RED}❌ ERRO: Possível senha/connection string detectado!${NC}"
  errors=$((errors + 1))
fi

# Check for .env files
if git diff --cached --name-only | grep -E "\.env\.(local|production|development)$"; then
  echo -e "${RED}❌ ERRO: Arquivo .env não deve ser comitado!${NC}"
  git diff --cached --name-only | grep -E "\.env\."
  errors=$((errors + 1))
fi

if [ $errors -gt 0 ]; then
  echo ""
  echo -e "${RED}════════════════════════════════════════════════════${NC}"
  echo -e "${RED}🚫 Commit bloqueado por razões de segurança${NC}"
  echo -e "${RED}════════════════════════════════════════════════════${NC}"
  echo ""
  echo "Se você tem certeza que pode commitar:"
  echo "  git commit --no-verify"
  echo ""
  exit 1
else
  echo -e "${GREEN}✅ Nenhum token/secret detectado${NC}"
  echo ""
  exit 0
fi
