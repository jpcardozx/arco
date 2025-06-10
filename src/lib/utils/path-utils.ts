import { type Route } from 'next';

/**
 * Converte uma string de caminho para o tipo Route do Next.js
 * Use esta função para garantir tipagem correta em hrefs
 *
 * @param path Caminho da rota
 * @returns Caminho tipado como Route
 */
export function asRoute(path: string): Route {
  return path as Route;
}

/**
 * Mapeia uma coleção de caminhos para tipos Route
 * Útil para arrays de links ou menus
 *
 * @param paths Objeto com caminhos
 * @returns Objeto com caminhos tipados corretamente
 */
export function mapRoutesToType<T extends Record<string, string>>(
  paths: T
): Record<keyof T, Route> {
  const result = {} as Record<keyof T, Route>;
  for (const key in paths) {
    result[key] = paths[key] as Route;
  }
  return result;
}

/**
 * Define rotas da aplicação com tipagem
 */
export const ROUTES = {
  HOME: '/',
  DIAGNOSE: '/diagnose',
  SOLUTIONS: '/solutions',
  CASE_STUDIES: '/case-studies',
  CONTACT: '/contact',
  PORTFOLIO: '/portfolio',
  METHODOLOGY: '/methodology',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  COOKIES: '/cookies',
  PROCESS: '/process',
} as const;

// Versão tipada para uso em componentes
export const TYPED_ROUTES = mapRoutesToType(ROUTES);
