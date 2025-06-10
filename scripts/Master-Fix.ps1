# ARCO Project - Master Fix Script
# Este script executa todos os processos de correção para o projeto ARCO

Write-Host "==== ARCO Project Master Fix Process ====" -ForegroundColor Magenta
Write-Host "Este script irá executar uma série de correções para resolver problemas no projeto ARCO" -ForegroundColor Cyan

# Verifica se o usuário deseja continuar
$continue = Read-Host "Este processo pode demorar vários minutos. Deseja continuar? (S/N)"
if ($continue -ne "S" -and $continue -ne "s") {
    Write-Host "Processo cancelado pelo usuário." -ForegroundColor Yellow
    exit
}

# Define o diretório raiz do projeto
$projectRoot = $PSScriptRoot | Split-Path -Parent
Write-Host "Diretório do projeto: $projectRoot" -ForegroundColor Cyan

# Fase 1: Correções de estrutura e importações
Write-Host "`n==== Fase 1: Verificando estrutura do projeto ====" -ForegroundColor Blue

# Verifica se há arquivos duplicados na raiz do componente e na src/components
if (Test-Path "$projectRoot\src\components") {
    Write-Host "Verificando arquivos duplicados entre componentes em raiz e src..." -ForegroundColor Yellow
    
    # Lista componentes na raiz
    $rootComponents = Get-ChildItem "$projectRoot\components\*.tsx" -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Name
    
    # Lista componentes em src
    $srcComponents = Get-ChildItem "$projectRoot\src\components\*.tsx" -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Name
    
    # Encontra duplicações
    $duplicates = $rootComponents | Where-Object { $srcComponents -contains $_ }
    
    if ($duplicates.Count -gt 0) {
        Write-Host "Encontrados $($duplicates.Count) componentes duplicados:" -ForegroundColor Yellow
        $duplicates | ForEach-Object { Write-Host "- $_" -ForegroundColor Yellow }
    } else {
        Write-Host "✓ Não foram encontrados componentes duplicados" -ForegroundColor Green
    }
}

# Fase 2: Corrigir problemas do ESLint
Write-Host "`n==== Fase 2: Corrigindo problemas do ESLint ====" -ForegroundColor Blue
& "$projectRoot\scripts\Fix-ESLint.ps1"

# Fase 3: Corrigir problemas do Tailwind
Write-Host "`n==== Fase 3: Corrigindo problemas do Tailwind CSS ====" -ForegroundColor Blue
& "$projectRoot\scripts\Fix-Tailwind.ps1"

# Fase 4: Verificar a integridade do projeto
Write-Host "`n==== Fase 4: Verificando integridade do projeto ====" -ForegroundColor Blue

# Verifica se há erros no TypeScript
Write-Host "Verificando erros de TypeScript..." -ForegroundColor Yellow
tsc --noEmit

# Verifica se há erros no ESLint
Write-Host "`nVerificando erros do ESLint..." -ForegroundColor Yellow
npx eslint . --format=stylish || Write-Host "ESLint ainda encontrou problemas que podem exigir correção manual." -ForegroundColor Yellow

# Resumo e próximos passos
Write-Host "`n==== Processo de Correção Completo ====" -ForegroundColor Magenta
Write-Host "O processo de correção foi concluído." -ForegroundColor Green
Write-Host "`nPróximos Passos:" -ForegroundColor Cyan
Write-Host "1. Execute 'npm run dev' para iniciar o servidor de desenvolvimento" -ForegroundColor White
Write-Host "2. Verifique se as classes do Tailwind estão sendo aplicadas corretamente" -ForegroundColor White
Write-Host "3. Consulte o arquivo RESTAURACAO_ARCO.md para mais detalhes sobre as mudanças" -ForegroundColor White

Write-Host "`nProblemas remanescentes podem exigir correção manual. Consulte a documentação para mais informações." -ForegroundColor Yellow
