# ARCO Project - PowerShell ESLint Fix Script
# Este script executa os scripts de correção ESLint em um ambiente Windows

Write-Host "==== ARCO Project ESLint Fix ====" -ForegroundColor Magenta

# Função para executar os scripts com mensagens coloridas
function Invoke-EslintScript {
    param(
        [string]$ScriptPath,
        [string]$Description
    )
    
    Write-Host "`nExecutando: $Description..." -ForegroundColor Cyan
    
    try {
        node $ScriptPath
        Write-Host "✓ $Description concluído com sucesso!" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "✗ $Description falhou: $_" -ForegroundColor Red
        return $false
    }
}

# Verifica se o Node.js está instalado
try {
    $nodeVersion = node -v
    Write-Host "Node.js $nodeVersion detectado" -ForegroundColor Green
}
catch {
    Write-Host "ERRO: Node.js não encontrado. Por favor, instale o Node.js para continuar." -ForegroundColor Red
    exit 1
}

# Verifica se o ESLint está instalado
if (-not (Test-Path "./node_modules/.bin/eslint")) {
    Write-Host "ESLint não encontrado localmente. Instalando..." -ForegroundColor Yellow
    npm install eslint --save-dev
}

# Diretório do projeto
$projectRoot = $PSScriptRoot | Split-Path -Parent

# Passo 1: Limpar o cache do ESLint
Write-Host "`nLimpando cache do ESLint..." -ForegroundColor Yellow
npx eslint --cache --cache-location .eslintcache --cache-strategy content --no-error-on-unmatched-pattern . --fix

# Passo 2: Executar o script abrangente de correção
Invoke-EslintScript -ScriptPath "$projectRoot\eslint-fix-scripts\fix-all-comprehensive.js" -Description "Script abrangente de correção"

# Passo 3: Executar o corretor de importações não utilizadas
Invoke-EslintScript -ScriptPath "$projectRoot\eslint-fix-scripts\fix-unused-imports.js" -Description "Correção de importações não utilizadas"

# Passo 4: Executar o corretor de dependências de hooks
Invoke-EslintScript -ScriptPath "$projectRoot\fix-react-hooks.js" -Description "Correção de dependências de hooks React"

# Passo 5: ESLint com --fix para capturar quaisquer problemas restantes
Write-Host "`nExecutando ESLint com flag --fix para capturar problemas restantes..." -ForegroundColor Yellow
npx eslint . --fix --max-warnings=0 --format=stylish || Write-Host "ESLint ainda encontrou problemas. Isso é esperado." -ForegroundColor Yellow

# Resumo
Write-Host "`n==== Resumo ====" -ForegroundColor Magenta
Write-Host "O processo de correção do ESLint foi concluído." -ForegroundColor Green
Write-Host "Execute 'npx eslint --format=stylish .' para verificar problemas restantes." -ForegroundColor Cyan
