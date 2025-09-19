# ARCO Project - PowerShell ESLint Fix Script
# Este script executa os scripts de correcao ESLint em um ambiente Windows

Write-Host "==== ARCO Project ESLint Fix ====" -ForegroundColor Magenta

# Funcao para executar os scripts com mensagens coloridas
function Invoke-EslintScript {
    param(
        [string]$ScriptPath,
        [string]$Description
    )
    
    Write-Host "`nExecutando: $Description..." -ForegroundColor Cyan
    
    try {
        node $ScriptPath
        Write-Host "[OK] $Description concluido com sucesso!" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "[ERRO] $Description falhou: $_" -ForegroundColor Red
        return $false
    }
}

# Verifica se o Node.js esta instalado
try {
    $nodeVersion = node -v
    Write-Host "Node.js $nodeVersion detectado" -ForegroundColor Green
}
catch {
    Write-Host "ERRO: Node.js nao encontrado. Por favor, instale o Node.js para continuar." -ForegroundColor Red
    exit 1
}

# Verifica se o ESLint esta instalado
if (-not (Test-Path "./node_modules/.bin/eslint")) {
    Write-Host "ESLint nao encontrado localmente. Instalando..." -ForegroundColor Yellow
    npm install eslint --save-dev
}

# Diretorio do projeto
$projectRoot = $PSScriptRoot | Split-Path -Parent

# Passo 1: Limpar o cache do ESLint
Write-Host "`nLimpando cache do ESLint..." -ForegroundColor Yellow
npx eslint --cache --cache-location .eslintcache --cache-strategy content --no-error-on-unmatched-pattern . --fix

# Passo 2: Executar o script abrangente de correcao
Invoke-EslintScript -ScriptPath "$projectRoot\eslint-fix-scripts\fix-all-comprehensive.js" -Description "Script abrangente de correcao"

# Passo 3: Executar o corretor de importacoes nao utilizadas
Invoke-EslintScript -ScriptPath "$projectRoot\eslint-fix-scripts\fix-unused-imports.js" -Description "Correcao de importacoes nao utilizadas"

# Passo 4: Executar o corretor de dependencias de hooks
Invoke-EslintScript -ScriptPath "$projectRoot\fix-react-hooks.js" -Description "Correcao de dependencias de hooks React"

# Passo 5: ESLint com --fix para capturar quaisquer problemas restantes
Write-Host "`nExecutando ESLint com flag --fix para capturar problemas restantes..." -ForegroundColor Yellow
try {
    npx eslint . --fix --max-warnings=0 --format=stylish
} catch {
    Write-Host "ESLint ainda encontrou problemas. Isso e esperado." -ForegroundColor Yellow
}

# Resumo
Write-Host "`n==== Resumo ====" -ForegroundColor Magenta
Write-Host "O processo de correcao do ESLint foi concluido." -ForegroundColor Green
Write-Host "Execute 'npx eslint --format=stylish .' para verificar problemas restantes." -ForegroundColor Cyan
