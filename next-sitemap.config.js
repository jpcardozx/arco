/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: 'https://www.consultingarco.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/dashboard*',
    '/admin*',
    '/api/*',
    '/obrigado-lead',
    '/obrigado-tripwire',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/admin', '/api'],
      },
    ],
  },
  transform: async (config, path) => {
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/lead-magnet' || path === '/tripwire') {
      priority = 0.9;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
