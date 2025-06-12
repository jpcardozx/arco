@echo off
echo ===== ARCO Project Fix =====
echo Este script executara a correcao completa do projeto ARCO
echo.
echo Pressione qualquer tecla para continuar ou feche a janela para cancelar...
pause > nul
powershell.exe -ExecutionPolicy Bypass -File "%~dp0\scripts\master-repair.ps1"
echo.
echo Processo concluido! Pressione qualquer tecla para sair...
pause > nul
