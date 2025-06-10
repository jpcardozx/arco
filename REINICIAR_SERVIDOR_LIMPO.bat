@echo off
echo Reiniciando o servidor de desenvolvimento do ARCO...

REM Encontrar e encerrar processos Next.js
echo Verificando se há processos Next.js em execução...
tasklist /fi "imagename eq node.exe" | find "node.exe" > nul
if %errorlevel% equ 0 (
    echo Encerrando processos Next.js...
    for /f "tokens=2" %%i in ('tasklist /fi "imagename eq node.exe" /fo table /nh') do (
        taskkill /PID %%i /F /T
    )
) else (
    echo Nenhum processo Node.js encontrado.
)

echo.
echo Iniciando o servidor de desenvolvimento...
echo.
npm run dev

pause
