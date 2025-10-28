# Email Backend - Deployment Guide

**Status**: ✅ Code Complete | 🟡 Configuration Pending  
**Created**: 2025-01-26  
**Updated**: 2025-01-26

---

## 📋 Overview

This guide covers deployment and configuration of the complete email backend infrastructure:

- ✅ **3 Edge Functions** (Deno runtime)
- ✅ **5 Database Functions** (PostgreSQL)
- ✅ **2 API Routes** (Next.js)
- 🟡 **Webhook Configuration** (Resend)
- 🟡 **Cron Jobs** (Supabase)

---

## 🏗️ Architecture Summary

```
┌─────────────────┐
│   Next.js App   │
│  (Frontend)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   API Routes    │
│ /api/email/send │
│ /api/email/     │
│    analytics    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Edge Functions  │
│ • send-email    │
│ • process-queue │
│ • resend-webhook│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │
│ • email_queue   │
│ • email_sequences│
│ • leads         │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  Resend API     │
│ (Email Provider)│
└─────────────────┘
```

---

## 📦 Files Created

### Edge Functions (Deno)
```
supabase/functions/
├── send-email/
│   └── index.ts          # Send email via Resend API
├── process-email-queue/
│   └── index.ts          # Cron job - process pending emails
└── resend-webhook/
    └── index.ts          # Handle Resend webhook events
```

### Database Migration
```
supabase/migrations/
└── 20251026000001_email_functions.sql
    ├── increment_email_sequence_step()
    ├── increment_lead_score()
    ├── schedule_next_email()
    ├── unsubscribe_lead()
    ├── get_email_analytics()
    └── initialize_sequence_progress() [trigger]
```

### API Routes (Next.js)
```
src/app/api/email/
├── send/
│   └── route.ts          # POST /api/email/send
└── analytics/
    └── route.ts          # GET /api/email/analytics
```

---

## 🚀 Deployment Steps

### 1. Apply Database Migration

```bash
cd /home/jpcardozx/projetos/arco

# Apply migration
supabase db push

# Verify functions exist
supabase db functions list
```

**Expected Output:**
```
✅ increment_email_sequence_step
✅ increment_lead_score
✅ schedule_next_email
✅ unsubscribe_lead
✅ get_email_analytics
✅ initialize_sequence_progress (trigger)
```

---

### 2. Deploy Edge Functions

```bash
# Deploy send-email function
supabase functions deploy send-email \
  --project-ref <YOUR_PROJECT_REF>

# Deploy process-email-queue function
supabase functions deploy process-email-queue \
  --project-ref <YOUR_PROJECT_REF>

# Deploy resend-webhook function
supabase functions deploy resend-webhook \
  --project-ref <YOUR_PROJECT_REF>
```

**Verification:**
```bash
supabase functions list
```

---

### 3. Configure Environment Variables

In Supabase Dashboard → Settings → Edge Functions:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
```

**Get your Resend API Key:**
1. Go to https://resend.com/api-keys
2. Create a new API key with "Sending access"
3. Copy and add to Supabase

---

### 4. Configure Resend Webhook

In Resend Dashboard → Webhooks → Add Webhook:

**Webhook URL:**
```
https://<YOUR_PROJECT_REF>.supabase.co/functions/v1/resend-webhook
```

**Events to Subscribe:**
- ✅ `email.sent`
- ✅ `email.delivered`
- ✅ `email.delivery_delayed`
- ✅ `email.bounced`
- ✅ `email.opened`
- ✅ `email.clicked`

**Signing Secret:**
Save the signing secret provided by Resend and add it to Supabase:

```bash
RESEND_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
```

---

### 5. Set Up Cron Job

In Supabase Dashboard → Database → Extensions:

**Enable pg_cron:**
```sql
CREATE EXTENSION IF NOT EXISTS pg_cron;
```

**Schedule Email Queue Processing:**
```sql
SELECT cron.schedule(
  'process-email-queue',
  '*/15 * * * *',  -- Every 15 minutes
  $$
  SELECT net.http_post(
    url := 'https://<YOUR_PROJECT_REF>.supabase.co/functions/v1/process-email-queue',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    ),
    body := '{}'::jsonb
  );
  $$
);
```

**Verify Cron Jobs:**
```sql
SELECT * FROM cron.job;
```

---

## 🧪 Testing

### Test Send Email

```bash
curl -X POST https://<YOUR_PROJECT_REF>.supabase.co/functions/v1/send-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_ANON_KEY>" \
  -d '{
    "to": "test@example.com",
    "subject": "Test Email",
    "html": "<h1>Hello World</h1>"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "messageId": "msg_xxxxxxxxxx"
}
```

---

### Test Analytics API

```bash
curl https://arco.vercel.app/api/email/analytics?startDate=2025-01-01
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "totalSent": 150,
    "totalOpened": 89,
    "totalClicked": 34,
    "totalBounced": 2,
    "totalFailed": 1,
    "openRate": 59.33,
    "clickRate": 38.20,
    "bounceRate": 1.33
  },
  "timestamp": "2025-01-26T12:00:00.000Z"
}
```

---

### Test Database Functions

```sql
-- Get analytics
SELECT * FROM get_email_analytics(
  p_campaign_id := NULL,
  p_start_date := '2025-01-01',
  p_end_date := '2025-01-31'
);

