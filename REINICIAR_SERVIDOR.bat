@echo off
echo ===== Reiniciando servidor Next.js com Tailwind CSS corrigido =====
echo.

echo Limpando caches...
if exist .next rmdir /s /q .next
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo.
echo Iniciando servidor Next.js...
npm run dev

pause
