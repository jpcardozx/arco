@echo off
echo Executando corretor de importacoes Link...
echo.

cd "%~dp0"
echo Diretorio atual: %cd%

echo Executando script fix-link-imports.js...
node scripts/fix-link-imports.js > fix-link-imports.log 2>&1

echo Execucao concluida.
echo Verifique o arquivo fix-link-imports.log para ver o resultado.

echo.
echo Agora vamos limpar o cache do Next.js e TypeScript...

REM Remover arquivos de cache
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

echo Tudo limpo! Pressione qualquer tecla para iniciar o servidor Next.js...
pause

REM Iniciar o servidor de desenvolvimento
start cmd /k npm run dev

echo.
echo Servidor iniciado em nova janela.
echo.
