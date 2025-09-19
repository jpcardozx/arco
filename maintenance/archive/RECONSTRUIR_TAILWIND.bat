@echo off
REM Reconstruir o Tailwind CSS para o projeto ARCO
echo ===== ARCO Project - Reconstruir Tailwind CSS =====
echo Este script vai reconstruir o Tailwind CSS para resolver problemas de estilo
echo.
echo Pressione qualquer tecla para continuar ou feche a janela para cancelar...
pause > nul
powershell.exe -ExecutionPolicy Bypass -File "%~dp0\scripts\rebuild-tailwind.ps1"
echo.
echo Processo concluido! Pressione qualquer tecla para sair...
pause > nul