-- Increment lead score
SELECT increment_lead_score('lead-uuid', 5);

-- Schedule next email
SELECT schedule_next_email('sequence-uuid', 'lead-uuid');

-- Unsubscribe lead
SELECT unsubscribe_lead('lead-uuid');
```

---

## 🔐 Security Checklist

- ✅ **Row Level Security (RLS)** enabled on all tables
- ✅ **Service Role Key** stored as secret in Supabase
- ✅ **Resend API Key** stored as secret in Supabase
- ✅ **Webhook Signature** validation in resend-webhook function
- ✅ **Authorization Header** required for API routes
- ⚠️ **Rate Limiting** - Consider adding Vercel Edge Middleware

---

## 📊 Monitoring

### Edge Function Logs

```bash
supabase functions logs send-email
supabase functions logs process-email-queue
supabase functions logs resend-webhook
```

### Database Queries

```sql
-- Check email queue status
SELECT 
  status,
  COUNT(*) as count
FROM email_queue
GROUP BY status;

-- Recent email activity
SELECT 
  to_email,
  subject,
  status,
  sent_at,
  opened_at,
  clicked_at
FROM email_queue
ORDER BY created_at DESC
LIMIT 20;

-- Sequence progress
SELECT 
  es.name as sequence_name,
  l.email,
  esp.current_step,
  esp.completed,
  esp.last_email_sent_at
FROM email_sequence_progress esp
JOIN email_sequences es ON esp.sequence_id = es.id
JOIN leads l ON esp.lead_id = l.id
WHERE esp.completed = false;
```

---

## 🐛 Troubleshooting

### Issue: Emails Not Sending

**Check:**
1. Verify RESEND_API_KEY is set correctly
2. Check edge function logs: `supabase functions logs send-email`
3. Verify email_queue has pending entries
4. Test Resend API directly: https://resend.com/docs/api-reference/emails/send-email

---

### Issue: Webhook Not Working

**Check:**
1. Verify webhook URL is correct
2. Check resend-webhook logs
3. Verify RESEND_WEBHOOK_SECRET is set
4. Test webhook signature validation
5. Check Resend dashboard for webhook delivery logs

---

### Issue: Cron Job Not Running

**Check:**
1. Verify pg_cron extension is enabled
2. Check cron job status: `SELECT * FROM cron.job;`
3. Check pg_cron logs: `SELECT * FROM cron.job_run_details;`
4. Verify service role key is accessible

---

## 📈 Performance Optimization

### Batch Processing

Current batch size: **50 emails per cron run**

To increase:
```typescript
// supabase/functions/process-email-queue/index.ts
const { data: pendingEmails } = await supabaseClient
  .from('email_queue')
  .select('*')
  .in('status', ['pending', 'scheduled'])
  .lte('scheduled_for', new Date().toISOString())
  .order('scheduled_for', { ascending: true })
  .limit(100) // ← Increase here
```

---

### Cron Frequency

Current: **Every 15 minutes**

To increase (every 5 minutes):
```sql
SELECT cron.schedule(
  'process-email-queue',
  '*/5 * * * *',  -- Every 5 minutes
  ...
);
```

---

## 🔄 Rollback Plan

### Revert Database Migration

```bash
# Create down migration
cat > supabase/migrations/20251026000002_rollback_email_functions.sql << 'EOF'
-- Drop functions
DROP FUNCTION IF EXISTS get_email_analytics;
DROP FUNCTION IF EXISTS unsubscribe_lead;
DROP FUNCTION IF EXISTS schedule_next_email;
DROP FUNCTION IF EXISTS increment_lead_score;
DROP FUNCTION IF EXISTS increment_email_sequence_step;

-- Drop trigger
DROP TRIGGER IF EXISTS initialize_sequence_progress_trigger ON email_sequence_progress;
DROP FUNCTION IF EXISTS initialize_sequence_progress;
EOF

supabase db push
```

---

### Remove Edge Functions

```bash
supabase functions delete send-email
supabase functions delete process-email-queue
supabase functions delete resend-webhook
```

---

### Remove Cron Job

```sql
SELECT cron.unschedule('process-email-queue');
```

---

## 📚 Next Steps

1. **Create Missing Templates**
   - Password Reset
   - Booking Confirmation
   - Lead Nurture (3 templates)

2. **Add Rate Limiting**
   - Vercel Edge Middleware
   - IP-based throttling

3. **Implement Unsubscribe Flow**
   - One-click unsubscribe link
   - Unsubscribe landing page
   - Update email_sequences table

4. **A/B Testing**
   - Subject line variants
   - Template variants
   - Track conversion by variant

5. **Advanced Analytics**
   - Funnel visualization
   - Cohort analysis
   - Revenue attribution

---

## 🆘 Support

**Documentation:**
- Resend: https://resend.com/docs
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
- Supabase Cron: https://supabase.com/docs/guides/database/extensions/pgcron

**Related Files:**
- Email Architecture: `/docs/EMAIL_ARCHITECTURE_CLEAN.md`
- Refactoring Summary: `/docs/RESEND_REFACTORING_SUMMARY.md`
- Email Service README: `/src/lib/email/README.md`

---

**Last Updated**: 2025-01-26  
**Deployment Status**: 🟡 Ready for Configuration
