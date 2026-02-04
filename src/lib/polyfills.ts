// @ts-nocheck
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

  // Mock document with essential methods for SSR-safe fallbacks
  if (!global.document) {
    const createMockElement = () => ({
      appendChild: () => {},
      removeChild: () => {},
      insertBefore: () => {},
      setAttribute: () => {},
      removeAttribute: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      querySelector: () => null,
      querySelectorAll: () => [],
      style: {},
      firstChild: null,
      parentNode: null,
      textContent: '',
    });

    // @ts-ignore
    global.document = {
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      getElementsByTagName: () => [],
      getElementsByClassName: () => [],
      createElement: () => createMockElement(),
      createTextNode: () => createMockElement(),
      body: createMockElement(),
      head: createMockElement(),
      documentElement: createMockElement(),
      addEventListener: () => {},
      removeEventListener: () => {},
    };
  }
}

export {};
