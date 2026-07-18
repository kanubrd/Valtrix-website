import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { articlesList } from '@/data/articles';

// Dynamic file paths
const DATA_DIR = path.join(process.cwd(), 'data', 'content');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

export async function GET() {
  try {
    const issues: Array<{
      type: 'link' | 'image' | 'crosslink' | 'sitemap';
      severity: 'error' | 'warning';
      page: string;
      field: string;
      value: string;
      message: string;
    }> = [];

    // 1. Gather all files in the public directory recursively to build asset checklist
    const publicAssets = new Set<string>();
    const scanPublicDir = (dir: string) => {
      if (!fs.existsSync(dir)) return;
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const relPath = '/' + path.relative(PUBLIC_DIR, fullPath).replace(/\\/g, '/');
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          scanPublicDir(fullPath);
        } else {
          publicAssets.add(relPath);
        }
      }
    };
    scanPublicDir(PUBLIC_DIR);

    // 2. Load all dynamic CMS JSON entries
    const indFile = path.join(DATA_DIR, 'industries.json');
    const prodFile = path.join(DATA_DIR, 'products.json');
    const solFile = path.join(DATA_DIR, 'solutions.json');

    const industries = fs.existsSync(indFile) ? JSON.parse(fs.readFileSync(indFile, 'utf8')) : [];
    const products = fs.existsSync(prodFile) ? JSON.parse(fs.readFileSync(prodFile, 'utf8')) : [];
    const solutionsData = fs.existsSync(solFile) ? JSON.parse(fs.readFileSync(solFile, 'utf8')) : { solutions: [] };
    const solutions = solutionsData.solutions || [];

    // 3. Construct the list of valid URL paths on the site
    const validUrls = new Set<string>([
      '/',
      '/about',
      '/contact',
      '/solutions',
      '/resources',
      '/compliance',
      '/cookies',
      '/privacy-policy',
      '/terms-of-use',
      '/resources/downloads',
      '/industries',
      '/products',
    ]);

    // Add dynamic routes
    articlesList.forEach(art => validUrls.add(`/resources/${art.slug}`));
    industries.forEach((ind: any) => validUrls.add(`/industries/${ind.slug}`));
    products.forEach((prod: any) => validUrls.add(`/products/${prod.slug}`));

    // Helper: validate internal link
    const checkLink = (link: string, pageContext: string, fieldName: string) => {
      if (!link) return;
      // Skip external links & special protocols
      if (link.startsWith('http://') || link.startsWith('https://') || link.startsWith('mailto:') || link.startsWith('tel:')) {
        return;
      }
      // Strip hash fragments or query parameters
      const basePath = link.split('?')[0].split('#')[0];
      const cleanPath = '/' + basePath.replace(/^\/+|\/+$/g, '');
      const finalPath = cleanPath === '/' ? '/' : cleanPath;

      if (!validUrls.has(finalPath)) {
        issues.push({
          type: 'link',
          severity: 'error',
          page: pageContext,
          field: fieldName,
          value: link,
          message: `Broken internal link: "${link}" does not resolve to any published route.`,
        });
      }
    };

    // Helper: validate public asset image
    const checkImage = (imagePath: string, pageContext: string, fieldName: string) => {
      if (!imagePath) return;
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        // Skip external images for offline-safety, but flag as warning if HTTP to prevent mixed content
        if (imagePath.startsWith('http://')) {
          issues.push({
            type: 'image',
            severity: 'warning',
            page: pageContext,
            field: fieldName,
            value: imagePath,
            message: `Mixed content risk: Image "${imagePath}" uses non-secure HTTP protocol.`,
          });
        }
        return;
      }
      
      const cleanImgPath = '/' + imagePath.replace(/^\/+|\/+$/g, '');
      if (!publicAssets.has(cleanImgPath)) {
        issues.push({
          type: 'image',
          severity: 'error',
          page: pageContext,
          field: fieldName,
          value: imagePath,
          message: `Missing local image: "${imagePath}" is not found in the public assets directory.`,
        });
      }
    };

    // Helper: extract and check links inside body HTML text
    const checkTextLinks = (text: string, pageContext: string, fieldName: string) => {
      if (!text) return;
      const hrefRegex = /href=["']([^"']+)["']/g;
      let match;
      while ((match = hrefRegex.exec(text)) !== null) {
        checkLink(match[1], pageContext, fieldName);
      }
    };

    // ─── CHECK INDUSTRIES ────────────────────────────────────────────────
    industries.forEach((ind: any) => {
      const ctx = `/industries/${ind.slug}`;

      // Check Images
      checkImage(ind.listingImage, ctx, 'Listing Image');
      if (ind.hero) {
        checkImage(ind.hero.image, ctx, 'Hero Image');
      }

      // Check Application Cards
      if (Array.isArray(ind.applications)) {
        ind.applications.forEach((app: any, idx: number) => {
          checkImage(app.image, ctx, `Application Card ${idx + 1} Image`);
        });
      }

      // Check Market Segments
      if (Array.isArray(ind.segments)) {
        ind.segments.forEach((seg: any, idx: number) => {
          checkImage(seg.image, ctx, `Market Segment ${idx + 1} Image`);
        });
      }

      // Check CTAs
      if (ind.cta) {
        if (ind.cta.primaryButton) checkLink(ind.cta.primaryButton.href, ctx, 'CTA Primary Button Link');
        if (ind.cta.secondaryButton) checkLink(ind.cta.secondaryButton.href, ctx, 'CTA Secondary Button Link');
      }

      // Check Linked Products (Cross-linking verification)
      const linkedProducts = ind.products || [];
      if (linkedProducts.length === 0) {
        issues.push({
          type: 'crosslink',
          severity: 'error',
          page: ctx,
          field: 'Products Grid',
          value: '',
          message: `Orphaned page warning: Industry "${ind.title}" does not link to any products. An industry must reference at least one product before it is published.`,
        });
      } else {
        linkedProducts.forEach((p: any, idx: number) => {
          if (p.href) checkLink(p.href, ctx, `Product ${idx + 1} href Link`);
        });
      }

      // Scan overview paragraph text links
      if (Array.isArray(ind.overview)) {
        ind.overview.forEach((paragraph: string, idx: number) => {
          checkTextLinks(paragraph, ctx, `Overview Text Paragraph ${idx + 1}`);
        });
      }
    });

    // ─── CHECK PRODUCTS ──────────────────────────────────────────────────
    products.forEach((prod: any) => {
      const ctx = `/products/${prod.slug}`;

      // Check Images
      if (prod.images) {
        checkImage(prod.images.hero, ctx, 'Hero Image');
        checkImage(prod.images.product, ctx, 'Product Main Image');
        if (Array.isArray(prod.images.gallery)) {
          prod.images.gallery.forEach((gal: any, idx: number) => {
            checkImage(gal.src, ctx, `Gallery Item ${idx + 1} Image`);
          });
        }
      }

      // Check CTAs
      if (Array.isArray(prod.ctas)) {
        prod.ctas.forEach((cta: any, idx: number) => {
          checkLink(cta.href, ctx, `CTA ${idx + 1} Link`);
        });
      }

      // Cross-linking check: Product must link back to at least one industry
      const linkedIndustries = prod.industries || [];
      if (linkedIndustries.length === 0) {
        issues.push({
          type: 'crosslink',
          severity: 'error',
          page: ctx,
          field: 'Industries Tags',
          value: '',
          message: `Orphaned page warning: Product "${prod.name}" is not mapped to any industry. Every product must belong to at least one industry.`,
        });
      } else {
        // Validate that each tagged industry references a real industry slug
        linkedIndustries.forEach((indName: string) => {
          const cleanName = indName.toLowerCase();
          const match = industries.some(
            (ind: any) => ind.title.toLowerCase().includes(cleanName) || ind.slug.toLowerCase().includes(cleanName) || ind.tag.toLowerCase().includes(cleanName)
          );
          if (!match) {
            issues.push({
              type: 'crosslink',
              severity: 'warning',
              page: ctx,
              field: 'Industries Tags',
              value: indName,
              message: `Tag mapping discrepancy: Product "${prod.name}" references industry tag "${indName}" which does not map cleanly to any active industry.`,
            });
          }
        });
      }
    });

    // ─── CHECK SOLUTIONS ─────────────────────────────────────────────────
    solutions.forEach((sol: any) => {
      const ctx = `/solutions#${sol.id}`;

      checkImage(sol.image, ctx, 'Solution Image');
      if (Array.isArray(sol.sliderImages)) {
        sol.sliderImages.forEach((img: any, idx: number) => {
          checkImage(img.src, ctx, `Slider Image ${idx + 1}`);
        });
      }

      // Check text descriptions for manual links
      checkTextLinks(sol.description, ctx, 'Description text');
      if (sol.details) {
        checkTextLinks(sol.details.overview, ctx, 'Details Overview text');
      }
    });

    // ─── CHECK INSIGHTS ARTICLES ──────────────────────────────────────────
    articlesList.forEach(art => {
      const ctx = `/resources/${art.slug}`;
      checkImage(art.image, ctx, 'Banner Image');
      checkTextLinks(art.body, ctx, 'Article body HTML content');
    });

    const isHealthy = issues.filter(i => i.severity === 'error').length === 0;

    return NextResponse.json({
      healthy: isHealthy,
      summary: {
        totalIssues: issues.length,
        errors: issues.filter(i => i.severity === 'error').length,
        warnings: issues.filter(i => i.severity === 'warning').length,
      },
      issues,
    });
  } catch (e) {
    console.error('Content health crawl failed:', e);
    return NextResponse.json({ error: 'Content health crawl failed.' }, { status: 500 });
  }
}
