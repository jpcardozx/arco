@echo off
REM Este script verifica a compatibilidade entre NextUI e Tailwind CSS
echo ===== ARCO Project - Verificador de Compatibilidade NextUI/Tailwind =====
echo Este script analisa possíveis incompatibilidades entre o NextUI e o Tailwind CSS
echo.

echo Executando verificador...
node scripts/check-nextui-compatibility.js
echo.

echo ===== Verificação concluída =====
echo Pressione qualquer tecla para sair...
pause > nul
