#!/bin/bash

# Script para aplicar migrations do backend
# Implementa RLS com roles, funções RPC e audit log

echo "🚀 Iniciando implementação do backend..."
echo ""

# Verificar se Supabase CLI está instalado (via npx)
if ! npx supabase --version &> /dev/null; then
    echo "❌ Supabase CLI não encontrado!"
    echo "   Instale com: pnpm add -D supabase"
    exit 1
fi

SUPABASE_VERSION=$(npx supabase --version)
echo "✅ Supabase CLI encontrado (v${SUPABASE_VERSION})"
echo ""

# Verificar se está em um projeto Supabase
if [ ! -f "supabase/config.toml" ]; then
    echo "❌ Não é um projeto Supabase!"
    echo "   Execute 'supabase init' primeiro"
    exit 1
fi

echo "📋 Migrations a serem aplicadas:"
echo "   1. 20250104000004_add_admin_policies.sql"
echo "   2. 20250104000005_add_users_and_functions.sql"
echo "   3. 20250104000006_add_audit_log.sql"
echo ""

read -p "Deseja continuar? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Operação cancelada"
    exit 0
fi

echo ""
echo "🔄 Aplicando migrations..."
echo ""

# Aplicar migrations
npx supabase db push

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Migrations aplicadas com sucesso!"
    echo ""
    echo "📊 O que foi implementado:"
    echo ""
    echo "   🔐 SEGURANÇA:"
    echo "      ✓ Policies RLS para admin em todas as tabelas"
    echo "      ✓ Admins podem ver/editar todos os dados"
    echo "      ✓ Users continuam vendo apenas seus dados"
    echo ""
    echo "   📊 ANALYTICS:"
    echo "      ✓ Função get_admin_stats()"
    echo "      ✓ Função get_conversion_metrics()"
    echo "      ✓ Função get_monthly_revenue()"
    echo "      ✓ Função get_recent_activity()"
    echo ""
    echo "   👥 USER MANAGEMENT:"
    echo "      ✓ Tabela public.users com roles"
    echo "      ✓ RLS configurado para users"
    echo "      ✓ Admins podem gerenciar todos os users"
    echo ""
    echo "   📝 AUDIT LOG:"
    echo "      ✓ Tabela audit_log criada"
    echo "      ✓ Triggers automáticos em clients, tasks, leads, users"
    echo "      ✓ Função get_audit_log() com filtros"
    echo "      ✓ Função get_record_history()"
    echo "      ✓ Função cleanup_old_audit_logs()"
    echo ""
    echo "🎯 Próximos passos:"
    echo ""
    echo "   1. Testar no dashboard de admin"
    echo "   2. Criar primeiro usuário admin no Supabase"
    echo "   3. Verificar se dados reais aparecem"
    echo ""
    echo "🔑 Criar usuário admin:"
    echo "   1. Acesse: Supabase Dashboard > Authentication > Users"
    echo "   2. Clique em um usuário"
    echo "   3. Vá em 'User Metadata'"
    echo "   4. Adicione: { \"role\": \"admin\" }"
    echo "   5. Save"
    echo ""
else
    echo ""
    echo "❌ Erro ao aplicar migrations!"
    echo "   Verifique os logs acima para detalhes"
    exit 1
fi
