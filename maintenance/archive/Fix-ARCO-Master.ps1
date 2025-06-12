# ARCO Project - Master Fix Script
# Este script executa todos os processos de correcao para o projeto ARCO

Write-Host "==== ARCO Project Master Fix Process ====" -ForegroundColor Magenta
Write-Host "Este script ira executar uma serie de correcoes para resolver problemas no projeto ARCO" -ForegroundColor Cyan

# Verifica se o usuario deseja continuar
$continue = Read-Host "Este processo pode demorar varios minutos. Deseja continuar? (S/N)"
if ($continue -ne "S" -and $continue -ne "s") {
    Write-Host "Processo cancelado pelo usuario." -ForegroundColor Yellow
    exit
}

# Define o diretorio raiz do projeto
$projectRoot = $PSScriptRoot | Split-Path -Parent
Write-Host "Diretorio do projeto: $projectRoot" -ForegroundColor Cyan

# Fase 1: Correcoes de estrutura e importacoes
Write-Host "`n==== Fase 1: Verificando estrutura do projeto ====" -ForegroundColor Blue

# Verifica se ha arquivos duplicados na raiz do componente e na src/components
if (Test-Path "$projectRoot\src\components") {
    Write-Host "Verificando arquivos duplicados entre componentes em raiz e src..." -ForegroundColor Yellow
    
    # Lista componentes na raiz
    $rootComponents = Get-ChildItem "$projectRoot\components\*.tsx" -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Name
    
    # Lista componentes em src
    $srcComponents = Get-ChildItem "$projectRoot\src\components\*.tsx" -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Name
    
    # Encontra duplicacoes
    $duplicates = $rootComponents | Where-Object { $srcComponents -contains $_ }
    
    if ($duplicates.Count -gt 0) {
        Write-Host "Encontrados $($duplicates.Count) componentes duplicados:" -ForegroundColor Yellow
        $duplicates | ForEach-Object { Write-Host "- $_" -ForegroundColor Yellow }
    } else {
        Write-Host "[OK] Nao foram encontrados componentes duplicados" -ForegroundColor Green
    }
}

# Fase 2: Corrigir problemas do ESLint
Write-Host "`n==== Fase 2: Corrigindo problemas do ESLint ====" -ForegroundColor Blue
& "$projectRoot\scripts\Fix-ESLint-Simple.ps1"

# Fase 3: Corrigir problemas do Tailwind
Write-Host "`n==== Fase 3: Corrigindo problemas do Tailwind CSS ====" -ForegroundColor Blue
& "$projectRoot\scripts\Fix-Tailwind-Simple.ps1"

# Fase 4: Verificar a integridade do projeto
Write-Host "`n==== Fase 4: Verificando integridade do projeto ====" -ForegroundColor Blue

# Verifica se ha erros no TypeScript
Write-Host "Verificando erros de TypeScript..." -ForegroundColor Yellow
tsc --noEmit

# Verifica se ha erros no ESLint
Write-Host "`nVerificando erros do ESLint..." -ForegroundColor Yellow
try {
    npx eslint . --format=stylish
} catch {
    Write-Host "ESLint ainda encontrou problemas que podem exigir correcao manual." -ForegroundColor Yellow
}

# Resumo e proximos passos
Write-Host "`n==== Processo de Correcao Completo ====" -ForegroundColor Magenta
Write-Host "O processo de correcao foi concluido." -ForegroundColor Green
Write-Host "`nProximos Passos:" -ForegroundColor Cyan
Write-Host "1. Execute 'npm run dev' para iniciar o servidor de desenvolvimento" -ForegroundColor White
Write-Host "2. Verifique se as classes do Tailwind estao sendo aplicadas corretamente" -ForegroundColor White
Write-Host "3. Consulte o arquivo RESTAURACAO_ARCO.md para mais detalhes sobre as mudancas" -ForegroundColor White

Write-Host "`nProblemas remanescentes podem exigir correcao manual. Consulte a documentacao para mais informacoes." -ForegroundColor Yellow
