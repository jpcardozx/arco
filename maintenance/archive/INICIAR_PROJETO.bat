@echo off
REM Iniciar o ARCO Project corretamente
echo ===== ARCO Project - Inicializacao =====
echo Este script limpara o cache e iniciara o servidor de desenvolvimento
echo.
echo Pressione qualquer tecla para continuar ou feche a janela para cancelar...
pause > nul
powershell.exe -ExecutionPolicy Bypass -File "%~dp0\scripts\start-dev.ps1"
