const fs = require('fs');

// Mapeamento de todas as traduções do AuthorityManifesto
const translations = {
  'authorityManifesto.badge': 'DIGITAL PERFORMANCE ENGINEERING',
  'authorityManifesto.title': 'Pare de queimar dinheiro em tecnologia que não funciona.',
  'authorityManifesto.titleHighlight': 'Nós consertamos.',
  'authorityManifesto.subtitle': 'Para líderes de empresas que perderam a paciência com promessas vazias de agências e desenvolvedores. Aqui você encontra resultados reais, não desculpas.',
  
  'authorityManifesto.insight.title': 'A Realidade Brutal do Mercado',
  'authorityManifesto.insight.percentage': '94%',
  'authorityManifesto.insight.description': 'dos projetos digitais corporativos falham em entregar o ROI prometido',
  'authorityManifesto.insight.source': '- Fonte: Standish Group 2023',
  'authorityManifesto.insight.result': 'Resultado: R$ 2,4 milhões desperdiçados anualmente por empresa média',
  
  'authorityManifesto.skills.dontHire': 'NÃO nos contrate se você quer:',
  'authorityManifesto.skills.disclaimer': '(Frankamente, há centenas de agências que fazem isso melhor e mais barato que nós)',
  'authorityManifesto.skills.hireFor': 'CONTRATE-nos para:',
  'authorityManifesto.skills.architecture': 'Arquitetura de Performance Financeira',
  'authorityManifesto.skills.description': 'Transformamos métricas técnicas em resultados financeiros mensuráveis',
  'authorityManifesto.skills.problems': 'Resolvemos especificamente:',
  
  'authorityManifesto.caseStudy.title': 'Caso Real: Varejo Online',
  'authorityManifesto.caseStudy.subtitle': 'Como recuperamos R$ 847.000 em receita perdida em 21 dias',
  'authorityManifesto.caseStudy.client.label': 'CLIENTE',
  'authorityManifesto.caseStudy.client.name': 'E-commerce de Moda Brasileira',
  'authorityManifesto.caseStudy.client.description': 'R$ 12M em faturamento anual, 85.000 visitantes/mês',
  'authorityManifesto.caseStudy.client.problemLabel': 'PROBLEMA',
  'authorityManifesto.caseStudy.client.problem': 'Site novo lançado 6 meses antes estava com conversão 40% abaixo do esperado. Equipe interna não conseguia identificar as causas.',
  
  'authorityManifesto.caseStudy.diagnosis.label': 'DIAGNÓSTICO',
  'authorityManifesto.caseStudy.diagnosis.title': 'Análise Técnica de Performance',
  
  'authorityManifesto.caseStudy.results.label': 'RESULTADOS',
  'authorityManifesto.caseStudy.results.title': 'Impacto Financeiro em 3 Semanas',
  'authorityManifesto.caseStudy.results.before': 'Antes',
  'authorityManifesto.caseStudy.results.after': 'Depois',
  'authorityManifesto.caseStudy.results.testimonial': 'Em 3 semanas eles encontraram e corrigiram problemas que nossa equipe interna e duas agências anteriores não conseguiram resolver em 6 meses. O ROI foi imediato.',
  'authorityManifesto.caseStudy.results.testimonialAuthor': '- Pedro Silva, CEO',
  
  'authorityManifesto.cta.text': 'Diagnóstico Gratuito',
  'authorityManifesto.cta.disclaimer': 'Oferecemos análise gratuita de 30 minutos para identificar suas maiores oportunidades de receita'
};

// Array para problemsList
const problemsList = [
  'Conversões baixas sem causa identificada',
  'Performance lenta impactando vendas',
  'Implementações técnicas que não geram ROI',
  'Equipes internas sem tempo/expertise para otimização',
  'Agências que entregam relatórios, não resultados'
];

// Array para diagnosis steps
const diagnosisSteps = [
  'Mapeamento completo do funil de conversão',
  'Identificação de 12 pontos críticos de atrito',
  'Quantificação do impacto financeiro de cada problema',
  'Priorização por ROI vs esforço de implementação'
];

const filePath = './src/components/features/AuthorityManifesto.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Substituir traduções simples
Object.entries(translations).forEach(([key, value]) => {
  const patterns = [
    new RegExp(`{t\\('${key.replace(/\./g, '\\.')}'\\)}`, 'g'),
    new RegExp(`t\\('${key.replace(/\./g, '\\.')}'\\)`, 'g')
  ];
  
  patterns.forEach(pattern => {
    content = content.replace(pattern, `'${value}'`);
  });
});

// Substituir arrays específicos
content = content.replace(
  /\(t\('authorityManifesto\.skills\.problemsList'\) as string\[\]\)/g,
  JSON.stringify(problemsList)
);

content = content.replace(
  /\(t\('authorityManifesto\.caseStudy\.diagnosis\.steps'\) as string\[\]\)/g,
  JSON.stringify(diagnosisSteps)
);

// Escrever arquivo corrigido
fs.writeFileSync(filePath, content);
console.log('✅ AuthorityManifesto.tsx corrigido!');
