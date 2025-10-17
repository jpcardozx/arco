/**
 * Environment Variables Validation
 * 
 * Este arquivo valida se todas as variáveis de ambiente necessárias
 * estão configuradas antes do build.
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const;

const optionalEnvVars = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
] as const;

export function validateEnv() {
  const missing: string[] = [];
  const warnings: string[] = [];

  // Check required variables
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  // Check optional but recommended variables
  for (const envVar of optionalEnvVars) {
    if (!process.env[envVar]) {
      warnings.push(envVar);
    }
  }

  // Log results
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(v => console.error(`   - ${v}`));
    console.error('\n📝 Copy .env.example to .env.local and fill in your values.');
    
    // During build, allow to proceed with warnings instead of throwing
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL !== '1') {
      throw new Error('Missing required environment variables');
    }
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Missing optional environment variables:');
    warnings.forEach(v => console.warn(`   - ${v}`));
    console.warn('   Some features may be disabled.\n');
  }

  if (missing.length === 0 && warnings.length === 0) {
    console.log('✅ All environment variables are configured\n');
  }

  return {
    isValid: missing.length === 0,
    missing,
    warnings,
  };
}

// Run validation during module load in development
if (process.env.NODE_ENV === 'development') {
  validateEnv();
}
