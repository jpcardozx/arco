# Correções App Router - Client/Server Components

## Problema Identificado

Conflito entre `'use client'` e exports de Server Component causando erro 500 em múltiplas páginas.

### Causa Raiz
No Next.js App Router, Client Components (com `'use client'`) não podem ter exports de configuração de Server Component:
- ❌ `export const dynamic = 'force-dynamic'`
- ❌ `export const dynamicParams = true`
- ❌ `export async function generateStaticParams() { ... }`

## Correções Aplicadas

### Estatísticas
- **Total de arquivos corrigidos:** 41 páginas
- **Padrão removido:** `export const dynamic = 'force-dynamic'` de Client Components
- **Backups criados:** Todos os arquivos têm backup com extensão `.backup`

### Arquivos Corrigidos

<details>
<summary>Lista completa (41 arquivos)</summary>

1. src/app/tripwire/success/page.tsx
2. src/app/tripwire/page.tsx
3. src/app/dashboard/campaigns/page.tsx
4. src/app/dashboard/documents/page.tsx
5. src/app/dashboard/leads/page.tsx
6. src/app/dashboard/whatsapp/page.tsx
7. src/app/dashboard/users/page.tsx
8. src/app/dashboard/funil/page.tsx
9. src/app/dashboard/mail/page.tsx
10. src/app/dashboard/cloud/page.tsx
11. src/app/dashboard/checklist/[id]/page.tsx
12. src/app/dashboard/checklist/page.tsx
13. src/app/dashboard/page.tsx
14. src/app/dashboard/crescimento/page.tsx
15. src/app/dashboard/appointments/page.tsx
16. src/app/dashboard/settings.disabled/page.tsx
17. src/app/dashboard/finance/page.tsx
18. src/app/landing-demo/page.tsx
19. src/app/auth/signup/page.tsx
20. src/app/auth/login/page.tsx
21. src/app/auth/reset-password/page.tsx
22. src/app/jpcardozx/page.tsx
23. src/app/mydomain/page.tsx
24. src/app/choice-make/page.tsx
25. src/app/monitor/webhooks/page.tsx
26. src/app/obrigado-tripwire/page.tsx
27. src/app/login/page.tsx
28. src/app/lead-magnet/page.tsx
29. src/app/sobre/page.tsx
30. src/app/jpcardozo/applications/[id]/schedule/page.tsx
31. src/app/assessment/page.tsx
32. src/app/checkout/success/page.tsx
33. src/app/checkout/test/page.tsx
34. src/app/checkout/error/page.tsx
35. src/app/checkout/pending/page.tsx
36. src/app/checkout/[planId]/page.tsx
37. src/app/obrigado-lead/page.tsx
38. src/app/services/page.tsx
39. src/app/agendamentos/v2/page.tsx
40. src/app/agendamentos/confirmacao/[bookingId]/page.tsx
41. src/app/agendamentos/page.tsx

</details>

## Padrão Correto do App Router

### ✅ Client Component (com interatividade)
```typescript
'use client'

import { useState } from 'react'

export default function MyPage() {
  const [state, setState] = useState(false)
  return <div>...</div>
}
```

### ✅ Server Component (com configurações dinâmicas)
```typescript
// Sem 'use client'
export const dynamic = 'force-dynamic'

export default function MyPage() {
  return <div>...</div>
}
```

### ✅ Pattern: Server Component + Client Wrapper
```typescript
// page.tsx (Server Component)
import { ClientWrapper } from './ClientWrapper'

export const dynamic = 'force-dynamic'

export default function Page() {
  return <ClientWrapper />
}

// ClientWrapper.tsx
'use client'

export function ClientWrapper() {
  // Lógica client-side aqui
  return <div>...</div>
}
```

## Próximos Passos

### 1. Reiniciar Servidor
```bash
# No terminal onde o Next.js está rodando
# Pressione Ctrl+C e reinicie:
pnpm dev
```

### 2. Verificar Funcionamento
Após reiniciar, testar:
- ✅ Homepage: http://localhost:3000/
- ✅ Dashboard: http://localhost:3000/dashboard
- ✅ Portfolio: http://localhost:3000/jpcardozo
- ✅ Outras páginas corrigidas

### 3. Remover Backups (após validação)
```bash
# Quando confirmar que tudo está funcionando:
find src/app -name "*.backup" -delete
```

### 4. Reverter se Necessário
```bash
# Se algo der errado, restaurar backups:
find src/app -name '*.backup' -exec bash -c 'mv "$0" "${0%.backup}"' {} \;
```

## Clean Code Principles Aplicados

### 1. Separation of Concerns
- Server Components: dados, configurações, SEO
- Client Components: interatividade, estado, eventos

### 2. Composition over Configuration
- Preferência por composição de componentes
- Wrapper pattern para separar responsabilidades

### 3. Explicit over Implicit
- Configurações claras no nível correto (server vs client)
- Sem mistura de contextos

### 4. DRY (Don't Repeat Yourself)
- Script automatizado para correção em massa
- Padrão consistente em toda aplicação

## Referências

- [Next.js App Router - Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js App Router - Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)
