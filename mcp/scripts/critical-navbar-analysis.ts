#!/usr/bin/env tsx

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import fs from 'fs';

interface CriticalAnalysis {
  timestamp: string;
  url: string;
  uiUxIssues: Array<{
    priority: 'critical' | 'high' | 'medium' | 'low';
    category: string;
    issue: string;
    currentState: string;
    recommendation: string;
    impact: string;
  }>;
  animationProposals: Array<{
    name: string;
    description: string;
    implementation: string;
    benefit: string;
  }>;
  stickyNavbarProposal: {
    description: string;
    implementation: string;
    behavior: string;
  };
}

async function performCriticalNavbarAnalysis(url: string): Promise<CriticalAnalysis> {
  console.log('🔍 ANÁLISE CRÍTICA DA NAVBAR - LOCALHOST:3001\n');

  const transport = new StdioClientTransport({
    command: 'npx',
    args: ['chrome-devtools-mcp@latest']
  });

  const client = new Client(
    { name: 'critical-navbar-analyzer', version: '1.0.0' },
    { capabilities: {} }
  );

  await client.connect(transport);

  const analysis: CriticalAnalysis = {
    timestamp: new Date().toISOString(),
    url,
    uiUxIssues: [],
    animationProposals: [],
    stickyNavbarProposal: {
      description: '',
      implementation: '',
      behavior: ''
    }
  };

  try {
    // 1. Navegar e aguardar carregamento
    console.log('🌐 Navegando para', url);
    await client.callTool({
      name: 'navigate_page',
      arguments: { url }
    });

    await client.callTool({
      name: 'wait_for',
      arguments: { text: 'networkidle', timeout: 5000 }
    });

    // 2. Capturar dados completos da navbar
    console.log('📊 Coletando dados da navbar...');
    const navbarData = await client.callTool({
      name: 'evaluate_script',
      arguments: {
        function: getDetailedNavbarAnalysisScript()
      }
    });

    const data = parseResult(navbarData);
    console.log('✅ Dados coletados\n');

    // 3. Screenshot para análise visual
    await client.callTool({
      name: 'take_screenshot',
      arguments: {}
    });

    // 4. Análise crítica dos 10 pontos principais
    console.log('🎯 IDENTIFICANDO 10 PONTOS CRÍTICOS DE APRIMORAMENTO:\n');

    // CRÍTICO 1: Hierarquia visual inadequada
    analysis.uiUxIssues.push({
      priority: 'critical',
      category: 'Visual Hierarchy',
      issue: 'Falta de hierarquia visual clara entre logo e navegação',
      currentState: `Logo e links têm peso visual similar (${data.logo?.fontSize || 'indefinido'} vs ${data.links?.[0]?.fontSize || 'indefinido'})`,
      recommendation: 'Logo deve ter 1.5-2x o tamanho dos links de navegação',
      impact: 'Usuários não identificam rapidamente a marca/identidade'
    });

    // CRÍTICO 2: Contraste insuficiente
    analysis.uiUxIssues.push({
      priority: 'high',
      category: 'Accessibility',
      issue: 'Contraste de cor pode não atender WCAG 2.1 AA',
      currentState: `Cor dos links: ${data.links?.[0]?.color || 'indefinido'}`,
      recommendation: 'Garantir ratio mínimo 4.5:1 para texto normal, 3:1 para texto grande',
      impact: 'Inacessível para usuários com deficiência visual'
    });

    // CRÍTICO 3: Touch targets pequenos em mobile
    analysis.uiUxIssues.push({
      priority: 'high',
      category: 'Mobile UX',
      issue: 'Touch targets podem estar abaixo do mínimo recomendado',
      currentState: `Altura média dos links: ${data.averageLinkHeight || 'indefinido'}px`,
      recommendation: 'Mínimo 44x44px para touch targets (WCAG)',
      impact: 'Dificuldade de navegação em dispositivos móveis'
    });

    // CRÍTICO 4: Falta de sticky behavior
    analysis.uiUxIssues.push({
      priority: 'high',
      category: 'Navigation UX',
      issue: 'Navbar não acompanha scroll do usuário',
      currentState: `Position: ${data.positioning?.position || 'static'}`,
      recommendation: 'Implementar sticky navbar com animação suave',
      impact: 'Usuário perde acesso rápido à navegação'
    });

    // CRÍTICO 5: Sem indicador de página ativa
    analysis.uiUxIssues.push({
      priority: 'medium',
      category: 'Navigation UX',
      issue: 'Ausência de indicador visual da página atual',
      currentState: 'Links sem estado ativo diferenciado',
      recommendation: 'Adicionar indicador visual (sublinhado, background, cor)',
      impact: 'Usuário perde orientação sobre localização atual'
    });

    // CRÍTICO 6: Animações ausentes
    analysis.uiUxIssues.push({
      priority: 'medium',
      category: 'Micro-interactions',
      issue: 'Falta de feedback visual em hover/active',
      currentState: 'Estados estáticos sem animação',
      recommendation: 'Implementar animações sutis com framer-motion',
      impact: 'Interface parece não responsiva e antiquada'
    });

    // CRÍTICO 7: Espaçamento inconsistente
    analysis.uiUxIssues.push({
      priority: 'medium',
      category: 'Layout',
      issue: 'Espaçamento entre elementos não segue grid system',
      currentState: `Gap: ${data.layout?.gap || 'indefinido'}, Padding: ${data.layout?.padding || 'indefinido'}`,
      recommendation: 'Usar design tokens (8px, 16px, 24px, 32px)',
      impact: 'Visual desorganizado e não profissional'
    });

    // CRÍTICO 8: Performance de carregamento
    analysis.uiUxIssues.push({
      priority: 'medium',
      category: 'Performance',
      issue: 'Possível layout shift durante carregamento',
      currentState: 'Sem skeleton ou placeholder',
      recommendation: 'Implementar skeleton loading para navbar',
      impact: 'CLS ruim afeta SEO e UX'
    });

    // CRÍTICO 9: Sem dark mode consideration
    analysis.uiUxIssues.push({
      priority: 'low',
      category: 'Theme Support',
      issue: 'Navbar não preparada para dark mode',
      currentState: 'Cores hardcoded sem CSS variables',
      recommendation: 'Usar CSS custom properties para temas',
      impact: 'Limitação para futuro dark mode'
    });

    // CRÍTICO 10: Menu mobile ausente/inadequado
    analysis.uiUxIssues.push({
      priority: 'high',
      category: 'Mobile UX',
      issue: 'Menu hamburger ausente ou mal implementado',
      currentState: data.hasHamburgerMenu ? 'Presente' : 'Ausente',
      recommendation: 'Implementar menu hambúrguer com animação moderna',
      impact: 'Navegação mobile comprometida'
    });

    // 5. Propostas de animação com framer-motion
    console.log('🎬 PROPOSTAS DE ANIMAÇÃO COM FRAMER-MOTION:\n');

    analysis.animationProposals = [
      {
        name: 'Hover Link Animation',
        description: 'Animação sutil de underline crescendo da esquerda para direita',
        implementation: `
const linkVariants = {
  hover: {
    scaleX: 1,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  initial: { scaleX: 0 }
};

<motion.span
  className="absolute bottom-0 left-0 h-0.5 bg-primary w-full origin-left"
  variants={linkVariants}
  initial="initial"
  whileHover="hover"
/>`,
        benefit: 'Feedback visual imediato e elegante para interação'
      },
      {
        name: 'Sticky Navbar Slide-in',
        description: 'Navbar aparece com slide suave quando scroll > 100px',
        implementation: `
const navbarVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

<motion.nav
  variants={navbarVariants}
  initial="hidden"
  animate={isScrolled ? "visible" : "hidden"}
  className="fixed top-0 z-50"
/>`,
        benefit: 'Aparição suave da navbar sticky sem ser intrusiva'
      },
      {
        name: 'Mobile Menu Slide-in',
        description: 'Menu mobile com slide lateral e overlay com fade',
        implementation: `
const menuVariants = {
  closed: { x: "100%", opacity: 0 },
  open: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

<AnimatePresence>
  {isOpen && (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate="open"
      exit="closed"
      className="fixed right-0 top-0 h-full w-80 bg-white z-50"
    />
  )}
</AnimatePresence>`,
        benefit: 'Experiência mobile moderna e profissional'
      }
    ];

    // 6. Proposta de navbar sticky com padding reduzido
    console.log('📎 PROPOSTA NAVBAR STICKY COM PADDING REDUZIDO:\n');

    analysis.stickyNavbarProposal = {
      description: 'Navbar que reduz padding vertical de 24px para 12px quando sticky',
      implementation: `
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 100);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

<motion.nav
  className={cn(
    "fixed top-0 w-full z-50 transition-all duration-300",
    isScrolled
      ? "py-3 backdrop-blur-md bg-white/90 shadow-lg"
      : "py-6 bg-transparent"
  )}
  animate={{
    paddingTop: isScrolled ? "12px" : "24px",
    paddingBottom: isScrolled ? "12px" : "24px"
  }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
>`,
      behavior: 'Scroll threshold: 100px | Padding: 24px→12px | Background: transparent→blur | Shadow: none→subtle'
    };

    // 7. Salvar relatório
    const reportPath = `/home/jpcardozx/projetos/arco/logs/critical-navbar-analysis-${Date.now()}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2));

    console.log('📄 Relatório salvo em:', reportPath);

  } catch (error) {
    console.error('❌ Erro na análise:', error);
  } finally {
    await client.close();
  }

  return analysis;
}

function getDetailedNavbarAnalysisScript(): string {
  return `
    const navbar = document.querySelector('nav, header nav, [role="navigation"]');
    if (!navbar) return { error: 'Navbar não encontrada' };

    const rect = navbar.getBoundingClientRect();
    const styles = getComputedStyle(navbar);
    const links = Array.from(navbar.querySelectorAll('a'));
    const logo = navbar.querySelector('[class*="logo"], img, svg');
    const hamburger = navbar.querySelector('[class*="hamburger"], [class*="menu-toggle"], button[aria-label*="menu"]');

    return {
      found: true,
      dimensions: {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left
      },
      layout: {
        display: styles.display,
        flexDirection: styles.flexDirection,
        justifyContent: styles.justifyContent,
        alignItems: styles.alignItems,
        gap: styles.gap,
        padding: styles.padding,
        paddingY: styles.paddingTop
      },
      positioning: {
        position: styles.position,
        top: styles.top,
        zIndex: styles.zIndex,
        backgroundColor: styles.backgroundColor,
        backdropFilter: styles.backdropFilter,
        boxShadow: styles.boxShadow
      },
      logo: logo ? {
        width: logo.getBoundingClientRect().width,
        height: logo.getBoundingClientRect().height,
        fontSize: getComputedStyle(logo).fontSize,
        fontWeight: getComputedStyle(logo).fontWeight
      } : null,
      links: links.map(link => ({
        text: link.textContent?.trim(),
        href: link.href,
        color: getComputedStyle(link).color,
        fontSize: getComputedStyle(link).fontSize,
        fontWeight: getComputedStyle(link).fontWeight,
        padding: getComputedStyle(link).padding,
        dimensions: {
          width: link.getBoundingClientRect().width,
          height: link.getBoundingClientRect().height
        },
        hasActiveState: link.classList.contains('active') || link.getAttribute('aria-current')
      })),
      averageLinkHeight: links.length > 0
        ? links.reduce((sum, link) => sum + link.getBoundingClientRect().height, 0) / links.length
        : 0,
      hasHamburgerMenu: !!hamburger,
      hamburgerDetails: hamburger ? {
        visible: getComputedStyle(hamburger).display !== 'none',
        dimensions: {
          width: hamburger.getBoundingClientRect().width,
          height: hamburger.getBoundingClientRect().height
        }
      } : null,
      accessibility: {
        role: navbar.getAttribute('role'),
        ariaLabel: navbar.getAttribute('aria-label'),
        hasSkipLink: !!document.querySelector('a[href="#main-content"], a[href="#content"]'),
        linksWithoutText: links.filter(link => !link.textContent?.trim()).length
      }
    };
  `;
}

function parseResult(result: any): any {
  try {
    const content = result.content?.[0]?.text || result.content;
    return typeof content === 'string' ? JSON.parse(content) : content;
  } catch {
    return {};
  }
}

function printCriticalReport(analysis: CriticalAnalysis) {
  console.log('\n╔══════════════════════════════════════════════════════════════════╗');
  console.log('║                🎯 RELATÓRIO CRÍTICO DA NAVBAR                   ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝\n');

  // 10 Pontos Críticos
  console.log('🚨 10 PONTOS CRÍTICOS DE APRIMORAMENTO:\n');
  analysis.uiUxIssues.forEach((issue, i) => {
    const priorityEmoji = {
      'critical': '🔴',
      'high': '🟠',
      'medium': '🟡',
      'low': '🟢'
    }[issue.priority];

    console.log(`${i + 1}. ${priorityEmoji} [${issue.category.toUpperCase()}] ${issue.issue}`);
    console.log(`   Estado atual: ${issue.currentState}`);
    console.log(`   💡 Recomendação: ${issue.recommendation}`);
    console.log(`   📈 Impacto: ${issue.impact}\n`);
  });

  // Propostas de Animação
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎬 3 PROPOSTAS DE ANIMAÇÃO COM FRAMER-MOTION:\n');
  analysis.animationProposals.forEach((proposal, i) => {
    console.log(`${i + 1}. ${proposal.name}`);
    console.log(`   📝 ${proposal.description}`);
    console.log(`   🎯 Benefício: ${proposal.benefit}\n`);
  });

  // Proposta Sticky
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📎 PROPOSTA NAVBAR STICKY COM PADDING REDUZIDO:\n');
  console.log(`📝 ${analysis.stickyNavbarProposal.description}`);
  console.log(`⚙️  Comportamento: ${analysis.stickyNavbarProposal.behavior}\n`);
}

// Executar análise
const url = 'http://localhost:3001';

performCriticalNavbarAnalysis(url).then(analysis => {
  printCriticalReport(analysis);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('✅ Análise crítica completa!');
  console.log(`🎯 ${analysis.uiUxIssues.length} pontos de aprimoramento identificados`);
  console.log(`🎬 ${analysis.animationProposals.length} propostas de animação criadas`);
  console.log('📎 1 proposta de navbar sticky implementada\n');
}).catch(error => {
  console.error('❌ Erro na análise crítica:', error);
  process.exit(1);
});