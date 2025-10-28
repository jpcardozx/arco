/**
 * Polyfills for Server-Side Rendering
 *
 * Fixes 'self is not defined' error for browser-only packages
 * that are accidentally imported in server context
 */

// Only run on server-side (Node.js environment)
if (typeof window === 'undefined') {
  // @ts-ignore - Define self globally
  if (!global.self) {
    global.self = global;
  }

  // @ts-ignore - Define globalThis.self
  if (!globalThis.self) {
    globalThis.self = globalThis;
  }

  // @ts-ignore - Mock window for packages that check for it
  if (!global.window) {
    global.window = global;
  }

  // Mock document with essential methods
  if (!global.document) {
    // @ts-ignore
    global.document = {
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      getElementsByTagName: () => [],
      getElementsByClassName: () => [],
      createElement: () => ({}),
      createTextNode: () => ({}),
      body: {},
      head: {},
      documentElement: {},
      addEventListener: () => {},
      removeEventListener: () => {},
    };
  }
}

export {};
