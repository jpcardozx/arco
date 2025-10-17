# 📦 Dependências para Sistema de Agendamentos

## Instalar agora:

```bash
# Date & Time Management
pnpm add date-fns date-fns-tz
pnpm add react-day-picker

# FullCalendar (já instalado, mas garantir plugins)
pnpm add @fullcalendar/react @fullcalendar/core
pnpm add @fullcalendar/daygrid @fullcalendar/timegrid
pnpm add @fullcalendar/interaction @fullcalendar/list

# Mercado Pago
pnpm add mercadopago
pnpm add @mercadopago/sdk-react

# Form & Validation
pnpm add react-hook-form zod @hookform/resolvers

# Confetti & Celebrations
pnpm add canvas-confetti
pnpm add @types/canvas-confetti -D

# iCal generation
pnpm add ics

# Email (Resend - free tier: 100 emails/day)
pnpm add resend

# QR Code (for PIX)
pnpm add qrcode.react

# Copy to clipboard
pnpm add react-hot-toast

# Already installed (verify):
# - framer-motion ✓
# - lucide-react ✓
# - @tanstack/react-query ✓
# - sonner ✓
```

## API Services (Free/Freemium):

### 1. Mercado Pago (Pagamento)
- **Tier**: Free (2.99% + R$ 0.39 por transação)
- **Docs**: https://www.mercadopago.com.br/developers/
- **Features**: PIX, Cartão, Boleto, Parcelamento
- **Setup**: Criar conta → Credenciais → Webhook

### 2. Resend (Email)
- **Tier**: Free 100 emails/day, 3k/month
- **Docs**: https://resend.com/docs
- **Features**: Templates, Analytics, Logs
- **Setup**: resend.com → API Key

### 3. Cal.com API (Calendário - Opcional)
- **Tier**: Free (self-hosted) ou $12/mo
- **Docs**: https://cal.com/docs
- **Features**: Scheduling, Integrations
- **Alternative**: Usar próprio sistema (já criamos)

### 4. Google Calendar API (Sync)
- **Tier**: Free (quota 1M requests/day)
- **Docs**: https://developers.google.com/calendar
- **Features**: Create events, Get availability
- **Setup**: Google Cloud Console → OAuth

### 5. Zoom API (Meeting creation)
- **Tier**: Free (até 100 participants, 40min limit)
- **Docs**: https://marketplace.zoom.us/docs/api-reference
- **Features**: Create meetings, Recordings
- **Setup**: Zoom Marketplace → OAuth App

### 6. Google Meet API (Alternative)
- **Tier**: Free (integrado com Google Calendar)
- **Docs**: https://developers.google.com/meet
- **Features**: Auto-create links
- **Setup**: Same as Calendar API

### 7. Supabase Realtime (já temos!)
- **Tier**: Free 500MB DB, 2GB bandwidth
- **Features**: WebSocket, Postgres, Auth
- **We use**: Database + RLS + Edge Functions

### 8. Vercel Cron Jobs (Reminders)
- **Tier**: Free on Hobby plan
- **Docs**: https://vercel.com/docs/cron-jobs
- **Features**: Scheduled functions
- **Use**: Send reminder emails

---

## Stack Final:

```typescript
Frontend:
├─ Next.js 15 (App Router)
├─ React 18
├─ TypeScript
├─ Tailwind CSS
├─ shadcn/ui
├─ Framer Motion (animations)
├─ FullCalendar (scheduling)
├─ Mercado Pago Brick (checkout)
└─ Canvas Confetti (celebrations)

Backend:
├─ Supabase (Database + Auth + Realtime)
├─ Edge Functions (webhooks, cron)
├─ Mercado Pago API (payments)
├─ Resend API (emails)
├─ Google Calendar API (sync)
└─ Zoom/Meet API (meetings)

Dev Tools:
├─ TypeScript
├─ ESLint
├─ Prettier
└─ Vercel (deployment)
```

---

## Custos Mensais (Estimativa):

```
Supabase Free:        R$   0 (até 500MB DB)
Mercado Pago:         ~R$ 150 (30 transações @ R$ 500 avg)
Resend Free:          R$   0 (até 3k emails/mês)
Google APIs:          R$   0 (dentro do free tier)
Zoom Free:            R$   0 (até 40min meetings)
Vercel Hobby:         R$   0 (free tier)
Domain:               R$  40 (anual ÷ 12)
─────────────────────────────
TOTAL:                ~R$ 190/mês

Revenue (30 bookings): R$ 7.750+
Profit:                R$ 7.560+ (97% margin!)
```

---

**Ready to install? Run:**
```bash
pnpm add date-fns date-fns-tz react-day-picker mercadopago @mercadopago/sdk-react canvas-confetti @types/canvas-confetti ics resend qrcode.react react-hot-toast
```

🚀 Vamos começar a implementação!
