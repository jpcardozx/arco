# Chrome DevTools MCP para UI/UX - Análise Crítica de Navbar

## 🎯 Objetivo

Usar Chrome DevTools MCP para fazer **análise crítica profunda** da navbar do ARCO, identificando problemas de:
- Layout e alinhamento
- Responsividade
- Acessibilidade
- Performance
- Usabilidade
- Design system compliance

---

## 🔍 Metodologia de Análise

### 1. Snapshot Visual + Medições Precisas
```javascript
// Captura estado atual da navbar
{
  tool: "take_screenshot",
  tool: "take_snapshot",  // DOM com UIDs
  tool: "evaluate_script",
  script: `
    const navbar = document.querySelector('nav');
    const rect = navbar.getBoundingClientRect();
    const styles = getComputedStyle(navbar);
    
    return {
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
        padding: styles.padding
      },
      positioning: {
        position: styles.position,
        top: styles.top,
        zIndex: styles.zIndex,
        boxShadow: styles.boxShadow
      },
      typography: {
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        lineHeight: styles.lineHeight,
        color: styles.color
      },
      children: Array.from(navbar.children).map(child => ({
        tag: child.tagName,
        class: child.className,
        text: child.textContent?.trim(),
        width: child.getBoundingClientRect().width,
        height: child.getBoundingClientRect().height
      }))
    };
  `
}
```

### 2. Análise Responsiva Multi-Viewport
```javascript
// Desktop
{ tool: "resize_page", width: 1920, height: 1080 }
{ tool: "take_screenshot" }
{ tool: "evaluate_script", script: "/* medições */" }

// Tablet
{ tool: "resize_page", width: 1024, height: 768 }
{ tool: "take_screenshot" }
{ tool: "evaluate_script", script: "/* medições */" }

// Mobile
{ tool: "resize_page", width: 375, height: 667 }
{ tool: "take_screenshot" }
{ tool: "evaluate_script", script: "/* medições */" }
```

### 3. Análise de Acessibilidade
```javascript
{
  tool: "evaluate_script",
  script: `
    const navbar = document.querySelector('nav');
    
    return {
      semantics: {
        hasNav: !!navbar,
        role: navbar.getAttribute('role'),
        ariaLabel: navbar.getAttribute('aria-label'),
        hasLandmark: true
      },
      links: Array.from(navbar.querySelectorAll('a')).map(link => ({
        text: link.textContent?.trim(),
        href: link.href,
        ariaLabel: link.getAttribute('aria-label'),
        hasVisibleText: link.textContent?.trim().length > 0,
        isHidden: getComputedStyle(link).display === 'none',
        colorContrast: {
          fg: getComputedStyle(link).color,
          bg: getComputedStyle(link).backgroundColor
        }
      })),
      focusIndicators: {
        hasFocusVisible: navbar.querySelector(':focus-visible') !== null,
        outlineWidth: getComputedStyle(navbar.querySelector('a')).outlineWidth
      },
      keyboard: {
        hasTabIndex: Array.from(navbar.querySelectorAll('[tabindex]')).length,
        hasSkipLink: !!document.querySelector('a[href="#main-content"]')
      }
    };
  `
}
```

### 4. Performance de Interação
```javascript
{
  tool: "performance_start_trace"
}

// Simular hover em links
{
  tool: "hover",
  uid: "navbar-link-1"
}

// Simular click em menu mobile
{
  tool: "click",
  uid: "mobile-menu-button"
}

{
  tool: "performance_stop_trace"
}

{
  tool: "performance_analyze_insight"
}
```

### 5. Análise de Console/Errors
```javascript
{
  tool: "list_console_messages"
}

// Verificar erros específicos
{
  tool: "evaluate_script",
  script: `
    const errors = [];
    const navbar = document.querySelector('nav');
    
    // Verificar links quebrados
    navbar.querySelectorAll('a').forEach(link => {
      if (link.href === '#' || link.href.endsWith('#')) {
        errors.push({ type: 'broken-link', element: link.textContent });
      }
    });
    
    // Verificar imagens sem alt
    navbar.querySelectorAll('img').forEach(img => {
      if (!img.alt) {
        errors.push({ type: 'missing-alt', src: img.src });
      }
    });
    
    return { errors, count: errors.length };
  `
}
```

---

## 🛠️ Script Completo de Análise

Vou criar um script automatizado que faz análise completa da navbar:

