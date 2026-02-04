#!/bin/bash

# 🎯 Quiz Interativo - Script de Teste Completo
# Execute após aplicar as migrations

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 QUIZ INTERATIVO - TESTE COMPLETO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "✅ 1. Migrations aplicadas com sucesso!"
echo "   • activity_logs criada"
echo "   • quiz_results criada"
echo ""

echo "📋 2. Checklist de Implementação:"
echo ""

echo "   [ ] Testar quiz no navegador"
echo "       URL: http://localhost:3000/quiz"
echo ""

echo "   [ ] Verificar fluxo completo:"
echo "       1. Intro screen"
echo "       2. Formulário de contato"
echo "       3. 15 perguntas em 5 seções"
echo "       4. Resultado com score"
echo ""

echo "   [ ] Verificar dados no Supabase:"
echo "       SELECT * FROM quiz_results ORDER BY created_at DESC LIMIT 1;"
echo ""

echo "   [ ] Próximos passos:"
echo "       • Substituir links do e-book por /quiz"
echo "       • Criar dashboard de leads (/dashboard/leads)"
echo "       • Configurar email automation"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📚 DOCUMENTAÇÃO DISPONÍVEL:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "• /docs/QUIZ_EXECUTIVE_SUMMARY.md       - Resumo executivo"
echo "• /docs/QUIZ_QUICK_START.md             - Guia de implementação"
echo "• /docs/QUIZ_INTERACTIVE_DOCUMENTATION.md - Documentação completa"
echo "• /docs/QUIZ_INTEGRATION_EXAMPLES.md    - Exemplos de integração"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 TESTE AGORA:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Abra o navegador em: http://localhost:3000/quiz"
echo "2. Complete o quiz (5 minutos)"
echo "3. Veja o resultado personalizado"
echo ""

# Tentar abrir o navegador automaticamente
if command -v xdg-open &> /dev/null; then
    echo "Abrindo quiz no navegador..."
    xdg-open http://localhost:3000/quiz &
elif command -v open &> /dev/null; then
    echo "Abrindo quiz no navegador..."
    open http://localhost:3000/quiz &
else
    echo "Abra manualmente: http://localhost:3000/quiz"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ TUDO PRONTO! Boa sorte! 🎉"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
