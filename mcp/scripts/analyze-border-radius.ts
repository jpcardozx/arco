import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function analyzeBorderRadius() {
  console.log('🔍 Analisando problemas de border-radius...\n');

  const transport = new StdioClientTransport({
    command: 'node',
    args: [
      '/home/jpcardozx/projetos/arco/node_modules/.pnpm/chrome-devtools-mcp@0.6.0/node_modules/chrome-devtools-mcp/build/src/index.js',
      '--headless=false'
    ]
  });

  const client = new Client(
    { name: 'border-radius-analyzer', version: '1.0.0' },
    { capabilities: {} }
  );

  await client.connect(transport);

  try {
    // Navegar
    console.log('🌐 Navegando para localhost:3000...');
    await client.callTool({
      name: 'navigate_page',
      arguments: { url: 'http://localhost:3000' }
    });

    await client.callTool({
      name: 'wait_for',
      arguments: { text: 'networkidle', timeout: 5000 }
    });

    console.log('✅ Página carregada\n');

    // Analisar navbar
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Analisando Navbar Border-Radius');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const navbarResult = await client.callTool({
      name: 'evaluate_script',
      arguments: {
        function: `
          const nav = document.querySelector('nav');
          if (!nav) return { error: 'Navbar não encontrada' };

          const buttons = Array.from(nav.querySelectorAll('button, a[class*="button"], .btn, [class*="rounded"]'));
          const links = Array.from(nav.querySelectorAll('a'));
          
          return {
            navbar: {
              tag: nav.tagName,
              classes: nav.className,
              borderRadius: getComputedStyle(nav).borderRadius
            },
            buttons: buttons.map(btn => ({
              tag: btn.tagName,
              text: btn.textContent?.trim()?.substring(0, 30),
              classes: btn.className,
              styles: {
                borderRadius: getComputedStyle(btn).borderRadius,
                border: getComputedStyle(btn).border,
                padding: getComputedStyle(btn).padding
              },
              hasRoundedClass: btn.className.includes('rounded'),
              computedRounded: getComputedStyle(btn).borderRadius !== '0px'
            })),
            links: links.slice(0, 5).map(link => ({
              text: link.textContent?.trim()?.substring(0, 20),
              classes: link.className,
              borderRadius: getComputedStyle(link).borderRadius,
              hasRoundedClass: link.className.includes('rounded')
            }))
          };
        `
      }
    });

    const navbarData = parseResult(navbarResult);
    console.log('📋 Navbar Data:');
    console.log(JSON.stringify(navbarData, null, 2));
    console.log('');

    // Analisar Hero Badge
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎯 Analisando Hero Badge "Soluções Premium"');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const badgeResult = await client.callTool({
      name: 'evaluate_script',
      arguments: {
        function: `
          const hero = document.querySelector('[class*="hero"]');
          if (!hero) return { error: 'Hero não encontrado' };

          // Buscar badge de várias formas
          const badges = [
            hero.querySelector('[class*="badge"]'),
            hero.querySelector('[class*="tag"]'),
            hero.querySelector('[class*="label"]'),
            ...Array.from(hero.querySelectorAll('*')).filter(el => 
              el.textContent?.includes('Soluções Premium') || 
              el.textContent?.includes('Premium')
            )
          ].filter(Boolean);

          const badge = badges[0];
          
          if (!badge) {
            return { 
              error: 'Badge não encontrado',
              heroClasses: hero.className,
              firstChildren: Array.from(hero.children).slice(0, 3).map(c => ({
                tag: c.tagName,
                class: c.className,
                text: c.textContent?.trim()?.substring(0, 50)
              }))
            };
          }

          const styles = getComputedStyle(badge);
          
          return {
            badge: {
              tag: badge.tagName,
              text: badge.textContent?.trim(),
              classes: badge.className,
              styles: {
                borderRadius: styles.borderRadius,
                padding: styles.padding,
                fontSize: styles.fontSize,
                backgroundColor: styles.backgroundColor,
                color: styles.color,
                border: styles.border,
                display: styles.display
              },
              hasRoundedClass: badge.className.includes('rounded'),
              computedRounded: styles.borderRadius !== '0px',
              parent: {
                tag: badge.parentElement?.tagName,
                classes: badge.parentElement?.className
              }
            },
            allBadges: badges.map(b => ({
              tag: b.tagName,
              text: b.textContent?.trim()?.substring(0, 30),
              classes: b.className,
              borderRadius: getComputedStyle(b).borderRadius
            }))
          };
        `
      }
    });

    const badgeData = parseResult(badgeResult);
    console.log('🎯 Badge Data:');
    console.log(JSON.stringify(badgeData, null, 2));
    console.log('');

    // Screenshot
    console.log('📸 Capturando screenshots...');
    await client.callTool({
      name: 'take_screenshot',
      arguments: {}
    });
    console.log('✅ Screenshot salvo\n');

    // Análise de Tailwind Config
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('⚙️  Verificando Configuração Tailwind');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const tailwindCheck = await client.callTool({
      name: 'evaluate_script',
      arguments: {
        function: `
          // Verificar se classes rounded estão sendo aplicadas
          const testDiv = document.createElement('div');
          testDiv.className = 'rounded-full rounded-lg rounded-md rounded';
          document.body.appendChild(testDiv);
          
          const styles = getComputedStyle(testDiv);
          const result = {
            roundedFull: styles.borderRadius,
            hasStyles: styles.borderRadius !== '0px'
          };
          
          document.body.removeChild(testDiv);
          
          // Verificar conflitos CSS
          const allStylesheets = Array.from(document.styleSheets);
          const hasResets = allStylesheets.some(sheet => {
            try {
              return Array.from(sheet.cssRules || []).some(rule => 
                rule.cssText?.includes('border-radius') && rule.cssText?.includes('0')
              );
            } catch(e) {
              return false;
            }
          });
          
          return {
            ...result,
            hasResetStyles: hasResets,
            totalStylesheets: allStylesheets.length
          };
        `
      }
    });

    const tailwindData = parseResult(tailwindCheck);
    console.log('⚙️  Tailwind Check:');
    console.log(JSON.stringify(tailwindData, null, 2));
    console.log('');

    // Diagnóstico Final
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 DIAGNÓSTICO DE BORDER-RADIUS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const issues: string[] = [];
    const fixes: string[] = [];

    // Analisar navbar buttons
    if (navbarData.buttons) {
      navbarData.buttons.forEach((btn: any) => {
        if (btn.hasRoundedClass && !btn.computedRounded) {
          issues.push(`❌ Button "${btn.text}" tem classe rounded mas border-radius: 0`);
          fixes.push(`   Verificar conflito CSS ou Tailwind não carregado`);
        }
      });
    }

    // Analisar badge
    if (badgeData.badge) {
      if (badgeData.badge.hasRoundedClass && !badgeData.badge.computedRounded) {
        issues.push(`❌ Badge "${badgeData.badge.text}" tem classe rounded mas border-radius: 0`);
        fixes.push(`   Verificar ordem de CSS ou reset global`);
      }
      if (badgeData.badge.styles.borderRadius === '0px') {
        issues.push(`❌ Badge totalmente quadrado - nenhum border-radius aplicado`);
        fixes.push(`   Adicionar classe rounded-full ou rounded-lg`);
      }
    }

    // Verificar Tailwind
    if (tailwindData && !tailwindData.hasStyles) {
      issues.push(`❌ Classes Tailwind rounded não estão funcionando`);
      fixes.push(`   Tailwind pode não estar carregado ou configurado incorretamente`);
    }

    if (tailwindData && tailwindData.hasResetStyles) {
      issues.push(`⚠️  Reset CSS detectado que pode estar sobrescrevendo border-radius`);
      fixes.push(`   Verificar ordem de imports ou usar !important`);
    }

    console.log('🚨 ISSUES ENCONTRADOS:\n');
    if (issues.length === 0) {
      console.log('   ✅ Nenhum issue de border-radius detectado');
    } else {
      issues.forEach(issue => console.log(`   ${issue}`));
    }

    console.log('\n💡 CORREÇÕES SUGERIDAS:\n');
    if (fixes.length === 0) {
      console.log('   ✅ Nenhuma correção necessária');
    } else {
      fixes.forEach(fix => console.log(`   ${fix}`));
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } finally {
    await client.close();
  }
}

function parseResult(result: any): any {
  try {
    const content = result.content?.[0]?.text || result.content;
    return typeof content === 'string' ? JSON.parse(content) : content;
  } catch {
    return {};
  }
}

// Executar
analyzeBorderRadius().catch(console.error);
