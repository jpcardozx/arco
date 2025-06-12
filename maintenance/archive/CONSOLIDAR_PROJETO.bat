@echo off
REM Script simplificado para executar a consolidação do projeto ARCO

echo.
echo ===== CONSOLIDACAO INTELIGENTE DO PROJETO ARCO =====
echo.
echo Este script consolidara os componentes e reorganizara o projeto
echo aproveitando a riqueza dos componentes existentes e simplificando
echo a estrutura das paginas inter-relacionadas.
echo.
echo Acao:
echo  1. Reorganizara os componentes em categorias logicas
echo  2. Unificara componentes duplicados mantendo a melhor versao
echo  3. Implementara um sistema de design consistente
echo  4. Corrigira problemas de ESLint e Tailwind
echo.
echo ATENCAO: Este processo modificara varios arquivos no projeto. 
echo Certifique-se de ter um backup ou commits recentes.
echo.
echo Pressione qualquer tecla para continuar ou CTRL+C para cancelar...
pause > nul

echo.
echo Iniciando processo de consolidacao...
echo.

REM Executar script principal de consolidação
node scripts/consolidate-project.js

echo.
echo ===== PROCESSO CONCLUIDO =====
echo.
echo Para iniciar o servidor de desenvolvimento:
echo   npm run dev
echo.
echo Para verificar problemas pendentes:
echo   npm run lint
echo.

pause
