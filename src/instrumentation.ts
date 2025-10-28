/**
 * Instrumentation - Global setup for all environments
 * Runs before any other code
 */

export async function register() {
  // Fix 'self is not defined' in server environment (CRITICAL - runs first)
  if (typeof global !== 'undefined') {
    if (typeof globalThis.self === 'undefined') {
      // @ts-ignore
      globalThis.self = global;
    }
    if (typeof global.self === 'undefined') {
      // @ts-ignore
      global.self = global;
    }
  }

  // Server-side instrumentation
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Additional server setup if needed
  }

  // Edge runtime instrumentation
  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge-specific setup if needed
  }
}
