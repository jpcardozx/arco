# 📧 Email System

Clean architecture email system com SOLID principles.

## Quick Start

```typescript
import { emailService } from '@/lib/email'

// Send welcome email
await emailService.sendWelcome(
  { email: 'user@example.com', name: 'João' },
  'João Silva'
)

// Send password reset
await emailService.sendPasswordReset(
  { email: 'user@example.com' },
  'reset_token_123'
)

// Send notification
await emailService.sendNotification(
  { email: 'user@example.com' },
  'João',
  {
    title: 'Novo recurso',
    message: 'Confira as novidades',
    actionUrl: '/dashboard',
    actionLabel: 'Ver'
  }
)
```

## Architecture

- **SOLID**: Single Responsibility, Open/Closed, etc.
- **Clean Code**: Small functions, clear names
- **DRY**: Zero duplication
- **Type-safe**: Full TypeScript

## Documentation

- **Architecture:** `/docs/EMAIL_ARCHITECTURE_CLEAN.md`
- **Refactoring:** `/docs/RESEND_REFACTORING_SUMMARY.md`
- **Audit:** `/docs/RESEND_AUDIT_REPORT.md`

## Create New Template

```typescript
import { BaseEmailTemplate } from './base.template'

export class MyTemplate extends BaseEmailTemplate {
  render(data: Record<string, unknown>): string {
    const content = `
${this.renderCard(`<h2>Hello</h2>`, 'gradient')}
${this.renderButton('Click', 'https://url.com')}
    `
    return this.wrapHtml(content, 'My Email')
  }

  renderPlainText(data: Record<string, unknown>): string {
    return 'Hello\n\nClick: https://url.com'
  }
}
```

## Components

- `renderCard(content, variant)` - Cards (default, gradient, warning)
- `renderButton(text, url, variant)` - CTAs (primary, secondary)
- `renderHeader()` - Consistent header
- `renderFooter()` - Consistent footer
- `escapeHtml(text)` - XSS protection
- `formatDate(date)` - PT-BR format
- `formatTime(date)` - HH:mm format

## Files

```
email/
├── index.ts                # Public API
├── types.ts                # Type definitions
├── config.ts               # Configuration
├── interfaces.ts           # Abstractions
├── email.service.ts        # Main service
├── resend-service.ts       # Legacy compatibility
├── providers/
│   └── resend.provider.ts
└── templates/
    ├── base.template.ts
    └── welcome.template.ts
```

## Legacy Support

Old code still works:

```typescript
import { sendWelcomeEmail } from '@/lib/email/resend-service'
await sendWelcomeEmail('email@test.com', 'João')
```

Migrate gradually to new API for better type safety and maintainability.
