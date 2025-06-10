@echo off
echo ===== ARCO Project - Reconstruir Tailwind CSS (Metodo Manual) =====
echo Este script vai reconstruir manualmente o Tailwind CSS para resolver problemas de estilo
echo.

REM Navegue para o diretorio do projeto
cd /d "%~dp0"

REM Certifique-se de que o Tailwind esta instalado corretamente
echo Verificando instalacao do Tailwind...
call npm list tailwindcss || (
    echo Instalando Tailwind CSS v3.3.0...
    call npm install -D tailwindcss@3.3.0 postcss@8.4.31 autoprefixer@10.4.14
)

REM Execute o script personalizado
echo.
echo Executando script de reconstrucao do Tailwind...
node scripts\manual-rebuild-tailwind.js

echo.
echo Processo concluido! Pressione qualquer tecla para sair...
pause > nul
