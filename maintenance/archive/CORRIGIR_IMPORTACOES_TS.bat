@echo off
echo Corrigindo problemas de importacao TypeScript...

node scripts/fix-ts-imports.js

echo.
echo Script concluido. Reiniciando o servidor Next.js...
echo.

REM Encerrar processos Node.js em execucao
taskkill /F /IM node.exe /T 2>nul
if %errorlevel% equ 0 (
  echo Processos Node.js encerrados.
) else (
  echo Nenhum processo Node.js encontrado ou erro ao encerrar.
)

REM Iniciar o servidor Next.js
start cmd /k npm run dev

echo Servidor reiniciado em uma nova janela.
echo.

pause
