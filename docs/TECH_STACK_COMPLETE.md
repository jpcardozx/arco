# 📦 ARCO MVP - TECH STACK COMPLETO

## 🎯 STACK OVERVIEW

```typescript
const techStack = {
  framework: 'Next.js 15',
  language: 'TypeScript 5.3',
  styling: 'Tailwind CSS 3.4',
  database: 'Supabase (PostgreSQL)',
  orm: 'Drizzle ORM',
  auth: 'Supabase Auth',
  deployment: 'Vercel',
  runtime: 'Node.js 20',
}
```

---

## 📋 PACKAGE.JSON COMPLETO

### **Core Dependencies**

```json
{
  "dependencies": {
    // ============================================
    // NEXT.JS & REACT
    // ============================================
    "next": "^15.0.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    
    // ============================================
    // TYPESCRIPT
    // ============================================
    "typescript": "^5.3.3",
    "@types/node": "^20.10.6",
    "@types/react": "^18.2.46",
    "@types/react-dom": "^18.2.18",
    
    // ============================================
    // STYLING & UI
    // ============================================
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.33",
    "autoprefixer": "^10.4.16",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "class-variance-authority": "^0.7.0",
    
    // ============================================
    // SHADCN/UI COMPONENTS
    // ============================================
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-tooltip": "^1.0.7",
    "lucide-react": "^0.309.0",
    
    // ============================================
    // DATABASE & ORM
    // ============================================
    "@supabase/supabase-js": "^2.39.3",
    "@supabase/ssr": "^0.1.0",
    "drizzle-orm": "^0.29.3",
    "drizzle-kit": "^0.20.10",
    "postgres": "^3.4.3",
    
    // ============================================
    // FORMS & VALIDATION
    // ============================================
    "react-hook-form": "^7.49.3",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.4",
    
    // ============================================
    // DATA FETCHING & STATE
    // ============================================
    "@tanstack/react-query": "^5.17.19",
    "@tanstack/react-table": "^8.11.7",
    "swr": "^2.2.4",
    
    // ============================================
    // CHARTS & VISUALIZATION
    // ============================================
    "recharts": "^2.10.4",
    "tremor": "^3.14.1",
    "date-fns": "^3.2.0",
    
    // ============================================
    // PAYMENTS (STRIPE)
    // ============================================
    "stripe": "^14.10.0",
    "@stripe/stripe-js": "^2.4.0",
    
    // ============================================
    // ASYNC JOBS (INNGEST)
    // ============================================
    "inngest": "^3.14.0",
    
    // ============================================
    // RATE LIMITING (UPSTASH)
    // ============================================
    "@upstash/ratelimit": "^1.0.1",
    "@upstash/redis": "^1.28.2",
    
    // ============================================
    // EMAIL (RESEND)
    // ============================================
    "resend": "^3.2.0",
    "react-email": "^2.0.0",
    "@react-email/components": "^0.0.14",
    
    // ============================================
    // LIGHTHOUSE & PERFORMANCE
    // ============================================
    "puppeteer": "^21.7.0",
    "lighthouse": "^11.5.0",
    "@puppeteer/browsers": "^1.9.1",
    
    // ============================================
    // PDF GENERATION
    // ============================================
    "@react-pdf/renderer": "^3.1.15",
    
    // ============================================
    // MARKDOWN & CONTENT
    // ============================================
    "next-mdx-remote": "^4.4.1",
    "gray-matter": "^4.0.3",
    "remark": "^15.0.1",
    "remark-gfm": "^4.0.0",
    
    // ============================================
    // ADMIN PANEL (REFINE)
    // ============================================
    "@refinedev/core": "^4.47.1",
    "@refinedev/nextjs-router": "^6.0.0",
    "@refinedev/react-hook-form": "^4.8.14",
    "@refinedev/react-table": "^5.6.6",
    
    // ============================================
    // MONITORING & ERRORS (SENTRY)
    // ============================================
    "@sentry/nextjs": "^7.99.0",
    
    // ============================================
    // UTILITIES
    // ============================================
    "nanoid": "^5.0.4",
    "sharp": "^0.33.2",
    "dayjs": "^1.11.10",
    "lodash": "^4.17.21",
    "@types/lodash": "^4.14.202",
    
    // ============================================
    // AI (VERCEL AI SDK)
    // ============================================
    "ai": "^3.0.7",
    "@ai-sdk/openai": "^0.0.24",
    "@ai-sdk/anthropic": "^0.0.24"
  },
  
  "devDependencies": {
    // ============================================
    // TESTING
    // ============================================
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.6",
    "vitest": "^1.2.0",
    "@vitest/ui": "^1.2.0",
    
    // ============================================
    // LINTING & FORMATTING
    // ============================================
    "eslint": "^8.56.0",
    "eslint-config-next": "^15.0.3",
    "@typescript-eslint/parser": "^6.18.1",
    "@typescript-eslint/eslint-plugin": "^6.18.1",
    "prettier": "^3.1.1",
    "prettier-plugin-tailwindcss": "^0.5.11",
    
    // ============================================
    // SUPABASE CLI
    // ============================================
    "supabase": "^1.142.2"
  }
}
```