```typescript
// mcp/scripts/analyze-navbar.ts
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import fs from 'fs';

interface NavbarAnalysis {
  timestamp: string;
  url: string;
  viewports: {
    desktop: any;
    tablet: any;
    mobile: any;
  };
  accessibility: any;
  performance: any;
  issues: string[];
  recommendations: string[];
}

async function analyzeNavbar(url: string): Promise<NavbarAnalysis> {
  const transport = new StdioClientTransport({
    command: 'npx',
    args: ['-y', 'chrome-devtools-mcp@latest']
  });

  const client = new Client(
    { name: 'navbar-analyzer', version: '1.0.0' },
    { capabilities: {} }
  );

  await client.connect(transport);
  
  const analysis: NavbarAnalysis = {
    timestamp: new Date().toISOString(),
    url,
    viewports: {},
    accessibility: {},
    performance: {},
    issues: [],
    recommendations: []
  };

  try {
    // 1. Navegar para página
    console.log('🌐 Navegando para', url);
    await client.callTool({
      name: 'navigate_page',
      arguments: { url }
    });

    // 2. Análise Desktop (1920x1080)
    console.log('📊 Analisando viewport desktop...');
    await client.callTool({
      name: 'resize_page',
      arguments: { width: 1920, height: 1080 }
    });

    const desktopScreenshot = await client.callTool({
      name: 'take_screenshot',
      arguments: {}
    });

    const desktopAnalysis = await client.callTool({
      name: 'evaluate_script',
      arguments: {
        script: `
          const navbar = document.querySelector('nav');
          if (!navbar) return { error: 'Navbar não encontrada' };
          
          const rect = navbar.getBoundingClientRect();
          const styles = getComputedStyle(navbar);
          
          return {
            found: true,
            dimensions: {
              width: rect.width,
              height: rect.height,
              top: rect.top
            },
            layout: {
              display: styles.display,
              flexDirection: styles.flexDirection,
              justifyContent: styles.justifyContent,
              alignItems: styles.alignItems,
              gap: styles.gap,
              padding: styles.padding
            },
            positioning: {
              position: styles.position,
              top: styles.top,
              zIndex: styles.zIndex
            },
            items: Array.from(navbar.querySelectorAll('a')).map(link => ({
              text: link.textContent?.trim(),
              href: link.href,
              width: link.getBoundingClientRect().width,
              visible: getComputedStyle(link).display !== 'none'
            }))
          };
        `
      }
    });

    analysis.viewports.desktop = desktopAnalysis;

    // 3. Análise Tablet (1024x768)
    console.log('📊 Analisando viewport tablet...');
    await client.callTool({
      name: 'resize_page',
      arguments: { width: 1024, height: 768 }
    });

    const tabletScreenshot = await client.callTool({
      name: 'take_screenshot',
      arguments: {}
    });

    const tabletAnalysis = await client.callTool({
      name: 'evaluate_script',
      arguments: { script: `/* mesmo script */` }
    });

    analysis.viewports.tablet = tabletAnalysis;

    // 4. Análise Mobile (375x667)
    console.log('📊 Analisando viewport mobile...');
    await client.callTool({
      name: 'resize_page',
      arguments: { width: 375, height: 667 }
    });

    const mobileScreenshot = await client.callTool({
      name: 'take_screenshot',
      arguments: {}
    });

    const mobileAnalysis = await client.callTool({
      name: 'evaluate_script',
      arguments: { script: `/* mesmo script */` }
    });

    analysis.viewports.mobile = mobileAnalysis;

    // 5. Análise de Acessibilidade
    console.log('♿ Analisando acessibilidade...');
    const accessibilityAnalysis = await client.callTool({
      name: 'evaluate_script',
      arguments: {
        script: `
          const navbar = document.querySelector('nav');
          
          return {
            semantics: {
              hasNav: !!navbar,
              role: navbar?.getAttribute('role'),
              ariaLabel: navbar?.getAttribute('aria-label')
            },
            links: Array.from(navbar?.querySelectorAll('a') || []).map(link => ({
              text: link.textContent?.trim(),
              hasAriaLabel: !!link.getAttribute('aria-label'),
              hasVisibleText: (link.textContent?.trim().length || 0) > 0,
              href: link.href,
              target: link.target
            })),
            keyboard: {
              hasSkipLink: !!document.querySelector('a[href="#main-content"]'),
              focusableElements: Array.from(navbar?.querySelectorAll('a, button') || []).length
            }
          };
        `
      }
    });

    analysis.accessibility = accessibilityAnalysis;

    // 6. Verificar Console Errors
    console.log('🐛 Verificando erros de console...');
    const consoleMessages = await client.callTool({
      name: 'list_console_messages',
      arguments: {}
    });

    // 7. Análise Crítica e Recomendações
    console.log('🔍 Gerando análise crítica...');

    // Verificar issues comuns
    const desktopData = (desktopAnalysis.content as any)?.[0]?.text;
    if (desktopData) {
      const data = JSON.parse(desktopData);
      
      // Issue: Navbar muito alta
      if (data.dimensions?.height > 100) {
        analysis.issues.push(`Navbar muito alta (${data.dimensions.height}px) - prejudica espaço útil`);
        analysis.recommendations.push('Reduzir altura da navbar para 64-80px no desktop');
      }

      // Issue: Não sticky
      if (data.positioning?.position !== 'fixed' && data.positioning?.position !== 'sticky') {
        analysis.issues.push('Navbar não é fixa/sticky - má UX ao scroll');
        analysis.recommendations.push('Implementar position: sticky ou fixed para melhor navegação');
      }

      // Issue: Z-index baixo
      if (parseInt(data.positioning?.zIndex || '0') < 100) {
        analysis.issues.push('Z-index muito baixo - pode ser sobreposta por outros elementos');
        analysis.recommendations.push('Definir z-index: 1000 ou superior');
      }

      // Issue: Gaps inconsistentes
      if (!data.layout?.gap) {
        analysis.issues.push('Sem gaps definidos - espaçamento manual inconsistente');
        analysis.recommendations.push('Usar CSS gap para espaçamento consistente entre items');
      }
    }

    // Verificar acessibilidade
    const a11yData = (accessibilityAnalysis.content as any)?.[0]?.text;
    if (a11yData) {
      const data = JSON.parse(a11yData);
      
      if (!data.semantics?.ariaLabel) {
        analysis.issues.push('Navbar sem aria-label');
        analysis.recommendations.push('Adicionar aria-label="Navegação principal" na tag <nav>');
      }

      if (!data.keyboard?.hasSkipLink) {
        analysis.issues.push('Sem link "pular para conteúdo"');
        analysis.recommendations.push('Adicionar skip link para acessibilidade de teclado');
      }

      data.links?.forEach((link: any, i: number) => {
        if (!link.hasVisibleText && !link.hasAriaLabel) {
          analysis.issues.push(`Link ${i + 1} sem texto ou aria-label`);
          analysis.recommendations.push(`Adicionar texto ou aria-label no link "${link.href}"`);
        }
      });
    }

    // Salvar relatório
    const reportPath = `/home/jpcardozx/projetos/arco/logs/navbar-analysis-${Date.now()}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2));
    console.log(`\n📄 Relatório salvo em: ${reportPath}`);

  } finally {
    await client.close();
  }

  return analysis;
}

