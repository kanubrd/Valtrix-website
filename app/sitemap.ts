import { MetadataRoute } from 'next';
import { articlesList } from '@/data/articles';
import { getIndustries, getProducts, getSolutions } from '@/lib/content-utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.valtrixmaterials.com';
  
  const staticRoutes = [
    { route: '', priority: 1.0, changeFreq: 'weekly' as const },
    { route: '/about', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/solutions', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/industries', priority: 0.8, changeFreq: 'monthly' as const },
    { route: '/contact', priority: 0.8, changeFreq: 'monthly' as const },
    { route: '/privacy-policy', priority: 0.3, changeFreq: 'yearly' as const },
    { route: '/terms-of-use', priority: 0.3, changeFreq: 'yearly' as const },
    { route: '/cookies', priority: 0.3, changeFreq: 'yearly' as const },
    { route: '/compliance', priority: 0.3, changeFreq: 'yearly' as const },
    { route: '/resources', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/resources/downloads', priority: 0.7, changeFreq: 'weekly' as const },
  ];

  // Dynamic Industry pages
  const industries = getIndustries();
  const industryRoutes = industries.map(ind => ({
    route: `/industries/${ind.slug}`,
    priority: 0.8,
    changeFreq: 'monthly' as const
  }));

  // Dynamic Product pages
  const products = getProducts();
  const productRoutes = products.map(prod => ({
    route: `/products/${prod.slug}`,
    priority: 0.8,
    changeFreq: 'monthly' as const
  }));

  // Dynamic Solution dynamic query pre-fetches (if needed)
  const solutions = getSolutions();
  const solutionRoutes = solutions.map(sol => ({
    route: `/solutions?product=${sol.id}`,
    priority: 0.8,
    changeFreq: 'weekly' as const
  }));

  // Dynamic Blog article pages
  const articleRoutes = articlesList.map(art => ({
    route: `/resources/${art.slug}`,
    priority: 0.6,
    changeFreq: 'monthly' as const
  }));

  const allRoutes = [
    ...staticRoutes, 
    ...industryRoutes, 
    ...productRoutes, 
    ...solutionRoutes, 
    ...articleRoutes
  ];

  return allRoutes.map(({ route, priority, changeFreq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority: priority,
  }));
}
