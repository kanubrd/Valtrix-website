import fs from 'fs';
import path from 'path';

// ─── Paths ────────────────────────────────────────────────
const CONTENT_DIR = path.join(process.cwd(), 'data', 'content');
const DRAFTS_DIR = path.join(process.cwd(), 'data', 'drafts');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure directories exist
[CONTENT_DIR, DRAFTS_DIR, UPLOADS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ─── Generic JSON helpers ─────────────────────────────────
function readJSON<T>(filename: string): T {
  const filePath = path.join(CONTENT_DIR, filename);
  if (!fs.existsSync(filePath)) return [] as unknown as T;
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

function writeJSON<T>(filename: string, data: T): void {
  const filePath = path.join(CONTENT_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ─── Industry types ───────────────────────────────────────
export interface IndustryApplication {
  title: string;
  description: string;
  image: string;
  icon?: string;
}

export interface IndustrySegment {
  name: string;
  description: string;
  image: string;
}

export interface IndustryProduct {
  name: string;
  category: string;
  description: string;
  features: string[];
  href: string;
}

export interface IndustryTagColor {
  bg: string;
  text: string;
}

export interface Industry {
  slug: string;
  title: string;
  tag: string;
  tagColor: IndustryTagColor;
  description: string;
  listingImage: string;
  hero: {
    image: string;
    imageAlt?: string;
    imageObjectFit?: string;
    heroTagline?: string | null;
    title: string;
    subtitle: string;
  };
  overview: string[];
  applications: IndustryApplication[];
  applicationsSectionSubtitle?: string;
  segments: IndustrySegment[];
  segmentsSectionTitle?: string;
  segmentsSectionSubtitle?: string;
  products: IndustryProduct[];
  productsSectionSubtitle?: string;
  benefits: string[];
  benefitsSectionTitle?: string;
  benefitsSectionSubtitle?: string;
  cta: {
    title: string;
    description: string;
    primaryButton: { text: string; href: string };
    secondaryButton?: { text: string; href: string };
  };
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  } | null;
}

// ─── Product types ────────────────────────────────────────
export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductGalleryImage {
  src: string;
  alt: string;
  title?: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  descriptionExtended?: string;
  features: string[];
  specs: ProductSpec[];
  applications: string[];
  industries: string[];
  packaging?: string[];
  images: {
    hero: string | null;
    product: string | null;
    gallery: ProductGalleryImage[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  } | null;
  jsonLd?: Record<string, unknown> | null;
}

// ─── Solution types ───────────────────────────────────────
export interface SolutionSliderImage {
  src: string;
  alt: string;
}

export interface SolutionDetail {
  overview: string;
  specs: ProductSpec[];
  applications: string[];
}

export interface Solution {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  sliderImages: SolutionSliderImage[];
  details: SolutionDetail;
}

export interface SolutionResult {
  value: string;
  label: string;
  description: string;
}

export interface SolutionsData {
  solutions: Solution[];
  results: SolutionResult[];
}

// ─── Industry CRUD ────────────────────────────────────────
export function getIndustries(): Industry[] {
  return readJSON<Industry[]>('industries.json');
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return getIndustries().find((i) => i.slug === slug);
}

export function saveIndustry(industry: Industry): void {
  const industries = getIndustries();
  const idx = industries.findIndex((i) => i.slug === industry.slug);
  if (idx >= 0) {
    industries[idx] = industry;
  } else {
    industries.push(industry);
  }
  writeJSON('industries.json', industries);
}

export function deleteIndustry(slug: string): boolean {
  const industries = getIndustries();
  const filtered = industries.filter((i) => i.slug !== slug);
  if (filtered.length === industries.length) return false;
  writeJSON('industries.json', filtered);
  return true;
}

// ─── Product CRUD ─────────────────────────────────────────
export function getProducts(): Product[] {
  return readJSON<Product[]>('products.json');
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function saveProduct(product: Product): void {
  const products = getProducts();
  const idx = products.findIndex((p) => p.slug === product.slug);
  if (idx >= 0) {
    products[idx] = product;
  } else {
    products.push(product);
  }
  writeJSON('products.json', products);
}

export function deleteProduct(slug: string): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.slug !== slug);
  if (filtered.length === products.length) return false;
  writeJSON('products.json', filtered);
  return true;
}

// ─── Solution CRUD ────────────────────────────────────────
export function getSolutionsData(): SolutionsData {
  return readJSON<SolutionsData>('solutions.json');
}

export function getSolutions(): Solution[] {
  return getSolutionsData().solutions || [];
}

export function getSolutionById(id: string): Solution | undefined {
  return getSolutions().find((s) => s.id === id);
}

export function saveSolution(solution: Solution): void {
  const data = getSolutionsData();
  const solutions = data.solutions || [];
  const idx = solutions.findIndex((s) => s.id === solution.id);
  if (idx >= 0) {
    solutions[idx] = solution;
  } else {
    solutions.push(solution);
  }
  writeJSON('solutions.json', { ...data, solutions });
}

export function deleteSolution(id: string): boolean {
  const data = getSolutionsData();
  const solutions = data.solutions || [];
  const filtered = solutions.filter((s) => s.id !== id);
  if (filtered.length === solutions.length) return false;
  writeJSON('solutions.json', { ...data, solutions: filtered });
  return true;
}

export function getSolutionResults(): SolutionResult[] {
  return getSolutionsData().results || [];
}

// ─── Draft helpers ────────────────────────────────────────
export function saveDraft(type: string, id: string, data: unknown): void {
  const filePath = path.join(DRAFTS_DIR, `${type}-${id}.json`);
  fs.writeFileSync(
    filePath,
    JSON.stringify({ data, updatedAt: new Date().toISOString() }, null, 2),
    'utf-8',
  );
}

export function getDraft(type: string, id: string): { data: unknown; updatedAt: string } | null {
  const filePath = path.join(DRAFTS_DIR, `${type}-${id}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function deleteDraft(type: string, id: string): void {
  const filePath = path.join(DRAFTS_DIR, `${type}-${id}.json`);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}
