/**
 * Script para criar aliases temporários para os componentes legados
 * Este script cria arquivos de redirecionamento que apontam para os componentes consolidados
 * permitindo que o projeto continue funcionando enquanto a migração completa é feita
 */

const fs = require('fs');
const path = require('path');

// Função simples para colorir o texto no console
const colorize = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`
};

// Mapeamento de componentes para seus novos caminhos
const componentMappings = {
  'NavBar': 'layout/NavBar',
  'NavBarEnhanced': 'layout/NavBar',
  'HomepageLayout': 'layout/HomepageLayout',
  'Footer': 'layout/Footer',
  'FooterARCO': 'layout/Footer',
  'FooterARCORevised': 'layout/Footer',
  'Hero': 'sections/Hero',
  'HeroARCO': 'sections/Hero',
  'HeroARCOEnhanced': 'sections/Hero',
  'HeroARCORevised': 'sections/Hero',
  'Process': 'sections/Process',
  'ProcessEnhanced': 'sections/Process',
  'CTA': 'sections/CTA',
  'EnhancedCTA': 'sections/CTA',
  'EditorialCTA': 'sections/CTA',
  'EditorialCTARevised': 'sections/CTA',
  'CaseStudies': 'sections/CaseStudies',
  'CaseStudiesEnhanced': 'sections/CaseStudies',
  'ClientTestimonials': 'sections/ClientTestimonials',
  'HomepageFinalCoda': 'sections/FinalCoda',
  'HomepageFinalCodaRevised': 'sections/FinalCoda',
};

// Função para criar arquivo de alias
const createAliasFile = (componentName, targetPath) => {
  // Caminho do componente original na pasta components da raiz
  const originalFilePath = path.join(process.cwd(), 'components', `${componentName}.tsx`);
    // Se o arquivo já existe, criar backup
  if (fs.existsSync(originalFilePath)) {
    try {
      const backupPath = path.join(process.cwd(), 'components', 'backups', `${componentName}.tsx.bak`);
      
      // Garantir que a pasta de backups exista
      if (!fs.existsSync(path.join(process.cwd(), 'components', 'backups'))) {
        fs.mkdirSync(path.join(process.cwd(), 'components', 'backups'), { recursive: true });
      }
      
      // Criar backup
      fs.copyFileSync(originalFilePath, backupPath);
      console.log(colorize.yellow(`Backup criado: ${componentName}.tsx.bak`));
    } catch (err) {
      console.error(colorize.red(`Erro ao criar backup para ${componentName}: ${err.message}`));
    }
  }
  
  // Conteúdo do arquivo de alias
  const aliasContent = `/**
 * @deprecated Este é um arquivo de redirecionamento para manter compatibilidade.
 * Use o componente consolidado em src/components/${targetPath} diretamente.
 */
import Component from '@/components/${targetPath}';

export default Component;
`;
  try {
    fs.writeFileSync(originalFilePath, aliasContent, 'utf8');
    console.log(colorize.green(`✓ Alias criado: ${componentName} -> @/components/${targetPath}`));
    return true;
  } catch (err) {
    console.error(colorize.red(`✗ Erro ao criar alias para ${componentName}: ${err.message}`));
    return false;
  }
};

// Função principal
const main = async () => {
  console.log(colorize.blue(colorize.bold('\n=== Criando Aliases para Componentes Legados ===\n')));
  
  // Contadores para estatísticas
  let created = 0;
  let failed = 0;
  
  // Processar cada componente no mapeamento
  for (const [componentName, targetPath] of Object.entries(componentMappings)) {
    if (createAliasFile(componentName, targetPath)) {
      created++;
    } else {
      failed++;
    }
  }
  
  console.log(colorize.blue(colorize.bold('\n=== Resultado ===')));
  console.log(colorize.green(`✓ ${created} aliases criados com sucesso`));
  
  if (failed > 0) {
    console.log(colorize.red(`✗ ${failed} aliases falharam`));
  }
  
  console.log(colorize.blue('\nOs componentes agora podem ser importados de ambos os caminhos:'));
  console.log(colorize.yellow('- Antigo: ../../components/ComponentName'));
  console.log(colorize.yellow('- Novo: @/components/category/ComponentName'));
  console.log('\n');
};

// Executar script
main().catch(err => {
  console.error(colorize.red(`Erro fatal: ${err.message}`));
  process.exit(1);
});
