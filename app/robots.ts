import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Block API routes, admin paths, and internal Next.js paths from crawlers
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/dashboard/',
          '/*.json$',
        ],
      },
      // Block AI training crawlers
      { userAgent: 'GPTBot',          disallow: '/' },
      { userAgent: 'ChatGPT-User',    disallow: '/' },
      { userAgent: 'CCBot',           disallow: '/' },
      { userAgent: 'anthropic-ai',    disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
    ],
    sitemap: 'https://www.valtrixmaterials.com/sitemap.xml',
  };
}
