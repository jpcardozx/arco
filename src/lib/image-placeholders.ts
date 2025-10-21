/**
 * Placeholders SVG para imagens não carregadas
 * Lightweight, inline, sem requisições adicionais
 */

export const imagePlaceholders = {
  // Placeholder genérico com gradiente
  generic: (width: number, height: number, text?: string) => `
    data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E
      %3Cdefs%3E
        %3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E
          %3Cstop offset='0%25' style='stop-color:rgb(15,23,42);stop-opacity:1' /%3E
          %3Cstop offset='100%25' style='stop-color:rgb(30,41,59);stop-opacity:1' /%3E
        %3C/linearGradient%3E
      %3C/defs%3E
      %3Crect width='100%25' height='100%25' fill='url(%23grad)' /%3E
      ${text ? `%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='rgba(255,255,255,0.3)' font-family='system-ui' font-size='14'%3E${text}%3C/text%3E` : ''}
    %3C/svg%3E
  `,

  // Placeholder para ambiente de salão
  salonInterior: (width: number, height: number) => `
    data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E
      %3Cdefs%3E
        %3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E
          %3Cstop offset='0%25' style='stop-color:%23ec4899;stop-opacity:0.1' /%3E
          %3Cstop offset='100%25' style='stop-color:%2306b6d4;stop-opacity:0.1' /%3E
        %3C/linearGradient%3E
      %3C/defs%3E
      %3Crect width='100%25' height='100%25' fill='%230f172a' /%3E
      %3Crect width='100%25' height='100%25' fill='url(%23bg)' /%3E
      %3Ccircle cx='30%25' cy='40%25' r='80' fill='rgba(236,72,153,0.15)' /%3E
      %3Ccircle cx='70%25' cy='60%25' r='100' fill='rgba(6,182,212,0.15)' /%3E
      %3Ctext x='50%25' y='50%25' text-anchor='middle' fill='rgba(255,255,255,0.2)' font-family='system-ui' font-size='16' font-weight='500'%3EAmbiente Moderno%3C/text%3E
    %3C/svg%3E
  `,

  // Placeholder para serviço profissional
  professionalService: (width: number, height: number) => `
    data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E
      %3Crect width='100%25' height='100%25' fill='%230f172a' /%3E
      %3Cpath d='M ${width/2 - 30} ${height/2 - 40} L ${width/2} ${height/2 - 60} L ${width/2 + 30} ${height/2 - 40} L ${width/2 + 20} ${height/2 + 40} L ${width/2 - 20} ${height/2 + 40} Z' fill='rgba(236,72,153,0.2)' /%3E
      %3Ctext x='50%25' y='75%25' text-anchor='middle' fill='rgba(255,255,255,0.2)' font-family='system-ui' font-size='14'%3EServiço Profissional%3C/text%3E
    %3C/svg%3E
  `,

  // Placeholder para produtos
  products: (width: number, height: number) => `
    data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E
      %3Crect width='100%25' height='100%25' fill='%23f8fafc' /%3E
      %3Crect x='20%25' y='30%25' width='20' height='40' rx='2' fill='%23e2e8f0' /%3E
      %3Crect x='45%25' y='25%25' width='20' height='50' rx='2' fill='%23cbd5e1' /%3E
      %3Crect x='70%25' y='35%25' width='20' height='35' rx='2' fill='%23e2e8f0' /%3E
      %3Ctext x='50%25' y='85%25' text-anchor='middle' fill='%2394a3b8' font-family='system-ui' font-size='12'%3EProdutos Premium%3C/text%3E
    %3C/svg%3E
  `,

  // Placeholder blur (base64)
  blur: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Cfilter id="b"%3E%3CfeGaussianBlur stdDeviation="12"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" fill="%230f172a"/%3E%3Cg filter="url(%23b)"%3E%3Cellipse cx="150" cy="100" rx="100" ry="80" fill="%23ec4899" opacity="0.3"/%3E%3Cellipse cx="250" cy="200" rx="120" ry="90" fill="%2306b6d4" opacity="0.3"/%3E%3C/g%3E%3C/svg%3E',
};

// Helper para usar nos componentes
export function getPlaceholder(type: keyof typeof imagePlaceholders, width = 800, height = 600, text?: string) {
  if (type === 'generic') {
    return imagePlaceholders.generic(width, height, text);
  }
  if (type === 'blur') {
    return imagePlaceholders.blur;
  }
  return imagePlaceholders[type](width, height);
}
