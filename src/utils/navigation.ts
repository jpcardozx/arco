/**
 * Navigation utilities for Next.js Link components
 */
import { UrlObject } from 'url';

/**
 * Creates a properly typed href value for Next.js Link components.
 * This solves the TypeScript error where string hrefs are not assignable to UrlObject | RouteImpl<string>
 * 
 * @param href The URL string to convert to a compatible href value
 * @returns A properly typed href value for Next.js Link components
 */
export function createHref(href: string): UrlObject {
  // For internal paths, external URLs, or any string path, create a URL object
  return { pathname: href } as UrlObject;
}

/**
 * Creates a properly typed href value for HTML anchor elements.
 * HTML anchors expect string hrefs, not URL objects
 * 
 * @param href The URL string or URL object
 * @returns A string href for HTML anchor elements
 */
export function createHtmlHref(href: string | UrlObject): string {
  if (typeof href === 'string') {
    return href;
  }
  // Convert UrlObject to string
  return href.pathname || '/';
}

/**
 * Creates a typed route href for dynamic routes with parameters
 * 
 * Usage:
 * <Link href={createDynamicHref('/cases/[id]', { id: caseId })}>Case Study</Link>
 * 
 * @param route The route pattern
 * @param params The parameters to inject into the route
 * @returns A properly typed URL object for Next.js Link component
 */
export function createDynamicHref(
  route: string,
  params: Record<string, string | number>
): UrlObject {
  let path = route;
  
  // Replace each parameter in the route
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`[${key}]`, String(value));
  });
  
  return {
    pathname: path
  };
}
