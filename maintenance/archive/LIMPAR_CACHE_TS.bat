@echo off
echo Limpando cache do TypeScript e Next.js...

REM Encerrar processos Node.js em execução
echo Encerrando processos Node.js...
taskkill /F /IM node.exe /T 2>nul
if %errorlevel% equ 0 (
  echo Processos Node.js encerrados.
) else (
  echo Nenhum processo Node.js encontrado ou erro ao encerrar.
)

REM Remover diretórios de cache
echo Removendo diretórios de cache...
if exist .\node_modules\.cache (
  rmdir /S /Q .\node_modules\.cache
  echo Cache de node_modules removido.
)

if exist .\.next (
  rmdir /S /Q .\.next
  echo Pasta .next removida.
)

if exist .\tsconfig.tsbuildinfo (
  del /F /Q .\tsconfig.tsbuildinfo
  echo Arquivo tsconfig.tsbuildinfo removido.
)

echo.
echo Reinstalando dependências...
call npm install

echo.
echo Executando build do projeto...
call npm run build

echo.
echo Iniciando servidor de desenvolvimento...
start cmd /k npm run dev

echo.
echo Processo concluído. O servidor de desenvolvimento foi iniciado em uma nova janela.
echo.

pause
