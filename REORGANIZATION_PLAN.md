# Plano de Reorganização da Estrutura do Projeto Arco

## Problemas atuais encontrados

1. Arquitetura confusa de diretórios
2. Múltiplas versões do mesmo componente (Enhanced, Revised, etc.)
3. Mistura de componentes na raiz e outros em subdiretórios
4. Inconsistência de importações e configurações de caminhos
5. Falta de padronização de formatação de código
6. Problemas de instalação de dependências com pnpm

## Estrutura recomendada

```
src/
  app/           # Diretório principal do Next.js App Router
    (client)/     # Componentes específicos do cliente
    (server)/     # Componentes específicos do servidor
    layout.tsx
    page.tsx
    globals.css
  components/
    ui/           # Componentes de UI básicos
    layout/       # Componentes de layout
    sections/     # Seções maiores das páginas
    features/     # Componentes específicos de funcionalidades
  lib/            # Utilidades, funções, bibliotecas
    utils/        # Funções utilitárias
    config/       # Configurações
    hooks/        # Custom hooks React
    store/        # Gerenciamento de estado (se houver)
  types/          # Definições de tipos TypeScript
  styles/         # Estilos globais e utilitários CSS/SCSS
  public/         # Arquivos estáticos
    images/       # Imagens
    fonts/        # Fontes
    icons/        # Ícones
```

## Tratamento de componentes duplicados

Para resolver a questão de múltiplas versões do mesmo componente (Enhanced, Revised, etc.):

1. **Implementar Versões com Feature Flags** - Use uma única versão do componente e implemente feature flags para habilitar diferentes comportamentos ou aparências.

2. **Criar componentes base e extensões** - Mantenha um componente base (`BaseHero`) e extensões (`HeroVariantA`, `HeroVariantB`) que herdam do base.

3. **Utilizar componentes compostos** - Crie um componente principal que aceita vários subcomponentes, permitindo composição flexível.

## Estratégia de implementação

1. Reinstalar dependências (concluído)
2. Corrigir configurações TypeScript
3. Implementar formatação de código automática
4. Migrar componentes para a nova estrutura
5. Consolidar código duplicado
6. Atualizar importações em todo o projeto
