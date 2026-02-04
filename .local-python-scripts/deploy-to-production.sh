#!/bin/bash

# 🎯 Quick Deploy to Production
# Execute este script para fazer deploy completo

set -e

echo "🚀 DEPLOY PARA PRODUÇÃO - ARCO"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Verificar ambiente local
echo "📋 Step 1/5: Verificando ambiente local..."
if ! npx supabase status &> /dev/null; then
    echo -e "${RED}❌ Supabase local não está rodando!${NC}"
    echo "Execute: npx supabase start"
    exit 1
fi
echo -e "${GREEN}✅ Ambiente local OK${NC}"
echo ""

# 2. Link com produção
echo "📋 Step 2/5: Linkando com projeto remoto..."
if npx supabase projects list &> /dev/null; then
    echo -e "${GREEN}✅ Já linkado ao projeto remoto${NC}"
else
    echo "Linkando ao projeto..."
    npx supabase link --project-ref vkclegvrqprevcdgosan
fi
echo ""

# 3. Confirmar push
echo "📋 Step 3/5: Migrations a serem aplicadas em PRODUÇÃO:"
npx supabase migration list --local | grep "20250104000004\|20250104000005\|20250104000006"
echo ""
echo -e "${YELLOW}⚠️  ATENÇÃO: Você está prestes a aplicar migrations em PRODUÇÃO!${NC}"
echo ""
read -p "Deseja continuar? (digite 'yes' para confirmar) " -r
echo ""

if [[ ! $REPLY == "yes" ]]; then
    echo -e "${RED}❌ Deploy cancelado${NC}"
    exit 0
fi

# 4. Push migrations
echo "📋 Step 4/5: Aplicando migrations em produção..."
npx supabase db push

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Migrations aplicadas com sucesso!${NC}"
else
    echo -e "${RED}❌ Erro ao aplicar migrations${NC}"
    exit 1
fi
echo ""

# 5. Instruções finais
echo "📋 Step 5/5: Configuração final"
echo ""
echo -e "${GREEN}✅ Backend deployado com sucesso!${NC}"
echo ""
echo "🎯 Próximos passos MANUAIS:"
echo ""
echo "1. Criar usuário admin:"
echo "   → https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/auth/users"
echo "   → Clique no seu usuário"
echo "   → User Metadata > Edit"
echo "   → Adicione: { \"role\": \"admin\" }"
echo ""
echo "2. Verificar RLS em produção:"
echo "   → https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/database/policies"
echo ""
echo "3. Testar funções RPC:"
echo "   → https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/database/functions"
echo ""
echo "4. Deploy do frontend:"
echo "   → git push origin main"
echo "   → Ou: vercel --prod"
echo ""
echo "5. Testar em produção:"
echo "   → Acesse seu dashboard"
echo "   → Verifique se dados reais aparecem"
echo "   → Teste audit log"
echo ""
echo -e "${GREEN}🎉 Deploy concluído!${NC}"