// Executar análise
const url = process.argv[2] || 'http://localhost:3000';
analyzeNavbar(url).then(analysis => {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ ANÁLISE COMPLETA DA NAVBAR');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  console.log(`🎯 Issues encontrados: ${analysis.issues.length}`);
  analysis.issues.forEach((issue, i) => {
    console.log(`   ${i + 1}. ${issue}`);
  });
  
  console.log(`\n💡 Recomendações: ${analysis.recommendations.length}`);
  analysis.recommendations.forEach((rec, i) => {
    console.log(`   ${i + 1}. ${rec}`);
  });
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}).catch(console.error);
```

---

## 🎯 Issues Comuns que o MCP Detecta

### Layout Issues
- ✅ Altura excessiva (> 80px)
- ✅ Alinhamento vertical incorreto
- ✅ Espaçamento inconsistente
- ✅ Items não centralizados
- ✅ Logo desproporcional

### Responsividade
- ✅ Quebra em tablets (768-1024px)
- ✅ Menu hamburger não funcional
- ✅ Overflow horizontal em mobile
- ✅ Texto cortado
- ✅ Touch targets pequenos (< 44px)

### Acessibilidade
- ✅ Falta de aria-labels
- ✅ Contraste de cores insuficiente
- ✅ Sem skip link
- ✅ Foco não visível
- ✅ Links sem texto

### Performance
- ✅ Animações custosas (> 16ms)
- ✅ Repaints desnecessários
- ✅ Layout shifts (CLS)
- ✅ Hover lag

### UX Issues
- ✅ Navbar não sticky
- ✅ Active state não claro
- ✅ Hierarquia visual confusa
- ✅ CTA não destacado
- ✅ Z-index issues

---

## 🚀 Como Usar

### Via MCP Inspector (Interativo):
```bash
./mcp/scripts/start-inspector.sh
# http://localhost:6274

# 1. navigate_page → http://localhost:3000
# 2. take_screenshot
# 3. evaluate_script → [script de análise acima]
# 4. resize_page → 375x667
# 5. take_screenshot (comparar mobile)
```

### Via Script Automatizado:
```bash
# Será criado em breve
npx tsx mcp/scripts/analyze-navbar.ts http://localhost:3000
```

---

## 📊 Exemplo de Relatório Gerado

```json
{
  "timestamp": "2025-10-01T...",
  "url": "http://localhost:3000",
  "issues": [
    "Navbar muito alta (120px) - prejudica espaço útil",
    "Navbar não é fixa/sticky - má UX ao scroll",
    "Z-index muito baixo - pode ser sobreposta",
    "Sem gaps definidos - espaçamento inconsistente",
    "Navbar sem aria-label",
    "Sem link 'pular para conteúdo'"
  ],
  "recommendations": [
    "Reduzir altura para 64-80px no desktop",
    "Implementar position: sticky",
    "Definir z-index: 1000",
    "Usar CSS gap para espaçamento",
    "Adicionar aria-label='Navegação principal'",
    "Adicionar skip link para a11y"
  ],
  "viewports": {
    "desktop": { /* medições */ },
    "tablet": { /* medições */ },
    "mobile": { /* medições */ }
  }
}
```

---

## ✅ Próximo Passo

Quer que eu:

1. **Crie o script completo** de análise automatizada?
2. **Execute análise manual** via Inspector agora?
3. **Mostre correções específicas** baseadas nos issues encontrados?

Qual você prefere? 🎯
