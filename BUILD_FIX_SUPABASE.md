# Supabase SSR and Build Fixes

## Issues Fixed

### 1. Edge Runtime Incompatibility
**Problem**: Supabase client uses Node.js APIs (`process.versions`, `process.version`) which are not available in Edge Runtime.

**Solution**: Removed `export const runtime = 'edge'` from `/src/app/api/domain/capture/route.ts`

### 2. Missing Environment Variables During Build
**Problem**: Supabase clients were initialized at module load time, causing build failures when environment variables weren't available during static generation.

**Solution**: 
- Added lazy initialization to all Supabase clients
- Added graceful fallbacks that return placeholder clients during build time
- Updated `/src/lib/supabase/client.ts`, `/src/lib/supabase/server.ts`, and `/src/lib/supabase/admin.ts`

### 3. TypeScript Type Assertion Errors  
**Problem**: Supabase v2 doesn't support `.single<Type>()` and `.returns<Type>()` generic type parameters with the new client structure.

**Solution**: Replaced with explicit type assertions:
```typescript
// Old (doesn't work)
.single<MyType>()

// New (works)
.single() as { data: MyType | null; error: any }
```

## Files Modified

### Core Supabase Clients
- `/src/lib/supabase/client.ts` - Lazy initialization with build-time fallbacks
- `/src/lib/supabase/server.ts` - Lazy initialization with build-time fallbacks
- `/src/lib/supabase/admin.ts` - Lazy initialization with Proxy for backward compatibility

### API Routes
- `/src/app/api/domain/capture/route.ts` - Removed edge runtime
- `/src/app/api/agendamentos/create-booking/route.ts` - Fixed type assertions
- `/src/app/api/emails/send-confirmation/route.ts` - Fixed type assertions
- `/src/app/api/mercadopago/create-preference/route.ts` - Fixed type assertions
- `/src/app/api/mercadopago/validate-discount/route.ts` - Fixed type assertions

### Dashboard Actions
- `/src/app/dashboard/actions.ts` - Fixed type assertions and null checks
- `/src/app/dashboard/campaigns/actions.ts` - Fixed type assertions
- `/src/app/dashboard/diagnostico/actions.ts` - Fixed type assertions and null checks
- `/src/app/dashboard/users/actions.ts` - Fixed type assertions
- `/src/app/dashboard/whatsapp/actions.ts` - Fixed type assertions
- `/src/app/dashboard/funil/actions.ts` - Simplified function to avoid TS parsing issues

### Dashboard Pages
- `/src/app/dashboard/operacoes/page.tsx` - Fixed implicit any types
- `/src/app/dashboard/plano-de-acao/page.tsx` - Fixed implicit any types

## Build Result

✅ **Build Successful**

Only expected warnings remain:
- Warning about Node.js APIs in Supabase realtime (expected, not used in Edge Runtime)
- Warning about missing MERCADOPAGO_ACCESS_TOKEN (optional, for payment features)

## Future Improvements

1. **Add Proper Type Definitions**: Instead of using `any` types in dashboard pages, add proper interfaces for database query results
2. **Type-Safe Query Functions**: Update dashboard action functions to return properly typed results
3. **Environment Variable Validation**: Add runtime validation for required environment variables

## Testing Checklist

- [x] Build completes without errors
- [x] No runtime errors from missing Supabase clients
- [x] Static pages generate correctly
- [x] Dynamic pages work with SSR
- [x] API routes function properly
- [x] Dashboard pages load without errors

## Deployment Notes

When deploying to Vercel, ensure the following environment variables are set:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional (for payment features):
- `MERCADOPAGO_ACCESS_TOKEN`