---

## 🔧 CONFIGURATION FILES

### **1. tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

### **2. drizzle.config.ts**

```typescript
import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

export default {
  schema: './src/lib/db/schema.ts',
  out: './supabase/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config
```

### **3. middleware.ts (Auth + Rate Limiting)**

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Rate limiter (Upstash Redis)
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
  analytics: true,
})

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Rate limiting for /api/* routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip ?? '127.0.0.1'
    const { success } = await ratelimit.limit(ip)

    if (!success) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }
  }

  // Supabase Auth
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### **4. .env.local.example**

```bash
# ============================================
# SUPABASE
# ============================================
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/[DATABASE]

# ============================================
# STRIPE
# ============================================
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_FREE=price_...
STRIPE_PRICE_ID_PAID=price_...

# ============================================
# UPSTASH REDIS (RATE LIMITING)
# ============================================
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=...

# ============================================
# RESEND (EMAIL)
# ============================================
RESEND_API_KEY=re_...

# ============================================
# INNGEST (ASYNC JOBS)
# ============================================
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...

# ============================================
# SENTRY (ERROR MONITORING)
# ============================================
SENTRY_DSN=https://...@sentry.io/...
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...

# ============================================
# VERCEL AI SDK (OPENAI/ANTHROPIC)
# ============================================
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# ============================================
# CAL.COM (SCHEDULING)
# ============================================
CALCOM_API_KEY=cal_live_...

# ============================================
# BETTERSTACK (UPTIME MONITORING)
# ============================================
BETTERSTACK_API_KEY=...

# ============================================
# APP CONFIG
# ============================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## 📚 LIB STRUCTURE

```
src/lib/
├─ db/
│  ├─ index.ts                    # Drizzle client
│  ├─ schema.ts                   # Database schema (Drizzle)
│  └─ migrations/                 # SQL migrations
│
├─ supabase/
│  ├─ client.ts                   # Supabase client (browser)
│  ├─ server.ts                   # Supabase client (server)
│  └─ middleware.ts               # Auth middleware
│
├─ stripe/
│  ├─ client.ts                   # Stripe client
│  └─ webhooks.ts                 # Webhook handlers
│
├─ inngest/
│  ├─ client.ts                   # Inngest client
│  └─ functions/
│     ├─ measure-performance.ts
│     ├─ check-uptime.ts
│     ├─ send-email.ts
│     └─ generate-report.ts
│
├─ lighthouse/
│  ├─ analyzer.ts                 # Puppeteer + Lighthouse
│  └─ arco-index.ts               # ARCO Index calculation
│
├─ email/
│  ├─ templates/
│  │  ├─ welcome.tsx
│  │  ├─ ticket-created.tsx
│  │  └─ report-ready.tsx
│  └─ send.ts                     # Resend wrapper
│
├─ pdf/
│  └─ generator.ts                # React PDF renderer
│
├─ utils/
│  ├─ cn.ts                       # Class name merger
│  ├─ format.ts                   # Number/date formatters
│  └─ validations.ts              # Zod schemas
│
└─ hooks/
   ├─ use-current-user.ts
   ├─ use-projects.ts
   ├─ use-tickets.ts
   └─ use-performance-metrics.ts
```

---

## 🚀 ADDITIONAL TOOLS (Open Source)

### **Development Tools**

```json
{
  "devDependencies": {
    // ============================================
    // DATABASE TOOLS
    // ============================================
    "drizzle-studio": "^0.0.43",        // Database GUI
    
    // ============================================
    // API TESTING
    // ============================================
    "msw": "^2.0.11",                   // Mock Service Worker
    
    // ============================================
    // PERFORMANCE
    // ============================================
    "@next/bundle-analyzer": "^15.0.3", // Bundle analysis
    "webpack-bundle-analyzer": "^4.10.1",
    
    // ============================================
    // DOCS
    // ============================================
    "storybook": "^7.6.7",              // Component docs
    "@storybook/react": "^7.6.7",
    
    // ============================================
    // COMMIT LINTING
    // ============================================
    "husky": "^8.0.3",                  // Git hooks
    "lint-staged": "^15.2.0",           // Pre-commit linting
    "commitlint": "^18.4.4",            // Commit message linting
    "@commitlint/config-conventional": "^18.4.4"
  }
}
```

### **Monitoring & Analytics (FREE tiers)**

```typescript
// Alternative to paid services
const freeAlternatives = {
  // Instead of Sentry ($26/mo)
  logging: 'Axiom.co (500 GB/mo free) or Logtail',
  
  // Instead of BetterStack ($20/mo)
  uptime: 'UptimeRobot.com (50 monitors free)',
  
  // Instead of Mixpanel
  analytics: 'PostHog.com (1M events/mo free)',
  
  // Instead of Vercel Analytics
  webAnalytics: 'Plausible.io (10k pageviews/mo free)',
}
```

---

## 📦 INSTALLATION COMMANDS

### **1. Install Dependencies**

```bash
# Install all dependencies
pnpm install

# Or with specific versions
pnpm add next@15.0.3 react@19 react-dom@19
pnpm add -D typescript @types/node @types/react

# Shadcn/ui init (interactive)
pnpm dlx shadcn-ui@latest init

# Add specific Shadcn components
pnpm dlx shadcn-ui@latest add button
pnpm dlx shadcn-ui@latest add form
pnpm dlx shadcn-ui@latest add table
pnpm dlx shadcn-ui@latest add dialog
pnpm dlx shadcn-ui@latest add dropdown-menu
pnpm dlx shadcn-ui@latest add toast
```

### **2. Database Setup**

```bash
# Supabase CLI
pnpm supabase init
pnpm supabase start
pnpm supabase status

# Drizzle ORM
pnpm drizzle-kit generate:pg
pnpm drizzle-kit push:pg
pnpm drizzle-kit studio  # Database GUI on localhost:4983
```

### **3. Development**

```bash
# Start dev server
pnpm dev

# Lint
pnpm lint

# Type check
pnpm type-check

# Build
pnpm build

# Start production
pnpm start
```

---

## 🎯 SCRIPTS (package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    
    "db:generate": "drizzle-kit generate:pg",
    "db:push": "drizzle-kit push:pg",
    "db:studio": "drizzle-kit studio",
    "db:seed": "tsx scripts/seed.ts",
    
    "supabase:start": "supabase start",
    "supabase:stop": "supabase stop",
    "supabase:status": "supabase status",
    "supabase:reset": "supabase db reset",
    
    "inngest:dev": "npx inngest-cli@latest dev",
    
    "stripe:listen": "stripe listen --forward-to localhost:3000/api/webhooks/stripe",
    
    "test": "vitest",
    "test:ui": "vitest --ui",
    
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,md}\""
  }
}
```

---

## ✅ PRÓXIMOS PASSOS

1. ✅ **Instalar dependências:** `pnpm install`
2. ✅ **Setup Supabase:** `pnpm supabase init && pnpm supabase start`
3. ✅ **Criar migrations:** (próximo arquivo)
4. ✅ **Configurar Drizzle schema:** (próximo arquivo)
5. ✅ **Iniciar desenvolvimento:** `pnpm dev`

**Posso criar as migrations agora?** 🚀
