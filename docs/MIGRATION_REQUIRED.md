## ⚠️ Manual Migration Required

**Date:** 2025-10-06  
**Issue:** REST API method not supported for DDL operations

---

### 🎯 Action Required

Migration must be applied manually via **Supabase SQL Editor**

---

### 📋 Steps

1. **Access SQL Editor**
   ```
   https://vkclegvrqprevcdgosan.supabase.co/project/_/sql
   ```

2. **Open Migration File**
   - File: `supabase/migrations/20251006000012_mercadopago_bricks_system.sql`
   - Select all (Ctrl+A), Copy (Ctrl+C)

3. **Paste in SQL Editor**
   - Paste entire content
   - Click "Run" (or Ctrl+Enter)
   - Wait ~30 seconds

4. **Validate with Query**
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
     AND table_name IN (
       'subscription_plans',
       'payment_methods',
       'subscriptions',
       'payment_transactions',
       'webhook_events'
     );
   ```

5. **Expected Result**
   ```
   5 rows returned:
   - subscription_plans
   - payment_methods
   - subscriptions
   - payment_transactions
   - webhook_events
   ```

6. **Verify Seed Data**
   ```sql
   SELECT name, slug, price_monthly 
   FROM subscription_plans 
   ORDER BY price_monthly;
   ```
   
   Expected:
   ```
   Free       | free       | 0.00
   Pro        | pro        | 99.00
   Enterprise | enterprise | 299.00
   ```

---

### ⏱️ Time: 5-10 minutes

---

### 📖 Full Guide

See: `SUPABASE_MIGRATION_GUIDE.md`

---

**Current Status:** Database 0% → Awaiting manual migration  
**Progress:** 23% (unchanged)  
**Blocker:** Manual SQL execution required
