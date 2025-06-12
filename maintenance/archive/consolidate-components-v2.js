/**
 * Script para consolidar componentes duplicados para a nova estrutura
 * Este script analisa e move componentes para a estrutura adequada,
 * priorizando versões Revised quando disponíveis
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Cores para saída de console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

// Estrutura de destino
const targetStructure = {
  'ui': ['Button', 'Card', 'Input', 'Select', 'Badge', 'Avatar'],
  'layout': ['Section', 'Grid', 'NavBar', 'Footer', 'Layout'],
  'sections': ['Hero', 'CTA', 'Process', 'CaseStudies', 'Testimonials', 'FinalCoda', 'Banner'],
  'features': ['AnalyticsProvider', 'LanguageSelector', 'ErrorFallback', 'StructuredData', 'IntegrationController', 'DesignCompare']
};

// Mapeamento reverso para facilitar a classificação
const componentTypeMap = {};
Object.entries(targetStructure).forEach(([type, components]) => {
  components.forEach(component => {
    componentTypeMap[component.toLowerCase()] = type;
  });
});

// Funções auxiliares
function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`${colors.green}Diretório criado: ${dir}${colors.reset}`);
  }
}

function determineComponentType(fileName) {
  // Remover sufixos e extensões
  const baseName = fileName.replace(/Enhanced|Revised|Refined|\.tsx|\.jsx/g, '')
    .replace(/ARCO/, '');
  
  // Verificar se o componente está no mapeamento
  for (const [pattern, type] of Object.entries(componentTypeMap)) {
    if (baseName.toLowerCase().includes(pattern.toLowerCase())) {
      return type;
    }
  }
  
  // Regras específicas para componentes que não seguem o padrão
  if (baseName.includes('Symbolic')) return 'features';
  if (baseName.includes('Misalignment')) return 'sections';
  
  // Padrão para componentes não classificados
  return 'features';
}

function selectBestVersion(versions) {
  if (versions.find(v => v.includes('Revised'))) {
    return versions.find(v => v.includes('Revised'));
  } else if (versions.find(v => v.includes('Enhanced'))) {
    return versions.find(v => v.includes('Enhanced'));
  } else if (versions.find(v => v.includes('Refined'))) {
    return versions.find(v => v.includes('Refined'));
  } else {
    return versions[0];
  }
}

function normalizeComponentName(name) {
  // Remover sufixos e normalizações comuns
  return name.replace(/Enhanced|Revised|Refined|ARCO|\.tsx|\.jsx/g, '')
    // Tratamento para casos específicos
    .replace(/^(The)/, '')
    // Garantir que começa com maiúscula
    .replace(/^(.)/, match => match.toUpperCase());
}

function createAliasFile(originalPath, importPath, name) {
  const content = `/**
 * @deprecated Use a versão consolidada em ${importPath}
 */
export { default } from '${importPath}';
export * from '${importPath}';
`;

  try {
    fs.writeFileSync(originalPath, content);
    console.log(`${colors.blue}Alias criado: ${originalPath} -> ${importPath}${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}Erro ao criar alias ${originalPath}: ${error.message}${colors.reset}`);
  }
}

// Função principal
async function consolidateComponents() {
  console.log(`\n${colors.bright}${colors.yellow}=== Consolidando Componentes ARCO ===${colors.reset}\n`);
  
  const rootDir = process.cwd();
  const componentsDir = path.join(rootDir, 'components');
  const targetBaseDir = path.join(rootDir, 'src', 'components');
  
  // Garantir que os diretórios de destino existam
  Object.keys(targetStructure).forEach(dir => {
    ensureDirExists(path.join(targetBaseDir, dir));
  });
  
  // Identificar todos os componentes existentes
  let allComponents;
  try {
    allComponents = fs.readdirSync(componentsDir)
      .filter(file => (file.endsWith('.tsx') || file.endsWith('.jsx')))
      .filter(file => !fs.statSync(path.join(componentsDir, file)).isDirectory());
    
    console.log(`${colors.cyan}Encontrados ${allComponents.length} componentes para análise${colors.reset}\n`);
  } catch (error) {
    console.error(`${colors.red}Erro ao ler diretório de componentes: ${error.message}${colors.reset}`);
    return;
  }
  
  // Agrupar variantes do mesmo componente
  const componentGroups = {};
  allComponents.forEach(file => {
    // Normalizamos os nomes para agrupar corretamente
    const normalizedName = normalizeComponentName(file);
    
    if (!componentGroups[normalizedName]) {
      componentGroups[normalizedName] = [];
    }
    componentGroups[normalizedName].push(file);
  });
  
  console.log(`${colors.cyan}Identificados ${Object.keys(componentGroups).length} grupos de componentes${colors.reset}\n`);
  
  // Processar cada grupo
  let processed = 0;
  Object.entries(componentGroups).forEach(([baseName, versions]) => {
    if (versions.length === 0) return;
    
    console.log(`${colors.yellow}Processando: ${baseName}${colors.reset}`);
    console.log(`  Versões encontradas: ${versions.join(', ')}`);
    
    // Selecionar a melhor versão
    const bestVersion = selectBestVersion(versions);
    const componentContent = fs.readFileSync(path.join(componentsDir, bestVersion), 'utf-8');
    
    // Determinar a categoria do componente
    const componentType = determineComponentType(bestVersion);
    
    // Caminho de destino
    const formattedName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
    const targetFileName = `${formattedName}.tsx`;
    const targetFilePath = path.join(targetBaseDir, componentType, targetFileName);
    
    console.log(`  Movendo para: ${colors.green}src/components/${componentType}/${targetFileName}${colors.reset}`);
    
    // Salvar o componente no novo local
    try {
      fs.writeFileSync(targetFilePath, componentContent);
      processed++;
      
      // Criar aliases para todas as versões
      const importPath = `@/components/${componentType}/${formattedName}`;
      
      versions.forEach(version => {
        createAliasFile(
          path.join(componentsDir, version),
          importPath,
          formattedName
        );
      });
      
      console.log(`  ${colors.green}✓ Componente movido com sucesso${colors.reset}`);
    } catch (error) {
      console.error(`  ${colors.red}✗ Erro ao mover componente: ${error.message}${colors.reset}`);
    }
    
    console.log(); // Linha em branco para separar os grupos
  });
  
  console.log(`\n${colors.green}${colors.bright}Consolidação concluída! ${processed} componentes processados.${colors.reset}`);
  console.log(`${colors.yellow}Agora você deve atualizar as importações nos arquivos que usam estes componentes.${colors.reset}\n`);
}

// Executar o script
consolidateComponents().catch(error => {
  console.error(`${colors.red}Erro fatal: ${error.message}${colors.reset}`);
  process.exit(1);
});
