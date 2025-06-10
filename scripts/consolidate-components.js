/**
 * Script para consolidar componentes duplicados, mantendo a versão mais recente (Revised)
 * e criando aliases para manter compatibilidade com importações existentes.
 */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const COMPONENTS_DIR = path.join(__dirname, '..', 'components');
const TARGET_DIR = path.join(__dirname, '..', 'src', 'components');

// Garantir que o diretório de destino existe
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Mapear componentes relacionados com base no nome
const findRelatedComponents = () => {
  const files = fs.readdirSync(COMPONENTS_DIR);
  const componentGroups = {};

  files.forEach(file => {
    if (!file.endsWith('.tsx') && !file.endsWith('.jsx')) return;
    if (fs.statSync(path.join(COMPONENTS_DIR, file)).isDirectory()) return;

    // Remover sufixos Enhanced, Revised para obter o nome base
    const baseName = file.replace(/Enhanced|Revised|Refined/g, '').replace(/\.tsx$|\.jsx$/, '');
    
    if (!componentGroups[baseName]) {
      componentGroups[baseName] = [];
    }
    
    componentGroups[baseName].push(file);
  });

  return componentGroups;
};

// Determinar qual versão deve ser mantida (prioridade: Revised > Enhanced > Base)
const selectBestVersion = (versions) => {
  if (versions.find(v => v.includes('Revised'))) {
    return versions.find(v => v.includes('Revised'));
  } else if (versions.find(v => v.includes('Enhanced'))) {
    return versions.find(v => v.includes('Enhanced'));
  } else {
    return versions[0];
  }
};

// Criar um arquivo de alias para manter compatibilidade com importações existentes
const createAliasFile = (originalPath, targetComponentPath, componentName) => {
  const aliasContent = `/**
 * @deprecated Use a versão consolidada em src/components/[categoria apropriada]/${componentName}
 */
export { default } from '${targetComponentPath}';
export * from '${targetComponentPath}';
`;
  fs.writeFileSync(originalPath, aliasContent);
};

// Processar a consolidação
const consolidateComponents = () => {
  console.log(chalk.blue('🔍 Identificando componentes relacionados...'));
  const componentGroups = findRelatedComponents();
  
  console.log(chalk.green(`✅ Encontrados ${Object.keys(componentGroups).length} grupos de componentes para consolidar.\n`));
  
  // Criar diretórios de destino organizados
  const categories = ['ui', 'layout', 'features', 'sections'];
  categories.forEach(category => {
    const dir = path.join(TARGET_DIR, category);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  Object.entries(componentGroups).forEach(([baseName, versions]) => {
    if (versions.length === 1) return; // Pular se houver apenas uma versão
    
    console.log(chalk.yellow(`Processando grupo: ${baseName}`));
    console.log(`  Versões encontradas: ${versions.join(', ')}`);
    
    const bestVersion = selectBestVersion(versions);
    const componentContent = fs.readFileSync(path.join(COMPONENTS_DIR, bestVersion), 'utf-8');
    
    // Determinar categoria do componente para organização (análise básica)
    let category = 'features'; // default
    if (baseName.includes('Hero') || baseName.includes('CTA') || baseName.includes('Footer')) {
      category = 'sections';
    } else if (baseName.includes('Layout')) {
      category = 'layout';
    } else if (baseName.startsWith('Button') || baseName.includes('Input') || baseName.includes('Card')) {
      category = 'ui';
    }
    
    // Salvar a melhor versão no novo local
    const newName = `${baseName.charAt(0).toUpperCase() + baseName.slice(1)}.tsx`;
    const newPath = path.join(TARGET_DIR, category, newName);
    
    console.log(`  ➡️ Consolidando para: ${chalk.green(newPath)}`);
    fs.writeFileSync(newPath, componentContent);
    
    // Criar aliases para as versões antigas para manter compatibilidade
    const relativePath = path.relative(COMPONENTS_DIR, path.join(TARGET_DIR, category, newName))
      .replace(/\\/g, '/')
      .replace(/\.tsx$/, '');
    
    versions.forEach(version => {
      const originalPath = path.join(COMPONENTS_DIR, version);
      createAliasFile(originalPath, relativePath, newName.replace(/\.tsx$/, ''));
      console.log(`  📌 Alias criado: ${chalk.cyan(version)}`);
    });
    
    console.log('');
  });

  console.log(chalk.green.bold('✨ Consolidação de componentes concluída com sucesso!'));
};

// Executar consolidação
consolidateComponents();
