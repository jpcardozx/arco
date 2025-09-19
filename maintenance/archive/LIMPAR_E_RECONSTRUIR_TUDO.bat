@echo off
echo ===== ARCO Project - Limpeza Completa e Reconstrucao =====
echo Este script vai limpar o cache e reconstruir o projeto para resolver problemas de renderizacao
echo.
echo Pressione qualquer tecla para continuar ou feche a janela para cancelar...
pause > nul

echo ===== Instalando rimraf como dependencia para remocao recursiva =====
call npm install rimraf --save-dev

echo ===== Iniciando processo de limpeza e reconstrucao =====
node limpar-e-reconstruir.js

echo ===== Processo concluido! =====
echo Execute 'npm run dev' para iniciar o servidor de desenvolvimento
echo.
echo Pressione qualquer tecla para sair...
pause > nul
