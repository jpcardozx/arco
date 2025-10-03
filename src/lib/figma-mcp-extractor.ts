/**
 * Figma MCP Extractor
 * Utilitários para extrair dados do Figma via MCP após autenticação
 */

export const FIGMA_FILE_ID = 'Ckub2SepfepuDUhSG4Cla6';
export const FIGMA_FILE_URL = `https://www.figma.com/design/${FIGMA_FILE_ID}/Relume-Figma-Kit--v3.5---Community`;

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
}

export interface FigmaStyle {
  key: string;
  name: string;
  styleType: 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
  description?: string;
}

export interface FigmaComponent {
  key: string;
  name: string;
  description?: string;
  documentationLinks?: Array<{ uri: string }>;
}

/**
 * Estrutura esperada das páginas do Relume
 */
export const RELUME_PAGES = {
  inicio: {
    name: 'Início + Design',
    sections: [
      'Hero',
      'Features',
      'Gallery',
      'Stats',
      'CTA Mid',
      'Testimonials',
      'Image Grid',
      'Final CTA',
      'Footer'
    ]
  },
  metodologia: {
    name: 'Metodologia',
    sections: [
      'Hero',
      'Process Steps',
      'Timeline',
      'Explanation',
      'Case Study',
      'CTA',
      'Related',
      'Footer'
    ]
  },
  solucoes: {
    name: 'Soluções',
    sections: [
      'Hero',
      'Solutions Grid',
      'Solution Detail 1',
      'Solution Detail 2',
      'Solution Detail 3',
      'Features Table',
      'Integration',
      'CTA',
      'Footer'
    ]
  },
  provas: {
    name: 'Provas + Dev',
    sections: [
      'Hero',
      'Metrics Dashboard',
      'Case Study 1',
      'Case Study 2',
      'Case Study 3',
      'Client Logos',
      'Testimonials Grid',
      'Results Summary',
      'CTA',
      'Footer'
    ]
  },
  contato: {
    name: 'Contato',
    sections: [
      'Hero',
      'Contact Form',
      'Contact Info',
      'Map',
      'FAQ',
      'Alt Methods',
      'Social',
      'Footer'
    ]
  }
} as const;

/**
 * Comandos MCP para extrair dados do Figma
 * Execute estes comandos após autenticação bem-sucedida
 */
export const MCP_COMMANDS = {
  /**
   * 1. Obter informações do arquivo
   */
  getFileInfo: `mcp call figma-remote-mcp get_file_info '{"file_id": "${FIGMA_FILE_ID}"}'`,

  /**
   * 2. Listar componentes
   */
  getComponents: `mcp call figma-remote-mcp get_components '{"file_id": "${FIGMA_FILE_ID}"}'`,

  /**
   * 3. Obter estilos
   */
  getStyles: `mcp call figma-remote-mcp get_styles '{"file_id": "${FIGMA_FILE_ID}"}'`,

  /**
   * 4. Obter variáveis de design
   */
  getVariables: `mcp call figma-remote-mcp get_variables '{"file_id": "${FIGMA_FILE_ID}"}'`,
} as const;

/**
 * Workflow pós-autenticação
 */
export const POST_AUTH_WORKFLOW = `
# Workflow Pós-Autenticação Figma MCP

## 1. Verificar Conexão
\`\`\`bash
claude mcp list | grep figma
# Deve mostrar: ✅ Connected
\`\`\`

## 2. Listar Ferramentas Disponíveis
\`\`\`bash
claude mcp tools figma-remote-mcp
\`\`\`

## 3. Extrair Dados do Arquivo
\`\`\`bash
# Informações gerais
${MCP_COMMANDS.getFileInfo}

# Componentes
${MCP_COMMANDS.getComponents}

# Estilos
${MCP_COMMANDS.getStyles}

# Variáveis
${MCP_COMMANDS.getVariables}
\`\`\`

## 4. Avisar Claude Code
Digite: "Auth completa, dados do Figma extraídos"
`;

/**
 * Mapping de seções do Figma para componentes React
 */
export const SECTION_TO_COMPONENT_MAP = {
  'Hero': 'HeroRelume',
  'Features': 'FeaturesGridRelume',
  'Gallery': 'ImageGridRelume',
  'Stats': 'StatsRelume',
  'CTA': 'CTARelume',
  'Testimonials': 'TestimonialRelume',
  'Footer': 'FooterRelume',
  'Process Steps': 'ProcessStepsRelume',
  'Timeline': 'TimelineRelume',
  'Case Study': 'CaseStudyRelume',
  'Solutions Grid': 'SolutionsGridRelume',
  'Features Table': 'FeaturesTableRelume',
  'Contact Form': 'ContactFormRelume',
  'FAQ': 'FAQRelume',
} as const;
