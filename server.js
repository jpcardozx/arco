/**
 * Server Bootstrap
 * Polyfills MUST run before Next.js loads
 */

// Critical fix for 'self is not defined'
if (typeof global !== 'undefined' && typeof global.self === 'undefined') {
  global.self = global;
}

if (typeof globalThis !== 'undefined' && typeof globalThis.self === 'undefined') {
  globalThis.self = globalThis;
}

// Now start Next.js
require('next/dist/bin/next');
