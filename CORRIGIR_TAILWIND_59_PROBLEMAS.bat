@echo off
echo ===== Corrigir Problemas do Tailwind CSS =====
echo.

echo 1. Limpando cache do Next.js...
if exist .next rmdir /s /q .next
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo.
echo 2. Verificando classes do Tailwind...
echo - As classes do Tailwind foram instaladas nos arquivos:
echo   - src/app/tailwind-utilities.css
echo   - src/app/additional-tailwind-utilities.css
echo.

echo 3. Executando o linter para verificar outros problemas...
call npm run lint

echo.
echo 4. Reiniciando o servidor de desenvolvimento...
start cmd /c "npm run dev"

echo.
echo ===== Instruções Adicionais =====
echo.
echo Se ainda estiver com problemas no Tailwind:
echo 1. Verifique se os componentes estão usando classes corretas do Tailwind
echo 2. Adicione classes específicas faltantes ao arquivo src/app/additional-tailwind-utilities.css
echo 3. Verifique se não há conflitos de CSS em outros arquivos de estilo
echo.
echo Se tudo falhar, adicione manualmente os estilos necessários a um componente específico.

pause
